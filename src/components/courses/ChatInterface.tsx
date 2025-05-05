import { useState, useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import DraggableChatInput from './DraggableChatInput';

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
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const headerHeight = isHeaderVisible ? '28vh' : '10vh';
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'user',
        content: newMessage,
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };
  
  const handleScroll = () => {
    if (messageContainerRef.current) {
      const position = messageContainerRef.current.scrollTop;
      setScrollPosition(position);
      if (position > 30 && isHeaderVisible) {
        setIsHeaderVisible(false);
      } else if (position <= 30 && !isHeaderVisible) {
        setIsHeaderVisible(true);
      }
    }
  };
  
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    if (messageContainer) {
      messageContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (messageContainer) {
        messageContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div ref={chatContainerRef} className="flex-1 h-full flex flex-col relative overflow-hidden border-x border-theme-stone/10">
      {/* Header with transition */}
      <div className={`transition-all duration-300 ease-in-out ${isHeaderVisible ? 'h-[28vh]' : 'h-[10vh]'}`}>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-theme-navy/20 to-theme-dark/95">
            <img
              src={aiGeneratedImage}
              alt="AI Generated Scene"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-theme-dark to-transparent">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-xs text-theme-stone bg-theme-navy/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  文艺复兴时代 • 飞行的科学
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        ref={messageContainerRef}
        className="flex-grow overflow-y-auto px-4 pt-2 pb-32 space-y-4"
        style={{ height: `calc(100% - ${headerHeight} - 80px)` }}
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
      
      <DraggableChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        isRecording={isRecording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        containerRef={chatContainerRef}
      />
    </div>
  );
};

export default ChatInterface;
