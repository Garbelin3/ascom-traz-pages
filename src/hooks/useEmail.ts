
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
  isProduction?: boolean;
}

interface EmailResponse {
  success: boolean;
  data?: any;
  environment: string;
  recipient: string;
  retryCount: number;
}

interface EmailError {
  error: string;
  code?: string;
  timestamp: string;
  environment: string;
}

export const useEmail = () => {
  return useMutation({
    mutationFn: async (emailData: EmailData): Promise<EmailResponse> => {
      console.log('Sending email:', emailData);
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: emailData.to,
          subject: emailData.subject,
          html: emailData.html,
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Erro ao chamar função de email');
      }

      // Check if the response contains an error from the email service
      if (data && data.error) {
        console.error('Email service error:', data);
        const emailError = data as EmailError;
        
        // Handle specific error codes
        if (emailError.code === 'DOMAIN_NOT_VERIFIED') {
          throw new Error('Domínio não verificado no Resend. Verifique se ascomtrazcomunidde.com.br está configurado corretamente.');
        }
        
        throw new Error(emailError.error || 'Erro do serviço de email');
      }

      console.log('Email sent successfully:', data);
      return data as EmailResponse;
    },
    onSuccess: (data: EmailResponse) => {
      console.log('Email mutation success:', data);
      
      toast({
        title: 'Email enviado com sucesso!',
        description: `O email foi enviado para ${data.recipient}.`,
      });
    },
    onError: (error: Error) => {
      console.error('Email mutation error:', error);
      
      let errorMessage = error.message || 'Ocorreu um erro ao enviar o email.';
      let errorTitle = 'Erro ao enviar email';
      
      // Handle specific domain verification error
      if (error.message.includes('verify a domain') || error.message.includes('Domain verification') || error.message.includes('Domínio não verificado')) {
        errorTitle = 'Configuração de Domínio';
        errorMessage = 'Verifique se o domínio ascomtrazcomunidde.com.br está configurado e verificado no Resend.';
      }
      
      // Handle retry information
      if (error.message.includes('retry')) {
        errorTitle = 'Falha Temporária';
        errorMessage = 'Houve uma falha temporária no envio. Tente novamente em alguns minutos.';
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });
};
