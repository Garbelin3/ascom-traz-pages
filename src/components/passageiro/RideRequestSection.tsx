
import React from 'react';
import SimpleMapSelector from '@/components/SimpleMapSelector';

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
  return <SimpleMapSelector onRouteSelect={onRouteSelect} />;
};

export default RideRequestSection;
