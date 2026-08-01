import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Calendar, Clock, MapPin, Check, MessageSquare, X } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { config, activeBookingModalService, setActiveBookingModalService, addBooking } = useSite();
  const { services, business } = config;

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    serviceId: activeBookingModalService && activeBookingModalService !== 'general' ? activeBookingModalService : (services[0]?.id || 'construction'),
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: '10:00 AM - 01:00 PM',
    visitType: 'site_measurement' as const,
    address: '',
    pincode: '',
    notes: ''
  });

  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!activeBookingModalService) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBk = addBooking(formData);
    setConfirmedBookingId(newBk.id);
  };

  const selectedServiceObj = services.find(s => s.id === formData.serviceId) || services[0];

  const handleWhatsappSendBooking = () => {
    const text = encodeURIComponent(
      `*NEW SITE MEASUREMENT BOOKING (Ref: ${confirmedBookingId})*
---------------------------------------
*Name:* ${formData.customerName}
*Phone:* ${formData.phone}
*Service:* ${selectedServiceObj?.title || formData.serviceId}
*Visit Date:* ${formData.preferredDate}
*Time Slot:* ${formData.preferredTime}
*Address:* ${formData.address}, Pin: ${formData.pincode}
*Notes:* ${formData.notes || 'N/A'}`
    );
    window.open(`https://wa.me/${business.whatsappNumber}?text=${text}`, '_blank');
    setActiveBookingModalService(undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative text-zinc-100 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-white">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-white">Book Free Site Visit</h3>
              <p className="text-[11px] text-zinc-400">Zero measurement fee across NCR & nearby regions</p>
            </div>
          </div>
          <button
            onClick={() => setActiveBookingModalService(undefined)}
            className="text-zinc-400 hover:text-white p-1.5 rounded-lg bg-zinc-800"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {confirmedBookingId ? (
          /* Confirmation State */
          <div className="space-y-4 py-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-white mx-auto flex items-center justify-center border border-emerald-500/30">
              <Check className="w-6 h-6 stroke-[3] text-white" />
            </div>

            <h4 className="text-xl font-bold font-serif text-white">Booking Request Received!</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Your booking reference is <span className="font-bold text-amber-400">{confirmedBookingId}</span>.
              Our site engineer will call you to confirm your exact location and time.
            </p>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleWhatsappSendBooking}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-emerald-900/30 transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white text-white" />
                <span>Confirm Instantly via WhatsApp</span>
              </button>

              <button
                onClick={() => setActiveBookingModalService(undefined)}
                className="w-full text-zinc-400 hover:text-zinc-200 text-xs py-2"
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div>
              <label className="block font-medium text-zinc-300 mb-1">Select Service Category *</label>
              <select
                value={formData.serviceId}
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-zinc-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anil Sharma"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-zinc-300 mb-1">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-300 mb-1">Time Slot *</label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="09:00 AM - 12:00 PM">Morning (09:00 AM - 12:00 PM)</option>
                  <option value="12:00 PM - 03:00 PM">Afternoon (12:00 PM - 03:00 PM)</option>
                  <option value="03:00 PM - 07:00 PM">Evening (03:00 PM - 07:00 PM)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-medium text-zinc-300 mb-1">Site Address *</label>
                <input
                  type="text"
                  required
                  placeholder="House / Plot No., Colony, City"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-300 mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 110020"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-zinc-300 mb-1">Special Notes / Requirements</label>
              <textarea
                rows={2}
                placeholder="Mention specific dimensions, material preferences or directions..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
            >
              Submit Site Visit Booking
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
