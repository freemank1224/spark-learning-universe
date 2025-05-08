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

// 获取后端API的基础URL
const getApiBaseUrl = (): string => {
  // 开发环境使用固定后端地址，生产环境可根据需要调整
  return 'http://127.0.0.1:5005';
};

/**
 * 发送代码到后端执行
 * @param code 要执行的代码
 * @returns 执行结果，包括输出、错误和图表
 */
export const executeCode = async (code: string): Promise<ExecutionResult> => {
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
    return result;
  } catch (error) {
    console.error('代码执行服务错误:', error);
    return {
      output: '',
      error: `服务器错误: ${error instanceof Error ? error.message : String(error)}`,
      figures: [],
    };
  }
};

/**
 * 处理执行结果，生成HTML输出（包括图形）
 * @param result 执行结果
 * @returns 格式化的HTML字符串
 */
export const formatExecutionResult = (result: ExecutionResult): string => {
  let formattedOutput = '';

  // 添加文本输出
  if (result.output) {
    formattedOutput += `<div class="console-output">${escapeHtml(result.output)}</div>`;
  }

  // 添加错误输出
  if (result.error) {
    formattedOutput += `<div class="error-output">${escapeHtml(result.error)}</div>`;
  }

  // 添加图形输出
  if (result.figures && result.figures.length > 0) {
    formattedOutput += '<div class="graphics-output">';
    for (const figure of result.figures) {
      formattedOutput += `<img src="data:image/png;base64,${figure.data}" alt="Figure ${figure.filename}" style="max-width: 100%; margin: 10px 0;" />`;
    }
    formattedOutput += '</div>';
  }

  return formattedOutput;
};

/**
 * 转义HTML特殊字符
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML.replace(/\n/g, '<br>');
}