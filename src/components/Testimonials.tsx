import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Star, MessageCircle, MapPin, CheckCircle, PlusCircle, X, Check, ThumbsUp } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { config, addTestimonial } = useSite();
  const { testimonials, services } = config;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState(services[0]?.title || 'Civil Construction');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  // Calculate Average Rating
  const totalReviews = testimonials.length;
  const avgRating = totalReviews > 0
    ? (testimonials.reduce((sum, item) => sum + item.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addTestimonial({
      name: name.trim(),
      location: location.trim() || 'Dehradun, Uttarakhand',
      service: service || 'General Construction',
      rating,
      comment: comment.trim()
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsFormOpen(false);
      // Reset form fields
      setName('');
      setLocation('');
      setComment('');
      setRating(5);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 bg-zinc-950 text-zinc-100 relative border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>Public Customer Reviews & Ratings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            What Our Clients Say About Luhar
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Genuine ratings and reviews from homeowners, commercial clients, and engineers across Uttarakhand & India.
          </p>
        </div>

        {/* Rating Summary Bar & Public Review Action Button */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-6">
            <div className="text-center md:text-left border-r border-zinc-800 pr-6">
              <div className="text-4xl font-black text-white font-serif tracking-tight">{avgRating}</div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-white my-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-white fill-white" />
                ))}
              </div>
              <span className="text-xs text-zinc-400 font-medium">{totalReviews} Verified Public Reviews</span>
            </div>
            
            <div className="space-y-1 hidden sm:block">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <ThumbsUp className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% On-Time Project Completion & Material Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Reviewed by verified local homeowners and project managers</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="w-full md:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            {isFormOpen ? (
              <>
                <X className="w-4 h-4" />
                <span>Close Review Form</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>Write a Review & Rate Us</span>
              </>
            )}
          </button>
        </div>

        {/* Public Review Form Modal/Card */}
        {isFormOpen && (
          <div className="bg-zinc-900 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl relative animate-fade-in text-zinc-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold font-serif text-white">Share Your Feedback & Star Rating</h3>
                <p className="text-xs text-zinc-400">Your review will be published publicly on our website immediately.</p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-800"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white font-serif">Thank You for Your Review!</h4>
                <p className="text-xs text-zinc-300">Your rating and feedback have been added to the public reviews section below.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                {/* Interactive Star Rating */}
                <div>
                  <label className="block font-bold text-zinc-300 mb-2">Select Your Rating *</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const isActive = starVal <= (hoverRating || rating);
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setRating(starVal)}
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform hover:scale-110 focus:outline-none"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              isActive
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-zinc-600 fill-zinc-800'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-2 font-bold text-amber-400 text-sm">{rating} / 5 Stars</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Location / City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dehradun, Uttarakhand"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Service Completed *</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    {services.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title} ({srv.category})
                      </option>
                    ))}
                    <option value="Custom Construction & Interior">Custom Construction & Interior</option>
                    <option value="General Metal Fabrication">General Metal Fabrication</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Your Review / Experience *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Write a few lines about the quality of work, team behavior, finishing, and durability..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
                >
                  Submit Public Review
                </button>
              </form>
            )}
          </div>
        )}

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors shadow-xl"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-white">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-white fill-white" />
                  ))}
                </div>

                <p className="text-xs text-zinc-300 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-serif">{review.name}</span>
                  <span className="flex items-center gap-1 text-[10px] text-white bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">
                    <CheckCircle className="w-3 h-3 text-white" />
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-white" />
                    {review.location}
                  </span>
                  <span className="text-amber-400/80 font-medium">{review.service}</span>
                </div>
                {review.date && (
                  <div className="text-[10px] text-zinc-500 text-right pt-0.5">
                    {review.date}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
