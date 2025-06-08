from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

model = pickle.load(open('model/model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    caeccalcValues = {
        'Sometimes': 0.0,
        'Frequently': 1.0,
        'Always': 2.0,
        'no': 3.0, 
    }


    pred = model.predict(np.array([[
        float(request.json['age']),
        float(request.json['height']),
        float(request.json['weight']),
        float(request.json['fcvc']),
        float(request.json['ncp']),
        caeccalcValues[request.json['caec']],
        float(request.json['ch2o']),
        float(request.json['faf']),
        float(request.json['tue']),
        caeccalcValues[request.json['calc']],
    ]]))

    target_labels = {
        'Insufficient_Weight': 0,
        'Normal_Weight': 1,
        'Overweight_Level_I': 2,
        'Overweight_Level_II': 3,
        'Obesity_Type_I': 4,
        'Obesity_Type_II': 5,
        'Obesity_Type_III': 6,
    }

    for key, value in target_labels.items():
        if value == pred[0]:
            pred = key
            break
    
    return jsonify({'prediction': pred.replace("_", " ")})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')  # Runs on http://127.0.0.1:5000 by default
    #change host to 0.0.0.
    print('hello world')
