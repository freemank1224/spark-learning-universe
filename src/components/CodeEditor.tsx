
import { useEffect, useRef } from 'react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (code: string) => void;
}

export const CodeEditor = ({ language, value, onChange }: CodeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real implementation, you would initialize a code editor like Monaco Editor
    // For this demo, we're using a styled textarea
    if (editorRef.current) {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.className = 'w-full h-full p-4 bg-theme-dark/80 text-theme-cream font-mono text-sm rounded-md border border-theme-stone/20 resize-none';
      textarea.style.minHeight = '300px';
      textarea.addEventListener('input', (e) => {
        onChange((e.target as HTMLTextAreaElement).value);
      });
      
      // Clear and append
      editorRef.current.innerHTML = '';
      editorRef.current.appendChild(textarea);
    }
    
    return () => {
      // Cleanup if needed
    };
  }, [language]); // Re-initialize when language changes

  useEffect(() => {
    // Update value when it changes externally
    if (editorRef.current) {
      const textarea = editorRef.current.querySelector('textarea');
      if (textarea && textarea.value !== value) {
        textarea.value = value;
      }
    }
  }, [value]);

  return <div ref={editorRef} className="h-full" />;
};
