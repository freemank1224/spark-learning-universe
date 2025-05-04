
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Book, Code, Rocket, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AboutSection = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
};

const ValueCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
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
      className={`feature-card scroll-reveal ${isVisible ? 'revealed' : ''}`}
      style={{ transitionDelay: `${Math.random() * 0.3}s` }}
    >
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-theme-cream">{title}</h3>
      <p className="text-theme-stone">{description}</p>
    </div>
  );
};

const TeamMember = ({ name, role, image }: { name: string, role: string, image: string }) => {
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
      className={`flex flex-col items-center scroll-reveal ${isVisible ? 'revealed' : ''}`}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-theme-glow neon-border">
        <div className="w-full h-full bg-theme-dark flex items-center justify-center text-4xl">
          {image || "👤"}
        </div>
      </div>
      <h4 className="text-lg font-medium text-theme-cream">{name}</h4>
      <p className="text-theme-stone">{role}</p>
    </div>
  );
};

const About = () => {
  // Animation on scroll functionality
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
        {/* Background time portal */}
        <div className="fixed top-0 right-0 w-[800px] h-[800px] time-portal opacity-10"></div>
        
        {/* Hero section */}
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center scroll-reveal">
              <h1 className="mb-6 gradient-text bg-gradient-to-r from-theme-cream via-theme-sand to-theme-gold bg-clip-text text-transparent">About Our Mission</h1>
              <p className="text-xl text-theme-stone mb-10">
                We're on a mission to revolutionize how children learn about science, technology,
                engineering, and mathematics through interactive storytelling and coding challenges.
              </p>
              <div className="relative mx-auto w-24 h-1 bg-theme-glow my-8 rounded-full"></div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-theme-navy rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-theme-gold rounded-full blur-[80px] opacity-10"></div>
        </section>

        {/* Our values section */}
        <AboutSection className="bg-theme-dark/50">
          <div className="max-w-3xl mx-auto text-center mb-12 scroll-reveal">
            <h2 className="text-theme-cream mb-4">Our Values</h2>
            <p className="text-lg text-theme-stone">
              We believe that learning should be an adventure that sparks curiosity and ignites imagination.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Rocket size={30} />}
              title="Exploration"
              description="We encourage children to explore concepts through interactive experiences and self-guided discovery."
            />
            <ValueCard 
              icon={<Code size={30} />}
              title="Technical Literacy"
              description="We believe coding and technical skills are fundamental literacies for the future."
            />
            <ValueCard 
              icon={<Star size={30} />}
              title="Creativity"
              description="We foster creative thinking by combining arts with technical disciplines."
            />
            <ValueCard 
              icon={<Clock size={30} />}
              title="Historical Context"
              description="We connect modern innovations with their historical roots through storytelling."
            />
            <ValueCard 
              icon={<Users size={30} />}
              title="Inclusivity"
              description="Our platform is designed to be accessible and engaging for children of all backgrounds."
            />
            <ValueCard 
              icon={<Book size={30} />}
              title="Lifelong Learning"
              description="We instill a passion for continuous learning that extends beyond the classroom."
            />
          </div>
        </AboutSection>

        {/* Our approach section */}
        <AboutSection>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 scroll-reveal">
              <h2 className="mb-6 text-theme-cream">Our Approach</h2>
              <p className="text-theme-stone mb-6">
                Our unique approach combines storytelling, historical context, and interactive coding challenges
                to create a truly immersive learning experience. By traveling through time with 小飞码,
                students engage with scientific concepts in their historical context.
              </p>
              <p className="text-theme-stone mb-8">
                We leverage cutting-edge AI technology to create personalized learning experiences that
                adapt to each child's age, interests, and progress. Our platform grows with your child,
                offering increasingly complex challenges as they develop their skills.
              </p>
              <Button className="hero-button group">
                Learn More About Our Method
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="lg:w-1/2 scroll-reveal">
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <div className="absolute inset-0 bg-theme-navy opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-theme-stone">Interactive Demo Placeholder</div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-theme-gold rounded-full blur-[100px] opacity-10"></div>
                <div className="neon-border absolute inset-0"></div>
              </div>
            </div>
          </div>
        </AboutSection>

        {/* Team section */}
        <AboutSection className="bg-theme-dark/50">
          <div className="max-w-3xl mx-auto text-center mb-12 scroll-reveal">
            <h2 className="text-theme-cream mb-4">Our Team</h2>
            <p className="text-lg text-theme-stone">
              Meet the passionate educators, developers, and storytellers behind our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <TeamMember name="Dr. Li Ming" role="Chief Education Officer" image="👩‍🔬" />
            <TeamMember name="Zhang Wei" role="Lead Developer" image="👨‍💻" />
            <TeamMember name="Sarah Johnson" role="Curriculum Designer" image="👩‍🏫" />
            <TeamMember name="Michael Chen" role="AI Specialist" image="🧠" />
            <TeamMember name="Emma Rodriguez" role="UX Designer" image="🎨" />
            <TeamMember name="David Wang" role="Content Writer" image="✍️" />
            <TeamMember name="Liu Yan" role="Science Advisor" image="🔬" />
            <TeamMember name="James Wilson" role="Educational Psychologist" image="🧠" />
          </div>
        </AboutSection>

        {/* CTA section */}
        <AboutSection>
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <div className="glass-effect rounded-2xl p-12 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-theme-cream mb-6">Ready to Start the Journey?</h2>
                <p className="text-theme-stone mb-8">
                  Join thousands of children on an adventure through time and knowledge.
                  Explore science, coding, and history together!
                </p>
                <Button className="hero-button group">
                  Begin Your Adventure
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              
              {/* Decorative portal effect */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-theme-navy rounded-full blur-[50px] opacity-30"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-theme-glow rounded-full blur-[50px] opacity-20"></div>
            </div>
          </div>
        </AboutSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
