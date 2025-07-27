import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Search, Plus, Link2, MapPin, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const getAvatarUrl = (name: string) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FEE440&color=22223B&bold=true&size=96&rounded=true`;

const StartupsList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [ecosystem, setEcosystem] = useState('');
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    supabase.from('startups').select('*')
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setStartups(data || []);
        setLoading(false);
      });
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowDialog(false);
  };

  // Unique ecosystems from fetched data
  const uniqueEcosystems = Array.from(new Set(startups.map(s => s.ecosystem)));

  const filteredStartups = startups.filter(s =>
    (ecosystem === '' || s.ecosystem === ecosystem) &&
    (searchTerm === '' || s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const visibleStartups = isLoggedIn ? filteredStartups : startups.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFB] to-[#f7f7fa] pb-16">
      <div className="max-w-5xl mx-auto px-4 pt-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-brand-black">
          Explore <span className="text-brand-pink">Startups</span> on <span className="text-brand-yellow">Miracle</span>
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 mt-4 bg-white/80 rounded-xl shadow-sm px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Filter by ecosystem:</span>
            <select
              className="rounded-xl border border-gray-200 px-4 py-2 text-gray-700 bg-white focus:ring-2 focus:ring-brand-yellow focus:outline-none min-w-[160px]"
              value={ecosystem}
              onChange={e => setEcosystem(e.target.value)}
              disabled={!isLoggedIn}
            >
              <option value="">All</option>
              {uniqueEcosystems.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
            <Button
              className="ml-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-brand-yellow/20"
              onClick={() => setEcosystem('')}
              disabled={!isLoggedIn}
            >
              Reset Filters
            </Button>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-full md:w-72">
              <Input
                placeholder="Search for startups"
                className="w-full border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                disabled={!isLoggedIn}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-yellow" />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading startups...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">Error: {error}</div>
        ) : (
          <div className="mt-6 space-y-6">
            {visibleStartups.length === 0 && (
              <div className="text-center py-8 text-gray-400">No startups found.</div>
            )}
            {visibleStartups.map((startup, idx) => (
              <div
                key={startup.name}
                className="group relative flex flex-col md:flex-row items-center md:items-stretch bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-200 overflow-hidden"
                style={{ animation: `fadeInUp 0.4s ${idx * 0.04}s both` }}
              >
                {/* Brand accent bar */}
                <div className="w-2 md:w-3 bg-gradient-to-b from-brand-yellow to-brand-pink rounded-l-2xl" />
                {/* Avatar */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center p-4 md:p-6">
                  <img
                    src={getAvatarUrl(startup.name)}
                    alt={startup.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-brand-yellow shadow-md bg-white"
                  />
                </div>
                {/* Info */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-4 px-2 md:px-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg md:text-xl font-bold text-brand-black truncate">{startup.name}</span>
                      {startup.industry && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-brand-yellow/20 text-brand-yellow text-xs font-semibold">
                          {Array.isArray(startup.industry) ? startup.industry.join(', ') : startup.industry}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-1">
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-brand-yellow" />{startup.ecosystem}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-brand-yellow" />{startup.foundingYear || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {startup.website && (
                        <a
                          href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-brand-yellow hover:underline"
                        >
                          <Link2 className="h-4 w-4" />
                          {startup.website.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-2 md:gap-4 pr-4 md:pr-8">
                    <Button
                      variant="outline"
                      className="text-brand-yellow border-brand-yellow bg-brand-yellow/10 px-6 py-2 rounded-full font-semibold shadow-sm hover:bg-brand-yellow/20 transition-all"
                      disabled
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add to list
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isLoggedIn && (
          <div className="flex flex-col items-center mt-8">
            <Button className="bg-brand-yellow text-brand-black px-8 py-3 rounded-xl font-semibold shadow hover:bg-yellow-400 transition-all" onClick={() => setShowDialog(true)}>
              Login or Sign Up to view all startups
            </Button>
          </div>
        )}
        {/* Dialog for login/signup */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-md">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <DialogHeader>
                  <DialogTitle>Welcome back</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" className="w-full bg-brand-yellow hover:bg-yellow-400 text-brand-black font-bold" onClick={handleLogin}>Login</Button>
                </DialogFooter>
              </TabsContent>
              <TabsContent value="signup">
                <DialogHeader>
                  <DialogTitle>Create an account</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" className="w-full bg-brand-yellow hover:bg-yellow-400 text-brand-black font-bold" onClick={handleLogin}>Sign Up</Button>
                </DialogFooter>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
        {/* Info/CTA Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div>
            <div className="font-semibold text-lg mb-2 text-brand-black">Startup Database</div>
            <div className="flex items-center gap-2 bg-brand-yellow/20 rounded-lg px-3 py-2 mb-4">
              <Search className="h-5 w-5 text-brand-yellow" />
              <span className="text-brand-yellow text-sm">Search for startups</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Search, filter and view all the startups in our database</li>
              <li>• Use advanced search, filters, and create your startup lists</li>
              <li>• Access more startup data after login</li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" alt="Startup illustration" className="max-w-xs mb-4 rounded-xl shadow border border-gray-100" />
            <Button className="bg-brand-yellow text-brand-black px-6 py-2 rounded-xl font-semibold shadow hover:bg-yellow-400 transition-all" onClick={() => setShowDialog(true)}>
              Explore the full list
            </Button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default StartupsList; 