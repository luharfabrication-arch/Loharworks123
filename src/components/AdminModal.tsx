import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ServiceItem, PortfolioItem, TestimonialItem } from '../types';
import {
  Settings,
  Phone,
  MessageSquare,
  MapPin,
  Image,
  RefreshCw,
  Save,
  Trash2,
  Plus,
  Lock,
  X,
  Check,
  Building,
  Layers,
  FileText,
  Calendar,
  Download,
  Upload,
  Star,
  MessageCircle
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    config,
    updateConfig,
    updateBusinessInfo,
    updateHero,
    updateServices,
    updatePortfolio,
    updateTestimonials,
    addTestimonial,
    deleteTestimonial,
    resetToDefault,
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    bookings,
    deleteBooking
  } = useSite();

  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'hero' | 'services' | 'gallery' | 'reviews' | 'bookings'>('gallery');
  const [saveToast, setSaveToast] = useState(false);

  if (!isAdminOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === config.adminPasscode || passcode === 'Shayanluhar123') {
      setIsAdminAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const triggerSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `luhar_website_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          if (event.target?.result) {
            const parsed = JSON.parse(event.target.result as string);
            updateConfig(parsed);
            triggerSaveNotification();
          }
        } catch (err) {
          alert("Invalid backup JSON file.");
        }
      };
    }
  };

  // Helper for reading local photo file upload to Data URL
  const handleFileUpload = (file: File, callback: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        callback(event.target.result as string);
        triggerSaveNotification();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative text-zinc-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-white border border-amber-500/20">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-white">Owner & Website Control Panel</h3>
              <p className="text-xs text-zinc-400">Manage real project photos, services, public reviews, contacts & pricing</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="text-zinc-400 hover:text-white p-2 rounded-xl bg-zinc-800 border border-zinc-700"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Lock Screen if not authenticated */}
        {!isAdminAuthenticated ? (
          <div className="p-8 max-w-md mx-auto my-auto space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-white border border-amber-500/20 mx-auto flex items-center justify-center">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold font-serif text-white">Luhar Owner Panel Access</h4>
              <p className="text-xs text-zinc-400 mt-1">Enter your confidential passcode to unlock settings.</p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-3">
              <input
                type="password"
                placeholder="Enter Confidential Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-center text-lg font-mono text-white focus:outline-none focus:border-amber-500"
              />
              {passError && <p className="text-xs text-rose-400 font-medium">Incorrect passcode. Access denied.</p>}
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-amber-500/20"
              >
                Unlock Owner Panel
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Content Area */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Navigation Tabs */}
            <div className="bg-zinc-950/60 px-6 py-2 border-b border-zinc-800 flex flex-wrap gap-2 text-xs">
              {[
                { id: 'gallery', label: 'Project Portfolio & Real Photos', icon: Image },
                { id: 'services', label: 'Services & Photos', icon: Layers },
                { id: 'reviews', label: `Public Reviews (${config.testimonials?.length || 0})`, icon: Star },
                { id: 'contact', label: 'Phone, WhatsApp & Address', icon: Phone },
                { id: 'hero', label: 'Hero Banner & Notice', icon: FileText },
                { id: 'bookings', label: `Bookings (${bookings.length})`, icon: Calendar },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                      : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5 text-white" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Scrollable Tab Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs">
              
              {/* TAB 1: PORTFOLIO GALLERY & REAL PHOTO UPLOADER */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl text-amber-300 text-xs flex items-start gap-2">
                    <Upload className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <strong>Photo Upload System:</strong> You can directly pick photo files from your phone or computer to replace AI project images with real project photos! You can also paste external image URLs or add new portfolio projects.
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <p className="font-bold text-white text-sm">Portfolio Projects & Real Photos List ({config.portfolio.length})</p>
                    <button
                      onClick={() => {
                        const newProj: PortfolioItem = {
                          id: 'proj-' + Date.now(),
                          title: 'New Real Project',
                          category: 'Civil Construction',
                          location: 'Dehradun, Uttarakhand',
                          image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=1000&q=80',
                          description: 'High quality construction & fabrication executed by Luhar team.',
                          completionYear: new Date().getFullYear().toString()
                        };
                        updatePortfolio([newProj, ...config.portfolio]);
                        triggerSaveNotification();
                      }}
                      className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-3.5 py-2 rounded-xl text-xs shadow-md shadow-amber-500/20"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {config.portfolio.map((item, idx) => (
                      <div key={item.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 relative">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-400 text-sm">#{idx + 1} {item.title}</span>
                          <button
                            onClick={() => {
                              updatePortfolio(config.portfolio.filter(p => p.id !== item.id));
                              triggerSaveNotification();
                            }}
                            className="text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                          {/* Image Preview & Upload Button */}
                          <div className="space-y-2 md:col-span-1">
                            <div className="relative h-32 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden group">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=1000&q=80';
                                }}
                              />
                            </div>

                            <label className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer text-center text-[11px] border border-zinc-700">
                              <Upload className="w-3.5 h-3.5 text-amber-400" />
                              <span>Upload Real Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    handleFileUpload(e.target.files[0], (dataUrl) => {
                                      const updated = [...config.portfolio];
                                      updated[idx].image = dataUrl;
                                      updatePortfolio(updated);
                                    });
                                  }
                                }}
                              />
                            </label>
                          </div>

                          {/* Fields Area */}
                          <div className="md:col-span-3 space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] text-zinc-400 mb-0.5">Project Title</label>
                                <input
                                  type="text"
                                  value={item.title}
                                  onChange={(e) => {
                                    const updated = [...config.portfolio];
                                    updated[idx].title = e.target.value;
                                    updatePortfolio(updated);
                                    triggerSaveNotification();
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-zinc-400 mb-0.5">Category</label>
                                <select
                                  value={item.category}
                                  onChange={(e) => {
                                    const updated = [...config.portfolio];
                                    updated[idx].category = e.target.value;
                                    updatePortfolio(updated);
                                    triggerSaveNotification();
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white"
                                >
                                  <option value="Civil Construction">Civil Construction</option>
                                  <option value="Heavy Fabrication">Heavy Fabrication</option>
                                  <option value="Modular Kitchen">Modular Kitchen</option>
                                  <option value="PVC False Ceilings">PVC False Ceilings</option>
                                  <option value="SS Railings">SS Railings</option>
                                  <option value="Teen Shed">Teen Shed</option>
                                  <option value="Interiors & Other">Interiors & Other</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[10px] text-zinc-400 mb-0.5">Location</label>
                                <input
                                  type="text"
                                  value={item.location}
                                  onChange={(e) => {
                                    const updated = [...config.portfolio];
                                    updated[idx].location = e.target.value;
                                    updatePortfolio(updated);
                                    triggerSaveNotification();
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-zinc-400 mb-0.5">Completion Year</label>
                                <input
                                  type="text"
                                  value={item.completionYear}
                                  onChange={(e) => {
                                    const updated = [...config.portfolio];
                                    updated[idx].completionYear = e.target.value;
                                    updatePortfolio(updated);
                                    triggerSaveNotification();
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] text-zinc-400 mb-0.5">Or Paste Direct Image Link / Data URL</label>
                              <input
                                type="text"
                                value={item.image}
                                onChange={(e) => {
                                  const updated = [...config.portfolio];
                                  updated[idx].image = e.target.value;
                                  updatePortfolio(updated);
                                  triggerSaveNotification();
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white font-mono text-[11px]"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-zinc-400 mb-0.5">Project Description</label>
                              <textarea
                                rows={2}
                                value={item.description}
                                onChange={(e) => {
                                  const updated = [...config.portfolio];
                                  updated[idx].description = e.target.value;
                                  updatePortfolio(updated);
                                  triggerSaveNotification();
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: SERVICES & SERVICE PHOTOS */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <p className="font-bold text-white text-sm">Manage Services, Photos & Pricing</p>
                    <button
                      onClick={() => {
                        const newSrv: ServiceItem = {
                          id: 'srv-' + Date.now(),
                          title: 'New Service',
                          tagline: 'Custom Luhar Solution',
                          category: 'Fabrication',
                          description: 'High quality fabrication and construction work.',
                          image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
                          features: ['Material Quality Guarantee', 'On-Site Fitting'],
                          startingPrice: '₹200',
                          unit: 'per sq. ft.',
                          popular: false
                        };
                        updateServices([...config.services, newSrv]);
                        triggerSaveNotification();
                      }}
                      className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-3.5 py-1.5 rounded-xl text-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Service</span>
                    </button>
                  </div>

                  {config.services.map((srv, idx) => (
                    <div key={srv.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400 text-sm">#{idx + 1} {srv.title}</span>
                        <button
                          onClick={() => {
                            updateServices(config.services.filter(s => s.id !== srv.id));
                            triggerSaveNotification();
                          }}
                          className="text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-500/10 px-2 py-1 rounded-lg border border-rose-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                        {/* Service Photo Preview & Upload */}
                        <div className="space-y-2 md:col-span-1">
                          <div className="relative h-28 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden">
                            <img
                              src={srv.image}
                              alt={srv.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80';
                              }}
                            />
                          </div>
                          <label className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer text-center text-[11px] border border-zinc-700">
                            <Upload className="w-3.5 h-3.5 text-amber-400" />
                            <span>Upload Real Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleFileUpload(e.target.files[0], (dataUrl) => {
                                    const updated = [...config.services];
                                    updated[idx].image = dataUrl;
                                    updateServices(updated);
                                  });
                                }
                              }}
                            />
                          </label>
                        </div>

                        {/* Service Fields */}
                        <div className="md:col-span-3 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] text-zinc-400 mb-0.5">Service Title</label>
                              <input
                                type="text"
                                value={srv.title}
                                onChange={(e) => {
                                  const updated = [...config.services];
                                  updated[idx].title = e.target.value;
                                  updateServices(updated);
                                  triggerSaveNotification();
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-zinc-400 mb-0.5">Starting Price (INR)</label>
                              <input
                                type="text"
                                value={srv.startingPrice}
                                onChange={(e) => {
                                  const updated = [...config.services];
                                  updated[idx].startingPrice = e.target.value;
                                  updateServices(updated);
                                  triggerSaveNotification();
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-zinc-400 mb-0.5">Unit (e.g. per sq. ft.)</label>
                              <input
                                type="text"
                                value={srv.unit}
                                onChange={(e) => {
                                  const updated = [...config.services];
                                  updated[idx].unit = e.target.value;
                                  updateServices(updated);
                                  triggerSaveNotification();
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-400 mb-0.5">Photo Image Link / URL</label>
                            <input
                              type="text"
                              value={srv.image}
                              onChange={(e) => {
                                const updated = [...config.services];
                                updated[idx].image = e.target.value;
                                updateServices(updated);
                                triggerSaveNotification();
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white font-mono text-[11px]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-400 mb-0.5">Description</label>
                            <textarea
                              rows={2}
                              value={srv.description}
                              onChange={(e) => {
                                const updated = [...config.services];
                                updated[idx].description = e.target.value;
                                updateServices(updated);
                                triggerSaveNotification();
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: CUSTOMER REVIEWS & RATINGS MANAGEMENT */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <div>
                      <p className="font-bold text-white text-sm">Public Ratings & Reviews Management</p>
                      <p className="text-xs text-zinc-400">View, add, or remove public customer reviews.</p>
                    </div>
                    <button
                      onClick={() => {
                        addTestimonial({
                          name: 'Satisfied Customer',
                          location: 'Dehradun, Uttarakhand',
                          service: 'Civil Construction',
                          rating: 5,
                          comment: 'Excellent craftsmanship and timely delivery by Luhar team.'
                        });
                        triggerSaveNotification();
                      }}
                      className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-3 py-1.5 rounded-xl text-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Manual Review</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {config.testimonials?.map((rev, idx) => (
                      <div key={rev.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{rev.name}</span>
                            <div className="flex items-center text-amber-400">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400" />
                              ))}
                            </div>
                            <span className="text-[10px] text-zinc-400 font-mono">({rev.rating}/5)</span>
                          </div>
                          <p className="text-zinc-300 italic text-xs">"{rev.comment}"</p>
                          <div className="text-[10px] text-zinc-400 flex items-center gap-3">
                            <span>📍 {rev.location}</span>
                            <span>🛠️ {rev.service}</span>
                            {rev.date && <span>📅 {rev.date}</span>}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            deleteTestimonial(rev.id);
                            triggerSaveNotification();
                          }}
                          className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 px-3 py-1.5 rounded-lg border border-rose-500/30 flex items-center gap-1 shrink-0 self-start sm:self-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Review</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CONTACT & WHATSAPP */}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-amber-300 text-xs">
                    💡 <strong>Pro Tip:</strong> Updating contact numbers or address here will immediately update all call links, WhatsApp buttons, and map locations across the entire website.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-zinc-300 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={config.business.name}
                        onChange={(e) => {
                          updateBusinessInfo({ name: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-300 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={config.business.tagline}
                        onChange={(e) => {
                          updateBusinessInfo({ tagline: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-300 mb-1">WhatsApp Number (e.g. 918171104183)</label>
                      <input
                        type="text"
                        value={config.business.whatsappNumber}
                        onChange={(e) => {
                          updateBusinessInfo({ whatsappNumber: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-300 mb-1">Primary Phone Number</label>
                      <input
                        type="text"
                        value={config.business.phonePrimary}
                        onChange={(e) => {
                          updateBusinessInfo({ phonePrimary: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-300 mb-1">Secondary Phone Number</label>
                      <input
                        type="text"
                        value={config.business.phoneSecondary}
                        onChange={(e) => {
                          updateBusinessInfo({ phoneSecondary: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={config.business.email}
                        onChange={(e) => {
                          updateBusinessInfo({ email: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-300 mb-1">City, State & Pincode</label>
                      <input
                        type="text"
                        value={config.business.cityStatePincode}
                        onChange={(e) => {
                          updateBusinessInfo({ cityStatePincode: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-300 mb-1">Business Working Hours</label>
                      <input
                        type="text"
                        value={config.business.businessHoursWeekdays}
                        onChange={(e) => {
                          updateBusinessInfo({ businessHoursWeekdays: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Address Line 1</label>
                    <input
                      type="text"
                      value={config.business.addressLine1}
                      onChange={(e) => {
                        updateBusinessInfo({ addressLine1: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white mb-2"
                    />
                    <label className="block font-bold text-zinc-300 mb-1">Address Line 2</label>
                    <input
                      type="text"
                      value={config.business.addressLine2}
                      onChange={(e) => {
                        updateBusinessInfo({ addressLine2: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Google Maps Direct Link URL</label>
                    <input
                      type="text"
                      value={config.business.googleMapDirectUrl}
                      onChange={(e) => {
                        updateBusinessInfo({ googleMapDirectUrl: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white font-mono"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: HERO BANNER & TEXT */}
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={config.hero.badgeText}
                      onChange={(e) => {
                        updateHero({ badgeText: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Title Heading</label>
                    <input
                      type="text"
                      value={config.hero.titleHeading}
                      onChange={(e) => {
                        updateHero({ titleHeading: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Highlighted Words</label>
                    <input
                      type="text"
                      value={config.hero.titleHighlighted}
                      onChange={(e) => {
                        updateHero({ titleHighlighted: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Subtitle Description</label>
                    <textarea
                      rows={3}
                      value={config.hero.subtitle}
                      onChange={(e) => {
                        updateHero({ subtitle: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Announcement Notice Banner</label>
                    <input
                      type="text"
                      value={config.hero.bannerNotice}
                      onChange={(e) => {
                        updateHero({ bannerNotice: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: CUSTOMER BOOKINGS DASHBOARD */}
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  <p className="font-bold text-white border-b border-zinc-800 pb-2">
                    Customer Site Visit Requests ({bookings.length})
                  </p>

                  {bookings.length === 0 ? (
                    <div className="p-8 text-center bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-400">
                      No customer bookings submitted yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookings.map((bk) => (
                        <div key={bk.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-amber-400">{bk.customerName}</span>
                              <span className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded font-mono">{bk.id}</span>
                            </div>
                            <p className="text-zinc-300 font-semibold mt-0.5">Phone: {bk.phone}</p>
                            <p className="text-zinc-400 text-[11px]">Address: {bk.address}, Pincode: {bk.pincode}</p>
                            <p className="text-zinc-400 text-[11px]">Preferred Date: {bk.preferredDate} ({bk.preferredTime})</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/${config.business.whatsappNumber}?text=${encodeURIComponent(`Hi ${bk.customerName}, regarding your Luhar site visit request ${bk.id}...`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                            <button
                              onClick={() => deleteBooking(bk.id)}
                              className="bg-rose-900/60 hover:bg-rose-800 text-rose-200 p-2 rounded-lg text-xs"
                              title="Delete Booking"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Bottom Utility Footer */}
            <div className="bg-zinc-950 px-6 py-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={resetToDefault}
                  className="flex items-center gap-1 text-zinc-400 hover:text-rose-400 transition-colors"
                  title="Reset all content back to original Luhar defaults"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Default Data</span>
                </button>

                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-1 text-zinc-400 hover:text-amber-400 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Backup Config JSON</span>
                </button>
              </div>

              {saveToast && (
                <div className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved to localStorage!</span>
                </div>
              )}

              <button
                onClick={() => setIsAdminOpen(false)}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-1.5 rounded-lg text-xs"
              >
                Done & Close
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
