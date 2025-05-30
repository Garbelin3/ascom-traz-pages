
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, UserDetails } from './types';
import { getRedirectByRole } from './utils';
import { fetchUserDetails } from './userService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

      if (!skipRedirect && details && details.status === 'aprovado') {
        const currentPath = window.location.pathname;
        const expectedPath = getRedirectByRole(details.role);
        
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
    
    if (event === 'TOKEN_REFRESHED') {
      console.log('AuthContext: Token refreshed, atualizando sessão sem redirecionamento');
      setSession(newSession);
      setUser(newSession?.user ?? null);
      return;
    }

    await updateAuthState(newSession, event === 'INITIAL_SESSION');
  };

  useEffect(() => {
    console.log('AuthContext: Inicializando autenticação...');
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (mounted) {
            handleAuthStateChange(event, session);
            
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'INITIAL_SESSION') {
              setIsLoading(false);
            }
          }
        });

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthContext: Erro ao obter sessão:', error);
          if (mounted) {
            setIsLoading(false);
          }
          return;
        }

        console.log('AuthContext: Verificando sessão existente:', !!session);
        
        if (mounted) {
          if (session) {
            console.log('AuthContext: Sessão persistida encontrada');
            await updateAuthState(session, true);
          }
          setIsLoading(false);
        }

        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('AuthContext: Erro na inicialização:', error);
        if (mounted) {
          setIsLoading(false);
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
