
import { CheckCircle, Circle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: number) => void;
}

export const TaskList = ({ tasks, onToggleTask }: TaskListProps) => {
  const completedCount = tasks.filter(task => task.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;
  
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-theme-stone">Overall Progress</span>
          <span className="text-theme-glow font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-theme-dark/40 rounded-full h-2">
          <div 
            className="bg-theme-glow h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <ul className="space-y-2">
        {tasks.map(task => (
          <li 
            key={task.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
              task.completed 
                ? 'bg-theme-navy/30 border border-theme-glow/20' 
                : 'bg-theme-dark/40 border border-theme-stone/10 hover:border-theme-stone/30'
            }`}
            onClick={() => onToggleTask(task.id)}
          >
            <div className="mr-3">
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-theme-glow" />
              ) : (
                <Circle className="h-5 w-5 text-theme-stone" />
              )}
            </div>
            <span className={`${
              task.completed ? 'text-theme-cream line-through' : 'text-theme-stone'
            }`}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
