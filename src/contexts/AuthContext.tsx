
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
  const [isInitialized, setIsInitialized] = useState(false);
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

  const updateAuthState = async (newSession: Session | null, skipRedirect = false) => {
    console.log('AuthContext: Atualizando estado de auth - Sessão válida:', !!newSession);
    
    setSession(newSession);
    setUser(newSession?.user ?? null);
    
    if (newSession?.user) {
      console.log('AuthContext: Usuário logado, buscando detalhes...');
      const details = await fetchUserDetails(newSession.user.id);
      setUserDetails(details);

      // Só redireciona se não for para pular o redirecionamento e se o usuário estiver aprovado
      if (!skipRedirect && details && details.status === 'aprovado') {
        const currentPath = window.location.pathname;
        const expectedPath = getRedirectByRole(details.role);
        
        // Só redireciona se estiver em páginas de login ou página inicial
        if (currentPath === '/' || currentPath === '/login') {
          console.log('AuthContext: Redirecionando usuário aprovado para:', expectedPath);
          navigate(expectedPath, { replace: true });
        }
      }
    } else {
      console.log('AuthContext: Nenhuma sessão válida, limpando estado');
      setUserDetails(null);
    }
  };

  const handleAuthStateChange = async (event: string, newSession: Session | null) => {
    console.log('AuthContext: Auth event:', event, 'Session válida:', !!newSession);
    
    // Para eventos de refresh de token, não fazer redirecionamento
    const skipRedirect = event === 'TOKEN_REFRESHED';
    
    await updateAuthState(newSession, skipRedirect);
    
    // Marca como inicializado após o primeiro evento processado
    if (!isInitialized) {
      console.log('AuthContext: Primeira inicialização completa');
      setIsInitialized(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('AuthContext: Inicializando autenticação...');
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Configurar o listener primeiro
        const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

        // Verificar sessão existente
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthContext: Erro ao obter sessão:', error);
          if (mounted) {
            setIsLoading(false);
            setIsInitialized(true);
          }
          return;
        }

        console.log('AuthContext: Verificando sessão existente:', !!session);
        
        if (mounted) {
          // Se há uma sessão existente, processa ela sem redirecionamento automático
          if (session) {
            console.log('AuthContext: Sessão persistida encontrada');
            await updateAuthState(session, true); // skipRedirect = true para sessões persistidas
          }
          
          setIsInitialized(true);
          setIsLoading(false);
        }

        // Cleanup
        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('AuthContext: Erro na inicialização:', error);
        if (mounted) {
          setIsLoading(false);
          setIsInitialized(true);
        }
      }
    };

    initializeAuth();
  }, [navigate]);

  const signOut = async () => {
    console.log('AuthContext: Fazendo logout...');
    setIsLoading(true);
    
    try {
      await supabase.auth.signOut();
      setUserDetails(null);
      setSession(null);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('AuthContext: Erro no logout:', error);
    } finally {
      setIsLoading(false);
    }
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
