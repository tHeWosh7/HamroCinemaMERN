# HamroCinemaMERN

HamroCinemaMERN is a full-stack MERN (MongoDB, Express, React, Node) application for browsing movies, selecting seats, and booking cinema tickets. It includes an admin panel for managing shows and bookings, a recommender system to suggest movies, and client-side integrations for payments (e.g., eSewa). The project is split into `client/` (React + Vite) and `server/` (Node + Express) directories.

**Key Features**
- Browse movies and view detailed information
- Movie trailers and featured sections
- Seat selection UI and real-time seat availability per show
- Booking flow with backend persistence
- Admin dashboard to add/list shows and view bookings
- Recommendation engine (Python script + API) to suggest movies
- Payment integration hooks (client assets include `esewa.js`)

**Tech Stack**
- Frontend: React (Vite), CSS, client-side components under `client/src`
- Backend: Node.js, Express, MongoDB
- Recommender: Python script (`server/recommender.py`) for offline/online recommendations
- Deployment targets: Vercel (client and server have `vercel.json`) or any Node hosting

**Repository Layout**
- [client](client): React app built with Vite. Key files:
  - [client/src/main.jsx](client/src/main.jsx) — app entry
  - [client/src/App.jsx](client/src/App.jsx) — top-level app
  - [client/src/components](client/src/components) — UI components and admin subcomponents
  - [client/src/Pages](client/src/Pages) — route pages (Home, Movies, MovieDetails, SeatLayout, MyBookings, Admin pages)
- [server](server): Express API and models
  - [server/server.js](server/server.js) — server entry
  - [server/configs/db.js](server/configs/db.js) — MongoDB connection
  - [server/models](server/models) — Mongoose models (`User.js`, `Movie.js`, `Show.js`, `Booking.js`)
  - [server/routes](server/routes) — API routes (`userRoutes.js`, `showRoutes.js`, `bookingRoutes.js`, `recommendRoutes.js`, `adminRoutes.js`)
  - [server/controllers](server/controllers) — controller logic
  - [server/recommender.py](server/recommender.py) — recommendation engine script

**API Overview (common endpoints)**
- `POST /api/users` — user registration/login (see `userRoutes.js`)
- `GET /api/shows` — list available shows (see `showRoutes.js`)
- `GET /api/shows/:id` — show details
- `POST /api/bookings` — create a booking (see `bookingRoutes.js`)
- `GET /api/bookings` — list bookings (auth required)
- `GET /api/recommend` — get recommended movies (see `recommendRoutes.js`)
- `POST /api/admin/*` — admin operations (see `adminRoutes.js`)

Refer to route files in `server/routes` for full details and request/response formats.

**Environment Variables**
Create `.env` files for client and server as needed.

Server (example `.env`):

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
STRIPE_SECRET=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

Client (example `.env` or Vite env):

VITE_API_URL=http://localhost:5000/api

**Local Development**
1. Install dependencies for both parts:

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

2. Start server and client (concurrently or in separate terminals):

```bash
# Terminal 1 - server
cd server
npm run dev # or: node server.js

# Terminal 2 - client
cd client
npm run dev
```

Open the client (Vite) URL typically at `http://localhost:5173` and the API at `http://localhost:5000` (adjust ports if configured differently).

**Recommendation Engine (Python)**
The repository includes `server/recommender.py` — a Python script for generating recommendations. To run or modify it, set up a Python environment and install typical data/ML libs (example):

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt # or: pip install pandas scikit-learn numpy
python recommender.py
```

If the recommender exposes an API (`recommendRoutes.js`), ensure the server process can call the script or that a microservice wraps the Python model.

**Admin**
Admin UI components live under `client/src/components/admin` and server admin routes are under `server/routes/adminRoutes.js`. Admin functionality includes creating and listing shows and viewing bookings.

**Payments**
Client-side assets include an `esewa.js` helper. Server has `stripeWebhooks.js` under `server/controllers` indicating Stripe webhook handling. Configure payment provider secrets in `.env` before testing payments.

**Deploying**
- Client: Deploy the `client/` build to Vercel or static hosting. Vite builds a static bundle.
- Server: Deploy `server/` to a Node host (Vercel Serverless Functions, Heroku, Render). Ensure env vars and MongoDB connection are configured.

**Development Tips**
- Seed data: If you add a seeder script, run it to populate initial movies/shows.
- CORS: If client and server run on different origins, ensure CORS is configured in `server/server.js`.
- Auth: Protect booking/admin endpoints with JWT middleware (`server/middleware/auth.js`).

**Contributing**
- Fork the repo, create feature branches, and open pull requests.
- Keep UI components small and reuse `client/src/components` patterns.
- Document API changes in this README and update route files.

**Troubleshooting**
- Mongo connection errors: confirm `MONGO_URI` and that Mongo is accessible.
- Frontend build issues: delete `node_modules` and reinstall if dependency mismatch occurs.

