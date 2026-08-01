import React from 'react';
import { useSite } from '../context/SiteContext';
import { ShieldCheck, Phone, MessageSquare, Mail, MapPin, Award, Settings, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, setIsAdminOpen } = useSite();
  const { business, services } = config;

  const currentYear = new Date().getFullYear();

  const whatsappMessage = encodeURIComponent(
    `Hello Luhar Team, I am contacting you from the website footer regarding construction and fabrication services.`
  );
  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info (2 spans on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 text-zinc-950 font-black text-xl shadow-lg">
                <span>L</span>
              </div>
              <div>
                <span className="text-xl font-black text-white font-serif uppercase tracking-tight">
                  {business.name}
                </span>
                <p className="text-xs text-amber-400 font-medium">{business.tagline}</p>
              </div>
            </a>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              {business.aboutTextShort}
            </p>

            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-semibold">
              <Award className="w-4 h-4 text-white" />
              <span>{business.yearsOfExperience}+ Years of Proven Trust in India</span>
            </div>
          </div>

          {/* Col 2: Services List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-serif">
              Master Services
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              {services.map((srv) => (
                <li key={srv.id}>
                  <a href="#services" className="hover:text-amber-400 transition-colors">
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-serif">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#quote-calculator" className="hover:text-amber-400 transition-colors">
                  🧮 Project Estimator
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-amber-400 transition-colors">
                  🏗️ Completed Work Gallery
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-amber-400 transition-colors">
                  ⭐ Why Choose Luhar
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  💬 Customer Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  📍 Workshop Address & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Workshop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-serif">
              Contact & Location
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <a href={`tel:${business.phonePrimary}`} className="flex items-center gap-2 hover:text-amber-400">
                <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                <span>{business.phonePrimary}</span>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300">
                <MessageSquare className="w-3.5 h-3.5 fill-white text-white shrink-0" />
                <span>WhatsApp Direct Chat</span>
              </a>
              <a href={`mailto:${business.email}`} className="flex items-center gap-2 hover:text-amber-400">
                <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                <span>{business.email}</span>
              </a>
              <div className="flex items-start gap-2 pt-1 text-[11px] text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                <span>{business.cityStatePincode}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {currentYear} {business.name} Construction & Fabrication. All rights reserved. {business.tagline}.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors border border-zinc-800 hover:border-amber-500/40 px-2.5 py-1 rounded bg-zinc-900"
            >
              <Settings className="w-3 h-3 text-amber-500" />
              <span>Owner Panel (Customize Content)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
