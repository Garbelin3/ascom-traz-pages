
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
import { AlertCircle, Check, X } from 'lucide-react';

const EntregadorDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [entregadorData, setEntregadorData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntregadorData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('entregadores')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setEntregadorData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do entregador:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntregadorData();
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
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
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
            {entregadorData ? getStatusComponent(entregadorData.status) : 'Erro ao carregar status'}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              {entregadorData ? (
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Nome:</span> {entregadorData.nome}
                  </div>
                  <div>
                    <span className="font-semibold">Telefone:</span> {entregadorData.telefone}
                  </div>
                  <div>
                    <span className="font-semibold">Endereço:</span> {entregadorData.endereco}
                  </div>
                  <div>
                    <span className="font-semibold">Cidade:</span> {entregadorData.cidade}, {entregadorData.estado}
                  </div>
                  <div>
                    <span className="font-semibold">CEP:</span> {entregadorData.cep}
                  </div>
                  <div>
                    <span className="font-semibold">Veículo:</span> {entregadorData.veiculo}
                  </div>
                </div>
              ) : (
                <p>Erro ao carregar informações</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              {entregadorData ? (
                <div className="space-y-4">
                  {entregadorData.cnh_url ? (
                    <div>
                      <p className="font-semibold mb-2">CNH:</p>
                      <a 
                        href={supabase.storage.from('documents').getPublicUrl(entregadorData.cnh_url).data.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded inline-block"
                      >
                        Visualizar CNH
                      </a>
                    </div>
                  ) : (
                    <p>CNH não enviada</p>
                  )}

                  {entregadorData.documento_veiculo_url ? (
                    <div>
                      <p className="font-semibold mb-2">Documento do Veículo:</p>
                      <a 
                        href={supabase.storage.from('documents').getPublicUrl(entregadorData.documento_veiculo_url).data.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded inline-block"
                      >
                        Visualizar Documento
                      </a>
                    </div>
                  ) : (
                    <p>Documento do veículo não enviado</p>
                  )}
                </div>
              ) : (
                <p>Erro ao carregar documentos</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EntregadorDashboard;
