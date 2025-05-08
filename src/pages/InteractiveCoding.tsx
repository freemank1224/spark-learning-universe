import { useState, useRef, useEffect } from 'react';
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
import { Play, HelpCircle, Send, Circle } from 'lucide-react';
import { CodeEditor } from '@/components/CodeEditor';
import { OutputViewer } from '@/components/OutputViewer';
import { TaskList } from '@/components/TaskList';
import { AIAssistant } from '@/components/AIAssistant';
import { useToast } from '@/hooks/use-toast';
import { executeCode } from '@/services/codeExecutionService';

const InteractiveCoding = () => {
  const [code, setCode] = useState(`# Welcome to Interactive Python Coding
# Try running this simple example

print("Hello from Python!")
for i in range(5):
    print(f"Number {i} squared is {i**2}")

# 尝试绘制一个简单的图表
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(8, 4))
plt.plot(x, y)
plt.title("Sin Wave")
plt.xlabel("X axis")
plt.ylabel("Y axis")
plt.grid(True)
plt.show()
`);
  // 分离文本输出和可视化输出
  const [textOutput, setTextOutput] = useState("");
  const [visualOutput, setVisualOutput] = useState("");
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
  // 引用可视化区域DOM
  const visualizationRef = useRef<HTMLDivElement>(null);

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
  const runCode = async () => {
    if (!code.trim()) {
      toast({
        variant: "destructive",
        title: "空代码",
        description: "请先输入一些代码再执行",
      });
      return;
    }

    setIsRunning(true);
    // 重要：先清空输出状态，让React处理DOM更新
    setTextOutput("正在执行代码，请稍候...");
    setVisualOutput("");
    
    try {
      if (selectedLanguage === "python") {
        // 调用后端执行Python代码，使用服务返回的处理好的结果
        const processedResult = await executeCode(code);
        console.log("处理后的执行结果:", processedResult);
        
        // 直接使用处理好的输出
        setTextOutput(processedResult.textOutput);
        setVisualOutput(processedResult.visualOutput);
        
        toast({
          title: processedResult.hasGraphics ? "图形生成成功" : "代码执行成功",
          description: "Python 代码已执行完毕",
        });
      } else {
        // 如果是JavaScript代码（可以后续实现）
        toast({
          variant: "destructive",
          title: "未实现",
          description: "JavaScript执行功能暂未实现",
        });
      }
    } catch (error) {
      console.error("代码执行错误:", error);
      setTextOutput(`<div class="error-output">错误: ${error instanceof Error ? error.message : String(error)}</div>`);
      toast({
        variant: "destructive",
        title: "执行失败",
        description: "代码执行过程中出现错误",
      });
    } finally {
      setIsRunning(false);
    }
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

  // 设置不同语言的默认代码
  const getDefaultCode = (language: string) => {
    if (language === 'python') {
      return code;
    } else {
      return `// JavaScript代码目前不支持执行
console.log("Hello from JavaScript!");
// 请使用Python代码进行执行`;
    }
  };

  // 语言切换时更新代码
  useEffect(() => {
    setCode(getDefaultCode(selectedLanguage));
  }, [selectedLanguage]);

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
                    <div id="visualization-container" className="flex flex-col h-full" ref={visualizationRef}>
                      {/* Python visualization output */}
                      <div id="python-visualization" className="w-full h-[60%] overflow-auto bg-theme-dark/30 rounded-md p-2 mb-4">
                        {visualOutput && (
                          <div 
                            className="py-2 flex justify-center items-center w-full h-full"
                            dangerouslySetInnerHTML={{ __html: visualOutput }} 
                          />
                        )}
                      </div>
                      
                      {/* Canvas for JavaScript output */}
                      <canvas id="js-canvas" className="w-full h-3/5 bg-white rounded-md p-2 mb-4 hidden" width="800" height="300"></canvas>
                      
                      {/* Text output area */}
                      <div className="w-full h-[35%] overflow-auto bg-theme-dark/70 rounded-md p-2 font-mono text-sm text-theme-cream">
                        <OutputViewer 
                          output={textOutput} 
                          isRunning={isRunning} 
                        />
                      </div>
                    </div>
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
                    <Tabs defaultValue="python" className="w-full h-full flex flex-col" onValueChange={setSelectedLanguage}>
                      <div className="flex justify-between items-center mb-2 flex-shrink-0">
                        <TabsList className="bg-theme-dark/60">
                          <TabsTrigger value="python">Python</TabsTrigger>
                          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        </TabsList>
                        
                        <Button onClick={runCode} disabled={isRunning} className="bg-theme-navy hover:bg-theme-navy/80">
                          <Play className="mr-2 h-4 w-4" />
                          {isRunning ? "Running..." : "Run Code"}
                        </Button>
                      </div>
                      
                      <div className="flex-grow h-full overflow-hidden">
                        <TabsContent value="python" className="mt-2 h-full flex flex-col">
                          <div className="flex-grow h-full overflow-hidden">
                            <CodeEditor 
                              language="python"
                              value={code}
                              onChange={setCode}
                            />
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="javascript" className="mt-2 h-full flex flex-col">
                          <div className="flex-grow h-full overflow-hidden">
                            <CodeEditor 
                              language="javascript"
                              value={code}
                              onChange={setCode}
                            />
                          </div>
                        </TabsContent>
                      </div>
                    </Tabs>
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
