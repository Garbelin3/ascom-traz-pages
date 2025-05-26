
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export const useEmail = () => {
  return useMutation({
    mutationFn: async (emailData: EmailData) => {
      console.log('Sending email:', emailData);
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: emailData,
      });

      if (error) {
        console.error('Email error:', error);
        throw new Error(error.message || 'Erro ao enviar email');
      }

      // Check if the response contains an error from the email service
      if (data && data.error) {
        console.error('Email service error:', data.error);
        throw new Error(data.error || 'Erro do serviço de email');
      }

      return data;
    },
    onSuccess: () => {
      console.log('Email sent successfully');
      toast({
        title: 'Email enviado!',
        description: 'O email foi enviado com sucesso (modo de teste - verifique admin@codeprogram.com.br).',
      });
    },
    onError: (error: Error) => {
      console.error('Email mutation error:', error);
      
      let errorMessage = error.message || 'Ocorreu um erro ao enviar o email.';
      let errorTitle = 'Erro ao enviar email';
      
      // Handle specific domain verification error
      if (error.message.includes('verify a domain') || error.message.includes('Domain verification')) {
        errorTitle = 'Domínio não verificado';
        errorMessage = 'É necessário verificar o domínio no Resend. Entre em contato com o administrador.';
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });
};
