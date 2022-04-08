
from bson import json_util
import json
import pymongo
from flask import Flask
from flask import request
app = Flask(__name__)

client = pymongo.MongoClient(
    "mongodb+srv://bob123:bob123@devsoc.i73yb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client['myFirstDatabase']
collection = db['profiles']


# @app.route("/", methods=['POST'])
# def insert_document():
#     req_data = request.get_json()
#     collection.insert_one(req_data).inserted_id
#     return ('', 204)


@app.route('/flask')
def get():
    documents = collection.find({})
    response = []
    for document in documents:
        # document['company'] = str(document['company'])
        response.append(document)

    # Here response is available in the form of list

    response = json_util.dumps(response)
    # Here response is available in the form of string
    return response


if __name__ == '__main__':
    app.run(port=8000, debug=True)
