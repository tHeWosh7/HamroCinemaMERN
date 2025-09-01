import express from "express";
import { getRecommendations } from "../controllers/recommendController.js";

const router = express.Router();

// GET /api/recommend/:userId
router.get("/", getRecommendations);

export default router;
