
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

    // 2. Criar usuário motorista
    const { data: motoristaAuth, error: motoristaAuthError } = await supabase.auth.signUp({
      email: 'motorista@teste.com',
      password: 'senha123',
      options: {
        data: {
          role: 'motorista'
        }
      }
    });

    if (motoristaAuthError) {
      console.error('Erro ao criar motorista:', motoristaAuthError);
      if (motoristaAuthError.message.includes('User already registered')) {
        console.log('Motorista já existe, continuando...');
      } else {
        throw motoristaAuthError;
      }
    } else {
      console.log('Motorista criado:', motoristaAuth.user?.id);
      
      if (motoristaAuth.user) {
        // Aguardar um pouco para o trigger processar
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Inserir dados específicos do motorista
        const { error: motoristaDataError } = await supabase.from('motoristas').insert({
          user_id: motoristaAuth.user.id,
          nome_completo: 'João Silva',
          telefone: '(11) 99999-9999',
          endereco: 'Rua das Flores, 123',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01234-567',
          veiculo: 'moto',
          cnh: '12345678901',
          modelo_veiculo: 'Honda CG 160',
          placa_veiculo: 'ABC1234',
          cor_veiculo: 'Vermelha',
          ano_veiculo: 2020
        });

        if (motoristaDataError) {
          console.error('Erro ao inserir dados do motorista:', motoristaDataError);
        }

        // Aprovar o motorista
        const { error: updateError } = await supabase
          .from('users')
          .update({ status: 'aprovado' })
          .eq('id', motoristaAuth.user.id);

        if (updateError) {
          console.error('Erro ao aprovar motorista:', updateError);
        }
      }
    }

    // 3. Criar usuário passageiro
    const { data: passageiroAuth, error: passageiroAuthError } = await supabase.auth.signUp({
      email: 'passageiro@teste.com',
      password: 'senha123',
      options: {
        data: {
          role: 'passageiro'
        }
      }
    });

    if (passageiroAuthError) {
      console.error('Erro ao criar passageiro:', passageiroAuthError);
      if (passageiroAuthError.message.includes('User already registered')) {
        console.log('Passageiro já existe, continuando...');
      } else {
        throw passageiroAuthError;
      }
    } else {
      console.log('Passageiro criado:', passageiroAuth.user?.id);
      
      if (passageiroAuth.user) {
        // Aguardar um pouco para o trigger processar
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Inserir dados específicos do passageiro
        const { error: passageiroDataError } = await supabase.from('passageiros').insert({
          user_id: passageiroAuth.user.id,
          nome_completo: 'Maria Santos',
          telefone: '(11) 88888-8888',
          endereco_favorito: 'Casa',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01234-567'
        });

        if (passageiroDataError) {
          console.error('Erro ao inserir dados do passageiro:', passageiroDataError);
        }

        // Aprovar o passageiro
        const { error: updateError } = await supabase
          .from('users')
          .update({ status: 'aprovado' })
          .eq('id', passageiroAuth.user.id);

        if (updateError) {
          console.error('Erro ao aprovar passageiro:', updateError);
        }
      }
    }

    console.log('Processo de criação de usuários de teste concluído!');
    
  } catch (error) {
    console.error('Erro ao criar usuários de teste:', error);
    throw error;
  }
};
