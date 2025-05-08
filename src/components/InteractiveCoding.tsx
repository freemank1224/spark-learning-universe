import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { initPythonEnvironment, executePythonCode } from '../lib/pythonConfig';
import { OutputViewer } from './OutputViewer';

const InteractiveCoding = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [interpreterReady, setInterpreterReady] = useState(false);

  useEffect(() => {
    // 初始化Python环境
    const setupPython = async () => {
      const success = await initPythonEnvironment();
      setInterpreterReady(success);
    };
    
    setupPython();
  }, []);

  const runCode = async () => {
    if (!code.trim()) {
      setOutput('请先输入代码');
      return;
    }
    
    setIsRunning(true);
    setOutput('');
    
    try {
      const result = await executePythonCode(code);
      setOutput(result);
    } catch (error) {
      setOutput(`执行错误: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-row h-full gap-4">
      {/* 左侧：输出显示区域 */}
      <div className="w-1/2 h-full">
        <OutputViewer output={output} isRunning={isRunning} />
      </div>
      
      {/* 右侧：代码编辑区域 */}
      <div className="w-1/2 flex flex-col glass-effect rounded-lg overflow-hidden">
        <textarea
          className="w-full h-full p-4 bg-theme-dark/50 text-theme-cream font-mono text-sm"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="在此输入Python代码..."
        />
        <div className="p-4 flex justify-between items-center bg-theme-dark/80">
          <div className="text-theme-cream text-sm">
            {interpreterReady ? '解释器已就绪' : '正在加载解释器...'}
          </div>
          <button
            className="px-4 py-2 bg-theme-glow text-theme-dark font-bold rounded hover:bg-theme-glow/80 disabled:opacity-50"
            onClick={runCode}
            disabled={isRunning || !interpreterReady}
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
    </div>
  );
};

export default InteractiveCoding;