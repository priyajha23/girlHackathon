import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from sklearn.preprocessing import LabelEncoder
import pickle

app = Flask(__name__)

# Load the trained model
with open('/home/co2emsission/mysite/model.pkl', 'rb') as f:
    model = pickle.load(f)

label_encoders = {}
features = ['product_catetgory', 'from_city', 'to_city', 'Company']
for feature in features:
    label_encoders[feature] = LabelEncoder()
@app.route('/')
def main():
    return 'Homepage'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()


    new_data = pd.DataFrame(data, columns=['product_catetgory', 'from_city', 'to_city', 'Company'])
    for feature in features:
        new_data[feature] = label_encoders[feature].fit_transform(new_data[feature])


    predictions = model.predict(new_data)
    predictions = predictions.flatten() 
    predicted_emissions = []

    for i, input_data in enumerate(data):
        description = ', '.join(input_data)
        emission = predictions[i]
        predicted_emissions.append({'description': description, 'emission': emission})

    return jsonify({'predicted_emissions': predicted_emissions})


