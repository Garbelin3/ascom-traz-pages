
export const emailTemplates = {
  welcome: (userName: string) => `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
      <!-- Header with Modern Gradient -->
      <div style="background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 50%, #0284c7 100%); padding: 60px 40px; text-align: center; border-radius: 0; position: relative; overflow: hidden;">
        <!-- Decorative Elements -->
        <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.5;"></div>
        <div style="position: absolute; bottom: -30px; left: -30px; width: 150px; height: 150px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
        
        <!-- Logo/Icon -->
        <div style="position: relative; z-index: 10; margin-bottom: 30px;">
          <div style="width: 100px; height: 100px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
              <span style="color: #0FA0CE; font-size: 28px; font-weight: 800; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">A</span>
            </div>
          </div>
        </div>
        
        <h1 style="color: white; margin: 0 0 15px 0; font-size: 42px; font-weight: 800; text-shadow: 0 4px 8px rgba(0,0,0,0.2); letter-spacing: -0.02em;">Bem-vindo ao ASCOM!</h1>
        <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 18px; font-weight: 500; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Sua Plataforma de Gestão de Entregas</p>
      </div>

      <!-- Main Content -->
      <div style="background: white; padding: 50px 40px; position: relative;">
        <h2 style="color: #1f2937; margin: 0 0 25px 0; font-size: 28px; font-weight: 700; text-align: center;">Olá, ${userName}! 🎉</h2>
        
        <p style="color: #4b5563; font-size: 17px; line-height: 1.7; margin: 30px 0; text-align: center;">
          Seja muito bem-vindo à plataforma ASCOM! Seu cadastro foi realizado com <strong>sucesso</strong> e está sendo analisado pela nossa equipe especializada.
        </p>

        <!-- Status Card -->
        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 35px; border-radius: 16px; border: 1px solid #0FA0CE; margin: 35px 0; position: relative; box-shadow: 0 4px 20px rgba(15, 160, 206, 0.1);">
          <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #0FA0CE; color: white; padding: 8px 20px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Status</div>
          
          <div style="text-align: center; margin-top: 10px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(15, 160, 206, 0.3);">
              <span style="font-size: 32px;">⏳</span>
            </div>
            <h3 style="color: #0c4a6e; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">Aguardando Aprovação</h3>
            <p style="color: #0c4a6e; margin: 0; font-size: 15px; line-height: 1.6;">
              Nossa equipe está revisando suas informações<br>
              <strong>Tempo estimado:</strong> 24-48 horas
            </p>
          </div>
        </div>

        <!-- Steps -->
        <div style="background: #f9fafb; padding: 30px; border-radius: 12px; margin: 35px 0; border-left: 4px solid #10b981;">
          <h3 style="color: #374151; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
            <span style="margin-right: 10px;">📋</span> Próximos Passos
          </h3>
          <div style="space-y: 12px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 12px;"></div>
              <span style="color: #6b7280; font-size: 15px;">Nossa equipe está revisando suas informações</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 12px;"></div>
              <span style="color: #6b7280; font-size: 15px;">Você receberá uma notificação por email assim que aprovado</span>
            </div>
            <div style="display: flex; align-items: center;">
              <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 12px;"></div>
              <span style="color: #6b7280; font-size: 15px;">O processo leva em média 24-48 horas</span>
            </div>
          </div>
        </div>

        <!-- Tips Section -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 12px; margin: 35px 0; border: 1px solid #f59e0b;">
          <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
            <span style="margin-right: 8px;">💡</span> Enquanto isso...
          </h3>
          <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.6;">
            Prepare sua documentação e confira se todas as informações estão corretas. Em caso de dúvidas, nossa equipe está à disposição para ajudar.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #1f2937; padding: 40px; text-align: center; border-radius: 0;">
        <div style="margin-bottom: 20px;">
          <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 18px; font-weight: bold;">A</span>
          </div>
        </div>
        <p style="color: #f9fafb; font-size: 16px; margin: 0 0 10px 0; font-weight: 600;">
          <strong>ASCOM</strong> - Conectando Comércios e Entregadores
        </p>
        <p style="color: #9ca3af; font-size: 13px; margin: 0;">
          Este é um email automático, não é necessário responder.
        </p>
      </div>
    </div>
  `,

  approved: (userName: string, role: string, dashboardUrl: string) => `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
      <!-- Header with Success Theme -->
      <div style="background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #059669 100%); padding: 60px 40px; text-align: center; position: relative; overflow: hidden;">
        <!-- Celebration Elements -->
        <div style="position: absolute; top: 20px; left: 20px; font-size: 24px; animation: bounce 2s infinite;">🎉</div>
        <div style="position: absolute; top: 30px; right: 30px; font-size: 20px; animation: bounce 2s infinite 0.5s;">🚀</div>
        <div style="position: absolute; bottom: 20px; left: 40px; font-size: 18px; animation: bounce 2s infinite 1s;">⭐</div>
        <div style="position: absolute; bottom: 30px; right: 20px; font-size: 22px; animation: bounce 2s infinite 1.5s;">✨</div>
        
        <!-- Success Icon -->
        <div style="margin-bottom: 30px;">
          <div style="width: 120px; height: 120px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; border: 3px solid rgba(255,255,255,0.3); box-shadow: 0 12px 40px rgba(0,0,0,0.15);">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);">
              <span style="font-size: 36px;">✅</span>
            </div>
          </div>
        </div>
        
        <h1 style="color: white; margin: 0 0 15px 0; font-size: 48px; font-weight: 800; text-shadow: 0 4px 8px rgba(0,0,0,0.2); letter-spacing: -0.02em;">Parabéns!</h1>
        <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 20px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Sua conta foi aprovada com sucesso! 🎊</p>
      </div>

      <!-- Main Content -->
      <div style="background: white; padding: 50px 40px;">
        <h2 style="color: #1f2937; margin: 0 0 25px 0; font-size: 32px; font-weight: 700; text-align: center;">Bem-vindo à família ASCOM, ${userName}!</h2>
        
        <p style="color: #4b5563; font-size: 18px; line-height: 1.7; margin: 30px 0; text-align: center;">
          Excelente notícia! Sua conta foi aprovada e agora você tem <strong>acesso completo</strong> a todas as funcionalidades da plataforma ASCOM.
        </p>

        <!-- Profile Card -->
        <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 40px; border-radius: 20px; border: 2px solid #10b981; margin: 40px 0; text-align: center; position: relative; box-shadow: 0 8px 30px rgba(16, 185, 129, 0.15);">
          <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #10b981 0%, #34d399 100%); color: white; padding: 10px 25px; border-radius: 25px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">Aprovado</div>
          
          <div style="margin-top: 20px;">
            <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); border-radius: 50%; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(15, 160, 206, 0.4);">
              <span style="color: white; font-size: 40px; font-weight: 800;">${role.charAt(0).toUpperCase()}</span>
            </div>
            <h3 style="color: #0c4a6e; margin: 0 0 20px 0; font-size: 24px; font-weight: 700;">Perfil: ${role.charAt(0).toUpperCase() + role.slice(1)}</h3>
            
            <!-- Modern Login Button -->
            <div style="margin: 30px 0;">
              <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 15px; font-weight: 700; font-size: 18px; box-shadow: 0 8px 25px rgba(15, 160, 206, 0.4); transition: all 0.3s ease; border: none; text-transform: uppercase; letter-spacing: 0.5px; position: relative; overflow: hidden;">
                <span style="position: relative; z-index: 2; display: flex; align-items: center; justify-content: center;">
                  🚀 Fazer Login Agora
                </span>
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin: 15px 0 0 0; font-style: italic;">Clique no botão acima para acessar sua dashboard</p>
          </div>
        </div>

        <!-- Features Grid -->
        <div style="margin: 40px 0;">
          <h3 style="color: #374151; margin: 0 0 30px 0; font-size: 20px; font-weight: 600; text-align: center; display: flex; align-items: center; justify-content: center;">
            <span style="margin-right: 12px;">🎯</span> O que você pode fazer agora
          </h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 25px;">
            <div style="background: #f0f9ff; padding: 25px; border-radius: 12px; border-left: 4px solid #0FA0CE; text-align: center;">
              <div style="font-size: 24px; margin-bottom: 10px;">📊</div>
              <h4 style="color: #0c4a6e; margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Dashboard</h4>
              <p style="color: #0c4a6e; margin: 0; font-size: 12px;">Acesse seu painel personalizado</p>
            </div>
            
            <div style="background: #f0f9ff; padding: 25px; border-radius: 12px; border-left: 4px solid #0FA0CE; text-align: center;">
              <div style="font-size: 24px; margin-bottom: 10px;">⚙️</div>
              <h4 style="color: #0c4a6e; margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Perfil</h4>
              <p style="color: #0c4a6e; margin: 0; font-size: 12px;">Configure seu perfil completo</p>
            </div>
            
            <div style="background: #f0f9ff; padding: 25px; border-radius: 12px; border-left: 4px solid #0FA0CE; text-align: center;">
              <div style="font-size: 24px; margin-bottom: 10px;">🛠️</div>
              <h4 style="color: #0c4a6e; margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Ferramentas</h4>
              <p style="color: #0c4a6e; margin: 0; font-size: 12px;">Explore todas as funcionalidades</p>
            </div>
            
            <div style="background: #f0f9ff; padding: 25px; border-radius: 12px; border-left: 4px solid #0FA0CE; text-align: center;">
              <div style="font-size: 24px; margin-bottom: 10px;">📱</div>
              <h4 style="color: #0c4a6e; margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Mobile</h4>
              <p style="color: #0c4a6e; margin: 0; font-size: 12px;">Acesse de qualquer dispositivo</p>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div style="text-align: center; margin: 40px 0; padding: 30px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 16px; border: 1px solid #0FA0CE;">
          <h3 style="color: #0c4a6e; font-size: 20px; margin: 0 0 10px 0; font-weight: 700;">🌟 Sua jornada ASCOM começa agora!</h3>
          <p style="color: #0c4a6e; font-size: 16px; margin: 0;">Estamos ansiosos para ver o que você vai conquistar na nossa plataforma.</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #1f2937; padding: 40px; text-align: center;">
        <div style="margin-bottom: 20px;">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(15, 160, 206, 0.3);">
            <span style="color: white; font-size: 24px; font-weight: bold;">A</span>
          </div>
        </div>
        <p style="color: #f9fafb; font-size: 16px; margin: 0 0 10px 0; font-weight: 600;">
          <strong>ASCOM</strong> - Conectando Comércios e Entregadores
        </p>
        <p style="color: #9ca3af; font-size: 13px; margin: 0;">
          Precisa de ajuda? Entre em contato conosco através da plataforma.
        </p>
      </div>
    </div>
  `,

  rejected: (userName: string, reason?: string) => `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
      <!-- Header with Warning Theme -->
      <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%); padding: 60px 40px; text-align: center; position: relative; overflow: hidden;">
        <!-- Decorative Elements -->
        <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
        <div style="position: absolute; bottom: -30px; left: -30px; width: 150px; height: 150px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.2;"></div>
        
        <!-- Warning Icon -->
        <div style="margin-bottom: 30px; position: relative; z-index: 10;">
          <div style="width: 120px; height: 120px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; border: 3px solid rgba(255,255,255,0.3); box-shadow: 0 12px 40px rgba(0,0,0,0.15);">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #ffffff 0%, #fef3c7 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);">
              <span style="font-size: 36px;">⚠️</span>
            </div>
          </div>
        </div>
        
        <h1 style="color: white; margin: 0 0 15px 0; font-size: 40px; font-weight: 800; text-shadow: 0 4px 8px rgba(0,0,0,0.2); letter-spacing: -0.02em;">Cadastro Não Aprovado</h1>
        <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 18px; font-weight: 500; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Precisamos de alguns ajustes</p>
      </div>

      <!-- Main Content -->
      <div style="background: white; padding: 50px 40px;">
        <h2 style="color: #1f2937; margin: 0 0 25px 0; font-size: 28px; font-weight: 700; text-align: center;">Olá, ${userName}</h2>
        
        <p style="color: #4b5563; font-size: 17px; line-height: 1.7; margin: 30px 0; text-align: center;">
          Agradecemos seu interesse em fazer parte da plataforma ASCOM. Infelizmente, não foi possível aprovar seu cadastro neste momento, mas <strong>não desista</strong>!
        </p>

        ${reason ? `
          <!-- Reason Card -->
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; padding: 35px; border-radius: 16px; margin: 35px 0; position: relative; box-shadow: 0 4px 20px rgba(245, 158, 11, 0.15);">
            <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #f59e0b; color: white; padding: 8px 20px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Motivo</div>
            
            <div style="text-align: center; margin-top: 15px;">
              <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 20px rgba(245, 158, 11, 0.3);">
                <span style="color: white; font-size: 24px;">💬</span>
              </div>
              <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Motivo da não aprovação:</h3>
              <div style="background: rgba(146, 64, 14, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #92400e;">
                <p style="color: #92400e; margin: 0; font-size: 16px; line-height: 1.6; font-weight: 500;">
                  ${reason}
                </p>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Next Steps -->
        <div style="background: #f0f9ff; padding: 35px; border-radius: 16px; border-left: 4px solid #0FA0CE; margin: 35px 0;">
          <h3 style="color: #0c4a6e; margin: 0 0 25px 0; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
            <span style="margin-right: 12px;">🔄</span> Próximos Passos
          </h3>
          
          <div style="space-y: 15px;">
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: rgba(15, 160, 206, 0.05); border-radius: 8px;">
              <div style="width: 30px; height: 30px; background: #0FA0CE; border-radius: 50%; margin-right: 15px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <span style="color: white; font-size: 14px; font-weight: bold;">1</span>
              </div>
              <div>
                <h4 style="color: #0c4a6e; margin: 0 0 5px 0; font-size: 15px; font-weight: 600;">Revise as informações</h4>
                <p style="color: #0c4a6e; margin: 0; font-size: 14px; line-height: 1.5;">Confira todos os dados fornecidos no cadastro</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: rgba(15, 160, 206, 0.05); border-radius: 8px;">
              <div style="width: 30px; height: 30px; background: #0FA0CE; border-radius: 50%; margin-right: 15px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <span style="color: white; font-size: 14px; font-weight: bold;">2</span>
              </div>
              <div>
                <h4 style="color: #0c4a6e; margin: 0 0 5px 0; font-size: 15px; font-weight: 600;">Corrija os pontos mencionados</h4>
                <p style="color: #0c4a6e; margin: 0; font-size: 14px; line-height: 1.5;">Ajuste as informações conforme orientações acima</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: rgba(15, 160, 206, 0.05); border-radius: 8px;">
              <div style="width: 30px; height: 30px; background: #0FA0CE; border-radius: 50%; margin-right: 15px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <span style="color: white; font-size: 14px; font-weight: bold;">3</span>
              </div>
              <div>
                <h4 style="color: #0c4a6e; margin: 0 0 5px 0; font-size: 15px; font-weight: 600;">Reenvie sua solicitação</h4>
                <p style="color: #0c4a6e; margin: 0; font-size: 14px; line-height: 1.5;">Faça um novo cadastro com as correções</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start; padding: 15px; background: rgba(16, 185, 129, 0.05); border-radius: 8px;">
              <div style="width: 30px; height: 30px; background: #10b981; border-radius: 50%; margin-right: 15px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <span style="color: white; font-size: 14px; font-weight: bold;">4</span>
              </div>
              <div>
                <h4 style="color: #065f46; margin: 0 0 5px 0; font-size: 15px; font-weight: 600;">Entre em contato</h4>
                <p style="color: #065f46; margin: 0; font-size: 14px; line-height: 1.5;">Se tiver dúvidas, nossa equipe está aqui para ajudar</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Encouragement Section -->
        <div style="text-align: center; margin: 40px 0; padding: 35px; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 16px; border: 1px solid #10b981;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #34d399 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);">
            <span style="font-size: 32px;">💪</span>
          </div>
          <h3 style="color: #065f46; font-size: 22px; margin: 0 0 15px 0; font-weight: 700;">Não desista! Estamos aqui para ajudar.</h3>
          <p style="color: #065f46; font-size: 16px; margin: 0; line-height: 1.6;">
            Se você acredita que isso foi um erro ou precisa de esclarecimentos adicionais, entre em contato conosco. Nossa equipe está sempre disponível para ajudar você a fazer parte da família ASCOM.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #1f2937; padding: 40px; text-align: center;">
        <div style="margin-bottom: 20px;">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #0FA0CE 0%, #33C3F0 100%); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(15, 160, 206, 0.3);">
            <span style="color: white; font-size: 24px; font-weight: bold;">A</span>
          </div>
        </div>
        <p style="color: #f9fafb; font-size: 16px; margin: 0 0 10px 0; font-weight: 600;">
          <strong>ASCOM</strong> - Conectando Comércios e Entregadores
        </p>
        <p style="color: #9ca3af; font-size: 13px; margin: 0;">
          Nossa equipe está sempre disponível para ajudar você a se juntar à nossa plataforma.
        </p>
      </div>
    </div>
  `
};
