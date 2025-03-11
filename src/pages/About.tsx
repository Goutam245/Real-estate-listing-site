
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Users, Building, Award, Clock } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in animation-delay-100">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6">
                We&apos;re Changing How People Find Their Perfect Home
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Estate is a premier real estate platform dedicated to connecting people with their dream properties through innovative technology and exceptional service.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/properties">
                  <Button size="lg" className="rounded-full">
                    Browse Properties
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="rounded-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden animate-fade-in animation-delay-200">
                <img 
                  src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=1200&q=80" 
                  alt="Estate Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-4 rounded-lg animate-fade-in animation-delay-300">
                <p className="text-3xl font-bold">10+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-10 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '500+', label: 'Properties', icon: <Building className="h-6 w-6 text-primary" /> },
              { number: '1200+', label: 'Happy Clients', icon: <Users className="h-6 w-6 text-primary" /> },
              { number: '15+', label: 'Awards', icon: <Award className="h-6 w-6 text-primary" /> },
              { number: '24/7', label: 'Support', icon: <Clock className="h-6 w-6 text-primary" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-xl border border-border/50 subtle-shadow">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <p className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-6">Our Story</h2>
          <p className="text-muted-foreground mb-6">
            Founded in 2013, Estate began with a simple mission: to simplify the process of buying, selling, and renting properties. What started as a small team of passionate real estate professionals has grown into a trusted platform serving thousands of clients nationwide.
          </p>
          <p className="text-muted-foreground mb-6">
            We believe that finding the perfect home shouldn&apos;t be stressful or complicated. That&apos;s why we&apos;ve built a platform that combines cutting-edge technology with personalized service to make your real estate journey as smooth as possible.
          </p>
          <p className="text-muted-foreground">
            Today, we&apos;re proud to be one of the fastest-growing real estate platforms, known for our commitment to transparency, innovation, and client satisfaction.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-10 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our dedicated team of real estate professionals is committed to providing exceptional service and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO & Founder',
                image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Chief Real Estate Officer',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80'
              },
              {
                name: 'Emily Chen',
                role: 'Head of Marketing',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80'
              },
              {
                name: 'David Wilson',
                role: 'Lead Property Consultant',
                image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80'
              }
            ].map((member, index) => (
              <div key={index} className="bg-card rounded-xl overflow-hidden border border-border/50 subtle-shadow group">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at Estate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Transparency',
                description: 'We believe in clear communication and being upfront about every aspect of the real estate process.'
              },
              {
                title: 'Innovation',
                description: 'We&apos;re constantly exploring new technologies and approaches to improve the real estate experience.'
              },
              {
                title: 'Client-First',
                description: 'Your needs and satisfaction are our top priority. We&apos;re committed to providing personalized service.'
              }
            ].map((value, index) => (
              <div key={index} className="p-6 bg-card rounded-xl border border-border/50 subtle-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center -z-10"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
              }}
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10" />
            
            <div className="px-6 py-12 md:py-16 lg:p-20 text-white">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium max-w-xl">
                Join Us in Redefining Real Estate
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                Whether you&apos;re looking to buy your dream home, sell your property, or just explore the market, we&apos;re here to help you every step of the way.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/properties">
                  <Button className="bg-white text-primary hover:bg-white/90 rounded-full">
                    Explore Properties
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="text-white border-white hover:bg-white/20 rounded-full">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
