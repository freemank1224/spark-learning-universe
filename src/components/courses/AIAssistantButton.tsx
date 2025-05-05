import { Volume2, BookOpen, Code, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Draggable from '@/components/ui/draggable';

const AIAssistantButton = () => {
  return (
    <Draggable 
      initialPosition={{ x: window.innerWidth - 80, y: window.innerHeight - 160 }}
      bounds="body"
      zIndex={50}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button className="h-14 w-14 rounded-full bg-theme-teal/90 backdrop-blur-sm hover:bg-theme-teal shadow-lg">
            <Volume2 className="h-6 w-6 text-theme-dark" />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-theme-dark/90 backdrop-blur-lg border-theme-stone/20">
          <div className="py-6">
            <h3 className="text-xl font-semibold text-theme-cream mb-4">Flying Code - AI Assistant</h3>
            <div className="space-y-4">
              <div className="bg-theme-teal/20 backdrop-blur-sm rounded-lg p-3 border border-theme-teal/30">
                <p className="text-theme-cream">How can I help with your learning today?</p>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-left border-theme-stone/20 text-theme-stone bg-theme-dark/50 backdrop-blur-sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explain the concept of lift
                </Button>
                <Button variant="outline" className="w-full justify-start text-left border-theme-stone/20 text-theme-stone bg-theme-dark/50 backdrop-blur-sm">
                  <Code className="h-4 w-4 mr-2" />
                  Help with the wing simulation
                </Button>
                <Button variant="outline" className="w-full justify-start text-left border-theme-stone/20 text-theme-stone bg-theme-dark/50 backdrop-blur-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Show my learning progress
                </Button>
              </div>
              
              <div className="pt-4">
                <input
                  type="text"
                  placeholder="Ask Flying Code anything..."
                  className="w-full bg-theme-dark/60 backdrop-blur-sm border border-theme-stone/30 rounded-full px-4 py-2 text-theme-cream"
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Draggable>
  );
};

export default AIAssistantButton;
