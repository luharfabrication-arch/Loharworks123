import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import {
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Menu,
  X,
  ShieldCheck,
  Calculator,
  Calendar,
  Settings,
  Award
} from 'lucide-react';

export const Header: React.FC = () => {
  const { config, setIsAdminOpen, setActiveBookingModalService } = useSite();
  const { business } = config;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hello Luhar Team, I am visiting your website and would like to get a quote and details for your construction/fabrication services.`
  );
  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-900 text-zinc-100 shadow-xl border-b border-zinc-800">
      {/* Top Bar for Contact & Quick Info */}
      <div className="bg-zinc-950 text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${business.phonePrimary}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span className="font-semibold text-zinc-200">{business.phonePrimary}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white text-white" />
              <span>WhatsApp Us</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span>{business.businessHoursWeekdays}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span className="truncate max-w-[280px]">{business.cityStatePincode}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[11px] font-medium">
              <Award className="w-3 h-3 text-white" />
              {business.yearsOfExperience}+ Years Legacy
            </span>

            {/* Business Owner Admin Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-amber-400 text-[11px] px-2.5 py-1 rounded transition-all border border-zinc-700"
              title="Edit business details, photos, phone & WhatsApp"
            >
              <Settings className="w-3 h-3 text-white" />
              <span>Owner Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 text-zinc-950 font-black text-2xl shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/40 group-hover:scale-105 transition-transform">
            <span>L</span>
            <div className="absolute -top-1 -right-1 bg-zinc-900 border border-amber-500 text-white rounded-full p-0.5">
              <ShieldCheck className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black tracking-tight uppercase text-white font-serif">
                {business.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded">
                INDIA
              </span>
            </div>
            <p className="text-xs text-amber-400/90 tracking-wide font-medium flex items-center gap-1">
              <span>{business.tagline}</span>
            </p>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6 font-medium text-sm text-zinc-300">
          <a href="#services" className="hover:text-amber-400 transition-colors">
            Services
          </a>
          <a href="#quote-calculator" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-amber-400/90 font-semibold">
            <Calculator className="w-4 h-4 text-white" />
            Project Estimator
          </a>
          <a href="#portfolio" className="hover:text-amber-400 transition-colors">
            Our Work
          </a>
          <a href="#why-us" className="hover:text-amber-400 transition-colors">
            Why Luhar
          </a>
          <a href="#reviews" className="hover:text-amber-400 transition-colors">
            Reviews
          </a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">
            Contact & Map
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setActiveBookingModalService('general')}
            className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm hover:border-zinc-500"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            Book Site Measurement
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md shadow-emerald-900/30 hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4 fill-white text-white" />
            <span>WhatsApp Chat</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-300 hover:text-white bg-zinc-800 rounded-lg border border-zinc-700"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-4 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-200 hover:text-amber-400"
          >
            🛠️ Construction & Fabrication Services
          </a>
          <a
            href="#quote-calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-amber-400 hover:text-amber-300"
          >
            🧮 Get Free Instant Quote
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-200 hover:text-amber-400"
          >
            🏗️ Completed Projects Showcase
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-200 hover:text-amber-400"
          >
            ⭐ Why Luhar (35+ Years Trust)
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-200 hover:text-amber-400"
          >
            📍 Address & Google Map
          </a>

          <div className="pt-3 border-t border-zinc-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveBookingModalService('general');
              }}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-zinc-950 font-bold py-2.5 rounded-lg text-xs"
            >
              <Calendar className="w-4 h-4" />
              Book Free Site Visit
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg text-xs"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Direct Chat
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
