
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, X, Globe, Search, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "English" ? "中文" : "English");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-theme-dark/70 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-theme-cream">SparkLearn</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/courses" className={`nav-link ${isActive('/courses') ? 'active' : ''}`}>Courses</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
          <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`}>Projects</Link>
          <Link to="/programming" className={`nav-link ${isActive('/programming') ? 'active' : ''}`}>Programming</Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleLanguage} 
            className="text-theme-cream hover:text-theme-glow"
          >
            <Globe className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-theme-cream hover:text-theme-glow">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-theme-cream hover:text-theme-glow">
            <User className="h-5 w-5" />
          </Button>
          <Button 
            className="bg-theme-navy hover:bg-theme-navy/80 text-theme-cream rounded-full px-4 py-2"
          >
            Sign In
          </Button>
        </div>
        
        <Button 
          variant="ghost"
          size="icon"
          className="md:hidden text-theme-cream"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </Button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-theme-dark/90 backdrop-blur-md shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/courses" className={`nav-link ${isActive('/courses') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
              Courses
            </Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
              Projects
            </Link>
            <Link to="/programming" className={`nav-link ${isActive('/programming') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
              Programming
            </Link>
            <div className="pt-4 flex items-center justify-between border-t border-theme-stone/20">
              <Button 
                variant="ghost"
                onClick={toggleLanguage} 
                className="flex items-center space-x-2 text-theme-cream"
              >
                <Globe className="h-4 w-4" />
                <span>{currentLanguage}</span>
              </Button>
              <Button 
                className="bg-theme-navy text-theme-cream rounded-full px-4 py-2"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
