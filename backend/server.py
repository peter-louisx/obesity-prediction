from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load('model/model.pkl')


@app.route('/predict', methods=['POST'])
def predict():

    yesOrNoValues = {
        'yes': 1.0,
        'no': 0.0,
    }

    mtransValues = {
        'Automobile': 0,
        'Bike': 1,
        'Motorbike': 2,
        'Public_Transportation': 3,
        'Walking': 4,
    }

    pred = model.predict(np.array([[
        float(request.json['age']),
        float(request.json['height']),
        float(request.json['weight']),
        yesOrNoValues[request.json['family_history']],
        yesOrNoValues[request.json['favc']],
        float(request.json['fcvc']),
        float(request.json['ncp']),
        float(request.json['caec']),
        yesOrNoValues[request.json['smoke']],
        float(request.json['ch2o']),
        yesOrNoValues[request.json['scc']],
        float(request.json['faf']),
        float(request.json['tue']),
        float(request.json['calc']),
        mtransValues[request.json['mtrans']]
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
    
    return jsonify({'prediction': pred})

if __name__ == "__main__":
    app.run(debug=True)  # Runs on http://127.0.0.1:5000 by default
    print('hello world')
