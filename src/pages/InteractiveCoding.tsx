
import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Play, Code, Terminal, Circle, CheckCircle, HelpCircle, Send } from 'lucide-react';
import { CodeEditor } from '@/components/CodeEditor';
import { OutputViewer } from '@/components/OutputViewer';
import { TaskList } from '@/components/TaskList';
import { AIAssistant } from '@/components/AIAssistant';
import { useToast } from '@/hooks/use-toast';

const InteractiveCoding = () => {
  const [code, setCode] = useState(`# Welcome to Interactive Python Coding
# Try running this simple example

import matplotlib.pyplot as plt
import numpy as np

# Generate data points
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create a simple plot
plt.figure(figsize=(8, 6))
plt.plot(x, y, 'b-', label='sin(x)')
plt.title('Simple Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)
plt.legend()
plt.show()

print("Plot created successfully!")
`);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! I'm your coding assistant. Ask me any programming questions or get help with your code."
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Tasks for the current learning module
  const [tasks, setTasks] = useState([
    { id: 1, title: "Create a basic plot", completed: false },
    { id: 2, title: "Add multiple data series", completed: false },
    { id: 3, title: "Customize plot style and appearance", completed: false },
    { id: 4, title: "Add interactivity to the plot", completed: false },
    { id: 5, title: "Create animated visualization", completed: false },
  ]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to run the code
  const runCode = () => {
    setIsRunning(true);
    setOutput("");
    
    // Mock execution delay for the demo
    setTimeout(() => {
      if (selectedLanguage === "python") {
        // In a real implementation, we would use a Python interpreter like Pyodide
        // Here we're just showing a mock output
        setOutput("Executing Python code...\n\nPlot created successfully!\n\n[The plot would be displayed in the visualization panel]");
        
        // Update task completion
        setTasks(tasks.map(task => 
          task.id === 1 ? { ...task, completed: true } : task
        ));
        
        toast({
          title: "Code executed successfully",
          description: "Your Python code has been executed and the plot is displayed.",
        });
      } else {
        // JavaScript execution
        try {
          const result = eval(`(function() { 
            try {
              ${code}
              return { success: true, output: "Code executed successfully" };
            } catch(e) {
              return { success: false, output: e.toString() };
            }
          })()`);
          
          setOutput(result.output);
          
          if (result.success) {
            toast({
              title: "Code executed successfully",
              description: "Your JavaScript code has been executed.",
            });
          }
        } catch (error) {
          setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
          toast({
            variant: "destructive",
            title: "Execution failed",
            description: "There was an error running your code.",
          });
        }
      }
      
      setIsRunning(false);
    }, 1000);
  };

  // Function to handle AI assistant
  const handleSendQuestion = async () => {
    if (!question.trim()) return;
    
    // Add user message
    const userMessage = { role: "user", content: question };
    setMessages(prev => [...prev, userMessage]);
    setQuestion("");
    
    // Simulate AI response
    setTimeout(() => {
      let response;
      if (question.toLowerCase().includes("plot")) {
        response = { 
          role: "assistant", 
          content: "To create a plot in Python, you can use matplotlib. Here's a basic example:\n\n```python\nimport matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.linspace(0, 10, 100)\ny = np.sin(x)\n\nplt.plot(x, y)\nplt.title('Sine Wave')\nplt.show()\n```\n\nThis will create a simple sine wave plot." 
        };
      } else if (question.toLowerCase().includes("error")) {
        response = { 
          role: "assistant", 
          content: "I see you're having an error. Common Python plotting errors often involve:\n\n1. Missing imports\n2. Incorrect data types\n3. Not calling plt.show()\n\nCan you share the specific error message you're seeing?" 
        };
      } else {
        response = { 
          role: "assistant", 
          content: "I'm here to help with your programming questions. Could you provide more details about what you're trying to accomplish with your code?" 
        };
      }
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  // Handle task completion
  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 pb-0 bg-theme-dark">
        <div className="container mx-auto px-0 h-[calc(100vh-8rem)]">
          <h1 className="text-2xl font-bold mb-4 px-4 text-theme-cream">Interactive Coding Environment</h1>
          
          <ResizablePanelGroup 
            direction="horizontal" 
            className="h-full border rounded-lg border-theme-stone/20 bg-theme-dark/80"
          >
            {/* Left Panel - Visualization and Tasks */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <ResizablePanelGroup direction="vertical">
                {/* Visualization Panel */}
                <ResizablePanel defaultSize={70} minSize={40}>
                  <div className="h-full bg-theme-dark/60 p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-semibold text-theme-cream">Visualization</h2>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Circle className="h-4 w-4 mr-1 text-theme-glow" />
                          Record
                        </Button>
                      </div>
                    </div>
                    <Separator className="mb-4" />
                    <OutputViewer output={output} isRunning={isRunning} />
                  </div>
                </ResizablePanel>
                
                <ResizableHandle withHandle />
                
                {/* Tasks Panel */}
                <ResizablePanel defaultSize={30}>
                  <div className="h-full bg-theme-dark/80 p-4 flex flex-col">
                    <h2 className="text-xl font-semibold text-theme-cream mb-2">Learning Tasks</h2>
                    <Separator className="mb-4" />
                    <ScrollArea className="flex-grow">
                      <TaskList tasks={tasks} onToggleTask={toggleTaskCompletion} />
                    </ScrollArea>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Right Panel - Code Editor and AI Assistant */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <ResizablePanelGroup direction="vertical">
                {/* Code Editor Panel */}
                <ResizablePanel defaultSize={75} minSize={50}>
                  <div className="h-full bg-theme-dark/50 p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <Tabs defaultValue="python" className="w-full" onValueChange={setSelectedLanguage}>
                        <div className="flex justify-between items-center">
                          <TabsList className="bg-theme-dark/60">
                            <TabsTrigger value="python">Python</TabsTrigger>
                            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                          </TabsList>
                          
                          <Button onClick={runCode} disabled={isRunning} className="bg-theme-navy hover:bg-theme-navy/80">
                            <Play className="mr-2 h-4 w-4" />
                            {isRunning ? "Running..." : "Run Code"}
                          </Button>
                        </div>
                        
                        <TabsContent value="python" className="mt-2 h-[calc(100%-3rem)]">
                          <CodeEditor 
                            language="python"
                            value={code}
                            onChange={setCode}
                          />
                        </TabsContent>
                        
                        <TabsContent value="javascript" className="mt-2 h-[calc(100%-3rem)]">
                          <CodeEditor 
                            language="javascript"
                            value={`// JavaScript code example
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Create a simple animation
let x = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(x, 100, 20, 0, Math.PI * 2);
  ctx.fillStyle = '#9b87f5';
  ctx.fill();
  
  x = (x + 2) % canvas.width;
  requestAnimationFrame(animate);
}

animate();
console.log('Animation started');`}
                            onChange={setCode}
                          />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </ResizablePanel>
                
                <ResizableHandle withHandle />
                
                {/* AI Assistant Panel */}
                <ResizablePanel defaultSize={25}>
                  <div className="h-full bg-theme-dark/70 p-4 flex flex-col">
                    <h2 className="text-xl font-semibold text-theme-cream mb-2 flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2 text-theme-glow" />
                      AI Coding Assistant
                    </h2>
                    <Separator className="mb-4" />
                    
                    <ScrollArea className="flex-grow mb-4 pr-4">
                      <div className="space-y-4">
                        {messages.map((msg, index) => (
                          <AIAssistant key={index} message={msg} />
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        className="flex-grow rounded-lg px-4 py-2 bg-theme-dark/60 text-theme-cream border border-theme-stone/30 focus:outline-none focus:border-theme-glow"
                        placeholder="Ask a question about your code..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSendQuestion();
                        }}
                      />
                      <Button 
                        onClick={handleSendQuestion} 
                        className="bg-theme-navy hover:bg-theme-navy/80"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InteractiveCoding;
