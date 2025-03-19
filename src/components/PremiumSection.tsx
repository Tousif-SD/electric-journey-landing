import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { HeartPulse, Shield, Star, Zap, ArrowRight, Trophy } from 'lucide-react';
import { Button } from "@/components/ui/button";

const premiumFeatures = [
  {
    icon: Star,
    title: "Exclusive Access",
    description: "Premium members receive early access to new models, limited editions, and exclusive color options before they're available to the public."
  },
  {
    icon: Shield,
    title: "Extended Warranty",
    description: "Enjoy comprehensive coverage with our industry-leading 5-year warranty on all components and battery performance."
  },
  {
    icon: Zap,
    title: "Priority Service",
    description: "Skip the line with dedicated service appointments and access to our VIP service team for any questions or needs."
  },
  {
    icon: HeartPulse,
    title: "Lifetime Support",
    description: "Receive complimentary maintenance checks and software updates for the lifetime of your vehicle."
  }
];

const PremiumSection = () => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  
  const ref = (node: HTMLElement | null) => {
    if (node) {
      sectionRef.current = node;
      inViewRef(node);
    }
  };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      setMousePosition({ x, y });
    };
    
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      id="premium"
      ref={ref}
      className="section-spacing relative overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-brand-dark-blue/10 to-black/5 backdrop-blur-sm"></div>
        <div className="holographic-foil absolute inset-0 opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-brand-teal/10 blur-[100px] animate-float-slow"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-brand-mint/10 blur-[100px] animate-float-slow" style={{ animationDelay: '2s' }}></div>
          <div className="light-ray light-ray-1"></div>
          <div className="light-ray light-ray-2"></div>
          <div className="light-ray light-ray-3"></div>
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className={cn(
            "inline-block premium-glass px-4 py-1.5 rounded-full mb-4 transition-all duration-700 ease-out transform-gpu",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            <span className="text-sm font-medium flex items-center justify-center">
              <Sparkles className="h-4 w-4 mr-2 text-brand-teal" />
              Premium Experience
            </span>
          </div>
          
          <h2 className={cn(
            "text-4xl md:text-6xl font-display font-bold tracking-tight transition-all duration-700 delay-100 ease-out relative z-10",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <span className="relative">
              <span className="absolute -inset-1 blur-lg bg-gradient-to-r from-brand-teal/30 via-brand-mint/20 to-brand-light-blue/30 rounded-lg"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-dark-blue to-brand-light-blue">
                Mind-Blowing Experience
              </span>
            </span>
          </h2>
          
          <div className={cn(
            "decorative-line mx-auto my-5 transition-all duration-700 delay-200 ease-out",
            inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90"
          )}></div>
          
          <p className={cn(
            "text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto transition-all duration-700 delay-300 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            Experience the ultimate in electric mobility with our premium features
            designed for discerning riders who demand the extraordinary.
          </p>
        </div>
        
        <div className="relative mb-32">
          <div className={cn(
            "relative transform-3d transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0 rotate-x-0" : "opacity-0 translate-y-20 rotate-x-12"
          )}>
            <div 
              className="premium-glass p-0.5 rounded-2xl shadow-3d overflow-hidden transform-gpu"
              style={{
                background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(107, 206, 206, 0.3), transparent 60%)`,
              }}
            >
              <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/95 via-white/90 to-white/95 overflow-hidden">
                <div className="absolute inset-0 holographic-glow opacity-10"></div>
                <div className="absolute inset-0 overlay-grid"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center">
                  <div className="lg:col-span-2 relative perspective-3d">
                    <div className={cn(
                      "transform-3d rounded-xl overflow-hidden premium-shadow-3d transition-all duration-700",
                      inView ? "opacity-100 rotate-y-3 translate-z-0" : "opacity-0 -rotate-y-12 -translate-z-20"
                    )}>
                      <div className="relative aspect-[4/3] overflow-hidden transform-gpu">
                        <img
                          src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2022&auto=format&fit=crop"
                          alt="Premium Electric Bike"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tl from-brand-dark-blue/40 to-transparent"></div>
                        
                        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                          <div className="flex items-center">
                            <BadgeCheck className="w-4 h-4 text-brand-teal mr-1.5" />
                            <span>Premium Edition</span>
                          </div>
                        </div>
                        
                        <div className="absolute inset-0 shine-overlay pointer-events-none"></div>
                      </div>
                    </div>
                    
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border border-brand-teal/20 animate-float-slow"></div>
                    <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full border border-brand-mint/20 animate-float-slow" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
                      Elevate Your Ride with <span className="text-brand-teal">Premium Features</span>
                    </h3>
                    
                    <div className="space-y-6">
                      {premiumFeatures.map((feature, index) => (
                        <div 
                          key={index}
                          className={cn(
                            "premium-glass p-5 rounded-xl transition-all duration-500 cursor-pointer transform-gpu",
                            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                            activeCard === index ? "scale-105 shadow-lg" : "hover:scale-[1.02]"
                          )}
                          style={{ 
                            transitionDelay: `${feature.delay}ms`,
                            background: activeCard === index 
                              ? `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(107, 206, 206, 0.2), transparent 70%)`
                              : undefined
                          }}
                          onMouseEnter={() => setActiveCard(index)}
                          onMouseLeave={() => setActiveCard(null)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2.5 rounded-lg bg-gradient-to-br from-brand-teal/20 to-brand-mint/10 flex-shrink-0">
                              <feature.icon className="w-6 h-6 text-brand-teal" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                              <p className="text-foreground/70">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <Button 
                        className="bg-gradient-to-r from-brand-teal to-brand-dark-blue hover:bg-brand-teal/90 text-white px-6 py-5 rounded-lg btn-hover-effect group shine-effect"
                        size="lg"
                        onClick={() => window.location.href = '/premium-options'}
                      >
                        <span>EXPLORE PREMIUM OPTIONS</span>
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
