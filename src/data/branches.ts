export interface Branch {
  slug: string;
  displayName: string;
  cityGroup: string;
  address: string;
  contactNumber: string;
  whatsappNumber: string;
  mapLink: string | null;
  timings: string;
  isHeadOffice?: boolean;
  isComingSoon?: boolean;
}

export const branches: Branch[] = [
  // Kalyan branches
  {
    slug: "kalyan-head-office",
    displayName: "Head Office - Kalyan West",
    cityGroup: "Kalyan",
    address: "Shop No. 101, First Floor, Near Railway Station, Kalyan West - 421301",
    contactNumber: "+919876543210",
    whatsappNumber: "+919876543210",
    mapLink: "https://maps.google.com/?q=19.2437,73.1289",
    timings: "7:00 AM – 9:30 PM",
    isHeadOffice: true,
  },
  {
    slug: "kalyan-rambaug",
    displayName: "Rambaug - Kalyan West",
    cityGroup: "Kalyan",
    address: "Rambaug Lane, Near Bus Stop, Kalyan West - 421301",
    contactNumber: "+919876543211",
    whatsappNumber: "+919876543211",
    mapLink: null,
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "kalyan-khadakpada",
    displayName: "Khadakpada - Kalyan West",
    cityGroup: "Kalyan",
    address: "Beturkarpada, Khadakpada Road, Kalyan West - 421301",
    contactNumber: "+919876543212",
    whatsappNumber: "+919876543212",
    mapLink: "https://maps.google.com/?q=19.2350,73.1250",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "kalyan-tilak-chowk",
    displayName: "Tilak Chowk - Kalyan West",
    cityGroup: "Kalyan",
    address: "Tilak Chowk, Main Road, Kalyan West - 421301",
    contactNumber: "+919876543213",
    whatsappNumber: "+919876543213",
    mapLink: "https://maps.google.com/?q=19.2420,73.1320",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "kalyan-db-chowk",
    displayName: "DB Chowk - Kalyan West",
    cityGroup: "Kalyan",
    address: "DB Chowk, Near Market, Kalyan West - 421301",
    contactNumber: "+919876543214",
    whatsappNumber: "+919876543214",
    mapLink: "https://maps.google.com/?q=19.2400,73.1280",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "kalyan-chakkinaka",
    displayName: "Chakkinaka - Kalyan East",
    cityGroup: "Kalyan",
    address: "Chakkinaka Junction, Kalyan East - 421306",
    contactNumber: "+919876543215",
    whatsappNumber: "+919876543215",
    mapLink: "https://maps.google.com/?q=19.2380,73.1400",
    timings: "7:00 AM – 9:30 PM",
  },
  
  // Dombivli branches
  {
    slug: "dombivli-samrat-chowk",
    displayName: "Samrat Chowk - Dombivli",
    cityGroup: "Dombivli",
    address: "Samrat Chowk, Main Road, Dombivli East - 421201",
    contactNumber: "+919876543216",
    whatsappNumber: "+919876543216",
    mapLink: "https://maps.google.com/?q=19.2183,73.0878",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "dombivli-gupte-road",
    displayName: "Gupte Road - Dombivli",
    cityGroup: "Dombivli",
    address: "Gupte Road, Near Station, Dombivli East - 421201",
    contactNumber: "+919876543217",
    whatsappNumber: "+919876543217",
    mapLink: "https://maps.google.com/?q=19.2190,73.0890",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "dombivli-devi-chowk",
    displayName: "Devi Chowk - Dombivli",
    cityGroup: "Dombivli",
    address: "Devi Chowk, Main Market, Dombivli West - 421202",
    contactNumber: "+919876543218",
    whatsappNumber: "+919876543218",
    mapLink: "https://maps.google.com/?q=19.2150,73.0820",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "dombivli-ramnagar",
    displayName: "Ramnagar - Dombivli",
    cityGroup: "Dombivli",
    address: "Ramnagar, Near School, Dombivli East - 421201",
    contactNumber: "+919876543219",
    whatsappNumber: "+919876543219",
    mapLink: "https://maps.google.com/?q=19.2200,73.0900",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "dombivli-star-colony",
    displayName: "Star Colony - Dombivli",
    cityGroup: "Dombivli",
    address: "Star Colony, Dombivli East - 421201",
    contactNumber: "+919876543220",
    whatsappNumber: "+919876543220",
    mapLink: "https://maps.google.com/?q=19.2170,73.0860",
    timings: "7:00 AM – 9:30 PM",
  },
  
  // Thane branches
  {
    slug: "thane-lokmanya-nagar",
    displayName: "Lokmanya Nagar - Thane",
    cityGroup: "Thane",
    address: "Lokmanya Nagar, Main Road, Thane West - 400606",
    contactNumber: "+919876543221",
    whatsappNumber: "+919876543221",
    mapLink: "https://maps.google.com/?q=19.1970,72.9630",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "thane-vartak-nagar",
    displayName: "Vartak Nagar - Thane",
    cityGroup: "Thane",
    address: "Vartak Nagar, Near Bus Depot, Thane West - 400606",
    contactNumber: "+919876543222",
    whatsappNumber: "+919876543222",
    mapLink: null,
    timings: "7:00 AM – 9:30 PM",
  },
  
  // Single-branch cities
  {
    slug: "diva",
    displayName: "Diva",
    cityGroup: "Diva",
    address: "Main Road, Near Railway Station, Diva East - 400612",
    contactNumber: "+919876543223",
    whatsappNumber: "+919876543223",
    mapLink: "https://maps.google.com/?q=19.1840,73.0330",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "panvel",
    displayName: "Panvel",
    cityGroup: "Panvel",
    address: "Station Road, Near ST Stand, Panvel - 410206",
    contactNumber: "+919876543224",
    whatsappNumber: "+919876543224",
    mapLink: "https://maps.google.com/?q=18.9894,73.1175",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "badlapur",
    displayName: "Badlapur",
    cityGroup: "Badlapur",
    address: "Main Market, Near Station, Badlapur East - 421503",
    contactNumber: "+919876543225",
    whatsappNumber: "+919876543225",
    mapLink: "https://maps.google.com/?q=19.1550,73.2650",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "titwala",
    displayName: "Titwala",
    cityGroup: "Titwala",
    address: "Near Temple Road, Titwala - 421605",
    contactNumber: "+919876543226",
    whatsappNumber: "+919876543226",
    mapLink: "https://maps.google.com/?q=19.2990,73.2030",
    timings: "7:00 AM – 9:30 PM",
  },
  
  // Bhiwandi branches
  {
    slug: "bhiwandi-kongaon-1",
    displayName: "Kongaon 1 - Bhiwandi",
    cityGroup: "Bhiwandi",
    address: "Kongaon Road, Near Market, Bhiwandi - 421302",
    contactNumber: "+919876543227",
    whatsappNumber: "+919876543227",
    mapLink: "https://maps.google.com/?q=19.2810,73.0650",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "bhiwandi-kongaon-2",
    displayName: "Kongaon 2 - Bhiwandi",
    cityGroup: "Bhiwandi",
    address: "Kongaon Extension, Bhiwandi - 421302",
    contactNumber: "+919876543228",
    whatsappNumber: "+919876543228",
    mapLink: null,
    timings: "7:00 AM – 9:30 PM",
  },
  
  // Coming Soon placeholder
  {
    slug: "coming-soon",
    displayName: "New Branch - Coming Soon",
    cityGroup: "Kalyan",
    address: "Coming Soon",
    contactNumber: "",
    whatsappNumber: "",
    mapLink: null,
    timings: "Coming Soon",
    isComingSoon: true,
  },
];

export const getBranchBySlug = (slug: string): Branch | undefined => {
  return branches.find(branch => branch.slug === slug);
};

export const getBranchesByCity = (city: string): Branch[] => {
  return branches.filter(branch => branch.cityGroup === city && !branch.isComingSoon);
};

export const getActiveBranches = (): Branch[] => {
  return branches.filter(branch => !branch.isComingSoon);
};

export const getCityCounts = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  branches
    .filter(branch => !branch.isComingSoon)
    .forEach(branch => {
      counts[branch.cityGroup] = (counts[branch.cityGroup] || 0) + 1;
    });
  return counts;
};

export const getCities = (): string[] => {
  const cities = new Set(branches.filter(b => !b.isComingSoon).map(b => b.cityGroup));
  return Array.from(cities);
};
