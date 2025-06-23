
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Check, X, Truck } from 'lucide-react';

const EntregadorDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [motoristaData, setMotoristaData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMotoristaData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('motoristas')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setMotoristaData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do motorista:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMotoristaData();
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
            <span>Conta aprovada! Você pode começar a receber entregas.</span>
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
            <Truck className="h-8 w-8" />
            <h1 className="text-xl font-bold">Entregador Dashboard</h1>
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
            {motoristaData ? getStatusComponent(motoristaData.status) : 'Erro ao carregar status'}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              {motoristaData ? (
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Nome:</span> {motoristaData.nome_completo}
                  </div>
                  <div>
                    <span className="font-semibold">Telefone:</span> {motoristaData.telefone}
                  </div>
                  <div>
                    <span className="font-semibold">Endereço:</span> {motoristaData.endereco}
                  </div>
                  <div>
                    <span className="font-semibold">Cidade:</span> {motoristaData.cidade}, {motoristaData.estado}
                  </div>
                  <div>
                    <span className="font-semibold">CEP:</span> {motoristaData.cep}
                  </div>
                  <div>
                    <span className="font-semibold">Veículo:</span> {motoristaData.veiculo}
                  </div>
                </div>
              ) : (
                <p>Erro ao carregar informações</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados do Veículo</CardTitle>
            </CardHeader>
            <CardContent>
              {motoristaData ? (
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Tipo:</span> {motoristaData.veiculo}
                  </div>
                  {motoristaData.modelo_veiculo && (
                    <div>
                      <span className="font-semibold">Modelo:</span> {motoristaData.modelo_veiculo}
                    </div>
                  )}
                  {motoristaData.placa_veiculo && (
                    <div>
                      <span className="font-semibold">Placa:</span> {motoristaData.placa_veiculo}
                    </div>
                  )}
                  {motoristaData.cor_veiculo && (
                    <div>
                      <span className="font-semibold">Cor:</span> {motoristaData.cor_veiculo}
                    </div>
                  )}
                  {motoristaData.ano_veiculo && (
                    <div>
                      <span className="font-semibold">Ano:</span> {motoristaData.ano_veiculo}
                    </div>
                  )}
                  {motoristaData.cnh && (
                    <div>
                      <span className="font-semibold">CNH:</span> {motoristaData.cnh}
                    </div>
                  )}
                </div>
              ) : (
                <p>Erro ao carregar informações do veículo</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EntregadorDashboard;
