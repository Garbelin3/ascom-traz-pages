
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

      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Email enviado!',
        description: 'O email foi enviado com sucesso.',
      });
    },
    onError: (error: Error) => {
      console.error('Email mutation error:', error);
      toast({
        title: 'Erro ao enviar email',
        description: error.message || 'Ocorreu um erro ao enviar o email.',
        variant: 'destructive',
      });
    },
  });
};
