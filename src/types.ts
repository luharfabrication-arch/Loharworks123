export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  startingPrice: string;
  unit: string; // e.g. "per sq ft", "per rft", "per kg"
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  completionYear: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  yearsOfExperience: number;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  cityStatePincode: string;
  googleMapEmbedUrl: string;
  googleMapDirectUrl: string;
  businessHoursWeekdays: string;
  businessHoursWeekend: string;
  aboutTextShort: string;
  aboutTextLong: string;
}

export interface HeroConfig {
  badgeText: string;
  titleHeading: string;
  titleHighlighted: string;
  subtitle: string;
  heroImage: string;
  bannerNotice: string;
}

export interface SiteConfig {
  business: BusinessInfo;
  hero: HeroConfig;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  adminPasscode: string;
}

export interface BookingRequest {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  visitType: 'site_measurement' | 'showroom' | 'phone_consultation';
  address: string;
  pincode: string;
  notes?: string;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
}

export interface QuoteCalculationInput {
  serviceId: string;
  sizeValue: number; // Area or length
  materialTier: 'Standard' | 'Premium' | 'Heavy Duty / Luxury';
  includeInstallation: boolean;
  notes?: string;
}

export interface QuoteResult {
  serviceName: string;
  sizeValue: number;
  unit: string;
  materialTier: string;
  estimatedRatePerUnit: number;
  subtotal: number;
  installationFee: number;
  totalEstimatedMin: number;
  totalEstimatedMax: number;
}
