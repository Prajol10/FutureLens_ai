import { useEffect, useState } from "react";
import { fetchResume, fetchJobs } from "./api/api";
import "./App.css";

function App() {
  const [resume, setResume] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const resumeData = await fetchResume();
        console.log("Resume data fetched:", resumeData);
        setResume(resumeData);
  
        const jobData = await fetchJobs();
        console.log("Jobs data fetched:", jobData);
        setJobs(jobData);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    }
    loadData();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>📄 Resume Info</h1>
      {resume ? (
        <div>
          <p><strong>Name:</strong> {resume.name}</p>
          <p><strong>Email:</strong> {resume.email}</p>
          <p><strong>Phone:</strong> {resume.phone}</p>
          <p><strong>Skills:</strong> {resume.skills.join(", ")}</p>
        </div>
      ) : (
        <p>Loading resume...</p>
      )}

      <h2 style={{ marginTop: "2rem" }}>🔥 Matching Jobs</h2>
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job, i) => (
            <li key={i} style={{ marginBottom: "1rem" }}>
              <strong>{job.title}</strong> @ {job.company}<br />
              Match Score: <strong>{Math.round(job.match * 100)}%</strong>
            </li>
          ))
        ) : (
          <p>Loading jobs...</p>
        )}
      </ul>
    </div>
  );
}

export default App;