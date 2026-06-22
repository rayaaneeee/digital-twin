'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/LanguageContext'

const TIMELINE = [
  {
    company: 'Temacina',
    role: 'Software Dev Intern · Team Lead',
    period: 'Feb – Jun 2026',
    location: 'Algiers',
    color: '#FF4FA2',
    tech: ['Google Cloud Vision', 'Claude API', 'Transformers', 'Django', 'Vue.js'],
    bulletIndex: 0,
  },
  {
    company: 'Algérie Poste',
    role: 'Data Mining Intern',
    period: 'Dec 2025 – Feb 2026',
    location: 'Algiers',
    color: '#B76E79',
    tech: ['Python', 'SVM', 'Random Forest', 'Scikit-learn', 'XGBoost'],
    bulletIndex: 1,
  },
  {
    company: 'Algérie Télécom',
    role: 'Network Architecture Intern',
    period: 'Jul – Aug 2025',
    location: 'Constantine',
    color: '#FF85C2',
    tech: ['Network Design', 'Telecommunications', 'Wireshark'],
    bulletIndex: 2,
  },
  {
    company: 'BMS Hackathon',
    role: 'Jury Member · Mobile Dev Track',
    period: '2025',
    location: 'Algeria',
    color: '#B76E79',
    tech: ['Mobile Development', 'Flutter', 'React Native'],
    bulletIndex: 3,
  },
]

export function ExperiencePanel() {
  const { t } = useTranslation()
  const allBullets = t.experienceBullets as string[][]

  return (
    <div className="h-full overflow-y-auto px-2">
      <h2 className="font-display text-3xl font-light text-[#2D1B2E] mb-1">{t.experienceTitle}</h2>
      <p className="text-sm text-[#B76E79] mb-8">{t.experienceSub}</p>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF4FA2] via-[#B76E79] to-[#FF85C2] opacity-30" />

        <div className="flex flex-col gap-8">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
              className="relative pl-14"
            >
              <motion.div
                className="absolute left-3 top-1 w-4 h-4 rounded-full border-2 border-white"
                style={{ background: item.color, boxShadow: `0 0 12px ${item.color}60` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 + 0.2, type: 'spring' }}
              />

              <div className="rounded-2xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,79,162,0.12)',
                  backdropFilter: 'blur(10px)',
                }}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="font-semibold text-[#2D1B2E]">{item.company}</h3>
                    <p className="text-sm font-medium" style={{ color: item.color }}>{item.role}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-[#B76E79] font-medium">{item.period}</p>
                    <p className="text-xs text-[#B76E79]/70">{item.location}</p>
                  </div>
                </div>

                <ul className="mt-3 space-y-1.5">
                  {(allBullets[item.bulletIndex] ?? []).map((b, j) => (
                    <li key={j} className="text-sm text-[#4A3040] flex gap-2">
                      <span style={{ color: item.color }} className="flex-shrink-0 mt-0.5">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.tech.map((tech) => (
                    <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Education inline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative pl-14"
          >
            <div className="absolute left-3 top-1 w-4 h-4 rounded-full border-2 border-white bg-gradient-to-br from-[#FF4FA2] to-[#B76E79]"
              style={{ boxShadow: '0 0 12px rgba(255,79,162,0.4)' }} />
            <div className="rounded-2xl p-5"
              style={{ background: 'rgba(255,79,162,0.06)', border: '1px solid rgba(255,79,162,0.2)' }}>
              <h3 className="font-semibold text-[#2D1B2E]">ENSIA</h3>
              <p className="text-sm font-medium text-[#FF4FA2]">4th-Year AI & Computer Science</p>
              <p className="text-xs text-[#B76E79] mt-0.5">2023 – 2027 · Algiers, Algeria</p>
              <p className="text-sm text-[#4A3040] mt-2">
                {t.experienceEducationDesc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
