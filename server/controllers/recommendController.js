import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getRecommendations = async (req, res) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const pythonPath = path.join(__dirname, "../../ml/recommender.py");
    const pythonExecutable = "/Users/thewosh/Desktop/HamroCinema/.venv/bin/python"; // venv Python

    const pythonProcess = spawn(pythonExecutable, [pythonPath, userId]);

    let output = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => (output += data.toString()));
    pythonProcess.stderr.on("data", (data) => (errorOutput += data.toString()));

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error("Python error:", errorOutput);
        return res.status(500).json({ success: false, message: "Python script failed" });
      }
      try {
        const recommendations = JSON.parse(output);
        res.json({ success: true, recommendations });
      } catch (err) {
        console.error("JSON parse error:", err, "Output:", output);
        res.status(500).json({ success: false, message: "Invalid Python output" });
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
