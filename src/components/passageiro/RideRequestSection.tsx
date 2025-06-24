
import React from 'react';
import MapSelector from '@/components/MapSelector';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface RideRequestSectionProps {
  passageiroData: any;
  onRouteSelect: (origin: Location, destination: Location) => void;
}

const RideRequestSection: React.FC<RideRequestSectionProps> = ({ 
  passageiroData, 
  onRouteSelect 
}) => {
  // Sempre mostra o mapa para solicitar corridas, independente do status
  return <MapSelector onRouteSelect={onRouteSelect} />;
};

export default RideRequestSection;
