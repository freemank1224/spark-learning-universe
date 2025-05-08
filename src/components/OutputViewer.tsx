import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import DOMPurify from 'dompurify';

interface OutputViewerProps {
  output: string;
  isRunning: boolean;
}

export const OutputViewer = ({ output, isRunning }: OutputViewerProps) => {
  const outputContainerRef = useRef<HTMLDivElement>(null);
  const [hasVisuals, setHasVisuals] = useState(false);
  const [sanitizedOutput, setSanitizedOutput] = useState<string>('');
  
  // 处理输出内容
  useEffect(() => {
    if (!isRunning && output) {
      // 检测输出中是否包含可视化内容
      const containsVisuals = output && (
        output.includes('<img') || 
        output.includes('<svg') || 
        output.includes('<canvas') || 
        output.includes('<div class="graphics-output">') ||
        output.includes('<matplotlib')
      );
      
      setHasVisuals(containsVisuals);
      
      try {
        // 使用 DOMPurify 安全地处理 HTML
        const sanitized = DOMPurify.sanitize(output);
        setSanitizedOutput(sanitized);
      } catch (e) {
        console.error("Error sanitizing output:", e);
        setSanitizedOutput(`Error rendering output: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  }, [output, isRunning]);

  // 应用样式到图像和处理滚动
  useEffect(() => {
    if (outputContainerRef.current && sanitizedOutput) {
      // 处理图像
      const imgs = outputContainerRef.current.querySelectorAll('img');
      imgs.forEach(img => {
        img.style.maxWidth = '100%';
        img.onerror = () => {
          console.error('Image failed to load:', img.src);
        };
      });
      
      // 自动滚动到底部
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [sanitizedOutput]);

  return (
    <div 
      ref={outputContainerRef}
      className="h-full overflow-auto font-mono text-sm text-theme-cream whitespace-pre-wrap"
    >
      {isRunning ? (
        <div className="text-theme-stone italic">
          正在执行代码... <span className="inline-block ml-1 animate-pulse">|</span>
        </div>
      ) : sanitizedOutput ? (
        <div dangerouslySetInnerHTML={{ __html: sanitizedOutput }} />
      ) : (
        <span className="text-theme-stone italic">
          运行代码以查看输出...
        </span>
      )}
    </div>
  );
};
