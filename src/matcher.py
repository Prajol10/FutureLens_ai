import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from resume_parser import parse_resume  # Reuse your existing parser

def load_scraped_jobs():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    filepath = os.path.join(current_dir, "../data/jobs.json")
    with open(filepath, "r") as f:
        return json.load(f)

def match_resume_to_jobs(resume_text, jobs):
    job_texts = [job["description"] for job in jobs]
    titles = [f"{job['title']} @ {job['company']}" for job in jobs]

    texts = [resume_text] + job_texts
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(texts)

    similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()
    ranked = sorted(zip(titles, similarities), key=lambda x: x[1], reverse=True)
    return ranked

if __name__ == "__main__":
    resume_path = os.path.join(os.path.dirname(__file__), "../resumes/resume.txt")
    parsed = parse_resume(resume_path)
    resume_text = " ".join(parsed["skills"])

    jobs = load_scraped_jobs()
    results = match_resume_to_jobs(resume_text, jobs)

    print("\n🔍 Best Matching Jobs:")
    for title, score in results[:10]:  # top 10 matches
        print(f"{title}: {round(score * 100, 2)}% match")