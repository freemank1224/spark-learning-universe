
import { useState } from 'react';
import { BookOpen, CheckCircle, Clock, ChevronDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  progress: number;
  maxValue: number;
}

interface CourseSidebarProps {
  tasks: Task[];
  achievements: Achievement[];
}

const CourseSidebar = ({ tasks, achievements }: CourseSidebarProps) => {
  return (
    <section className="course-sidebar w-full md:w-1/5 bg-theme-dark/90 backdrop-blur-md border-r border-theme-stone/20 overflow-y-auto">
      <div className="h-full flex flex-col p-4 space-y-6">
        {/* Course Title and Progress */}
        <div className="space-y-3 neo-blur rounded-lg p-4">
          <h2 className="text-xl font-semibold text-theme-cream">Flight Principles</h2>
          <div className="flex items-center justify-between text-sm text-theme-stone">
            <span>Renaissance Era • Chapter 2</span>
            <Badge className="bg-theme-navy/80 text-theme-cream">35%</Badge>
          </div>
          <Progress value={35} className="h-1.5 bg-theme-stone/30" />
        </div>
        
        <div className="space-y-2 neo-blur rounded-lg p-4">
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
        
        <div className="space-y-2 neo-blur rounded-lg p-4">
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
        
        <div className="space-y-2 neo-blur rounded-lg p-4">
          <h3 className="text-md font-medium text-theme-cream flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Learning Path
          </h3>
          
          <div className="space-y-2">
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded bg-theme-navy/40 backdrop-blur-sm border border-theme-stone/10">
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
            
            <div className="p-2 rounded bg-theme-dark/50 backdrop-blur-sm border border-theme-stone/10 text-theme-stone text-sm font-medium">
              Industrial Revolution Module
            </div>
            
            <div className="p-2 rounded bg-theme-dark/50 backdrop-blur-sm border border-theme-stone/10 text-theme-stone text-sm font-medium">
              Digital Age Module
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSidebar;
