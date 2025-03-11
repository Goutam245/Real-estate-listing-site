
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {children || <Outlet />}
      </main>
      <footer className="py-8 px-6 bg-muted/50 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Estate</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Discover your perfect property with our intuitive real estate platform.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">Properties</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Houses</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Apartments</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Condos</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Townhouses</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Estate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
