
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useEmail } from '@/hooks/useEmail';
import { emailTemplates } from '@/utils/emailTemplates';
import { Truck, User, Phone, MapPin, FileText, Calendar } from 'lucide-react';

const entregadorSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  nome_completo: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  endereco: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  cidade: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
  estado: z.string().min(2, 'Estado deve ter pelo menos 2 caracteres'),
  cep: z.string().min(8, 'CEP deve ter 8 dígitos').max(9, 'CEP deve ter no máximo 9 caracteres'),
  veiculo: z.enum(['moto', 'carro', 'bicicleta'], { required_error: 'Selecione um tipo de veículo' }),
  cnh: z.string().optional(),
  modelo_veiculo: z.string().optional(),
  placa_veiculo: z.string().optional(),
  cor_veiculo: z.string().optional(),
  ano_veiculo: z.number().optional(),
});

type EntregadorFormData = z.infer<typeof entregadorSchema>;

const EntregadorForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const sendEmail = useEmail();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<EntregadorFormData>({
    resolver: zodResolver(entregadorSchema)
  });

  const onSubmit = async (data: EntregadorFormData) => {
    setIsLoading(true);
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            role: 'motorista'
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: dbError } = await supabase
          .from('motoristas')
          .insert({
            user_id: authData.user.id,
            nome_completo: data.nome_completo,
            telefone: data.telefone,
            endereco: data.endereco,
            cidade: data.cidade,
            estado: data.estado,
            cep: data.cep,
            veiculo: data.veiculo,
            cnh: data.cnh || null,
            modelo_veiculo: data.modelo_veiculo || null,
            placa_veiculo: data.placa_veiculo || null,
            cor_veiculo: data.cor_veiculo || null,
            ano_veiculo: data.ano_veiculo || null,
            status: 'pendente'
          });

        if (dbError) throw dbError;

        // Enviar email de boas-vindas
        try {
          await sendEmail.mutateAsync({
            to: data.email,
            subject: 'Bem-vindo à ASCOM - Cadastro Recebido',
            html: emailTemplates.welcome(data.nome_completo),
            isProduction: true,
          });
        } catch (emailError) {
          console.error('Erro ao enviar email:', emailError);
        }

        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Sua solicitação foi enviada para análise.",
        });

        navigate('/cadastro-sucesso');
      }
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao processar seu cadastro",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-ascom flex items-center justify-center gap-2">
          <Truck className="h-8 w-8" />
          Cadastro de Entregador
        </CardTitle>
        <CardDescription>
          Cadastre-se como entregador/motorista na plataforma ASCOM
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Dados de Login */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Dados de Acesso
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
            </div>
          </div>

          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Dados Pessoais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome_completo">Nome Completo</Label>
                <Input
                  id="nome_completo"
                  {...register('nome_completo')}
                  className={errors.nome_completo ? 'border-red-500' : ''}
                />
                {errors.nome_completo && <p className="text-red-500 text-sm mt-1">{errors.nome_completo.message}</p>}
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  {...register('telefone')}
                  className={errors.telefone ? 'border-red-500' : ''}
                />
                {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>}
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Endereço
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  {...register('endereco')}
                  className={errors.endereco ? 'border-red-500' : ''}
                />
                {errors.endereco && <p className="text-red-500 text-sm mt-1">{errors.endereco.message}</p>}
              </div>
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  {...register('cidade')}
                  className={errors.cidade ? 'border-red-500' : ''}
                />
                {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade.message}</p>}
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  {...register('estado')}
                  className={errors.estado ? 'border-red-500' : ''}
                />
                {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado.message}</p>}
              </div>
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  {...register('cep')}
                  className={errors.cep ? 'border-red-500' : ''}
                />
                {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep.message}</p>}
              </div>
            </div>
          </div>

          {/* Dados do Veículo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Dados do Veículo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="veiculo">Tipo de Veículo</Label>
                <Select onValueChange={(value) => setValue('veiculo', value as any)}>
                  <SelectTrigger className={errors.veiculo ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione o tipo de veículo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moto">Moto</SelectItem>
                    <SelectItem value="carro">Carro</SelectItem>
                    <SelectItem value="bicicleta">Bicicleta</SelectItem>
                  </SelectContent>
                </Select>
                {errors.veiculo && <p className="text-red-500 text-sm mt-1">{errors.veiculo.message}</p>}
              </div>
              <div>
                <Label htmlFor="cnh">CNH (Opcional)</Label>
                <Input
                  id="cnh"
                  {...register('cnh')}
                />
              </div>
              <div>
                <Label htmlFor="modelo_veiculo">Modelo do Veículo (Opcional)</Label>
                <Input
                  id="modelo_veiculo"
                  {...register('modelo_veiculo')}
                />
              </div>
              <div>
                <Label htmlFor="placa_veiculo">Placa do Veículo (Opcional)</Label>
                <Input
                  id="placa_veiculo"
                  {...register('placa_veiculo')}
                />
              </div>
              <div>
                <Label htmlFor="cor_veiculo">Cor do Veículo (Opcional)</Label>
                <Input
                  id="cor_veiculo"
                  {...register('cor_veiculo')}
                />
              </div>
              <div>
                <Label htmlFor="ano_veiculo">Ano do Veículo (Opcional)</Label>
                <Input
                  id="ano_veiculo"
                  type="number"
                  {...register('ano_veiculo', { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-ascom hover:bg-ascom-dark"
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar como Entregador'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EntregadorForm;
