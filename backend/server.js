const express = require("express");
const cors = require("cors");
const app = express();
const port = 5050;

app.use(cors());

// Load static data
const resume = require("./data/resume.json");
const jobs = require("./data/jobs.json");

app.get("/api/resume", (req, res) => {
  res.json(resume);
});

app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

app.listen(port, () => {
  console.log(`🚀 Backend API running at http://localhost:${port}`);
});