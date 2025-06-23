
-- Remover TODAS as políticas RLS que dependem da coluna role em qualquer tabela
DROP POLICY IF EXISTS "Admins podem atualizar status de usuários" ON users;
DROP POLICY IF EXISTS "Admins podem ver todos os usuários" ON users;
DROP POLICY IF EXISTS "Admins podem atualizar status de comércios" ON comercios;
DROP POLICY IF EXISTS "Admins podem ver todos os comércios" ON comercios;
DROP POLICY IF EXISTS "Admins podem atualizar status de entregadores" ON entregadores;
DROP POLICY IF EXISTS "Admins podem ver todos os entregadores" ON entregadores;

-- Remover a tabela comercios completamente
DROP TABLE IF EXISTS comercios CASCADE;

-- Renomear a tabela entregadores para motoristas
ALTER TABLE entregadores RENAME TO motoristas;

-- Atualizar campos da tabela motoristas
ALTER TABLE motoristas RENAME COLUMN nome TO nome_completo;
ALTER TABLE motoristas ADD COLUMN IF NOT EXISTS cnh TEXT;
ALTER TABLE motoristas ADD COLUMN IF NOT EXISTS ano_veiculo INTEGER;
ALTER TABLE motoristas ADD COLUMN IF NOT EXISTS modelo_veiculo TEXT;
ALTER TABLE motoristas ADD COLUMN IF NOT EXISTS placa_veiculo TEXT;
ALTER TABLE motoristas ADD COLUMN IF NOT EXISTS cor_veiculo TEXT;

-- Agora podemos alterar o enum de roles
ALTER TYPE user_role RENAME TO user_role_old;
CREATE TYPE user_role AS ENUM ('admin', 'passageiro', 'motorista');

-- Atualizar a tabela users
ALTER TABLE users ALTER COLUMN role DROP DEFAULT;
ALTER TABLE users ALTER COLUMN role TYPE user_role USING 
  CASE 
    WHEN role::text = 'entregador' THEN 'motorista'::user_role
    ELSE 'passageiro'::user_role
  END;
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'passageiro'::user_role;

-- Criar tabela para passageiros
CREATE TABLE IF NOT EXISTS passageiros (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  nome_completo TEXT NOT NULL,
  telefone TEXT NOT NULL,
  endereco_favorito TEXT,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  cep TEXT NOT NULL,
  status approval_status NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Atualizar a função handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.users (id, email, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'passageiro')::user_role,
    'pendente'::approval_status
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Erro na função handle_new_user: %', SQLERRM;
    RAISE;
END;
$function$;

-- Remover o tipo antigo
DROP TYPE user_role_old;

-- Recriar políticas RLS básicas para as novas tabelas
ALTER TABLE motoristas ENABLE ROW LEVEL SECURITY;
ALTER TABLE passageiros ENABLE ROW LEVEL SECURITY;

-- Políticas para admins verem tudo
CREATE POLICY "Admins podem ver todos os motoristas" ON motoristas
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins podem ver todos os passageiros" ON passageiros
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );
