
import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Camera, ArrowRight, ChevronRight, ChevronLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Image data with proper aspect ratios
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1623468872670-d6bf1da3ca2e?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.0.3",
    alt: "Electric bike on urban street",
    caption: "Urban Explorer",
    description: "Perfect for navigating busy city streets with style and efficiency."
  },
  {
    src: "https://images.unsplash.com/photo-1558979159-2b18a4070a87?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
    alt: "Close-up of electric bike components",
    caption: "Premium Components",
    description: "Each part meticulously engineered for performance and durability."
  },
  {
    src: "https://images.unsplash.com/photo-1642751410355-bc92748dad35?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3",
    alt: "Electric bike dashboard display",
    caption: "Smart Technology",
    description: "Integrated smart systems for an enhanced riding experience."
  },
  {
    src: "https://images.unsplash.com/photo-1598983268103-b155fb7abfcb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    alt: "Electric bike parked in nature",
    caption: "Eco-friendly Adventure",
    description: "Explore nature with zero emissions and minimal environmental impact."
  }
];

const GallerySection = () => {
  const [activeImage, setActiveImage] = useState(0);
  const carouselRef = useRef(null);
  
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: false,
    threshold: 0.5
  });

  return (
    <section 
      id="gallery" 
      ref={sectionRef} 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Premium glossy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-light-blue/30 via-brand-mint/20 to-brand-teal/10"></div>
      
      {/* Glass morphism overlay for depth */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5"></div>
      
      {/* Animated floating decoration elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-brand-teal/10 blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-brand-mint/10 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-brand-light-blue/10 blur-3xl animate-float-slow" style={{ animationDelay: "1s" }}></div>
      
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header with refined animations */}
        <div className="text-center mb-16 md:mb-20" ref={titleRef}>
          <div className={cn(
            "inline-block premium-glass px-4 py-1.5 rounded-full mb-4 transition-all duration-700 ease-out",
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span className="text-sm font-medium flex items-center">
              <Camera className="h-4 w-4 mr-2 text-brand-teal" />
              Visual Showcase
            </span>
          </div>
          
          <h2 className={cn(
            "text-4xl md:text-5xl font-display font-bold transition-all duration-700 delay-100 ease-out",
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span className="text-brand-teal">Beauty</span> in Motion
          </h2>
          
          <div className={cn(
            "decorative-line mx-auto my-5 transition-all duration-700 delay-200 ease-out",
            titleInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90"
          )}></div>
          
          <p className={cn(
            "text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto transition-all duration-700 delay-300 ease-out",
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Experience the elegance and sophistication of our electric bikes 
            through this curated collection of images.
          </p>
        </div>

        {/* Premium Carousel Gallery with contained images */}
        <div className={cn(
          "transition-all duration-1000 perspective-3d relative",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Carousel 
            ref={carouselRef}
            className="w-full"
            opts={{
              loop: true,
              align: "center",
            }}
          >
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-3/4 lg:basis-2/3">
                  <div className="gallery-card h-full p-1">
                    <div className="relative overflow-hidden rounded-xl aspect-[16/9] premium-shadow-lg transform-3d">
                      {/* Image with proper containing */}
                      <div className="absolute inset-0 premium-glass overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      
                      {/* Premium glass caption overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-teal/90 via-brand-dark-blue/50 to-transparent backdrop-blur-sm transition-transform duration-500">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl font-playfair font-medium text-white mb-2">{image.caption}</h3>
                            <p className="text-white/80 max-w-md">{image.description}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="rounded-full border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
                          >
                            <Play className="h-4 w-4 text-white" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom navigation controls */}
            <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10">
              <Button 
                onClick={() => carouselRef.current?.scrollPrev()}
                size="icon"
                className="rounded-full w-10 h-10 md:w-12 md:h-12 gallery-nav-button shadow-lg backdrop-blur-md bg-brand-mint/10 border border-brand-teal/20 hover:bg-brand-teal/20 transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5 text-brand-teal" />
              </Button>
            </div>
            
            <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10">
              <Button 
                onClick={() => carouselRef.current?.scrollNext()}
                size="icon"
                className="rounded-full w-10 h-10 md:w-12 md:h-12 gallery-nav-button shadow-lg backdrop-blur-md bg-brand-mint/10 border border-brand-teal/20 hover:bg-brand-teal/20 transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5 text-brand-teal" />
              </Button>
            </div>
          </Carousel>
          
          {/* Thumbnail navigation with proper containment */}
          <div className={cn(
            "flex space-x-3 justify-center mt-6 perspective-3d transition-all duration-1000 delay-200",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  carouselRef.current?.scrollTo(index);
                  setActiveImage(index);
                }}
                className={cn(
                  "flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden perspective-card transition-all duration-300",
                  activeImage === index 
                    ? "ring-2 ring-brand-teal scale-110 shadow-md shadow-brand-teal/20" 
                    : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0 hover:scale-105"
                )}
              >
                <div className="w-full h-full card-content">
                  <img
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
          
          {/* Premium info card with 3D effect */}
          <div className={cn(
            "absolute -right-4 -bottom-6 md:-right-12 md:-bottom-12 premium-glass p-6 rounded-xl premium-shadow max-w-xs hidden lg:block transition-all duration-1000 delay-400 transform-3d",
            inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}
          >
            <div className="text-lg font-medium mb-2">Premium Collection</div>
            <p className="text-sm text-foreground/70 mb-4">Browse our showcase of meticulously crafted electric bikes designed for the modern rider.</p>
            <Button 
              variant="outline" 
              className="w-full rounded-md group border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10"
              size="sm"
            >
              View all models
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
