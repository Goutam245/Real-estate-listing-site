
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { properties } from '@/data/properties';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredProperties = properties.filter(property => property.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 lg:px-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent -z-10" />
        <div 
          className="absolute inset-0 -z-20 opacity-20" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight animate-fade-in">
              Find Your Perfect Place
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-lg animate-fade-in animation-delay-100">
              Discover exceptional properties in the most desirable locations. Your dream home is just a click away.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-200">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by location, postal code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-full text-base"
                />
              </div>
              <Link to={`/properties${searchQuery ? `?query=${encodeURIComponent(searchQuery)}` : ''}`}>
                <Button className="w-full sm:w-auto h-12 rounded-full px-6">
                  <Search className="h-4 w-4 mr-2" />
                  Search Properties
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-in animation-delay-300">
              <span className="text-sm font-medium mr-2">Popular:</span>
              {['San Francisco', 'New York', 'Los Angeles', 'Miami', 'Chicago'].map((city) => (
                <Link 
                  key={city} 
                  to={`/properties?query=${encodeURIComponent(city)}`}
                  className="text-sm px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-border hover:bg-primary hover:text-white transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium">Featured Properties</h2>
              <p className="text-muted-foreground mt-1">Discover our handpicked selection of exceptional properties</p>
            </div>
            <Link to="/properties">
              <Button variant="outline" className="hidden md:flex items-center gap-1 rounded-full">
                View All 
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                featured={property.featured}
                className="animate-fade-in"
              />
            ))}
          </div>
          
          <div className="mt-8 flex justify-center md:hidden">
            <Link to="/properties">
              <Button className="rounded-full">
                View All Properties
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 lg:px-10 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-medium">Why Choose Us</h2>
            <p className="text-muted-foreground mt-2">
              Committed to exceptional service and client satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Listings',
                description: 'Access exclusive properties not available on other platforms, vetted for quality and value.',
                icon: '🏠'
              },
              {
                title: 'Expert Guidance',
                description: 'Our team of experienced agents provides personalized support throughout your real estate journey.',
                icon: '👥'
              },
              {
                title: 'Simplified Process',
                description: 'From search to closing, we make every step of buying or selling a property smooth and transparent.',
                icon: '✓'
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center -z-10"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
              }}
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10" />
            
            <div className="px-6 py-12 md:py-16 lg:p-20 text-white">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium max-w-xl">
                Ready to Find Your Perfect Property?
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                Whether you're looking to buy, sell, or rent, our team is here to help you navigate the real estate market with ease and confidence.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-primary hover:bg-white/90 rounded-full">
                  Browse Properties
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/20 rounded-full">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
