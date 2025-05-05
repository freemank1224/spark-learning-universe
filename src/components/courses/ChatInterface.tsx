
import { useState, useEffect, useRef } from 'react';
import { Mic, ArrowRight, ChevronDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger 
} from "@/components/ui/hover-card";
import MessageItem from './MessageItem';
import AIGeneratedImageSection from './AIGeneratedImageSection';

interface Message {
  id: string;
  sender: 'scientist' | 'user' | 'ai';
  content: string;
  timestamp: Date;
  senderName?: string;
  profileImage?: string;
  hasQuestion?: boolean;
}

interface Question {
  id: string;
  title: string;
  description: string;
  options?: string[];
  type: 'multiple-choice' | 'text' | 'code' | 'experiment';
  isOpen: boolean;
}

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  aiGeneratedImage: string;
  openQuestion: (question: Question) => void;
  questions: Question[];
}

const ChatInterface = ({ messages, setMessages, aiGeneratedImage, openQuestion, questions }: ChatInterfaceProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
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
          profileImage: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80"
        }]);
      }, 1500);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };
  
  // Scroll to bottom of messages on new message
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="dialogue-section w-full md:w-3/5 h-[calc(100vh-4rem)]">
      <div className="h-full flex flex-col relative">
        <AIGeneratedImageSection imageUrl={aiGeneratedImage} />
        
        <div className="backdrop-blur-md bg-theme-dark/60 px-4 py-2 border-b border-theme-stone/20">
          <h2 className="text-xl font-semibold text-theme-cream">Learning with Leonardo da Vinci</h2>
          <div className="flex items-center space-x-2 text-theme-stone text-sm">
            <Clock className="h-4 w-4" />
            <span>Estimated time: 45 minutes</span>
          </div>
        </div>
        
        <div 
          ref={messageContainerRef}
          className="flex-grow overflow-y-auto p-4 space-y-4"
          style={{ maxHeight: 'calc(70vh - 60px)' }}
        >
          {messages.map((message) => (
            <MessageItem 
              key={message.id} 
              message={message} 
              openQuestion={openQuestion}
              question={message.hasQuestion ? questions[0] : undefined}
            />
          ))}
        </div>
        
        {/* Fixed Floating Chat Input with Glassmorphism Effect */}
        <div className="fixed bottom-20 left-0 right-0 z-40 px-4 md:px-[calc(20%+16px)] md:pr-[calc(20%+16px)] pointer-events-none">
          <div className="relative backdrop-blur-lg bg-theme-dark/50 border border-theme-stone/30 rounded-full shadow-lg pointer-events-auto max-w-3xl mx-auto">
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
              <HoverCardContent className="w-80 bg-theme-dark/90 border-theme-stone/30 backdrop-blur-lg">
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
  );
};

export default ChatInterface;
