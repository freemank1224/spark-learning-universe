import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-theme-navy/90 text-theme-cream py-12 border-t border-theme-stone/20 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-theme-cream">SparkLearn</h3>
            <p className="text-theme-stone mb-4">
              Inspiring the next generation through interactive learning, coding challenges, and historical adventures.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-theme-stone hover:text-theme-glow">
                <Facebook size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="text-theme-stone hover:text-theme-glow">
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="text-theme-stone hover:text-theme-glow">
                <Instagram size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="text-theme-stone hover:text-theme-glow">
                <Youtube size={18} />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-theme-cream">Courses</h3>
            <ul className="space-y-2">
              <li><Link to="/courses/science" className="text-theme-stone hover:text-theme-glow transition-colors">Science</Link></li>
              <li><Link to="/courses/technology" className="text-theme-stone hover:text-theme-glow transition-colors">Technology</Link></li>
              <li><Link to="/courses/engineering" className="text-theme-stone hover:text-theme-glow transition-colors">Engineering</Link></li>
              <li><Link to="/courses/arts" className="text-theme-stone hover:text-theme-glow transition-colors">Arts</Link></li>
              <li><Link to="/courses/mathematics" className="text-theme-stone hover:text-theme-glow transition-colors">Mathematics</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-theme-cream">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-theme-stone hover:text-theme-glow transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="text-theme-stone hover:text-theme-glow transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-theme-stone hover:text-theme-glow transition-colors">Contact Us</Link></li>
              <li><Link to="/parents" className="text-theme-stone hover:text-theme-glow transition-colors">Parents' Guide</Link></li>
              <li><Link to="/teachers" className="text-theme-stone hover:text-theme-glow transition-colors">Teachers' Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-theme-cream">Subscribe</h3>
            <p className="text-theme-stone mb-4">Stay updated with our newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-l-full border border-r-0 border-theme-stone/30 bg-theme-dark/50 text-theme-cream focus:outline-none focus:ring-1 focus:ring-theme-glow"
              />
              <Button className="bg-theme-navy hover:bg-theme-navy/80 text-theme-cream rounded-r-full">
                <Mail size={18} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-theme-stone/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-theme-stone text-sm">
              &copy; {new Date().getFullYear()} SparkLearn. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-theme-stone hover:text-theme-glow transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-theme-stone hover:text-theme-glow transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-sm text-theme-stone hover:text-theme-glow transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
