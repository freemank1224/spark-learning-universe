
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Course2 = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-theme-dark">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse-glow text-theme-glow">
            <span className="text-3xl">Loading your astronomical journey...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-theme-dark">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-theme-cream mb-6">Astronomical Discoveries with Galileo</h1>
        
        <div className="max-w-lg mx-auto backdrop-blur-md bg-theme-dark/60 border border-theme-stone/20 rounded-lg p-8 mb-8">
          <img 
            src="https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
            alt="Galileo Course" 
            className="w-full h-48 object-cover rounded-md mb-6"
          />
          
          <p className="text-theme-stone mb-6">
            This course is currently under development. Our team is working with the spirit of Galileo to create
            an immersive learning experience about astronomy, telescopes, and the solar system.
          </p>
          
          <Button asChild className="bg-theme-navy/80 hover:bg-theme-navy text-theme-cream">
            <Link to="/courses">
              <BookOpen className="h-4 w-4 mr-2" />
              Return to Courses
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Course2;
