// server/routes/recommendRoutes.js
import express from "express";
import { getRecommendations } from "../controllers/recommendController.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

// User must be authenticated
router.get("/", requireAuth(), getRecommendations);

export default router;
