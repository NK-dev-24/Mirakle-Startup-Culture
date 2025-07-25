import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-brand-black font-bold text-2xl flex items-center">
            <div className="bg-brand-yellow rounded-md w-8 h-8 flex items-center justify-center mr-2">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="font-bold">Mirakle</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button className="text-white bg-brand-yellow hover:bg-amber-500">
                I'm a Startup
              </Button>
            </Link>
            <Link to="/corporate-onboarding">
              <Button variant="ghost" className="text-brand-black hover:bg-brand-lightYellow">
                For Corporates
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="w-full bg-brand-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <Link to="/" className="text-white font-bold text-xl flex items-center">
              <div className="bg-brand-yellow rounded-md w-6 h-6 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              <span className="font-bold">Mirakle</span>
            </Link>
          </div>
          <div className="text-sm text-gray-300">
            © {new Date().getFullYear()} Mirakle. Built with purpose.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
