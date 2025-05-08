import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { OutputViewer } from './OutputViewer';
import { executeCode, formatExecutionResult } from '../services/codeExecutionService';

const InteractiveCoding = () => {
  const [code, setCode] = useState('print("Hello, Spark Learning Universe!")\n\n# 尝试绘制一个简单的图表\nimport matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.linspace(0, 10, 100)\ny = np.sin(x)\n\nplt.figure(figsize=(8, 4))\nplt.plot(x, y)\nplt.title("Sin Wave")\nplt.xlabel("X axis")\nplt.ylabel("Y axis")\nplt.grid(True)\nplt.show()');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    if (!code.trim()) {
      setOutput('请先输入代码');
      return;
    }
    
    setIsRunning(true);
    setOutput('正在执行代码...');
    
    try {
      // 使用代码执行服务发送代码到后端执行
      const result = await executeCode(code);
      
      // 格式化结果为HTML（包括控制台输出和图形）
      const formattedOutput = formatExecutionResult(result);
      setOutput(formattedOutput);
    } catch (error) {
      setOutput(`执行错误: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto gap-4 p-4">
      <h2 className="text-2xl font-bold text-theme-cream">交互式编程</h2>
      
      <div className="flex flex-col md:flex-row h-[calc(100vh-200px)] gap-4">
        {/* 左侧：代码编辑区域 */}
        <div className="w-full md:w-1/2 flex flex-col glass-effect rounded-lg overflow-hidden border border-theme-stone/20">
          <div className="bg-theme-navy/50 px-3 py-1.5 text-sm flex items-center">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="ml-2 text-xs text-theme-stone">Python 编辑器</span>
          </div>
          
          <div className="flex-grow">
            <CodeEditor
              language="python"
              value={code}
              onChange={setCode}
            />
          </div>
          
          <div className="p-3 flex justify-end items-center bg-theme-dark/80">
            <button
              className="px-4 py-2 bg-theme-glow text-theme-dark font-bold rounded hover:bg-theme-glow/80 disabled:opacity-50"
              onClick={runCode}
              disabled={isRunning}
            >
              {isRunning ? (
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  运行中...
                </div>
              ) : '运行代码'}
            </button>
          </div>
        </div>
        
        {/* 右侧：输出显示区域 */}
        <div className="w-full md:w-1/2 h-full">
          <OutputViewer output={output} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
};

export default InteractiveCoding;