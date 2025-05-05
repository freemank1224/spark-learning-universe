import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Clock, FileText, Code, Settings, Share2, User, BellRing, X, Image, Plus, BookOpen } from 'lucide-react';
import CourseSidebar from '@/components/courses/CourseSidebar';
import ChatInterface from '@/components/courses/ChatInterface';
import QuestionPanel from '@/components/courses/QuestionPanel';
import AIAssistantButton from '@/components/courses/AIAssistantButton';
import ToolbarSection from '@/components/courses/ToolbarSection';

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

const Course1 = () => {
  const [loading, setLoading] = useState(true);
  const [currentTool, setCurrentTool] = useState<string | null>(null);
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
      {/* Header */}
      <Header />
      
      {/* Main Content - Three Column Layout */}
      <div className="flex-grow flex flex-col md:flex-row pt-16">
        {/* Left Column - Course Information */}
        <CourseSidebar tasks={tasks} achievements={achievements} />
        
        {/* Middle Column - Chat Interface */}
        <ChatInterface 
          messages={messages} 
          setMessages={setMessages} 
          aiGeneratedImage={aiGeneratedImage}
          openQuestion={openQuestion}
          questions={questions}
        />
        
        {/* Right Column - Interactive Questions */}
        <QuestionPanel 
          questionOpen={questionOpen}
          currentQuestion={currentQuestion}
          closeQuestion={closeQuestion}
          handleQuestionSubmit={handleQuestionSubmit}
        />
      </div>
      
      {/* AI Assistant Floating Button */}
      <AIAssistantButton />
      
      {/* Toolbar Section */}
      <ToolbarSection 
        tools={tools}
        bottomTools={bottomTools}
        currentTool={currentTool}
        toggleTool={toggleTool}
      />
    </div>
  );
};

export default Course1;
