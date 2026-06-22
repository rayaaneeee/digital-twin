'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from '@/contexts/LanguageContext'

const PROJECTS = [
  {
    id: 'dermai',
    name: 'DermAI',
    emoji: '🔬',
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
    tech: ['JavaScript', 'Chrome APIs', 'Gemini API', 'DMARC/DKIM'],
    metrics: [{ label: 'Layers', value: '11' }, { label: 'Platform', value: 'MV3' }],
    color: '#B76E79',
  },
  {
    id: 'dns',
    name: 'DNS Tunneling Detector',
    emoji: '🌐',
    tech: ['Python', 'Random Forest', 'XGBoost', 'Scikit-learn'],
    metrics: [{ label: 'F1 Score', value: '0.975' }, { label: 'Dataset', value: '250K' }, { label: 'Models', value: '3' }],
    color: '#FF85C2',
  },
  {
    id: 'timeseries',
    name: 'Multivariate Time Series Forecasting',
    emoji: '📈',
    tech: ['Python', 'Time Series Analysis', 'Scikit-learn', 'Pandas'],
    metrics: [{ label: 'Accuracy', value: '0.96' }, { label: 'Platform', value: 'Kaggle' }],
    color: '#FF4FA2',
  },
  {
    id: 'drone',
    name: 'Multi-Drone Router',
    emoji: '🚁',
    tech: ['Python', 'MILP', 'ACO', 'Genetic Algorithms', 'Simulated Annealing'],
    metrics: [{ label: 'Algorithms', value: '4' }, { label: 'Winner', value: 'SA' }],
    color: '#FF4FA2',
  },
  {
    id: 'darnameals',
    name: 'DarnaMeals',
    emoji: '🍽️',
    tech: ['Flutter', 'Supabase', 'Firebase', 'Dart'],
    metrics: [{ label: 'Platform', value: 'Mobile' }],
    color: '#B76E79',
  },
  {
    id: 'ocr',
    name: 'OCR Data Pipeline',
    emoji: '📄',
    tech: ['Google Cloud Vision', 'Claude API', 'Transformers', 'Django', 'Vue.js'],
    metrics: [{ label: 'Records', value: '12K+' }, { label: 'Team', value: '5 people' }],
    link: 'https://github.com/rayaaneeee/temacina-project',
    color: '#FF85C2',
  },
  {
    id: 'dentist',
    name: 'Dentist Management System',
    emoji: '🦷',
    tech: ['React'],
    metrics: [{ label: 'Type', value: 'Web App' }],
    color: '#FF4FA2',
  },
  {
    id: 'pain-prediction',
    name: 'Pain Location & Severity Prediction',
    emoji: '🧠',
    tech: ['Python', 'Scikit-learn', 'Classification', 'Regression'],
    metrics: [{ label: 'Task', value: 'Dual' }, { label: 'Type', value: 'ML' }],
    color: '#FF85C2',
  },
  {
    id: 'frontend-portfolio',
    name: 'Front-End Website Portfolio',
    emoji: '🎨',
    tech: ['HTML', 'CSS', 'JavaScript'],
    metrics: [{ label: 'Sites', value: '14' }],
    color: '#B76E79',
  },
]

export function ProjectsPanel() {
  const [hovered, setHovered] = useState<string | null>(null)
  const { t } = useTranslation()
  const descriptions = t.projectDescriptions as string[]
  const taglines = t.projectTaglines as string[]

  return (
    <div className="h-full overflow-y-auto px-2">
      <h2 className="font-display text-3xl font-light text-[#2D1B2E] mb-1">
        {t.projectsTitle}
      </h2>
      <p className="text-sm text-[#B76E79] mb-6">{t.projectsSub}</p>

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
                        {t.projectFeatured}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#B76E79] mb-2">{taglines[i]}</p>

                  <motion.div
                    initial={false}
                    animate={{ height: hovered === project.id ? 'auto' : 0, opacity: hovered === project.id ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-[#4A3040] mb-3 leading-relaxed">{descriptions[i]}</p>

                    <div className="flex gap-3 mb-3">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <p className="text-base font-bold" style={{ color: project.color }}>{m.value}</p>
                          <p className="text-[10px] text-[#B76E79]">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tech.slice(0, hovered === project.id ? undefined : 3).map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-white/80 text-[#4A3040] border border-[#FF4FA2]/15">
                        {tech}
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
