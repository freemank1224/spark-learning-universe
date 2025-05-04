
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimelineEra {
  id: string;
  title: string;
  period: string;
  description: string;
  scientist: string;
  color: string;
  icon: string;
}

const eras: TimelineEra[] = [{
  id: "ancient",
  title: "Ancient Wisdom",
  period: "600 BCE - 400 CE",
  description: "Explore the mathematical discoveries of ancient Greece and Rome with Pythagoras.",
  scientist: "Pythagoras",
  color: "bg-era-ancient",
  icon: "🏛️"
}, {
  id: "renaissance",
  title: "Renaissance Revolution",
  period: "1400 - 1700",
  description: "Journey through the scientific revolution with Leonardo da Vinci.",
  scientist: "Leonardo da Vinci",
  color: "bg-era-renaissance",
  icon: "🎨"
}, {
  id: "industrial",
  title: "Industrial Age",
  period: "1760 - 1900",
  description: "Discover electricity and magnetism with Michael Faraday.",
  scientist: "Michael Faraday",
  color: "bg-era-industrial",
  icon: "⚙️"
}, {
  id: "digital",
  title: "Digital Dawn",
  period: "1940 - 2000",
  description: "Explore the birth of computing with Ada Lovelace.",
  scientist: "Ada Lovelace",
  color: "bg-era-digital",
  icon: "💻"
}, {
  id: "ai",
  title: "AI Revolution",
  period: "2000 - Present",
  description: "Understand modern AI with Alan Turing and beyond.",
  scientist: "Alan Turing",
  color: "bg-era-ai",
  icon: "🤖"
}];

const TimelineSection = () => {
  const [activeEra, setActiveEra] = useState<string>("renaissance");
  const [animationDirection, setAnimationDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const currentEraIndex = eras.findIndex(era => era.id === activeEra);
  const currentEra = eras[currentEraIndex];
  
  // Detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    const section = document.getElementById('timeline-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleEraClick = (eraId: string) => {
    const newIndex = eras.findIndex(era => era.id === eraId);
    const currentIndex = eras.findIndex(era => era.id === activeEra);
    if (newIndex === currentIndex) return;
    setAnimationDirection(newIndex > currentIndex ? "right" : "left");
    setIsAnimating(true);
    setActiveEra(eraId);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNavClick = (direction: "prev" | "next") => {
    let newIndex = currentEraIndex;
    if (direction === "prev") {
      newIndex = Math.max(0, currentEraIndex - 1);
      setAnimationDirection("left");
    } else {
      newIndex = Math.min(eras.length - 1, currentEraIndex + 1);
      setAnimationDirection("right");
    }
    if (newIndex !== currentEraIndex) {
      setIsAnimating(true);
      setActiveEra(eras[newIndex].id);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <section id="timeline-section" className={`py-16 relative overflow-hidden bg-theme-dark`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTR2LTZoLTZ2LTRoNnYtNmg0djZoNnY0aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="time-portal w-[600px] h-[600px] -left-[300px] top-[50%] transform -translate-y-1/2 opacity-10"></div>
        <div className="time-portal w-[500px] h-[500px] -right-[200px] top-[40%] transform -translate-y-1/2 opacity-10" style={{animationDelay: '3s', animationDirection: 'reverse'}}></div>
      </div>
      
      <div className="container mx-auto px-4">
        <h2 className={`text-center mb-12 text-theme-cream transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Travel Through Time
        </h2>
        
        <div className={`timeline-container mx-auto mb-16 transition-all duration-1000 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="timeline-line"></div>
          
          {eras.map((era, index) => (
            <div key={era.id} className="relative">
              <button 
                onClick={() => handleEraClick(era.id)} 
                className={cn(
                  "timeline-node",
                  activeEra === era.id && "active",
                  era.color, 
                  isVisible && `animate-fade-in-slow`
                )}
                style={{ animationDelay: `${index * 200}ms` }}
                aria-label={`Go to ${era.title} era`}
              >
                <span className="text-2xl">{era.icon}</span>
              </button>
              <div className={cn(
                "absolute -bottom-8 whitespace-nowrap text-xs font-medium text-theme-stone",
                index === 0 ? "left-0" : "",
                index === eras.length - 1 ? "right-0" : "",
                !(index === 0 || index === eras.length - 1) && "left-1/2 transform -translate-x-1/2"
              )}>
                {era.period}
              </div>
            </div>
          ))}
        </div>
        
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex justify-between items-center mb-8">
            <Button variant="ghost" size="icon" className="rounded-full text-theme-stone hover:text-theme-cream hover:bg-theme-navy/30" onClick={() => handleNavClick("prev")} disabled={currentEraIndex === 0}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <h3 className="text-3xl font-bold text-center text-theme-cream">{currentEra.title}</h3>
            
            <Button variant="ghost" size="icon" className="rounded-full text-theme-stone hover:text-theme-cream hover:bg-theme-navy/30" onClick={() => handleNavClick("next")} disabled={currentEraIndex === eras.length - 1}>
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
          
          <div className={cn(
            "relative glass-effect rounded-2xl shadow-lg p-8 overflow-hidden border border-theme-stone/20",
            isAnimating && animationDirection === "right" && "animate-slide-from-right",
            isAnimating && animationDirection === "left" && "animate-slide-from-left"
          )}>
            <div className={`absolute top-0 left-0 h-2 w-full ${currentEra.color}`}></div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2">
                <div className={`w-24 h-24 rounded-full ${currentEra.color} flex items-center justify-center text-4xl mb-4 animate-pulse-glow`}>
                  {currentEra.icon}
                </div>
                <h4 className="text-xl font-bold mb-2 text-theme-cream">Meet {currentEra.scientist}</h4>
                <p className="text-theme-stone mb-4">
                  {currentEra.description}
                </p>
                <Button className="bg-theme-glow hover:bg-theme-glow/90 text-theme-dark font-medium neon-border">
                  Start Journey
                </Button>
              </div>
              
              <div className="w-full md:w-1/2 h-60 bg-theme-dark/50 border border-theme-stone/20 rounded-lg flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-theme-navy/20 via-transparent to-theme-gold/10 opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-theme-navy via-theme-teal to-theme-glow opacity-20 animate-pulse-glow"></div>
                </div>
                <div className="relative z-10 text-center transition-all duration-500 transform group-hover:scale-110">
                  <p className="text-theme-cream text-lg font-medium mb-2">Interactive visualization</p>
                  <p className="text-theme-stone text-sm">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
