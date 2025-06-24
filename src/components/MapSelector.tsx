
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Navigation } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface MapSelectorProps {
  onRouteSelect: (origin: Location, destination: Location) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -20.3155, // Vila Velha, ES
  lng: -40.2925
};

const MapSelector: React.FC<MapSelectorProps> = ({ onRouteSelect }) => {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };

      if (!origin) {
        setOrigin(location);
        // Reverse geocoding to get address
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location }, (results, status) => {
          if (status === 'OK' && results?.[0]) {
            setOriginAddress(results[0].formatted_address);
          }
        });
      } else if (!destination) {
        setDestination(location);
        // Reverse geocoding to get address
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location }, (results, status) => {
          if (status === 'OK' && results?.[0]) {
            setDestinationAddress(results[0].formatted_address);
          }
        });
      }
    }
  }, [origin, destination]);

  const clearRoute = () => {
    setOrigin(null);
    setDestination(null);
    setOriginAddress('');
    setDestinationAddress('');
  };

  const confirmRoute = () => {
    if (origin && destination) {
      onRouteSelect(
        { ...origin, address: originAddress },
        { ...destination, address: destinationAddress }
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Selecione os Pontos da Corrida
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          Clique no mapa para selecionar: primeiro o ponto de partida, depois o destino.
        </div>
        
        {/* Campos de origem e destino ACIMA do mapa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-500" />
              Ponto de Partida
            </Label>
            <Input
              value={originAddress}
              onChange={(e) => setOriginAddress(e.target.value)}
              placeholder="Clique no mapa ou digite o endereço"
              readOnly={!!origin}
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-500" />
              Destino
            </Label>
            <Input
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              placeholder="Clique no mapa ou digite o endereço"
              readOnly={!!destination}
            />
          </div>
        </div>

        {/* Mapa abaixo dos campos */}
        <LoadScript googleMapsApiKey="AIzaSyBFw0Qbyq9zTFTd-tUY6dO_2oQ2W-HnV5M">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
            onClick={onMapClick}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {origin && (
              <Marker
                position={origin}
                icon={{
                  url: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%234CAF50"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/%3E%3C/svg%3E'
                }}
                title="Ponto de Partida"
              />
            )}
            {destination && (
              <Marker
                position={destination}
                icon={{
                  url: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23F44336"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/%3E%3C/svg%3E'
                }}
                title="Destino"
              />
            )}
          </GoogleMap>
        </LoadScript>

        {/* Botões de ação */}
        <div className="flex gap-2">
          <Button
            onClick={confirmRoute}
            disabled={!origin || !destination}
            className="bg-ascom hover:bg-ascom-dark"
          >
            Confirmar Corrida
          </Button>
          <Button
            onClick={clearRoute}
            variant="outline"
          >
            Limpar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapSelector;
