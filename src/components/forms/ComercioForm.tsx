
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
import { Store } from 'lucide-react';

// Removido o esquema de comércio - agora redirecionamos para cadastro de passageiro
const ComercioForm = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    toast({
      title: "Funcionalidade temporariamente indisponível",
      description: "O cadastro de comércio foi temporariamente removido. Redirecionando para cadastro de passageiro.",
      variant: "destructive"
    });
    
    // Redirecionar para cadastro de passageiro após 3 segundos
    setTimeout(() => {
      navigate('/cadastro-passageiro');
    }, 3000);
  }, [navigate]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-ascom flex items-center justify-center gap-2">
          <Store className="h-8 w-8" />
          Cadastro de Comércio
        </CardTitle>
        <CardDescription>
          Esta funcionalidade está temporariamente indisponível.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 mb-4">
          O cadastro de comércio foi temporariamente removido do sistema. 
          Você será redirecionado para o cadastro de passageiro.
        </p>
        <Button 
          onClick={() => navigate('/cadastro-passageiro')}
          className="bg-ascom hover:bg-ascom-dark"
        >
          Ir para Cadastro de Passageiro
        </Button>
      </CardContent>
    </Card>
  );
};

export default ComercioForm;
