
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  Globe, 
  Settings,
  ExternalLink 
} from 'lucide-react';

export const ProductionConfig: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuração para Produção - Sistema de Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Sistema Preparado:</strong> O sistema de email está configurado para funcionar tanto em desenvolvimento quanto em produção.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-blue-600" />
                <h3 className="font-medium">Modo Desenvolvimento</h3>
                <Badge variant="outline">Ativo</Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Emails enviados para: admin@codeprogram.com.br</li>
                <li>✅ Indicador visual de teste no email</li>
                <li>✅ Logs detalhados para debug</li>
                <li>✅ Informações do destinatário original</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-4 w-4 text-green-600" />
                <h3 className="font-medium">Modo Produção</h3>
                <Badge variant="secondary">Pronto</Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Envio para emails reais dos usuários</li>
                <li>✅ Templates profissionais com marca ASCOM</li>
                <li>✅ Sistema de retry automático</li>
                <li>✅ Monitoramento e logs estruturados</li>
              </ul>
            </div>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Para Produção:</strong> Configure um domínio próprio no Resend (ex: noreply@ascom.com.br) para envio profissional.
            </AlertDescription>
          </Alert>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Próximos Passos para Produção:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Configurar domínio próprio no Resend</li>
              <li>2. Verificar registros DNS (SPF, DKIM, DMARC)</li>
              <li>3. Atualizar variável from: "ASCOM &lt;noreply@seudominio.com.br&gt;"</li>
              <li>4. Definir ENVIRONMENT=production no deploy</li>
            </ol>
          </div>

          <div className="flex gap-2">
            <a 
              href="https://resend.com/domains" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-3 w-3" />
              Configurar Domínio no Resend
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
