
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import TimelineSection from '@/components/TimelineSection';
import FeaturesSection from '@/components/FeaturesSection';
import AIDialogDemo from '@/components/AIDialogDemo';
import CodingChallengeSection from '@/components/CodingChallengeSection';
import CoursePreviewSection from '@/components/CoursePreviewSection';
import CTASection from '@/components/CTASection';
import AgeSelectModal from '@/components/AgeSelectModal';

const Index = () => {
  const [showAgeModal, setShowAgeModal] = useState(false);
  
  useEffect(() => {
    // Check if this is the first visit (in a real app, you'd check cookies or local storage)
    const isFirstVisit = !localStorage.getItem('hasVisitedBefore');
    
    if (isFirstVisit) {
      // Show the age selection modal after a short delay
      const timer = setTimeout(() => {
        setShowAgeModal(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleAgeSelect = (ageGroup: "6-8" | "9-12" | "13-15" | "16-18") => {
    // Store the age preference and mark as visited
    localStorage.setItem('ageGroup', ageGroup);
    localStorage.setItem('hasVisitedBefore', 'true');
    
    console.log(`User selected age group: ${ageGroup}`);
    // In a real app, you would use this information to personalize content
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <TimelineSection />
        <FeaturesSection />
        <CoursePreviewSection />
        <AIDialogDemo />
        <CodingChallengeSection />
        <CTASection />
      </main>
      
      <Footer />
      
      <AgeSelectModal 
        isOpen={showAgeModal}
        onClose={() => setShowAgeModal(false)}
        onAgeSelect={handleAgeSelect}
      />
    </div>
  );
};

export default Index;
