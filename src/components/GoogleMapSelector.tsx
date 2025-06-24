
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface GoogleMapSelectorProps {
  onRouteSelect: (origin: Location, destination: Location) => void;
}

const GoogleMapSelector: React.FC<GoogleMapSelectorProps> = ({ onRouteSelect }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<Location | null>(null);
  const destinationRef = useRef<Location | null>(null);
  const originPickerRef = useRef<any>(null);
  const destinationPickerRef = useRef<any>(null);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      // Carregar o script do Google Maps Extended Components
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js';
      document.head.appendChild(script);

      await new Promise(resolve => {
        script.onload = resolve;
      });

      // Aguardar os custom elements serem definidos
      await customElements.whenDefined('gmp-map');
      await customElements.whenDefined('gmpx-place-picker');

      if (mapContainerRef.current) {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapContainerRef.current) return;

      const mapHTML = `
        <gmpx-api-loader key="AIzaSyA4UhalNkspnuyotvSjwZlNp_9xyZ-5kyg" solution-channel="GMP_GE_mapsandplacesautocomplete_v2">
        </gmpx-api-loader>
        <gmp-map center="-20.3155,-40.2925" zoom="13" map-id="DEMO_MAP_ID" style="height: 400px; width: 100%;">
          <div slot="control-block-start-inline-start" style="padding: 10px; background: white; margin: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 10px;">
              <label style="display: block; margin-bottom: 5px; font-weight: 500; color: #374151;">Ponto de Partida:</label>
              <gmpx-place-picker id="origin-picker" placeholder="Digite o endereço de origem" style="width: 250px;"></gmpx-place-picker>
            </div>
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500; color: #374151;">Destino:</label>
              <gmpx-place-picker id="destination-picker" placeholder="Digite o endereço de destino" style="width: 250px;"></gmpx-place-picker>
            </div>
          </div>
          <gmp-advanced-marker id="origin-marker"></gmp-advanced-marker>
          <gmp-advanced-marker id="destination-marker"></gmp-advanced-marker>
        </gmp-map>
      `;

      mapContainerRef.current.innerHTML = mapHTML;

      // Configurar event listeners após um pequeno delay
      setTimeout(() => {
        setupEventListeners();
      }, 1000);
    };

    const setupEventListeners = () => {
      const map = document.querySelector('gmp-map') as any;
      const originMarker = document.querySelector('#origin-marker') as any;
      const destinationMarker = document.querySelector('#destination-marker') as any;
      const originPicker = document.querySelector('#origin-picker') as any;
      const destinationPicker = document.querySelector('#destination-picker') as any;

      if (!map || !originMarker || !destinationMarker || !originPicker || !destinationPicker) {
        console.log('Elementos não encontrados, tentando novamente...');
        setTimeout(setupEventListeners, 500);
        return;
      }

      originPickerRef.current = originPicker;
      destinationPickerRef.current = destinationPicker;

      // Configurar o mapa
      if (map.innerMap) {
        map.innerMap.setOptions({
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });
      }

      // Event listener para origem
      originPicker.addEventListener('gmpx-placechange', () => {
        const place = originPicker.value;
        
        if (!place.location) {
          console.log('Nenhum local encontrado para origem');
          return;
        }

        originRef.current = {
          lat: place.location.lat,
          lng: place.location.lng,
          address: place.formattedAddress || place.displayName
        };

        // Posicionar marcador de origem (verde)
        originMarker.position = place.location;
        if (originMarker.style) {
          originMarker.style.backgroundColor = '#10B981';
        }

        // Ajustar visualização do mapa
        if (place.viewport && map.innerMap) {
          map.innerMap.fitBounds(place.viewport);
        } else {
          map.center = place.location;
          map.zoom = 15;
        }

        console.log('Origem selecionada:', originRef.current);
      });

      // Event listener para destino
      destinationPicker.addEventListener('gmpx-placechange', () => {
        const place = destinationPicker.value;
        
        if (!place.location) {
          console.log('Nenhum local encontrado para destino');
          return;
        }

        destinationRef.current = {
          lat: place.location.lat,
          lng: place.location.lng,
          address: place.formattedAddress || place.displayName
        };

        // Posicionar marcador de destino (vermelho)
        destinationMarker.position = place.location;
        if (destinationMarker.style) {
          destinationMarker.style.backgroundColor = '#EF4444';
        }

        // Ajustar visualização para mostrar ambos os pontos
        if (originRef.current && map.innerMap) {
          const bounds = new (window as any).google.maps.LatLngBounds();
          bounds.extend(new (window as any).google.maps.LatLng(originRef.current.lat, originRef.current.lng));
          bounds.extend(new (window as any).google.maps.LatLng(destinationRef.current.lat, destinationRef.current.lng));
          map.innerMap.fitBounds(bounds);
        }

        console.log('Destino selecionado:', destinationRef.current);
      });
    };

    loadGoogleMaps();
  }, []);

  const handleConfirmRoute = () => {
    if (originRef.current && destinationRef.current) {
      onRouteSelect(originRef.current, destinationRef.current);
    }
  };

  const handleClearRoute = () => {
    originRef.current = null;
    destinationRef.current = null;
    
    // Limpar os campos
    if (originPickerRef.current) {
      originPickerRef.current.value = null;
    }
    if (destinationPickerRef.current) {
      destinationPickerRef.current.value = null;
    }

    // Limpar marcadores
    const originMarker = document.querySelector('#origin-marker') as any;
    const destinationMarker = document.querySelector('#destination-marker') as any;
    if (originMarker) originMarker.position = null;
    if (destinationMarker) destinationMarker.position = null;
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
          Use os campos no mapa para pesquisar e selecionar os endereços de origem e destino.
        </div>
        
        {/* Container do mapa */}
        <div ref={mapContainerRef} className="w-full"></div>

        {/* Botões de ação */}
        <div className="flex gap-2">
          <Button
            onClick={handleConfirmRoute}
            className="bg-ascom hover:bg-ascom/90"
          >
            Confirmar Corrida
          </Button>
          <Button
            onClick={handleClearRoute}
            variant="outline"
          >
            Limpar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleMapSelector;
