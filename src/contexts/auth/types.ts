
import { Session, User } from '@supabase/supabase-js';

export type UserDetails = {
  id: string;
  email: string;
  role: 'admin' | 'motorista' | 'passageiro';
  status: 'pendente' | 'aprovado' | 'reprovado';
  created_at: string | null;
  updated_at: string | null;
};

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshUserDetails: () => Promise<void>;
};
