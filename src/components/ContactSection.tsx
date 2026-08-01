import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { MapPin, Phone, MessageSquare, Mail, Clock, Send, ExternalLink, ShieldCheck, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { config } = useSite();
  const { business } = config;

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    serviceNeeded: 'Civil Construction',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Luhar Team,
My Name: ${contactForm.name}
Phone: ${contactForm.phone}
Service Needed: ${contactForm.serviceNeeded}
Message: ${contactForm.message}`
    );
    window.open(`https://wa.me/${business.whatsappNumber}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent('Hello Luhar, I want to talk to your team regarding my construction or fabrication project.')}`;

  return (
    <section id="contact" className="py-20 bg-zinc-950 text-zinc-100 relative border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span>Contact Us & Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            Get in Touch with Luhar
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Visit our workshop, call us directly, or send us a WhatsApp message. We are ready to assist with your construction & fabrication needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Info & Address */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Cards */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6 shadow-xl">
              
              {/* Phone Numbers */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-white border border-amber-500/20 shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Phone Hotline</h4>
                  <div className="space-y-1 mt-1">
                    <a href={`tel:${business.phonePrimary}`} className="text-sm font-bold text-white hover:text-amber-400 block">
                      {business.phonePrimary} (Primary)
                    </a>
                    <a href={`tel:${business.phoneSecondary}`} className="text-xs text-zinc-300 hover:text-amber-400 block">
                      {business.phoneSecondary} (Secondary)
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-white border border-emerald-500/20 shrink-0">
                  <MessageSquare className="w-5 h-5 fill-white text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">WhatsApp Chat</h4>
                  <p className="text-xs text-zinc-300 mt-1">Instant photo sharing & consultation support</p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors"
                  >
                    <span>Chat on WhatsApp</span>
                    <ExternalLink className="w-3 h-3 text-white" />
                  </a>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-white border border-amber-500/20 shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Email Address</h4>
                  <a href={`mailto:${business.email}`} className="text-xs text-zinc-200 hover:text-amber-400 mt-1 block">
                    {business.email}
                  </a>
                </div>
              </div>

              {/* Physical Workshop Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-white border border-amber-500/20 shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Workshop & Office Address</h4>
                  <p className="text-xs text-zinc-200 mt-1 leading-relaxed">
                    {business.addressLine1}<br />
                    {business.addressLine2}<br />
                    {business.cityStatePincode}
                  </p>
                  <a
                    href={business.googleMapDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:underline mt-2"
                  >
                    <span>Open Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-white" />
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 pt-3 border-t border-zinc-800">
                <div className="p-3 rounded-xl bg-zinc-800 text-white shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Working Hours</h4>
                  <p className="text-xs text-zinc-300 mt-1">{business.businessHoursWeekdays}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{business.businessHoursWeekend}</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Google Map Embed & Quick Contact Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Google Map Card */}
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl">
              <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white">Google Map Location</span>
                </div>
                <a
                  href={business.googleMapDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3 text-white" />
                </a>
              </div>

              <div className="h-72 w-full bg-zinc-950">
                <iframe
                  title="Luhar Google Map Location"
                  src={business.googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-800 shadow-xl space-y-4">
              <h3 className="text-lg font-bold font-serif text-white">Send Direct Inquiry Message</h3>
              <p className="text-xs text-zinc-400">Fill this quick form to connect directly via WhatsApp.</p>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Opening WhatsApp with your inquiry! Our supervisor will connect with you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-zinc-300 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-zinc-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Service Required</label>
                    <select
                      value={contactForm.serviceNeeded}
                      onChange={(e) => setContactForm({ ...contactForm, serviceNeeded: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Civil Construction">Civil Construction</option>
                      <option value="Heavy & Gate Fabrication">Heavy & Gate Fabrication</option>
                      <option value="Modular Kitchen">Modular Kitchen</option>
                      <option value="PVC False Ceiling">PVC False Ceiling</option>
                      <option value="SS & Glass Railings">SS & Glass Railings</option>
                      <option value="Teen Shed & Roofing">Teen Shed & Roofing</option>
                      <option value="Interior Decoration">Interior Decoration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Message / Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="Mention your plot size, location, or questions..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold py-3 rounded-xl text-xs transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message on WhatsApp</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
