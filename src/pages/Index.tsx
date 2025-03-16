
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DesignSection from "@/components/DesignSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import ShowcaseSection from "@/components/ShowcaseSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  // State to track overall page loading
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Ref for the showcase section to handle scroll locking
  const showcaseSectionRef = useRef<HTMLElement | null>(null);
  
  // Smooth scroll implementation with awareness of scroll-locked sections
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        
        if (element) {
          e.preventDefault();
          
          // Unlock scrolling to allow smooth scroll navigation
          document.body.style.overflow = '';
          
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    // Mark the page as loaded with a slight delay for animation purposes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`relative min-h-screen ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      {/* Enhanced premium light effects overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-teal/5 to-transparent"></div>
        <div className="light-ray" style={{ animationDelay: "0s" }}></div>
        <div className="light-ray" style={{ animationDelay: "2s" }}></div>
        <div className="light-ray" style={{ animationDelay: "4s" }}></div>
        <div className="light-ray" style={{ animationDelay: "6s", transform: "rotate(-35deg)" }}></div>
      </div>
      
      <Navbar />
      
      <main className="w-full">
        <HeroSection />
        <FeaturesSection />
        <DesignSection />
        <TestimonialsSection />
        <GallerySection />
        <ShowcaseSection ref={showcaseSectionRef} />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
