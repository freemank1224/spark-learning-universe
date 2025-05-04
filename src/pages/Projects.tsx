
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Code, FileCode, Github, ExternalLink, Star, FileText, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeframe: string;
  index: number;
}

const ProjectCard = ({ title, description, image, tags, difficulty, timeframe, index }: ProjectCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const difficultyColor = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-red-500'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100); // Staggered reveal
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
  }, [ref, index]);

  return (
    <div 
      ref={setRef}
      className={`apple-card scroll-reveal ${isVisible ? 'revealed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <div className={`absolute inset-0 bg-theme-navy/50 ${isHovered ? 'opacity-30' : 'opacity-50'} transition-opacity duration-300`}></div>
        <div className="absolute inset-0 flex items-center justify-center text-5xl">
          {image}
        </div>
        <div className={`absolute inset-0 flex items-center justify-center opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-300 bg-theme-dark/80`}>
          <div className="flex space-x-3">
            <Button size="sm" variant="outline" className="rounded-full border-theme-glow text-theme-glow hover:bg-theme-glow/10">
              <FileText size={16} className="mr-1" />
              Details
            </Button>
            <Button size="sm" className="rounded-full bg-theme-glow text-theme-dark hover:bg-theme-glow/90">
              <Code size={16} className="mr-1" />
              Try it
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-theme-cream">{title}</h3>
          <div className={`${difficultyColor[difficulty]} h-3 w-3 rounded-full mt-2`}></div>
        </div>
        
        <p className="text-theme-stone mb-4">{description}</p>
        
        <div className="flex items-center text-sm text-theme-stone mb-4">
          <Clock size={16} className="mr-1" />
          <span>{timeframe}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-2 py-1 text-xs rounded-full bg-theme-navy/40 text-theme-stone/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectFilter = ({ categories, activeCategory, onCategoryChange }: { 
  categories: string[], 
  activeCategory: string, 
  onCategoryChange: (category: string) => void 
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full text-sm transition-all ${
            activeCategory === category 
              ? 'bg-theme-glow text-theme-dark' 
              : 'bg-theme-dark/50 text-theme-stone hover:bg-theme-navy/50'
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const categories = ['All Projects', 'Science', 'Coding', 'Mathematics', 'History', 'Art'];
  
  const projects = [
    {
      title: "Build a Time Machine",
      description: "Learn about time dilation and relativity while building a virtual time machine simulation.",
      image: "⏰",
      tags: ["Physics", "Coding", "3D Modeling"],
      difficulty: "intermediate" as const,
      timeframe: "3-4 weeks",
      category: "Science"
    },
    {
      title: "Ancient Egyptian Calculator",
      description: "Create a calculator that uses ancient Egyptian mathematics principles.",
      image: "🔢",
      tags: ["History", "Mathematics", "UI Design"],
      difficulty: "beginner" as const,
      timeframe: "1-2 weeks",
      category: "Mathematics"
    },
    {
      title: "Leonardo's Flying Machine",
      description: "Recreate da Vinci's flying machine and test aerodynamics principles.",
      image: "✈️",
      tags: ["History", "Engineering", "Physics"],
      difficulty: "advanced" as const,
      timeframe: "4-6 weeks",
      category: "Science"
    },
    {
      title: "Code Your Own Chatbot",
      description: "Build a simple AI chatbot that can answer questions about science.",
      image: "🤖",
      tags: ["AI", "Coding", "NLP"],
      difficulty: "intermediate" as const,
      timeframe: "2-3 weeks",
      category: "Coding"
    },
    {
      title: "Renaissance Art Explorer",
      description: "Create an interactive gallery of Renaissance art with historical context.",
      image: "🎨",
      tags: ["Art History", "UI Design", "Database"],
      difficulty: "beginner" as const,
      timeframe: "1-2 weeks",
      category: "Art"
    },
    {
      title: "Historical Timeline Generator",
      description: "Build a program that generates interactive timelines of scientific discoveries.",
      image: "📜",
      tags: ["History", "Data Visualization", "Coding"],
      difficulty: "intermediate" as const,
      timeframe: "2-3 weeks",
      category: "History"
    }
  ];
  
  const filteredProjects = activeCategory === 'All Projects' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
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
        <div className="fixed top-1/3 right-0 w-[500px] h-[500px] time-portal opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-theme-navy rounded-full blur-[120px] opacity-20"></div>
        
        {/* Hero section */}
        <section className="py-12 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center scroll-reveal">
              <h1 className="mb-6 gradient-text bg-gradient-to-r from-theme-cream via-theme-sand to-theme-gold bg-clip-text text-transparent">
                Interactive Projects
              </h1>
              <p className="text-xl text-theme-stone mb-10">
                Hands-on projects that combine history, science, and programming to create
                memorable learning experiences.
              </p>
              <div className="relative mx-auto w-24 h-1 bg-theme-glow my-8 rounded-full"></div>
            </div>
          </div>
        </section>
        
        {/* Projects section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <ProjectFilter 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  index={index}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  difficulty={project.difficulty}
                  timeframe={project.timeframe}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured project */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="glass-effect rounded-2xl overflow-hidden scroll-reveal">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 aspect-auto lg:aspect-auto relative">
                  <div className="absolute inset-0 bg-theme-navy/50"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-9xl">
                    🧬
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-theme-dark to-transparent h-1/3"></div>
                </div>
                
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="inline-block px-3 py-1 rounded-full bg-theme-glow/20 text-theme-glow text-sm font-medium mb-4">
                    Featured Project
                  </div>
                  
                  <h2 className="text-3xl font-bold text-theme-cream mb-4">The DNA Time Capsule</h2>
                  
                  <p className="text-theme-stone mb-6">
                    A multi-stage project that takes students through the history of DNA discovery,
                    from ancient theories of heredity to modern genetic engineering. Students will build
                    a virtual DNA analysis tool as they progress through scientific history.
                  </p>
                  
                  <div className="flex items-center space-x-8 mb-8">
                    <div className="flex items-center">
                      <Clock size={20} className="mr-2 text-theme-stone" />
                      <span className="text-theme-stone">8-10 weeks</span>
                    </div>
                    <div className="flex items-center">
                      <Star size={20} className="mr-2 text-yellow-500" />
                      <span className="text-theme-stone">Advanced</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 text-sm rounded-full bg-theme-navy/40 text-theme-stone">Biology</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-theme-navy/40 text-theme-stone">History of Science</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-theme-navy/40 text-theme-stone">Data Analysis</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-theme-navy/40 text-theme-stone">Coding</span>
                  </div>
                  
                  <Button className="hero-button group mr-4">
                    Start Project
                    <Code className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  
                  <Button variant="outline" className="rounded-full border-theme-stone/50 text-theme-stone hover:bg-theme-navy/30 hover:text-theme-cream">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA for teachers */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center glass-effect rounded-2xl p-10 relative overflow-hidden scroll-reveal">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-theme-cream mb-4">For Educators</h2>
                <p className="text-theme-stone mb-8">
                  Are you a teacher looking for project-based learning resources?
                  We offer curated project collections aligned with curriculum standards.
                </p>
                <Button className="hero-button group">
                  Access Educator Resources
                </Button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-theme-teal rounded-full blur-[100px] opacity-10"></div>
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-theme-gold rounded-full blur-[80px] opacity-20"></div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
