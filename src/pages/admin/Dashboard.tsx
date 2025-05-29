import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from '@/components/ui/use-toast';
import { useEmail } from '@/hooks/useEmail';
import { emailTemplates } from '@/utils/emailTemplates';
import { 
  Check, 
  X, 
  FileText,
  Users,
  Store,
  RefreshCw,
  Mail,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Entregador {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  veiculo: string;
  status: string;
  created_at: string;
  user_id: string;
  updated_at: string;
}

interface Comercio {
  id: string;
  nome_estabelecimento: string;
  nome_responsavel: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  tipo_negocio: string;
  status: string;
  created_at: string;
  user_id: string;
  updated_at: string;
}

const AdminDashboard: React.FC = () => {
  const { userDetails } = useAuth();
  const [entregadores, setEntregadores] = useState<Entregador[]>([]);
  const [comercios, setComercio] = useState<Comercio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingStatus, setProcessingStatus] = useState<{[key: string]: boolean}>({});
  const sendEmail = useEmail();

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
    const processingKey = `${table}-${id}`;
    setProcessingStatus(prev => ({ ...prev, [processingKey]: true }));

    try {
      console.log(`Atualizando status para ${newStatus} - ID: ${id}, Tabela: ${table}`);

      // Buscar dados do registro baseado na tabela específica
      let registro: any;
      let fetchError: any;

      if (table === 'entregadores') {
        const { data, error } = await supabase
          .from('entregadores')
          .select('user_id, nome')
          .eq('id', id)
          .single();
        registro = data;
        fetchError = error;
      } else {
        const { data, error } = await supabase
          .from('comercios')
          .select('user_id, nome_responsavel')
          .eq('id', id)
          .single();
        registro = data;
        fetchError = error;
      }

      if (fetchError || !registro) {
        throw fetchError || new Error('Registro não encontrado');
      }

      // Buscar dados do usuário para obter email e role
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email, role')
        .eq('id', registro.user_id)
        .single();

      if (userError || !userData) {
        throw userError || new Error('Usuário não encontrado');
      }

      // Atualizar o status na tabela correspondente
      const { error: updateError } = await supabase
        .from(table)
        .update({ status: newStatus })
        .eq('id', id);

      if (updateError) throw updateError;

      // Atualizar o status na tabela users
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({ status: newStatus })
        .eq('id', registro.user_id);

      if (userUpdateError) throw userUpdateError;

      // Preparar dados para o email
      const userName = table === 'entregadores' ? registro.nome : registro.nome_responsavel;
      const userRole = userData.role;
      const userEmail = userData.email;

      // Definir URL do dashboard baseado na role
      const getDashboardUrl = (role: string) => {
        const baseUrl = window.location.origin;
        switch (role) {
          case 'entregador':
            return `${baseUrl}/entregador/dashboard`;
          case 'comercio':
            return `${baseUrl}/comercio/dashboard`;
          case 'admin':
            return `${baseUrl}/admin/dashboard`;
          default:
            return baseUrl;
        }
      };

      // Mostrar toast de status atualizado imediatamente
      toast({
        title: "Status atualizado",
        description: `Cadastro ${newStatus === 'aprovado' ? 'aprovado' : 'reprovado'} com sucesso. Enviando email...`,
      });

      // Atualizar a lista imediatamente
      await fetchData();

      // Enviar email de forma assíncrona (não bloquear a interface)
      try {
        if (newStatus === 'aprovado') {
          console.log('Enviando email de aprovação para:', userEmail);
          await sendEmail.mutateAsync({
            to: userEmail,
            subject: 'Conta Aprovada - ASCOM',
            html: emailTemplates.approved(userName, userRole, getDashboardUrl(userRole)),
            isProduction: true,
          });
        } else if (newStatus === 'reprovado') {
          console.log('Enviando email de reprovação para:', userEmail);
          await sendEmail.mutateAsync({
            to: userEmail,
            subject: 'Cadastro Não Aprovado - ASCOM',
            html: emailTemplates.rejected(userName, 'Documentos ou informações precisam ser revisados'),
            isProduction: true,
          });
        }
        
        console.log('Email enviado com sucesso');
      } catch (emailError) {
        console.error('Erro específico no envio de email:', emailError);
        
        // Toast específico para erro de email (não sobrescreve o sucesso do status)
        toast({
          title: "Email não enviado",
          description: "O status foi atualizado, mas houve problema no envio do email. Verifique a configuração do Resend.",
          variant: "default"
        });
      }

    } catch (error: any) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro ao atualizar status",
        description: error.message || "Ocorreu um erro ao atualizar o status",
        variant: "destructive"
      });
    } finally {
      setProcessingStatus(prev => ({ ...prev, [processingKey]: false }));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      aprovado: { 
        bg: 'bg-green-100', 
        text: 'text-green-800', 
        label: 'Aprovado',
        icon: <Check size={12} className="mr-1" />
      },
      reprovado: { 
        bg: 'bg-red-100', 
        text: 'text-red-800', 
        label: 'Reprovado',
        icon: <X size={12} className="mr-1" />
      },
      pendente: { 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-800', 
        label: 'Pendente',
        icon: <Clock size={12} className="mr-1" />
      }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pendente;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const ActionButtons = ({ 
    id, 
    table, 
    currentStatus 
  }: { 
    id: string, 
    table: 'entregadores' | 'comercios', 
    currentStatus: string 
  }) => {
    const processingKey = `${table}-${id}`;
    const isProcessing = processingStatus[processingKey];

    return (
      <div className="flex justify-center gap-2">
        {currentStatus !== 'aprovado' && (
          <Button 
            onClick={() => handleStatusChange(id, table, 'aprovado')}
            size="sm"
            variant="outline"
            disabled={isProcessing}
            className="bg-green-50 border-green-200 hover:bg-green-100 disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check size={16} className="text-green-600" />
            )}
          </Button>
        )}
        {currentStatus !== 'reprovado' && (
          <Button
            onClick={() => handleStatusChange(id, table, 'reprovado')}
            size="sm"
            variant="outline"
            disabled={isProcessing}
            className="bg-red-50 border-red-200 hover:bg-red-100 disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <X size={16} className="text-red-600" />
            )}
          </Button>
        )}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-gray-600 mt-1">Gerencie aprovações de cadastros</p>
          </div>
          <Button onClick={fetchData} variant="outline" className="flex items-center gap-2" disabled={isLoading}>
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Atualizar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="h-4 w-4 text-blue-600 mr-2" />
                Total de Entregadores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{entregadores.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Store className="h-4 w-4 text-purple-600 mr-2" />
                Total de Comércios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">{comercios.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-600">
                {entregadores.filter(e => e.status === 'pendente').length + 
                 comercios.filter(c => c.status === 'pendente').length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Aprovados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {entregadores.filter(e => e.status === 'aprovado').length + 
                 comercios.filter(c => c.status === 'aprovado').length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="entregadores" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="entregadores" className="flex items-center gap-2">
              <Users size={16} />
              Entregadores
            </TabsTrigger>
            <TabsTrigger value="comercios" className="flex items-center gap-2">
              <Store size={16} />
              Comércios
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="entregadores">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={20} />
                  Lista de Entregadores
                  <span className="text-sm font-normal text-gray-500">
                    ({entregadores.length} total)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center p-8">
                    <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-ascom rounded-full"></div>
                  </div>
                ) : entregadores.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Nenhum entregador cadastrado</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="px-4 py-3 text-left font-medium">Nome</th>
                          <th className="px-4 py-3 text-left font-medium">Telefone</th>
                          <th className="px-4 py-3 text-left font-medium">Cidade</th>
                          <th className="px-4 py-3 text-left font-medium">Veículo</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                          <th className="px-4 py-3 text-center font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entregadores.map((entregador) => (
                          <tr key={entregador.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium">{entregador.nome}</td>
                            <td className="px-4 py-3">{entregador.telefone}</td>
                            <td className="px-4 py-3">{entregador.cidade}</td>
                            <td className="px-4 py-3 capitalize">{entregador.veiculo}</td>
                            <td className="px-4 py-3">
                              {getStatusBadge(entregador.status)}
                            </td>
                            <td className="px-4 py-3">
                              <ActionButtons 
                                id={entregador.id}
                                table="entregadores"
                                currentStatus={entregador.status}
                              />
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
                <CardTitle className="flex items-center gap-2">
                  <Store size={20} />
                  Lista de Comércios
                  <span className="text-sm font-normal text-gray-500">
                    ({comercios.length} total)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center p-8">
                    <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-ascom rounded-full"></div>
                  </div>
                ) : comercios.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Nenhum comércio cadastrado</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="px-4 py-3 text-left font-medium">Nome</th>
                          <th className="px-4 py-3 text-left font-medium">Responsável</th>
                          <th className="px-4 py-3 text-left font-medium">Telefone</th>
                          <th className="px-4 py-3 text-left font-medium">Tipo</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                          <th className="px-4 py-3 text-center font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comercios.map((comercio) => (
                          <tr key={comercio.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium">{comercio.nome_estabelecimento}</td>
                            <td className="px-4 py-3">{comercio.nome_responsavel}</td>
                            <td className="px-4 py-3">{comercio.telefone}</td>
                            <td className="px-4 py-3">{comercio.tipo_negocio}</td>
                            <td className="px-4 py-3">
                              {getStatusBadge(comercio.status)}
                            </td>
                            <td className="px-4 py-3">
                              <ActionButtons 
                                id={comercio.id}
                                table="comercios"
                                currentStatus={comercio.status}
                              />
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
