
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const usePassageiroData = (user: User | null) => {
  const [passageiroData, setPassageiroData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPassageiroData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('passageiros')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setPassageiroData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do passageiro:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPassageiroData();
  }, [user]);

  return { passageiroData, isLoading };
};
