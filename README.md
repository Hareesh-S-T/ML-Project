# Tip Burn Disease Detection in Strawberry Leaves 
This project uses Machine Learning and Digital Image Processing Techhniques to detect "tipburn" in Strawberry Leaves.

Dataset Link : https://data.mendeley.com/datasets/trwfmgjjr6/1

## Repository Structure
- ElectronFrontEnd - A desktop frontend application to send images to the backend
- FlaskServer - A Flask backend application that detects the presence of tipburn in incoming images
- Model - The ipynb file used to build, train and test the model
- ReactNativeFrontEnd - A mobile frontend application to send images to the backend

# Model Development
## Importing the Dataset
- Images were downloaded from the above linked dataset and imported in greyscale.
## Preprocessing the Data
- These images were then converted to 300*300 pixel matrices before further pre-processing.
- K-Means clustering and Otsu's Threshold algorithm were used to segment the image into foreground and background components and convert these into binary images.
### Feature Extraction
- Grey-Level Co-Occurence Matrices (or GLCMs) were constructed for the images at increments of 45 degrees to extract 4 textural properties - “ASM” or Energy, “Contrast”, “Dissimilarity”, “Correlation”, and “Homogeneity”.
- These quantifiable properties were used to build the actual model.
### Model Building
- The machine learning model built in this project uses the Random Forest Classifier.
- Hyperparameter tuning was used to find ideal model parameters for improved performance.

## Contributors
- Prathyuma V - 20MIA1030
- Madhumitha R - 20MIA1045
- Hareesh Teja S - 20MIA1026