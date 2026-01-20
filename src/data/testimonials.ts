export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  course: string;
  branch: string;
  rating: number;
  review: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    initials: "PS",
    course: "CCC",
    branch: "Kalyan West",
    rating: 5,
    review: "Excellent teaching methodology! The faculty made complex concepts easy to understand. Got my CCC certificate and now I'm eligible for government job applications. Thank you SmartByte!",
    date: "2024-01-15"
  },
  {
    id: "2",
    name: "Rahul Patil",
    initials: "RP",
    course: "Tally Prime",
    branch: "Dombivli",
    rating: 5,
    review: "Best Tally course in the area. The practical approach helped me get a job within a month of completing the course. Highly recommend SmartByte for accounting courses.",
    date: "2024-02-20"
  },
  {
    id: "3",
    name: "Sneha Desai",
    initials: "SD",
    course: "Advanced Excel",
    branch: "Thane",
    rating: 5,
    review: "The Advanced Excel course transformed my work efficiency. Dashboard creation and pivot tables are now my strong suits. My colleagues are amazed at my reports!",
    date: "2024-01-28"
  },
  {
    id: "4",
    name: "Amit Kumar",
    initials: "AK",
    course: "Python Programming",
    branch: "Kalyan West",
    rating: 5,
    review: "Started with zero coding knowledge and now I can build my own programs. The step-by-step approach and patient faculty made learning fun. Great infrastructure too!",
    date: "2024-03-10"
  },
  {
    id: "5",
    name: "Pooja Joshi",
    initials: "PJ",
    course: "CCC",
    branch: "Panvel",
    rating: 5,
    review: "I was nervous about computers, but the teachers were so supportive. Now I use digital payments, email, and office applications confidently. Life-changing experience!",
    date: "2024-02-05"
  },
  {
    id: "6",
    name: "Vikram Singh",
    initials: "VS",
    course: "Cybersecurity",
    branch: "Dombivli",
    rating: 5,
    review: "Comprehensive cybersecurity program with hands-on labs. The ethical hacking concepts are taught responsibly with real-world scenarios. Preparing for CEH certification now!",
    date: "2024-03-15"
  },
  {
    id: "7",
    name: "Anita Mestry",
    initials: "AM",
    course: "Tally Prime",
    branch: "Kalyan East",
    rating: 5,
    review: "After completing Tally with GST, I started handling my family business accounts confidently. The GST billing knowledge has been incredibly useful. Thank you teachers!",
    date: "2024-01-08"
  },
  {
    id: "8",
    name: "Suresh Naik",
    initials: "SN",
    course: "Advanced Excel",
    branch: "Badlapur",
    rating: 5,
    review: "The Excel course was worth every rupee. VLOOKUP, pivot tables, and charts - I learned everything I needed for my data analysis role. Very practical curriculum!",
    date: "2024-02-18"
  },
  {
    id: "9",
    name: "Kavita Bhosle",
    initials: "KB",
    course: "CCC",
    branch: "Bhiwandi",
    rating: 5,
    review: "Being a housewife, I wanted to learn computers. SmartByte's flexible timings and friendly atmosphere made it possible. Now I help my kids with their computer homework!",
    date: "2024-03-01"
  },
  {
    id: "10",
    name: "Rajesh More",
    initials: "RM",
    course: "Python Programming",
    branch: "Diva",
    rating: 5,
    review: "Python course structure is excellent. From basics to projects, everything was well organized. The mini-projects gave me confidence to tackle real coding challenges.",
    date: "2024-02-25"
  },
  {
    id: "11",
    name: "Meena Yadav",
    initials: "MY",
    course: "Tally Prime",
    branch: "Titwala",
    rating: 5,
    review: "Got placed in an accounting firm right after completing the course. The faculty's industry connections and practical training made all the difference. Grateful!",
    date: "2024-01-20"
  },
  {
    id: "12",
    name: "Deepak Gupta",
    initials: "DG",
    course: "Cybersecurity",
    branch: "Kalyan West",
    rating: 5,
    review: "Level 2 complete and moving to Level 3! The upgrade pricing model is great. Learning ethical hacking the right way with proper labs and mentorship.",
    date: "2024-03-20"
  }
];

export const getTestimonialsByCourse = (course: string): Testimonial[] => {
  return testimonials.filter(t => t.course === course);
};

export const getTestimonialsByBranch = (branch: string): Testimonial[] => {
  return testimonials.filter(t => t.branch.toLowerCase().includes(branch.toLowerCase()));
};
