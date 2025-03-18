
import { useState, useEffect } from "react";
import { X, Menu, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle menu clicks
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle mock loading for demo purposes
  const handleDemoLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-brand-teal text-3xl font-bold mr-1">
              e<span className="text-2xl">∞</span>
            </span>
            <span className={cn(
              "font-bold text-lg",
              isScrolled ? "text-gray-800" : "text-white"
            )}>
              EVOLVE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {[
                  { label: "Home", href: "/" },
                  { label: "Gallery", href: "/gallery" },
                  { label: "Products", href: "/products" },
                  { label: "Features", href: "/features" },
                  { label: "Contact", href: "/contact" }
                ].map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <Link 
                      to={item.href} 
                      className={cn(
                        "block px-4 py-2 text-sm font-medium rounded-md transition-colors",
                        isScrolled 
                          ? "text-gray-700 hover:text-brand-teal" 
                          : "text-white/80 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button 
              className="ml-4 bg-brand-teal hover:bg-brand-teal/90 text-white"
              onClick={handleDemoLoading}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Started"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={handleMenuClick}
            className={cn(
              "md:hidden p-2 rounded-md",
              isScrolled ? "text-gray-800" : "text-white"
            )}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-6 px-2 space-y-3">
            {[
              { label: "Home", href: "/" },
              { label: "Gallery", href: "/gallery" },
              { label: "Products", href: "/products" },
              { label: "Features", href: "/features" },
              { label: "Contact", href: "/contact" }
            ].map((item, index) => (
              <Link 
                key={index}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-white/10 transition-colors text-gray-800"
              >
                {item.label}
              </Link>
            ))}
            <Button 
              className="w-full mt-4 bg-brand-teal hover:bg-brand-teal/90 text-white"
              onClick={() => {
                handleDemoLoading();
                setIsMenuOpen(false);
              }}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Get Started
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
