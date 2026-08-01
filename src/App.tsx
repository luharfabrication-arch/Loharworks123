import React from 'react';
import { SiteProvider } from './context/SiteContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBadges } from './components/TrustBadges';
import { Services } from './components/Services';
import { QuoteCalculator } from './components/QuoteCalculator';
import { PortfolioGallery } from './components/PortfolioGallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminModal } from './components/AdminModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

export default function App() {
  return (
    <SiteProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950">
        <Header />
        <main>
          <Hero />
          <TrustBadges />
          <Services />
          <QuoteCalculator />
          <PortfolioGallery />
          <WhyChooseUs />
          <Testimonials />
          <FAQ />
          <ContactSection />
        </main>
        <Footer />
        
        {/* Floating Modals and WhatsApp Widget */}
        <BookingModal />
        <AdminModal />
        <WhatsAppFloatingButton />
      </div>
    </SiteProvider>
  );
}
