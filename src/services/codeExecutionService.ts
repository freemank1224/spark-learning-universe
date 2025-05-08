/**
 * 代码执行服务 - 与后端API交互执行代码
 */

interface ExecutionResult {
  output: string;
  error: string;
  figures: {
    filename: string;
    data: string;
  }[];
}

// 分离后的执行结果接口
export interface ProcessedExecutionResult {
  textOutput: string; // HTML格式的文本输出（包含控制台输出和错误信息）
  visualOutput: string; // HTML格式的可视化输出（包含图形）
  hasGraphics: boolean; // 是否包含图形
  rawOutput: ExecutionResult; // 原始结果
}

// 获取后端API的基础URL
const getApiBaseUrl = (): string => {
  // 开发环境使用固定后端地址，生产环境可根据需要调整
  return 'http://127.0.0.1:5005';
};

/**
 * 发送代码到后端执行
 * @param code 要执行的代码
 * @returns 处理后的执行结果，分离了文本和可视化
 */
export const executeCode = async (code: string): Promise<ProcessedExecutionResult> => {
  try {
    const apiUrl = `${getApiBaseUrl()}/api/execute`;
    console.log('发送代码到后端执行:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('后端执行结果:', result);
    // 处理并分离结果
    return processExecutionResult(result);
  } catch (error) {
    console.error('代码执行服务错误:', error);
    const errorResult = {
      output: '',
      error: `服务器错误: ${error instanceof Error ? error.message : String(error)}`,
      figures: [],
    };
    return processExecutionResult(errorResult);
  }
};

/**
 * 处理执行结果，分离文本和可视化内容
 * @param result 执行结果
 * @returns 分离处理后的结果
 */
export const processExecutionResult = (result: ExecutionResult): ProcessedExecutionResult => {
  // 处理文本输出
  let textOutput = '';
  if (result.output) {
    textOutput += `<div class="console-output">${escapeHtml(result.output)}</div>`;
  }
  if (result.error) {
    textOutput += `<div class="error-output">${escapeHtml(result.error)}</div>`;
  }

  // 处理可视化输出
  let visualOutput = '';
  const hasGraphics = result.figures && result.figures.length > 0;
  if (hasGraphics) {
    visualOutput += '<div class="graphics-output">';
    for (const figure of result.figures) {
      visualOutput += `<img src="data:image/png;base64,${figure.data}" alt="Figure ${figure.filename}" style="max-width: 100%; margin: 10px 0;" />`;
    }
    visualOutput += '</div>';
  }

  return {
    textOutput,
    visualOutput,
    hasGraphics,
    rawOutput: result
  };
};

/**
 * 转义HTML特殊字符
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML.replace(/\n/g, '<br>');
}