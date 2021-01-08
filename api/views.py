import io
import os
import pathlib
import zipfile

from flask.helpers import send_from_directory, send_file
from config import Config
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config())
CORS(app)


@app.route('/post-album', methods=['POST'])
def post_album():
    if request.files:
        keys = request.files.keys()
        name = request.form['name']
        pathlib.Path(app.config['UPLOAD_FOLDER'], name).mkdir(exist_ok=True)
        for key in keys:
            file = request.files[key]
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], name, filename)) 
        return 'success'

@app.route('/get-albums', methods=['GET'])
def get_albums():
    base_path = pathlib.Path(os.path.join(app.config['UPLOAD_FOLDER'], 'album1'))
    data = io.BytesIO()
    with zipfile.ZipFile(data, mode='w') as z:
        for file in base_path.iterdir():
            z.write(file)
    data.seek(0)
    return send_file(data, mimetype='application/zip', as_attachment=True, attachment_filename='data.zip')