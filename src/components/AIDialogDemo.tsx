
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Mic, User, Volume2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  character?: string;
}

const AIDialogDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: "Buongiorno! I am Leonardo da Vinci. It's a pleasure to meet you! I understand you're interested in learning about my flying machine designs?",
      character: 'Leonardo da Vinci'
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: input
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: "Ah, excellent question! My flying machine design, which I called the 'ornithopter,' was inspired by the flight of bats, birds, and kites. I believed that humans could fly if they had wings attached to their arms. Would you like to try a coding challenge where you can simulate the physics of wing movement?",
        character: 'Leonardo da Vinci'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="py-16 bg-apple-light-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Talk with Historical Scientists
          </h2>
          <p className="text-lg text-apple-gray">
            Our AI brings historical figures to life. Ask questions, learn from their knowledge, and embark on coding challenges together.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardContent className="p-0">
              <div className="bg-apple-blue text-white p-4 rounded-t-lg flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Leonardo da Vinci</h3>
                  <p className="text-sm opacity-90">Renaissance Period, 1452-1519</p>
                </div>
                <Button size="icon" variant="ghost" className="text-white">
                  <Volume2 className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="h-80 overflow-y-auto p-4 bg-white">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                        message.sender === 'user'
                          ? 'bg-apple-blue text-white rounded-tr-none'
                          : 'bg-gray-100 text-apple-black rounded-tl-none'
                      }`}
                    >
                      {message.character && (
                        <div className="font-bold text-sm mb-1">{message.character}</div>
                      )}
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {isProcessing && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-100 text-apple-black rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="p-4 border-t">
              <div className="flex items-center w-full gap-2">
                <Button variant="outline" size="icon" className="rounded-full flex-shrink-0">
                  <User className="h-5 w-5" />
                </Button>
                
                <div className="relative flex-grow">
                  <Input
                    placeholder="Ask Leonardo a question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!input.trim()} 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-apple-blue hover:text-blue-700"
                    >
                      <SendHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-apple-gray">Experience realistic conversations with over 30+ historical scientists and innovators</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDialogDemo;
