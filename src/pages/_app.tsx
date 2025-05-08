import { useEffect } from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { initPythonEnvironment } from '../lib/pythonConfig';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 初始化Python环境
    initPythonEnvironment();

    // 预加载PyScript
    const loadPyScript = () => {
      if (document.querySelector('script[src*="pyscript.js"]')) {
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://pyscript.net/latest/pyscript.js';
      script.defer = true;
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://pyscript.net/latest/pyscript.css';
      
      document.head.appendChild(link);
      document.head.appendChild(script);
    };
    
    loadPyScript();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;