import cv2, numpy
from flask import Flask, jsonify, request
from keras_preprocessing.image import img_to_array, load_img
from skimage.feature import greycomatrix, greycoprops
import pickle

app = Flask(__name__)

with open("ML_model", "rb") as file:
    model=pickle.load(file)


properties = ['ASM','contrast','dissimilarity','correlation','homogeneity']
def glcm_test(img,props, dists=[5], agls=[0, numpy.pi/4, numpy.pi/2, 3*numpy.pi/4], lvl=256, sym=True, norm=True):
    glcm = greycomatrix(img.astype(int), 
                        distances=dists, 
                        angles=agls, 
                        levels=lvl,
                        symmetric=sym, 
                        normed=norm)
    feature = []
    glcm_props = [property for name in props for property in greycoprops(glcm, name)[0]]
    for item in glcm_props:
            feature.append(item)
    return feature
    
@app.route('/')
def index():
    return 'Hello world'

@app.route('/uploadImage', methods=['POST'])
def post():
        print("Received Image")
        file = request.files['image']
        file.save('received.jpg')
        image = load_img('received.jpg',target_size=(300,300))
        image = numpy.array(image)
        image_array = img_to_array(image)
        image_grey = cv2.cvtColor(image_array, cv2.COLOR_BGR2GRAY)
        vector = numpy.array(glcm_test(image_grey,props=properties))
        prediction = model.predict(vector.reshape(1,-1))
        print(prediction)
        if prediction == 0:
            return jsonify({'diseased': False})
        else:
            return jsonify({'diseased': True})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)

