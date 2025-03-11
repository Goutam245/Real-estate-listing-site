
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PropertyList from '@/components/PropertyList';
import PropertyFilters from '@/components/PropertyFilters';
import PropertyMap from '@/components/PropertyMap';
import { Button } from '@/components/ui/button';
import { properties } from '@/data/properties';
import { Property, PropertyFilters as Filters } from '@/types';
import { Grid, Map as MapIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Properties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const viewMode = queryParams.get('view') || 'grid';
  
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<Filters>({});

  // Parse query params for initial filters
  useEffect(() => {
    const initialFilters: Filters = {};
    
    // Search query
    const query = queryParams.get('query');
    if (query) initialFilters.query = query;
    
    // Price range
    const minPrice = queryParams.get('minPrice');
    if (minPrice) initialFilters.minPrice = parseInt(minPrice);
    
    const maxPrice = queryParams.get('maxPrice');
    if (maxPrice) initialFilters.maxPrice = parseInt(maxPrice);
    
    // Bedrooms
    const minBedrooms = queryParams.get('minBedrooms');
    if (minBedrooms) initialFilters.minBedrooms = parseInt(minBedrooms);
    
    // Bathrooms
    const minBathrooms = queryParams.get('minBathrooms');
    if (minBathrooms) initialFilters.minBathrooms = parseInt(minBathrooms);
    
    // Property types
    const propertyTypes = queryParams.getAll('propertyType');
    if (propertyTypes.length > 0) initialFilters.propertyType = propertyTypes;
    
    // Amenities
    const amenities = queryParams.getAll('amenity');
    if (amenities.length > 0) initialFilters.amenities = amenities;
    
    // Status
    const statuses = queryParams.getAll('status');
    if (statuses.length > 0) initialFilters.status = statuses;
    
    setCurrentFilters(initialFilters);
    applyFilters(initialFilters);
  }, [location.search]);

  const applyFilters = (filters: Filters) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let filtered = [...properties];
      
      // Filter by query
      if (filters.query) {
        const query = filters.query.toLowerCase();
        filtered = filtered.filter(property => 
          property.title.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query) ||
          property.address.toLowerCase().includes(query) ||
          property.city.toLowerCase().includes(query) ||
          property.state.toLowerCase().includes(query) ||
          property.zipCode.toLowerCase().includes(query)
        );
      }
      
      // Filter by price
      if (filters.minPrice) {
        filtered = filtered.filter(property => property.price >= (filters.minPrice || 0));
      }
      
      if (filters.maxPrice) {
        filtered = filtered.filter(property => property.price <= (filters.maxPrice || Infinity));
      }
      
      // Filter by bedrooms
      if (filters.minBedrooms && filters.minBedrooms > 0) {
        filtered = filtered.filter(property => property.bedrooms >= filters.minBedrooms!);
      }
      
      // Filter by bathrooms
      if (filters.minBathrooms && filters.minBathrooms > 0) {
        filtered = filtered.filter(property => property.bathrooms >= filters.minBathrooms!);
      }
      
      // Filter by property type
      if (filters.propertyType && filters.propertyType.length > 0) {
        filtered = filtered.filter(property => 
          filters.propertyType!.includes(property.propertyType)
        );
      }
      
      // Filter by amenities
      if (filters.amenities && filters.amenities.length > 0) {
        filtered = filtered.filter(property => 
          filters.amenities!.some(amenity => property.amenities.includes(amenity))
        );
      }
      
      // Filter by status
      if (filters.status && filters.status.length > 0) {
        filtered = filtered.filter(property => 
          filters.status!.includes(property.status)
        );
      }
      
      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 300);
  };

  const handleFilterChange = (filters: Filters) => {
    setCurrentFilters(filters);
    applyFilters(filters);
    
    // Update URL with filters
    const params = new URLSearchParams();
    if (viewMode !== 'grid') params.set('view', viewMode);
    
    if (filters.query) params.set('query', filters.query);
    if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.minBedrooms) params.set('minBedrooms', filters.minBedrooms.toString());
    if (filters.minBathrooms) params.set('minBathrooms', filters.minBathrooms.toString());
    
    if (filters.propertyType && filters.propertyType.length > 0) {
      filters.propertyType.forEach(type => params.append('propertyType', type));
    }
    
    if (filters.amenities && filters.amenities.length > 0) {
      filters.amenities.forEach(amenity => params.append('amenity', amenity));
    }
    
    if (filters.status && filters.status.length > 0) {
      filters.status.forEach(status => params.append('status', status));
    }
    
    navigate({ search: params.toString() });
  };

  const toggleViewMode = (mode: string) => {
    const params = new URLSearchParams(location.search);
    if (mode === 'grid') {
      params.delete('view');
    } else {
      params.set('view', mode);
    }
    navigate({ search: params.toString() });
  };

  return (
    <Layout>
      <div className="py-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-medium mb-1">Properties</h1>
        <p className="text-muted-foreground mb-6">
          {filteredProperties.length} properties available
        </p>
        
        <div className="flex flex-col gap-6">
          {/* Filters Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <PropertyFilters 
                onFilterChange={handleFilterChange}
                initialFilters={currentFilters}
              />
            </div>
            
            <div className="flex items-center justify-end gap-2">
              <div className="text-sm text-muted-foreground mr-2">View:</div>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                className="h-9 w-9 rounded-md"
                onClick={() => toggleViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="icon"
                className="h-9 w-9 rounded-md"
                onClick={() => toggleViewMode('map')}
              >
                <MapIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Results */}
          <div className={cn("transition-opacity duration-300", isLoading ? "opacity-50" : "opacity-100")}>
            {viewMode === 'map' ? (
              <PropertyMap 
                properties={filteredProperties} 
              />
            ) : (
              <PropertyList 
                properties={filteredProperties}
                loading={isLoading}
              />
            )}
          </div>
          
          {/* Empty State */}
          {filteredProperties.length === 0 && !isLoading && (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
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
              <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                We couldn't find any properties matching your search criteria. Try adjusting your filters.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => handleFilterChange({})}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Properties;
