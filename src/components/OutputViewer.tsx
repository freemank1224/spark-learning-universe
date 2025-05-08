import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface OutputViewerProps {
  output: string;
  isRunning: boolean;
}

export const OutputViewer = ({ output, isRunning }: OutputViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Initialize canvas for visualizations
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Setup canvas for potential visualizations
        canvasRef.current.width = canvasRef.current.clientWidth;
        canvasRef.current.height = canvasRef.current.clientHeight;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // If we have output, draw a mock visualization
        if (output && !isRunning) {
          // Mock sine wave visualization
          const width = canvasRef.current.width;
          const height = canvasRef.current.height;
          
          ctx.beginPath();
          ctx.moveTo(0, height / 2);
          
          for (let x = 0; x < width; x++) {
            const y = Math.sin((x / width) * Math.PI * 5) * height / 4 + height / 2;
            ctx.lineTo(x, y);
          }
          
          ctx.strokeStyle = '#9b87f5';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Add labels
          ctx.font = '14px sans-serif';
          ctx.fillStyle = '#f1f0fb';
          ctx.fillText('sin(x)', 20, 30);
          ctx.fillText('x', width - 20, height / 2 + 20);
          ctx.fillText('y', 20, 20);
        }
      }
    }
  }, [output, isRunning]);

  return (
    <div className="flex-grow flex flex-col glass-effect rounded-lg overflow-hidden">
      {isRunning ? (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-theme-glow animate-spin" />
            <p className="mt-4 text-theme-cream">Running your code...</p>
          </div>
        </div>
      ) : output ? (
        <div className="h-full flex flex-col">
          <div className="w-full h-3/4 bg-theme-dark/50 border-b border-theme-stone/10 overflow-auto">
            {/* Python output container */}
            <div id="python-output" className="w-full h-full p-4"></div>
            <canvas 
              ref={canvasRef} 
              className="hidden"
            ></canvas>
          </div>
          <pre className="p-4 text-theme-cream font-mono text-sm overflow-auto h-1/4 bg-theme-dark/80">
            {output}
          </pre>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-theme-stone">
          <div className="text-center p-6">
            <p className="text-lg mb-2">Run your code to see results here</p>
            <p className="text-sm">The output and visualization will appear in this panel</p>
          </div>
        </div>
      )}
    </div>
  );
};
