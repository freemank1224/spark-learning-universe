import { useState } from 'react';
import { X, Plus, FileText, Code, Clock, BookOpen, Settings, Share2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Draggable from '@/components/ui/draggable';

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
      {/* 工具按钮使用Draggable组件包装 */}
      <Draggable 
        initialPosition={{ x: window.innerWidth - 80, y: window.innerHeight - 80 }}
        bounds="body"
        zIndex={40}
      >
        <div className="flex items-center">
          <Button 
            onClick={toggleToolbar}
            className="bg-theme-navy/80 backdrop-blur-md hover:bg-theme-navy text-theme-cream rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 relative group"
            size="sm"
          >
            {toolbarOpen ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            {toolbarOpen ? "隐藏工具" : "显示工具"}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-theme-stone opacity-0 group-hover:opacity-100 transition-opacity">
              可拖动
            </span>
          </Button>
        </div>
      </Draggable>
      
      {/* 弹出式工具栏 - 保持原位置不动 */}
      <div className={`fixed bottom-20 right-4 bg-theme-dark/90 backdrop-blur-md border border-theme-stone/20 rounded-lg shadow-xl z-30 transition-all duration-300 ${toolbarOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="p-3">
          <div className="flex flex-col space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-theme-stone font-medium px-2">常用工具</p>
              <span className="text-xs text-theme-stone px-2 flex items-center">
                <GripVertical className="h-3 w-3 mr-1" />拖动按钮自由放置
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  className={`p-2.5 rounded-md ${currentTool === tool.id ? 'bg-theme-navy/80 backdrop-blur-md text-theme-cream' : 'text-theme-stone hover:bg-theme-stone/10'}`}
                  title={tool.name}
                >
                  {tool.icon}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <p className="text-xs text-theme-stone font-medium px-2">其他功能</p>
            <div className="grid grid-cols-3 gap-2">
              {bottomTools.map((tool) => (
                <button
                  key={tool.id}
                  className="p-2.5 rounded-md text-theme-stone hover:bg-theme-stone/10 flex flex-col items-center justify-center"
                  title={tool.name}
                >
                  {tool.icon}
                  <span className="text-xs mt-1">{tool.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolbarSection;
