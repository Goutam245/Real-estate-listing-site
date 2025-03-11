
import React, { useEffect, useRef } from 'react';
import { Property, PropertyFilters } from '@/types';
import PropertyCard from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  filters?: PropertyFilters;
  loading?: boolean;
}

const PropertyList: React.FC<PropertyListProps> = ({ 
  properties, 
  filters, 
  loading = false 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.property-card');
      cards.forEach((card, index) => {
        card.classList.add('animate-scale-in');
        (card as HTMLElement).style.animationDelay = `${index * 0.05}s`;
      });
    }
  }, [properties]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={index} 
            className="rounded-xl bg-muted animate-pulse h-[350px]"
          />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-muted-foreground" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium">No properties found</h3>
        <p className="text-muted-foreground mt-1 max-w-md">
          We couldn't find any properties matching your search criteria. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          className="property-card"
          featured={property.featured}
        />
      ))}
    </div>
  );
};

export default PropertyList;
