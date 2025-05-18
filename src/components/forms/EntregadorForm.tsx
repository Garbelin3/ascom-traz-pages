
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmarSenha: z.string().min(6, "Confirme sua senha"),
  telefone: z.string().min(10, "Telefone inválido"),
  endereco: z.string().min(5, "Endereço inválido"),
  cidade: z.string().min(2, "Cidade inválida"),
  estado: z.string().min(2, "Estado inválido"),
  cep: z.string().min(8, "CEP inválido"),
  veiculo: z.enum(["moto", "carro", "bicicleta"]),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

type FormValues = z.infer<typeof formSchema>;

const EntregadorForm = () => {
  const [loading, setLoading] = useState(false);
  const [cnhFile, setCnhFile] = useState<File | null>(null);
  const [documentoVeiculoFile, setDocumentoVeiculoFile] = useState<File | null>(null);
  const [isVeiculoMotorizado, setIsVeiculoMotorizado] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      telefone: "",
      endereco: "",
      cidade: "",
      estado: "",
      cep: "",
      veiculo: "bicicleta",
    },
  });

  const onVeiculoChange = (value: string) => {
    setIsVeiculoMotorizado(value === "moto" || value === "carro");
  };

  const handleCnhChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCnhFile(event.target.files[0]);
    }
  };

  const handleDocumentoVeiculoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setDocumentoVeiculoFile(event.target.files[0]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      if (isVeiculoMotorizado && !cnhFile) {
        toast({
          title: "Erro",
          description: "CNH é obrigatória para moto ou carro",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

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
          role: "entregador",
          status: "pendente",
        });

      if (usersError) {
        throw usersError;
      }

      let cnhUrl = null;
      let documentoVeiculoUrl = null;

      // 3. Upload dos arquivos (se houver)
      if (cnhFile) {
        const cnhFileName = `${userId}/cnh_${uuidv4()}`;
        const { error: uploadCnhError, data: uploadCnhData } = await supabase.storage
          .from("documents")
          .upload(cnhFileName, cnhFile);

        if (uploadCnhError) {
          throw uploadCnhError;
        }

        cnhUrl = uploadCnhData.path;
      }

      if (documentoVeiculoFile) {
        const docFileName = `${userId}/doc_veiculo_${uuidv4()}`;
        const { error: uploadDocError, data: uploadDocData } = await supabase.storage
          .from("documents")
          .upload(docFileName, documentoVeiculoFile);

        if (uploadDocError) {
          throw uploadDocError;
        }

        documentoVeiculoUrl = uploadDocData.path;
      }

      // 4. Inserir dados do entregador
      const { error: entregadorError } = await supabase
        .from("entregadores")
        .insert({
          user_id: userId,
          nome: data.nome,
          telefone: data.telefone,
          endereco: data.endereco,
          cidade: data.cidade,
          estado: data.estado,
          cep: data.cep,
          veiculo: data.veiculo,
          cnh_url: cnhUrl,
          documento_veiculo_url: documentoVeiculoUrl,
        });

      if (entregadorError) {
        throw entregadorError;
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
        <h2 className="text-2xl font-bold">Cadastro de Entregador</h2>
        <p className="text-gray-600">Preencha os dados abaixo para se cadastrar como entregador</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome completo" {...field} />
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
            name="veiculo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Veículo</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    onVeiculoChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de veículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="moto">Moto</SelectItem>
                    <SelectItem value="carro">Carro</SelectItem>
                    <SelectItem value="bicicleta">Bicicleta</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {isVeiculoMotorizado && (
            <div className="space-y-4">
              <div>
                <FormLabel htmlFor="cnh" className="block mb-2">
                  CNH (obrigatório para moto/carro)
                </FormLabel>
                <Input
                  id="cnh"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleCnhChange}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Formatos aceitos: PDF, JPG, PNG
                </p>
              </div>

              <div>
                <FormLabel htmlFor="docVeiculo" className="block mb-2">
                  Documento do Veículo (opcional)
                </FormLabel>
                <Input
                  id="docVeiculo"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleDocumentoVeiculoChange}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Formatos aceitos: PDF, JPG, PNG
                </p>
              </div>
            </div>
          )}

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

export default EntregadorForm;
