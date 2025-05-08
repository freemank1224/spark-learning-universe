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
// 删除导入 Brython 的语句，我们将使用脚本动态加载
// import 'brython';
// import 'brython/brython_stdlib';

// 声明 window 上的 Brython 类型
declare global {
  interface Window {
    __BRYTHON__: any;
    brython: any;
    pythonExec: any;
  }
}

const InteractiveCoding = () => {
  const [code, setCode] = useState(`# Welcome to Interactive Python Coding
# Try running this simple example

print("Hello from Brython!")
for i in range(5):
    print(f"Number {i} squared is {i**2}")

# 尝试一些基础图形
try:
    from browser import document, html
    # 创建一个简单的图形
    div = html.DIV(id="graphic")
    div.style = {"width": "100%", "height": "200px", "background": "#f0f0f0", "margin-top": "10px"}
    
    # 添加一些彩色方块
    for i in range(5):
        square = html.DIV()
        square.style = {
            "width": "50px", 
            "height": "50px",
            "background": f"rgb({i*50}, {255-i*40}, {i*30})",
            "display": "inline-block",
            "margin": "10px"
        }
        div <= square
    
    # 输出到文档
    document["python-output"] <= div
    
    print("图形已创建成功！")
except Exception as e:
    print(f"创建图形时出错: {e}")
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
  const outputRef = useRef<HTMLDivElement>(null);
  const pythonOutputRef = useRef<HTMLDivElement>(null);
  const brythonInitialized = useRef(false);
  const brythonScriptsLoaded = useRef(false);

  // 初始化 Brython
  useEffect(() => {
    // 如果脚本已加载，不再重复加载
    if (brythonScriptsLoaded.current) return;
    brythonScriptsLoaded.current = true;

    // 创建并加载 Brython 核心脚本
    const brythonScript = document.createElement('script');
    brythonScript.type = 'text/javascript';
    brythonScript.src = '/brython/brython.js';
    brythonScript.async = true;
    
    // 创建并加载 Brython 标准库脚本
    const stdlibScript = document.createElement('script');
    stdlibScript.type = 'text/javascript';
    stdlibScript.src = '/brython/brython_stdlib.js';
    stdlibScript.async = true;
    
    // Brython 核心脚本加载完成后加载标准库
    brythonScript.onload = () => {
      document.head.appendChild(stdlibScript);
    };
    
    // 标准库加载完成后初始化 Brython
    stdlibScript.onload = () => {
      try {
        if (window.brython) {
          window.brython(1);
          brythonInitialized.current = true;
          console.log('Brython initialized successfully');

          // 设置输出重定向
          if (window.__BRYTHON__) {
            window.__BRYTHON__.stdout.write = (text) => {
              setOutput(prev => prev + text);
            };
            window.__BRYTHON__.stderr.write = (text) => {
              setOutput(prev => prev + `Error: ${text}`);
            };
          }
        } else {
          console.error('Brython not available after loading scripts');
        }
      } catch (err) {
        console.error('Brython initialization failed:', err);
      }
    };
    
    // 添加脚本到文档头部
    document.head.appendChild(brythonScript);
    
    return () => {
      // 清理函数：移除所有添加的脚本
      if (brythonInitialized.current) {
        brythonInitialized.current = false;
      }
      if (document.head.contains(brythonScript)) {
        document.head.removeChild(brythonScript);
      }
      if (document.head.contains(stdlibScript)) {
        document.head.removeChild(stdlibScript);
      }
    };
  }, []);

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
    
    if (selectedLanguage === "python") {
      try {
        // 清空现有输出
        if (pythonOutputRef.current) {
          pythonOutputRef.current.innerHTML = '';
        }

        if (!brythonInitialized.current) {
          // 如果Brython未初始化，先尝试初始化
          try {
            window.brython && window.brython(1);
            brythonInitialized.current = true;
          } catch (err) {
            console.error('无法初始化Brython:', err);
            setOutput(`初始化错误: ${err instanceof Error ? err.message : String(err)}`);
            setIsRunning(false);
            return;
          }
        }

        // 创建新的 Python 代码执行环境
        const execScript = document.createElement('script');
        execScript.id = 'python-exec';
        execScript.type = 'text/python';
        execScript.innerHTML = `
import sys
from browser import document, window, html
try:
    ${code}
except Exception as e:
    print(f"Error: {str(e)}")
`;
        
        // 移除旧的执行脚本（如果存在）
        const oldScript = document.getElementById('python-exec');
        if (oldScript) {
          oldScript.remove();
        }

        // 添加新脚本并执行
        document.body.appendChild(execScript);
        
        // 使用 setTimeout 确保 DOM 已更新后再执行
        setTimeout(() => {
          try {
            window.brython && window.brython();
            toast({
              title: "代码执行成功",
              description: "Python 代码已执行完毕",
            });
          } catch (err) {
            console.error('执行错误:', err);
            setOutput(`执行错误: ${err.message || String(err)}`);
          } finally {
            setIsRunning(false);
          }
        }, 50);
      } catch (error) {
        setOutput(`错误: ${error instanceof Error ? error.message : String(error)}`);
        toast({
          variant: "destructive",
          title: "执行失败",
          description: "Python 代码执行失败",
        });
        setIsRunning(false);
      }
    } else {
      // JavaScript 代码执行保持不变
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
            title: "代码执行成功",
            description: "您的 JavaScript 代码已成功执行。",
          });
        }
      } catch (error) {
        setOutput(`错误: ${error instanceof Error ? error.message : String(error)}`);
        toast({
          variant: "destructive",
          title: "执行失败",
          description: "执行代码时出现错误。",
        });
      } finally {
        setIsRunning(false);
      }
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 pb-0 bg-theme-dark">
        {/* 移除内联脚本标签，我们在 useEffect 中动态添加它们 */}
        
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
                    <div className="flex flex-col h-full">
                      <OutputViewer output={output} isRunning={isRunning} />
                      {/* 添加一个容器用于 Brython 图形输出 */}
                      <div 
                        id="python-output" 
                        ref={pythonOutputRef} 
                        className="mt-4 p-2 rounded-md overflow-auto bg-white/5 flex-grow"
                      ></div>
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
