import pickle
import random
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier


mlp = MLPClassifier(hidden_layer_sizes=(16,64,32), activation='relu', solver='adam', max_iter=500)

filename = 'sk-model.sav'
loaded_model = pickle.load(open(filename, 'rb'))


from flask import Flask, request


# create the Flask app
app = Flask(__name__)

def pesel_to_score(pesel):



    return "score"


@app.route('/social_score')
def social_score():
    pesel = request.args.get('pesel')
    return 'Query String Example'




result = loaded_model.predict([[200,900,500,900]])
print(result)


if __name__ == '__model__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=4999)