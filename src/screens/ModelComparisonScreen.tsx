
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, ChevronDown, ChevronUp, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const models = [
  {
    id: "evolve-x1",
    name: "EVOLVE X1",
    price: "$1,999",
    image: "https://images.unsplash.com/photo-1582516732443-4a07e77e391a?q=80&w=2807&auto=format&fit=crop",
    category: "Entry",
    topSpeed: "35 km/h",
    range: "40 km",
    battery: "36V 10.5Ah",
    motor: "350W",
    charging: "4.5 hours",
    weight: "18 kg",
    features: {
      "Smart App": true,
      "GPS Tracking": false,
      "Removable Battery": true,
      "Hydraulic Brakes": false,
      "Suspension": false,
      "Integrated Lights": true,
    }
  },
  {
    id: "evolve-x2",
    name: "EVOLVE X2",
    price: "$2,599",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=2970&auto=format&fit=crop",
    category: "Sport",
    topSpeed: "45 km/h",
    range: "60 km",
    battery: "48V 13Ah",
    motor: "500W",
    charging: "4 hours",
    weight: "20 kg",
    features: {
      "Smart App": true,
      "GPS Tracking": true,
      "Removable Battery": true,
      "Hydraulic Brakes": true,
      "Suspension": false,
      "Integrated Lights": true,
    },
    highlight: true
  },
  {
    id: "evolve-x3",
    name: "EVOLVE X3",
    price: "$3,499",
    image: "https://images.unsplash.com/photo-1557254719-da117996c2e8?q=80&w=2970&auto=format&fit=crop",
    category: "Premium",
    topSpeed: "50 km/h",
    range: "80 km",
    battery: "48V 17.5Ah",
    motor: "750W",
    charging: "3.5 hours",
    weight: "22 kg",
    features: {
      "Smart App": true,
      "GPS Tracking": true,
      "Removable Battery": true,
      "Hydraulic Brakes": true,
      "Suspension": true,
      "Integrated Lights": true,
    },
    premium: true
  }
];

const ModelComparisonScreen = () => {
  const [expandedFeatures, setExpandedFeatures] = useState(true);
  const [selectedModel, setSelectedModel] = useState("evolve-x3");
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const toggleFeatures = () => {
    setExpandedFeatures(!expandedFeatures);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white/80 via-brand-gray/60 to-white/70 pt-20 pb-20">
      {/* Back navigation */}
      <div className="container mx-auto px-6 pb-8">
        <Link to="/" className="inline-flex items-center text-foreground/80 hover:text-brand-teal transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to home</span>
        </Link>
      </div>
      
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-12">
        <div className="inline-block premium-glass shine-effect px-4 py-1.5 rounded-full mb-4">
          <span className="text-sm font-medium flex items-center justify-center">
            <Info className="h-4 w-4 mr-2 text-brand-teal" />
            Model Comparison
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Find Your Perfect <span className="gradient-text">Match</span>
        </h1>
        
        <div className="decorative-line mx-auto my-4"></div>
        
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Compare our premium electric bike models to find the one that best suits your needs,
          lifestyle, and preferences.
        </p>
      </div>
      
      {/* Model comparison table */}
      <div className="container mx-auto px-6">
        <div className="overflow-x-auto" ref={ref}>
          <table className={cn(
            "w-full border-collapse transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            {/* Header Row */}
            <thead>
              <tr>
                <th className="text-left p-4 w-1/5">Features</th>
                {models.map((model) => (
                  <th 
                    key={model.id} 
                    className={cn(
                      "p-4 text-center w-1/4 transition-all duration-300",
                      selectedModel === model.id ? "scale-105" : "",
                      model.premium ? "relative" : ""
                    )}
                  >
                    {model.premium && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 premium-glass px-3 py-1 rounded-full text-xs font-semibold">
                        PREMIUM PICK
                      </div>
                    )}
                    
                    <div className="perspective-3d">
                      <div className={cn(
                        "premium-glass rounded-xl p-4 transition-all duration-300 cursor-pointer transform-gpu",
                        selectedModel === model.id 
                          ? "bg-gradient-to-br from-brand-teal/20 to-transparent border-brand-teal" 
                          : "hover:bg-white/30 hover:scale-[1.02]"
                      )}
                        onClick={() => setSelectedModel(model.id)}
                      >
                        <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                          <img 
                            src={model.image} 
                            alt={model.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold">{model.name}</h3>
                        <div className="text-brand-teal font-bold text-2xl mt-2">{model.price}</div>
                        <div className="text-sm text-foreground/70 mt-1">{model.category} Model</div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* Specs Rows */}
            <tbody>
              <tr className="bg-white/30">
                <td className="border-t border-b border-foreground/10 p-4 font-semibold">Performance</td>
                {models.map((model) => (
                  <td key={`${model.id}-perf`} className="border-t border-b border-foreground/10 p-4 text-center"></td>
                ))}
              </tr>
              
              {/* Top Speed */}
              <tr className="hover:bg-white/40 transition-colors">
                <td className="p-4">Top Speed</td>
                {models.map((model) => (
                  <td key={`${model.id}-speed`} className="p-4 text-center">{model.topSpeed}</td>
                ))}
              </tr>
              
              {/* Range */}
              <tr className="hover:bg-white/40 transition-colors">
                <td className="p-4">Range</td>
                {models.map((model) => (
                  <td key={`${model.id}-range`} className="p-4 text-center">{model.range}</td>
                ))}
              </tr>
              
              {/* Battery */}
              <tr className="hover:bg-white/40 transition-colors">
                <td className="p-4">Battery</td>
                {models.map((model) => (
                  <td key={`${model.id}-battery`} className="p-4 text-center">{model.battery}</td>
                ))}
              </tr>
              
              {/* Motor */}
              <tr className="hover:bg-white/40 transition-colors">
                <td className="p-4">Motor</td>
                {models.map((model) => (
                  <td key={`${model.id}-motor`} className="p-4 text-center">{model.motor}</td>
                ))}
              </tr>
              
              {/* Charging */}
              <tr className="hover:bg-white/40 transition-colors">
                <td className="p-4">Charging Time</td>
                {models.map((model) => (
                  <td key={`${model.id}-charging`} className="p-4 text-center">{model.charging}</td>
                ))}
              </tr>
              
              {/* Weight */}
              <tr className="hover:bg-white/40 transition-colors">
                <td className="p-4">Weight</td>
                {models.map((model) => (
                  <td key={`${model.id}-weight`} className="p-4 text-center">{model.weight}</td>
                ))}
              </tr>
              
              {/* Features Section */}
              <tr className="bg-white/30">
                <td className="border-t border-b border-foreground/10 p-4 font-semibold">
                  <div className="flex items-center justify-between">
                    <span>Features</span>
                    <button 
                      onClick={toggleFeatures}
                      className="text-brand-teal hover:text-brand-teal/70 transition-colors"
                    >
                      {expandedFeatures ? 
                        <ChevronUp className="h-5 w-5" /> : 
                        <ChevronDown className="h-5 w-5" />
                      }
                    </button>
                  </div>
                </td>
                {models.map((model) => (
                  <td key={`${model.id}-features`} className="border-t border-b border-foreground/10 p-4 text-center"></td>
                ))}
              </tr>
              
              {/* Features list */}
              {expandedFeatures && Object.keys(models[0].features).map((feature) => (
                <tr key={feature} className="hover:bg-white/40 transition-colors">
                  <td className="p-4">{feature}</td>
                  {models.map((model) => (
                    <td key={`${model.id}-${feature}`} className="p-4 text-center">
                      {model.features[feature] ? 
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <XCircle className="h-5 w-5 text-red-400 mx-auto" />
                      }
                    </td>
                  ))}
                </tr>
              ))}
              
              {/* Actions Row */}
              <tr>
                <td className="p-4"></td>
                {models.map((model) => (
                  <td key={`${model.id}-action`} className="p-4 text-center">
                    <Button 
                      className={cn(
                        "transition-all duration-300",
                        selectedModel === model.id
                          ? "bg-gradient-to-r from-brand-teal to-brand-dark-blue hover:bg-brand-teal/90 text-white px-4 py-2 rounded-md btn-hover-effect shine-effect"
                          : "bg-transparent hover:bg-white/20 border border-brand-teal/40 text-brand-teal px-4 py-2 rounded-md"
                      )}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Help section */}
      <div className="container mx-auto px-6 mt-16">
        <div className="premium-glass p-8 rounded-xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Need Help Choosing?</h2>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Our team of experts is ready to help you find the perfect electric bike for your needs.
            Schedule a virtual consultation or visit one of our showrooms for a test ride.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              className="border-brand-teal/40 text-brand-teal hover:bg-brand-teal/10"
            >
              Schedule Consultation
            </Button>
            <Button 
              variant="outline" 
              className="border-brand-teal/40 text-brand-teal hover:bg-brand-teal/10"
            >
              Find Showroom
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComparisonScreen;
