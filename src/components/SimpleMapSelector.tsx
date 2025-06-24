
import React, { useState } from 'react';
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

interface SimpleMapSelectorProps {
  onRouteSelect: (origin: Location, destination: Location) => void;
}

const SimpleMapSelector: React.FC<SimpleMapSelectorProps> = ({ onRouteSelect }) => {
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  const clearRoute = () => {
    setOriginAddress('');
    setDestinationAddress('');
  };

  const confirmRoute = () => {
    if (originAddress && destinationAddress) {
      // Criar localizações fictícias para demonstração
      const origin: Location = {
        lat: -20.3155,
        lng: -40.2925,
        address: originAddress
      };
      
      const destination: Location = {
        lat: -20.3200,
        lng: -40.2800,
        address: destinationAddress
      };

      onRouteSelect(origin, destination);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Solicitar Corrida
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          Digite os endereços de origem e destino para solicitar sua corrida.
        </div>
        
        {/* Campos de origem e destino */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-500" />
              Ponto de Partida
            </Label>
            <Input
              value={originAddress}
              onChange={(e) => setOriginAddress(e.target.value)}
              placeholder="Digite o endereço de origem"
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
              placeholder="Digite o endereço de destino"
            />
          </div>
        </div>

        {/* Área de visualização do mapa (placeholder) */}
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-2" />
            <p>Mapa será carregado aqui</p>
            <p className="text-sm">Integração com mapa em desenvolvimento</p>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-2">
          <Button
            onClick={confirmRoute}
            disabled={!originAddress || !destinationAddress}
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

export default SimpleMapSelector;
