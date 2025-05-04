
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-apple-blue to-apple-purple text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Learning Adventure?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of students on a journey through time and knowledge. 
            Start exploring science, coding, and history today!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-apple-blue hover:bg-gray-100 rounded-full px-8 py-6 text-lg group">
              <span>Create Free Account</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
              Schedule Demo
            </Button>
          </div>
          
          <p className="mt-8 text-sm opacity-75">
            No credit card required. Get started in less than 2 minutes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
