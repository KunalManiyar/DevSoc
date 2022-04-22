from bson import json_util
import json
import sys
import requests
import pymongo
from flask import Flask
from flask import request
import numpy as np
import pandas as pd
import nltk
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords


app = Flask(__name__)

client = pymongo.MongoClient(
    "mongodb+srv://bob123:bob123@devsoc.i73yb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client['myFirstDatabase']
collection = db['profiles']
userId = None

# @app.route("/", methods=['POST'])
# def insert_document():
#     req_data = request.get_json()
#     collection.insert_one(req_data).inserted_id
#     return ('', 204)


@app.route('/test/<string:userProfileId>', methods=["POST"])
def test(userProfileId):
    global userId
    print("Hello")
    userId = json.loads(userProfileId)
    print(type(userId))
    print(userId)
    return json_util.dumps(userProfileId)


@app.route('/flask')
def get():
    global userId

    documents = collection.find({})
    response = []
    for document in documents:
        # document['company'] = str(document['company'])
        response.append(document)

    # Here response is available in the form of list
    # print(type(json.loads(json_util.dumps(response))[0]['user']['$oid']))

    id2 = []
    cosine = []
    df = pd.DataFrame()
    dict = {}

    def listToString(s):

        # initialize an empty string
        str1 = " "

        # return string
        return (str1.join(s))

    def model(data):
        global id2
        id2 = []
        skills = []
        experience = []
        education = []

        # print(type(json.loads(response)[0]['user']['$oid']))
        for i in data:
            # i['user'] = json.loads(response)[0]['user']['$oid']
            # print(i)
            # print(json.loads(json_util.dumps(i))
            #       ['user']['$oid'])

            id2.append(json.loads(json_util.dumps(i))
                       ['_id']['$oid'])

            skills.append(listToString(i["skills"]))
            # print(i["experience"])
            if(i["experience"]):
                experience.append(listToString(i["experience"][0]["title"]))
            else:
                experience.append(" ")
            education.append(listToString(i["education"]))
        # print(education)

        global dict
        dict = {"id2": id2, "skills": skills,
                "experience": experience, "education": education}
        # global df
        df = pd.DataFrame(dict)
        df['SkillString'] = df['skills'].str.replace(',', '')
        df['ExperienceString'] = df['experience'].str.replace(',', '')
        df["combined_text"] = df["SkillString"] + " " + \
            df["ExperienceString"] + " " + \
            df["education"] + " " + df["SkillString"]
        tf = TfidfVectorizer(analyzer="word", ngram_range=(
            1, 2), min_df=0, stop_words='english')

        #tfidf_matrix = tf.fit_transform(df['combined_text'])
        tfidf_matrix = tf.fit_transform(df['combined_text'].values.astype('U'))
        global cosine
        cosine = cosine_similarity(tfidf_matrix, tfidf_matrix)

    def get_recommendations(id1):
        # id1 = str()
        global id2
        global cosine
        global dict
        # print(dict)
        df = pd.DataFrame(dict)
        final = []
        index = id2.index(id1)
        # print(index)
        similar_Devs = list(enumerate(cosine[index]))
        sortedDevs = sorted(similar_Devs, key=lambda x: x[1], reverse=True)
        for i in range(len(sortedDevs)):
            if(sortedDevs[i][0] == index):
                del sortedDevs[i]
                break
        for i in range(len(sortedDevs)):
            final.append(df.iloc[[sortedDevs[i][0]]].values.tolist()[
                         0][0])
        return final

    model(response)

    # print(response)
    response = get_recommendations(userId)
    # print(response)
    response = json_util.dumps(response)
    # Here response is available in the form of string

    return response


if __name__ == '__main__':
    app.run(port=8000, debug=True)
