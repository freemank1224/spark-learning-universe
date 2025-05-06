
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  message: Message;
}

export const AIAssistant = ({ message }: AIAssistantProps) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Simple formatting for code blocks in messages
  const formatMessageContent = (content: string) => {
    // Check if the message contains code blocks with ```
    if (content.includes('```')) {
      const parts = content.split(/```(?:(\w+)\n)?/);
      
      return parts.map((part, index) => {
        // Every third part is potentially a code block
        if (index % 3 === 1) {
          // This is the language name (might be undefined)
          return null;
        } else if (index % 3 === 2) {
          // This is the code block content
          const language = parts[index - 1] || ''; // Get the language if it exists
          return (
            <div key={index} className="relative">
              <pre className="p-3 bg-theme-dark rounded-md my-2 overflow-x-auto">
                <code className={`language-${language} text-theme-cream font-mono text-sm`}>{part}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(part)}
                className="absolute top-2 right-2 p-1 rounded-md bg-theme-dark/80 hover:bg-theme-navy/60"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-theme-glow" />
                ) : (
                  <Copy className="h-4 w-4 text-theme-stone" />
                )}
              </button>
            </div>
          );
        } else {
          // This is regular text
          if (!part.trim()) return null;
          return <p key={index} className="mb-2 whitespace-pre-line">{part}</p>;
        }
      });
    }
    
    // Regular text without code blocks
    return <p className="whitespace-pre-line">{content}</p>;
  };

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          message.role === 'user'
            ? 'bg-theme-navy text-theme-cream'
            : 'bg-theme-dark/60 text-theme-cream border border-theme-stone/20'
        }`}
      >
        {formatMessageContent(message.content)}
      </div>
    </div>
  );
};
