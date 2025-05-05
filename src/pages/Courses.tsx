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
  ArrowLeft,
  ChevronDown, 
  Volume2,
  FileText,
  Settings,
  Share2,
  User,
  BellRing,
  CheckCircle,
  X,
  Image
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger 
} from "@/components/ui/hover-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Import profile images
const profileImages = {
  galileo: "https://images.unsplash.com/photo-1527034029726-75c5168677b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80",
  leonardo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80",
  ada: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80",
  ai: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80",
};

// AI generated content image
const aiGeneratedImage = "https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

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
  hasQuestion?: boolean;
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

interface Question {
  id: string;
  title: string;
  description: string;
  options?: string[];
  type: 'multiple-choice' | 'text' | 'code' | 'experiment';
  isOpen: boolean;
}

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [currentTool, setCurrentTool] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  
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
      content: "I'm excited to learn about flight! How do birds stay in the air?",
      timestamp: new Date(),
    },
    {
      id: '3',
      sender: 'scientist',
      content: 'An excellent question! Birds stay aloft through a delicate balance of four forces: lift, weight, thrust, and drag. Let\'s examine these forces using mathematical principles.',
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
    {
      id: '5',
      sender: 'scientist',
      content: 'Now that we understand the basic principles, let me test your knowledge with a question about lift generation.',
      timestamp: new Date(),
      senderName: 'Leonardo da Vinci',
      profileImage: profileImages.leonardo,
      hasQuestion: true
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

  const questions: Question[] = [
    {
      id: 'q1',
      title: 'Understanding Flight Principles',
      description: 'Which of the following is NOT one of the four primary forces affecting flight?',
      options: ['Lift', 'Weight', 'Momentum', 'Drag'],
      type: 'multiple-choice',
      isOpen: false
    },
    {
      id: 'q2',
      title: 'Wing Design Challenge',
      description: 'Design a simple wing profile that maximizes lift while minimizing drag. Use the interactive tool to test your design.',
      type: 'experiment',
      isOpen: false
    }
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

  const openQuestion = (question: Question) => {
    setCurrentQuestion({...question, isOpen: true});
    setQuestionOpen(true);
  };

  const closeQuestion = () => {
    setQuestionOpen(false);
    setCurrentQuestion(null);
  };

  const handleQuestionSubmit = () => {
    closeQuestion();
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'scientist',
        content: 'Well done! That\'s correct. Momentum is not one of the four primary forces of flight. The four forces are lift, weight, thrust, and drag.',
        timestamp: new Date(),
        senderName: 'Leonardo da Vinci',
        profileImage: profileImages.leonardo
      }]);
    }, 1000);
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

  // Check for messages with questions and open the question panel if needed
  useEffect(() => {
    const messagesWithQuestions = messages.filter(msg => msg.hasQuestion);
    if (messagesWithQuestions.length > 0 && !questionOpen) {
      // Show notification that a new question is available
      const latestQuestion = questions[0]; // In a real app, this would be linked to the message
      if (latestQuestion && !latestQuestion.isOpen) {
        setTimeout(() => {
          openQuestion(latestQuestion);
        }, 2000);
      }
    }
  }, [messages, questionOpen]);

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
      {/* Header - Fixed at top */}
      <Header />
      
      {/* Main Content - Three Column Layout */}
      <div className="flex-grow flex flex-col md:flex-row pt-16">
        {/* Left Column - Course Information */}
        <section className="course-sidebar w-full md:w-1/5 bg-theme-dark/90 border-r border-theme-stone/20 overflow-y-auto">
          <div className="h-full flex flex-col p-4 space-y-6">
            {/* Course Title and Progress */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-theme-cream">Flight Principles</h2>
              <div className="flex items-center justify-between text-sm text-theme-stone">
                <span>Renaissance Era • Chapter 2</span>
                <Badge className="bg-theme-navy text-theme-cream">35%</Badge>
              </div>
              <Progress value={35} className="h-1.5 bg-theme-stone/30" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-md font-medium text-theme-cream flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Current Tasks
              </h3>
              <div className="space-y-2 pl-2">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-2 text-sm">
                    <Checkbox checked={task.completed} />
                    <span className={task.completed ? 'text-theme-stone line-through' : 'text-theme-cream'}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-md font-medium text-theme-cream flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
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
            
            <div className="space-y-2">
              <h3 className="text-md font-medium text-theme-cream flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Learning Path
              </h3>
              
              <div className="space-y-2">
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded bg-theme-dark/50 border border-theme-stone/10">
                    <span className="text-theme-glow text-sm font-medium">Renaissance Module</span>
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
        </section>
        
        {/* Middle Column - Chat Interface */}
        <section className="dialogue-section w-full md:w-3/5 h-[calc(100vh-4rem)]">
          <div className="h-full flex flex-col relative">
            {/* AI-Generated Content Image Area */}
            <div className="w-full h-[30vh] relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center parallax-bg"
                style={{ 
                  backgroundImage: `url('${aiGeneratedImage}')`,
                  transform: 'translateY(0px)'
                }}
              >
                {/* Add overlay for potential AI image integration */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute top-2 right-2 bg-theme-dark/40 hover:bg-theme-dark/60 backdrop-blur-sm border-theme-stone/30"
                    >
                      <Image className="h-4 w-4 text-theme-cream" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-theme-dark border-theme-stone/20">
                    <DialogHeader>
                      <DialogTitle className="text-theme-cream">AI-Generated Scene</DialogTitle>
                      <DialogDescription className="text-theme-stone">
                        This image is dynamically generated based on your current learning context.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col space-y-4">
                      <div className="rounded-md overflow-hidden">
                        <img 
                          src={aiGeneratedImage} 
                          alt="AI generated scene visualization" 
                          className="w-full h-auto" 
                        />
                      </div>
                      <p className="text-sm text-theme-stone">
                        The image depicts Leonardo da Vinci's workshop in Florence, where he conducted 
                        his pioneering studies on flight and aerodynamics.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-theme-dark"></div>
              
              <div className="absolute bottom-4 left-4 backdrop-blur-md bg-theme-dark/40 px-3 py-2 rounded-md border border-theme-stone/20">
                <span className="text-xs font-medium text-theme-cream">Renaissance Era • Chapter 2</span>
              </div>
            </div>
            
            <div className="backdrop-blur-md bg-theme-dark/60 px-4 py-2 border-b border-theme-stone/20">
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
                    
                    {message.hasQuestion && (
                      <Button 
                        onClick={() => openQuestion(questions[0])} 
                        size="sm" 
                        className="mt-2 bg-theme-navy hover:bg-theme-navy/90"
                      >
                        Answer Question
                      </Button>
                    )}
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
            
            {/* Floating Chat Input with Glassmorphism Effect */}
            <div className="absolute bottom-6 left-0 right-0 px-4">
              <div className="relative backdrop-blur-lg bg-theme-dark/40 border border-theme-stone/30 rounded-full shadow-lg">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full bg-transparent rounded-full px-4 py-3 pr-24 text-theme-cream placeholder-theme-stone/70 focus:outline-none"
                />
                
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
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
                
                {/* Hover Card for Input Suggestions */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-theme-stone hover:text-theme-cream hover:bg-transparent"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-theme-dark border-theme-stone/30 backdrop-blur-lg">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-theme-cream">Suggested Questions</h4>
                      <div className="space-y-1">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-left text-theme-stone text-xs hover:text-theme-cream"
                          onClick={() => setNewMessage("How did you design your flying machine?")}
                        >
                          How did you design your flying machine?
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-left text-theme-stone text-xs hover:text-theme-cream"
                          onClick={() => setNewMessage("What is Bernoulli's principle and how does it relate to flight?")}
                        >
                          What is Bernoulli's principle and how does it relate to flight?
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-left text-theme-stone text-xs hover:text-theme-cream"
                          onClick={() => setNewMessage("Can you explain the difference between lift and thrust?")}
                        >
                          Can you explain the difference between lift and thrust?
                        </Button>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
        </section>
        
        {/* Right Column - Interactive Questions */}
        <section className={`question-panel w-full md:w-1/5 bg-theme-dark/90 border-l border-theme-stone/20 transition-all duration-300 ${questionOpen ? 'block' : 'hidden md:block'}`}>
          {questionOpen && currentQuestion ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between bg-theme-navy p-3 border-b border-theme-stone/20">
                <h3 className="text-lg font-semibold text-theme-cream">{currentQuestion.title}</h3>
                <Button variant="ghost" size="icon" onClick={closeQuestion}>
                  <X className="h-5 w-5 text-theme-cream" />
                </Button>
              </div>
              
              <div className="flex-grow p-4 overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <p className="text-theme-cream">{currentQuestion.description}</p>
                  
                  {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                    <div className="space-y-3 pt-2">
                      {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-theme-stone/10 border border-theme-stone/20">
                          <input 
                            type="radio" 
                            name="answer" 
                            id={`opt-${index}`} 
                            className="w-4 h-4 text-theme-navy" 
                          />
                          <label htmlFor={`opt-${index}`} className="text-theme-cream cursor-pointer flex-grow">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {currentQuestion.type === 'experiment' && (
                    <div className="bg-theme-dark/50 rounded-lg p-4 border border-theme-stone/20">
                      <h4 className="text-lg font-medium text-theme-cream mb-3">Wing Design Experiment</h4>
                      
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
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleQuestionSubmit} 
                    className="w-full bg-theme-navy hover:bg-theme-navy/90 text-theme-cream"
                  >
                    Submit Answer
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <BellRing className="h-12 w-12 text-theme-stone/50 mb-4" />
              <h3 className="text-lg font-medium text-theme-cream mb-2">No Active Questions</h3>
              <p className="text-theme-stone text-sm">
                Interactive questions will appear here when Leonardo asks you something during the conversation.
              </p>
            </div>
          )}
        </section>
      </div>
      
      {/* AI Assistant Floating Button */}
      <div className="fixed bottom-20 right-6 z-50">
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
      
      {/* Bottom Toolbar */}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-theme-dark/80 backdrop-blur-md border-t border-theme-stone/20 z-40">
        <div className="container mx-auto h-full flex items-center justify-between px-4">
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
          
          <div className="flex items-center space-x-2">
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
      </div>
    </div>
  );
};

export default Courses;
