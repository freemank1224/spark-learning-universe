import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface OutputViewerProps {
  output: string;
  isRunning: boolean;
}

export const OutputViewer = ({ output, isRunning }: OutputViewerProps) => {
  const outputContainerRef = useRef<HTMLDivElement>(null);
  const [hasVisuals, setHasVisuals] = useState(false);
  
  useEffect(() => {
    // 检测输出中是否包含可视化内容
    const containsVisuals = output && (
      output.includes('<img') || 
      output.includes('<svg') || 
      output.includes('<canvas') || 
      output.includes('<div') ||
      output.includes('<matplotlib')
    );
    
    setHasVisuals(containsVisuals);
    
    // 处理输出显示
    if (!isRunning && output && outputContainerRef.current) {
      if (containsVisuals) {
        try {
          // 安全地渲染HTML内容
          const sanitized = output
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')  // 移除脚本标签
            .replace(/on\w+="[^"]*"/g, '');  // 移除事件处理器
            
          outputContainerRef.current.innerHTML = sanitized;
          
          // 查找并处理可能生成的图表
          const imgs = outputContainerRef.current.querySelectorAll('img');
          imgs.forEach(img => {
            // 确保图片正确加载
            img.style.maxWidth = '100%';
            img.onerror = () => {
              console.error('Image failed to load:', img.src);
            };
          });
        } catch (e) {
          console.error("Error rendering visual output:", e);
          outputContainerRef.current.textContent = `Error rendering output: ${e instanceof Error ? e.message : String(e)}`;
        }
      } else {
        // 纯文本输出
        outputContainerRef.current.textContent = output;
      }
    }
  }, [output, isRunning]);

  // 自动滚动到底部
  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center bg-theme-navy/50 px-3 py-1.5 text-sm rounded-t-md">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="ml-2 text-xs text-theme-stone">控制台输出</span>
      </div>
      
      <div 
        ref={outputContainerRef}
        className="flex-grow p-3 overflow-auto font-mono text-sm text-theme-cream bg-theme-dark/70 whitespace-pre-wrap"
      >
        {output || (
          <span className="text-theme-stone italic">
            {isRunning ? '正在执行代码...' : '运行代码以查看输出...'}
          </span>
        )}
        {isRunning && (
          <div className="inline-block ml-1 animate-pulse">|</div>
        )}
      </div>
    </div>
  );
};
