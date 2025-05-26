
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

type UserDetails = {
  id: string;
  email: string;
  role: 'admin' | 'entregador' | 'comercio';
  status: 'pendente' | 'aprovado' | 'reprovado';
  created_at: string | null;
  updated_at: string | null;
};

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
  const navigate = useNavigate();

  const getRedirectByRole = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'entregador':
        return '/entregador/dashboard';
      case 'comercio':
        return '/comercio/dashboard';
      default:
        return '/';
    }
  };

  const fetchUserDetails = async (userId: string) => {
    try {
      console.log('AuthContext: Buscando detalhes do usuário para ID:', userId);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('AuthContext: Erro ao buscar detalhes do usuário:', error);
        return null;
      }

      console.log('AuthContext: Detalhes do usuário encontrados:', data);
      return data as UserDetails;
    } catch (error) {
      console.error('AuthContext: Erro ao buscar detalhes do usuário:', error);
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
    console.log('AuthContext: Inicializando autenticação...');
    setIsLoading(true);

    // Configurar o listener de mudança de estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthContext: Auth event:', event, 'Session válida:', !!session);
        
        if (session && session.user) {
          console.log('AuthContext: Sessão válida encontrada, buscando detalhes do usuário...');
          setSession(session);
          setUser(session.user);
          
          // Buscar detalhes do usuário na nossa tabela personalizada
          const details = await fetchUserDetails(session.user.id);
          setUserDetails(details);

          // Redirecionar automaticamente após login se o usuário está aprovado
          if (event === 'SIGNED_IN' && details) {
            console.log('AuthContext: Usuário logado com status:', details.status);
            if (details.status === 'aprovado') {
              console.log('AuthContext: Redirecionando usuário aprovado para:', getRedirectByRole(details.role));
              const redirectPath = getRedirectByRole(details.role);
              navigate(redirectPath, { replace: true });
            } else {
              console.log('AuthContext: Usuário não aprovado, permanecendo na página atual');
              // Se não aprovado, pode redirecionar para uma página de status ou permanecer onde está
            }
          }
        } else {
          console.log('AuthContext: Nenhuma sessão válida, limpando estado');
          setSession(null);
          setUser(null);
          setUserDetails(null);
        }
        
        setIsLoading(false);
      }
    );

    // Verificar sessão existente
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('AuthContext: Verificando sessão existente:', !!session);
      
      if (session && session.user) {
        console.log('AuthContext: Sessão existente encontrada');
        setSession(session);
        setUser(session.user);
        
        const details = await fetchUserDetails(session.user.id);
        setUserDetails(details);
        
        // Se já está logado e aprovado, redirecionar para o dashboard apropriado
        if (details && details.status === 'aprovado') {
          const currentPath = window.location.pathname;
          const expectedPath = getRedirectByRole(details.role);
          
          // Se não está na rota correta, redirecionar
          if (currentPath === '/' || currentPath === '/login') {
            console.log('AuthContext: Redirecionando usuário já logado para:', expectedPath);
            navigate(expectedPath, { replace: true });
          }
        }
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    console.log('AuthContext: Fazendo logout...');
    await supabase.auth.signOut();
    setUserDetails(null);
    setSession(null);
    setUser(null);
    navigate('/login');
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
