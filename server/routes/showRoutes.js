import express from "express";
import { addShow, getNowPlayingMovies, getShow, getShows } from "../controllers/showController.js";
import { protectAdmin } from "../middleware/auth.js";

const showRouter = express.Router();

// showRouter.get('/now_playing', protectAdmin , getNowPlayingMovies);
// showRouter.post('/add', protectAdmin, addShow)
// showRouter.get("/all", getShows)
// showRouter.get("/:movieID", getShow)

showRouter.get('/now_playing', getNowPlayingMovies);
showRouter.post('/add', addShow)
showRouter.get("/all", getShows)
showRouter.get("/:movieID", getShow)

export default showRouter;