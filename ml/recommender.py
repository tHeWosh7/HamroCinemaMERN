#ml/recommender.py
import sys, json, os, pymongo
from sklearn.neighbors import NearestNeighbors
import numpy as np

#Connect to MongoDB (same as server/configs/db.js)
client = pymongo.MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017/"))
db = client["HamroCinemaMERN"]

# Get userId from Node.js argument
if len(sys.argv) < 2:
    print(json.dumps({"recommendations": []}))
    exit()
user_id = sys.argv[1]

#Fetch booking history for this user (assuming Booking schema stores userId + movieId)
bookings = list(db.bookings.find({"userId": user_id}, {"_id": 0, "movieId": 1}))

if not bookings:
    print(json.dumps({"recommendations": []}))
    exit()

#Fetch movie details (we’ll use genres for similarity)
movie_ids = [b["movieId"] for b in bookings]
movies = list(db.movies.find({"_id": {"$in": movie_ids}}, {"_id": 1, "title": 1, "genre": 1}))

if not movies:
    print(json.dumps({"recommendations": []}))
    exit()

#Convert genres to numeric feature (simple example: hash genre)
X = np.array([[hash(m["genre"]) % 1000] for m in movies])

# Fit KNN model
model = NearestNeighbors(n_neighbors=min(3, len(X)), algorithm="auto")
model.fit(X)

#Take last watched movie
last_movie = movies[-1]
last_feature = [[hash(last_movie["genre"]) % 1000]]
_, indices = model.kneighbors(last_feature)

#Collect recommended movies
recs = [movies[i]["title"] for i in indices[0]]

print(json.dumps({"recommendations": recs}))
