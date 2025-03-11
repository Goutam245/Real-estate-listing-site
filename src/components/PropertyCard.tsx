
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  className?: string;
  featured?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  className,
  featured = false 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const statusColors = {
    'for-sale': 'bg-primary',
    'for-rent': 'bg-green-500',
    'sold': 'bg-red-500',
    'pending': 'bg-amber-500',
  };

  return (
    <Link 
      to={`/property/${property.id}`}
      className={cn(
        'group block rounded-xl overflow-hidden bg-white border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out',
        featured ? 'md:col-span-2' : '',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <div 
          className="aspect-video w-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
          style={{ backgroundImage: `url(${property.images[currentImageIndex]})` }}
        />
        
        {/* Image Navigation */}
        {property.images.length > 1 && isHovered && (
          <>
            <button 
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            className={cn(
              'px-2 py-1 text-xs font-medium text-white capitalize',
              statusColors[property.status] || 'bg-primary'
            )}
          >
            {property.status.replace('-', ' ')}
          </Badge>
        </div>

        {/* Favorite Button */}
        <button
          className={cn(
            'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all',
            isFavorite 
              ? 'bg-white text-red-500' 
              : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500'
          )}
          onClick={toggleFavorite}
        >
          <Heart className={cn("h-4 w-4", isFavorite ? "fill-current" : "")} />
        </button>

        {/* Image Counter */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-black/50 text-white text-xs font-medium">
            {currentImageIndex + 1}/{property.images.length}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-1">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{property.city}, {property.state}</span>
            </div>
          </div>
          <p className="text-lg font-medium">{formatPrice(property.price)}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.squareFeet.toLocaleString()} ft²</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
