
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/marketplace/HeroSection';
import StatsSection from '../components/marketplace/StatsSection';
import MarketplaceContent from '../components/marketplace/MarketplaceContent';
import TrustSection from '../components/marketplace/TrustSection';
import CTASection from '../components/marketplace/CTASection';

const Marketplace = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <MarketplaceContent />
      <TrustSection />
      <CTASection />
    </Layout>
  );
};

export default Marketplace;
