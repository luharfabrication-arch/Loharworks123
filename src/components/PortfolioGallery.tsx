import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { PortfolioItem } from '../types';
import { Building2, MapPin, Calendar, ExternalLink, MessageSquare, ZoomIn } from 'lucide-react';

export const PortfolioGallery: React.FC = () => {
  const { config } = useSite();
  const { portfolio, business } = config;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImageModal, setActiveImageModal] = useState<PortfolioItem | null>(null);

  const categories = ['All', ...Array.from(new Set(portfolio.map(p => p.category)))];

  const filteredPortfolio = selectedCategory === 'All'
    ? portfolio
    : portfolio.filter(p => p.category === selectedCategory);

  const getWhatsappForProject = (projTitle: string) => {
    const text = encodeURIComponent(
      `Hello Luhar, I saw your project work "${projTitle}" on your website and would like a quote for a similar project.`
    );
    return `https://wa.me/${business.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="portfolio" className="py-20 bg-zinc-950 text-zinc-100 relative border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-white" />
            <span>Completed Work Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            Proof of Our Craftsmanship Across India
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Real photos from our residential, commercial, and industrial sites. Over {business.yearsOfExperience} years of structural excellence.
          </p>
        </div>

        {/* Category Tabs */}
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              className="group bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div
                className="relative h-60 overflow-hidden cursor-pointer bg-zinc-950"
                onClick={() => setActiveImageModal(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur border border-zinc-800 text-amber-400 font-bold text-[10px] uppercase px-2.5 py-1 rounded-md">
                  {item.category}
                </div>

                <div className="absolute top-3 right-3 bg-zinc-950/80 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300">
                  <div className="flex items-center gap-1 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800/80">
                    <MapPin className="w-3 h-3 text-white" />
                    <span className="truncate max-w-[160px]">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800/80">
                    <Calendar className="w-3 h-3 text-white" />
                    <span>{item.completionYear}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <a
                    href={getWhatsappForProject(item.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-white text-white" />
                    <span>Inquire Similar Work</span>
                  </a>

                  <button
                    onClick={() => setActiveImageModal(item)}
                    className="text-zinc-400 hover:text-amber-400 text-xs font-semibold flex items-center gap-1"
                  >
                    <span>View Larger</span>
                    <ExternalLink className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Zoom */}
        {activeImageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-fade-in">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full p-6 space-y-4 shadow-2xl relative text-zinc-100">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase">{activeImageModal.category} Project</span>
                  <h3 className="text-xl font-bold font-serif text-white">{activeImageModal.title}</h3>
                </div>
                <button
                  onClick={() => setActiveImageModal(null)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full border border-zinc-700"
                >
                  ✕
                </button>
              </div>

              <div className="relative max-h-[65vh] overflow-hidden rounded-xl bg-black flex items-center justify-center">
                <img
                  src={activeImageModal.image}
                  alt={activeImageModal.title}
                  className="max-h-[65vh] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-800 text-xs">
                <div>
                  <p className="text-zinc-300 font-medium">{activeImageModal.description}</p>
                  <p className="text-zinc-500 mt-0.5">Location: {activeImageModal.location} • Year: {activeImageModal.completionYear}</p>
                </div>

                <a
                  href={getWhatsappForProject(activeImageModal.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-white" />
                  <span>Inquire Similar Work</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
