
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Search, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 w-full',
        isScrolled 
          ? 'bg-white/10 backdrop-blur-lg shadow-md border-b border-white/10' 
          : 'bg-transparent'
      )}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="relative z-10 flex items-center">
            <div className="flex items-center">
              <div className="text-brand-teal text-3xl font-bold mr-1 shine-effect">
                <span className="flex items-center">
                  e<span className="text-2xl">∞</span>
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                asChild
                className="nav-link"
              >
                <Link to="/">HOME</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                asChild
                className="nav-link"
              >
                <Link to="/products">PRODUCTS</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className="nav-link bg-transparent"
              >
                GALLERY
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-brand-teal/20 to-brand-mint/20 p-6 no-underline outline-none focus:shadow-md transform transition-all duration-300 hover:scale-[1.02]"
                        to="/gallery"
                      >
                        <div className="mt-4 mb-2 text-lg font-medium">
                          Premium Collection
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Explore our premium electric bike collection through stunning visuals
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/gallery/urban" className="nav-dropdown-item">
                        <div className="text-sm font-medium leading-none">Urban Series</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Perfect for city commuting
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/gallery/adventure" className="nav-dropdown-item">
                        <div className="text-sm font-medium leading-none">Adventure Series</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Built for off-road exploration
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/gallery/performance" className="nav-dropdown-item">
                        <div className="text-sm font-medium leading-none">Performance Series</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Maximum speed and efficiency
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                asChild
                className="nav-link"
              >
                <Link to="/features">FEATURES</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                asChild
                className="nav-link"
              >
                <Link to="/contact">CONTACT</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right elements */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-foreground hover:text-brand-teal transition-colors hover:bg-transparent">
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            className="border border-brand-teal/60 bg-transparent hover:bg-brand-teal/10 text-foreground hover:text-brand-teal rounded-md transition-all duration-300"
          >
            <Link to="/login" className="flex items-center">LOGIN</Link>
          </Button>
          <Button 
            className="bg-brand-teal hover:bg-brand-teal/90 text-white rounded-md btn-hover-effect group shine-effect"
          >
            <Link to="/signup" className="flex items-center">
              GET STARTED
              <ArrowUpRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-3/4 max-w-sm premium-glass z-50 transform transition-transform duration-500 ease-in-out lg:hidden overflow-y-auto',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="text-brand-teal text-2xl font-bold shine-effect">
              <span className="flex items-center">
                e<span className="text-xl">∞</span>
              </span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/products" onClick={() => setIsMobileMenuOpen(false)}>Products</MobileNavLink>
            <MobileNavLink to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</MobileNavLink>
            <MobileNavLink to="/features" onClick={() => setIsMobileMenuOpen(false)}>Features</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>
            <Button 
              className="mt-4 bg-brand-teal hover:bg-brand-teal/90 text-white w-full btn-hover-effect"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link to="/login" className="w-full">LOGIN</Link>
            </Button>
            <Button 
              variant="outline"
              className="border border-brand-teal/60 bg-transparent hover:bg-brand-teal/10 text-foreground w-full group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link to="/signup" className="w-full flex items-center justify-center">
                GET STARTED
                <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

const MobileNavLink = ({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center justify-between py-2 text-foreground hover:text-brand-teal transition-colors border-b border-white/10 pb-2 hover:pl-2 duration-300"
    >
      {children}
      <ChevronRight className="h-5 w-5" />
    </Link>
  );
};

export default Navbar;
