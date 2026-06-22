'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from '@/contexts/LanguageContext'

const SKILL_GROUPS = [
  {
    category: 'AI & ML',
    icon: '🧠',
    color: '#FF4FA2',
    skills: [
      { name: 'Python', level: 98 },
      { name: 'Deep Learning & Neural Nets', level: 90 },
      { name: 'NLP', level: 87 },
      { name: 'LLM Fine-Tuning', level: 85 },
      { name: 'Prompt Engineering', level: 92 },
      { name: 'Classification & Regression', level: 90 },
      { name: 'Clustering & Anomaly Detection', level: 85 },
      { name: 'Time Series Forecasting', level: 80 },
    ],
    tags: ['Scikit-learn', 'XGBoost', 'PyTorch', 'Pandas', 'NumPy', 'HuggingFace Transformers', 'mlxtend', 'PyOD', 'Matplotlib', 'Seaborn'],
  },
  {
    category: 'Web & Mobile',
    icon: '⚡',
    color: '#B76E79',
    skills: [
      { name: 'React', level: 88 },
      { name: 'FastAPI', level: 90 },
      { name: 'Django', level: 85 },
      { name: 'Vue.js', level: 82 },
      { name: 'Node.js', level: 78 },
      { name: 'Flutter', level: 80 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'PHP / AJAX', level: 78 },
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Flask', 'Firebase', 'Supabase', 'GraphQL', 'REST APIs'],
  },
  {
    category: 'Data & DBs',
    icon: '📊',
    color: '#FF85C2',
    skills: [
      { name: 'SQL / PL-SQL (Oracle)', level: 90 },
      { name: 'Data Warehouse Design', level: 82 },
      { name: 'ETL Pipelines', level: 82 },
      { name: 'MongoDB / MapReduce', level: 80 },
      { name: 'Power BI', level: 78 },
      { name: 'Tableau', level: 75 },
      { name: 'OCR (Google Cloud Vision)', level: 85 },
    ],
    tags: ['OLTP/OLAP', 'Star/Snowflake Schema', 'Indexing', 'Partitioning', 'Materialized Views', 'JSON', 'NoSQL'],
  },
  {
    category: 'Cybersecurity',
    icon: '🔒',
    color: '#FF4FA2',
    skills: [
      { name: 'Network Security', level: 82 },
      { name: 'Phishing Detection', level: 88 },
      { name: 'DNS Traffic Analysis', level: 84 },
      { name: 'Chrome Extension Dev', level: 85 },
      { name: 'Email Auth (DMARC/DKIM)', level: 80 },
      { name: 'Wireshark', level: 76 },
    ],
    tags: ['Kali Linux', 'Debian', 'JavaScript', 'Manifest V3', 'Gemini API'],
  },
  {
    category: 'Engineering',
    icon: '🛠️',
    color: '#B76E79',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Docker', level: 86 },
      { name: 'Linux (Kali/Debian/Ubuntu)', level: 88 },
      { name: 'Microservices Architecture', level: 80 },
      { name: 'System Design', level: 82 },
      { name: 'Metaheuristics (SA, ACO, GA)', level: 85 },
      { name: 'MILP / Operations Research', level: 80 },
    ],
    tags: ['Design Patterns', 'TDD', 'Unit Testing', 'Google Cloud', 'Postman', 'Arduino', 'Raspberry Pi', 'XAMPP', 'Agile/Scrum'],
  },
]

export function SkillsPanel() {
  const [active, setActive] = useState(0)
  const { t } = useTranslation()
  const group = SKILL_GROUPS[active]

  return (
    <div className="h-full flex flex-col">
      <div className="px-2 mb-4">
        <h2 className="font-display text-3xl font-light text-[#2D1B2E] mb-1">{t.skillsTitle}</h2>
        <p className="text-sm text-[#B76E79]">{t.skillsSub}</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 px-2 mb-5 flex-wrap">
        {SKILL_GROUPS.map((g, i) => (
          <motion.button
            key={g.category}
            data-hover="true"
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full transition-all font-medium"
            style={active === i
              ? {
                  background: `linear-gradient(135deg, ${g.color}, ${g.color}CC)`,
                  color: 'white',
                  boxShadow: `0 4px 16px ${g.color}40`,
                }
              : {
                  background: 'rgba(255,255,255,0.6)',
                  color: '#B76E79',
                  border: '1px solid rgba(255,79,162,0.15)',
                }
            }
          >
            <span>{g.icon}</span>
            <span>{g.category}</span>
          </motion.button>
        ))}
      </div>

      {/* Skills bars */}
      <motion.div
        key={active}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto px-2 space-y-3"
      >
        <p className="text-sm font-medium text-[#2D1B2E] mb-3">
          {group.icon} {group.category}
        </p>
        {group.skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium text-[#2D1B2E] text-xs">{skill.name}</span>
              <span className="text-xs text-[#B76E79]">{skill.level}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#FFD6EA]/40 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${group.color}, ${group.color}99)` }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ delay: i * 0.05 + 0.2, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}

        <div className="pt-3">
          <p className="text-[10px] text-[#B76E79] mb-2 uppercase tracking-wider">{t.skillsAlsoIncludes}</p>
          <div className="flex flex-wrap gap-1.5">
            {group.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/70 text-[#4A3040] border border-[#FF4FA2]/15">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Languages + soft skills */}
      <div className="px-2 pt-3 mt-2 border-t border-[#FF4FA2]/10">
        <div className="flex gap-2 flex-wrap mb-2">
          {[
            { lang: 'Arabic', level: t.langNative },
            { lang: 'French', level: t.langFluent },
            { lang: 'English', level: t.langFluent },
          ].map(({ lang, level }) => (
            <span key={lang} className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: 'rgba(255,79,162,0.1)', color: '#FF4FA2', border: '1px solid rgba(255,79,162,0.2)' }}>
              {lang} · {level}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(t.softSkills as string[]).map((s) => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full text-[#B76E79] border border-[#B76E79]/20 bg-white/50">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
