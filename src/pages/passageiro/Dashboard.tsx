
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatusCard from '@/components/passageiro/StatusCard';
import UserHeader from '@/components/passageiro/UserHeader';
import PersonalInfoCard from '@/components/passageiro/PersonalInfoCard';
import RideRequestSection from '@/components/passageiro/RideRequestSection';
import { usePassageiroData } from '@/hooks/usePassageiroData';
import { toast } from '@/hooks/use-toast';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

const PassageiroDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { passageiroData, isLoading } = usePassageiroData(user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleRouteSelect = async (origin: Location, destination: Location) => {
    try {
      // Aqui você pode salvar a solicitação de corrida no banco
      console.log('Origem:', origin);
      console.log('Destino:', destination);
      
      toast({
        title: "Corrida solicitada!",
        description: "Sua solicitação foi enviada aos entregadores da região.",
      });
    } catch (error) {
      console.error('Erro ao solicitar corrida:', error);
      toast({
        title: "Erro",
        description: "Não foi possível solicitar a corrida. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-ascom rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader onLogout={handleLogout} />

      <main className="container mx-auto p-4 md:p-6 space-y-6">
        <StatusCard status={passageiroData?.status || 'pendente'} />
        
        <RideRequestSection 
          passageiroData={passageiroData}
          onRouteSelect={handleRouteSelect}
        />

        {passageiroData && (
          <PersonalInfoCard passageiroData={passageiroData} />
        )}
      </main>
    </div>
  );
};

export default PassageiroDashboard;
