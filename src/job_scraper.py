import requests
import json
import os

def scrape_remoteok_jobs():
    url = "https://remoteok.com/api"
    headers = {"User-Agent": "Mozilla/5.0"}

    response = requests.get(url, headers=headers)
    jobs_data = response.json()

    jobs = []

    for job in jobs_data[1:]:  # Skip the metadata header row
        title = job.get("position") or job.get("title")
        company = job.get("company") or "Unknown"
        tags = job.get("tags", [])
        if title and tags:
            jobs.append({
                "title": title.strip(),
                "company": company.strip(),
                "description": " ".join(tags)
            })

    return jobs

def save_jobs_to_json(jobs, filename="data/jobs.json"):
    os.makedirs("data", exist_ok=True)
    with open(filename, "w") as f:
        json.dump(jobs, f, indent=2)
    print(f"✅ Saved {len(jobs)} jobs to {filename}")

if __name__ == "__main__":
    jobs = scrape_remoteok_jobs()
    save_jobs_to_json(jobs)