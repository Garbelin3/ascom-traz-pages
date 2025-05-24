
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type UserDetails = Database['public']['Tables']['users']['Row'];

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshUserDetails: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erro ao buscar detalhes do usuário:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do usuário:', error);
      return null;
    }
  };

  const refreshUserDetails = async () => {
    if (user) {
      const details = await fetchUserDetails(user.id);
      setUserDetails(details);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    console.log('AuthContext: Inicializando autenticação...');

    // Configurar o listener de mudança de estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('AuthContext: Auth event:', event, 'Session valid:', !!session);
        
        // Verificar se a sessão é válida antes de definir o estado
        const isValidSession = session && session.access_token && session.expires_at && session.expires_at > Date.now() / 1000;
        
        if (isValidSession) {
          setSession(session);
          setUser(session.user);
          
          // Buscar detalhes do usuário
          setTimeout(() => {
            fetchUserDetails(session.user.id).then(details => {
              setUserDetails(details);
              setIsLoading(false);
            });
          }, 0);
        } else {
          // Limpar estado se a sessão não for válida
          console.log('AuthContext: Sessão inválida ou expirada, limpando estado');
          setSession(null);
          setUser(null);
          setUserDetails(null);
          setIsLoading(false);
        }
      }
    );

    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('AuthContext: Verificando sessão existente:', !!session);
      
      const isValidSession = session && session.access_token && session.expires_at && session.expires_at > Date.now() / 1000;
      
      if (isValidSession) {
        setSession(session);
        setUser(session.user);
        
        fetchUserDetails(session.user.id).then(details => {
          setUserDetails(details);
          setIsLoading(false);
        });
      } else {
        console.log('AuthContext: Nenhuma sessão válida encontrada');
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    console.log('AuthContext: Fazendo logout...');
    await supabase.auth.signOut();
    setUserDetails(null);
    setSession(null);
    setUser(null);
  };

  const value = {
    session,
    user,
    userDetails,
    isLoading,
    signOut,
    refreshUserDetails
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
