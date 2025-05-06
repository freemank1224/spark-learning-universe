
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Code, FileCode, Braces, Terminal, BookOpen, SendHorizonal } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProgrammingInfoProps {
  icon: React.ReactNode;
  title: string;
  details: string | React.ReactNode;
}

const ProgrammingInfo = ({ icon, title, details }: ProgrammingInfoProps) => {
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
      className={`flex items-start p-6 rounded-xl bg-theme-dark/50 border border-theme-stone/10 scroll-reveal ${isVisible ? 'revealed' : ''}`}
    >
      <div className="mr-4 p-3 rounded-full bg-theme-navy/30 text-theme-glow">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-theme-cream mb-2">{title}</h3>
        <div className="text-theme-stone">{details}</div>
      </div>
    </div>
  );
};

const Programming = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    language: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', language: '', subject: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
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
        <div className="fixed top-0 left-0 w-[600px] h-[600px] time-portal opacity-10" style={{animationDuration: '25s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-theme-navy rounded-full blur-[120px] opacity-20"></div>
        
        {/* Hero section */}
        <section className="py-12 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center scroll-reveal">
              <h1 className="mb-6 gradient-text bg-gradient-to-r from-theme-cream via-theme-sand to-theme-gold bg-clip-text text-transparent">Programming Hub</h1>
              <p className="text-xl text-theme-stone mb-10">
                Explore our programming resources and tools. Submit your code for review or ask for programming help with our expert tutors.
              </p>
              <div className="relative mx-auto w-24 h-1 bg-theme-glow my-8 rounded-full"></div>
            </div>
          </div>
        </section>
        
        {/* Programming information */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProgrammingInfo 
                icon={<Code size={24} />}
                title="Languages"
                details="Python, JavaScript, Java, C++, and more for students of all experience levels"
              />
              <ProgrammingInfo 
                icon={<Terminal size={24} />}
                title="Tools"
                details={<>Interactive coding environments with real-time feedback and visualization</>}
              />
              <ProgrammingInfo 
                icon={<Braces size={24} />}
                title="Projects"
                details="Guided programming projects that build real-world skills and portfolio pieces"
              />
              <ProgrammingInfo 
                icon={<BookOpen size={24} />}
                title="Learning Path"
                details="Structured curriculum from basics to advanced topics with expert guidance"
              />
            </div>
          </div>
        </section>
        
        {/* Code submission form and editor */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Code submission form */}
              <div className="lg:w-1/2 scroll-reveal">
                <div className="glass-effect rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-theme-cream mb-6">Submit Your Code</h2>
                  
                  {isSubmitted ? (
                    <div className="bg-theme-navy/30 rounded-xl p-6 text-center">
                      <div className="text-theme-glow text-5xl mb-4">✓</div>
                      <h3 className="text-xl font-medium text-theme-cream mb-2">Thank You!</h3>
                      <p className="text-theme-stone">Your code has been submitted successfully. Our tutors will review it soon!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-theme-stone mb-2">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full p-3 rounded-lg bg-theme-dark border border-theme-stone/20 text-theme-cream focus:border-theme-glow focus:ring focus:ring-theme-glow/20 focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="language" className="block text-theme-stone mb-2">Programming Language</label>
                        <select
                          id="language"
                          name="language"
                          value={formData.language}
                          onChange={handleChange}
                          required
                          className="w-full p-3 rounded-lg bg-theme-dark border border-theme-stone/20 text-theme-cream focus:border-theme-glow focus:ring focus:ring-theme-glow/20 focus:outline-none transition-colors"
                        >
                          <option value="">Select a language</option>
                          <option value="python">Python</option>
                          <option value="javascript">JavaScript</option>
                          <option value="java">Java</option>
                          <option value="cpp">C++</option>
                          <option value="csharp">C#</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-theme-stone mb-2">Topic</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full p-3 rounded-lg bg-theme-dark border border-theme-stone/20 text-theme-cream focus:border-theme-glow focus:ring focus:ring-theme-glow/20 focus:outline-none transition-colors"
                        >
                          <option value="">Select a topic</option>
                          <option value="debugging">Code Debugging</option>
                          <option value="review">Code Review</option>
                          <option value="optimization">Optimization</option>
                          <option value="algorithms">Algorithms & Data Structures</option>
                          <option value="project">Project Help</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-theme-stone mb-2">Your Code</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={8}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Paste your code here..."
                          className="w-full p-3 rounded-lg bg-theme-dark border border-theme-stone/20 text-theme-cream focus:border-theme-glow focus:ring focus:ring-theme-glow/20 focus:outline-none transition-colors font-mono text-sm resize-none"
                        ></textarea>
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="hero-button group w-full"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Submit Code
                            <SendHorizonal className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
              
              {/* Coding environment preview */}
              <div className="lg:w-1/2 scroll-reveal">
                <div className="glass-effect rounded-2xl p-8 h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-theme-cream mb-6">Interactive Coding Environment</h2>
                  
                  <div className="flex-grow rounded-xl overflow-hidden bg-theme-dark border border-theme-stone/20 relative">
                    {/* Code editor mockup */}
                    <div className="absolute inset-0 flex flex-col">
                      <div className="bg-theme-navy/30 p-2 flex items-center border-b border-theme-stone/10">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="mx-auto text-sm text-theme-stone">main.py</div>
                      </div>
                      <div className="flex-grow p-4 font-mono text-sm overflow-auto text-theme-cream">
                        <pre className="text-theme-stone"><span className="text-blue-400">def</span> <span className="text-green-400">fibonacci</span>(<span className="text-orange-400">n</span>):</pre>
                        <pre className="text-theme-stone pl-4"><span className="text-blue-400">if</span> n <span className="text-blue-400">in</span> [<span className="text-purple-400">0</span>, <span className="text-purple-400">1</span>]:</pre>
                        <pre className="text-theme-stone pl-8"><span className="text-blue-400">return</span> n</pre>
                        <pre className="text-theme-stone pl-4"><span className="text-blue-400">return</span> fibonacci(n-<span className="text-purple-400">1</span>) + fibonacci(n-<span className="text-purple-400">2</span>)</pre>
                        <pre className="text-theme-stone"> </pre>
                        <pre className="text-theme-stone"><span className="text-green-400">result</span> = [fibonacci(i) <span className="text-blue-400">for</span> i <span className="text-blue-400">in</span> <span className="text-blue-400">range</span>(<span className="text-purple-400">10</span>)]</pre>
                        <pre className="text-theme-stone"><span className="text-blue-400">print</span>(result)</pre>
                        <pre className="text-theme-stone"> </pre>
                        <pre className="text-theme-stone"><span className="text-gray-500"># Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]</span></pre>
                      </div>
                      <div className="bg-theme-navy/30 p-2 border-t border-theme-stone/10 text-theme-cream text-sm font-mono">
                        <span className="text-green-400">➜ python main.py</span><br />
                        [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-theme-cream mb-2">Real-time Coding Practice</h3>
                    <p className="text-theme-stone mb-4">
                      Our interactive coding environments let you write, test, and debug code directly in your browser
                      with instant feedback and visualizations to help you understand complex concepts.
                    </p>
                    <Button className="hero-button-secondary group text-sm">
                      Try it now
                      <FileCode className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Resources teaser */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center glass-effect rounded-2xl p-10 relative overflow-hidden scroll-reveal">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-theme-cream mb-4">Coding Resources</h2>
                <p className="text-theme-stone mb-8">
                  Explore our extensive library of coding tutorials, cheatsheets, and practice problems
                  designed to help you master programming concepts at your own pace.
                </p>
                <Button className="hero-button group">
                  Browse Resources
                </Button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-theme-glow rounded-full blur-[100px] opacity-10"></div>
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-theme-navy rounded-full blur-[80px] opacity-20"></div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Programming;
