import express from "express";
import { addShow, getNowPlayingMovies } from "../controllers/showController.js";

const showRouter = express.Router();

showRouter.get('/now_playing', getNowPlayingMovies);
showRouter.post('/add', addShow)

export default showRouter;