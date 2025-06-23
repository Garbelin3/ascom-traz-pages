
export type UserRole = 'admin' | 'motorista' | 'passageiro';
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

export interface MotoristaRecord {
  id: string;
  user_id: string;
  nome_completo: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  veiculo: VehicleType;
  cnh: string | null;
  ano_veiculo: number | null;
  modelo_veiculo: string | null;
  placa_veiculo: string | null;
  cor_veiculo: string | null;
  status: ApprovalStatus;
  created_at: string | null;
  updated_at: string | null;
}

export interface PassageiroRecord {
  id: string;
  user_id: string;
  nome_completo: string;
  telefone: string;
  endereco_favorito: string | null;
  cidade: string;
  estado: string;
  cep: string;
  status: ApprovalStatus;
  created_at: string | null;
  updated_at: string | null;
}
