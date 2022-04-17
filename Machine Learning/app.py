from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
import pickle
from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features=2000)

with open("nlp_model", "rb") as f:
  mp = pickle.load(f)

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/", methods=["GET"])
def index_get():
    return render_template("base.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    payload = [data['data']]
    data_f = cv.fit_transform(payload).toarray()
    data_f.resize(2000)
    output = mp.predict([data_f])
    return(output[0])

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=7000)

#This is working now