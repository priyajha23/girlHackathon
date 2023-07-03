Model Refining
This repository contains code for refining a machine learning model to predict emission
footprints based on various features. The model is trained using the TensorFlow framework
and can be used to make predictions on new data.
Data
The model uses data from the "Input data of transactions received from Online Marketplace
partners.xlsx" file. The data is loaded into a pandas dataframe and preprocessed before
training the model.
Preprocessing
The data is preprocessed to handle missing values by dropping any rows that contain null
values using the dropna() function. The target variable is defined as 'emission_footprint', and
the features used for training the model are 'product_catetgory', 'from_city', 'to_city', and
'Company'. Categorical features are encoded using label encoding with the help of the
LabelEncoder class from scikit-learn.
Model Training
The model is built using a sequential architecture from the TensorFlow Keras API. It consists
of three dense layers with dropout regularization. The loss function used is mean squared
error, and the optimizer used is Adam. The model is trained on the training data for 150
epochs with a batch size of 50.
Model Evaluation
After training, the model's performance is evaluated by predicting the emission footprints on
the test data. The mean squared error is calculated and printed as a measure of the model's
accuracy.
Making Predictions
The trained model is used to make predictions on new data. A sample dataset is created and
encoded using the label encoders generated during training. The model predicts the
emission footprint for the new data, and the result is printed.
Saving the Model
The trained model is saved in two formats: pickle (.pkl) and TensorFlow Lite (.tflite). The
pickle format is used for saving the scikit-learn model, and the TensorFlow Lite format is
used for mobile and embedded devices.
To use the saved model, load it back into memory using the respective libraries and make
predictions on new data.
This project provides a basic framework for refining and deploying a machine learning model
to predict emission footprints based on various features. Feel free to modify and extend the
code to suit your specific requirements.
—--
Flask App for Emission Prediction
This repository contains a Flask app that uses a trained machine learning model to predict
CO2 emissions based on input data. The app provides an API endpoint that accepts JSON
data and returns the predicted emissions.
Endpoint and Functionality
Endpoint: /predict
Method: POST
Input: JSON data with an array of objects containing the following fields: product_catetgory,
from_city, to_city, Company.
Output: JSON response with an array of predicted emissions, each containing a description
and an emission value.
The app performs the following steps:
Load the trained model from the model.pkl file.
Initialize the label encoders for the categorical features.
Accept the input JSON data.
Preprocess the input data by transforming the categorical features using the label encoders.
Make predictions using the trained model.
Create a response with a list of predicted emissions, including a description of the input data
and the corresponding emission value.
Return the response as a JSON object
