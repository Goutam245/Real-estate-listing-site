
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  location: {
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  propertyType: 'house' | 'apartment' | 'condo' | 'townhouse';
  images: string[];
  featured?: boolean;
  amenities: string[];
  status: 'for-sale' | 'for-rent' | 'sold' | 'pending';
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  propertyType?: string[];
  amenities?: string[];
  status?: string[];
  query?: string;
}
