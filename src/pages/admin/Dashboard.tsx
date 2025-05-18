
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from '@/components/ui/use-toast';
import { 
  Check, 
  X, 
  FileText,
  Users,
  Store,
  RefreshCw
} from 'lucide-react';

interface Entregador {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  veiculo: string;
  status: string;
  cnh_url: string | null;
  documento_veiculo_url: string | null;
  created_at: string;
}

interface Comercio {
  id: string;
  nome_estabelecimento: string;
  nome_responsavel: string;
  telefone: string;
  endereco: string;
  cidade: string;
  tipo_negocio: string;
  status: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const { userDetails } = useAuth();
  const [entregadores, setEntregadores] = useState<Entregador[]>([]);
  const [comercios, setComercio] = useState<Comercio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // Buscar entregadores
      const { data: entregadoresData, error: entregadoresError } = await supabase
        .from('entregadores')
        .select('*')
        .order('created_at', { ascending: false });

      if (entregadoresError) throw entregadoresError;
      
      // Buscar comércios
      const { data: comerciosData, error: comerciosError } = await supabase
        .from('comercios')
        .select('*')
        .order('created_at', { ascending: false });

      if (comerciosError) throw comerciosError;

      setEntregadores(entregadoresData || []);
      setComercio(comerciosData || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os cadastros",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, table: 'entregadores' | 'comercios', newStatus: 'aprovado' | 'reprovado') => {
    try {
      // Atualizar o status na tabela correspondente
      const { error: updateError } = await supabase
        .from(table)
        .update({ status: newStatus })
        .eq('id', id);

      if (updateError) throw updateError;

      // Buscar o user_id associado ao registro
      const { data: registro, error: fetchError } = await supabase
        .from(table)
        .select('user_id')
        .eq('id', id)
        .single();

      if (fetchError || !registro) throw fetchError || new Error('Registro não encontrado');

      // Atualizar o status na tabela users
      const { error: userError } = await supabase
        .from('users')
        .update({ status: newStatus })
        .eq('id', registro.user_id);

      if (userError) throw userError;

      toast({
        title: "Status atualizado",
        description: `Cadastro ${newStatus === 'aprovado' ? 'aprovado' : 'reprovado'} com sucesso`,
      });

      // Atualizar a lista
      fetchData();
    } catch (error: any) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro ao atualizar status",
        description: error.message || "Ocorreu um erro ao atualizar o status",
        variant: "destructive"
      });
    }
  };

  const getDocumentUrl = (path: string | null) => {
    if (!path) return null;
    return supabase.storage.from('documents').getPublicUrl(path).data.publicUrl;
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Button onClick={fetchData} variant="outline" className="flex items-center gap-2">
            <RefreshCw size={16} />
            Atualizar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Entregadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-600 mr-2" />
                <p className="text-2xl font-bold">{entregadores.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Comércios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Store className="h-5 w-5 text-gray-600 mr-2" />
                <p className="text-2xl font-bold">{comercios.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cadastros Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-600 mr-2" />
                <p className="text-2xl font-bold">
                  {entregadores.filter(e => e.status === 'pendente').length + 
                   comercios.filter(c => c.status === 'pendente').length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="entregadores" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="entregadores">Entregadores</TabsTrigger>
            <TabsTrigger value="comercios">Comércios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="entregadores">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Entregadores</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center p-4">
                    <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-ascom rounded-full"></div>
                  </div>
                ) : entregadores.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">Nenhum entregador cadastrado</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Nome</th>
                          <th className="px-4 py-2 text-left">Telefone</th>
                          <th className="px-4 py-2 text-left">Cidade</th>
                          <th className="px-4 py-2 text-left">Veículo</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Documentos</th>
                          <th className="px-4 py-2 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entregadores.map((entregador) => (
                          <tr key={entregador.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{entregador.nome}</td>
                            <td className="px-4 py-2">{entregador.telefone}</td>
                            <td className="px-4 py-2">{entregador.cidade}</td>
                            <td className="px-4 py-2 capitalize">{entregador.veiculo}</td>
                            <td className="px-4 py-2">
                              <span 
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  entregador.status === 'aprovado' 
                                    ? 'bg-green-100 text-green-800' 
                                    : entregador.status === 'reprovado'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {entregador.status === 'aprovado' 
                                  ? 'Aprovado' 
                                  : entregador.status === 'reprovado'
                                  ? 'Reprovado'
                                  : 'Pendente'
                                }
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              {entregador.cnh_url && (
                                <a 
                                  href={getDocumentUrl(entregador.cnh_url)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-ascom hover:underline mr-2"
                                >
                                  Ver CNH
                                </a>
                              )}
                              {entregador.documento_veiculo_url && (
                                <a 
                                  href={getDocumentUrl(entregador.documento_veiculo_url)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-ascom hover:underline"
                                >
                                  Ver Doc. Veículo
                                </a>
                              )}
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex justify-center gap-2">
                                {entregador.status !== 'aprovado' && (
                                  <Button 
                                    onClick={() => handleStatusChange(entregador.id, 'entregadores', 'aprovado')}
                                    size="sm"
                                    variant="outline"
                                    className="bg-green-50 border-green-200 hover:bg-green-100"
                                  >
                                    <Check size={16} className="text-green-600" />
                                  </Button>
                                )}
                                {entregador.status !== 'reprovado' && (
                                  <Button
                                    onClick={() => handleStatusChange(entregador.id, 'entregadores', 'reprovado')}
                                    size="sm"
                                    variant="outline"
                                    className="bg-red-50 border-red-200 hover:bg-red-100"
                                  >
                                    <X size={16} className="text-red-600" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comercios">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Comércios</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center p-4">
                    <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-ascom rounded-full"></div>
                  </div>
                ) : comercios.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">Nenhum comércio cadastrado</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Nome</th>
                          <th className="px-4 py-2 text-left">Responsável</th>
                          <th className="px-4 py-2 text-left">Telefone</th>
                          <th className="px-4 py-2 text-left">Tipo</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comercios.map((comercio) => (
                          <tr key={comercio.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{comercio.nome_estabelecimento}</td>
                            <td className="px-4 py-2">{comercio.nome_responsavel}</td>
                            <td className="px-4 py-2">{comercio.telefone}</td>
                            <td className="px-4 py-2">{comercio.tipo_negocio}</td>
                            <td className="px-4 py-2">
                              <span 
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  comercio.status === 'aprovado' 
                                    ? 'bg-green-100 text-green-800' 
                                    : comercio.status === 'reprovado'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {comercio.status === 'aprovado' 
                                  ? 'Aprovado' 
                                  : comercio.status === 'reprovado'
                                  ? 'Reprovado'
                                  : 'Pendente'
                                }
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex justify-center gap-2">
                                {comercio.status !== 'aprovado' && (
                                  <Button 
                                    onClick={() => handleStatusChange(comercio.id, 'comercios', 'aprovado')}
                                    size="sm"
                                    variant="outline"
                                    className="bg-green-50 border-green-200 hover:bg-green-100"
                                  >
                                    <Check size={16} className="text-green-600" />
                                  </Button>
                                )}
                                {comercio.status !== 'reprovado' && (
                                  <Button
                                    onClick={() => handleStatusChange(comercio.id, 'comercios', 'reprovado')}
                                    size="sm"
                                    variant="outline"
                                    className="bg-red-50 border-red-200 hover:bg-red-100"
                                  >
                                    <X size={16} className="text-red-600" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
