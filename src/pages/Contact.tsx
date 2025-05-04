
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, SendHorizonal } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  details: string | React.ReactNode;
}

const ContactInfo = ({ icon, title, details }: ContactInfoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref]);

  return (
    <div 
      ref={setRef} 
      className={`flex items-start p-6 rounded-xl bg-theme-dark/50 border border-theme-stone/10 scroll-reveal ${isVisible ? 'revealed' : ''}`}
    >
      <div className="mr-4 p-3 rounded-full bg-theme-navy/30 text-theme-glow">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-theme-cream mb-2">{title}</h3>
        <div className="text-theme-stone">{details}</div>
      </div>
    </div>
  );
};

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 relative">
        {/* Background elements */}
        <div className="fixed top-0 left-0 w-[600px] h-[600px] time-portal opacity-10" style={{animationDuration: '25s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-theme-navy rounded-full blur-[120px] opacity-20"></div>
        
        {/* Hero section */}
        <section className="py-12 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center scroll-reveal">
              <h1 className="mb-6 gradient-text bg-gradient-to-r from-theme-cream via-theme-sand to-theme-gold bg-clip-text text-transparent">Get in Touch</h1>
              <p className="text-xl text-theme-stone mb-10">
                Have questions about our learning platform? We're here to help! Reach out to our team through any of the channels below.
              </p>
              <div className="relative mx-auto w-24 h-1 bg-theme-glow my-8 rounded-full"></div>
            </div>
          </div>
        </section>
        
        {/* Contact information */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ContactInfo 
                icon={<Mail size={24} />}
                title="Email Us"
                details={<a href="mailto:info@timecodekids.edu" className="hover:text-theme-glow transition-colors">info@timecodekids.edu</a>}
              />
              <ContactInfo 
                icon={<Phone size={24} />}
                title="Call Us"
                details={<a href="tel:+86123456789" className="hover:text-theme-glow transition-colors">+86 123 456 789</a>}
              />
              <ContactInfo 
                icon={<MapPin size={24} />}
                title="Visit Us"
                details="123 Science Park Road, Innovation District, Shanghai, China"
              />
              <ContactInfo 
                icon={<Clock size={24} />}
                title="Working Hours"
                details="Monday-Friday: 9:00 AM - 6:00 PM"
              />
            </div>
          </div>
        </section>
        
        {/* Contact form and map */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact form */}
              <div className="lg:w-1/2 scroll-reveal">
                <div className="glass-effect rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-theme-cream mb-6">Send Us a Message</h2>
                  
                  {isSubmitted ? (
                    <div className="bg-theme-navy/30 rounded-xl p-6 text-center">
                      <div className="text-theme-glow text-5xl mb-4">✓</div>
                      <h3 className="text-xl font-medium text-theme-cream mb-2">Thank You!</h3>
                      <p className="text-theme-stone">Your message has been sent successfully. We'll get back to you soon!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-theme-stone mb-2">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full p-3 rounded-lg bg-theme-dark border border-theme-stone/20 text-theme-cream focus:border-theme-glow focus:ring focus:ring-theme-glow/20 focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-theme-stone mb-2">Your Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-3 rounded-lg bg-theme-dark border border-theme-stone/20 text-theme-cream focus:border-theme-glow focus:ring focus:ring-theme-glow/20 focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-theme-stone mb-2">Subject</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full p-3 rounded-lg bg-theme-dark border border-theme-stone/20 text-theme-cream focus:border-theme-glow focus:ring focus:ring-theme-glow/20 focus:outline-none transition-colors"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="curriculum">Curriculum Questions</option>
                          <option value="partnership">Partnership Opportunities</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-theme-stone mb-2">Your Message</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full p-3 rounded-lg bg-theme-dark border border-theme-stone/20 text-theme-cream focus:border-theme-glow focus:ring focus:ring-theme-glow/20 focus:outline-none transition-colors resize-none"
                        ></textarea>
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="hero-button group w-full"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Send Message
                            <SendHorizonal className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
              
              {/* Interactive map/location */}
              <div className="lg:w-1/2 scroll-reveal">
                <div className="glass-effect rounded-2xl p-8 h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-theme-cream mb-6">Find Us</h2>
                  
                  <div className="flex-grow rounded-xl overflow-hidden bg-theme-dark border border-theme-stone/20 relative">
                    {/* Placeholder for map - in a real implementation, this would be a real map */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-theme-stone">
                        <p>Interactive Map Placeholder</p>
                        <p className="text-sm mt-2">A real implementation would include an interactive map here</p>
                      </div>
                    </div>
                    
                    {/* Time-travel themed map overlay */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-theme-glow/30 animate-pulse-glow"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-theme-glow rounded-full animate-pulse"></div>
                      <div className="absolute bottom-4 right-4 p-3 bg-theme-dark/80 rounded-lg text-theme-cream text-sm">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2 text-theme-glow" />
                          <span>Innovation District</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-theme-cream mb-2">Our Headquarters</h3>
                    <p className="text-theme-stone mb-4">
                      Our main education center is located in the heart of Shanghai's Innovation District,
                      surrounded by tech companies and research institutions.
                    </p>
                    <Button className="hero-button-secondary group text-sm">
                      Get Directions
                      <MapPin className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ teaser */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center glass-effect rounded-2xl p-10 relative overflow-hidden scroll-reveal">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-theme-cream mb-4">Have More Questions?</h2>
                <p className="text-theme-stone mb-8">
                  Check out our frequently asked questions for quick answers to common inquiries
                  about our learning platform, curriculum, and teaching approach.
                </p>
                <Button className="hero-button group">
                  Visit FAQ Page
                </Button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-theme-glow rounded-full blur-[100px] opacity-10"></div>
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-theme-navy rounded-full blur-[80px] opacity-20"></div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
