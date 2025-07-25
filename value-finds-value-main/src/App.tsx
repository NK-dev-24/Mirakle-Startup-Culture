import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StartupOnboarding from "./pages/StartupOnboarding";
import CorporateOnboarding from "./pages/CorporateOnboarding";
import Marketplace from "./pages/Marketplace";
import Programs from "./pages/Programs";
import AllStartups from "./pages/AllStartups";
import NotFound from "./pages/NotFound";
import OpportunityDetails from "./pages/OpportunityDetails";
import StartupsList from "./pages/StartupsList";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/startup-onboarding" element={<StartupOnboarding />} />
          <Route path="/corporate-onboarding" element={<CorporateOnboarding />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/all-startups" element={<AllStartups />} />
          <Route path="/opportunity-details" element={<OpportunityDetails />} />
          <Route path="/startups" element={<StartupsList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
