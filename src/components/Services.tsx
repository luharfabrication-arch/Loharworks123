import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ServiceItem } from '../types';
import {
  Hammer,
  Building2,
  Check,
  ChevronRight,
  MessageSquare,
  Calendar,
  Calculator,
  ArrowUpRight,
  Sparkles,
  Info
} from 'lucide-react';

export const Services: React.FC = () => {
  const { config, setActiveBookingModalService } = useSite();
  const { services, business } = config;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const getWhatsappUrlForService = (serviceTitle: string) => {
    const text = encodeURIComponent(
      `Hello Luhar, I want to inquire about ${serviceTitle}. Please share project catalogue and site visit details.`
    );
    return `https://wa.me/${business.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="services" className="py-20 bg-zinc-950 text-zinc-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Hammer className="w-3.5 h-3.5 text-white" />
            <span>Master Services & Fabrication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            Our Core Construction & Fabrication Expertise
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Backbone of Indian homes & industrial buildings for over {business.yearsOfExperience} years.
            Every service is backed by transparent material specifications and master craftsmanship.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/5"
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden bg-zinc-950">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                
                {service.popular && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-zinc-950" />
                    <span>Popular Choice</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <span className="bg-zinc-950/80 backdrop-blur border border-zinc-800 text-white font-bold text-xs px-2.5 py-1 rounded-md">
                    Factory Specs
                  </span>
                  <span className="bg-zinc-900/90 text-zinc-300 text-[11px] px-2 py-0.5 rounded border border-zinc-800">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors font-serif">
                    {service.title}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium mt-0.5">{service.tagline}</p>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                  {service.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                  {service.features.length > 3 && (
                    <p className="text-[11px] text-amber-400/80 font-medium pl-6">
                      +{service.features.length - 3} more technical specs
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveBookingModalService(service.id)}
                    className="flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-2 px-3 rounded-lg text-xs transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-zinc-950" />
                    <span>Book Measurement</span>
                  </button>

                  <a
                    href={getWhatsappUrlForService(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-semibold py-2 px-3 rounded-lg text-xs border border-zinc-700 hover:border-emerald-500/40 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-white fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Learn More Link */}
                <button
                  onClick={() => setActiveModalService(service)}
                  className="w-full flex items-center justify-center gap-1 text-zinc-400 hover:text-amber-400 text-xs font-semibold py-1 group/btn transition-colors"
                >
                  <Info className="w-3.5 h-3.5 text-white" />
                  <span>View Full Service Specs</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white group-hover/btn:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative text-zinc-100">
              
              <div className="relative h-60 rounded-xl overflow-hidden bg-zinc-950">
                <img
                  src={activeModalService.image}
                  alt={activeModalService.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                <button
                  onClick={() => setActiveModalService(null)}
                  className="absolute top-3 right-3 bg-zinc-950/80 hover:bg-zinc-800 text-white p-2 rounded-full border border-zinc-700"
                >
                  ✕
                </button>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                  {activeModalService.category} Service
                </span>
                <h3 className="text-2xl font-bold font-serif text-white mt-1">
                  {activeModalService.title}
                </h3>
                <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                  {activeModalService.description}
                </p>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Guaranteed Standards & Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeModalService.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-zinc-200">
                      <Check className="w-4 h-4 text-white shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-800">
                <div>
                  <p className="text-xs text-zinc-400">Custom Site Specification</p>
                  <p className="text-sm font-bold text-amber-400">
                    Free Measurement & Plan
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const id = activeModalService.id;
                      setActiveModalService(null);
                      setActiveBookingModalService(id);
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-xs"
                  >
                    Book Site Measurement
                  </button>

                  <a
                    href={getWhatsappUrlForService(activeModalService.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-white" />
                    WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
