import sys
import json
from pymongo import MongoClient
from bson import ObjectId

# Get user ID from command line
if len(sys.argv) < 2:
    print(json.dumps([]))
    sys.exit()

user_id = sys.argv[1]

# Connect to MongoDB
client = MongoClient("mongodb+srv://sjr:root@cluster0.27wr17q.mongodb.net/")
db = client["HamroCinemaMERN"]

bookings = db["bookings"]
movies = db["movies"]
shows = db["shows"]

# Step 1: Get all booked shows for the user
user_bookings = list(bookings.find({"user": user_id}))

# Step 2: Map booked shows to their movie IDs
watched_movie_ids = []
for b in user_bookings:
    try:
        show = shows.find_one({"_id": ObjectId(b["show"])})
        if show and "movie" in show:
            watched_movie_ids.append(ObjectId(show["movie"]))
    except Exception as e:
        continue  # skip invalid ObjectId

# Step 3: Build user genre preference
user_genres = {}
for movie in movies.find({"_id": {"$in": watched_movie_ids}}):
    for genre in movie.get("genres", []):
        name = genre.get("name")
        if name:
            user_genres[name] = user_genres.get(name, 0) + 1

# Step 4: Score candidate movies (exclude watched)
recommendations = []
for movie in movies.find({"_id": {"$nin": watched_movie_ids}}):
    score = 0
    for genre in movie.get("genres", []):
        name = genre.get("name")
        if name:
            score += user_genres.get(name, 0)
    score *= movie.get("vote_average", 0)
    if score > 0:
        recommendations.append((score, movie["title"]))

# Step 5: Sort descending and take top 5
recommendations.sort(reverse=True)
top_movies = [title for _, title in recommendations[:5]]

print(json.dumps(top_movies))
