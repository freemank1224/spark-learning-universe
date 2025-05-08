from flask import Flask, request, jsonify, send_from_directory
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 启用CORS，允许前端访问后端API

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

# 可以在这里添加更多API路由

if __name__ == '__main__':
    app.run(debug=True)