
import { supabase } from '@/integrations/supabase/client';

export const createTestUsers = async () => {
  try {
    console.log('Criando usuários de teste...');

    // 1. Criar usuário administrador
    const { data: adminAuth, error: adminAuthError } = await supabase.auth.signUp({
      email: 'admin@teste.com',
      password: 'senha123',
      options: {
        data: {
          role: 'admin'
        }
      }
    });

    if (adminAuthError) {
      console.error('Erro ao criar admin:', adminAuthError);
    } else {
      console.log('Admin criado:', adminAuth.user?.id);
      
      // Aprovar o admin automaticamente
      if (adminAuth.user) {
        await supabase
          .from('users')
          .update({ status: 'aprovado' })
          .eq('id', adminAuth.user.id);
      }
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
    } else {
      console.log('Entregador criado:', entregadorAuth.user?.id);
      
      if (entregadorAuth.user) {
        // Inserir dados específicos do entregador
        await supabase.from('entregadores').insert({
          user_id: entregadorAuth.user.id,
          nome: 'João Silva',
          telefone: '(11) 99999-9999',
          endereco: 'Rua das Flores, 123',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01234-567',
          veiculo: 'moto'
        });

        // Aprovar o entregador
        await supabase
          .from('users')
          .update({ status: 'aprovado' })
          .eq('id', entregadorAuth.user.id);
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
    } else {
      console.log('Comércio criado:', comercioAuth.user?.id);
      
      if (comercioAuth.user) {
        // Inserir dados específicos do comércio
        await supabase.from('comercios').insert({
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

        // Aprovar o comércio
        await supabase
          .from('users')
          .update({ status: 'aprovado' })
          .eq('id', comercioAuth.user.id);
      }
    }

    console.log('Todos os usuários de teste foram criados com sucesso!');
    
  } catch (error) {
    console.error('Erro ao criar usuários de teste:', error);
  }
};
