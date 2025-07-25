import React, { useState } from 'react';
import Layout from '../components/Layout';
import ChallengeCard from '../components/ChallengeCard';
import { challenges } from '../data/marketplaceData';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ChevronDown } from 'lucide-react';

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    ecosystem: 'All',
    programType: 'All',
    sector: 'All',
  });

  const ecosystemOptions = ['All', 'Global', 'Asia', 'Europe'];
  const programTypeOptions = ['All', 'Startup Competition', 'Proof of Concept', 'Acceleration Program'];
  const sectorOptions = ['All', 'AgriTech', 'FinTech', 'HealthTech'];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const getFilteredChallenges = () => {
    return challenges.filter(challenge => {
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.organizer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEcosystem = filters.ecosystem === 'All' || (challenge.ecosystem || 'Global') === filters.ecosystem;
      const matchesProgramType = filters.programType === 'All' || (challenge.type && challenge.type.includes(filters.programType));
      const matchesSector = filters.sector === 'All' || (challenge.sector || 'AgriTech') === filters.sector;
      return matchesSearch && matchesEcosystem && matchesProgramType && matchesSector;
    });
  };

  const filteredChallenges = getFilteredChallenges();

  return (
    <Layout>
      <div className="bg-gradient-to-br from-white to-brand-lightYellow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            All Programs
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Browse all available challenges and find opportunities that match your startup's expertise.
          </p>

          {/* Search and filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-lg shadow-md mb-8">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search challenges..."
                className="pl-10 w-full border-none shadow-none focus-visible:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                name="ecosystem"
                value={filters.ecosystem}
                onChange={handleFilterChange}
                className="rounded-xl border border-gray-200 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-brand-yellow focus:outline-none bg-white min-w-[140px]"
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
                className="rounded-xl border border-gray-200 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-brand-yellow focus:outline-none bg-white min-w-[140px]"
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
                className="rounded-xl border border-gray-200 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-brand-yellow focus:outline-none bg-white min-w-[140px]"
                aria-label="Sector"
              >
                {sectorOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <Button className="bg-brand-yellow text-white hover:bg-amber-500">
                <Filter className="h-4 w-4 mr-1" />
                Filter
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
              <Button className="bg-brand-yellow text-white hover:bg-amber-500">
                Search
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge, index) => (
              <ChallengeCard
                key={`challenge-${index}`}
                challenge={challenge}
              />
            ))}

            {filteredChallenges.length === 0 && (
              <div className="col-span-3 text-center py-10">
                <h3 className="text-xl font-medium mb-2">No programs found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Programs; 