
import React from 'react';
import { Search, Filter, ChevronDown, ArrowRight, Sparkles, TrendingUp, Tag, Clock, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInView } from 'react-intersection-observer';
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";

const popularTags = [
  { name: "Startup Competition", icon: <Sparkles className="h-3 w-3" /> }, 
  { name: "AgriTech", icon: <Tag className="h-3 w-3" /> }, 
  { name: "Fintech", icon: <TrendingUp className="h-3 w-3" /> }, 
  { name: "Healthcare", icon: <Clock className="h-3 w-3" /> }, 
  { name: "Sustainability", icon: <Tag className="h-3 w-3" /> }
];

const trendingSearches = [
  "AI for Customer Support",
  "Sustainable Supply Chain",
  "Climate Tech Solutions",
  "Healthcare Innovation",
];

const HeroSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="relative bg-gradient-to-b from-[#fef9f4] to-white overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-brand-yellow opacity-10 blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-amber-100 opacity-20 blur-3xl animate-pulse" style={{animationDuration: '12s', animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/5 w-32 h-32 rounded-full bg-orange-100 opacity-15 blur-3xl animate-pulse" style={{animationDuration: '15s', animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 py-10 lg:py-16 relative">
        <div ref={ref} className="max-w-3xl mx-auto">
          <h1 className={`text-4xl md:text-5xl font-bold text-brand-black tracking-tight leading-tight mb-2 transition-all duration-700 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Find the perfect match <br />
            <span className="bg-gradient-to-r from-brand-yellow to-amber-500 bg-clip-text text-transparent">for innovation</span>
          </h1>
          <p className={`text-xl text-gray-600 mb-8 leading-relaxed transition-all duration-700 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
            Discover challenges worth solving and solutions that create value.<br className="hidden md:block" />
            Connect with partners that complement your strengths.
          </p>
          
          {/* Enhanced Search Bar with staggered animation */}
          <div 
            className={`bg-white rounded-2xl shadow-lg p-6 space-y-4 transition-all duration-700 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
            style={{ 
              transitionDelay: '200ms', 
              boxShadow: '0 10px 25px -5px rgba(255, 189, 0, 0.1), 0 8px 10px -6px rgba(255, 189, 0, 0.05)' 
            }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-brand-yellow transition-colors" />
                <Input 
                  placeholder="Search by Opportunity, Startup, Domain..." 
                  className="pl-10 w-full border border-gray-100 focus:border-brand-yellow shadow-none focus-visible:ring-1 focus-visible:ring-brand-yellow h-11 rounded-full transition-all"
                />
                {/* Dropdown suggestions - hidden by default */}
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-10 hidden group-focus-within:block">
                  <div className="p-2 border-b border-gray-100">
                    <p className="text-xs font-medium text-gray-500">Trending Searches</p>
                  </div>
                  <div className="p-2">
                    {trendingSearches.map((search, index) => (
                      <p key={index} className="text-sm py-1 px-2 hover:bg-gray-50 rounded cursor-pointer flex items-center">
                        <TrendingUp className="h-3 w-3 mr-2 text-brand-yellow" /> {search}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline-pill" className="flex items-center gap-2 border-gray-200 h-11 hover:border-brand-yellow transition-all duration-200 hover:scale-[1.02]">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span> 
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="pill" className="bg-brand-yellow hover:bg-amber-500 transition-all duration-300 hover:scale-[1.03] h-11 px-6 shadow-md hover:shadow-lg">
                  <span>Search</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            
            {/* Popular Tags with icons and staggered animation */}
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag, index) => (
                <Toggle
                  key={tag.name}
                  variant="outline"
                  className={`px-3 py-1 text-sm bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition-all duration-500 hover:scale-105 flex items-center gap-1 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} data-[state=on]:bg-amber-200 data-[state=on]:text-amber-900 data-[state=on]:font-medium`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  {tag.icon}
                  {tag.name}
                </Toggle>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
