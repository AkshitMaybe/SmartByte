export interface Course {
  slug: string;
  name: string;
  shortName: string;
  duration: string;
  fees: string;
  feesNumeric: number;
  category: "certification" | "professional" | "programming";
  benefit: string;
  description: string;
  syllabus: string[];
  outcomes: string[];
  whoFor: string[];
  faq: { question: string; answer: string }[];
  icon: string;
  color: "blue" | "gold" | "green" | "purple" | "cyan";
  popular?: boolean;
  levels?: {
    level: number;
    name: string;
    fees: string;
    feesNumeric: number;
    upgradeNote?: string;
    topics: string[];
  }[];
}

export const courses: Course[] = [
  {
    slug: "ccc",
    name: "Course on Computer Concepts (CCC)",
    shortName: "CCC",
    duration: "3 Months",
    fees: "₹7,000",
    feesNumeric: 7000,
    category: "certification",
    benefit: "The most important computer course required for government jobs and digital literacy.",
    description: "CCC is a government-recognized course that covers essential computer skills from basics to advanced digital concepts. Perfect for anyone looking to become digitally literate or qualify for government job requirements.",
    icon: "Monitor",
    color: "blue",
    popular: true,
    syllabus: [
      "Introduction to Computer",
      "Introduction to Operating System",
      "Word Processing (LibreOffice Writer + MS Word practical)",
      "Spreadsheet (LibreOffice Calc + MS Excel practical)",
      "Presentation (LibreOffice Impress + MS PowerPoint practical)",
      "Internet & WWW",
      "Email, Social Networking, e-Governance",
      "Digital Financial Tools & Applications",
      "Cybersecurity Basics",
      "Futuristic Skills & Artificial Intelligence",
      "CCC Exam Practice & Mock Tests"
    ],
    outcomes: [
      "Complete digital confidence for daily tasks",
      "Full MS Office proficiency (Word, Excel, PowerPoint)",
      "Government job eligibility certification",
      "Safe and secure online usage skills",
      "Understanding of e-governance and digital payments"
    ],
    whoFor: [
      "Government job aspirants",
      "Students seeking digital literacy",
      "Professionals needing computer certification",
      "Anyone looking to become digitally proficient"
    ],
    faq: [
      {
        question: "Is CCC mandatory for government jobs?",
        answer: "Yes, CCC certification is required for many state and central government job applications. It's recognized by NIELIT (National Institute of Electronics and Information Technology)."
      },
      {
        question: "What is the exam pattern?",
        answer: "The CCC exam consists of 100 multiple-choice questions to be completed in 90 minutes. We provide extensive mock tests and practice sessions."
      },
      {
        question: "Will I get a certificate?",
        answer: "Yes, upon successful completion, you'll receive a NIELIT-recognized CCC certificate valid across India."
      }
    ]
  },
  {
    slug: "advanced-excel",
    name: "Advanced Excel",
    shortName: "Advanced Excel",
    duration: "1 Month",
    fees: "₹8,000",
    feesNumeric: 8000,
    category: "professional",
    benefit: "The most in-demand Excel course for office, accounts, and data work.",
    description: "Master advanced Excel skills that are essential for modern offices. Learn powerful functions, data analysis, dashboards, and automation techniques that will make you indispensable at work.",
    icon: "Table",
    color: "green",
    popular: true,
    syllabus: [
      "Advanced Functions (VLOOKUP, HLOOKUP, INDEX-MATCH)",
      "Nested Functions & Formula Auditing",
      "Pivot Tables & Pivot Charts",
      "Data Validation & Conditional Formatting",
      "Charts & Data Visualization",
      "Dashboard Creation",
      "Data Cleaning Techniques",
      "What-If Analysis (Goal Seek, Scenarios, Data Tables)",
      "Power Query Basics",
      "Report Generation & Printing",
      "Mini Projects & Real-world Applications"
    ],
    outcomes: [
      "Create professional dashboards and reports",
      "Analyze large datasets efficiently",
      "Automate repetitive tasks",
      "Master lookup and reference functions",
      "Build dynamic charts and visualizations"
    ],
    whoFor: [
      "Office administrators and executives",
      "Accountants and finance professionals",
      "Data analysts and MIS executives",
      "Anyone working with spreadsheets daily"
    ],
    faq: [
      {
        question: "Do I need prior Excel knowledge?",
        answer: "Basic Excel knowledge is helpful but not mandatory. We'll cover fundamentals briefly before diving into advanced topics."
      },
      {
        question: "Will I work on real projects?",
        answer: "Yes, the course includes multiple mini-projects and a final capstone project using real-world business scenarios."
      },
      {
        question: "Is this course recognized by companies?",
        answer: "Advanced Excel skills are universally valued. We provide a course completion certificate that you can add to your resume."
      }
    ]
  },
  {
    slug: "tally",
    name: "Tally Prime with GST",
    shortName: "Tally",
    duration: "3 Months",
    fees: "₹12,000",
    feesNumeric: 12000,
    category: "professional",
    benefit: "A complete accounting and GST course for office, business, and finance jobs.",
    description: "Learn Tally Prime from scratch and become job-ready for accounting roles. This comprehensive course covers everything from basic entries to GST compliance and financial reporting.",
    icon: "Calculator",
    color: "gold",
    popular: true,
    syllabus: [
      "Introduction to Accounting & Tally Prime",
      "Company Creation & Setup",
      "Ledger & Group Management",
      "Voucher Entries (All Types)",
      "Inventory Management",
      "GST Configuration & Setup",
      "GST Billing & Invoice Generation",
      "GST Returns Overview (GSTR-1, GSTR-3B)",
      "Bank Reconciliation Statement (BRS)",
      "Financial Statements (Balance Sheet, P&L)",
      "Practical Exercises & Case Studies"
    ],
    outcomes: [
      "Handle complete accounting for any business",
      "Create and manage GST-compliant invoices",
      "Prepare financial statements and reports",
      "Manage inventory and stock",
      "File GST returns with confidence"
    ],
    whoFor: [
      "Commerce students and graduates",
      "Aspiring accountants",
      "Small business owners",
      "Finance and accounts professionals"
    ],
    faq: [
      {
        question: "Is Tally still relevant in 2024?",
        answer: "Absolutely! Tally Prime remains the most widely used accounting software in India, especially for SMEs and businesses requiring GST compliance."
      },
      {
        question: "Do I need an accounting background?",
        answer: "No, we teach accounting fundamentals alongside Tally. However, having basic commerce knowledge helps."
      },
      {
        question: "Will I get hands-on practice?",
        answer: "Yes, each student gets dedicated practice time on computers with Tally Prime installed."
      }
    ]
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity & Ethical Hacking Program",
    shortName: "Cybersecurity",
    duration: "1 to 1.5 Years (All Levels)",
    fees: "Starting ₹25,000",
    feesNumeric: 25000,
    category: "professional",
    benefit: "A complete multi-level cybersecurity program covering ethical hacking, defense, and enterprise security.",
    description: "Our comprehensive cybersecurity program is designed to take you from beginner to enterprise-ready security professional. Learn ethical hacking, defense strategies, and enterprise security through hands-on labs and real-world scenarios.",
    icon: "Shield",
    color: "purple",
    syllabus: [
      "⚠️ Ethical & Legal Disclaimer: This program teaches security concepts for defensive and authorized testing purposes only. All techniques must be used ethically and legally.",
      "Level 1: Security Foundations",
      "Level 2: Advanced Offensive & Defensive",
      "Level 3: Enterprise Security & SOC"
    ],
    levels: [
      {
        level: 1,
        name: "Security Foundations",
        fees: "₹25,000",
        feesNumeric: 25000,
        topics: [
          "Network Fundamentals & Protocols",
          "OSI Model & TCP/IP Stack",
          "Linux Essentials for Security",
          "Cryptography Fundamentals",
          "Identity & Access Management (IAM)",
          "Risk Assessment Basics",
          "Lab Setup with VMware/VirtualBox"
        ]
      },
      {
        level: 2,
        name: "Advanced Offensive & Defensive",
        fees: "₹60,000",
        feesNumeric: 60000,
        upgradeNote: "If Level 1 completed → Pay only ₹35,000 extra",
        topics: [
          "Advanced Network Attacks & Defense",
          "Web Application Security Testing",
          "Access Control Vulnerabilities",
          "Injection Attacks (SQL, Command, etc.)",
          "Cross-Site Scripting (XSS)",
          "Server-Side Request Forgery (SSRF)",
          "Defensive Hardening Techniques",
          "Vulnerability Assessment & Reporting"
        ]
      },
      {
        level: 3,
        name: "Enterprise Security & SOC",
        fees: "₹90,000",
        feesNumeric: 90000,
        upgradeNote: "If Level 2 completed → Pay only ₹30,000 extra",
        topics: [
          "Security Operations Center (SOC) Fundamentals",
          "Log Analysis & SIEM Tools",
          "Splunk Basics & Queries",
          "Incident Response Procedures",
          "Digital Forensics Introduction",
          "Threat Intelligence & Hunting",
          "Capture The Flag (CTF) Challenges",
          "Capstone Security Projects"
        ]
      }
    ],
    outcomes: [
      "Identify and assess security vulnerabilities",
      "Perform authorized penetration testing",
      "Implement defensive security measures",
      "Work in SOC and incident response roles",
      "Pursue industry certifications (CEH, CompTIA Security+)"
    ],
    whoFor: [
      "IT professionals seeking security specialization",
      "Students interested in cybersecurity careers",
      "System administrators wanting security skills",
      "Anyone passionate about ethical hacking"
    ],
    faq: [
      {
        question: "Is this course legal?",
        answer: "Absolutely! We teach ethical hacking which focuses on authorized security testing. All techniques are taught for defensive purposes and legal use only."
      },
      {
        question: "Can I take only Level 1?",
        answer: "Yes, you can start with Level 1 and decide to upgrade later. The upgrade pricing makes it affordable to progress."
      },
      {
        question: "Do I need prior programming knowledge?",
        answer: "Basic computer knowledge is required. Programming helps but isn't mandatory—we teach relevant scripting within the course."
      },
      {
        question: "What certifications can I pursue after this?",
        answer: "This program prepares you for CEH (Certified Ethical Hacker), CompTIA Security+, and other industry certifications."
      }
    ]
  },
  {
    slug: "python",
    name: "Python Programming",
    shortName: "Python",
    duration: "3 Months",
    fees: "₹16,000",
    feesNumeric: 16000,
    category: "programming",
    benefit: "A beginner-friendly Python programming course that builds strong coding and logic skills.",
    description: "Start your programming journey with Python, one of the most versatile and in-demand languages. This course takes you from zero coding experience to building real projects.",
    icon: "Code",
    color: "cyan",
    syllabus: [
      "Python Basics & Environment Setup",
      "Syntax, Variables & Data Types",
      "Operators & Expressions",
      "Input/Output Operations",
      "Conditional Statements",
      "Loops & Iteration",
      "Pattern Programs",
      "Functions (including Recursion & Lambda)",
      "String Manipulation",
      "Lists, Tuples, Sets & Dictionaries",
      "Built-in Functions & Modules",
      "File Handling",
      "Mini Projects (Calculator, Games, Automation)",
      "Final Assessment & Certification"
    ],
    outcomes: [
      "Write clean, efficient Python code",
      "Solve problems using programming logic",
      "Build practical mini-projects",
      "Understand data structures and algorithms basics",
      "Ready to learn advanced topics (Data Science, Web Dev, AI/ML)"
    ],
    whoFor: [
      "Complete programming beginners",
      "Students preparing for IT careers",
      "Professionals wanting to add coding skills",
      "Anyone interested in automation or data"
    ],
    faq: [
      {
        question: "Do I need any prior experience?",
        answer: "No! This course is designed for absolute beginners. We start from the very basics."
      },
      {
        question: "Why Python over other languages?",
        answer: "Python is beginner-friendly, has simple syntax, and is used in AI, data science, web development, automation, and more. It's the perfect first language."
      },
      {
        question: "Will I build real projects?",
        answer: "Yes, you'll build multiple mini-projects throughout the course and a final project to showcase your skills."
      }
    ]
  }
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};

export const getCoursesByCategory = (category: Course["category"]): Course[] => {
  return courses.filter(course => course.category === category);
};

export const getPopularCourses = (): Course[] => {
  return courses.filter(course => course.popular);
};
