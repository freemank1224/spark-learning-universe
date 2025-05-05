
import { useState } from 'react';
import { X, Plus, FileText, Code, Clock, BookOpen, Settings, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Tool {
  id: string;
  name: string;
  icon: JSX.Element;
  active?: boolean;
}

interface ToolbarSectionProps {
  tools: Tool[];
  bottomTools: Tool[];
  currentTool: string | null;
  toggleTool: (id: string) => void;
}

const ToolbarSection = ({ tools, bottomTools, currentTool, toggleTool }: ToolbarSectionProps) => {
  const [toolbarOpen, setToolbarOpen] = useState(false);

  const toggleToolbar = () => {
    setToolbarOpen(!toolbarOpen);
  };

  return (
    <>
      {/* Bottom Toolbar Toggle Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <Button 
          onClick={toggleToolbar}
          className="bg-theme-navy/80 backdrop-blur-md hover:bg-theme-navy text-theme-cream rounded-full shadow-lg"
          size="sm"
        >
          {toolbarOpen ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
          {toolbarOpen ? "Hide Tools" : "Show Tools"}
        </Button>
      </div>
      
      {/* Collapsible Bottom Toolbar */}
      <div className={`fixed bottom-0 left-0 right-0 h-14 bg-theme-dark/90 backdrop-blur-md border-t border-theme-stone/20 z-30 transition-all duration-300 ${toolbarOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
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
                className={`p-2 rounded-md ${currentTool === tool.id ? 'bg-theme-navy/80 backdrop-blur-md text-theme-cream' : 'text-theme-stone hover:bg-theme-stone/10'}`}
              >
                {tool.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolbarSection;
