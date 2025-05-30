
import { EmailRequest } from './types.ts';

export function validateEmailRequest(emailData: EmailRequest): string | null {
  if (!emailData.to || !emailData.subject || !emailData.html) {
    return 'Missing required fields: to, subject, html';
  }
  return null;
}

export function validateResendApiKey(): string | null {
  if (!Deno.env.get("RESEND_API_KEY")) {
    console.error('RESEND_API_KEY not configured');
    return 'Email service not configured. Please contact administrator.';
  }
  return null;
}
