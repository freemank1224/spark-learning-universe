/**
 * Python解释器配置管理
 */

// 加载PyScript
export const loadPyScript = () => {
  // 检查是否已加载
  if (document.querySelector('script[src*="pyscript.js"]')) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    // 移除任何可能的Brython脚本
    const brythonScripts = document.querySelectorAll('script[src*="brython"]');
    brythonScripts.forEach(script => script.remove());

    const script = document.createElement('script');
    script.src = 'https://pyscript.net/latest/pyscript.js';
    script.defer = true;
    
    script.onload = () => {
      console.log('PyScript loaded successfully');
      resolve();
    };
    
    script.onerror = () => {
      console.error('Failed to load PyScript');
      reject(new Error('Failed to load PyScript'));
    };
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://pyscript.net/latest/pyscript.css';
    
    document.head.appendChild(link);
    document.head.appendChild(script);
  });
};

// 清理Brython引用
export const cleanupBrythonReferences = () => {
  if (typeof window === 'undefined') return;
  
  // 移除任何Brython脚本
  const brythonScripts = document.querySelectorAll('script[src*="brython"]');
  brythonScripts.forEach(script => script.remove());
  
  // 移除全局Brython引用
  if ((window as any).__BRYTHON__) {
    delete (window as any).__BRYTHON__;
  }
  
  // 检查是否有任何请求正在尝试加载brython.js
  // 创建一个空对象响应来避免404错误
  if ('fetch' in window) {
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : '';
      if (url.includes('brython')) {
        console.warn('拦截到对Brython的请求:', url);
        return Promise.resolve(new Response('// 占位符', {status: 200}));
      }
      return originalFetch.apply(this, [input, init as RequestInit]);
    };
  }
};

// 初始化Python环境
export const initPythonEnvironment = async () => {
  try {
    // 清理旧的Brython引用
    cleanupBrythonReferences();
    
    // 加载PyScript
    await loadPyScript();
    
    return true;
  } catch (error) {
    console.error('Failed to initialize Python environment:', error);
    return false;
  }
};

// 使用PyScript执行Python代码并返回结果
export const executePythonCode = (code: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    try {
      // 创建临时执行环境
      const outputId = `py-output-${Date.now()}`;
      const tempElement = document.createElement('div');
      tempElement.style.display = 'none';
      tempElement.innerHTML = `
        <py-script id="${outputId}">
import sys
from io import StringIO
import traceback

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
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        sys.stdout = self.old_stdout
        sys.stderr = self.old_stderr

result = ""
error = ""

with CaptureOutput() as output:
    try:
        ${code.replace(/`/g, '\\`').replace(/\${/g, '\\${')}
        result = output.stdout.getvalue()
    except Exception as e:
        error = traceback.format_exc()
        result = output.stdout.getvalue()

# 将结果输出到页面
element = document.createElement("div")
element.id = "${outputId}-result"
element.setAttribute("data-result", result)
element.setAttribute("data-error", error)
document.body.appendChild(element)
        </py-script>
      `;
      
      document.body.appendChild(tempElement);
      
      // 等待结果
      const checkForResult = () => {
        const resultElement = document.getElementById(`${outputId}-result`);
        if (resultElement) {
          const result = resultElement.getAttribute('data-result') || '';
          const error = resultElement.getAttribute('data-error') || '';
          
          // 清理临时元素
          tempElement.remove();
          resultElement.remove();
          
          if (error) {
            resolve(error + '\n' + result);
          } else {
            resolve(result);
          }
        } else {
          // 继续检查
          setTimeout(checkForResult, 100);
        }
      };
      
      // 开始检查结果
      setTimeout(checkForResult, 500);
      
      // 设置超时
      setTimeout(() => {
        if (document.contains(tempElement)) {
          tempElement.remove();
          reject('代码执行超时，可能是无限循环或阻塞操作');
        }
      }, 10000);
      
    } catch (err) {
      reject(`执行错误: ${err instanceof Error ? err.message : String(err)}`);
    }
  });
};
