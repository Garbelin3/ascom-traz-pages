
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, session, userDetails, isLoading: authLoading } = useAuth();
  
  console.log('Login page: Auth state -', { 
    user: !!user, 
    session: !!session, 
    userDetails: !!userDetails, 
    authLoading,
    sessionValid: session && session.expires_at && session.expires_at > Date.now() / 1000
  });
  
  // Só redirecionar se o usuário estiver realmente autenticado com sessão válida
  useEffect(() => {
    if (!authLoading && user && session && userDetails) {
      // Verificar se a sessão é válida
      const isValidSession = session.access_token && session.expires_at && session.expires_at > Date.now() / 1000;
      
      if (isValidSession && userDetails.status === 'aprovado') {
        console.log('Login page: Redirecionando usuário autenticado para dashboard');
        const from = location.state?.from?.pathname || getRedirectByRole(userDetails.role);
        navigate(from, { replace: true });
      }
    }
  }, [user, session, userDetails, authLoading, navigate, location]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      console.log('Login: Tentando fazer login...');

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error('Login: Erro de autenticação:', error);
        toast({
          title: 'Erro ao fazer login',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      console.log('Login: Autenticação bem-sucedida, verificando dados do usuário...');

      // Verificar o papel/status do usuário
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError) {
        console.error('Login: Erro ao obter dados do usuário:', userError);
        toast({
          title: 'Erro ao obter dados do usuário',
          description: userError.message,
          variant: 'destructive',
        });
        return;
      }

      if (userData.status !== 'aprovado') {
        console.log('Login: Usuário não aprovado, fazendo logout...');
        toast({
          title: 'Conta pendente de aprovação',
          description: 'Seu cadastro ainda não foi aprovado por um administrador.',
          variant: 'destructive',
        });
        // Deslogar o usuário já que ele não está aprovado
        await supabase.auth.signOut();
        return;
      }

      console.log('Login: Login completo, redirecionando...');
      toast({
        title: 'Login realizado com sucesso!',
        description: 'Você será redirecionado para a área apropriada.',
      });

      // Redirecionar com base no papel
      const redirectTo = location.state?.from?.pathname || getRedirectByRole(userData.role);
      navigate(redirectTo, { replace: true });
      
    } catch (error: any) {
      console.error('Login: Erro inesperado:', error);
      toast({
        title: 'Erro inesperado',
        description: error.message || 'Ocorreu um erro ao fazer login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper para determinar para onde redirecionar com base no papel do usuário
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

  // Mostrar loading se ainda estiver verificando autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-blue-100">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ascom mx-auto mb-4"></div>
            <p className="text-gray-600">Verificando autenticação...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <NavBar />
      <div className="flex-grow flex items-center justify-center p-4 my-12">
        <Card className="mx-auto max-w-md w-full shadow-xl border border-blue-100 overflow-hidden">
          <CardHeader className="space-y-1 bg-gradient-to-r from-ascom-light to-ascom text-white p-6">
            <CardTitle className="text-2xl font-bold text-center">Acesse sua conta</CardTitle>
            <CardDescription className="text-center text-white/90">
              Entre com seu email e senha para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="seu-email@exemplo.com"
                          type="email"
                          className="h-11 rounded-md border-gray-300 focus:border-ascom focus:ring-1 focus:ring-ascom"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Senha</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          className="h-11 rounded-md border-gray-300 focus:border-ascom focus:ring-1 focus:ring-ascom"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-ascom to-ascom-light hover:from-ascom-light hover:to-ascom text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-gray-50 p-6 border-t border-gray-100">
            <div className="text-sm text-center text-gray-600 font-medium">
              Não tem uma conta ainda?
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              <Link to="/cadastro-entregador">
                <Button
                  variant="outline"
                  className="w-full border-ascom text-ascom hover:bg-ascom-light hover:text-white hover:border-transparent transition-all duration-300"
                >
                  Cadastro Entregador
                </Button>
              </Link>
              <Link to="/cadastro-comercio">
                <Button
                  variant="outline"
                  className="w-full border-ascom text-ascom hover:bg-ascom-light hover:text-white hover:border-transparent transition-all duration-300"
                >
                  Cadastro Comércio
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
