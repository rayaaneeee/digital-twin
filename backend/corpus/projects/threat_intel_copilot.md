# Threat Intelligence RAG Copilot — Rayane's Project
# مشروع مساعد استخبارات التهديدات بتقنية RAG
# Projet copilote de threat intelligence avec RAG

GitHub: https://github.com/rayaaneeee/threat-intelligence-copilot
Live Demo: https://rytaaaaaaa-threat-intelligence-copilot.hf.space

## What it does — ما يفعله — Ce que ça fait
A real-time AI-powered threat intelligence assistant (copilote d'intelligence sur les menaces / مساعد استخباراتي للتهديدات).
It ingests data from 4 live security databases and lets you query them in natural language.
Answers questions like "what CVEs are being actively exploited right now?", analyzes tech stacks for vulnerabilities, and maps weaknesses to attacker techniques.

## Data Sources — مصادر البيانات — Sources de données
- NVD (NIST): 7,700+ CVEs from the last 30 days with CVSS scores
- MITRE ATT&CK: 697 adversary techniques and tactics (STIX 2.0)
- CISA KEV: 1,627 actively exploited vulnerabilities
- EPSS: Exploit prediction probability scores for every CVE

## Features — الميزات — Fonctionnalités
1. Analyst Chat: Ask any threat intel question in natural language. Retrieves CVEs, enriches with EPSS/KEV data, chains to ATT&CK techniques via CWE mappings, streams ranked answer via Groq.
2. Stack Analyzer: Paste your tech stack (e.g. nginx 1.18, Python 3.9, Django 4.0). An agentic tool-use loop searches the knowledge base, calls tools autonomously, produces prioritized vulnerability report.
3. Dashboard: Live charts — severity donut, CVE publication timeline, top 10 EPSS scores, ATT&CK tactic coverage, CWE classes, KEV monthly additions.

## Architecture — البنية المعمارية — Architecture
- Frontend: Vue 3 + Vite + ApexCharts (cyberpunk neon UI, SSE streaming)
- Backend: FastAPI + SSE streaming
- RAG Engine: ChromaDB + sentence-transformers/all-MiniLM-L6-v2
- Agent Loop: Groq tool-use with llama-3.3-70b-versatile
- Knowledge Graph: SQLite with CVE→CWE→ATT&CK technique chains
- Charts: SQLite queries → ApexCharts
- Deployment: Docker (HuggingFace Spaces)

## Tech Stack — التقنيات المستخدمة
LLM: Groq llama-3.3-70b-versatile
Embeddings: sentence-transformers/all-MiniLM-L6-v2
Vector DB: ChromaDB (persistent)
Knowledge Graph: SQLite (CVE→CWE→ATT&CK mappings)
Backend: FastAPI + SSE
Frontend: Vue 3 + Vite + ApexCharts
Deployment: Docker on HuggingFace Spaces
