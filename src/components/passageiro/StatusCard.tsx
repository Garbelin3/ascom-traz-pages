import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Check, X } from 'lucide-react';
interface StatusCardProps {
  status: string;
}
const StatusCard: React.FC<StatusCardProps> = ({
  status
}) => {
  const getStatusComponent = (status: string) => {
    switch (status) {
      case 'aprovado':
        return <div className="flex items-center gap-2 text-green-600">
            <Check size={20} />
            <span>Conta aprovada! Você pode solicitar corridas.</span>
          </div>;
      case 'reprovado':
        return <div className="flex items-center gap-2 text-red-600">
            <X size={20} />
            <span>Cadastro reprovado. Entre em contato para mais informações.</span>
          </div>;
      default:
        return <div className="flex items-center gap-2 text-yellow-600">
            <AlertCircle size={20} />
            <span>Cadastro em análise. Aguarde a aprovação.</span>
          </div>;
    }
  };
  return <Card>
      
      
    </Card>;
};
export default StatusCard;