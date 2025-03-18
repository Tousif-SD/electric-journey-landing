
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const productCategories = [
  {
    title: "Urban Series",
    description: "Perfect for city commuting with sleek design and practical features",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=2970&auto=format&fit=crop",
    features: ["Up to 40km range", "Lightweight design", "Smart connectivity"]
  },
  {
    title: "Adventure Series",
    description: "Tackle any terrain with powerful motors and rugged construction",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2022&auto=format&fit=crop",
    features: ["Up to 80km range", "All-terrain tires", "Advanced suspension"]
  },
  {
    title: "Performance Series",
    description: "Experience maximum speed and efficiency with our premium models",
    image: "https://images.unsplash.com/photo-1557254719-da117996c2e8?q=80&w=2970&auto=format&fit=crop",
    features: ["Up to 50km/h speeds", "Aerodynamic design", "Premium components"]
  }
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("Urban Series");

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white via-brand-gray/40 to-white pt-24 pb-16">
        {/* Hero section */}
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Our <span className="gradient-text">Product</span> Collection
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Discover our lineup of premium electric bikes designed for every journey and adventure.
            </p>
            <div className="decorative-line mx-auto my-8"></div>
          </div>
          
          {/* Category navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {productCategories.map((category) => (
              <button
                key={category.title}
                onClick={() => setActiveCategory(category.title)}
                className={cn(
                  "px-6 py-3 rounded-full transition-all duration-300",
                  activeCategory === category.title
                    ? "bg-brand-teal text-white shadow-lg"
                    : "bg-white/50 hover:bg-white/80"
                )}
              >
                {category.title}
              </button>
            ))}
          </div>
          
          {/* Products display */}
          <div 
            ref={ref}
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="premium-glass rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-156051${item * 1111}-aaa${item}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80`} 
                    alt={`Product ${item}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1582516732443-4a07e77e391a?q=80&w=2807&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-brand-teal/90 text-white px-3 py-1 rounded-full text-sm">
                    New
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">EVOLVE X{item}</h3>
                  <div className="flex items-center text-brand-teal font-bold text-xl mb-3">
                    ${(1999 + item * 200).toLocaleString()}
                    {item % 3 === 0 && (
                      <span className="ml-2 text-sm text-foreground/60 line-through">${(2499 + item * 200).toLocaleString()}</span>
                    )}
                  </div>
                  <p className="text-foreground/70 mb-6">Premium electric bike with advanced features and sleek design for urban adventures.</p>
                  <Link to={`/product-detail`}>
                    <Button 
                      className="w-full bg-transparent hover:bg-brand-teal/10 text-brand-teal border border-brand-teal/30 group"
                    >
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Featured category section */}
          <div className="mt-24 mb-16">
            <h2 className="text-3xl font-display font-bold text-center mb-12">Featured Collection: {activeCategory}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {productCategories.filter(cat => cat.title === activeCategory).map((category) => (
                <React.Fragment key={category.title}>
                  <div className="perspective-3d">
                    <div className="transform-3d premium-shadow-3d rounded-2xl overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                    <p className="text-lg text-foreground/70 mb-6">
                      {category.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mt-1 mr-3 bg-brand-teal/20 rounded-full p-1">
                            <Check className="h-4 w-4 text-brand-teal" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link to="/model-comparison">
                      <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white btn-hover-effect group">
                        Compare Models
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
