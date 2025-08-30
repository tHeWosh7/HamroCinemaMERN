// server/controllers/recommendController.js
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.auth();
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const pythonPath = path.join(__dirname, "../../ml/recommender.py");

    exec(`python3 ${pythonPath} ${userId}`, (error, stdout, stderr) => {
      if (error) {
        console.error("Python error:", stderr);
        return res.status(500).json({ success: false, message: "Python script failed" });
      }

      try {
        const result = JSON.parse(stdout);
        res.json({ success: true, recommendations: result.recommendations });
      } catch (err) {
        console.error("JSON parse error:", err);
        res.status(500).json({ success: false, message: "Invalid Python output" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
