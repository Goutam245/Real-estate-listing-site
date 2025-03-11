
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling would go here
    console.log('Form submitted');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6 animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in animation-delay-100">
            Have questions about a property or need assistance with your real estate journey? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-fade-in animation-delay-200">
              <h2 className="text-2xl font-medium mb-6">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-muted-foreground">(123) 456-7890</p>
                    <p className="text-muted-foreground">Monday - Friday, 9am - 6pm</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">info@estate.com</p>
                    <p className="text-muted-foreground">support@estate.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Office</h3>
                    <p className="text-muted-foreground">123 Property Lane</p>
                    <p className="text-muted-foreground">San Francisco, CA 94105</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9am - 6pm</p>
                    <p className="text-muted-foreground">Saturday: 10am - 4pm</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                <MapPin className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Map View Coming Soon</span>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="animate-fade-in animation-delay-300">
              <h2 className="text-2xl font-medium mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone (optional)
                  </label>
                  <Input id="phone" placeholder="Your phone number" />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What is this regarding?" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    className="min-h-32"
                    required 
                  />
                </div>
                
                <div>
                  <Button type="submit" className="w-full sm:w-auto rounded-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 md:px-10 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our services and processes.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: 'How do I schedule a property viewing?',
                answer: 'You can schedule a property viewing by clicking the "Schedule a Tour" button on any property page, or by contacting our team directly via phone or email. We offer both in-person and virtual tours to accommodate your preferences.'
              },
              {
                question: 'What documents do I need to prepare when buying a property?',
                answer: 'When buying a property, you should prepare identification documents, proof of income (pay stubs, tax returns), bank statements, proof of funds for the down payment, and pre-approval from a mortgage lender if applicable. Our agents can provide a detailed checklist based on your specific situation.'
              },
              {
                question: 'How long does the buying or selling process typically take?',
                answer: 'The timeline varies depending on market conditions, property type, and individual circumstances. On average, the buying process takes 30-60 days from offer acceptance to closing. Selling a property can take anywhere from a few weeks to several months, depending on pricing, location, and market demand.'
              },
              {
                question: 'What fees are involved in buying or selling a property?',
                answer: 'Buyers typically pay for inspections, appraisals, closing costs, and sometimes a buyer\'s agent commission (though often covered by the seller). Sellers usually pay real estate agent commissions (for both selling and buying agents), some closing costs, and potentially transfer taxes or fees. We provide transparent cost breakdowns for all our clients.'
              },
              {
                question: 'Do you offer property management services?',
                answer: 'Yes, we offer comprehensive property management services for investors and homeowners. Our services include tenant screening, rent collection, maintenance coordination, financial reporting, and more. Contact our property management team for details on pricing and service packages.'
              },
            ].map((faq, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border border-border/50 subtle-shadow">
                <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card dark:bg-card/30 rounded-2xl p-8 md:p-12 border border-border/50 text-center">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse our extensive collection of premium properties or let us know your requirements, and we'll help you find the perfect match.
            </p>
            <Button size="lg" className="rounded-full">Start Your Search</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
