# Tip Burn Disease Detection in Strawberry Leaves 

> Prathyuma, V., Hareesh Teja, S., Suganeshwari, G., Divya, S. (2024). Assessing the Feasibility and Scalability of Using Spark for Identifying Tip Burn Diseases in Strawberry Leaves. In: Das, S., Saha, S., Coello Coello, C.A., Bansal, J.C. (eds) Advances in Data-Driven Computing and Intelligent Systems. ADCIS 2023. Lecture Notes in Networks and Systems, vol 891. Springer, Singapore. https://doi.org/10.1007/978-981-99-9524-0_26

## Repository Structure
- ElectronFrontEnd - A desktop frontend application to send images to the backend
- FlaskServer - A Flask backend application that detects the presence of tipburn in incoming images
- Model - The ipynb file used to build, train and test the model
- ReactNativeFrontEnd - A mobile frontend application to send images to the backend

# Model Development
## Importing the Dataset
- Images were downloaded from the above linked dataset.
## Preprocessing the Data
- These images were then converted to 300*300 pixel matrices before further pre-processing.
- K-Means clustering was used to separate the foreground from the background and Otsu's Threshold algorithm was used to binarize the image.
### Feature Extraction
- Grey-Level Co-Occurence Matrices (or GLCMs) were constructed for the images at increments of 45 degrees to extract 5 textural properties - “ASM” or Energy, “Contrast”, “Dissimilarity”, “Correlation”, and “Homogeneity”.
- These quantifiable properties form the dataset that the model is built on.
### Training and Testing
- The dataset formed after feature extraction was split into testing and training data in the ratio of 8:2.
- The Random Forest Classifier, an Ensemble Learning approach was used to build the machine learning model.
- Hyperparameter tuning was used to find ideal model parameters for improved performance.
### Model Validation
- Various metrics such as the Accuracy Score, Precision, Recall, and F1 Score were used to validate model performance.

## Contributors
- Prathyuma V - 20MIA1030
- Madhumitha R - 20MIA1045
- Hareesh Teja S - 20MIA1026
