import { spawn } from "child_process";

export const getRecommendations = async (req, res) => {
  try {
    // Just run Python script without userId
    const process = spawn("python3", ["recommend.py"]);

    let data = "";
    let error = "";

    process.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    process.stderr.on("data", (err) => {
      error += err.toString();
    });

    process.on("close", (code) => {
      if (code !== 0 || error) {
        return res.status(500).json({ error: error || "Python error" });
      }
      try {
        const recs = JSON.parse(data);
        return res.json({ recommendations: recs });
      } catch (e) {
        return res.status(500).json({ error: "Failed to parse Python output" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
