const multer = require("multer");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5050;

app.use(cors());

const upload = multer({ dest: "uploads/" });

// Load static data
const resume = require("./data/resume.json");
const jobs = require("./data/jobs.json");

app.get("/api/resume", (req, res) => {
  res.json(resume);
});

app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

app.post("/api/upload", upload.single("resume"), (req, res) => {
  const path = req.file.path;
  const text = fs.readFileSync(path, "utf8");

  // Dummy resume parser (replace with real logic)
  const parsed = {
    name: "Prajol Ghimire",
    email: "prajol@example.com",
    phone: "+977-9841234567",
    skills: ["Python", "React", "Node.js", "MongoDB", "Machine Learning"]
  };

  fs.unlinkSync(path); // delete uploaded file
  res.json(parsed);
});

app.listen(port, () => {
  console.log(`🚀 Backend API running at http://localhost:${port}`);
});