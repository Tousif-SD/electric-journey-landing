
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Sparkles, Zap, Diamond, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const InnovationSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [activeFeature, setActiveFeature] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Auto-rotate features
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % innovationFeatures.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [inView]);
  
  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!featuresRef.current) return;
      
      const rect = featuresRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return (
    <section id="innovation" className="section-spacing relative overflow-hidden bg-gradient-to-b from-brand-gray to-white" ref={ref}>
      {/* Light rays */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="light-ray light-ray-1" style={{ opacity: inView ? 0.5 : 0 }}></div>
        <div className="light-ray light-ray-2" style={{ opacity: inView ? 0.7 : 0 }}></div>
        <div className="light-ray light-ray-3" style={{ opacity: inView ? 0.6 : 0 }}></div>
      </div>
      
      {/* Gradient circles */}
      <div className="absolute top-0 left-0 w-full h-full -z-5">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-brand-mint/10 blur-3xl transform -translate-x-1/2" 
          style={{ 
            transform: inView ? `translate(${(mousePosition.x - 0.5) * -30}px, ${(mousePosition.y - 0.5) * -30}px)` : '',
            opacity: inView ? 0.8 : 0
          }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl"
          style={{ 
            transform: inView ? `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)` : '',
            opacity: inView ? 0.7 : 0
          }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className={cn(
            "inline-block premium-glass shine-effect px-4 py-1.5 rounded-full mb-4 transition-all duration-500",
            inView ? "opacity-100" : "opacity-0 transform -translate-y-4"
          )}>
            <span className="text-sm font-medium flex items-center">
              <Diamond className="h-4 w-4 mr-2 text-brand-teal" />
              Beyond Innovation
            </span>
          </div>
          
          <h2 className={cn(
            "section-title transition-all duration-700 delay-100",
            inView ? "opacity-100" : "opacity-0 transform -translate-y-4"
          )}>
            The Future of <span className="gradient-text font-bold">Mobility</span> is Here
          </h2>
          
          <div className={cn(
            "decorative-line mx-auto my-4 transition-all duration-700 delay-200",
            inView ? "opacity-100" : "opacity-0 transform scale-x-0"
          )}></div>
          
          <p className={cn(
            "section-subtitle max-w-3xl mx-auto transition-all duration-700 delay-300",
            inView ? "opacity-100" : "opacity-0 transform -translate-y-4"
          )}>
            Our revolutionary approach to electric vehicles combines cutting-edge technology with 
            uncompromising design, creating an experience that transcends traditional transportation.
          </p>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: 3D Interactive Display */}
          <div className={cn(
            "relative transition-all duration-1000 transform perspective-3d",
            inView ? "opacity-100" : "opacity-0"
          )}>
            <div className="relative h-[500px] perspective-3d" ref={featuresRef}>
              {/* Main 3D object */}
              <div className={cn(
                "absolute inset-0 transition-all duration-700 transform-gpu rotate-3d",
                inView ? "opacity-100" : "opacity-0"
              )} 
              style={{ 
                transform: inView ? 
                `rotateY(${(mousePosition.x - 0.5) * 10}deg) rotateX(${(mousePosition.y - 0.5) * -10}deg)` : 
                'rotateY(0deg) rotateX(0deg)'
              }}>
                <div className="relative w-full h-full">
                  {/* Base Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1511202332934-c432d4c0072d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Electric Bike Innovation" 
                    className="w-full h-full object-cover rounded-2xl premium-shadow-3d transform-gpu"
                  />
                  
                  {/* Holographic Overlay */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 holographic-foil opacity-30"></div>
                    <div className="absolute inset-0 overlay-grid opacity-20"></div>
                  </div>
                  
                  {/* Feature highlight circles */}
                  {innovationFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className={cn(
                        "absolute rounded-full border-2 transition-all duration-500",
                        index === activeFeature ? "border-brand-teal scale-100" : "border-white/30 scale-90",
                        inView ? "opacity-100" : "opacity-0"
                      )}
                      style={{
                        left: `${feature.position.x}%`,
                        top: `${feature.position.y}%`,
                        width: "32px",
                        height: "32px",
                        transform: `translate(-50%, -50%) ${index === activeFeature ? 'scale(1.2)' : 'scale(1)'}`,
                        transitionDelay: `${index * 200}ms`
                      }}
                    >
                      <div 
                        className={cn(
                          "absolute inset-2 rounded-full bg-brand-teal/20 transition-all duration-500",
                          index === activeFeature ? "opacity-100 animate-pulse" : "opacity-40"
                        )}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Active feature highlight */}
              {innovationFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute transition-all duration-500 premium-glass px-4 py-2 rounded-lg shadow-xl",
                    index === activeFeature ? "opacity-100 transform-gpu translate-y-0" : "opacity-0 transform-gpu translate-y-4"
                  )}
                  style={{
                    left: `${feature.position.x}%`,
                    top: `${feature.position.y}%`,
                    transform: `translate(${feature.textPosition})`
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="bg-brand-teal/20 p-1.5 rounded-full">
                      <feature.icon className="h-4 w-4 text-brand-teal" />
                    </div>
                    <span className="text-sm font-medium">{feature.title}</span>
                  </div>
                </div>
              ))}
              
              {/* Interactive instructions */}
              <div className={cn(
                "absolute bottom-4 left-1/2 transform -translate-x-1/2 premium-glass px-4 py-2 rounded-full text-xs text-center transition-all duration-700",
                inView ? "opacity-80" : "opacity-0"
              )}>
                <p className="flex items-center">
                  <Sparkles className="h-3 w-3 mr-2" />
                  <span>Move your mouse to explore in 3D</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Right: Features List */}
          <div className="space-y-8">
            {innovationFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={cn(
                  "feature-item transition-all duration-700 cursor-pointer premium-glass p-6 rounded-xl shine-effect",
                  activeFeature === index ? "border-l-4 border-brand-teal" : "",
                  inView ? "opacity-100 transform translate-x-0" : "opacity-0 transform translate-x-8"
                )}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 rounded-md bg-gradient-to-br from-brand-teal/30 to-brand-mint/20 mr-4">
                    <feature.icon className="h-6 w-6 text-brand-teal" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-foreground/70">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className={cn(
              "transition-all duration-700",
              inView ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
            )}
            style={{ transitionDelay: "800ms" }}
            >
              <Button 
                className="w-full bg-gradient-to-r from-brand-teal to-brand-dark-blue hover:bg-brand-teal/90 text-white py-6 rounded-md btn-hover-effect group shine-effect"
                size="lg"
              >
                <span>DISCOVER THE TECHNOLOGY</span>
                <Zap className="ml-2 h-5 w-5 transition-all duration-300 group-hover:scale-125" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Innovation features data
const innovationFeatures = [
  {
    title: "Advanced Battery Tech",
    description: "Our proprietary battery technology delivers 40% more range than competitors, with smart temperature management and ultra-fast charging capabilities.",
    icon: Zap,
    position: { x: 30, y: 50 },
    textPosition: "-50%, calc(-100% - 16px)"
  },
  {
    title: "Intelligent Suspension",
    description: "Adaptive suspension system that automatically adjusts to road conditions 200 times per second, providing unmatched comfort and handling.",
    icon: Sparkles,
    position: { x: 60, y: 30 },
    textPosition: "20px, -50%"
  },
  {
    title: "Premium Materials",
    description: "Aerospace-grade carbon fiber and sustainable materials create a frame that's lighter, stronger, and more environmentally conscious.",
    icon: Diamond,
    position: { x: 75, y: 60 },
    textPosition: "20px, -50%"
  },
  {
    title: "Award-winning Design",
    description: "Our design philosophy merges form and function seamlessly, earning recognition from the world's most prestigious design institutions.",
    icon: Award,
    position: { x: 40, y: 80 },
    textPosition: "-50%, -100%"
  }
];

export default InnovationSection;
