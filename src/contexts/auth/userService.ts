
import { supabase } from '@/integrations/supabase/client';
import { UserDetails } from './types';

export const fetchUserDetails = async (userId: string): Promise<UserDetails | null> => {
  try {
    console.log('UserService: Buscando detalhes do usuário para ID:', userId);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('UserService: Erro ao buscar detalhes do usuário:', error);
      return null;
    }

    console.log('UserService: Detalhes do usuário encontrados:', data);
    return data as UserDetails;
  } catch (error) {
    console.error('UserService: Erro ao buscar detalhes do usuário:', error);
    return null;
  }
};
