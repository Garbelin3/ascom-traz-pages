
import { Resend } from "npm:resend@2.0.0";
import { EmailRequest, EmailResponse } from './types.ts';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

export async function sendEmailWithRetry(emailData: EmailRequest): Promise<EmailResponse> {
  const fromAddress = "ASCOM <contato@ascomtrazcomunidde.com.br>";
  
  console.log(`[PRODUCTION] Sending email to: ${emailData.to}, Subject: ${emailData.subject}`);

  let emailResponse;
  let retryCount = 0;
  const maxRetries = 3;

  while (retryCount < maxRetries) {
    try {
      console.log(`Attempt ${retryCount + 1}: Sending email from ${fromAddress} to ${emailData.to}`);
      
      emailResponse = await resend.emails.send({
        from: fromAddress,
        to: [emailData.to],
        subject: emailData.subject,
        html: emailData.html,
      });

      console.log('Resend response:', emailResponse);

      if (emailResponse.error) {
        throw new Error(`Resend API error: ${emailResponse.error.message}`);
      }

      if (emailResponse.data && emailResponse.data.id) {
        console.log(`Email sent successfully with ID: ${emailResponse.data.id}`);
        break;
      } else {
        throw new Error('Invalid response from Resend API');
      }

    } catch (error) {
      retryCount++;
      console.error(`Email send attempt ${retryCount} failed:`, error);
      
      if (retryCount >= maxRetries) {
        if (error.message && error.message.includes('domain is not verified')) {
          throw new Error("DOMAIN_NOT_VERIFIED");
        }
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
    }
  }

  const logData = {
    environment: 'production',
    recipient: emailData.to,
    subject: emailData.subject,
    emailId: emailResponse.data?.id,
    timestamp: new Date().toISOString(),
    retryCount
  };
  
  console.log("Email sent successfully:", logData);

  return {
    success: true,
    data: emailResponse.data,
    environment: 'production',
    recipient: emailData.to,
    retryCount
  };
}
