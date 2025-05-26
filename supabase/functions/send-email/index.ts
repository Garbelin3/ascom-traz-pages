
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  from?: string;
  isProduction?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { to, subject, html, from, isProduction }: EmailRequest = await req.json();

    // Environment configuration
    const environment = Deno.env.get("ENVIRONMENT") || "development";
    const isProductionEnv = environment === "production" || isProduction;
    
    // Configure sender address based on environment
    let fromAddress: string;
    let finalRecipient: string;
    let finalHtml = html;
    
    if (isProductionEnv) {
      // Production: use verified domain
      fromAddress = from || "ASCOM <noreply@ascom.com.br>";
      finalRecipient = to;
      console.log(`[PRODUCTION] Sending email to: ${to}, Subject: ${subject}`);
    } else {
      // Development: send to verified test address with original recipient info
      fromAddress = "ASCOM <onboarding@resend.dev>";
      finalRecipient = "admin@codeprogram.com.br"; // Verified test address
      
      // Add development notice to email content
      finalHtml = `
        <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; margin-bottom: 20px; border-radius: 8px; font-family: Arial, sans-serif;">
          <h3 style="color: #92400e; margin: 0 0 10px 0;">🚧 EMAIL DE DESENVOLVIMENTO</h3>
          <p style="color: #92400e; margin: 0; font-size: 14px;">
            <strong>Destinatário Original:</strong> ${to}<br>
            <strong>Ambiente:</strong> Desenvolvimento<br>
            <strong>Este email seria enviado para o usuário em produção</strong>
          </p>
        </div>
        ${html}
      `;
      
      console.log(`[DEVELOPMENT] Redirecting email from ${to} to ${finalRecipient}, Subject: ${subject}`);
    }

    // Send email with retry logic
    let emailResponse;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        emailResponse = await resend.emails.send({
          from: fromAddress,
          to: [finalRecipient],
          subject: isProductionEnv ? subject : `[DEV] ${subject}`,
          html: finalHtml,
        });

        if (emailResponse.error) {
          throw new Error(`Resend API error: ${emailResponse.error.message}`);
        }

        break; // Success, exit retry loop
      } catch (error) {
        retryCount++;
        console.error(`Email send attempt ${retryCount} failed:`, error);
        
        if (retryCount >= maxRetries) {
          throw error;
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
      }
    }

    // Handle specific domain verification errors
    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      
      if (emailResponse.error.message && emailResponse.error.message.includes('verify a domain')) {
        return new Response(
          JSON.stringify({ 
            error: "Domain verification required. Please verify your domain at resend.com/domains or contact the administrator.",
            details: emailResponse.error.message,
            code: "DOMAIN_NOT_VERIFIED"
          }),
          {
            status: 422,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
      
      throw new Error(`Email service error: ${emailResponse.error.message}`);
    }

    // Log successful send
    const logData = {
      environment,
      originalRecipient: to,
      finalRecipient,
      subject,
      emailId: emailResponse.data?.id,
      timestamp: new Date().toISOString(),
      retryCount
    };
    
    console.log("Email sent successfully:", logData);

    return new Response(JSON.stringify({
      success: true,
      data: emailResponse.data,
      environment,
      originalRecipient: to,
      finalRecipient,
      retryCount
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    
    // Structured error response
    const errorResponse = {
      error: error.message || "Failed to send email",
      code: error.code || "UNKNOWN_ERROR",
      timestamp: new Date().toISOString(),
      environment: Deno.env.get("ENVIRONMENT") || "development"
    };
    
    return new Response(
      JSON.stringify(errorResponse),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
