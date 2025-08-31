import express from "express";
import { getRecommendations } from "../controllers/recommendController.js";
import { protectAdmin } from "../middleware/auth.js"; 

const router = express.Router();


router.get("/", getRecommendations);



export default router;
