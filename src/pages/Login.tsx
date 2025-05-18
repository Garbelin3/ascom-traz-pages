
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const formSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast({
          title: 'Erro ao fazer login',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      // Verificar o papel/status do usuário
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError) {
        toast({
          title: 'Erro ao obter dados do usuário',
          description: userError.message,
          variant: 'destructive',
        });
        return;
      }

      if (userData.status !== 'aprovado') {
        toast({
          title: 'Conta pendente de aprovação',
          description: 'Seu cadastro ainda não foi aprovado por um administrador.',
          variant: 'destructive',
        });
        // Deslogar o usuário já que ele não está aprovado
        await supabase.auth.signOut();
        return;
      }

      toast({
        title: 'Login realizado com sucesso!',
        description: 'Você será redirecionado para a área apropriada.',
      });

      // Redirecionar com base no papel
      switch (userData.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'entregador':
          navigate('/entregador/dashboard');
          break;
        case 'comercio':
          navigate('/comercio/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error: any) {
      toast({
        title: 'Erro inesperado',
        description: error.message || 'Ocorreu um erro ao fazer login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 p-4">
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Entre com seu email e senha para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="seu-email@exemplo.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-ascom hover:bg-ascom-dark"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Não tem uma conta ainda?
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/cadastro-entregador')}
              >
                Cadastro Entregador
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/cadastro-comercio')}
              >
                Cadastro Comércio
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
