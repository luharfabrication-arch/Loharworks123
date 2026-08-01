import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Calculator, MessageSquare, Calendar, Check, ShieldAlert, Sparkles, Copy, CheckCheck, FileText } from 'lucide-react';

export const QuoteCalculator: React.FC = () => {
  const { config, setActiveBookingModalService } = useSite();
  const { services, business } = config;

  const [input, setInput] = useState({
    serviceId: services[0]?.id || 'construction',
    sizeValue: 500,
    materialTier: 'Premium Quality Grade' as 'Standard Grade' | 'Premium Quality Grade' | 'Heavy Duty / Luxury Grade',
    includeInstallation: true,
    notes: ''
  });

  const [copied, setCopied] = useState(false);

  // Find selected service
  const currentService = services.find(s => s.id === input.serviceId) || services[0];

  const specSummaryText = `*LUHAR PROJECT SPECIFICATION INQUIRY*
----------------------------------
*Service:* ${currentService.title}
*Estimated Area / Dimension:* ${input.sizeValue} ${currentService.unit}
*Material Grade:* ${input.materialTier}
*On-Site Installation Included:* ${input.includeInstallation ? 'Yes' : 'No'}
----------------------------------
Please share design options, material samples, and schedule a site measurement.
www.luharbuild.com`;

  const handleWhatsappSend = () => {
    const url = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(specSummaryText)}`;
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(specSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quote-calculator" className="py-20 bg-zinc-900 text-zinc-100 relative border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-white" />
            <span>Project Specification Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            Configure Your Project Specifications
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Select your service category, project dimensions, and material grade to prepare a direct consultation request for our engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 bg-zinc-950 p-6 sm:p-8 rounded-2xl border border-zinc-800 space-y-6 shadow-xl">
            
            {/* 1. Service Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                1. Select Service Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {services.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => setInput(prev => ({ ...prev, serviceId: srv.id }))}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      input.serviceId === srv.id
                        ? 'bg-amber-500/15 border-amber-500 text-white font-bold ring-1 ring-amber-500/30'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold">{srv.title}</p>
                      <p className="text-[10px] text-zinc-400">{srv.category}</p>
                    </div>
                    {input.serviceId === srv.id && (
                      <div className="w-4 h-4 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3] text-zinc-950" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Dimension / Area Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                  2. Area or Dimension ({currentService.unit})
                </label>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {input.sizeValue} {currentService.unit}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="5000"
                step="10"
                value={input.sizeValue}
                onChange={(e) => setInput(prev => ({ ...prev, sizeValue: parseInt(e.target.value) || 20 }))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>20 {currentService.unit}</span>
                <span>1,000</span>
                <span>2,500</span>
                <span>5,000+ {currentService.unit}</span>
              </div>
              
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-zinc-400">Or enter manually:</span>
                <input
                  type="number"
                  min="1"
                  value={input.sizeValue}
                  onChange={(e) => setInput(prev => ({ ...prev, sizeValue: Math.max(1, parseInt(e.target.value) || 0) }))}
                  className="bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-1.5 rounded-lg w-32 focus:outline-none focus:border-amber-500"
                />
                <span className="text-xs text-zinc-400">{currentService.unit}</span>
              </div>
            </div>

            {/* 3. Material Tier Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                3. Material Quality & Specification Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    tier: 'Standard Grade' as const,
                    desc: 'Durable A-grade standard steel/wood material, standard anti-rust primer, basic finish.'
                  },
                  {
                    tier: 'Premium Quality Grade' as const,
                    desc: 'Tata/JSW steel, SS 304 grade, waterproof HDMR, soft-close hydraulic fittings.'
                  },
                  {
                    tier: 'Heavy Duty / Luxury Grade' as const,
                    desc: 'Extra gauge heavy steel, toughened 12mm glass, luxury acrylic & Italian hardware.'
                  }
                ].map((item) => (
                  <button
                    key={item.tier}
                    onClick={() => setInput(prev => ({ ...prev, materialTier: item.tier }))}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      input.materialTier === item.tier
                        ? 'bg-amber-500/15 border-amber-500 text-white ring-1 ring-amber-500/30'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-amber-400 block">{item.tier}</span>
                      <p className="text-[10px] mt-1 leading-snug">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Installation Checkbox */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <div>
                <p className="text-xs font-semibold text-white">Include On-Site Fitting & Craftsmanship</p>
                <p className="text-[11px] text-zinc-400">Includes master labor, site setup, hardware & transportation</p>
              </div>
              <input
                type="checkbox"
                checked={input.includeInstallation}
                onChange={(e) => setInput(prev => ({ ...prev, includeInstallation: e.target.checked }))}
                className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
              />
            </div>

          </div>

          {/* Right Column: Specification Summary */}
          <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl border-l border-b border-amber-500/20">
              Project Spec Card
            </div>

            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Specification Summary</span>
              <h3 className="text-xl font-bold font-serif text-white mt-1">
                {currentService.title} Details
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Configured for {input.sizeValue} {currentService.unit} with {input.materialTier}.
              </p>
            </div>

            {/* Feature Checklist Breakdown */}
            <div className="space-y-3 bg-zinc-950/80 p-4 rounded-xl border border-zinc-800 text-xs">
              <div className="flex justify-between text-zinc-300 pb-2 border-b border-zinc-800">
                <span>Selected Service</span>
                <span className="font-semibold text-white">{currentService.title}</span>
              </div>
              <div className="flex justify-between text-zinc-300 pb-2 border-b border-zinc-800">
                <span>Total Dimension / Area</span>
                <span className="font-semibold text-white">{input.sizeValue} {currentService.unit}</span>
              </div>
              <div className="flex justify-between text-zinc-300 pb-2 border-b border-zinc-800">
                <span>Material Grade</span>
                <span className="font-semibold text-amber-400">{input.materialTier}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>On-Site Installation</span>
                <span className="font-semibold text-white">
                  {input.includeInstallation ? 'Included' : 'Supply Only'}
                </span>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <span className="text-xs font-bold text-amber-400 block mb-2">Technical Features Included:</span>
                <div className="space-y-1.5">
                  {currentService.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-[11px] text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-[11px] text-amber-300">
              <ShieldAlert className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <p>
                Our site engineer will bring physical material samples and take exact measurements during the free site visit!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleWhatsappSend}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all shadow-lg shadow-emerald-900/30"
              >
                <MessageSquare className="w-4 h-4 fill-white text-white" />
                <span>Send Spec Inquiry on WhatsApp</span>
              </button>

              <button
                onClick={() => setActiveBookingModalService(input.serviceId)}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3.5 px-4 rounded-xl text-xs transition-colors shadow-md"
              >
                <Calendar className="w-4 h-4 text-zinc-950" />
                <span>Book Free Physical Site Measurement</span>
              </button>

              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-1.5 text-zinc-400 hover:text-zinc-200 text-xs py-2 transition-colors"
              >
                {copied ? <CheckCheck className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                <span>{copied ? 'Specification Copied to Clipboard!' : 'Copy Summary Text'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
