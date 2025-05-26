
export const emailTemplates = {
  welcome: (userName: string) => `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; box-shadow: 0 4px 6px rgba(15, 160, 206, 0.1);">
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Bem-vindo ao ASCOM!</h1>
      </div>
      <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="color: #1f2937; margin-top: 0; font-size: 24px; font-weight: 600;">Olá, ${userName}!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Seja bem-vindo à plataforma ASCOM! Seu cadastro foi realizado com sucesso e agora está sendo analisado pela nossa equipe.
        </p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Você receberá uma notificação assim que sua conta for aprovada.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); color: white; padding: 15px 30px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 6px rgba(15, 160, 206, 0.2);">
            <strong style="font-size: 16px;">Status: Aguardando Aprovação</strong>
          </div>
        </div>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
            Obrigado por escolher a ASCOM!
          </p>
        </div>
      </div>
    </div>
  `,

  approved: (userName: string, role: string, dashboardUrl: string) => `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.1);">
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">🎉 Conta Aprovada!</h1>
      </div>
      <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="color: #1f2937; margin-top: 0; font-size: 24px; font-weight: 600;">Parabéns, ${userName}!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Sua conta foi aprovada com sucesso! Agora você pode acessar todas as funcionalidades da plataforma ASCOM.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); color: white; padding: 15px 30px; border-radius: 8px; display: inline-block; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(15, 160, 206, 0.2);">
            <strong style="font-size: 16px;">Perfil: ${role.charAt(0).toUpperCase() + role.slice(1)}</strong>
          </div>
          <br>
          <a href="${dashboardUrl}" style="background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(15, 160, 206, 0.3); transition: transform 0.2s;">
            🚀 Acessar Dashboard
          </a>
        </div>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
            Bem-vindo à família ASCOM!
          </p>
        </div>
      </div>
    </div>
  `,

  rejected: (userName: string, reason?: string) => `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #ef4444 0%, #f87171 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; box-shadow: 0 4px 6px rgba(239, 68, 68, 0.1);">
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Cadastro Não Aprovado</h1>
      </div>
      <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="color: #1f2937; margin-top: 0; font-size: 24px; font-weight: 600;">Olá, ${userName}</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Infelizmente, não foi possível aprovar seu cadastro na plataforma ASCOM neste momento.
        </p>
        ${reason ? `
          <div style="background: #fef3c7; border: 2px solid #fbbf24; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <p style="color: #92400e; margin: 0; font-size: 16px; font-weight: 500;">
              <strong>💬 Motivo:</strong> ${reason}
            </p>
          </div>
        ` : ''}
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Se você acredita que isso foi um erro ou deseja mais informações, entre em contato conosco.
        </p>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
            Equipe ASCOM
          </p>
        </div>
      </div>
    </div>
  `
};
