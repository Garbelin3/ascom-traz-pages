
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { EmailRequest } from './types.ts';
import { validateEmailRequest, validateResendApiKey } from './validation.ts';
import { sendEmailWithRetry } from './email-service.ts';
import { 
  createErrorResponse, 
  createValidationErrorResponse, 
  createSuccessResponse,
  corsHeaders 
} from './error-handler.ts';
import { authenticateUser } from './auth.ts';

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
    // Verify user is authenticated
    await authenticateUser(req);

    // Parse and validate request data
    const emailData: EmailRequest = await req.json();
    
    const validationError = validateEmailRequest(emailData);
    if (validationError) {
      return createValidationErrorResponse(validationError);
    }

    const apiKeyError = validateResendApiKey();
    if (apiKeyError) {
      return createErrorResponse({ message: apiKeyError, code: 'RESEND_API_KEY_MISSING' }, 500);
    }

    // Send email with retry logic
    const result = await sendEmailWithRetry(emailData);
    
    return createSuccessResponse(result);
    
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    
    if (error.message === 'Unauthorized') {
      return createErrorResponse(error, 401);
    }
    
    return createErrorResponse(error);
  }
};

serve(handler);
