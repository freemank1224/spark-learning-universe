
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

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

interface MessageItemProps {
  message: Message;
  openQuestion: (question: Question) => void;
  question?: Question;
}

const MessageItem = ({ message, openQuestion, question }: MessageItemProps) => {
  return (
    <div 
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
        className={`max-w-[80%] rounded-2xl px-4 py-2 backdrop-blur-md ${
          message.sender === 'user' 
            ? 'bg-theme-navy/80 text-theme-cream rounded-br-none' 
            : message.sender === 'scientist'
              ? 'bg-theme-earth/70 text-theme-cream rounded-bl-none' 
              : 'bg-theme-teal/30 text-theme-cream'
        }`}
      >
        {message.sender !== 'user' && (
          <div className="font-medium text-xs mb-1">
            {message.senderName}
          </div>
        )}
        <p>{message.content}</p>
        
        {message.hasQuestion && question && (
          <Button 
            onClick={() => openQuestion(question)} 
            size="sm" 
            className="mt-2 bg-theme-navy/90 hover:bg-theme-navy backdrop-blur-sm"
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
  );
};

export default MessageItem;
