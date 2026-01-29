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
    address: "101, Blue Pearl CHS, Rambaug Lane No. 2, Near Manish Wines, Kalyan West, Mumbai, Maharashtra 421301",
    contactNumber: "+917304006693",
    whatsappNumber: "+917304006693",
    mapLink: "https://www.google.com/maps?s=web&rlz=1C1GCEA_enIN1197IN1197&sca_esv=9236cc086a353fe5&lqi=ChxzbWFydGJ5dGUgY29tcHV0ZXIgZWR1Y2F0aW9uSMmN25Hgs4CACFoqEAAQARACGAAYARgCIhxzbWFydGJ5dGUgY29tcHV0ZXIgZWR1Y2F0aW9ukgEQZWR1Y2F0aW9uX2NlbnRlcg&vet=12ahUKEwiu8cvImaaSAxVdUWwGHVqAI-kQ1YkKegQIMRAB..i&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KZUs_H4ol-c7Ma2qZEiN8zSA&daddr=1+Floor+Blue+Pearl+Society,+Santoshi+Mata+Road,+Rambaug+Lane+Number+2,+Rambaug,+Kalyan,+Maharashtra+421301",
    timings: "7:00 AM – 9:30 PM",
    isHeadOffice: true,
  },
  {
    slug: "kalyan-rambaug",
    displayName: "Rambaug - Kalyan West",
    cityGroup: "Kalyan",
    address: "Salas Building., Opp. Kalyan Janata Sahkari Bank, Nr. Satyam Hospital Rambaug-4 Kalyan Kalyan, Maharashtra 421301",
    contactNumber: "+918828135423",
    whatsappNumber: "+918828135423",
    mapLink: null,
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "kalyan-khadakpada",
    displayName: "Khadakpada - Kalyan West",
    cityGroup: "Kalyan",
    address: "Shop Number 5, Shree Murti Apartment, Opposite Panchmukhi Hanuman Mandir, Near Garam Masala Hotel, Beturkar Pada, Kalyan, Maharashtra 421301",
    contactNumber: "+918454095051",
    whatsappNumber: "+918454095051",
    mapLink: "https://www.google.com/maps/dir//''/@19.2504324,73.1268397,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be797a51cce7d67:0xde6bbccba2e9a4c0!2m2!1d73.1329185!2d19.24999?hl=en-GB&authuser=0&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "kalyan-tilak-chowk",
    displayName: "Tilak Chowk - Kalyan West",
    cityGroup: "Kalyan",
    address: "Shop No. 2, Shree Sai Guru CHS, Murlidhar Ali, Parnaka Rd, Opp. Haveli Mandir, Opp. Apex Hospital, Tilak Chowk, Kalyan, Maharashtra 421301",
    contactNumber: "+919004295627",
    whatsappNumber: "+919004295627",
    mapLink: "https://www.google.com/maps/dir//''/@19.253885,73.1395917,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be795fe9a019789:0xab61559005f72851!2m2!1d73.1236506!2d19.2443394?hl=en-GB&authuser=0&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "kalyan-db-chowk",
    displayName: "DB Chowk - Kalyan West",
    cityGroup: "Kalyan",
    address: "Shop Number 5, Thakkar Park, DB Chowk, Umbarde Rd, Opposite Appaji Dham, Chanakya Nagar, Khadakpada, Kalyan, Maharashtra 421301",
    contactNumber: "+919833445817",
    whatsappNumber: "+919833445817",
    mapLink: "https://www.google.com/maps/dir//Shop+Number+5,+Thakkar+Park,+DB+Chowk,+Umbarde+Rd,+opposite+Appaji+Dham,+Chanakya+Nagar,+Khadakpada,+Kalyan,+Maharashtra+421301/@19.2566653,73.1238847,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be7974163c55d65:0x3d78809a72f8f206!2m2!1d73.1288387!2d19.2624936?hl=en-GB&authuser=0&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "kalyan-chakkinaka",
    displayName: "Chakkinaka - Kalyan East",
    cityGroup: "Kalyan",
    address: "07, Radhika Apt, Near HDFC ATM, Chakkinaka Circle, Near St.Mary School, Kalyan East, Maharashtra 421306",
    contactNumber: "+918898350468",
    whatsappNumber: "+918898350468",
    mapLink: "https://www.google.com/maps/dir//07,+Radhika+Apt,+Near+HDFC+ATM,+Chakkinaka+Circle,+near+St.Mary+School,+Kalyan+East,+Maharashtra+421306/@19.2566653,73.1238847,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be7b9a192808f4f:0x4e9710fe2be2b663!2m2!1d73.12707!2d19.224499?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },

  // Dombivli branches
  {
    slug: "dombivli-samrat-chowk",
    displayName: "Samrat Chowk - Dombivli West",
    cityGroup: "Dombivli",
    address: "Shop No. 4, Tirupati Heights, Pandit Din Dayal Road, Samrat Circle, Near Deepak Medical, Dombivli West",
    contactNumber: "+917304089933",
    whatsappNumber: "+917304089933",
    mapLink: "https://www.google.com/maps/dir//Shop+No+2,+Tirupati+Heights,+Pandit+Din+Dayal+Upadhyay+Road,+Jai+Hind+Colony,+Shastri+Nagar,+Dombivli+West,+Mumbai,+Dombivli,+Maharashtra+421202/@19.2592734,73.12308,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be7bf27197f13f3:0xd7c591935fa7d046!2m2!1d73.0815358!2d19.2228875?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "dombivli-gupte-road",
    displayName: "Gupte Road - Dombivli West",
    cityGroup: "Dombivli",
    address: "Shop Number 12, Om Guru Dutta Prasad, Ghanshyam Gupte Marg, Near Shankar Mandir, Jai Hind Colony, Dombivli West, Dombivli, Maharashtra 421202",
    contactNumber: "+917304723363",
    whatsappNumber: "+917304723363",
    mapLink: "https://www.google.com/maps/dir//''/@19.2571836,73.1249201,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be7bf51b6ebef45:0x50ce7d5aa2435c57!2m2!1d73.0835092!2d19.2250069?hl=en-GB&authuser=0&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "dombivli-devi-chowk",
    displayName: "Devi Chowk - Dombivli",
    cityGroup: "Dombivli",
    address: "School, Devi Chowk, Guari Shankar Apartment, Opp. Siddhivinayak Banquet Hall, Near Swami Vivekanand Road, Dombivli, Maharashtra 421202",
    contactNumber: "+919930508155",
    whatsappNumber: "+919930508155",
    mapLink: "https://www.google.com/maps/dir//''/@19.2566653,73.1238847,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be7bf81db712969:0xada99ca80fd35f78!2m2!1d73.0825155!2d19.2193367?hl=en-GB&authuser=0&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "dombivli-ramnagar",
    displayName: "Ramnagar - Dombivli East",
    cityGroup: "Dombivli",
    address: "Shop Number 1, Nehte Nivas, Shiv Mandir Chowk, Opposite Sai Jyot Hospital, Ramnagar, Dombivli East, Dombivli, Maharashtra 421201",
    contactNumber: "+917715907404",
    whatsappNumber: "+917715907404",
    mapLink: "https://www.google.com/maps/dir//''/@19.2566653,73.1238847,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be795b2425f38d3:0xa1c3f1292478328b!2m2!1d73.0884294!2d19.2135922?hl=en-GB&authuser=0&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "dombivli-star-colony",
    displayName: "Star Colony - Dombivli East",
    cityGroup: "Dombivli",
    address: "Shop No. 2, Ganubai Sadan, Manpada Rd, Near Sai Baba Mandir, Star Colony, Sagaon, Dombivli East, Maharashtra 421204",
    contactNumber: "+917039320112",
    whatsappNumber: "+917039320112",
    mapLink: "https://www.google.com/maps?s=web&rlz=1C1GCEA_enIN1197IN1197&sca_esv=9236cc086a353fe5&lqi=ChxzbWFydGJ5dGUgY29tcHV0ZXIgZWR1Y2F0aW9uSPT_qMLmvICACFoqEAAQARACGAAYARgCIhxzbWFydGJ5dGUgY29tcHV0ZXIgZWR1Y2F0aW9ukgEQZWR1Y2F0aW9uX2NlbnRlcg&vet=12ahUKEwji2JaxmaaSAxWZSGcHHZ0nMIYQ1YkKegQIOhAB..i&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KUG_6WAqlec7MUo2IhkMRiYW&daddr=Shop+Number+2,+Ganubai+Sadan,+Manpada+Rd,+near+Sai+Baba+Mandir,+Star+Colony,+Sagaon,+Dombivli+East,+Dombivli,+Maharashtra+421204",
    timings: "7:00 AM – 9:30 PM",
  },

  // Thane branches
  {
    slug: "thane-lokmanya-nagar",
    displayName: "Lokmanya Nagar - Thane",
    cityGroup: "Thane",
    address: "Shop No.8, Siddhivinayak CHS, Oppo Hema Apartment, Sawarkar Nagar, Lokmanya Nagar, Thane, Maharashtra 400606",
    contactNumber: "+918123252205",
    whatsappNumber: "+918123252205",
    mapLink: "https://www.google.com/maps/dir//Shop+no.8,+Siddhivinayak+CHS,+Oppo+Hema+apartment,+Sawarkar+Nagar,+Lokmanya+Nagar,+Thane,+Maharashtra+400606/@19.2551358,73.121702,14.71z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be7b9daa1c8f0e7:0x83b92123deb05932!2m2!1d72.9533064!2d19.2085747?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "thane-vartak-nagar",
    displayName: "Vartak Nagar - Thane",
    cityGroup: "Thane",
    address: "Shop No.1, Trimbakeshwar Apartment, Lokamanya Nagar Pada No.1, Near Hanuman Mandir. Vartak Nagar. Thane 400606",
    contactNumber: "+918454897725",
    whatsappNumber: "+918454897725",
    mapLink: null,
    timings: "7:00 AM – 9:30 PM",
  },

  // Single-branch cities
  {
    slug: "diva",
    displayName: "Diva",
    cityGroup: "Diva",
    address: "Shop No. 2, Moreshwar Galaxy, Mumbra Devi Colony Rd, Near Warekar School, Prashant Nagar, Sadguru Nagar, Diva, Thane, Maharashtra 400612",
    contactNumber: "+919326548663",
    whatsappNumber: "+919326548663",
    mapLink: "https://www.google.com/maps/dir//''/@19.2566653,73.1238847,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be7bf288b27df83:0x71be8d6b94611f05!2m2!1d73.0450171!2d19.1867982?hl=en-GB&authuser=0&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "panvel",
    displayName: "Panvel",
    cityGroup: "Panvel",
    address: "Shop No. 02, Shree Sai Palace, Vichumbe Rd, Near Domino's Pizza, New Panvel East, Usarli Khurd, Navi Mumbai, Maharashtra 410206",
    contactNumber: "+919136005897",
    whatsappNumber: "+919136005897",
    mapLink: "https://www.google.com/maps/dir//Shop+No.+02,+Shree+Sai+Palace,+Vichumbe+Rd,+near+Domino's+Pizza,+New+Panvel+East,+Usarli+Khurd,+Navi+Mumbai,+Maharashtra+410206/@19.2568297,73.1238847,15.25z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be7e9a7fb16eba3:0x196237cfbe156669!2m2!1d73.1301041!2d18.9854417?hl=en-GB&authuser=0&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "badlapur",
    displayName: "Badlapur",
    cityGroup: "Badlapur",
    address: "Shop No. 4, Ashwamedh Co-op Society, Shivaji Chowk Rd, Opp. Union Bank / Mahadik Hospital, Kulgaon, Badlapur, Maharashtra 421503",
    contactNumber: "+919152122320",
    whatsappNumber: "+919152122320",
    mapLink: "https://www.google.com/maps/place/SmartByte+Computer+Education/@19.2205643,73.0554268,12z/data=!4m15!1m8!4m7!1m0!1m5!1m1!1s0x3be7ed007b87e7d5:0x84f1eeb598f4a7ed!2m2!1d73.2377025!2d19.1597376!3m5!1s0x3be7ed007b87e7d5:0x84f1eeb598f4a7ed!8m2!3d19.1597376!4d73.2377025!16s%2Fg%2F11zjl1m6t2?hl=en-GB&authuser=0&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "titwala",
    displayName: "Titwala",
    cityGroup: "Titwala",
    address: "686/1, Adarsh Colony, Shop No. 1, Nandap Road, Near Rastriya Vidyalaya, Sawarkar Nagar, Manda, Titwala, Maharashtra 421605",
    contactNumber: "+919594990539",
    whatsappNumber: "+919594990539",
    mapLink: "https://www.google.com/maps/dir//''/@19.2405193,73.1266865,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be791822f91a641:0xf3e0f2de7e7bbe0!2m2!1d73.2041415!2d19.296739?hl=en-GB&authuser=0&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },

  // Bhiwandi branches
  {
    slug: "bhiwandi-kongaon-1",
    displayName: "Kongaon 1 - Bhiwandi",
    cityGroup: "Bhiwandi",
    address: "Shop Number 5, Sundara Niwas, Namdeo Mhatre Rd, Opposite TDC Bank, Kon, Kongaon, Kalyan, Maharashtra 421311",
    contactNumber: "+919326492771",
    whatsappNumber: "+919326492771",
    mapLink: "https://www.google.com/maps/dir//''/@19.2566653,73.1238847,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be797379de97adb:0xf98f81d4d9607c87!2m2!1d73.1063086!2d19.2469532?hl=en-GB&authuser=0&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    timings: "7:00 AM – 9:30 PM",
  },
  {
    slug: "bhiwandi-kongaon-2",
    displayName: "Kongaon 2 - Bhiwandi",
    cityGroup: "Bhiwandi",
    address: "Shop No. 3, Gurukrupa Apt., Near Puja Nursing Home, Opp. D Star Gym, Kongaon - 421311",
    contactNumber: "+918591383338",
    whatsappNumber: "+918591383338",
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
