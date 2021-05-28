import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pandas as pd
import numpy as np

def stream_collection_loop(collection, keys, cursor=None):
    limit = 100
    while True:
        docs = []  # Very important. This frees the memory incurred in the recursion algorithm.
        if cursor:
            docs = [snapshot for snapshot in
                    collection.limit(limit).start_after(cursor).stream()]
        else:
            docs = [snapshot for snapshot in collection.limit(limit).stream()]

        export_data_to_csv(docs, keys)

        if len(docs) == limit:
            cursor = docs[limit-1]
            continue

        break

def export_data_to_csv(docs, keys):
    content, length, username, timestamp = [], [], [], []

    for doc in docs:
        data = doc.to_dict()

        content.append(data[keys[0]])
        length.append(data[keys[1]])
        username.append(data[keys[2]])
        timestamp.append(data[keys[3]])

    df = pd.DataFrame(np.column_stack([content, length, username, timestamp]), columns=[keys[0], keys[1], keys[2], keys[3]])
    with open('output/data' + str(keys[0]) + '.csv', 'a') as f:
        df.to_csv('output/data' + str(keys[0]) + '.csv', mode='a', header=f.tell()==0, index=False)

if __name__ == "__main__":
    cred = credentials.Certificate('key.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    for coll in [
        ("discord-message", ["content", "length", "timestamp", "username"]), 
        ("discord-voice", ["event", "event", "timestamp", "username"]), 
        ("discord-game", ["game", "game", "timestamp", "username"]), 
        ("discord-status", ["status", "status", "timestamp", "username"])
    ]:
        songs = db.collection(coll[0])

        stream_collection_loop(songs, coll[1])
    