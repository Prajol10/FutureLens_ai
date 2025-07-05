const BASE_URL = "http://localhost:5050/api";

export async function fetchResume() {
  const res = await fetch(`${BASE_URL}/resume`);
  return res.json();
}

export async function fetchJobs() {
  const res = await fetch(`${BASE_URL}/jobs`);
  return res.json();
}