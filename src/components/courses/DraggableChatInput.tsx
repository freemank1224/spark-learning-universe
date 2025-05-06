
import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mic, Send } from 'lucide-react';

interface DraggableChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage?: () => void;
  isRecording?: boolean;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
}

const DraggableChatInput: React.FC<DraggableChatInputProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  isRecording,
  onStartRecording,
  onStopRecording
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && handleSendMessage) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      ref={inputRef}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-3xl px-4"
    >
      <div className="flex items-center gap-2 p-3 bg-theme-dark/70 backdrop-blur-md rounded-lg border border-theme-stone/20 shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          className="text-theme-cream hover:text-theme-glow hover:bg-theme-dark/50"
          onClick={isRecording ? onStopRecording : onStartRecording}
        >
          <Mic className={`h-5 w-5 ${isRecording ? 'text-red-500 animate-pulse' : ''}`} />
        </Button>

        <Input
          type="text"
          placeholder="输入你的想法..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow bg-theme-dark/40 border-theme-stone/30 text-theme-cream placeholder-theme-stone/50 focus:ring-1 focus:ring-theme-glow/50 backdrop-blur-sm"
        />

        <Button
          variant="ghost"
          size="icon"
          className="text-theme-cream hover:text-theme-glow hover:bg-theme-dark/50"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default DraggableChatInput;
