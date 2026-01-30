import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { ThemeProvider } from "next-themes";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { BackToTop } from "@/components/BackToTop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { lazy, Suspense, useEffect } from "react";
import { useIsMobileLike } from "@/hooks/useIsMobileLike";

const Index = lazy(() => import("./pages/Index"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const About = lazy(() => import("./pages/About"));
const Locations = lazy(() => import("./pages/Locations"));
const BranchDetail = lazy(() => import("./pages/BranchDetail"));
const Gallery = lazy(() => import("./pages/Gallery"));
const BranchGallery = lazy(() => import("./pages/BranchGallery"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [location.pathname, reducedMotion]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [reducedMotion]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/branches/:slug" element={<BranchDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/branches/:slug" element={<BranchGallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/branches/:slug" element={<BranchDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/branches/:slug" element={<BranchGallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => {
  const reducedMotion = useReducedMotion();
  const isMobileLike = useIsMobileLike();

  useEffect(() => {
    if (isMobileLike) return;
    void import("./pages/Courses");
    void import("./pages/About");
    void import("./pages/Locations");
    void import("./pages/Gallery");
    void import("./pages/Testimonials");
  }, [isMobileLike]);

  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />

              {/* IMPORTANT: basename fixes GitHub Pages subpath (/SmartByte/) */}
              <BrowserRouter basename={import.meta.env.BASE_URL}>
                <ScrollToTop />
                <AnimatedBackground />
                <ScrollProgressBar />
                <Header />
                <main className="min-h-screen pt-20">
                  <AnimatedRoutes />
                </main>
                <Footer />
                <BackToTop />
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </MotionConfig>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
