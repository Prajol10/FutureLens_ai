import spacy
import re
import os

nlp = spacy.load("en_core_web_sm")

def load_resume(file_path):
    """Loads text from a resume file."""
    with open(file_path, "r") as file:
        return file.read()

def extract_email(text):
    match = re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)
    return match.group() if match else None

def extract_phone(text):
    match = re.search(r"\+?\d[\d\-]{8,15}", text)
    return match.group() if match else None

def extract_name(doc, text):
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    # fallback: take first line if no PERSON found
    first_line = text.strip().split("\n")[0]
    if len(first_line.split()) <= 4:
        return first_line
    return "Unknown"

def extract_skills(text, skill_keywords):
    skills_found = []
    for keyword in skill_keywords:
        if keyword.lower() in text.lower():
            skills_found.append(keyword)
    return list(set(skills_found))

def parse_resume(resume_path):
    text = load_resume(resume_path)
    doc = nlp(text)

    skill_keywords = [
        "Python", "JavaScript", "React", "Node.js", "MongoDB", "SQL", "Git",
        "Machine Learning", "Deep Learning", "Data Science", "Flask", "Django"
    ]

    return {
        "name": extract_name(doc, text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text, skill_keywords),
        "raw_text": text
    }

# Example run (for dev only)
if __name__ == "__main__":
    sample_path = os.path.join(os.path.dirname(__file__), "../resumes/resume.txt")
    result = parse_resume(sample_path)
    for key, value in result.items():
        print(f"{key}: {value}")