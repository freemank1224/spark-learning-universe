from flask import Flask, request, jsonify, send_from_directory
import os
import sys
import io
import traceback
import base64
import matplotlib
import glob
import shutil
matplotlib.use('Agg')  # 设置matplotlib的后端为Agg，用于生成图片
import matplotlib.pyplot as plt
from flask_cors import CORS

app = Flask(__name__)
# 更精确的CORS配置，允许任何来源访问API，这对开发环境特别有用
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# 创建临时目录用于存储图片输出
TEMP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'temp')
os.makedirs(TEMP_DIR, exist_ok=True)

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Welcome to Spark Learning Universe API"})

@app.route('/hello', methods=['GET'])
def hello_route():
    return jsonify({"message": "Hello World!"})

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Flask Backend!"})

@app.route('/favicon.ico')
def favicon():
    # 尝试从公共目录提供favicon.ico
    return send_from_directory(os.path.join(app.root_path, '../public'), 
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/api/execute', methods=['POST'])
def execute_code():
    """执行Python代码并返回结果"""
    if not request.json or 'code' not in request.json:
        return jsonify({'error': '请求必须包含code字段'}), 400

    # 清理临时目录中的所有旧图片文件
    clean_temp_directory()
    
    # 清理matplotlib中可能的遗留图形
    plt.close('all')
    
    code = request.json['code']
    figure_count = 0
    figures = []
    processed_figures = set()  # 用于跟踪已处理的图形，避免重复
    
    # 创建StringIO对象来捕获标准输出和标准错误
    stdout_capture = io.StringIO()
    stderr_capture = io.StringIO()
    
    # 保存原始stdout和stderr
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    
    # 重定向stdout和stderr
    sys.stdout = stdout_capture
    sys.stderr = stderr_capture
    
    try:
        # 添加matplotlib的figure捕获
        def on_figure_created(figure):
            nonlocal figure_count
            
            # 检查图形是否已处理过，避免重复
            figure_id = id(figure)
            if figure_id in processed_figures:
                return
                
            processed_figures.add(figure_id)
            
            # 保存图像到临时文件
            filename = f"figure_{figure_count}.png"
            filepath = os.path.join(TEMP_DIR, filename)
            figure.savefig(filepath)
            
            # 读取图像并转换为base64
            with open(filepath, "rb") as img_file:
                img_data = base64.b64encode(img_file.read()).decode('utf-8')
                
            figures.append({
                'filename': filename,
                'data': img_data
            })
            figure_count += 1
            
        # 添加matplotlib的figure捕获钩子
        if hasattr(matplotlib, '_pylab_helpers') and hasattr(matplotlib._pylab_helpers, 'Gcf'):
            original_show = matplotlib.pyplot.show
            def custom_show(*args, **kwargs):
                # 捕获当前所有图形
                fig_managers = matplotlib._pylab_helpers.Gcf.get_all_fig_managers()
                
                # 避免空列表
                if not fig_managers:
                    return original_show(*args, **kwargs)
                
                # 处理每个图形
                for fig_manager in fig_managers:
                    on_figure_created(fig_manager.canvas.figure)
                
                # 调用原始show方法（如果block=True，将会阻塞执行）
                # 在非交互式后端中，这不会显示GUI窗口
                kwargs['block'] = False  # 确保不阻塞执行
                original_show(*args, **kwargs)
                
                # 显示完成后关闭所有图形，防止重复捕获
                if not kwargs.get('block', False):
                    plt.close('all')
                
            matplotlib.pyplot.show = custom_show
            
        # 执行代码
        namespace = {'__builtins__': __builtins__}
        exec(code, namespace)
        
        # 捕获未显示但已创建的图形
        if hasattr(matplotlib, '_pylab_helpers') and hasattr(matplotlib._pylab_helpers, 'Gcf'):
            fig_managers = matplotlib._pylab_helpers.Gcf.get_all_fig_managers()
            for fig_manager in fig_managers:
                on_figure_created(fig_manager.canvas.figure)
        
        # 获取输出
        stdout_output = stdout_capture.getvalue()
        stderr_output = stderr_capture.getvalue()
        
        result = {
            'output': stdout_output,
            'error': stderr_output,
            'figures': figures
        }
        
        return jsonify(result), 200
    except Exception as e:
        # 捕获执行过程中的异常
        error_msg = str(e)
        traceback_str = traceback.format_exc()
        return jsonify({
            'output': stdout_capture.getvalue(),
            'error': f"{error_msg}\n{traceback_str}",
            'figures': figures
        }), 200
    finally:
        # 恢复原始的stdout和stderr
        sys.stdout = old_stdout
        sys.stderr = old_stderr
        
        # 恢复matplotlib的show方法
        if hasattr(matplotlib, '_pylab_helpers') and hasattr(matplotlib._pylab_helpers, 'Gcf'):
            matplotlib.pyplot.show = original_show
            
        # 清理所有matplotlib图形
        plt.close('all')

def clean_temp_directory():
    """清理临时目录中的所有图片文件"""
    # 清理之前的图片文件
    image_files = glob.glob(os.path.join(TEMP_DIR, "figure_*.png"))
    for file_path in image_files:
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"清理临时文件失败: {file_path}, 错误: {str(e)}")

@app.route('/api/temp/<path:filename>')
def serve_temp_file(filename):
    """提供临时生成的文件，如图像"""
    return send_from_directory(TEMP_DIR, filename)

# 可以在这里添加更多API路由

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5005)  # 使用127.0.0.1和端口5005