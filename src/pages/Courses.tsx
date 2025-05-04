
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  BookOpen, 
  Mic, 
  Code, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  Volume2,
  FileText,
  Settings,
  Share2,
  User
} from 'lucide-react';

// Import profile images
const profileImages = {
  galileo: "https://images.unsplash.com/photo-1527034029726-75c5168677b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80",
  leonardo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80",
  ada: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80",
  ai: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80",
};

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Message {
  id: string;
  sender: 'scientist' | 'user' | 'ai';
  content: string;
  timestamp: Date;
  senderName?: string;
  profileImage?: string;
}

interface Tool {
  id: string;
  name: string;
  icon: JSX.Element;
  active?: boolean;
}

interface Achievement {
  id: string;
  title: string;
  progress: number;
  maxValue: number;
}

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeEra, setActiveEra] = useState('renaissance');
  const [currentTool, setCurrentTool] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'scientist',
      content: 'Welcome to my workshop in Florence! I am Leonardo da Vinci, and today we will explore the principles of flight through mathematics and observation.',
      timestamp: new Date(),
      senderName: 'Leonardo da Vinci',
      profileImage: profileImages.leonardo
    },
    {
      id: '2',
      sender: 'user',
      content: 'I'm excited to learn about flight! How do birds stay in the air?',
      timestamp: new Date(),
    },
    {
      id: '3',
      sender: 'scientist',
      content: 'An excellent question! Birds stay aloft through a delicate balance of four forces: lift, weight, thrust, and drag. Let's examine these forces using mathematical principles.',
      timestamp: new Date(),
      senderName: 'Leonardo da Vinci',
      profileImage: profileImages.leonardo
    },
    {
      id: '4',
      sender: 'ai',
      content: 'You can ask Leonardo about his flying machine designs or try the virtual experiment tool to test different wing shapes!',
      timestamp: new Date(),
      senderName: 'Flying Code',
      profileImage: profileImages.ai
    },
  ]);

  const tasks: Task[] = [
    { id: '1', title: 'Study bird wing anatomy', completed: true },
    { id: '2', title: 'Calculate lift-to-drag ratio', completed: false },
    { id: '3', title: 'Design a simple wing prototype', completed: false },
    { id: '4', title: 'Test your design in the simulator', completed: false },
    { id: '5', title: 'Complete the coding challenge', completed: false },
  ];

  const achievements: Achievement[] = [
    { id: '1', title: 'Renaissance Apprentice', progress: 35, maxValue: 100 },
    { id: '2', title: 'Inventor\'s Mind', progress: 20, maxValue: 100 },
    { id: '3', title: 'Flight Engineer', progress: 15, maxValue: 100 },
  ];

  const tools: Tool[] = [
    { id: 'notes', name: 'Notes', icon: <FileText className="h-5 w-5" /> },
    { id: 'experiment', name: 'Experiment', icon: <Code className="h-5 w-5" /> },
    { id: 'calculator', name: 'Calculator', icon: <FileText className="h-5 w-5" /> },
  ];

  const bottomTools = [
    { id: 'history', name: 'History', icon: <Clock className="h-5 w-5" /> },
    { id: 'hint', name: 'Hints', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'save', name: 'Save', icon: <FileText className="h-5 w-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="h-5 w-5" /> },
    { id: 'share', name: 'Share', icon: <Share2 className="h-5 w-5" /> },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        sender: 'user',
        content: newMessage,
        timestamp: new Date(),
      }]);
      setNewMessage('');
      
      // Simulate response after short delay
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'scientist',
          content: 'That\'s an interesting observation. Let me explain how the principles of air pressure create lift...',
          timestamp: new Date(),
          senderName: 'Leonardo da Vinci',
          profileImage: profileImages.leonardo
        }]);
      }, 1500);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleTool = (id: string) => {
    if (currentTool === id) {
      setCurrentTool(null);
    } else {
      setCurrentTool(id);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Scroll to bottom of messages on new message
  useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-theme-dark">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse-glow text-theme-glow">
            <span className="text-3xl">Loading your learning journey...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="course-content-page min-h-screen flex flex-col bg-theme-dark">
      {/* Header */}
      <Header />
      
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Dynamic Banner Area */}
        <section className="dynamic-banner w-full h-[30vh] relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center parallax-bg"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
              transform: 'translateY(0px)'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-theme-dark"></div>
          
          <div className="absolute bottom-4 left-4 glass-effect px-3 py-2 rounded-md">
            <span className="text-xs font-medium text-theme-cream">Renaissance Era • Chapter 2</span>
          </div>
          
          <div className="absolute top-4 right-4 flex space-x-2">
            <div className="glass-effect px-4 py-2 rounded-full flex items-center">
              <div className="w-4 h-4 bg-theme-glow rounded-full mr-2"></div>
              <span className="text-xs font-medium text-theme-cream">Progress: 35%</span>
            </div>
          </div>
        </section>
        
        {/* Main Content Area */}
        <main className="content-area flex-grow flex flex-col md:flex-row">
          {/* Left Side - Dialogue Section */}
          <section className="dialogue-section w-full md:w-3/5 h-[70vh] md:h-auto border-r border-theme-stone/20">
            <div className="h-full flex flex-col">
              <div className="glass-effect px-4 py-2 border-b border-theme-stone/20">
                <h2 className="text-xl font-semibold text-theme-cream">Learning with Leonardo da Vinci</h2>
                <div className="flex items-center space-x-2 text-theme-stone text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Estimated time: 45 minutes</span>
                </div>
              </div>
              
              <div 
                id="message-container"
                className="flex-grow overflow-y-auto p-4 space-y-4"
                style={{ maxHeight: 'calc(70vh - 60px)' }}
              >
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`message flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}
                  >
                    {message.sender !== 'user' && (
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img 
                            src={message.profileImage} 
                            alt={message.senderName || "Profile"} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div 
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user' 
                          ? 'bg-theme-navy text-theme-cream rounded-br-none' 
                          : message.sender === 'scientist'
                            ? 'bg-theme-earth/80 text-theme-cream rounded-bl-none' 
                            : 'bg-theme-teal/30 text-theme-cream'
                      }`}
                    >
                      {message.sender !== 'user' && (
                        <div className="font-medium text-xs mb-1">
                          {message.senderName}
                        </div>
                      )}
                      <p>{message.content}</p>
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <User className="w-full h-full p-2 bg-theme-navy text-theme-cream" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t border-theme-stone/20">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full bg-theme-dark/60 border border-theme-stone/30 rounded-full px-4 py-2 pr-24 text-theme-cream placeholder-theme-stone focus:outline-none focus:ring-1 focus:ring-theme-glow"
                  />
                  
                  <div className="absolute right-2 top-1 flex items-center space-x-1">
                    <button 
                      onClick={toggleRecording}
                      className={`p-2 rounded-full ${isRecording ? 'bg-theme-coral text-white' : 'bg-theme-stone/20 text-theme-stone hover:bg-theme-stone/30'}`}
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                    
                    <button 
                      onClick={handleSendMessage}
                      className="bg-theme-navy hover:bg-theme-navy/90 text-theme-cream p-2 rounded-full"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Right Side - Interaction Section */}
          <section className="interaction-section w-full md:w-2/5 h-[70vh] md:h-auto">
            <div className="h-full flex flex-col">
              <div className="glass-effect flex items-center justify-between px-4 py-2 border-b border-theme-stone/20">
                <h3 className="text-lg font-semibold text-theme-cream">Interactive Tools</h3>
                <div className="flex space-x-1">
                  {tools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => toggleTool(tool.id)}
                      className={`p-2 rounded-md ${currentTool === tool.id ? 'bg-theme-navy text-theme-cream' : 'text-theme-stone hover:bg-theme-stone/10'}`}
                    >
                      {tool.icon}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex-grow p-4 overflow-y-auto bg-theme-dark/30">
                {currentTool === 'experiment' && (
                  <div className="bg-theme-dark/50 rounded-lg p-4 border border-theme-stone/20">
                    <h4 className="text-lg font-medium text-theme-cream mb-3">Wing Design Experiment</h4>
                    <p className="text-theme-stone mb-4">Test different wing shapes to see how they affect lift and drag.</p>
                    
                    <div className="h-48 bg-theme-dark/70 rounded flex items-center justify-center mb-4 text-theme-stone border border-theme-stone/10">
                      Interactive simulation would appear here
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-theme-stone text-sm">Wing Curvature</label>
                        <input type="range" className="w-full" />
                      </div>
                      
                      <div>
                        <label className="text-theme-stone text-sm">Air Speed</label>
                        <input type="range" className="w-full" />
                      </div>
                      
                      <Button className="w-full bg-theme-navy hover:bg-theme-navy/90 text-theme-cream">
                        Run Simulation
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentTool === 'notes' && (
                  <div className="bg-theme-dark/50 rounded-lg p-4 border border-theme-stone/20">
                    <h4 className="text-lg font-medium text-theme-cream mb-3">Your Notes</h4>
                    
                    <div className="space-y-2">
                      <div className="p-3 bg-theme-dark/70 rounded border border-theme-stone/10">
                        <div className="text-theme-glow font-medium">Four Forces of Flight</div>
                        <p className="text-theme-stone text-sm">Lift, weight, thrust, and drag must be balanced for flight.</p>
                      </div>
                      
                      <div className="p-3 bg-theme-dark/70 rounded border border-theme-stone/10">
                        <div className="text-theme-glow font-medium">Leonardo's Observations</div>
                        <p className="text-theme-stone text-sm">Birds adjust wing shape for different flight conditions.</p>
                      </div>
                      
                      <div className="p-3 bg-theme-dark/70 rounded border border-theme-stone/10">
                        <div className="text-theme-glow font-medium">Mathematical Principle</div>
                        <p className="text-theme-stone text-sm">Lift is proportional to the square of velocity.</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <input 
                        type="text"
                        placeholder="Add a new note..."
                        className="w-full bg-theme-dark/60 border border-theme-stone/30 rounded px-3 py-2 text-theme-cream"
                      />
                    </div>
                  </div>
                )}
                
                {currentTool === 'calculator' && (
                  <div className="bg-theme-dark/50 rounded-lg p-4 border border-theme-stone/20">
                    <h4 className="text-lg font-medium text-theme-cream mb-3">Scientific Calculator</h4>
                    
                    <div className="p-3 bg-theme-dark/70 rounded border border-theme-stone/10 mb-4">
                      <input 
                        type="text"
                        readOnly
                        value="L = (1/2) × ρ × v² × S × CL"
                        className="w-full bg-transparent text-theme-cream py-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 gap-1">
                      {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((key) => (
                        <button
                          key={key}
                          className="p-3 bg-theme-dark/70 text-theme-cream rounded border border-theme-stone/10 hover:bg-theme-navy/50"
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {!currentTool && (
                  <div className="h-full flex items-center justify-center text-theme-stone">
                    <div className="text-center">
                      <BookOpen className="h-10 w-10 mx-auto mb-2 opacity-50" />
                      <p>Select a tool to begin</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* AI Assistant Floating Button */}
              <div className="absolute bottom-20 right-6 md:bottom-6 md:right-6">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="h-14 w-14 rounded-full bg-theme-teal hover:bg-theme-teal/90 shadow-lg">
                      <Volume2 className="h-6 w-6 text-theme-dark" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="bg-theme-dark border-theme-stone/20">
                    <div className="py-6">
                      <h3 className="text-xl font-semibold text-theme-cream mb-4">Flying Code - AI Assistant</h3>
                      <div className="space-y-4">
                        <div className="bg-theme-teal/20 rounded-lg p-3 border border-theme-teal/30">
                          <p className="text-theme-cream">How can I help with your learning today?</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start text-left border-theme-stone/20 text-theme-stone">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Explain the concept of lift
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-left border-theme-stone/20 text-theme-stone">
                            <Code className="h-4 w-4 mr-2" />
                            Help with the wing simulation
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-left border-theme-stone/20 text-theme-stone">
                            <Clock className="h-4 w-4 mr-2" />
                            Show my learning progress
                          </Button>
                        </div>
                        
                        <div className="pt-4">
                          <input
                            type="text"
                            placeholder="Ask Flying Code anything..."
                            className="w-full bg-theme-dark/60 border border-theme-stone/30 rounded-full px-4 py-2 text-theme-cream"
                          />
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </section>
          
          {/* Collapsible Sidebar */}
          <aside className={`sidebar ${sidebarOpen ? 'block' : 'hidden'} fixed right-0 top-16 bottom-0 w-64 bg-theme-dark/30 backdrop-blur-md border-l border-theme-stone/20 z-10 transition-all duration-300 ease-in-out`}>
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-theme-stone/20">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-2 left-2 p-1 rounded-full hover:bg-theme-stone/10 text-theme-stone"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <h3 className="text-lg font-semibold text-theme-cream text-center">Course Progress</h3>
              </div>
              
              <div className="flex-grow overflow-y-auto p-4 space-y-6">
                <div>
                  <h4 className="text-theme-cream font-medium mb-2">Current Tasks</h4>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-2">
                        <Checkbox checked={task.completed} />
                        <span className={task.completed ? 'text-theme-stone line-through' : 'text-theme-cream'}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-theme-cream font-medium mb-2">Achievements</h4>
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div key={achievement.id}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-theme-cream">{achievement.title}</span>
                          <span className="text-theme-stone">{achievement.progress}/{achievement.maxValue}</span>
                        </div>
                        <div className="h-1.5 bg-theme-stone/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-theme-glow" 
                            style={{ width: `${(achievement.progress / achievement.maxValue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-theme-cream font-medium mb-2">Learning Path</h4>
                  
                  <div className="space-y-2">
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded bg-theme-dark/50 border border-theme-stone/10">
                        <span className="text-theme-cream text-sm font-medium">Renaissance Module</span>
                        <ChevronDown className="h-4 w-4 text-theme-stone" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-2 space-y-1">
                        <div className="flex items-center space-x-2 p-1 rounded text-theme-glow text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-theme-glow"></div>
                          <span>Leonardo's Workshop</span>
                        </div>
                        <div className="flex items-center space-x-2 p-1 rounded text-theme-cream text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-theme-stone"></div>
                          <span>Mathematical Principles</span>
                        </div>
                        <div className="flex items-center space-x-2 p-1 rounded text-theme-stone text-sm opacity-70">
                          <div className="w-1.5 h-1.5 rounded-full bg-theme-stone/50"></div>
                          <span>Final Project</span>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <div className="p-2 rounded bg-theme-dark/50 border border-theme-stone/10 text-theme-stone text-sm font-medium">
                      Industrial Revolution Module
                    </div>
                    
                    <div className="p-2 rounded bg-theme-dark/50 border border-theme-stone/10 text-theme-stone text-sm font-medium">
                      Digital Age Module
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Bottom Toolbar */}
          <div className="fixed bottom-0 left-0 right-0 h-14 bg-theme-dark/80 backdrop-blur-md border-t border-theme-stone/20">
            <div className="container mx-auto h-full flex items-center justify-between px-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded ${sidebarOpen ? 'bg-theme-navy text-theme-cream' : 'text-theme-stone hover:bg-theme-stone/10'}`}
              >
                <BookOpen className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-4">
                {bottomTools.map((tool) => (
                  <button
                    key={tool.id}
                    className="p-2 rounded text-theme-stone hover:bg-theme-stone/10"
                  >
                    {tool.icon}
                  </button>
                ))}
              </div>
              
              <div className="w-5"></div> {/* Empty space to balance layout */}
            </div>
          </div>
        </main>
      </div>
      
      {/* Footer hidden when in course view */}
      {/* <Footer /> */}
    </div>
  );
};

export default Courses;
