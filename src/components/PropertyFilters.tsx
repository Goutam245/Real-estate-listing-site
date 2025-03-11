
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { PropertyFilters } from '@/types';
import { Check, ChevronDown, ChevronUp, Search, Filter, X } from 'lucide-react';
import { propertyTypes, amenities, statuses } from '../data/properties';
import { cn } from '@/lib/utils';

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
  initialFilters?: PropertyFilters;
}

const PropertyFiltersComponent: React.FC<PropertyFiltersProps> = ({
  onFilterChange,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (newFilters: Partial<PropertyFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handlePriceChange = (value: number[]) => {
    const [min, max] = value;
    setPriceRange([min, max]);
    handleFilterChange({ minPrice: min, maxPrice: max });
  };

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    const currentTypes = filters.propertyType || [];
    const updatedTypes = checked
      ? [...currentTypes, type]
      : currentTypes.filter(t => t !== type);
    
    handleFilterChange({ propertyType: updatedTypes });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const currentAmenities = filters.amenities || [];
    const updatedAmenities = checked
      ? [...currentAmenities, amenity]
      : currentAmenities.filter(a => a !== amenity);
    
    handleFilterChange({ amenities: updatedAmenities });
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const currentStatuses = filters.status || [];
    const updatedStatuses = checked
      ? [...currentStatuses, status]
      : currentStatuses.filter(s => s !== status);
    
    handleFilterChange({ status: updatedStatuses });
  };

  const handleClearFilters = () => {
    setFilters({});
    setPriceRange([0, 5000000]);
    onFilterChange({});
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isFiltersApplied = () => {
    return (
      (filters.minPrice && filters.minPrice > 0) ||
      (filters.maxPrice && filters.maxPrice < 5000000) ||
      (filters.minBedrooms && filters.minBedrooms > 0) ||
      (filters.minBathrooms && filters.minBathrooms > 0) ||
      (filters.propertyType && filters.propertyType.length > 0) ||
      (filters.amenities && filters.amenities.length > 0) ||
      (filters.status && filters.status.length > 0) ||
      (filters.query && filters.query.trim() !== '')
    );
  };

  const filtersApplied = isFiltersApplied();

  return (
    <div className="w-full">
      {/* Search and Filter Bar - Always visible */}
      <div className="flex flex-col md:flex-row gap-3 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for location, property name..."
            className="pl-9 h-11 rounded-full"
            value={filters.query || ''}
            onChange={(e) => handleFilterChange({ query: e.target.value })}
          />
        </div>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-11 rounded-full gap-2",
            isOpen ? "bg-primary/10 text-primary hover:bg-primary/20" : "",
            !isOpen && filtersApplied ? "bg-primary text-white hover:bg-primary/90" : ""
          )}
          variant={isOpen ? "outline" : filtersApplied ? "default" : "outline"}
        >
          <Filter className="h-4 w-4" />
          Filters
          {filtersApplied && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs font-medium">
              {Object.keys(filters).filter(k => 
                filters[k as keyof PropertyFilters] !== undefined && 
                filters[k as keyof PropertyFilters] !== '' && 
                (Array.isArray(filters[k as keyof PropertyFilters]) 
                  ? (filters[k as keyof PropertyFilters] as any[]).length > 0 
                  : true)
              ).length}
            </span>
          )}
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Expanded Filters */}
      {isOpen && (
        <div className="mt-4 bg-white rounded-xl border border-border p-4 shadow-sm animate-scale-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filters</h3>
            {filtersApplied && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-sm"
                onClick={handleClearFilters}
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {/* Price Range */}
            <div className="space-y-2">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('price')}
              >
                <h4 className="text-sm font-medium">Price Range</h4>
                {expandedSection === 'price' ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              
              {(expandedSection === 'price' || !expandedSection) && (
                <div className="pt-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {formatPrice(priceRange[0])}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatPrice(priceRange[1])}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 5000000]}
                    value={priceRange}
                    min={0}
                    max={5000000}
                    step={50000}
                    onValueChange={handlePriceChange}
                    className="my-6"
                  />
                </div>
              )}
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="space-y-2">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('rooms')}
              >
                <h4 className="text-sm font-medium">Bedrooms & Bathrooms</h4>
                {expandedSection === 'rooms' ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              
              {expandedSection === 'rooms' && (
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Min Bedrooms</span>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((num) => (
                        <Button
                          key={`bed-${num}`}
                          type="button"
                          variant={filters.minBedrooms === num ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "flex-1 h-9",
                            filters.minBedrooms === num ? "bg-primary text-white" : "text-foreground"
                          )}
                          onClick={() => handleFilterChange({ minBedrooms: num })}
                        >
                          {num === 0 ? 'Any' : num === 5 ? '5+' : num}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Min Bathrooms</span>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((num) => (
                        <Button
                          key={`bath-${num}`}
                          type="button"
                          variant={filters.minBathrooms === num ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "flex-1 h-9",
                            filters.minBathrooms === num ? "bg-primary text-white" : "text-foreground"
                          )}
                          onClick={() => handleFilterChange({ minBathrooms: num })}
                        >
                          {num === 0 ? 'Any' : num === 5 ? '5+' : num}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('propertyType')}
              >
                <h4 className="text-sm font-medium">Property Type</h4>
                {expandedSection === 'propertyType' ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              
              {expandedSection === 'propertyType' && (
                <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {propertyTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`type-${type}`} 
                        checked={(filters.propertyType || []).includes(type)}
                        onCheckedChange={(checked) => 
                          handlePropertyTypeChange(type, checked as boolean)
                        }
                      />
                      <label 
                        htmlFor={`type-${type}`}
                        className="text-sm font-medium capitalize cursor-pointer"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('status')}
              >
                <h4 className="text-sm font-medium">Status</h4>
                {expandedSection === 'status' ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              
              {expandedSection === 'status' && (
                <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {statuses.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-${status}`} 
                        checked={(filters.status || []).includes(status)}
                        onCheckedChange={(checked) => 
                          handleStatusChange(status, checked as boolean)
                        }
                      />
                      <label 
                        htmlFor={`status-${status}`}
                        className="text-sm font-medium capitalize cursor-pointer"
                      >
                        {status.replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Amenities */}
            <div className="space-y-2">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('amenities')}
              >
                <h4 className="text-sm font-medium">Amenities</h4>
                {expandedSection === 'amenities' ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              
              {expandedSection === 'amenities' && (
                <div className="pt-2 grid grid-cols-2 gap-2">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`amenity-${amenity}`} 
                        checked={(filters.amenities || []).includes(amenity)}
                        onCheckedChange={(checked) => 
                          handleAmenityChange(amenity, checked as boolean)
                        }
                      />
                      <label 
                        htmlFor={`amenity-${amenity}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFiltersComponent;
