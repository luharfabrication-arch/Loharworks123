import React from 'react';
import { useSite } from '../context/SiteContext';
import { Shield, Calculator, Calendar, MessageSquare, CheckCircle2, Award, Building2, Hammer, PhoneCall } from 'lucide-react';

export const Hero: React.FC = () => {
  const { config, setActiveBookingModalService } = useSite();
  const { hero, business } = config;

  const whatsappMessage = encodeURIComponent(
    `Namaste Luhar, I saw your website and would like to get a free estimate and details for my project.`
  );
  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="relative bg-zinc-950 text-white overflow-hidden py-16 lg:py-24 border-b border-zinc-800">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity">
        <img
          src={hero.heroImage}
          alt="Luhar Construction and Fabrication"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/70" />
      </div>

      {/* Grid subtle accent lines */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Legacy Badge */}
            <div className="inline-flex items-center gap-2 bg-zinc-900/90 border border-amber-500/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-inner">
              <Award className="w-4 h-4 text-white" />
              <span>{hero.badgeText}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] font-serif">
              {hero.titleHeading}{' '}
              <span className="block mt-1 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent underline decoration-amber-500/40 decoration-4 underline-offset-8">
                {hero.titleHighlighted}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-2xl">
              {hero.subtitle}
            </p>

            {/* Key Bullet Features */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-zinc-200 font-medium">
              <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 p-2.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>35+ Years Proven Track Record</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 p-2.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Transparent Material & Quality Breakdown</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 p-2.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Direct Factory Fabrication Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 p-2.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Free On-Site Site Measurement</span>
              </div>
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#quote-calculator"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02] hover:shadow-amber-500/30"
              >
                <Calculator className="w-4 h-4 text-white" />
                <span>Project Spec Estimator</span>
              </a>

              <button
                onClick={() => setActiveBookingModalService('general')}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-5 py-3.5 rounded-xl text-sm border border-zinc-700 transition-all hover:border-zinc-500"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Book Site Visit</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold px-5 py-3.5 rounded-xl text-sm transition-all shadow-md shadow-emerald-900/30"
              >
                <MessageSquare className="w-4 h-4 fill-white text-white" />
                <span>WhatsApp Instant</span>
              </a>
            </div>

            {/* Banner Notice / Announcement */}
            {hero.bannerNotice && (
              <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2">
                <Shield className="w-4 h-4 text-white shrink-0" />
                <span>{hero.bannerNotice}</span>
              </div>
            )}
          </div>

          {/* Right Column: Quick Interactive Service Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
                <div>
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Luhar Master Craftsmen</span>
                  <h3 className="text-xl font-bold text-white font-serif">Core Offerings</h3>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 text-white border border-amber-500/20">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Civil Construction', desc: 'Residential & Commercial Turnkey Projects', icon: Building2 },
                  { name: 'Heavy & Gate Fabrication', desc: 'Main Gates, Grills & Steel Structures', icon: Hammer },
                  { name: 'Modular Kitchens', desc: 'Waterproof Acrylic & HDMR Designs', icon: CheckCircle2 },
                  { name: 'PVC False Ceilings', desc: 'Modern Waterproof LED Groove Ceilings', icon: CheckCircle2 },
                  { name: 'SS & Glass Railings', desc: 'SS 304 Rustproof & Toughened Glass', icon: Shield },
                  { name: 'Teen Shed & Roofing', desc: 'Industrial Tata Sheet & Polycarbonate Roofs', icon: Building2 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-500/40 transition-colors group">
                    <div className="p-1.5 rounded bg-amber-500/10 text-white group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors mt-0.5">
                      <item.icon className="w-4 h-4 text-white group-hover:text-zinc-950" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">{item.name}</h4>
                      <p className="text-[11px] text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call Hotline Box */}
              <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs bg-zinc-950/80 p-3 rounded-xl border">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-white animate-pulse" />
                  <div>
                    <p className="text-zinc-400 text-[10px]">Direct Call Hotline</p>
                    <a href={`tel:${business.phonePrimary}`} className="font-bold text-white hover:text-amber-400">
                      {business.phonePrimary}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => setActiveBookingModalService('general')}
                  className="text-xs bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Book Free Visit
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
