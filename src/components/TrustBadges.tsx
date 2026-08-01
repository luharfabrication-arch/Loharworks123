import React from 'react';
import { useSite } from '../context/SiteContext';
import { ShieldCheck, Award, ThumbsUp, Wrench, Clock, Users } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const { config } = useSite();
  const { business } = config;

  const stats = [
    {
      icon: Award,
      title: `${business.yearsOfExperience}+ Years Legacy`,
      description: 'Serving Delhi NCR & India since 1989 with honesty & precision.'
    },
    {
      icon: ShieldCheck,
      title: 'Built on Trust',
      description: 'Transparent material specs, genuine SS 304 & A-grade cement.'
    },
    {
      icon: ThumbsUp,
      title: '5,000+ Happy Clients',
      description: 'Residential homes, commercial shops & heavy industrial factories.'
    },
    {
      icon: Wrench,
      title: 'In-House Fabrication Yard',
      description: 'Direct factory fabrication with zero middleman commission.'
    },
    {
      icon: Clock,
      title: 'On-Time Project Delivery',
      description: 'Strict adherence to milestone timelines and safety codes.'
    },
    {
      icon: Users,
      title: 'Master Craftsmen Team',
      description: 'Skilled welders, masons, carpenters & site supervisors.'
    }
  ];

  return (
    <section className="bg-zinc-900 border-b border-zinc-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="p-3 rounded-lg bg-white/10 text-white border border-white/20 transition-colors shrink-0">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
