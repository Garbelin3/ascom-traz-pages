
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
            Configuração de Produção - Sistema de Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Sistema em Produção:</strong> O sistema de email está configurado para envio em produção usando o domínio verificado.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-green-600" />
                <h3 className="font-medium">Configuração de Produção</h3>
                <Badge variant="default">Ativo</Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Remetente: ASCOM &lt;contato@ascomtrazcomunidde.com.br&gt;</li>
                <li>✅ Emails enviados para destinatários reais</li>
                <li>✅ Domínio verificado no Resend</li>
                <li>✅ Sistema de retry automático</li>
                <li>✅ Logs de produção estruturados</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-4 w-4 text-blue-600" />
                <h3 className="font-medium">Funcionalidades Ativas</h3>
                <Badge variant="secondary">Produção</Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Email de boas-vindas</li>
                <li>✅ Email de aprovação de conta</li>
                <li>✅ Email de rejeição de conta</li>
                <li>✅ Templates profissionais com marca ASCOM</li>
              </ul>
            </div>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Status:</strong> Sistema configurado para produção. Todos os emails são enviados do domínio ascomtrazcomunidde.com.br para os destinatários reais.
            </AlertDescription>
          </Alert>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Configuração Atual:</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Domínio: ascomtrazcomunidde.com.br</li>
              <li>• Remetente: contato@ascomtrazcomunidde.com.br</li>
              <li>• Modo: Produção (emails reais)</li>
              <li>• Status: Ativo e verificado</li>
            </ul>
          </div>

          <div className="flex gap-2">
            <a 
              href="https://resend.com/domains" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-3 w-3" />
              Gerenciar Domínio no Resend
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
