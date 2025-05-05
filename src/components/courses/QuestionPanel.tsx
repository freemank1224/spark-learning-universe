
import { BellRing, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Question {
  id: string;
  title: string;
  description: string;
  options?: string[];
  type: 'multiple-choice' | 'text' | 'code' | 'experiment';
  isOpen: boolean;
}

interface QuestionPanelProps {
  questionOpen: boolean;
  currentQuestion: Question | null;
  closeQuestion: () => void;
  handleQuestionSubmit: () => void;
}

const QuestionPanel = ({ 
  questionOpen, 
  currentQuestion, 
  closeQuestion, 
  handleQuestionSubmit 
}: QuestionPanelProps) => {
  return (
    <section className={`question-panel w-full md:w-1/5 bg-theme-dark/90 backdrop-blur-md border-l border-theme-stone/20 transition-all duration-300 ${questionOpen ? 'block' : 'hidden md:block'}`}>
      {questionOpen && currentQuestion ? (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between bg-theme-navy/80 backdrop-blur-md p-3 border-b border-theme-stone/20">
            <h3 className="text-lg font-semibold text-theme-cream">{currentQuestion.title}</h3>
            <Button variant="ghost" size="icon" onClick={closeQuestion}>
              <X className="h-5 w-5 text-theme-cream" />
            </Button>
          </div>
          
          <div className="flex-grow p-4 overflow-y-auto space-y-6">
            <div className="space-y-4">
              <p className="text-theme-cream">{currentQuestion.description}</p>
              
              {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                <div className="space-y-3 pt-2">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-theme-stone/10 border border-theme-stone/20 backdrop-blur-md">
                      <input 
                        type="radio" 
                        name="answer" 
                        id={`opt-${index}`} 
                        className="w-4 h-4 text-theme-navy" 
                      />
                      <label htmlFor={`opt-${index}`} className="text-theme-cream cursor-pointer flex-grow">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              {currentQuestion.type === 'experiment' && (
                <div className="backdrop-blur-md bg-theme-dark/50 rounded-lg p-4 border border-theme-stone/20">
                  <h4 className="text-lg font-medium text-theme-cream mb-3">Wing Design Experiment</h4>
                  
                  <div className="h-48 bg-theme-dark/70 rounded flex items-center justify-center mb-4 text-theme-stone border border-theme-stone/10">
                    Interactive simulation would appear here
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-theme-stone text-sm">Wing Curvature</label>
                      <input type="range" className="w-full" />
                    </div>
                    
                    <div>
                      <label className="text-theme-stone text-sm">Air Speed</label>
                      <input type="range" className="w-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleQuestionSubmit} 
                className="w-full bg-theme-navy/80 hover:bg-theme-navy backdrop-blur-md text-theme-cream"
              >
                Submit Answer
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center p-4">
          <BellRing className="h-12 w-12 text-theme-stone/50 mb-4" />
          <h3 className="text-lg font-medium text-theme-cream mb-2">No Active Questions</h3>
          <p className="text-theme-stone text-sm">
            Interactive questions will appear here when Leonardo asks you something during the conversation.
          </p>
        </div>
      )}
    </section>
  );
};

export default QuestionPanel;
