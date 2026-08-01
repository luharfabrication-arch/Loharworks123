import React from 'react';
import { useSite } from '../context/SiteContext';
import { Award, ShieldCheck, Scale, Wrench, Factory, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { config } = useSite();
  const { business } = config;

  const highlights = [
    {
      icon: Award,
      title: '35+ Years Unbroken Trust',
      description: 'Three decades of delivering rock-solid civil construction and fabrication across residential, commercial, and industrial sites in India.'
    },
    {
      icon: Scale,
      title: '100% Transparent Steel & Material Weight',
      description: 'We weigh all structural steel, TMT rebar, and SS pipes on site in front of you. Zero material inflation or hidden charges.'
    },
    {
      icon: Factory,
      title: 'In-House Fabrication Workshop',
      description: 'Our dedicated manufacturing yard allows us to produce main gates, grills, and steel trusses at direct factory rates.'
    },
    {
      icon: ShieldCheck,
      title: 'Certified SS 304 Rustproof Guarantee',
      description: 'We strictly use genuine SS 304 for railings and Tata/JSW sheets for tin sheds. Engineered to withstand monsoon & harsh Indian weather.'
    },
    {
      icon: Wrench,
      title: 'Master Masons & Skilled Welders',
      description: 'Experienced master craftsmen who take personal pride in every weld joint, plaster finish, and modular kitchen alignment.'
    },
    {
      icon: Sparkles,
      title: 'Free On-Site Measurement & Consultation',
      description: 'We send our senior supervisor to your site for exact digital measurement and advice at zero consultation fee.'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-zinc-900 text-zinc-100 relative border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Story */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-white" />
              <span>35+ Years Indian Legacy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight leading-tight">
              Why Homeowners & Factories Choose <span className="text-amber-400">Luhar</span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {business.aboutTextLong}
            </p>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Our Tagline Promise: "{business.tagline}"</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We believe that structure is not just steel and cement — it is the safety of your family and business. Every Luhar project comes with our personal quality guarantee.
              </p>
            </div>
          </div>

          {/* Right Column: 6 Grid Highlights */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center transition-colors">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
