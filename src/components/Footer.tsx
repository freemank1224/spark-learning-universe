
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-apple-light-gray py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SparkLearn</h3>
            <p className="text-apple-gray mb-4">
              Inspiring the next generation through interactive learning, coding challenges, and historical adventures.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-apple-gray hover:text-apple-blue">
                <Facebook size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="text-apple-gray hover:text-apple-blue">
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="text-apple-gray hover:text-apple-blue">
                <Instagram size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="text-apple-gray hover:text-apple-blue">
                <Youtube size={18} />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Courses</h3>
            <ul className="space-y-2">
              <li><Link to="/courses/science" className="text-apple-gray hover:text-apple-blue transition-colors">Science</Link></li>
              <li><Link to="/courses/technology" className="text-apple-gray hover:text-apple-blue transition-colors">Technology</Link></li>
              <li><Link to="/courses/engineering" className="text-apple-gray hover:text-apple-blue transition-colors">Engineering</Link></li>
              <li><Link to="/courses/arts" className="text-apple-gray hover:text-apple-blue transition-colors">Arts</Link></li>
              <li><Link to="/courses/mathematics" className="text-apple-gray hover:text-apple-blue transition-colors">Mathematics</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-apple-gray hover:text-apple-blue transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="text-apple-gray hover:text-apple-blue transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-apple-gray hover:text-apple-blue transition-colors">Contact Us</Link></li>
              <li><Link to="/parents" className="text-apple-gray hover:text-apple-blue transition-colors">Parents' Guide</Link></li>
              <li><Link to="/teachers" className="text-apple-gray hover:text-apple-blue transition-colors">Teachers' Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-apple-gray mb-4">Stay updated with our newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-l-full border border-r-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-apple-blue"
              />
              <Button className="bg-apple-blue hover:bg-blue-700 text-white rounded-r-full">
                <Mail size={18} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-apple-gray text-sm">
              &copy; {new Date().getFullYear()} SparkLearn. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-apple-gray hover:text-apple-blue transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-apple-gray hover:text-apple-blue transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-sm text-apple-gray hover:text-apple-blue transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
