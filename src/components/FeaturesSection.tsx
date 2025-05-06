import { Code, Rocket, Brain, Puzzle, MessageSquare, Image } from 'lucide-react';
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const Feature = ({
  icon,
  title,
  description
}: FeatureProps) => {
  return <div className="feature-card">
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-apple-gray">{description}</p>
    </div>;
};
const FeaturesSection = () => {
  return <section className="py-16 bg-apple-light-gray bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Learning Adventure</h2>
          <p className="text-lg text-apple-gray">
            Discover how SparkLearn combines storytelling, coding challenges, and interactive 
            learning to create an engaging educational experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature icon={<MessageSquare size={32} />} title="AI Conversations" description="Chat with historical scientists and get personalized guidance from AI tutors tailored to your age and learning progress." />
          
          <Feature icon={<Code size={32} />} title="Interactive Coding" description="Learn programming through fun challenges and projects that bring scientific concepts to life." />
          
          <Feature icon={<Rocket size={32} />} title="Project-Based Learning" description="Apply your knowledge in long-term projects that encourage creativity and critical thinking." />
          
          <Feature icon={<Brain size={32} />} title="Adaptive Learning" description="Our AI adjusts content difficulty and presentation based on your age and progress." />
          
          <Feature icon={<Image size={32} />} title="Dynamic Visuals" description="AI-generated images and animations make complex concepts easier to understand." />
          
          <Feature icon={<Puzzle size={32} />} title="Cross-Subject Integration" description="Connect science, technology, engineering, arts, and math through engaging storylines." />
        </div>
      </div>
    </section>;
};
export default FeaturesSection;