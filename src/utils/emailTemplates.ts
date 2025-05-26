
export const emailTemplates = {
  welcome: (userName: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Bem-vindo ao ASCOM!</h1>
      </div>
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">Olá, ${userName}!</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Seja bem-vindo à plataforma ASCOM! Seu cadastro foi realizado com sucesso e agora está sendo analisado pela nossa equipe.
        </p>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Você receberá uma notificação assim que sua conta for aprovada.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background: #667eea; color: white; padding: 15px 30px; border-radius: 5px; display: inline-block;">
            <strong>Status: Aguardando Aprovação</strong>
          </div>
        </div>
        <p style="color: #999; font-size: 14px; text-align: center;">
          Obrigado por escolher a ASCOM!
        </p>
      </div>
    </div>
  `,

  approved: (userName: string, role: string, dashboardUrl: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Conta Aprovada!</h1>
      </div>
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">Parabéns, ${userName}!</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Sua conta foi aprovada com sucesso! Agora você pode acessar todas as funcionalidades da plataforma ASCOM.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background: #28a745; color: white; padding: 15px 30px; border-radius: 5px; display: inline-block; margin-bottom: 20px;">
            <strong>Perfil: ${role.charAt(0).toUpperCase() + role.slice(1)}</strong>
          </div>
          <br>
          <a href="${dashboardUrl}" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
            Acessar Dashboard
          </a>
        </div>
        <p style="color: #999; font-size: 14px; text-align: center;">
          Bem-vindo à ASCOM!
        </p>
      </div>
    </div>
  `,

  rejected: (userName: string, reason?: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #dc3545 0%, #e85a4f 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Cadastro Não Aprovado</h1>
      </div>
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">Olá, ${userName}</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Infelizmente, não foi possível aprovar seu cadastro na plataforma ASCOM neste momento.
        </p>
        ${reason ? `
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #856404; margin: 0;">
              <strong>Motivo:</strong> ${reason}
            </p>
          </div>
        ` : ''}
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Se você acredita que isso foi um erro ou deseja mais informações, entre em contato conosco.
        </p>
        <p style="color: #999; font-size: 14px; text-align: center;">
          Equipe ASCOM
        </p>
      </div>
    </div>
  `
};
