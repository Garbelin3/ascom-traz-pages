
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  nome_estabelecimento: z.string().min(2, "Nome do estabelecimento deve ter pelo menos 2 caracteres"),
  nome_responsavel: z.string().min(2, "Nome do responsável deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmarSenha: z.string().min(6, "Confirme sua senha"),
  telefone: z.string().min(10, "Telefone inválido"),
  endereco: z.string().min(5, "Endereço inválido"),
  cidade: z.string().min(2, "Cidade inválida"),
  estado: z.string().min(2, "Estado inválido"),
  cep: z.string().min(8, "CEP inválido"),
  tipo_negocio: z.string().min(2, "Tipo de negócio deve ser especificado"),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

type FormValues = z.infer<typeof formSchema>;

const ComercioForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome_estabelecimento: "",
      nome_responsavel: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      telefone: "",
      endereco: "",
      cidade: "",
      estado: "",
      cep: "",
      tipo_negocio: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      // 1. Criar o usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.senha,
      });

      if (authError) {
        throw authError;
      }

      const userId = authData.user?.id;
      if (!userId) {
        throw new Error("Falha ao criar usuário");
      }

      // 2. Inserir no banco users
      const { error: usersError } = await supabase
        .from("users")
        .insert({
          id: userId,
          email: data.email,
          password: data.senha, // Normalmente não armazenamos senhas, mas este é um requisito do projeto
          role: "comercio",
          status: "pendente",
        });

      if (usersError) {
        throw usersError;
      }

      // 3. Inserir dados do comércio
      const { error: comercioError } = await supabase
        .from("comercios")
        .insert({
          user_id: userId,
          nome_estabelecimento: data.nome_estabelecimento,
          nome_responsavel: data.nome_responsavel,
          telefone: data.telefone,
          endereco: data.endereco,
          cidade: data.cidade,
          estado: data.estado,
          cep: data.cep,
          tipo_negocio: data.tipo_negocio,
        });

      if (comercioError) {
        throw comercioError;
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Aguarde a aprovação do administrador.",
      });

      // Redirecionamento após o cadastro bem-sucedido
      navigate("/cadastro-sucesso");
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao processar seu cadastro",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Cadastro de Comércio</h2>
        <p className="text-gray-600">Preencha os dados abaixo para cadastrar seu estabelecimento</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nome_estabelecimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Estabelecimento</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do estabelecimento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nome_responsavel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Responsável</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome completo do responsável" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seu-email@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmarSenha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(99) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endereco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Rua, número, bairro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua cidade" {...field} />
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
                    <Input placeholder="ES" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <FormField
            control={form.control}
            name="tipo_negocio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Negócio</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Restaurante, Loja, Mercado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-ascom hover:bg-ascom-dark" 
            disabled={loading}
          >
            {loading ? "Enviando..." : "Cadastrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ComercioForm;
