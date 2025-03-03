from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestClassifier
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__);
CORS(app)

model = joblib.load('model/model.pkl');

@app.route('/predict', methods=['POST'])
def predict():
    return "Obesity_Type_II"

if __name__ == "__main__":
    app.run(debug=True)  # Runs on http://127.0.0.1:5000 by default
    print('hello world')
