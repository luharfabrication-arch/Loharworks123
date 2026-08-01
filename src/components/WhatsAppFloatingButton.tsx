import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { MessageSquare, X, ChevronUp, Sparkles, Send } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { config, setActiveBookingModalService } = useSite();
  const { business } = config;
  const [isOpen, setIsOpen] = useState(false);

  const quickPrompts = [
    "Hi Luhar, I need an inquiry for Civil Construction.",
    "Namaste! I would like details regarding PVC False Ceiling installation.",
    "Hello, I want to install SS Toughened Glass Railings.",
    "Hi, please share design options for Modular Kitchens.",
    "Hello, I need an inquiry for Teen Shed / Industrial Roofing."
  ];

  const handleSendPrompt = (prompt: string) => {
    const url = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(prompt)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end space-y-3">
      
      {/* Quick Menu Popup */}
      {isOpen && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-2xl w-80 text-zinc-100 space-y-3 animate-fade-in relative overflow-hidden">
          <div className="bg-emerald-600 -mx-4 -mt-4 p-3.5 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="relative">
                <MessageSquare className="w-5 h-5 fill-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border border-white rounded-full animate-ping" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-serif">Luhar WhatsApp Support</h4>
                <p className="text-[10px] opacity-90">Usually replies in under 5 mins</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-zinc-300">Choose a quick topic to start chatting with our supervisor:</p>

          <div className="space-y-1.5">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(p)}
                className="w-full text-left p-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 text-[11px] text-zinc-200 transition-all flex items-center justify-between group"
              >
                <span className="truncate pr-2">{p}</span>
                <Send className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px]">
            <span className="text-zinc-400">Direct Number: {business.phonePrimary}</span>
            <button
              onClick={() => {
                setIsOpen(false);
                setActiveBookingModalService('general');
              }}
              className="text-amber-400 font-bold hover:underline"
            >
              Book Site Visit
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3.5 rounded-full shadow-2xl shadow-emerald-900/50 hover:scale-105 transition-all"
        aria-label="Open WhatsApp Chat"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>

        <MessageSquare className="w-6 h-6 fill-white" />
        <span className="text-xs font-bold hidden sm:inline-block pr-1">
          WhatsApp Us
        </span>
      </button>

    </div>
  );
};
