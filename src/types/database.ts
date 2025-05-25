
export type UserRole = 'admin' | 'entregador' | 'comercio';
export type ApprovalStatus = 'pendente' | 'aprovado' | 'reprovado';
export type VehicleType = 'moto' | 'carro' | 'bicicleta';

export interface UserRecord {
  id: string;
  email: string;
  role: UserRole;
  status: ApprovalStatus;
  created_at: string | null;
  updated_at: string | null;
}

export interface EntregadorRecord {
  id: string;
  user_id: string;
  nome: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  veiculo: VehicleType;
  status: ApprovalStatus;
  created_at: string | null;
  updated_at: string | null;
}

export interface ComercioRecord {
  id: string;
  user_id: string;
  nome_estabelecimento: string;
  nome_responsavel: string;
  telefone: string;
  tipo_negocio: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  status: ApprovalStatus;
  created_at: string | null;
  updated_at: string | null;
}
