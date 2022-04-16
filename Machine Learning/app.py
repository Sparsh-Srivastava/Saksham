from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
import pickle
import nltk
import re
import tensorflow as tf
from tensorflow.keras.preprocessing.text import one_hot
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
import pandas as pd
vocab_size=10000
sentence_len=150

with open("NLP_model", "rb") as f:
  mp = pickle.load(f)

app = Flask(__name__)
CORS(app, support_credentials=True)

def classify_emotions(model,message):

    for sentences in message:
        sentences=nltk.sent_tokenize(message)
        
        for sentence in sentences:
            words=re.sub("[^a-zA-Z]"," ",sentence)
            
            if words not in set(stopwords.words('english')):
                word=nltk.word_tokenize(words)
                word=" ".join(word)
    
    oneHot=[one_hot(word,n=vocab_size)]
   
    text=pad_sequences(oneHot,maxlen=sentence_len,padding="pre")
    
    predict_classes=model.predict(text)
    
    y_pred=[np.argmax(label) for label in predict_classes]
    
    if y_pred==[0]:
        print("It describes joy")
        
    elif y_pred==[1]:   
        print("It describes sadness")
        
    elif y_pred==[2]:   
        print("It describes anger")
        
    elif y_pred==[3]:   
        print("It describes fear")
        
    elif y_pred==[4]:   
        print("It describes love")
        
    elif y_pred==[5]:   
        print("It describes surprise") 

@app.route("/", methods=["GET"])
def index_get():
    return render_template("base.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    payload = data['data']
    output = mp.classify_emotions(mp , payload)
    return(output)

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=7000)