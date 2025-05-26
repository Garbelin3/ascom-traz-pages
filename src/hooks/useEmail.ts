
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
  originalRecipient: string;
  finalRecipient: string;
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
          ...emailData,
          isProduction: true // Configurar para produção
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
          throw new Error('Domínio não verificado no Resend. Configure um domínio próprio para envio em produção.');
        }
        
        throw new Error(emailError.error || 'Erro do serviço de email');
      }

      console.log('Email sent successfully:', data);
      return data as EmailResponse;
    },
    onSuccess: (data: EmailResponse) => {
      console.log('Email mutation success:', data);
      
      const isDevEnvironment = data.environment === 'development';
      const successMessage = isDevEnvironment 
        ? `Email enviado para teste (${data.finalRecipient}). Em produção seria enviado para ${data.originalRecipient}.`
        : 'O email foi enviado com sucesso.';
      
      toast({
        title: 'Email enviado!',
        description: successMessage,
      });
    },
    onError: (error: Error) => {
      console.error('Email mutation error:', error);
      
      let errorMessage = error.message || 'Ocorreu um erro ao enviar o email.';
      let errorTitle = 'Erro ao enviar email';
      
      // Handle specific domain verification error
      if (error.message.includes('verify a domain') || error.message.includes('Domain verification') || error.message.includes('Domínio não verificado')) {
        errorTitle = 'Configuração de Produção Necessária';
        errorMessage = 'Para envio em produção, é necessário configurar um domínio próprio no Resend. Entre em contato com o administrador.';
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
