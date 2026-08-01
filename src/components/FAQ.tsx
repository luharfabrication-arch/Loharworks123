import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { config } = useSite();
  const { faqs } = config;
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.id || null);

  return (
    <section className="py-20 bg-zinc-900 text-zinc-100 relative border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-white" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            Got Questions? We Have Clear Answers
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-white hover:text-amber-400 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-300 border-t border-zinc-800/80 pt-3 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
