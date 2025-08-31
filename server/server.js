import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions, esewaRoutes } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";

const app = express();
const port = 3000;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Root test route
app.get("/", (req, res) => res.send("Server is Live!!"));

// Inngest webhook routes
app.use("/api/inngest", serve({ client: inngest, functions }));

// eSewa payment routes
esewaRoutes(app);

// API Routes
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/recommend", recommendRoutes);

// Optional test file route
app.get("/test-html", (req, res) => {
  res.sendFile(new URL("../client/src/assets/test.html", import.meta.url).pathname);
});

// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
