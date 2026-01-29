export const site = {
  name: "SmartByte Computer Education",
  tagline: "Chalo Digitally Smart Bane",
  description: "Govt. Authorized Training Center providing quality computer education since 2005. Learn CCC, Tally, Advanced Excel, Cybersecurity, Python and more.",
  
  // Trust metrics (must appear in multiple places)
  trust: {
    govtAuthorized: "Govt. Authorized Training Center",
    since: "Since 2005",
    students: "45,000+",
    studentsLabel: "Students Trained",
    branches: "19",
    branchesLabel: "Branches",
  },
  
  // Head Office WhatsApp fallback
  whatsappHO: "+919876543210", // Placeholder - update with real number
  
  // SEO defaults
  seo: {
    domain: "https://smartbytecomputers.com",
    defaultTitle: "SmartByte Computer Education - Chalo Digitally Smart Bane",
    defaultDescription: "Learn computer skills from Maharashtra's trusted training center. CCC, Tally, Advanced Excel, Cybersecurity, Python courses. 45,000+ students trained since 2005.",
    defaultImage: "/og-image.jpg",
  },
  
  // Default timings for all branches
  defaultTimings: "7:00 AM – 9:30 PM",
  
  // Social links (placeholders)
  social: {
    facebook: "https://facebook.com/smartbytecomputers",
    instagram: "https://instagram.com/smartbytecomputers",
    youtube: "https://youtube.com/smartbytecomputers",
  },
  
  // Locations covered
  cities: ["Kalyan", "Dombivli", "Thane", "Diva", "Panvel", "Badlapur", "Titwala", "Bhiwandi"],
} as const;

export type Site = typeof site;
