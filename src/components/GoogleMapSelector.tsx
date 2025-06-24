
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
    console.log('GoogleMapSelector: Iniciando carregamento do mapa...');
    
    const loadGoogleMaps = async () => {
      try {
        console.log('GoogleMapSelector: Carregando script do Google Maps...');
        
        // Verificar se o script já foi carregado
        const existingScript = document.querySelector('script[src*="@googlemaps/extended-component-library"]');
        if (existingScript) {
          console.log('GoogleMapSelector: Script já existe, removendo...');
          existingScript.remove();
        }

        // Carregar o script do Google Maps Extended Components
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js';
        document.head.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = () => {
            console.log('GoogleMapSelector: Script carregado com sucesso');
            resolve(true);
          };
          script.onerror = (error) => {
            console.error('GoogleMapSelector: Erro ao carregar script:', error);
            reject(error);
          };
        });

        // Aguardar os custom elements serem definidos
        console.log('GoogleMapSelector: Aguardando definição dos custom elements...');
        await customElements.whenDefined('gmp-map');
        await customElements.whenDefined('gmpx-place-picker');
        console.log('GoogleMapSelector: Custom elements definidos');

        if (mapContainerRef.current) {
          console.log('GoogleMapSelector: Container encontrado, inicializando mapa...');
          initializeMap();
        } else {
          console.error('GoogleMapSelector: Container não encontrado');
        }
      } catch (error) {
        console.error('GoogleMapSelector: Erro ao carregar Google Maps:', error);
      }
    };

    const initializeMap = () => {
      if (!mapContainerRef.current) {
        console.error('GoogleMapSelector: Container não disponível para inicialização');
        return;
      }

      console.log('GoogleMapSelector: Criando HTML do mapa...');
      
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
      console.log('GoogleMapSelector: HTML do mapa inserido');

      // Configurar event listeners após um delay maior
      setTimeout(() => {
        console.log('GoogleMapSelector: Configurando event listeners...');
        setupEventListeners();
      }, 2000);
    };

    const setupEventListeners = () => {
      console.log('GoogleMapSelector: Buscando elementos do DOM...');
      
      const map = document.querySelector('gmp-map') as any;
      const originMarker = document.querySelector('#origin-marker') as any;
      const destinationMarker = document.querySelector('#destination-marker') as any;
      const originPicker = document.querySelector('#origin-picker') as any;
      const destinationPicker = document.querySelector('#destination-picker') as any;

      console.log('GoogleMapSelector: Elementos encontrados:', {
        map: !!map,
        originMarker: !!originMarker,
        destinationMarker: !!destinationMarker,
        originPicker: !!originPicker,
        destinationPicker: !!destinationPicker
      });

      if (!map || !originMarker || !destinationMarker || !originPicker || !destinationPicker) {
        console.log('GoogleMapSelector: Alguns elementos não encontrados, tentando novamente em 1s...');
        setTimeout(setupEventListeners, 1000);
        return;
      }

      originPickerRef.current = originPicker;
      destinationPickerRef.current = destinationPicker;

      // Configurar o mapa
      if (map.innerMap) {
        console.log('GoogleMapSelector: Configurando opções do mapa...');
        map.innerMap.setOptions({
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });
      } else {
        console.log('GoogleMapSelector: innerMap não disponível ainda');
      }

      // Event listener para origem
      originPicker.addEventListener('gmpx-placechange', () => {
        console.log('GoogleMapSelector: Origem selecionada');
        const place = originPicker.value;
        
        if (!place.location) {
          console.log('GoogleMapSelector: Nenhum local encontrado para origem');
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

        console.log('GoogleMapSelector: Origem configurada:', originRef.current);
      });

      // Event listener para destino
      destinationPicker.addEventListener('gmpx-placechange', () => {
        console.log('GoogleMapSelector: Destino selecionado');
        const place = destinationPicker.value;
        
        if (!place.location) {
          console.log('GoogleMapSelector: Nenhum local encontrado para destino');
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

        console.log('GoogleMapSelector: Destino configurado:', destinationRef.current);
      });

      console.log('GoogleMapSelector: Event listeners configurados com sucesso');
    };

    loadGoogleMaps();

    // Cleanup function
    return () => {
      console.log('GoogleMapSelector: Limpando componente...');
    };
  }, []);

  const handleConfirmRoute = () => {
    console.log('GoogleMapSelector: Confirmando rota:', { origin: originRef.current, destination: destinationRef.current });
    if (originRef.current && destinationRef.current) {
      onRouteSelect(originRef.current, destinationRef.current);
    }
  };

  const handleClearRoute = () => {
    console.log('GoogleMapSelector: Limpando rota...');
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
        <div 
          ref={mapContainerRef} 
          className="w-full min-h-[400px] border border-gray-200 rounded-lg"
          style={{ minHeight: '400px' }}
        >
          <div className="flex items-center justify-center h-full text-gray-500">
            Carregando mapa...
          </div>
        </div>

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
