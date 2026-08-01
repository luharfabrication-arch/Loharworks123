import { SiteConfig } from '../types';

import heroBannerImg from '../assets/images/luhar_hero_banner_1785392544384.jpg';
import kitchenImg from '../assets/images/luhar_modular_kitchen_1785392562041.jpg';
import fabricationImg from '../assets/images/luhar_fabrication_railings_1785392581805.jpg';

export const defaultConfig: SiteConfig = {
  business: {
    name: "Luhar",
    tagline: "Build on Trust",
    yearsOfExperience: 35,
    phonePrimary: "+91 81711 04183",
    phoneSecondary: "+91 98971 04183",
    whatsappNumber: "918171104183",
    email: "luharfabrecation@gmail.com",
    addressLine1: "68, Nala Pani Road",
    addressLine2: "Dehradun",
    cityStatePincode: "Dehradun, Uttarakhand - 248001",
    googleMapEmbedUrl: "https://maps.google.com/maps?q=68+Nala+Pani+Road+Dehradun+Uttarakhand+248001&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapDirectUrl: "https://maps.app.goo.gl/g5pDiT8Rz4jWEp8HA?g_st=ac",
    businessHoursWeekdays: "Open 24/7 (All 7 Days - Working 24*7)",
    businessHoursWeekend: "No Weekend Breaks - 24 Hours Service Available",
    aboutTextShort: "With over 35 years of unyielding dedication and craftsmanship in India, Luhar is a trusted pioneer in civil construction, structural fabrication, modular kitchens, PVC ceilings, luxury interior work, SS railings, and heavy-duty teen sheds.",
    aboutTextLong: "Founded over three and a half decades ago, Luhar has established an unmatched reputation for precision engineering, transparent material grading, and rock-solid durability. Whether constructing multi-story buildings, engineering heavy industrial metal sheds, customizing acrylic/laminate modular kitchens, or designing elegant PVC false ceilings and toughened glass railings, our master craftsmen and engineers deliver exceptional quality at direct factory prices."
  },
  hero: {
    badgeText: "35+ Years of Legacy in Construction & Fabrication Across Uttarakhand & India",
    titleHeading: "Crafting Strong Foundations & Elegant Interiors",
    titleHighlighted: "Built on Trust",
    subtitle: "From heavy civil construction & industrial metal sheds to luxury modular kitchens, PVC ceilings & SS glass railings. Experience 35+ years of Indian engineering excellence with zero compromise on quality.",
    heroImage: heroBannerImg,
    bannerNotice: "⚡ Free On-Site Site Measurement & Instant WhatsApp Consultation Available Across Dehradun & Surrounding Regions!"
  },
  services: [
    {
      id: "construction",
      title: "Civil Construction",
      tagline: "Residential & Commercial Turnkey Construction",
      category: "Construction",
      description: "Complete building construction from foundation to final plaster & paint. Reinforced concrete, brickwork, slab casting, and structural safety with top-grade steel and cement.",
      image: heroBannerImg,
      features: [
        "Turnkey Residential Homes & Villas",
        "Commercial Outlets & Office Shells",
        "Foundation, Column & Slab Casting",
        "A-Grade Bricks & TMT Rebar Steel",
        "Architectural Plan Execution"
      ],
      startingPrice: "",
      unit: "sq. ft.",
      popular: true
    },
    {
      id: "fabrication",
      title: "Heavy & Architectural Fabrication",
      tagline: "Iron Gates, Safety Grills & Structural Steel Work",
      category: "Fabrication",
      description: "Custom heavy-duty iron gates, MS main entrance doors, security grills, window frame structures, staircases, and industrial iron framing engineered for 50+ years of durability.",
      image: fabricationImg,
      features: [
        "Automatic & Manual Main Gates",
        "Heavy Security Window Grills",
        "Structural Steel Beams & Columns",
        "Anti-Rust Zinc Chromate Primer",
        "Custom Ornamental & Modern Designs"
      ],
      startingPrice: "",
      unit: "sq. ft.",
      popular: true
    },
    {
      id: "modular-kitchen",
      title: "Modular Kitchens",
      tagline: "L-Shape, U-Shape & Island Kitchen Interiors",
      category: "Interior",
      description: "Custom waterproof HDMR and acrylic modular kitchens with soft-close drawers, pull-out pantry units, granite/quartz countertops, and stainless steel baskets.",
      image: kitchenImg,
      features: [
        "Waterproof HDMR & Boiling Waterproof Plywood",
        "High-Gloss Acrylic & Laminate Finishes",
        "Hettich / Ebco Hydraulic Soft-Close Fittings",
        "Custom Chimney & Cooktop Fitting",
        "Maximised Corner Storage Solutions"
      ],
      startingPrice: "",
      unit: "sq. ft.",
      popular: true
    },
    {
      id: "pvc-ceiling",
      title: "PVC False Ceilings",
      tagline: "Waterproof, Termite-Proof & Seamless Ceiling Designs",
      category: "Ceiling & Interior",
      description: "Modern, maintenance-free PVC panel false ceilings with integrated LED groove channels, cove lighting, and heat insulation. Perfect for living rooms, bedrooms, and commercial spaces.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      features: [
        "100% Waterproof & Fire-Retardant PVC",
        "No Painting Required (Pre-finished designs)",
        "Integrated LED Strip Light Channels",
        "Termite Proof & Damp-Proof Guarantee",
        "Quick 2-Day Clean Installation"
      ],
      startingPrice: "",
      unit: "sq. ft.",
      popular: false
    },
    {
      id: "railings",
      title: "SS & Toughened Glass Railings",
      tagline: "Balcony, Staircase & Roof Perimeter Railings",
      category: "Railings & Steel",
      description: "Premium SS 304 grade stainless steel railings, toughened glass balcony panels, and aluminum sleek glass railings with heavy brass/SS fittings.",
      image: fabricationImg,
      features: [
        "Rust-Proof SS 304 & SS 316 Grade",
        "10mm - 12mm Toughened Safety Glass",
        "Seamless Wooden Handrail Accents",
        "Balcony & Internal Staircase Fitting",
        "Tested for High Wind & Load Pressure"
      ],
      startingPrice: "",
      unit: "running ft.",
      popular: true
    },
    {
      id: "teen-shed",
      title: "Teen Shed / Tin Roofing & Metal Canopy",
      tagline: "Industrial Warehouse, Terrace & Factory Roofing",
      category: "Roofing & Shed",
      description: "Heavy steel truss tin sheds, color-coated Tata Shaktee/JSW corrugated sheet roofs, polycarbonate transparent terrace light sheds, and factory warehouse structures.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
      features: [
        "Tata / JSW Color Coated Galvanized Sheets",
        "Heavy Tubular Steel Truss Framework",
        "Water Leakproof Flashing & Gutters",
        "Polycarbonate Daylight Roof Panels",
        "High Storm & Heat Resistance"
      ],
      startingPrice: "",
      unit: "sq. ft.",
      popular: true
    },
    {
      id: "interior-decor",
      title: "Interior Decoration & Renovation",
      tagline: "Full Turnkey Home & Office Interiors",
      category: "Interior",
      description: "Comprehensive interior design, wooden wall fluted panels, TV unit backdrop, wardrobe installation, false partition walls, and lighting design.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80",
      features: [
        "Custom Wardrobes & TV Units",
        "Charcoal & Louver Fluted Wall Panels",
        "Partition Glass & Metal Screens",
        "Wooden Flooring & Vinyl Planks",
        "3D Design Render Consultation"
      ],
      startingPrice: "",
      unit: "sq. ft.",
      popular: false
    }
  ],
  portfolio: [
    {
      id: "proj-1",
      title: "Modern Duplex Villa Civil & Steel Work",
      category: "Construction",
      location: "Vasundhara, Ghaziabad",
      image: heroBannerImg,
      description: "Full turnkey 3-story civil construction with custom SS 304 glass railings and automated entrance gate.",
      completionYear: "2024"
    },
    {
      id: "proj-2",
      title: "High-Gloss Acrylic Modular Kitchen",
      category: "Modular Kitchen",
      location: "Sector 62, Noida",
      image: kitchenImg,
      description: "Italian style L-shaped kitchen featuring quartz stone slab, waterproof HDMR cabinets, and Tandem soft-close drawers.",
      completionYear: "2024"
    },
    {
      id: "proj-3",
      title: "Heavy Industrial Factory Tin Shed (12,000 sq ft)",
      category: "Teen Shed",
      location: "Greater Noida Industrial Area",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
      description: "Engineered steel truss frame with JSW color-coated heat reflective sheets and skylight illumination strips.",
      completionYear: "2023"
    },
    {
      id: "proj-4",
      title: "PVC False Ceiling & Warm Ambient Lighting",
      category: "PVC Ceiling",
      location: "Rohini, New Delhi",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      description: "Seamless wood-grain finish PVC ceiling for 2,400 sq ft penthouse with cove LED channels.",
      completionYear: "2024"
    },
    {
      id: "proj-5",
      title: "Toughened Glass & SS Balcony Railings",
      category: "Railings",
      location: "Gurugram, Haryana",
      image: fabricationImg,
      description: "12mm clear toughened glass fitted with heavy grade SS 304 spigots across 120 running feet terrace.",
      completionYear: "2024"
    },
    {
      id: "proj-6",
      title: "Custom Decorative Main Iron Gate & Security Grills",
      category: "Fabrication",
      location: "Faridabad, NCR",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      description: "Laser-cut CNC metal sheet main gate with electro-galvanized anti-rust black gold finish.",
      completionYear: "2023"
    }
  ],
  testimonials: [
    {
      id: "rev-1",
      name: "Rajesh Sharma",
      location: "Noida Sector 44",
      service: "Civil Construction & Railings",
      rating: 5,
      comment: "Luhar team built our 3-story house from foundation to finish. Their 35+ years of experience really shows. Transparent steel weighing, zero hidden costs, and delivered 2 weeks before time!",
      date: "May 2024"
    },
    {
      id: "rev-2",
      name: "Sanjay Verma",
      location: "Industrial Area, Okhla",
      service: "Teen Shed Fabrication",
      rating: 5,
      comment: "Got a 8,000 sq. ft. factory tin shed built by Luhar. The truss stability and rainwater flashing work was flawless. Best industrial fabrication quality in Delhi NCR.",
      date: "March 2024"
    },
    {
      id: "rev-3",
      name: "Pooja Gupta",
      location: "Indirapuram, Ghaziabad",
      service: "Modular Kitchen & PVC Ceiling",
      rating: 5,
      comment: "Super impressed with the acrylic modular kitchen and PVC ceiling in our hall. Their team came for site measurement, gave an accurate quote, and finished installation smoothly.",
      date: "June 2024"
    },
    {
      id: "rev-4",
      name: "Amit Patel",
      location: "Faridabad",
      service: "SS Glass Railings & Iron Gate",
      rating: 5,
      comment: "Solid SS 304 quality railings and a beautiful laser-cut main gate. Luhar stands by their tagline 'Build on Trust'. Very professional craftsmen.",
      date: "February 2024"
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "How long has Luhar been in the construction and fabrication industry?",
      answer: "Luhar has been serving customers with pride and integrity for over 35 years. Our long-standing legacy in civil construction, metal fabrication, modular kitchens, and roofing is built on trust, transparency, and top-tier craftsmanship."
    },
    {
      id: "faq-2",
      question: "Do you offer free site visits and cost estimations?",
      answer: "Yes! We provide 100% free on-site measurement and consultation across Delhi NCR and nearby regions. You can also use our interactive Online Price Calculator or click the WhatsApp button to get an instant estimate."
    },
    {
      id: "faq-3",
      question: "What material grades do you use for SS Railings and Metal Fabrication?",
      answer: "We strictly use genuine SS 304 grade stainless steel (rust-proof guarantee) and prime Tata / JSW steel for fabrication. All iron gates and sheds are coated with anti-rust primers and weather-resistant industrial paints."
    },
    {
      id: "faq-4",
      question: "Can I customize the design of my modular kitchen or PVC false ceiling?",
      answer: "Absolutely! Every project is tailor-made to your exact dimensions, color preferences, and layout requirements (L-shape, U-shape, parallel, wood texture PVC, high-gloss acrylic, etc.)."
    },
    {
      id: "faq-5",
      question: "How do I book a site measurement or consultation?",
      answer: "You can book directly on this website using the 'Book Free Measurement' form, call us directly on our primary phone number, or send us a quick WhatsApp message."
    }
  ],
  adminPasscode: "Shayanluhar123"
};
