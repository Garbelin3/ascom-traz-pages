
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
  const [hasInitialized, setHasInitialized] = useState(false);
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

  const handleAuthStateChange = async (event: string, session: Session | null) => {
    console.log('AuthContext: Auth event:', event, 'Session válida:', !!session);
    
    setSession(session);
    setUser(session?.user ?? null);
    
    if (session?.user) {
      console.log('AuthContext: Usuário logado, buscando detalhes...');
      const details = await fetchUserDetails(session.user.id);
      setUserDetails(details);

      // Só redireciona automaticamente no evento SIGNED_IN (não em TOKEN_REFRESHED ou outros)
      if (event === 'SIGNED_IN' && details && details.status === 'aprovado') {
        console.log('AuthContext: Redirecionando usuário aprovado para:', getRedirectByRole(details.role));
        const redirectPath = getRedirectByRole(details.role);
        navigate(redirectPath, { replace: true });
      }
    } else {
      console.log('AuthContext: Nenhuma sessão válida, limpando estado');
      setUserDetails(null);
    }
    
    // Só marca como carregamento finalizado após a primeira inicialização
    if (!hasInitialized) {
      setHasInitialized(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('AuthContext: Inicializando autenticação...');
    let mounted = true;

    // Configurar o listener primeiro
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Verificar sessão existente apenas uma vez na inicialização
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthContext: Erro ao obter sessão:', error);
          if (mounted) {
            setIsLoading(false);
            setHasInitialized(true);
          }
          return;
        }

        console.log('AuthContext: Verificando sessão existente:', !!session);
        
        if (mounted) {
          if (session?.user) {
            console.log('AuthContext: Sessão existente encontrada');
            setSession(session);
            setUser(session.user);
            
            const details = await fetchUserDetails(session.user.id);
            setUserDetails(details);
            
            // Para usuários já logados, só redireciona se estiver em páginas específicas
            if (details && details.status === 'aprovado') {
              const currentPath = window.location.pathname;
              const expectedPath = getRedirectByRole(details.role);
              
              if (currentPath === '/' || currentPath === '/login') {
                console.log('AuthContext: Redirecionando usuário já logado para:', expectedPath);
                navigate(expectedPath, { replace: true });
              }
            }
          } else {
            console.log('AuthContext: Nenhuma sessão existente');
          }
          
          setIsLoading(false);
          setHasInitialized(true);
        }
      } catch (error) {
        console.error('AuthContext: Erro na inicialização:', error);
        if (mounted) {
          setIsLoading(false);
          setHasInitialized(true);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    console.log('AuthContext: Fazendo logout...');
    setIsLoading(true);
    await supabase.auth.signOut();
    setUserDetails(null);
    setSession(null);
    setUser(null);
    setIsLoading(false);
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
