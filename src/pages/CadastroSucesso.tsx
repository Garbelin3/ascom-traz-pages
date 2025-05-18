
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CadastroSucesso = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-green-100 w-20 h-20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Cadastro Realizado!</CardTitle>
          <CardDescription>Seu cadastro foi enviado com sucesso.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600">
            Agradecemos pelo seu interesse em se juntar à Ascom Traz Comunidade. 
            Seu cadastro está em análise pela nossa equipe.
          </p>
          <p className="mt-4 text-gray-600">
            Você receberá uma notificação por email assim que seu cadastro for aprovado.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
          >
            Voltar à página inicial
          </Button>
          <Button
            onClick={() => navigate("/login")}
            className="bg-ascom hover:bg-ascom-dark"
          >
            Ir para login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CadastroSucesso;
