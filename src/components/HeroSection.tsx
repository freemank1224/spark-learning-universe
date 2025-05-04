
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AgeSelectModal from './AgeSelectModal';

type AgeGroup = "6-8" | "9-12" | "13-15" | "16-18";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    title: false,
    description: false,
    buttons: false,
    visual: false
  });
  
  // Handle scroll events for parallax and reveal animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleReveal = () => {
      setIsVisible({
        title: true,
        description: true,
        buttons: true,
        visual: true
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger reveal animations after a short delay
    const timer = setTimeout(handleReveal, 300);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  const handleStartAdventure = () => {
    setIsModalOpen(true);
  };
  
  const handleAgeSelect = (age: AgeGroup) => {
    console.log(`Age group selected: ${age}`);
    // Here you would typically save the age preference and redirect
  };
  
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.15}px)`
  };
  
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-theme-dark overflow-hidden">
        {/* Time portal effect */}
        <div className="time-portal w-[800px] h-[800px] -right-[300px] -top-[300px]"></div>
        <div className="time-portal w-[500px] h-[500px] -left-[200px] -bottom-[100px]" style={{animationDelay: '2s', animationDirection: 'reverse'}}></div>
        
        {/* Particles and stars */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-theme-gold rounded-full opacity-5 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-theme-clay rounded-full opacity-5 animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-theme-teal rounded-full opacity-5 animate-float" style={{animationDelay: '2.3s'}}></div>
        
        {/* Tech pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTR2LTZoLTZ2LTRoNnYtNmg0djZoNnY0aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`space-y-8 transition-all duration-1000 ${isVisible.title ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text bg-gradient-to-r from-theme-cream via-theme-sand to-theme-gold bg-clip-text text-transparent">
              Journey Through Science and Code
            </h1>
            
            <p className={`text-xl md:text-2xl text-theme-stone mt-6 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible.description ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              Join "小飞码" on an interactive adventure through history, meeting famous scientists and solving coding challenges along the way.
            </p>
            
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 transition-all duration-1000 delay-500 ${isVisible.buttons ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <Button 
                onClick={handleStartAdventure}
                className="hero-button group relative neon-border"
              >
                <span className="relative z-10">Start Your Adventure</span>
                <span className="absolute inset-0 bg-gradient-to-r from-theme-navy to-theme-glow opacity-0 group-hover:opacity-20 rounded-full transition-opacity"></span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button className="hero-button-secondary">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible.visual ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative group">
              <div className="glass-effect rounded-2xl p-6 md:p-10 transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="aspect-video bg-theme-dark rounded-lg flex items-center justify-center overflow-hidden relative border border-theme-stone/20">
                  {/* Time journey visualization */}
                  <div className="absolute inset-0 bg-gradient-to-br from-theme-navy via-theme-dark to-theme-dark opacity-80"></div>
                  
                  <div className="parallax-bg" style={parallaxStyle}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-theme-navy via-theme-teal to-theme-glow animate-pulse-glow opacity-20"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[200px] h-[200px] rounded-full border-4 border-theme-glow/30 animate-rotate-slow opacity-50"></div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <p className="text-theme-cream text-xl font-semibold mb-2">Time Travel Adventure</p>
                    <p className="text-theme-stone text-sm">Discover the wonders of science and code through time</p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-theme-cream">小飞码's Journey</h3>
                    <p className="text-theme-stone text-sm">A time-traveling adventure through scientific history</p>
                  </div>
                  
                  <Button className="bg-theme-glow text-theme-dark hover:bg-theme-glow/90 rounded-full transition-all hover:scale-105">
                    Watch Trailer
                  </Button>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-theme-glow rounded-full blur-[80px] opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-theme-navy rounded-full blur-[100px] opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
      
      <AgeSelectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAgeSelect={handleAgeSelect}
      />
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-subtle">
        <span className="text-theme-stone text-sm mb-2">Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
