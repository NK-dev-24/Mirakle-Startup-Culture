import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Handshake } from 'lucide-react';

const CTASection = () => {
  return (
    <div className="bg-gradient-to-br from-[#fef9f4] to-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 to-transparent rounded-3xl transform transition-transform duration-300 group-hover:scale-105"></div>
            <div className="relative p-8">
              <Handshake className="h-24 w-24 text-brand-yellow mb-8 transform transition-transform group-hover:scale-110 duration-300" />
              <h3 className="text-2xl font-semibold mb-4">Find Your Perfect Match</h3>
              <p className="text-gray-600">
                Connect with the right partners and accelerate your innovation journey together.
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Whether you have a solution or need one, our platform connects you to the right partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/programs">
                <Button className="bg-brand-yellow text-brand-black hover:bg-amber-500 h-12 px-8 w-full sm:w-auto hover:scale-105 transition-transform duration-300 group">
                  Browse Challenges <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Button>
              </Link>
              <Link to="/all-startups">
                <Button variant="outline" className="border-brand-black text-brand-black hover:bg-brand-yellow/10 h-12 px-8 w-full sm:w-auto hover:scale-105 transition-transform duration-300 group">
                  Explore Solutions <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
