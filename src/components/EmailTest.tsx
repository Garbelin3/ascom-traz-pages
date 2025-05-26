
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmail } from '@/hooks/useEmail';
import { emailTemplates } from '@/utils/emailTemplates';

export const EmailTest: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const sendEmail = useEmail();

  const handleSendCustomEmail = () => {
    if (!email || !subject || !message) {
      return;
    }

    sendEmail.mutate({
      to: email,
      subject,
      html: message,
    });
  };

  const handleSendTemplateEmail = (template: 'welcome' | 'approved' | 'rejected') => {
    if (!email) {
      return;
    }

    let html = '';
    let emailSubject = '';

    switch (template) {
      case 'welcome':
        html = emailTemplates.welcome('Usuário Teste');
        emailSubject = 'Bem-vindo ao ASCOM!';
        break;
      case 'approved':
        html = emailTemplates.approved('Usuário Teste', 'entregador', window.location.origin + '/entregador/dashboard');
        emailSubject = 'Conta Aprovada - ASCOM';
        break;
      case 'rejected':
        html = emailTemplates.rejected('Usuário Teste', 'Documentos incompletos');
        emailSubject = 'Cadastro Não Aprovado - ASCOM';
        break;
    }

    sendEmail.mutate({
      to: email,
      subject: emailSubject,
      html,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Teste de Envio de Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email de Destino</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teste@exemplo.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => handleSendTemplateEmail('welcome')}
              disabled={!email || sendEmail.isPending}
              variant="outline"
            >
              Enviar Email de Boas-vindas
            </Button>
            <Button
              onClick={() => handleSendTemplateEmail('approved')}
              disabled={!email || sendEmail.isPending}
              variant="outline"
            >
              Enviar Email de Aprovação
            </Button>
            <Button
              onClick={() => handleSendTemplateEmail('rejected')}
              disabled={!email || sendEmail.isPending}
              variant="outline"
            >
              Enviar Email de Rejeição
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Personalizado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Assunto</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Assunto do email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Mensagem (HTML)</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="<h1>Olá!</h1><p>Sua mensagem aqui...</p>"
              rows={6}
            />
          </div>
          <Button
            onClick={handleSendCustomEmail}
            disabled={!email || !subject || !message || sendEmail.isPending}
            className="w-full"
          >
            {sendEmail.isPending ? 'Enviando...' : 'Enviar Email Personalizado'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
