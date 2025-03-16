
import { useRef, useState, useEffect, forwardRef, ForwardedRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Play, ArrowRight, Layers, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const showcaseItems = [
  {
    title: "Precision Engineering",
    description: "Every component meticulously designed for optimal performance and durability.",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2022&auto=format&fit=crop",
    color: "from-brand-teal/80 to-brand-dark-blue/80"
  },
  {
    title: "Smart Integration",
    description: "Seamlessly connect with your digital life through our intuitive companion app.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
    color: "from-brand-dark-blue/80 to-brand-light-blue/80"
  },
  {
    title: "Sustainable Design",
    description: "Environmentally conscious materials and processes for a greener future.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop",
    color: "from-brand-mint/80 to-brand-teal/80"
  },
  {
    title: "Premium Craftsmanship",
    description: "Handcrafted with attention to detail for an exceptional riding experience.",
    image: "https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=2070&auto=format&fit=crop",
    color: "from-brand-light-blue/80 to-brand-mint/80"
  },
];

const ShowcaseSection = forwardRef((props, ref: ForwardedRef<HTMLElement>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [hasScrolledThrough, setHasScrolledThrough] = useState(false);
  const [isManualInteraction, setIsManualInteraction] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollCooldown = 800; // ms cooldown between scroll actions
  
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  // Set forwarded ref to sectionRef
  useEffect(() => {
    if (typeof ref === 'function') {
      ref(sectionRef.current);
    } else if (ref) {
      ref.current = sectionRef.current;
    }
  }, [ref]);
  
  // Control scroll behavior with improved throttling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!inView || hasScrolledThrough) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < scrollCooldown) return;
      
      e.preventDefault();
      lastScrollTime.current = now;
      
      // Enhanced visual feedback during scroll
      if (containerRef.current) {
        containerRef.current.classList.add('scale-[0.98]');
        setTimeout(() => {
          if (containerRef.current) containerRef.current.classList.remove('scale-[0.98]');
        }, 200);
      }
      
      // Determine scroll direction with enhanced sensitivity
      if (e.deltaY > 20) { // Scrolling down with threshold
        setIsManualInteraction(true);
        if (activeIndex < showcaseItems.length - 1) {
          setActiveIndex(prev => prev + 1);
        } else {
          setHasScrolledThrough(true);
          setIsScrollLocked(false);
        }
      } else if (e.deltaY < -20) { // Scrolling up with threshold
        setIsManualInteraction(true);
        if (activeIndex > 0) {
          setActiveIndex(prev => prev - 1);
        }
      }
    };

    // Handle touch events for mobile with improved sensitivity
    const handleTouchStart = (e: TouchEvent) => {
      if (!inView || hasScrolledThrough) return;
      touchStartY.current = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!inView || hasScrolledThrough) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < scrollCooldown) return;
      
      const touchY = e.touches[0].clientY;
      const diff = touchStartY.current - touchY;
      
      if (Math.abs(diff) > 30) { // Increased threshold for better mobile experience
        e.preventDefault();
        lastScrollTime.current = now;
        setIsManualInteraction(true);
        
        // Enhanced visual feedback
        if (containerRef.current) {
          containerRef.current.classList.add('scale-[0.98]');
          setTimeout(() => {
            if (containerRef.current) containerRef.current.classList.remove('scale-[0.98]');
          }, 200);
        }
        
        if (diff > 0) { // Scrolling down
          if (activeIndex < showcaseItems.length - 1) {
            setActiveIndex(prev => prev + 1);
          } else {
            setHasScrolledThrough(true);
            setIsScrollLocked(false);
          }
        } else { // Scrolling up
          if (activeIndex > 0) {
            setActiveIndex(prev => prev - 1);
          }
        }
        
        touchStartY.current = touchY;
      }
    };

    // Improved lock and unlock scrolling with animation
    const lockScroll = () => {
      document.body.style.overflow = 'hidden';
      setIsScrollLocked(true);
      
      // Add smooth transition to body when locking
      document.body.classList.add('transition-all', 'duration-300');
    };
    
    const unlockScroll = () => {
      document.body.style.overflow = '';
      setIsScrollLocked(false);
      
      // Remove transition after unlocking
      setTimeout(() => {
        document.body.classList.remove('transition-all', 'duration-300');
      }, 300);
    };

    // Logic to handle scroll locking with improved detection
    if (inView && !hasScrolledThrough) {
      lockScroll();
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
    } else {
      unlockScroll();
    }

    // Reset scroll locking when user scrolls back to top of the page
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setHasScrolledThrough(false);
        setActiveIndex(0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      unlockScroll();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [inView, activeIndex, hasScrolledThrough]);

  // Auto-advance carousel every 3 seconds if not manually interacted with
  useEffect(() => {
    if (!isScrollLocked || isManualInteraction) return;
    
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % showcaseItems.length;
        return nextIndex;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isScrollLocked, isManualInteraction]);
  
  // Reset manual interaction flag after a period of inactivity
  useEffect(() => {
    if (isManualInteraction) {
      const timer = setTimeout(() => {
        setIsManualInteraction(false);
      }, 5000); // Reset after 5 seconds of inactivity
      
      return () => clearTimeout(timer);
    }
  }, [isManualInteraction, activeIndex]);

  // Handle manual slide change
  const handleManualSlideChange = (index: number) => {
    setActiveIndex(index);
    setIsManualInteraction(true);
  };

  return (
    <section 
      id="showcase"
      ref={(el) => {
        // @ts-ignore - combining refs
        inViewRef(el);
        sectionRef.current = el;
      }}
      className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-white/80 via-brand-gray/60 to-white/70"
    >
      {/* Enhanced 3D decorative elements with more light effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-brand-mint/10 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-light-blue/10 blur-3xl animate-float-slow" style={{ animationDelay: '1s' }}></div>
        
        {/* Enhanced light beams */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/5 rotate-45 blur-3xl transform-gpu"></div>
        <div className="absolute top-2/3 left-1/3 w-[600px] h-[300px] bg-brand-teal/5 -rotate-30 blur-3xl transform-gpu"></div>
        
        {/* Enhanced holographic effect elements */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-teal/5 to-transparent opacity-50"></div>
        <div className="holographic-overlay"></div>
      </div>
      
      <div className="container relative z-10">
        {/* Section header with enhanced animations */}
        <div className="text-center mb-20" ref={titleRef}>
          <div className={cn(
            "inline-block premium-glass px-4 py-1.5 rounded-full mb-4 transition-all duration-700 ease-out transform-gpu",
            titleInView ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-6 -rotate-3"
          )}>
            <span className="text-sm font-medium flex items-center">
              <Layers className="h-4 w-4 mr-2 text-brand-teal animate-pulse-glow" />
              3D Experience
            </span>
          </div>
          
          <h2 className={cn(
            "text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-teal via-brand-dark-blue to-brand-mint transition-all duration-700 delay-100 ease-out shine-effect",
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Immersive Innovation
          </h2>
          
          <div className={cn(
            "decorative-line mx-auto my-5 transition-all duration-700 delay-200 ease-out",
            titleInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90"
          )}></div>
          
          <p className={cn(
            "text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto transition-all duration-700 delay-300 ease-out",
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            Discover the cutting-edge features that define our commitment to excellence
            and innovation in electric mobility.
          </p>
        </div>
        
        {/* Enhanced 3D Scroll Stack with improved effects */}
        <div 
          ref={containerRef}
          className={cn(
            "perspective-3d max-w-5xl mx-auto relative transition-all duration-700",
            inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative h-[500px] md:h-[600px]">
            {showcaseItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 w-full rounded-2xl overflow-hidden transition-all duration-700 scroll-stagger-item transform-3d",
                  index === activeIndex 
                    ? "z-40 scale-100 rotate-x-0 rotate-y-0 translate-z-0 opacity-100" 
                    : index < activeIndex
                      ? "z-30 scale-95 -rotate-x-2 rotate-y-3 -translate-z-20 opacity-80"
                      : "z-20 scale-90 -rotate-x-4 rotate-y-6 -translate-z-40 opacity-70"
                )}
                style={{
                  transform: `scale(${1 - Math.abs(index - activeIndex) * 0.05}) 
                              perspective(1500px) 
                              rotateX(${(index - activeIndex) * -2}deg) 
                              rotateY(${(index - activeIndex) * 3}deg) 
                              translateZ(${(index - activeIndex) * -20}px)`,
                  zIndex: 40 - Math.abs(index - activeIndex),
                  opacity: 1 - Math.abs(index - activeIndex) * 0.1,
                  transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
                onClick={() => handleManualSlideChange(index)}
              >
                {/* Enhanced card with glass morphism effect and improved 3D */}
                <div className="relative h-full rounded-2xl premium-shadow-3d transform-3d">
                  {/* Background image with gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`}></div>
                    
                    {/* Enhanced light reflections */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-80"></div>
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
                    
                    {/* Enhanced glossy overlay */}
                    <div className="absolute inset-0 holographic-overlay opacity-30"></div>
                  </div>
                  
                  {/* Content with enhanced styling and 3D depth */}
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between text-white z-10 transform-3d" style={{ transform: 'translateZ(10px)' }}>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-playfair font-semibold mb-6 drop-shadow-sm shine-effect">{item.title}</h3>
                      <p className="text-white/90 text-lg md:text-xl max-w-lg drop-shadow-sm">{item.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-8">
                      <Button 
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full group transition-all duration-300"
                      >
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      
                      {/* Enhanced navigation dots with 3D light effects */}
                      <div className="flex space-x-3">
                        {showcaseItems.map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleManualSlideChange(i);
                            }}
                            className={cn(
                              "w-3 h-3 rounded-full transition-all duration-500 transform-gpu",
                              i === activeIndex 
                                ? "bg-white scale-125 shadow-glow animate-pulse-glow" 
                                : "bg-white/40 hover:bg-white/60"
                            )}
                            aria-label={`Go to slide ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced 3D floating play button for current slide */}
                {index === activeIndex && (
                  <Button
                    size="icon"
                    className="absolute top-1/2 right-8 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 shadow-xl z-50 transition-all duration-500 hover:scale-110 animate-pulse-glow group transform-3d"
                    style={{ transform: 'translateZ(30px)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Play video for ${item.title}`);
                    }}
                  >
                    <Play className="h-6 w-6 text-white group-hover:scale-110 transition-transform fill-white" />
                    
                    {/* Enhanced glow effect */}
                    <div className="absolute inset-0 rounded-full bg-white/10 blur-md -z-10 group-hover:opacity-100 opacity-0 transition-opacity scale-125"></div>
                  </Button>
                )}
                
                {/* Enhanced 3D parallax elements */}
                <div className="absolute inset-0 pointer-events-none transform-3d" 
                     style={{ transform: `translateZ(15px)` }}>
                  <div className="absolute top-5 right-5 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
                  <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced navigation buttons with 3D effect */}
          <div className="flex justify-center mt-8 space-x-4 transform-3d" style={{ transform: 'translateZ(20px)' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleManualSlideChange(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10 rounded-md shadow-3d transition-all duration-300 hover:-translate-x-1"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleManualSlideChange(Math.min(showcaseItems.length - 1, activeIndex + 1))}
              disabled={activeIndex === showcaseItems.length - 1}
              className="border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10 rounded-md shadow-3d transition-all duration-300 hover:translate-x-1"
            >
              Next
            </Button>
          </div>
          
          {/* Enhanced scroll indicator with animation */}
          {isScrollLocked && !hasScrolledThrough && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center text-brand-teal/70 animate-bounce transition-opacity">
              <p className="text-sm mb-1 premium-glass px-3 py-1 rounded-full backdrop-blur-md">Scroll to navigate</p>
              <ChevronDown className="h-5 w-5 shadow-glow" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

ShowcaseSection.displayName = "ShowcaseSection";

export default ShowcaseSection;
