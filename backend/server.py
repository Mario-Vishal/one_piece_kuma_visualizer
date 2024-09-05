from flask import Flask
import datetime
from flask_cors import CORS
from flask import Flask, request, jsonify
from Model import Model
from PIL import Image

x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)
CORS(app)
model = Model()
# Route for seeing a data
@app.route('/data')
def get_time():
 
    # Returning an api for showing in  reactjs
    return {
        'Name':"Mario", 
        "Age":"24",
        "Date":x, 
        "programming":"python"
        }

@app.route('/predict', methods=['POST','GET'])
def upload_file():
    
    if request.method == "POST":
        print("called!")
        if 'image' not in request.files:
            return jsonify({"error": "No file part"}), 400
        file = request.files['image']
        
        img_size = eval(request.form.get('imageSize'))
        
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        if file:
            # print(type(file))
            image = Image.open(file.stream)
            print(type(img_size),"-----------------------------------------")
            print(img_size.items())
            image=image.resize((int(img_size['width']),int(img_size['height'])))
            print(image.size,"size")
            
            result = model.predict(image)
            return jsonify(result), 200
    else:
        return "This page only accepts image data!"

     
# Running app
if __name__ == '__main__':

    app.run(debug=True)