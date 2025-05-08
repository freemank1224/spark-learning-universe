import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  onChange
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      // 初始化编辑器
      monacoEditor.current = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: 14,
        tabSize: 2,
      });

      // 监听内容变化
      monacoEditor.current.onDidChangeModelContent(() => {
        const newValue = monacoEditor.current?.getValue();
        if (newValue !== undefined) {
          onChange(newValue);
        }
      });

      // 清理函数
      return () => {
        monacoEditor.current?.dispose();
      };
    }
  }, [editorRef, language]);

  // 当外部value改变时，更新编辑器内容
  useEffect(() => {
    // 如果编辑器已创建且值不一致，则更新
    if (monacoEditor.current && monacoEditor.current.getValue() !== value) {
      monacoEditor.current.setValue(value);
    }
  }, [value]);

  // 当语言改变时，更新编辑器语言
  useEffect(() => {
    if (monacoEditor.current) {
      monaco.editor.setModelLanguage(
        monacoEditor.current.getModel()!,
        language
      );
    }
  }, [language]);

  return (
    <div ref={editorRef} className="h-full w-full border border-theme-stone/10 rounded-md overflow-hidden" />
  );
};
