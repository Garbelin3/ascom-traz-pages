
import { EmailError } from './types.ts';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export function createErrorResponse(error: any, status: number = 500): Response {
  let errorResponse: EmailError;
  
  if (error.message === "DOMAIN_NOT_VERIFIED") {
    errorResponse = {
      error: "Domínio não verificado no Resend. Verifique se ascomtrazcomunidde.com.br está configurado corretamente.",
      code: "DOMAIN_NOT_VERIFIED",
      timestamp: new Date().toISOString(),
      environment: 'production'
    };
    status = 422;
  } else {
    errorResponse = {
      error: error.message || "Failed to send email",
      code: error.code || "UNKNOWN_ERROR",
      timestamp: new Date().toISOString(),
      environment: 'production'
    };
  }
  
  return new Response(
    JSON.stringify(errorResponse),
    {
      status,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    }
  );
}

export function createValidationErrorResponse(message: string): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    }
  );
}

export function createSuccessResponse(data: any): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

export { corsHeaders };
