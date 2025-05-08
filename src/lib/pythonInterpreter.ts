import { useEffect, useState } from 'react';

interface PythonInterpreterProps {
  onOutput: (output: string) => void;
  onError: (error: string) => void;
  onStatusChange: (isRunning: boolean) => void;
}

// 加载Pyodide (另一个选择)
export const loadPyodide = async () => {
  // 确保全局变量存在
  if (typeof window !== 'undefined') {
    if (!(window as any).loadPyodide) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
      script.async = true;
      document.head.appendChild(script);
      
      return new Promise<any>((resolve) => {
        script.onload = async () => {
          const pyodide = await (window as any).loadPyodide();
          resolve(pyodide);
        };
      });
    } else {
      return await (window as any).loadPyodide();
    }
  }
  throw new Error('Cannot load Pyodide in non-browser environment');
};

// Python代码执行函数
export const executePythonCode = async (
  code: string,
  { onOutput, onError, onStatusChange }: PythonInterpreterProps
) => {
  try {
    onStatusChange(true);
    
    // 尝试使用PyScript如果已加载
    if (typeof (window as any).pyscript !== 'undefined') {
      // 使用PyScript执行
      try {
        (window as any).pyscript.runtime.globals.set('__CODE_OUTPUT__', '');
        (window as any).pyscript.runtime.globals.set('__CODE_ERROR__', '');
        
        // 包装代码以捕获输出
        const wrappedCode = `
import sys
from io import StringIO

class CaptureOutput:
    def __init__(self):
        self.old_stdout = sys.stdout
        self.old_stderr = sys.stderr
        self.stdout = StringIO()
        self.stderr = StringIO()
    
    def __enter__(self):
        sys.stdout = self.stdout
        sys.stderr = self.stderr
        return self
    
    def __exit__(self, *args):
        sys.stdout = self.old_stdout
        sys.stderr = self.old_stderr

with CaptureOutput() as output:
    try:
        ${code}
    except Exception as e:
        import traceback
        __CODE_ERROR__ = traceback.format_exc()
    
    __CODE_OUTPUT__ = output.stdout.getvalue()
`;

        await (window as any).pyscript.runtime.run(wrappedCode);
        
        const output = (window as any).pyscript.runtime.globals.get('__CODE_OUTPUT__');
        const error = (window as any).pyscript.runtime.globals.get('__CODE_ERROR__');
        
        if (error) {
          onError(error);
        }
        if (output) {
          onOutput(output);
        }
      } catch (e) {
        // 如果PyScript执行失败，尝试使用Pyodide
        await executePyodideCode(code, { onOutput, onError, onStatusChange });
      }
    } else {
      // 如果PyScript未加载，直接使用Pyodide
      await executePyodideCode(code, { onOutput, onError, onStatusChange });
    }
  } catch (error) {
    onError(`执行错误: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    onStatusChange(false);
  }
};

// 使用Pyodide执行Python代码
export const executePyodideCode = async (
  code: string,
  { onOutput, onError, onStatusChange }: PythonInterpreterProps
) => {
  try {
    const pyodide = await loadPyodide();
    
    // 设置捕获输出
    await pyodide.runPythonAsync(`
      import sys
      from io import StringIO
      sys.stdout = StringIO()
      sys.stderr = StringIO()
    `);
    
    // 执行代码
    await pyodide.runPythonAsync(code);
    
    // 获取输出
    const stdout = await pyodide.runPythonAsync(`sys.stdout.getvalue()`);
    const stderr = await pyodide.runPythonAsync(`sys.stderr.getvalue()`);
    
    if (stderr) {
      onError(stderr);
    }
    if (stdout) {
      onOutput(stdout);
    }
  } catch (e) {
    onError(`Pyodide执行错误: ${e instanceof Error ? e.message : String(e)}`);
  }
};

// React Hook用于使用Python解释器
export const usePythonInterpreter = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    // 加载脚本
    const loadPythonInterpreter = async () => {
      try {
        // 尝试加载PyScript
        if (typeof document !== 'undefined' && !(document as any).querySelector('script[src*="pyscript.js"]')) {
          const script = document.createElement('script');
          script.src = 'https://pyscript.net/latest/pyscript.js';
          script.defer = true;
          
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://pyscript.net/latest/pyscript.css';
          
          document.head.appendChild(link);
          document.head.appendChild(script);
          
          script.onload = () => setIsLoaded(true);
        } else {
          setIsLoaded(true);
        }
      } catch (e) {
        console.error('Failed to load PyScript, falling back to Pyodide');
        // 如果PyScript加载失败，尝试预加载Pyodide
        loadPyodide().then(() => setIsLoaded(true)).catch(console.error);
      }
    };
    
    loadPythonInterpreter();
  }, []);
  
  const runPython = async (code: string) => {
    setOutput('');
    setError('');
    
    await executePythonCode(code, {
      onOutput: setOutput,
      onError: setError,
      onStatusChange: setIsRunning
    });
    
    return { output, error };
  };
  
  return { isLoaded, isRunning, output, error, runPython };
};
