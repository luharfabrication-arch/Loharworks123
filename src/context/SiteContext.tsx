import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, BookingRequest, BusinessInfo, HeroConfig, ServiceItem, PortfolioItem, TestimonialItem, FAQItem } from '../types';
import { defaultConfig } from '../data/defaultConfig';

interface SiteContextType {
  config: SiteConfig;
  updateConfig: (newConfig: SiteConfig) => void;
  updateBusinessInfo: (info: Partial<BusinessInfo>) => void;
  updateHero: (hero: Partial<HeroConfig>) => void;
  updateServices: (services: ServiceItem[]) => void;
  updatePortfolio: (portfolio: PortfolioItem[]) => void;
  updateTestimonials: (testimonials: TestimonialItem[]) => void;
  addTestimonial: (testimonial: Omit<TestimonialItem, 'id' | 'date'>) => TestimonialItem;
  deleteTestimonial: (id: string) => void;
  resetToDefault: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  bookings: BookingRequest[];
  addBooking: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => BookingRequest;
  deleteBooking: (id: string) => void;
  activeBookingModalService?: string;
  setActiveBookingModalService: (serviceId?: string) => void;
}

const STORAGE_KEY = 'luhar_website_config_v2';
const BOOKINGS_KEY = 'luhar_website_bookings_v1';

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure structure compatibility
        return {
          ...defaultConfig,
          ...parsed,
          business: { ...defaultConfig.business, ...(parsed.business || {}) },
          hero: { ...defaultConfig.hero, ...(parsed.hero || {}) },
          services: parsed.services?.length ? parsed.services : defaultConfig.services,
          portfolio: parsed.portfolio?.length ? parsed.portfolio : defaultConfig.portfolio,
          testimonials: parsed.testimonials?.length ? parsed.testimonials : defaultConfig.testimonials,
          faqs: parsed.faqs?.length ? parsed.faqs : defaultConfig.faqs,
        };
      }
    } catch (e) {
      console.error('Failed to load saved config from localStorage', e);
    }
    return defaultConfig;
  });

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKINGS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [activeBookingModalService, setActiveBookingModalService] = useState<string | undefined>(undefined);

  // Save config changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save config to localStorage', e);
    }
  }, [config]);

  // Save bookings changes
  useEffect(() => {
    try {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage', e);
    }
  }, [bookings]);

  const updateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
  };

  const updateBusinessInfo = (info: Partial<BusinessInfo>) => {
    setConfig(prev => ({
      ...prev,
      business: { ...prev.business, ...info }
    }));
  };

  const updateHero = (hero: Partial<HeroConfig>) => {
    setConfig(prev => ({
      ...prev,
      hero: { ...prev.hero, ...hero }
    }));
  };

  const updateServices = (services: ServiceItem[]) => {
    setConfig(prev => ({
      ...prev,
      services
    }));
  };

  const updatePortfolio = (portfolio: PortfolioItem[]) => {
    setConfig(prev => ({
      ...prev,
      portfolio
    }));
  };

  const updateTestimonials = (testimonials: TestimonialItem[]) => {
    setConfig(prev => ({
      ...prev,
      testimonials
    }));
  };

  const addTestimonial = (testimonialData: Omit<TestimonialItem, 'id' | 'date'>) => {
    const formattedDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const newTestimonial: TestimonialItem = {
      ...testimonialData,
      id: 'rev-' + Date.now(),
      date: formattedDate
    };
    setConfig(prev => ({
      ...prev,
      testimonials: [newTestimonial, ...(prev.testimonials || [])]
    }));
    return newTestimonial;
  };

  const deleteTestimonial = (id: string) => {
    setConfig(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  const resetToDefault = () => {
    setConfig(defaultConfig);
    localStorage.removeItem(STORAGE_KEY);
  };

  const addBooking = (bookingData: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: BookingRequest = {
      ...bookingData,
      id: 'BK-' + Date.now().toString().slice(-6),
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  return (
    <SiteContext.Provider
      value={{
        config,
        updateConfig,
        updateBusinessInfo,
        updateHero,
        updateServices,
        updatePortfolio,
        updateTestimonials,
        addTestimonial,
        deleteTestimonial,
        resetToDefault,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        bookings,
        addBooking,
        deleteBooking,
        activeBookingModalService,
        setActiveBookingModalService,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
