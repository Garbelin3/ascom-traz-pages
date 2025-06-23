
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useEmail } from '@/hooks/useEmail';
import { emailTemplates } from '@/utils/emailTemplates';
import { User, Phone, MapPin } from 'lucide-react';

const passageiroSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  nome_completo: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  endereco_favorito: z.string().optional(),
  cidade: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
  estado: z.string().min(2, 'Estado deve ter pelo menos 2 caracteres'),
  cep: z.string().min(8, 'CEP deve ter 8 dígitos').max(9, 'CEP deve ter no máximo 9 caracteres'),
});

type PassageiroFormData = z.infer<typeof passageiroSchema>;

const PassageiroForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const sendEmail = useEmail();

  const { register, handleSubmit, formState: { errors } } = useForm<PassageiroFormData>({
    resolver: zodResolver(passageiroSchema)
  });

  const onSubmit = async (data: PassageiroFormData) => {
    setIsLoading(true);
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            role: 'passageiro'
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: dbError } = await supabase
          .from('passageiros')
          .insert({
            user_id: authData.user.id,
            nome_completo: data.nome_completo,
            telefone: data.telefone,
            endereco_favorito: data.endereco_favorito || null,
            cidade: data.cidade,
            estado: data.estado,
            cep: data.cep,
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
          <User className="h-8 w-8" />
          Cadastro de Passageiro
        </CardTitle>
        <CardDescription>
          Cadastre-se como passageiro para solicitar corridas na plataforma ASCOM
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
                <Label htmlFor="endereco_favorito">Endereço Favorito (Opcional)</Label>
                <Input
                  id="endereco_favorito"
                  {...register('endereco_favorito')}
                  placeholder="Ex: Casa, Trabalho..."
                />
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

          <Button 
            type="submit" 
            className="w-full bg-ascom hover:bg-ascom-dark"
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar como Passageiro'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PassageiroForm;
