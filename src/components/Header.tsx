
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, X, Globe, Search, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-apple-blue">SparkLearn</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className="nav-link active">Home</Link>
          <Link to="/courses" className="nav-link">Courses</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleLanguage} 
            className="text-gray-700 hover:text-apple-blue"
          >
            <Globe className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-700 hover:text-apple-blue">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-700 hover:text-apple-blue">
            <User className="h-5 w-5" />
          </Button>
          <Button 
            className="bg-apple-blue hover:bg-blue-700 text-white rounded-full px-4 py-2"
          >
            Sign In
          </Button>
        </div>
        
        <Button 
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </Button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link to="/" className="nav-link active" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/courses" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Courses
            </Link>
            <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Projects
            </Link>
            <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
            <div className="pt-4 flex items-center justify-between border-t border-gray-200">
              <Button 
                variant="ghost"
                onClick={toggleLanguage} 
                className="flex items-center space-x-2 text-gray-700"
              >
                <Globe className="h-4 w-4" />
                <span>{currentLanguage}</span>
              </Button>
              <Button 
                className="bg-apple-blue text-white rounded-full px-4 py-2"
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
