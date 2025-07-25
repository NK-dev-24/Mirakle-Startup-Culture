
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Handshake } from 'lucide-react';

const TrustSection = () => {
  const startupBenefits = [
    "Direct access to corporate innovation needs", 
    "Find paid pilot opportunities", 
    "Showcase your solutions"
  ];
  
  const corporateBenefits = [
    "Access vetted, ready-to-deploy solutions", 
    "Accelerate your innovation timeline", 
    "Get multiple solutions"
  ];

  return (
    <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Businesses Trust Mirakle</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Join the growing community of innovators creating value together</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -left-4 top-0 w-px h-full bg-gray-800 md:hidden"></div>
            <div className="space-y-6 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="p-3 bg-brand-yellow/10 rounded-full">
                  <Rocket className="h-6 w-6 text-brand-yellow" />
                </div>
                For Startups
              </h3>
              <ul className="space-y-4">
                {startupBenefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 group/item">
                    <ArrowRight className="h-5 w-5 text-brand-yellow mt-1 group-hover/item:translate-x-1 transition-transform" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -left-4 top-0 w-px h-full bg-gray-800 md:hidden"></div>
            <div className="space-y-6 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="p-3 bg-brand-yellow/10 rounded-full">
                  <Handshake className="h-6 w-6 text-brand-yellow" />
                </div>
                For Corporates
              </h3>
              <ul className="space-y-4">
                {corporateBenefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 group/item">
                    <ArrowRight className="h-5 w-5 text-brand-yellow mt-1 group-hover/item:translate-x-1 transition-transform" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-16 flex-col sm:flex-row gap-4">
          <Link to="/startup-onboarding">
            <Button className="bg-brand-yellow text-brand-black hover:bg-amber-500 h-12 px-8 w-full sm:w-auto hover:scale-105 transition-transform duration-300">
              Join as Startup
            </Button>
          </Link>
          <Link to="/corporate-onboarding">
            <Button variant="outline" className="border-white text-white hover:bg-white/10 h-12 px-8 w-full sm:w-auto hover:scale-105 transition-transform duration-300">
              Post a Challenge
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
