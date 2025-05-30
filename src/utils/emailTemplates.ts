
export const emailTemplates = {
  welcome: (userName: string) => `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; box-shadow: 0 8px 32px rgba(15, 160, 206, 0.3);">
        <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <div style="width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <span style="color: #0FA0CE; font-size: 20px; font-weight: bold;">A</span>
          </div>
        </div>
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Bem-vindo ao ASCOM!</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Plataforma de Gestão de Entregas</p>
      </div>
      <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; margin-top: 0; font-size: 24px; font-weight: 600; text-align: center;">Olá, ${userName}! 👋</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 25px 0;">
          Seja muito bem-vindo à plataforma ASCOM! Seu cadastro foi realizado com sucesso e está sendo analisado pela nossa equipe especializada.
        </p>
        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #0FA0CE; margin: 25px 0;">
          <p style="color: #0c4a6e; margin: 0; font-size: 16px; font-weight: 500;">
            📋 <strong>Próximos Passos:</strong><br>
            • Nossa equipe está revisando suas informações<br>
            • Você receberá uma notificação por email assim que aprovado<br>
            • O processo leva em média 24-48 horas
          </p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); color: white; padding: 16px 24px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 12px rgba(15, 160, 206, 0.3);">
            <strong style="font-size: 16px;">⏳ Status: Aguardando Aprovação</strong>
          </div>
        </div>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Enquanto isso...</h3>
          <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">
            Prepare sua documentação e confira se todas as informações estão corretas. Em caso de dúvidas, nossa equipe está à disposição para ajudar.
          </p>
        </div>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 25px; margin-top: 35px; text-align: center;">
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
            <strong>ASCOM</strong> - Conectando Comércios e Entregadores
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            Este é um email automático, não é necessário responder.
          </p>
        </div>
      </div>
    </div>
  `,

  approved: (userName: string, role: string, dashboardUrl: string) => `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);">
        <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <div style="font-size: 40px;">🎉</div>
        </div>
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Parabéns!</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px; font-weight: 500;">Sua conta foi aprovada!</p>
      </div>
      <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; margin-top: 0; font-size: 24px; font-weight: 600; text-align: center;">Bem-vindo à família ASCOM, ${userName}! 🚀</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 25px 0;">
          Excelente notícia! Sua conta foi aprovada com sucesso e agora você tem acesso completo a todas as funcionalidades da plataforma ASCOM.
        </p>
        <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 25px; border-radius: 12px; border: 1px solid #10b981; margin: 25px 0;">
          <div style="text-align: center;">
            <div style="background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); color: white; padding: 16px 24px; border-radius: 8px; display: inline-block; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(15, 160, 206, 0.3);">
              <strong style="font-size: 18px;">✅ Perfil: ${role.charAt(0).toUpperCase() + role.slice(1)}</strong>
            </div>
            <div>
              <a href="${dashboardUrl}" style="background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); color: white; padding: 18px 36px; text-decoration: none; border-radius: 10px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 6px 20px rgba(15, 160, 206, 0.4); transition: transform 0.2s; border: none;">
                🚀 Acessar Minha Dashboard
              </a>
            </div>
          </div>
        </div>
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0FA0CE; margin: 25px 0;">
          <h3 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 16px;">🎯 O que você pode fazer agora:</h3>
          <ul style="color: #0c4a6e; margin: 10px 0 0 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
            <li>Acessar seu painel personalizado</li>
            <li>Configurar seu perfil completo</li>
            <li>Começar a usar todas as funcionalidades</li>
            <li>Explorar as ferramentas disponíveis</li>
          </ul>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #374151; font-size: 16px; margin: 0;">
            <strong>Sua jornada ASCOM começa agora!</strong>
          </p>
        </div>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 25px; margin-top: 35px; text-align: center;">
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
            <strong>ASCOM</strong> - Conectando Comércios e Entregadores
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            Precisa de ajuda? Entre em contato conosco.
          </p>
        </div>
      </div>
    </div>
  `,

  rejected: (userName: string, reason?: string) => `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #ef4444 0%, #f87171 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);">
        <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <div style="font-size: 40px;">⚠️</div>
        </div>
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Cadastro Não Aprovado</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Precisamos de alguns ajustes</p>
      </div>
      <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; margin-top: 0; font-size: 24px; font-weight: 600; text-align: center;">Olá, ${userName}</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 25px 0;">
          Agradecemos seu interesse em fazer parte da plataforma ASCOM. Infelizmente, não foi possível aprovar seu cadastro neste momento.
        </p>
        ${reason ? `
          <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 25px; border-radius: 12px; margin: 25px 0;">
            <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px; display: flex; align-items: center;">
              💬 <span style="margin-left: 8px;">Motivo da não aprovação:</span>
            </h3>
            <p style="color: #92400e; margin: 0; font-size: 15px; line-height: 1.5; font-weight: 500;">
              ${reason}
            </p>
          </div>
        ` : ''}
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0FA0CE; margin: 25px 0;">
          <h3 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 16px;">🔄 Próximos Passos:</h3>
          <ul style="color: #0c4a6e; margin: 10px 0 0 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
            <li>Revise as informações fornecidas</li>
            <li>Corrija os pontos mencionados acima</li>
            <li>Reenvie sua solicitação de cadastro</li>
            <li>Entre em contato conosco se tiver dúvidas</li>
          </ul>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #4b5563; font-size: 16px; margin: 0 0 15px 0;">
            <strong>Não desista! Estamos aqui para ajudar.</strong>
          </p>
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Se você acredita que isso foi um erro ou precisa de esclarecimentos, entre em contato conosco.
          </p>
        </div>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 25px; margin-top: 35px; text-align: center;">
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
            <strong>ASCOM</strong> - Conectando Comércios e Entregadores
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            Nossa equipe está sempre disponível para ajudar.
          </p>
        </div>
      </div>
    </div>
  `
};
