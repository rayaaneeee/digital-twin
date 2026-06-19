'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const PROJECTS = [
  {
    id: 'dermai',
    name: 'DermAI',
    emoji: '🔬',
    tagline: 'Medical AI · AUC-ROC 0.9630',
    description: 'Production skin lesion classifier with Grad-CAM explainability, temperature calibration (ECE 0.030), and MC Dropout uncertainty quantification. EfficientNet-B0 on ISIC 2019 — 7 classes, 22K images, Apple M3 Max.',
    tech: ['PyTorch', 'EfficientNet-B0', 'Grad-CAM', 'FastAPI', 'Docker', 'HuggingFace'],
    metrics: [{ label: 'AUC-ROC', value: '0.963' }, { label: 'ECE', value: '0.030' }, { label: 'Images', value: '22K' }],
    link: 'https://huggingface.co/spaces/rytaaaaaaa/dermai',
    color: '#FF4FA2',
    featured: true,
  },
  {
    id: 'phishing',
    name: 'Phishing Shield',
    emoji: '🛡️',
    tagline: 'AI · Cybersecurity · Chrome Extension',
    description: 'Chrome Manifest V3 extension with 11 security layers for Gmail phishing detection. Gemini API for AI content analysis + DMARC/DKIM email authentication verification.',
    tech: ['JavaScript', 'Chrome APIs', 'Gemini API', 'DMARC/DKIM'],
    metrics: [{ label: 'Layers', value: '11' }, { label: 'Platform', value: 'MV3' }],
    color: '#B76E79',
  },
  {
    id: 'dns',
    name: 'DNS Tunneling Detector',
    emoji: '🌐',
    tagline: 'ML · Network Security · 250K dataset',
    description: 'ML pipeline classifying DNS traffic as tunneling or legitimate on a 250,000-record dataset. Random Forest, XGBoost, Logistic Regression evaluated with ROC curves and feature-importance analysis.',
    tech: ['Python', 'Random Forest', 'XGBoost', 'Scikit-learn'],
    metrics: [{ label: 'F1 Score', value: '0.975' }, { label: 'Dataset', value: '250K' }, { label: 'Models', value: '3' }],
    color: '#FF85C2',
  },
  {
    id: 'timeseries',
    name: 'Multivariate Time Series Forecasting',
    emoji: '📈',
    tagline: 'Kaggle Challenge · Time Series · 0.96 Accuracy',
    description: 'Built and tuned forecasting and classification models for a competitive Kaggle time series challenge. Achieved 0.96 accuracy through careful feature engineering and model selection.',
    tech: ['Python', 'Time Series Analysis', 'Scikit-learn', 'Pandas'],
    metrics: [{ label: 'Accuracy', value: '0.96' }, { label: 'Platform', value: 'Kaggle' }],
    color: '#FF4FA2',
  },
  {
    id: 'drone',
    name: 'Multi-Drone Router',
    emoji: '🚁',
    tagline: 'Optimization · Metaheuristics',
    description: 'End-to-end multi-drone delivery system optimizing routes, speeds, and altitudes. Compared MILP vs Ant Colony, Genetic Algorithms, and Simulated Annealing — SA won.',
    tech: ['Python', 'MILP', 'ACO', 'Genetic Algorithms', 'Simulated Annealing'],
    metrics: [{ label: 'Algorithms', value: '4' }, { label: 'Winner', value: 'SA' }],
    color: '#FF4FA2',
  },
  {
    id: 'darnameals',
    name: 'DarnaMeals',
    emoji: '🍽️',
    tagline: 'Full-Stack Mobile · Flutter',
    description: 'Marketplace connecting home cooks with local customers. Cooks publish their menu, customers browse and order. Real-time sync with Supabase + Firebase Firestore.',
    tech: ['Flutter', 'Supabase', 'Firebase', 'Dart'],
    metrics: [{ label: 'Platform', value: 'Mobile' }],
    color: '#B76E79',
  },
  {
    id: 'ocr',
    name: 'OCR Data Pipeline',
    emoji: '📄',
    tagline: 'NLP · Data Engineering · 12K records',
    description: 'End-to-end platform extracting structured B2B data from 12,000+ exhibitor records using Google Cloud Vision + Claude AI for NLP parsing. Built as team lead at Temacina.',
    tech: ['Google Cloud Vision', 'Claude API', 'Transformers', 'Django', 'Vue.js'],
    metrics: [{ label: 'Records', value: '12K+' }, { label: 'Team', value: '5 people' }],
    link: 'https://github.com/rayaaneeee/temacina-project',
    color: '#FF85C2',
  },
  {
    id: 'dentist',
    name: 'Dentist Management System',
    emoji: '🦷',
    tagline: 'Full-Stack · Clinic Operations',
    description: 'Web application for managing clinic operations, including patients, appointments, and records. Streamlines scheduling and patient data management for dental practices.',
    tech: ['React'],
    metrics: [{ label: 'Type', value: 'Web App' }],
    color: '#FF4FA2',
  },
  {
    id: 'pain-prediction',
    name: 'Pain Location & Severity Prediction',
    emoji: '🧠',
    tagline: 'ML · Healthcare · Classification & Regression',
    description: 'Collected a behavioral dataset and trained and compared multiple ML models to predict pain location and severity. Evaluated classifiers and regressors to find the best-performing approach.',
    tech: ['Python', 'Scikit-learn', 'Classification', 'Regression'],
    metrics: [{ label: 'Task', value: 'Dual' }, { label: 'Type', value: 'ML' }],
    color: '#FF85C2',
  },
  {
    id: 'frontend-portfolio',
    name: 'Front-End Website Portfolio',
    emoji: '🎨',
    tagline: 'UI/UX · 14 Websites',
    description: 'Designed and built 14 additional front-end websites covering responsive layouts, UI components, and interactive features — demonstrating versatility across different design systems.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    metrics: [{ label: 'Sites', value: '14' }],
    color: '#B76E79',
  },
]

export function ProjectsPanel() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="h-full overflow-y-auto px-2">
      <h2 className="font-display text-3xl font-light text-[#2D1B2E] mb-1">
        Projects
      </h2>
      <p className="text-sm text-[#B76E79] mb-6">14+ builds across AI, security, and web</p>

      <div className="grid grid-cols-1 gap-4">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            onHoverStart={() => setHovered(project.id)}
            onHoverEnd={() => setHovered(null)}
            className="relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
            style={{
              background: hovered === project.id
                ? `linear-gradient(135deg, rgba(255,255,255,0.9), ${project.color}15)`
                : 'rgba(255,255,255,0.6)',
              border: `1px solid ${hovered === project.id ? project.color + '50' : 'rgba(255,79,162,0.12)'}`,
              boxShadow: hovered === project.id
                ? `0 8px 32px ${project.color}25`
                : '0 2px 12px rgba(255,79,162,0.08)',
            }}
          >
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0 mt-0.5">{project.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#2D1B2E]">{project.name}</h3>
                    {project.featured && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: `${project.color}20`, color: project.color }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#B76E79] mb-2">{project.tagline}</p>

                  <motion.div
                    initial={false}
                    animate={{ height: hovered === project.id ? 'auto' : 0, opacity: hovered === project.id ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-[#4A3040] mb-3 leading-relaxed">{project.description}</p>

                    {/* Metrics */}
                    <div className="flex gap-3 mb-3">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <p className="text-base font-bold" style={{ color: project.color }}>{m.value}</p>
                          <p className="text-[10px] text-[#B76E79]">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tech.slice(0, hovered === project.id ? undefined : 3).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/80 text-[#4A3040] border border-[#FF4FA2]/15">
                        {t}
                      </span>
                    ))}
                    {hovered !== project.id && project.tech.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/80 text-[#B76E79]">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover="true"
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                    style={{ background: project.color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
