
import React, { useState, useEffect, useRef } from 'react';
import { Property } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, X, Maximize, Minimize, Home, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PropertyMapProps {
  properties: Property[];
  onPropertySelect?: (property: Property) => void;
  className?: string;
}

interface MapMarker {
  property: Property;
  element: HTMLDivElement;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  properties, 
  onPropertySelect,
  className 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showList, setShowList] = useState(true);
  const markersRef = useRef<MapMarker[]>([]);

  // This would normally be replaced with a proper map library like Mapbox or Google Maps
  // For now, we'll create a mock map UI that shows the concept
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => {
      if (marker.element.parentNode) {
        marker.element.parentNode.removeChild(marker.element);
      }
    });
    markersRef.current = [];

    // Create new markers
    properties.forEach(property => {
      const marker = document.createElement('div');
      marker.className = cn(
        'absolute w-6 h-6 rounded-full bg-primary flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110',
        property.id === selectedProperty?.id ? 'ring-2 ring-primary ring-offset-2 z-10 scale-125' : ''
      );
      
      // Position marker based on property location
      // Note: In a real implementation, these would be actual geo coordinates 
      // that are converted to pixel positions on the map
      const mapWidth = mapRef.current!.clientWidth;
      const mapHeight = mapRef.current!.clientHeight;
      
      const normalizedLat = (property.location.lat - 32) / (43 - 32); // Normalize to 0-1 range
      const normalizedLng = (property.location.lng - (-123)) / (-71 - (-123)); // Normalize to 0-1 range
      
      marker.style.left = `${normalizedLng * mapWidth}px`;
      marker.style.top = `${(1 - normalizedLat) * mapHeight}px`;
      
      // Add icon
      marker.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="14" height="14"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
      
      // Add click handler
      marker.addEventListener('click', () => {
        setSelectedProperty(property);
        if (onPropertySelect) {
          onPropertySelect(property);
        }
      });
      
      mapRef.current!.appendChild(marker);
      markersRef.current.push({ property, element: marker });
    });
    
    // Clean up
    return () => {
      markersRef.current.forEach(marker => {
        if (marker.element.parentNode) {
          marker.element.parentNode.removeChild(marker.element);
        }
      });
    };
  }, [properties, selectedProperty, onPropertySelect]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    
    // Find and scroll marker into view
    const marker = markersRef.current.find(m => m.property.id === property.id);
    if (marker && mapRef.current) {
      // Add highlight to marker
      markersRef.current.forEach(m => {
        m.element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'z-10', 'scale-125');
      });
      marker.element.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'z-10', 'scale-125');
      
      // Center map on marker (in a real implementation this would pan the map)
      const rect = mapRef.current.getBoundingClientRect();
      const markerLeft = parseFloat(marker.element.style.left);
      const markerTop = parseFloat(marker.element.style.top);
      
      // This would normally be a map.panTo() call
      console.log(`Would pan map to ${property.location.lat}, ${property.location.lng}`);
    }
    
    if (onPropertySelect) {
      onPropertySelect(property);
    }
  };

  return (
    <div 
      className={cn(
        'flex h-[600px] bg-white rounded-xl overflow-hidden transition-all duration-300 border border-border',
        isFullscreen && 'fixed inset-0 z-50 h-screen rounded-none',
        className
      )}
    >
      {/* Property list panel */}
      {showList && (
        <div className="w-80 border-r border-border flex flex-col h-full">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h3 className="font-medium text-sm">Properties ({properties.length})</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setShowList(false)}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {properties.map((property) => (
              <div 
                key={property.id}
                className={cn(
                  'p-3 border-b border-border flex cursor-pointer transition-colors',
                  selectedProperty?.id === property.id 
                    ? 'bg-primary/5' 
                    : 'hover:bg-muted/50'
                )}
                onClick={() => handlePropertyClick(property)}
              >
                <div 
                  className="w-20 h-20 rounded-md bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${property.images[0]})` }}
                />
                <div className="ml-3 flex-1">
                  <h4 className="font-medium text-sm line-clamp-1">{property.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="line-clamp-1">{property.city}, {property.state}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Badge className="text-xs px-1.5 py-0">{property.bedrooms} bd</Badge>
                    <Badge className="text-xs px-1.5 py-0 ml-1">{property.bathrooms} ba</Badge>
                    <Badge className="text-xs px-1.5 py-0 ml-1">{property.squareFeet.toLocaleString()} ft²</Badge>
                  </div>
                  <p className="text-sm font-medium mt-1">{formatPrice(property.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Map area */}
      <div className="relative flex-1 bg-muted/30">
        {!showList && (
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-3 left-3 z-10 bg-white"
            onClick={() => setShowList(true)}
          >
            <ChevronsRight className="h-4 w-4 mr-1" />
            Show List
          </Button>
        )}

        <div 
          ref={mapRef} 
          className="w-full h-full relative"
          style={{
            backgroundImage: 'url(https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-95,40,3,0/1200x800?access_token=pk.placeholder)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Map markers are added dynamically via useEffect */}
          
          {/* Selected property popup */}
          {selectedProperty && (
            <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 p-3 shadow-lg animate-fade-in bg-white/95 backdrop-blur-sm">
              <div className="flex">
                <div 
                  className="w-20 h-20 rounded-md bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${selectedProperty.images[0]})` }}
                />
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm line-clamp-1">{selectedProperty.title}</h4>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 -mr-1 -mt-1"
                      onClick={() => setSelectedProperty(null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="line-clamp-1">{selectedProperty.address}</span>
                  </div>
                  <div className="flex items-center mt-1.5">
                    <Badge className="text-xs px-1.5 py-0">{selectedProperty.bedrooms} bd</Badge>
                    <Badge className="text-xs px-1.5 py-0 ml-1">{selectedProperty.bathrooms} ba</Badge>
                    <Badge className="text-xs px-1.5 py-0 ml-1">{selectedProperty.squareFeet.toLocaleString()} ft²</Badge>
                  </div>
                  <p className="text-sm font-medium mt-1">{formatPrice(selectedProperty.price)}</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-border flex justify-between">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 text-xs px-2.5"
                  onClick={() => window.location.href = `/property/${selectedProperty.id}`}
                >
                  <Home className="h-3 w-3 mr-1" />
                  View Details
                </Button>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-8 text-xs">Get Directions</Button>
                  <Button size="sm" className="h-8 text-xs">Contact</Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Map controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white shadow-sm"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
