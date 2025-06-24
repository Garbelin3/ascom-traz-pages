
import React from 'react';
import MapSelector from '@/components/MapSelector';
import PendingApprovalCard from './PendingApprovalCard';

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
  if (!passageiroData) return null;

  if (passageiroData.status === 'aprovado') {
    return <MapSelector onRouteSelect={onRouteSelect} />;
  }

  return <PendingApprovalCard />;
};

export default RideRequestSection;
