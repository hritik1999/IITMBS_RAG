from flask import Flask, render_template,send_from_directory
from application.api import api
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    api.init_app(app)
    CORS(app, resources={r"/*": {"origins": "*"}})
    return app

app = create_app()


@app.route('/')
def index():
    return send_from_directory('frontend/dist',path='index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('frontend/dist', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)