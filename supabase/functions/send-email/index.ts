
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

    const { to, subject, html }: EmailRequest = await req.json();

    // Validar dados obrigatórios
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, html' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Verificar se a chave API do Resend está configurada
    if (!Deno.env.get("RESEND_API_KEY")) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ 
          error: 'Email service not configured. Please contact administrator.',
          code: 'RESEND_API_KEY_MISSING'
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Configure sender address - usar domínio verificado
    const fromAddress = "ASCOM <contato@ascomtrazcomunidde.com.br>";
    
    console.log(`[PRODUCTION] Sending email to: ${to}, Subject: ${subject}`);

    // Send email with retry logic
    let emailResponse;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        console.log(`Attempt ${retryCount + 1}: Sending email from ${fromAddress} to ${to}`);
        
        emailResponse = await resend.emails.send({
          from: fromAddress,
          to: [to],
          subject: subject,
          html: html,
        });

        console.log('Resend response:', emailResponse);

        // Verificar se há erro na resposta
        if (emailResponse.error) {
          throw new Error(`Resend API error: ${emailResponse.error.message}`);
        }

        // Verificar se os dados estão presentes (sucesso)
        if (emailResponse.data && emailResponse.data.id) {
          console.log(`Email sent successfully with ID: ${emailResponse.data.id}`);
          break; // Success, exit retry loop
        } else {
          throw new Error('Invalid response from Resend API');
        }

      } catch (error) {
        retryCount++;
        console.error(`Email send attempt ${retryCount} failed:`, error);
        
        if (retryCount >= maxRetries) {
          // Handle specific domain verification errors
          if (error.message && error.message.includes('domain is not verified')) {
            return new Response(
              JSON.stringify({ 
                error: "Domínio não verificado no Resend. Verifique se ascomtrazcomunidde.com.br está configurado corretamente.",
                details: error.message,
                code: "DOMAIN_NOT_VERIFIED"
              }),
              {
                status: 422,
                headers: { "Content-Type": "application/json", ...corsHeaders },
              }
            );
          }
          
          throw error;
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
      }
    }

    // Log successful send
    const logData = {
      environment: 'production',
      recipient: to,
      subject,
      emailId: emailResponse.data?.id,
      timestamp: new Date().toISOString(),
      retryCount
    };
    
    console.log("Email sent successfully:", logData);

    return new Response(JSON.stringify({
      success: true,
      data: emailResponse.data,
      environment: 'production',
      recipient: to,
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
      environment: 'production'
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
