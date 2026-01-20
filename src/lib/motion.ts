// Motion system configuration
export const motionConfig = {
  // Duration tokens
  duration: {
    fast: 0.15,
    normal: 0.25,
    slow: 0.45,
    slower: 0.8,
  },
  
  // Easing curves
  ease: {
    out: [0.16, 1, 0.3, 1] as const,
    spring: [0.34, 1.56, 0.64, 1] as const,
    inOut: [0.4, 0, 0.2, 1] as const,
  },
  
  // Intensity levels for motion
  intensity: {
    low: 0.5,
    medium: 1,
    high: 1.5,
  },
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease.out,
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    scale: 0.99,
    transition: {
      duration: motionConfig.duration.normal,
      ease: motionConfig.ease.inOut,
    }
  },
};

// Stagger container for children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

// Fade up animation for scroll reveals
export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease.out,
    }
  },
  viewport: { once: true, margin: "-50px" },
};

// Fade in animation
export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease.out,
    }
  },
  viewport: { once: true },
};

// Scale in animation
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease.spring,
    }
  },
  viewport: { once: true, margin: "-50px" },
};

// Slide in from left
export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease.out,
    }
  },
  viewport: { once: true, margin: "-50px" },
};

// Slide in from right
export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease.out,
    }
  },
  viewport: { once: true, margin: "-50px" },
};

// Card hover animation
export const cardHover = {
  rest: { 
    scale: 1, 
    y: 0,
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
  },
  hover: { 
    scale: 1.02, 
    y: -8,
    boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.2)",
    transition: {
      duration: motionConfig.duration.normal,
      ease: motionConfig.ease.out,
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: motionConfig.duration.fast,
    }
  }
};

// Button hover animation
export const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: motionConfig.duration.fast,
      ease: motionConfig.ease.spring,
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: motionConfig.duration.fast,
    }
  }
};

// Stagger children animation
export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease.out,
    }
  },
};
