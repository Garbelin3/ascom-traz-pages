
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
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

const formSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  nome_estabelecimento: z.string().min(2, 'Nome do estabelecimento deve ter pelo menos 2 caracteres'),
  nome_responsavel: z.string().min(2, 'Nome do responsável deve ter pelo menos 2 caracteres'),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  tipo_negocio: z.string().min(2, 'Tipo de negócio deve ter pelo menos 2 caracteres'),
  endereco: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  cidade: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
  estado: z.string().min(2, 'Estado deve ter pelo menos 2 caracteres'),
  cep: z.string().min(8, 'CEP deve ter 8 dígitos').max(9, 'CEP deve ter no máximo 9 dígitos'),
});

type FormValues = z.infer<typeof formSchema>;

const ComercioForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      nome_estabelecimento: '',
      nome_responsavel: '',
      telefone: '',
      tipo_negocio: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      console.log('ComercioForm: Iniciando cadastro com Supabase Auth...');

      // 1. Criar usuário no Supabase Auth com metadados
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            role: 'comercio'
          }
        }
      });

      if (authError) {
        console.error('ComercioForm: Erro no Supabase Auth:', authError);
        toast({
          title: 'Erro ao criar conta',
          description: authError.message,
          variant: 'destructive',
        });
        return;
      }

      if (!authData.user) {
        console.error('ComercioForm: Usuário não foi criado');
        toast({
          title: 'Erro ao criar conta',
          description: 'Erro interno do servidor',
          variant: 'destructive',
        });
        return;
      }

      console.log('ComercioForm: Usuário criado com sucesso:', authData.user.id);

      // Aguardar um pouco para garantir que o trigger foi executado
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 2. Inserir dados específicos do comércio
      const { error: comercioError } = await supabase
        .from('comercios')
        .insert({
          user_id: authData.user.id,
          nome_estabelecimento: data.nome_estabelecimento,
          nome_responsavel: data.nome_responsavel,
          telefone: data.telefone,
          tipo_negocio: data.tipo_negocio,
          endereco: data.endereco,
          cidade: data.cidade,
          estado: data.estado,
          cep: data.cep,
        });

      if (comercioError) {
        console.error('ComercioForm: Erro ao inserir dados do comércio:', comercioError);
        toast({
          title: 'Erro ao salvar dados',
          description: 'Houve um problema ao salvar seus dados',
          variant: 'destructive',
        });
        return;
      }

      console.log('ComercioForm: Cadastro completo realizado com sucesso');
      
      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Seu cadastro foi enviado para aprovação.',
      });

      navigate('/cadastro-sucesso');
      
    } catch (error: any) {
      console.error('ComercioForm: Erro inesperado:', error);
      toast({
        title: 'Erro inesperado',
        description: error.message || 'Ocorreu um erro ao processar o cadastro',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-ascom mb-4">
          Cadastro de Comércio
        </h1>
        <p className="text-gray-600">
          Preencha os dados abaixo para cadastrar seu estabelecimento na plataforma ASCOM
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Dados de Login */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Dados de Acesso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu-email@exemplo.com" type="email" {...field} />
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
                      <Input placeholder="Mínimo 6 caracteres" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Dados do Estabelecimento */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Dados do Estabelecimento</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="nome_estabelecimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Estabelecimento</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do seu negócio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome_responsavel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Responsável</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 00000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="tipo_negocio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Negócio</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Restaurante, Farmácia, Supermercado..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Endereço do Estabelecimento</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Rua, número, complemento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="cidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Cidade do estabelecimento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="UF" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input placeholder="00000-000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-ascom to-ascom-light hover:from-ascom-light hover:to-ascom text-white font-semibold py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ComercioForm;
