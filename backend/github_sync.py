"""
GitHub sync: pulls public repos from Rayane's GitHub and writes structured
markdown files into corpus/projects/github_<repo>.md

Run manually or on a cron:
    python github_sync.py

Requires: pip install requests
No token needed for public repos (but add GITHUB_TOKEN env var to avoid rate limits).
"""

import os
import time
import requests
from pathlib import Path

GITHUB_USER = "rayaaneeee"
OUTPUT_DIR = Path(__file__).parent.parent / "corpus" / "projects"
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")

HEADERS = {"Accept": "application/vnd.github+json"}
if GITHUB_TOKEN:
    HEADERS["Authorization"] = f"Bearer {GITHUB_TOKEN}"


def get_repos() -> list[dict]:
    url = f"https://api.github.com/users/{GITHUB_USER}/repos"
    params = {"per_page": 100, "sort": "updated", "type": "public"}
    resp = requests.get(url, headers=HEADERS, params=params, timeout=15)
    resp.raise_for_status()
    return resp.json()


def get_readme(owner: str, repo: str) -> str:
    url = f"https://api.github.com/repos/{owner}/{repo}/readme"
    resp = requests.get(url, headers={**HEADERS, "Accept": "application/vnd.github.raw+json"}, timeout=15)
    if resp.status_code == 200:
        return resp.text[:6000]  # cap at 6k chars to avoid huge embeddings
    return ""


def write_repo_doc(repo: dict, readme: str):
    name = repo["name"]
    desc = repo.get("description") or ""
    lang = repo.get("language") or "Unknown"
    stars = repo.get("stargazers_count", 0)
    url = repo.get("html_url", "")
    topics = ", ".join(repo.get("topics", []))
    updated = repo.get("updated_at", "")[:10]

    content = f"""# GitHub Project: {name}

**Repository:** {url}
**Language:** {lang}
**Stars:** {stars}
**Topics:** {topics}
**Last updated:** {updated}
**Description:** {desc}

## README
{readme if readme else "_No README available._"}
"""

    out_path = OUTPUT_DIR / f"github_{name}.md"
    out_path.write_text(content, encoding="utf-8")
    print(f"  Written: {out_path.name}")


def sync():
    print(f"Syncing GitHub repos for @{GITHUB_USER}...")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    repos = get_repos()
    print(f"  Found {len(repos)} public repos")

    for repo in repos:
        name = repo["name"]
        if repo.get("fork"):
            print(f"  Skipping fork: {name}")
            continue
        readme = get_readme(GITHUB_USER, name)
        write_repo_doc(repo, readme)
        time.sleep(0.3)  # be polite to the API

    print(f"\nSync complete. {OUTPUT_DIR}")


if __name__ == "__main__":
    sync()
