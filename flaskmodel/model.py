import pickle
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
import sklearn
print(sklearn.__version__)


mlp = MLPClassifier(hidden_layer_sizes=(16,64,32), activation='relu', solver='adam', max_iter=500)

filename = 'sk-model.sav'
loaded_model = pickle.load(open(filename, 'rb'))


from flask import Flask, request


# create the Flask app
app = Flask(__name__)


import psycopg2
conn = psycopg2.connect(database="postgres",
                        host="db",
                        user="postgres",
                        password="postgres",
                        port="5432")

cursor = conn.cursor()


def pesel_to_score(pesel):
    cursor.execute(f"SELECT weight FROM crime WHERE subject == {pesel}")
    crime = cursor.fetchall()
    cursor.execute(f"SELECT rating FROM review WHERE subject == {pesel}")
    rating = cursor.fetchall()
    cursor.execute(f"SELECT height, weight, education FROM user_ WHERE pesel == {pesel}")
    user = cursor.fetchall()
    good_act = cursor.execute(f"SELECT weight FROM good_act WHERE subject == {pesel}")
    good_act = cursor.fetchall()

    crime_, rating_, bmi_education_, good_act_ = 0,0,0,0
    for i in range(len(crime)):
        crime_ += crime[i]
    if crime_ > 0:
        crime_f = (999-crime_)/len(crime)
    for i in range(len(rating)):
        rating_ += rating[i]
    rating_ = (rating_/(10*len(rating)))*999

    height_ = user[0]
    weight_ = user[1]
    education_ = user[2]
    bmi_ = (weight_/(height_**2))
    if bmi_ < 25 and bmi_ > 18.5:
        bmi_education_ = education_ * 210
    else:
        bmi_education_ = education_ * 100
    for i in range(len(good_act)):
        good_act_ += good_act[i]
    good_act_ = len(good_act)*good_act_


    score = loaded_model.predict([[crime_f, rating_, bmi_education_, good_act_]])
    return score


@app.route('/social_score')
def social_score():
    pesel = request.args.get('pesel')
    return pesel_to_score(pesel)




result = loaded_model.predict([[200,900,500,900]])
print(result)


if __name__ == '__model__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=4999)