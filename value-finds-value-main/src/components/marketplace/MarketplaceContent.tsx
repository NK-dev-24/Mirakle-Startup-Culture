import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Tag, Calendar, Clock, Shield, Plus } from 'lucide-react';
import ChallengeCard from '../ChallengeCard';
import StartupCard from '../StartupCard';
import ApplyCard from '../ApplyCard';
import { challenges, applyOpportunities } from '../../data/marketplaceData';
import { foundersData } from '../../data/foundersData';
import { Badge } from '../ui/badge';

const MarketplaceContent = () => {
  // Use only the challenges array for featuredChallenges
  const featuredChallenges = challenges;
  const featuredStartups = foundersData.slice(0, 6);

  const [filters, setFilters] = useState({
    ecosystem: 'All',
    programType: 'All',
    sector: 'All',
  });
  const [filteredChallenges, setFilteredChallenges] = useState(featuredChallenges);

  const ecosystemOptions = ['All', 'Global', 'Asia', 'Europe'];
  const programTypeOptions = ['All', 'Startup Competition', 'Proof of Concept', 'Acceleration Program'];
  const sectorOptions = ['All', 'AgriTech', 'FinTech', 'HealthTech'];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filtering logic for each tab
  const filterItems = (items: any[]) => {
    let filtered = items;
    if (filters.ecosystem !== 'All') {
      filtered = filtered.filter((c: any) => (c.ecosystem || 'Global') === filters.ecosystem);
    }
    if (filters.programType !== 'All') {
      filtered = filtered.filter((c: any) => c.type && c.type.includes(filters.programType));
    }
    if (filters.sector !== 'All') {
      filtered = filtered.filter((c: any) => (c.sector || 'AgriTech') === filters.sector);
    }
    return filtered;
  };

  const handleApplyFilters = () => {
    let filtered = featuredChallenges;
    if (filters.ecosystem !== 'All') {
      filtered = filtered.filter((c: any) => (c.ecosystem || 'Global') === filters.ecosystem);
    }
    if (filters.programType !== 'All') {
      filtered = filtered.filter((c: any) => c.type && c.type.includes(filters.programType));
    }
    if (filters.sector !== 'All') {
      filtered = filtered.filter((c: any) => (c.sector || 'AgriTech') === filters.sector);
    }
    setFilteredChallenges(filtered);
  };

  return (
    <div className="container mx-auto px-4 mb-16">
      <Tabs defaultValue="all" className="w-full mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-brand-black mb-4 md:mb-0">
            Marketplace Opportunities
          </h2>
          <TabsList className="bg-gray-100 rounded-full p-1">
            <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-brand-yellow data-[state=active]:text-white">All</TabsTrigger>
            <TabsTrigger value="challenges" className="rounded-full data-[state=active]:bg-brand-yellow data-[state=active]:text-white">Programs</TabsTrigger>
            <TabsTrigger value="solutions" className="rounded-full data-[state=active]:bg-brand-yellow data-[state=active]:text-white">StartUps</TabsTrigger>
            <TabsTrigger value="apply" className="rounded-full data-[state=active]:bg-brand-yellow data-[state=active]:text-white">Apply</TabsTrigger>
          </TabsList>
        </div>
        {/* Filter Bar - always visible */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
          <select
            name="ecosystem"
            value={filters.ecosystem}
            onChange={handleFilterChange}
            className="rounded-xl border border-gray-200 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-brand-yellow focus:outline-none bg-white min-w-[160px]"
            aria-label="Ecosystem"
          >
            {ecosystemOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <select
            name="programType"
            value={filters.programType}
            onChange={handleFilterChange}
            className="rounded-xl border border-gray-200 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-brand-yellow focus:outline-none bg-white min-w-[160px]"
            aria-label="Program type"
          >
            {programTypeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <select
            name="sector"
            value={filters.sector}
            onChange={handleFilterChange}
            className="rounded-xl border border-gray-200 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-brand-yellow focus:outline-none bg-white min-w-[160px]"
            aria-label="Sector"
          >
            {sectorOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <Button
            className="bg-brand-black text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-900 transition-all"
            onClick={() => {}}
            aria-label="Apply filters"
          >
            Apply filters
          </Button>
        </div>

        <TabsContent value="all" className="mt-0 space-y-12">
          {/* Featured Challenges section with enhanced grid */}
          <div className="animate-fade-in py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-brand-black">
                  Featured Opportunities
                </h3>
                <Badge className="bg-brand-yellow text-white">New</Badge>
              </div>
              <Link to="/programs">
                <Button variant="ghost" className="text-brand-yellow hover:text-amber-500 transition-colors group">
                  View all opportunities <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterItems(featuredChallenges).length === 0 ? (
                <div className="col-span-3 text-center text-gray-400 py-12">No opportunities found.</div>
              ) : (
                filterItems(featuredChallenges).map((challenge, index) => (
                  <div 
                    key={`challenge-${index}`} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ChallengeCard challenge={challenge} featured={index < 2} />
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Featured Startups section */}
          <div className="animate-fade-in pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-brand-black">
                  Featured Startup Solutions
                </h3>
                <Badge variant="success" className="bg-green-100 text-green-800">Verified</Badge>
              </div>
              <Link to="/startups">
                <Button variant="ghost" className="text-brand-yellow hover:text-amber-500 transition-colors group">
                  View all Startups <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            {/* Unified table style for all devices */}
            <div className="w-full">
              <table className="w-full text-left rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100">
                <thead className="bg-[#F6F6F8]">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-gray-700">Startup Name</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Ecosystem</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Founding Year</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {featuredStartups.slice(0, 4).map((startup, idx) => (
                    <tr key={startup.name} className="border-b last:border-b-0 hover:bg-brand-yellow/10 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(startup.name)}&background=FEE440&color=22223B&bold=true&size=64&rounded=true`}
                          alt={startup.name}
                          className="w-10 h-10 rounded-full border border-brand-yellow shadow-sm bg-white"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{startup.name}</div>
                          <a href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-yellow hover:underline">
                            {startup.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{startup.city}</td>
                      <td className="py-3 px-4 text-gray-700">{startup.employees.match(/\d{4}/) ? startup.employees.match(/\d{4}/)[0] : 'N/A'}</td>
                      <td className="py-3 px-4">
                        <Button variant="outline" className="text-brand-yellow border-brand-yellow px-4 py-2 rounded-xl flex items-center gap-2 font-semibold" disabled>
                          <span className="hidden md:inline">Add to list</span>
                          <span className="md:hidden"><Plus className="h-4 w-4" /></span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="mt-0">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-brand-black">
              All Challenges
            </h3>
            <Link to="/programs">
              <Button variant="ghost" className="text-brand-yellow hover:text-amber-500 transition-colors group">
                View all challenges <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterItems(featuredChallenges).map((challenge, index) => (
              <div 
                key={`challenge-tab-${index}`} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <ChallengeCard
                  challenge={challenge}
                  featured={index === 0}
                />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="solutions" className="mt-0">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold text-brand-black">
                Featured Startups
              </h3>
              <Badge variant="success" className="bg-green-100 text-green-800">Verified</Badge>
            </div>
            <Link to="/startups">
              <Button variant="ghost" className="text-brand-yellow hover:text-amber-500 transition-colors group">
                View all startups <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          {/* Unified table style for all devices */}
          <div className="w-full">
            <table className="w-full text-left rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100">
              <thead className="bg-[#F6F6F8]">
                <tr>
                  <th className="py-3 px-4 font-semibold text-gray-700">Startup Name</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Ecosystem</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Founding Year</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {featuredStartups.slice(0, 4).map((startup, idx) => (
                  <tr key={startup.name} className="border-b last:border-b-0 hover:bg-brand-yellow/10 transition">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(startup.name)}&background=FEE440&color=22223B&bold=true&size=64&rounded=true`}
                        alt={startup.name}
                        className="w-10 h-10 rounded-full border border-brand-yellow shadow-sm bg-white"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{startup.name}</div>
                        <a href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-yellow hover:underline">
                          {startup.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{startup.city}</td>
                    <td className="py-3 px-4 text-gray-700">{startup.employees.match(/\d{4}/) ? startup.employees.match(/\d{4}/)[0] : 'N/A'}</td>
                    <td className="py-3 px-4">
                      <Button variant="outline" className="text-brand-yellow border-brand-yellow px-4 py-2 rounded-xl flex items-center gap-2 font-semibold" disabled>
                        <span className="hidden md:inline">Add to list</span>
                        <span className="md:hidden"><Plus className="h-4 w-4" /></span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="apply" className="mt-0">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold text-brand-black">
                All Opportunities
              </h3>
              <Badge variant="warning" className="bg-amber-100 text-amber-800">Trending</Badge>
            </div>
            <Button variant="ghost" className="text-brand-yellow hover:text-amber-500 transition-colors group">
              View all opportunities <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterItems(applyOpportunities).map((opportunity, index) => (
              <div 
                key={`apply-${index}`} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <ApplyCard 
                  opportunity={opportunity} 
                  featured={index === 0}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceContent;
