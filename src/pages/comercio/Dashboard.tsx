
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Store, AlertCircle } from 'lucide-react';

const ComercioDashboard: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar para passageiro dashboard após 3 segundos
    const timer = setTimeout(() => {
      navigate('/passageiro/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-ascom text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Store className="h-8 w-8" />
            <h1 className="text-xl font-bold">Dashboard Indisponível</h1>
          </div>
          <Button variant="ghost" className="text-white hover:bg-ascom-dark" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              Funcionalidade Temporariamente Indisponível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                O dashboard de comércio foi temporariamente removido do sistema.
              </p>
              <p className="text-gray-600">
                Você será redirecionado automaticamente para o dashboard de passageiro em alguns segundos.
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => navigate('/passageiro/dashboard')}
                  className="bg-ascom hover:bg-ascom-dark"
                >
                  Ir para Dashboard de Passageiro
                </Button>
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline"
                >
                  Voltar ao Início
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ComercioDashboard;
