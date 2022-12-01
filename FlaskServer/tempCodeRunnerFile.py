import cv2, numpy
from keras_preprocessing.image import img_to_array, load_img
from skimage.feature import greycomatrix, greycoprops
import pickle
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
image = load_img('received.jpeg',target_size=(300,300))
image = numpy.array(image)
image_array = img_to_array(image)
image_grey = cv2.cvtColor(image_array, cv2.COLOR_BGR2GRAY)
vector = numpy.array(glcm_test(image_grey,props=properties))
prediction = model.predict(vector.reshape(1,-1))
if prediction == 0:
    print({'diseased': False})
else:
    print({'diseased': True})
