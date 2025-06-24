
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PersonalInfoCardProps {
  passageiroData: any;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ passageiroData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
      </CardHeader>
      <CardContent>
        {passageiroData ? (
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Nome:</span> {passageiroData.nome_completo}
            </div>
            <div>
              <span className="font-semibold">Telefone:</span> {passageiroData.telefone}
            </div>
            {passageiroData.endereco_favorito && (
              <div>
                <span className="font-semibold">Endereço Favorito:</span> {passageiroData.endereco_favorito}
              </div>
            )}
            <div>
              <span className="font-semibold">Cidade:</span> {passageiroData.cidade}, {passageiroData.estado}
            </div>
            <div>
              <span className="font-semibold">CEP:</span> {passageiroData.cep}
            </div>
          </div>
        ) : (
          <p>Erro ao carregar informações</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
