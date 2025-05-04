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
  const currentEraIndex = eras.findIndex(era => era.id === activeEra);
  const currentEra = eras[currentEraIndex];
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
  useEffect(() => {
    // Reset animation state
    return () => {
      setIsAnimating(false);
      setAnimationDirection(null);
    };
  }, []);
  return <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-12">Travel Through Time</h2>
        
        <div className="timeline-container mx-auto mb-16">
          <div className="timeline-line"></div>
          
          {eras.map((era, index) => <div key={era.id} className="relative">
              <button onClick={() => handleEraClick(era.id)} className={cn("timeline-node", activeEra === era.id && "active", era.color)} aria-label={`Go to ${era.title} era`}>
                <span className="text-2xl">{era.icon}</span>
              </button>
              <div className={cn("absolute -bottom-8 whitespace-nowrap text-xs font-medium", index === 0 ? "left-0" : "", index === eras.length - 1 ? "right-0" : "", !(index === 0 || index === eras.length - 1) && "left-1/2 transform -translate-x-1/2")}>
                {era.period}
              </div>
            </div>)}
        </div>
        
        <div className="max-w-4xl mx-auto bg-red-900">
          <div className="flex justify-between items-center mb-8">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => handleNavClick("prev")} disabled={currentEraIndex === 0}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <h3 className="text-3xl font-bold text-center">{currentEra.title}</h3>
            
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => handleNavClick("next")} disabled={currentEraIndex === eras.length - 1}>
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
          
          <div className={cn("relative bg-white rounded-2xl shadow-lg p-8 overflow-hidden", isAnimating && animationDirection === "right" && "animate-slide-from-right", isAnimating && animationDirection === "left" && "animate-slide-from-left")}>
            <div className={`absolute top-0 left-0 h-2 w-full ${currentEra.color}`}></div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2">
                <div className={`w-24 h-24 rounded-full ${currentEra.color} flex items-center justify-center text-4xl mb-4`}>
                  {currentEra.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">Meet {currentEra.scientist}</h4>
                <p className="text-apple-gray mb-4">
                  {currentEra.description}
                </p>
                <Button className="bg-apple-blue hover:bg-blue-700 text-white">
                  Start Journey
                </Button>
              </div>
              
              <div className="w-full md:w-1/2 h-60 bg-apple-light-gray rounded-lg flex items-center justify-center">
                <p className="text-apple-gray">Interactive visualization will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default TimelineSection;