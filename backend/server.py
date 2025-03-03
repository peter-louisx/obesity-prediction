from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load('model/model.pkl')


@app.route('/predict', methods=['POST'])
def predict():
    pred = model.predict(np.array([[
        request.json['Age'],
        request.json['Height'],
        request.json['Weight'],
        request.json['family_history'],
        request.json['FAVC'],
        request.json['FCVC'],
        request.json['NCP'],
        request.json['CAEC'],
        request.json['SMOKE'],
        request.json['CH2O'],
        request.json['SCC'],
        request.json['FAF'],
        request.json['TUE'],
        request.json['CALC'],
        request.json['MTRANS']
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
