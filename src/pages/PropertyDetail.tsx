
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Square, Calendar, Home, MapPin, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { properties } from '@/data/properties';
import { Property } from '@/types';
import { cn } from '@/lib/utils';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const foundProperty = properties.find(p => p.id === id) || null;
      setProperty(foundProperty);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handlePrevImage = () => {
    if (!property) return;
    setCurrentImageIndex(prev => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!property) return;
    setCurrentImageIndex(prev => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const toggleFavorite = () => {
    setFavorited(prev => !prev);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
          <div className="animate-pulse">
            <div className="h-8 w-1/3 bg-muted rounded-md mb-6"></div>
            <div className="aspect-video w-full bg-muted rounded-xl mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="h-10 w-2/3 bg-muted rounded-md mb-4"></div>
                <div className="h-6 w-1/4 bg-muted rounded-md mb-8"></div>
                <div className="space-y-4 mb-8">
                  <div className="h-4 w-full bg-muted rounded-md"></div>
                  <div className="h-4 w-full bg-muted rounded-md"></div>
                  <div className="h-4 w-3/4 bg-muted rounded-md"></div>
                </div>
              </div>
              <div>
                <div className="p-6 bg-muted rounded-xl h-64"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 text-center">
          <h1 className="text-2xl font-medium mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-8">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/properties">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const statusColors = {
    'for-sale': 'bg-primary',
    'for-rent': 'bg-green-500',
    'sold': 'bg-red-500',
    'pending': 'bg-amber-500',
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/properties" className="hover:text-foreground transition-colors">Properties</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{property.title}</span>
        </div>

        {/* Image Gallery */}
        <div className="relative mb-8">
          <div className="aspect-video w-full rounded-xl overflow-hidden">
            <img 
              src={property.images[currentImageIndex]} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Image Navigation */}
          <button 
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center shadow-sm text-gray-700 dark:text-white transition-all hover:bg-white dark:hover:bg-black/70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center shadow-sm text-gray-700 dark:text-white transition-all hover:bg-white dark:hover:bg-black/70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              className={cn(
                'px-3 py-1 text-sm font-medium text-white capitalize',
                statusColors[property.status] || 'bg-primary'
              )}
            >
              {property.status.replace('-', ' ')}
            </Badge>
          </div>
          
          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-xs font-medium">
            {currentImageIndex + 1}/{property.images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {property.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2",
                currentImageIndex === index 
                  ? "border-primary" 
                  : "border-transparent hover:border-muted-foreground/30"
              )}
            >
              <img
                src={image}
                alt={`${property.title} - image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-medium">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                </div>
              </div>
              <p className="text-2xl font-medium">{formatPrice(property.price)}</p>
            </div>
            
            {/* Property Features */}
            <div className="flex flex-wrap gap-6 mt-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Bed className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Bedrooms</span>
                <span className="font-medium">{property.bedrooms}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Bath className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Bathrooms</span>
                <span className="font-medium">{property.bathrooms}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Square className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Area</span>
                <span className="font-medium">{property.squareFeet.toLocaleString()} ft²</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Type</span>
                <span className="font-medium capitalize">{property.propertyType}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Year Built</span>
                <span className="font-medium">{property.yearBuilt}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-medium mb-4">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <h2 className="text-xl font-medium mb-4">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div 
                    key={index}
                    className="flex items-center text-sm"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Location */}
            <div className="mt-8">
              <h2 className="text-xl font-medium mb-4">Location</h2>
              <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                <MapPin className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Map View Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="sticky top-24 p-6 bg-card dark:bg-card/30 backdrop-blur-md rounded-xl border border-border">
              <h2 className="text-lg font-medium mb-4">Interested in this property?</h2>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={toggleFavorite}
                  >
                    <Heart className={cn("h-4 w-4 mr-2", favorited ? "fill-red-500 text-red-500" : "")} />
                    {favorited ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                <Button className="w-full">Schedule a Tour</Button>
                <Button variant="outline" className="w-full">Contact Agent</Button>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                <p>Listed by Estate Agency</p>
                <p>License #123456789</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-16">
          <h2 className="text-2xl font-medium mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties
              .filter(p => p.id !== property.id && p.propertyType === property.propertyType)
              .slice(0, 3)
              .map(similarProperty => (
                <Link 
                  key={similarProperty.id} 
                  to={`/property/${similarProperty.id}`}
                  className="group block rounded-xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out dark-transition"
                >
                  <div className="relative overflow-hidden">
                    <div 
                      className="aspect-video w-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                      style={{ backgroundImage: `url(${similarProperty.images[0]})` }}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge 
                        className={cn(
                          'px-2 py-1 text-xs font-medium text-white capitalize',
                          statusColors[similarProperty.status] || 'bg-primary'
                        )}
                      >
                        {similarProperty.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                      {similarProperty.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="line-clamp-1">{similarProperty.city}, {similarProperty.state}</span>
                    </div>
                    <p className="mt-2 font-medium">{formatPrice(similarProperty.price)}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                      <span className="text-sm">{similarProperty.bedrooms} bd</span>
                      <span className="text-sm">{similarProperty.bathrooms} ba</span>
                      <span className="text-sm">{similarProperty.squareFeet.toLocaleString()} ft²</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;
