
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AgeSelectModal from './AgeSelectModal';

type AgeGroup = "6-8" | "9-12" | "13-15" | "16-18";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleStartAdventure = () => {
    setIsModalOpen(true);
  };
  
  const handleAgeSelect = (age: AgeGroup) => {
    console.log(`Age group selected: ${age}`);
    // Here you would typically save the age preference and redirect
  };
  
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-apple-light-purple rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-apple-purple rounded-full opacity-10 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-apple-blue rounded-full opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 animate-fade-in-slow">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Journey Through Science and Code
            </h1>
            
            <p className="text-xl md:text-2xl text-apple-gray mt-6 max-w-3xl mx-auto">
              Join "小飞码" on an interactive adventure through history, meeting famous scientists and solving coding challenges along the way.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button 
                onClick={handleStartAdventure}
                className="hero-button group"
              >
                <span>Start Your Adventure</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button className="hero-button-secondary">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="mt-16 animate-fade-in" style={{animationDelay: '0.5s'}}>
            <div className="relative">
              <div className="glass-effect rounded-2xl p-6 md:p-10">
                <div className="aspect-video bg-apple-light-gray rounded-lg flex items-center justify-center">
                  <p className="text-apple-gray">AI-generated story visualization will appear here</p>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">小飞码's Journey</h3>
                    <p className="text-apple-gray text-sm">A time-traveling adventure through scientific history</p>
                  </div>
                  
                  <Button className="bg-apple-blue text-white rounded-full">
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AgeSelectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAgeSelect={handleAgeSelect}
      />
    </section>
  );
};

export default HeroSection;
