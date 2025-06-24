
import React from 'react';
import GoogleMapSelector from '@/components/GoogleMapSelector';

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
  return <GoogleMapSelector onRouteSelect={onRouteSelect} />;
};

export default RideRequestSection;
