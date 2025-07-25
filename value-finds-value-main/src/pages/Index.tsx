import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, Rocket, TrendingUp, CheckCircle, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useInView } from 'react-intersection-observer';

const Index = () => {
  // Animation for number counting
  const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });
  
    useEffect(() => {
      if (inView) {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [end, duration, inView]);
  
    return <span ref={ref}>{count}+</span>;
  };

  // Staggered animation for features
  const FeatureItem = ({ icon: Icon, title, description, delay }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });
  
    return (
      <div 
        ref={ref}
        className={`p-6 text-center transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="w-16 h-16 bg-brand-lightYellow rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110">
          <Icon className="text-brand-yellow h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  // Animated section entry - Updated to accept style prop
  const AnimatedSection = ({ children, className = "", style = {} }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });
  
    return (
      <div 
        ref={ref}
        className={`transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${className}`}
        style={style}
      >
        {children}
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero Section with Yellow Accents and Animated Background */}
      <section className="relative overflow-hidden pt-8 md:pt-12">
        {/* Animated gradient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-lightYellow rounded-full opacity-30 transform -translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-amber-100 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-black leading-tight mb-6 animate-fade-in">
              One Platform. Two Missions.<br />
              <span className="text-3xl md:text-4xl bg-gradient-to-r from-brand-yellow to-amber-500 bg-clip-text text-transparent">Startups solve. Corporates evolve.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              Match groundbreaking products with real-world problems.
              <br />Corporates post challenges. Startups pitch solutions. Value meets value.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Link to="/auth">
                <Button size="lg" className="text-white bg-brand-yellow hover:bg-amber-500 px-8 py-6 text-lg w-full md:w-auto group">
                  I'm a Startup
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/corporate-onboarding">
                <Button variant="outline" size="lg" className="border-brand-black text-brand-black hover:bg-brand-lightYellow px-8 py-6 text-lg w-full md:w-auto group">
                  I'm a Corporate
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Flow Section - Simplified */}
      <section className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex justify-center items-center text-gray-400 text-sm md:text-base">
          <div className="text-center px-4">
            <p className="font-medium">Startup Flow →</p>
            <p>"Got a product?"</p>
          </div>
          <div className="text-center px-8 font-bold">
            Problem Solved
          </div>
          <div className="text-center px-4">
            <p className="font-medium">← Corporate Flow</p>
            <p>"Have a problem?"</p>
          </div>
        </div>
      </section>

      {/* Features Section - Now with timeline style */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative">
        {/* Timeline connector */}
        <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-brand-lightYellow to-transparent"></div>
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-black mb-3 animate-fade-in">How it works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>Our platform connects innovative startups with corporations facing real challenges</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <FeatureItem 
            icon={BrainCircuit}
            title="Post Challenges"
            description="Corporations share their innovation challenges and problems they need solved"
            delay={0}
          />
          
          <FeatureItem 
            icon={Rocket}
            title="Match Solutions"
            description="Startups propose their innovative products and services as solutions"
            delay={200}
          />
          
          <FeatureItem 
            icon={TrendingUp}
            title="Create Value"
            description="Both sides benefit from collaborative innovation and growth"
            delay={400}
          />
        </div>
      </section>

      {/* Marketplace Teaser - Enhanced with animations */}
      <section className="bg-gradient-to-br from-white to-brand-lightYellow py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-10">
              <h2 className="text-2xl font-bold text-brand-black flex items-center">
                <Sparkles className="h-5 w-5 text-brand-yellow mr-2" /> 
                Explore What's Happening
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Challenge Card 1 */}
              <Card className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow/50 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <BrainCircuit className="text-brand-black" />
                  <span className="text-sm font-semibold text-brand-black">CHALLENGE</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Automate invoice fraud detection</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">Need solution to identify suspicious invoices at scale.</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-gray-500">Corp: X Ltd.</span>
                  <Button variant="ghost" size="sm" className="text-brand-yellow p-0 h-auto hover:text-amber-500 group">
                    View Details
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>

              {/* Startup Pitch Card */}
              <Card className="bg-white p-6 rounded-lg shadow-md border-t-2 border-brand-yellow hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-amber-100/50 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <Rocket className="text-brand-yellow" />
                  <span className="text-sm font-semibold text-brand-yellow">STARTUP PITCH</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Smart NLP chatbot for HR queries</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">AI-powered solution for internal employee support.</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-gray-500">Startup: SolveAI</span>
                  <Button variant="ghost" size="sm" className="text-brand-yellow p-0 h-auto hover:text-amber-500 group">
                    View Details
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>

              {/* Challenge Card 2 */}
              <Card className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow/50 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="text-brand-black" />
                  <span className="text-sm font-semibold text-brand-black">CHALLENGE</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Optimize cold-chain logistics</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">Seeking tools to improve temperature monitoring in transit.</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-gray-500">Corp: MedTransport</span>
                  <Button variant="ghost" size="sm" className="text-brand-black p-0 h-auto hover:text-gray-700 group">
                    View Details
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>
            </div>

            <div className="flex justify-center mt-10">
              <Link to="/marketplace">
                <Button className="flex items-center gap-2 bg-brand-yellow text-white hover:bg-amber-500 group">
                  Browse Marketplace
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Statistics Section - With animated counters */}
      <section className="container mx-auto px-4 py-16 md:py-24 overflow-hidden">
        <div className="relative">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-lightYellow/30 via-brand-yellow/10 to-brand-lightYellow/30 rounded-2xl -z-10"></div>
          
          <AnimatedSection>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Powering Innovation Across Industries</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto p-8">
              <div className="text-center transform transition-all duration-500 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-brand-yellow mb-2">
                  <CountUp end={300} />
                </div>
                <p className="text-gray-600">Active Startups</p>
              </div>
              <div className="text-center transform transition-all duration-500 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-brand-yellow mb-2">
                  <CountUp end={100} />
                </div>
                <p className="text-gray-600">Corporate Challenges</p>
              </div>
              <div className="text-center transform transition-all duration-500 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-brand-yellow mb-2">
                  <CountUp end={50} />
                </div>
                <p className="text-gray-600">Successful Matches</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonial/Trust Section - Enhanced with cards */}
      <section className="bg-brand-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Startups & Corporates Choose Us</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Join the growing community of innovators creating value together</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection className="bg-gray-800 p-6 rounded-lg hover:shadow-lg hover:shadow-brand-yellow/10 transition-all duration-300 border border-gray-700 hover:border-brand-yellow/30">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-full bg-brand-yellow/20">
                  <Rocket className="text-brand-yellow h-5 w-5" />
                </div>
                <span className="font-semibold">For Startups</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-yellow h-4 w-4 mt-0.5 shrink-0" />
                  <span>Direct access to corporate innovation needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-yellow h-4 w-4 mt-0.5 shrink-0" />
                  <span>Find paid pilot opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-yellow h-4 w-4 mt-0.5 shrink-0" />
                  <span>Showcase your solutions to decision makers</span>
                </li>
              </ul>
            </AnimatedSection>
            
            <AnimatedSection 
              className="bg-gray-800 p-6 rounded-lg hover:shadow-lg hover:shadow-brand-yellow/10 transition-all duration-300 border border-gray-700 hover:border-brand-yellow/30" 
              style={{ transitionDelay: '200ms' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-full bg-brand-yellow/20">
                  <BrainCircuit className="text-brand-yellow h-5 w-5" />
                </div>
                <span className="font-semibold">For Corporates</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-yellow h-4 w-4 mt-0.5 shrink-0" />
                  <span>Access vetted, ready-to-deploy solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-yellow h-4 w-4 mt-0.5 shrink-0" />
                  <span>Accelerate your innovation timeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-yellow h-4 w-4 mt-0.5 shrink-0" />
                  <span>Get multiple solutions for your challenges</span>
                </li>
              </ul>
            </AnimatedSection>
          </div>
          
          <div className="flex justify-center mt-12">
            <Link to="/auth">
              <Button className="text-brand-black bg-brand-yellow hover:bg-amber-500 mr-4 group">
                Join as Startup
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/corporate-onboarding">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 group">
                Post a Challenge
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
