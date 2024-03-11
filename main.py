from quart import Quart, request, render_template, send_file
from utils import S3
from io import BytesIO
import os

app = Quart(__name__)
s3 = S3()

@app.route("/")
async def home():
    return await render_template(
        "index.html"
        )
    
@app.route("/s3/upload", methods=['POST'])
async def upload_route():
    file = request.files.get('file')
    data = await file.read()
    file_obj = BytesIO(data)
    file_obj.name = file.name
    return dict(
        status='OK', 
        result=s3.upload(file_obj, file.name)
        )
    
@app.route("/s3/download")
async def download_route():
    filename = request.args.get('file')
    file_obj = BytesIO()
    file_obj = s3.download(
        filename, 
        file_obj
        )
    file_obj.name = filename
    return await send_file(
        file_obj, attachment_filename=filename,
        as_attachment=True
        )
    
@app.route("/s3/list")
async def list_route():
    types = request.args.get('type', None)
    result = s3.listdir()
    if types == "video":
        result = list(f for f in result if f.endswith('.mp4'))
    elif types in ['image', 'photo', 'picture']:
        result = list(f for f in result if any(f.endswith(s) for s in ['.jpg', '.jpeg', '.png']))
    elif types in ['audio', 'music']:
        result = list(f for f in result if f.endswith('.mp3'))
    return dict(
        status='OK', 
        result=result
        )
    
@app.route("/s3/get")
async def get_link_route():
    query = request.args.get('q')
    return dict(
        status='OK', 
        result=s3.get_link(query)
        )