import sys
import json
from pymongo import MongoClient
from bson import ObjectId

# Connect to MongoDB
client = MongoClient("mongodb+srv://sjr:root@cluster0.27wr17q.mongodb.net/")
db = client["HamroCinemaMERN"]

bookings = db["bookings"]
movies = db["movies"]
shows = db["shows"]

# Step 1: Get all booked shows across all users
all_bookings = list(bookings.find({}))

# Step 2: Map booked shows -> movies
watched_movie_ids = []
for b in all_bookings:
    try:
        show = shows.find_one({"_id": ObjectId(b["show"])})
        if show and "movie" in show:
            watched_movie_ids.append(ObjectId(show["movie"]))
    except Exception:
        continue

# Step 3: Count popularity of each movie
movie_counts = {}
for m_id in watched_movie_ids:
    movie_counts[m_id] = movie_counts.get(m_id, 0) + 1

# Step 4: Score movies based on popularity * rating
recommendations = []
for m_id, count in movie_counts.items():
    movie = movies.find_one({"_id": m_id})
    if movie:
        score = count * movie.get("vote_average", 0)
        recommendations.append((score, movie["title"]))

# Step 5: Sort and take top 5
recommendations.sort(reverse=True)
top_movies = [title for _, title in recommendations[:5]]

print(json.dumps(top_movies))
