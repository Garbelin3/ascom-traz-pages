
import { supabase } from '@/integrations/supabase/client';

export const createTestUsers = async () => {
  try {
    console.log('Criando usuários de teste...');

    // 1. Criar usuário administrador
    const { data: adminAuth, error: adminAuthError } = await supabase.auth.signUp({
      email: 'admin@codeprogram.com.br',
      password: 'ascom2025@Admin',
      options: {
        data: {
          role: 'admin'
        }
      }
    });

    if (adminAuthError) {
      console.error('Erro ao criar admin:', adminAuthError);
      if (adminAuthError.message.includes('User already registered')) {
        console.log('Admin já existe, continuando...');
      } else {
        throw adminAuthError;
      }
    } else {
      console.log('Admin criado:', adminAuth.user?.id);
    }

    // 2. Criar usuário entregador
    const { data: entregadorAuth, error: entregadorAuthError } = await supabase.auth.signUp({
      email: 'entregador@teste.com',
      password: 'senha123',
      options: {
        data: {
          role: 'entregador'
        }
      }
    });

    if (entregadorAuthError) {
      console.error('Erro ao criar entregador:', entregadorAuthError);
      if (entregadorAuthError.message.includes('User already registered')) {
        console.log('Entregador já existe, continuando...');
      } else {
        throw entregadorAuthError;
      }
    } else {
      console.log('Entregador criado:', entregadorAuth.user?.id);
      
      if (entregadorAuth.user) {
        // Aguardar um pouco para o trigger processar
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Inserir dados específicos do entregador
        const { error: entregadorDataError } = await supabase.from('entregadores').insert({
          user_id: entregadorAuth.user.id,
          nome: 'João Silva',
          telefone: '(11) 99999-9999',
          endereco: 'Rua das Flores, 123',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01234-567',
          veiculo: 'moto'
        });

        if (entregadorDataError) {
          console.error('Erro ao inserir dados do entregador:', entregadorDataError);
        }

        // Aprovar o entregador
        const { error: updateError } = await supabase
          .from('users')
          .update({ status: 'aprovado' })
          .eq('id', entregadorAuth.user.id);

        if (updateError) {
          console.error('Erro ao aprovar entregador:', updateError);
        }
      }
    }

    // 3. Criar usuário comércio
    const { data: comercioAuth, error: comercioAuthError } = await supabase.auth.signUp({
      email: 'comercio@teste.com',
      password: 'senha123',
      options: {
        data: {
          role: 'comercio'
        }
      }
    });

    if (comercioAuthError) {
      console.error('Erro ao criar comércio:', comercioAuthError);
      if (comercioAuthError.message.includes('User already registered')) {
        console.log('Comércio já existe, continuando...');
      } else {
        throw comercioAuthError;
      }
    } else {
      console.log('Comércio criado:', comercioAuth.user?.id);
      
      if (comercioAuth.user) {
        // Aguardar um pouco para o trigger processar
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Inserir dados específicos do comércio
        const { error: comercioDataError } = await supabase.from('comercios').insert({
          user_id: comercioAuth.user.id,
          nome_estabelecimento: 'Restaurante do João',
          nome_responsavel: 'Maria Santos',
          telefone: '(11) 88888-8888',
          tipo_negocio: 'Restaurante',
          endereco: 'Avenida Principal, 456',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01234-567'
        });

        if (comercioDataError) {
          console.error('Erro ao inserir dados do comércio:', comercioDataError);
        }

        // Aprovar o comércio
        const { error: updateError } = await supabase
          .from('users')
          .update({ status: 'aprovado' })
          .eq('id', comercioAuth.user.id);

        if (updateError) {
          console.error('Erro ao aprovar comércio:', updateError);
        }
      }
    }

    console.log('Processo de criação de usuários de teste concluído!');
    
  } catch (error) {
    console.error('Erro ao criar usuários de teste:', error);
    throw error;
  }
};
