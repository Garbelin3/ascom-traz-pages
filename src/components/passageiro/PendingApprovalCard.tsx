
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const PendingApprovalCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Solicitar Corrida
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Aguarde a aprovação da sua conta para poder solicitar corridas.
        </p>
      </CardContent>
    </Card>
  );
};

export default PendingApprovalCard;
