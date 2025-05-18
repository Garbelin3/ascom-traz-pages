
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Check, X, Store } from 'lucide-react';

const ComercioDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [comercioData, setComercioData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComercioData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('comercios')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setComercioData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do comércio:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComercioData();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const getStatusComponent = (status: string) => {
    switch (status) {
      case 'aprovado':
        return (
          <div className="flex items-center gap-2 text-green-600">
            <Check size={20} />
            <span>Conta aprovada! Você pode começar a solicitar entregas.</span>
          </div>
        );
      case 'reprovado':
        return (
          <div className="flex items-center gap-2 text-red-600">
            <X size={20} />
            <span>Cadastro reprovado. Entre em contato para mais informações.</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertCircle size={20} />
            <span>Cadastro em análise. Aguarde a aprovação.</span>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-ascom rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-ascom text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            <h1 className="text-xl font-bold">Comércio Dashboard</h1>
          </div>
          <Button variant="ghost" className="text-white hover:bg-ascom-dark" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Status da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            {comercioData ? getStatusComponent(comercioData.status) : 'Erro ao carregar status'}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Estabelecimento</CardTitle>
          </CardHeader>
          <CardContent>
            {comercioData ? (
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Nome do Estabelecimento:</span> {comercioData.nome_estabelecimento}
                </div>
                <div>
                  <span className="font-semibold">Responsável:</span> {comercioData.nome_responsavel}
                </div>
                <div>
                  <span className="font-semibold">Telefone:</span> {comercioData.telefone}
                </div>
                <div>
                  <span className="font-semibold">Endereço:</span> {comercioData.endereco}
                </div>
                <div>
                  <span className="font-semibold">Cidade:</span> {comercioData.cidade}, {comercioData.estado}
                </div>
                <div>
                  <span className="font-semibold">CEP:</span> {comercioData.cep}
                </div>
                <div>
                  <span className="font-semibold">Tipo de Negócio:</span> {comercioData.tipo_negocio}
                </div>
              </div>
            ) : (
              <p>Erro ao carregar informações</p>
            )}
          </CardContent>
        </Card>

        {comercioData && comercioData.status === 'aprovado' && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Solicitar Entregas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Para solicitar entregas, entre em contato com nossa central de atendimento.
              </p>
              <Button className="bg-ascom hover:bg-ascom-dark">
                Solicitar Entrega
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ComercioDashboard;
