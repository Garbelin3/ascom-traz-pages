export const emailTemplates = {
  welcome: (userName: string) => `
    <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #007bff; color: white; padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Bem-vindo à ASCOM</h1>
        <p style="margin: 5px 0 0; font-size: 16px;">Plataforma de Gestão de Entregas</p>
      </div>
      <div style="padding: 30px 20px; color: #333333; line-height: 1.6;">
        <h2 style="font-size: 22px; color: #007bff; margin-top: 0; margin-bottom: 20px;">Olá, ${userName}!</h2>
        <p style="font-size: 16px; margin-bottom: 25px;">
          Seu cadastro na plataforma ASCOM foi realizado com sucesso e está em processo de análise pela nossa equipe.
        </p>
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
          <h3 style="font-size: 18px; color: #007bff; margin-top: 0; margin-bottom: 15px;">Próximos Passos:</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 16px; list-style-type: disc;">
            <li style="margin-bottom: 8px;">Nossa equipe está revisando suas informações.</li>
            <li style="margin-bottom: 8px;">Você receberá uma notificação por e-mail assim que seu cadastro for aprovado.</li>
            <li>Este processo geralmente leva entre 24 e 48 horas.</li>
          </ul>
        </div>
        <div style="text-align: center; margin-bottom: 25px;">
          <span style="background-color: #ffc107; color: #333333; padding: 12px 20px; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;">
            Status: Aguardando Aprovação
          </span>
        </div>
        <div style="background-color: #e9ecef; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
          <h3 style="font-size: 18px; color: #007bff; margin: 0 0 10px 0;">Enquanto isso:</h3>
          <p style="margin: 0; font-size: 16px;">
            Sugerimos que você revise toda a documentação e informações fornecidas para garantir que tudo esteja correto. Se tiver dúvidas, nossa equipe está à disposição.
          </p>
        </div>
        <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px; text-align: center; color: #777777;">
          <p style="font-size: 14px; margin: 0 0 10px 0;">
            <strong>ASCOM</strong> - Conectando Comércios e Entregadores
          </p>
          <p style="font-size: 12px; margin: 0;">
            Este é um e-mail automático. Não é necessário respondê-lo.
          </p>
        </div>
      </div>
    </div>
  `,

  approved: (userName: string, role: string, dashboardUrl: string) => `
    <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #28a745; color: white; padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Parabéns, ${userName}!</h1>
        <p style="margin: 5px 0 0; font-size: 18px;">Sua conta foi aprovada!</p>
      </div>
      <div style="padding: 30px 20px; color: #333333; line-height: 1.6;">
        <h2 style="font-size: 22px; color: #28a745; margin-top: 0; margin-bottom: 20px; text-align: center;">Bem-vindo à Plataforma ASCOM!</h2>
        <p style="font-size: 16px; margin-bottom: 25px; text-align: center;">
          Sua conta como <strong>${role.charAt(0).toUpperCase() + role.slice(1)}</strong> foi aprovada com sucesso. Agora você tem acesso completo às funcionalidades da plataforma.
        </p>
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="${dashboardUrl}" style="background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;">
            Acessar Painel de Controle
          </a>
        </div>
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
          <h3 style="font-size: 18px; color: #007bff; margin-top: 0; margin-bottom: 15px;">O que você pode fazer agora:</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 16px; list-style-type: disc;">
            <li style="margin-bottom: 8px;">Acessar seu painel personalizado.</li>
            <li style="margin-bottom: 8px;">Configurar os detalhes do seu perfil.</li>
            <li style="margin-bottom: 8px;">Começar a utilizar as ferramentas e funcionalidades disponíveis.</li>
            <li>Explorar todas as opções da plataforma.</li>
          </ul>
        </div>
        <p style="font-size: 16px; text-align: center; margin-bottom: 25px; font-weight: bold;">
          Sua jornada na ASCOM começa agora!
        </p>
        <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px; text-align: center; color: #777777;">
          <p style="font-size: 14px; margin: 0 0 10px 0;">
            <strong>ASCOM</strong> - Conectando Comércios e Entregadores
          </p>
          <p style="font-size: 12px; margin: 0;">
            Precisa de ajuda? Entre em contato com nosso suporte.
          </p>
        </div>
      </div>
    </div>
  `,

  rejected: (userName: string, reason?: string) => `
    <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #dc3545; color: white; padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Informações sobre seu Cadastro</h1>
      </div>
      <div style="padding: 30px 20px; color: #333333; line-height: 1.6;">
        <h2 style="font-size: 22px; color: #dc3545; margin-top: 0; margin-bottom: 20px;">Olá, ${userName},</h2>
        <p style="font-size: 16px; margin-bottom: 20px;">
          Agradecemos seu interesse em fazer parte da plataforma ASCOM. Após análise, seu cadastro não pôde ser aprovado neste momento.
        </p>
        ${reason ? `
        <div style="background-color: #fff3cd; border: 1px solid #ffeeba; color: #856404; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
          <h3 style="font-size: 18px; margin-top: 0; margin-bottom: 10px;">Motivo da não aprovação:</h3>
          <p style="margin: 0; font-size: 16px;">
            ${reason}
          </p>
        </div>
        ` : ''}
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
          <h3 style="font-size: 18px; color: #007bff; margin-top: 0; margin-bottom: 15px;">Próximos Passos Sugeridos:</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 16px; list-style-type: disc;">
            <li style="margin-bottom: 8px;">Revise as informações e documentações fornecidas.</li>
            ${reason ? `<li style="margin-bottom: 8px;">Corrija os pontos indicados no motivo da não aprovação.</li>` : ''}
            <li style="margin-bottom: 8px;">Se aplicável, você pode reenviar sua solicitação de cadastro através da plataforma.</li>
            <li>Entre em contato conosco se precisar de esclarecimentos ou assistência.</li>
          </ul>
        </div>
        <p style="font-size: 16px; text-align: center; margin-bottom: 25px;">
          Estamos à disposição para ajudar no que for necessário.
        </p>
        <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px; text-align: center; color: #777777;">
          <p style="font-size: 14px; margin: 0 0 10px 0;">
            <strong>ASCOM</strong> - Conectando Comércios e Entregadores
          </p>
          <p style="font-size: 12px; margin: 0;">
            Nossa equipe está sempre disponível para ajudar.
          </p>
        </div>
      </div>
    </div>
  `
};