
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, ShoppingBag, Check, Heart, Share2, ChevronDown, Star, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const ProductDetailScreen = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Metallic Blue');
  const [showSpecs, setShowSpecs] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const colors = [
    { name: 'Metallic Blue', value: '#5B9EAD' },
    { name: 'Mint Green', value: '#8ED7C6' },
    { name: 'Charcoal Black', value: '#2A2A2A' },
    { name: 'Pearl White', value: '#F5F5F5' },
  ];

  const imageUrls = [
    "https://images.unsplash.com/photo-1557254719-da117996c2e8?q=80&w=2970&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=2970&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2022&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=2070&auto=format&fit=crop"
  ];

  // Handle mouse movement for light effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to section
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseRef.current = { x, y };
      
      // Update CSS variables for reactive light effects
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    
    const section = containerRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      section?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-brand-gray/80 via-white to-brand-gray/60 pt-20"
    >
      {/* Back navigation */}
      <div className="container mx-auto px-6 pb-8">
        <Link to="/" className="inline-flex items-center text-foreground/80 hover:text-brand-teal transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to home</span>
        </Link>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product images */}
          <div className={cn(
            "relative transition-all duration-700",
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
            ref={titleRef}>
            
            {/* Main large image with 3D effect */}
            <div className="perspective-3d mb-6">
              <div className="transform-3d premium-shadow-3d rounded-2xl overflow-hidden">
                <div className="relative aspect-square">
                  <img 
                    src={imageUrls[activeImage]} 
                    alt="Product view" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/10 to-transparent opacity-70"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 premium-glass px-3 py-1.5 rounded-full text-sm font-semibold">
                    <div className="flex items-center">
                      <Star className="w-3.5 h-3.5 text-brand-teal mr-1.5 fill-brand-teal" />
                      <span>Premium Edition</span>
                    </div>
                  </div>
                  
                  {/* Interactive shine effect */}
                  <div className="absolute inset-0 shine-overlay pointer-events-none"></div>
                </div>
              </div>
            </div>
            
            {/* Image thumbnails with 3D hover effect */}
            <div className="grid grid-cols-4 gap-4">
              {imageUrls.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "rounded-lg overflow-hidden transition-all duration-300 transform-gpu",
                    activeImage === index 
                      ? "ring-2 ring-brand-teal scale-105" 
                      : "hover:scale-105 opacity-70 hover:opacity-100"
                  )}
                >
                  <div className="aspect-square">
                    <img 
                      src={img} 
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Right: Product details */}
          <div 
            ref={contentRef}
            className={cn(
              "transition-all duration-700 delay-300",
              contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              EVOLVE X3 
              <span className="gradient-text"> Premium</span>
            </h1>
            
            <div className="flex items-center space-x-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-brand-teal fill-brand-teal" />
              ))}
              <span className="text-foreground/70 text-sm ml-2">(128 reviews)</span>
            </div>
            
            <div className="text-3xl font-semibold mb-6 flex items-center">
              <span className="text-brand-teal">$3,499</span>
              <span className="text-foreground/50 text-xl line-through ml-3">$3,999</span>
              <span className="ml-3 bg-brand-teal/10 text-brand-teal text-sm px-2 py-0.5 rounded">SAVE $500</span>
            </div>
            
            <div className="decorative-line mb-6"></div>
            
            <p className="text-lg text-foreground/80 mb-8">
              Experience the future of urban mobility with our flagship electric bike model. 
              Meticulously engineered for the discerning rider, the EVOLVE X3 combines premium 
              materials, cutting-edge technology, and unparalleled craftsmanship.
            </p>
            
            {/* Color selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Select Color</h3>
              <div className="flex space-x-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      "group flex flex-col items-center space-y-2",
                      selectedColor === color.name ? "scale-105" : ""
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full transition-transform duration-300 group-hover:scale-110",
                      selectedColor === color.name ? "ring-2 ring-brand-teal ring-offset-2" : ""
                    )}
                      style={{ backgroundColor: color.value }}
                    >
                      {selectedColor === color.name && (
                        <div className="flex items-center justify-center h-full">
                          <Check className="h-5 w-5 text-white drop-shadow-md" />
                        </div>
                      )}
                    </div>
                    <span className="text-sm">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tech specs toggle */}
            <div className="mb-8">
              <button 
                onClick={() => setShowSpecs(!showSpecs)}
                className="w-full flex items-center justify-between p-4 premium-glass rounded-xl transition-all duration-300 hover:bg-white/30"
              >
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-brand-teal mr-2" />
                  <span className="font-semibold">Technical Specifications</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  showSpecs ? "transform rotate-180" : ""
                )} />
              </button>
              
              {showSpecs && (
                <div className="mt-4 p-5 premium-glass rounded-xl space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-foreground/60 text-sm">Range</p>
                      <p className="font-medium">80 km</p>
                    </div>
                    <div>
                      <p className="text-foreground/60 text-sm">Top Speed</p>
                      <p className="font-medium">50 km/h</p>
                    </div>
                    <div>
                      <p className="text-foreground/60 text-sm">Battery</p>
                      <p className="font-medium">48V 17.5Ah Lithium</p>
                    </div>
                    <div>
                      <p className="text-foreground/60 text-sm">Motor</p>
                      <p className="font-medium">750W Brushless</p>
                    </div>
                    <div>
                      <p className="text-foreground/60 text-sm">Charging Time</p>
                      <p className="font-medium">3.5 hours</p>
                    </div>
                    <div>
                      <p className="text-foreground/60 text-sm">Weight</p>
                      <p className="font-medium">22 kg</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-brand-teal hover:bg-brand-teal/90 text-white px-8 py-6 rounded-md btn-hover-effect group shine-effect flex-1"
                size="lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10 h-12 w-12 rounded-md"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10 h-12 w-12 rounded-md"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Free shipping banner */}
      <div className="container mx-auto px-6 mt-16">
        <div className="premium-glass p-4 rounded-xl flex items-center justify-center text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-brand-teal mr-2" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-brand-teal mr-2" />
              <span>2-Year Warranty</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-brand-teal mr-2" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
