'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/LanguageContext'

const CERTS = [
  { name: 'Deep Learning & Robotics', org: 'University of Constantine 1', year: '2024', emoji: '🤖' },
  { name: 'Introduction to Machine Learning', org: 'University of Constantine 1', year: '2024', emoji: '🧠' },
  { name: 'LLMs & Fine-Tuning Basics', org: 'University of Constantine 1', year: '2024', emoji: '💬' },
  { name: 'Mobile Development with Flutter', org: 'Self-directed', year: '2024', emoji: '📱' },
  { name: 'Jury Member — BMS Hackathon', org: 'BMS 3-Day Hackathon', year: '2024', emoji: '🏆' },
]

const COURSES = [
  'Machine Learning', 'Deep Learning', 'Data Mining',
  'Time Series Analysis', 'Operations Research & Metaheuristics',
  'Computer Networks & Security', 'Databases (SQL/NoSQL)',
  'Software Engineering', 'Numerical Methods',
]

export function EducationPanel() {
  const { t } = useTranslation()

  return (
    <div className="h-full overflow-y-auto px-2">
      <h2 className="font-display text-3xl font-light text-[#2D1B2E] mb-1">{t.educationTitle}</h2>
      <p className="text-sm text-[#B76E79] mb-6">{t.educationSub}</p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden mb-6 p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(255,79,162,0.08), rgba(183,110,121,0.06))',
          border: '1.5px solid rgba(255,79,162,0.2)',
        }}
      >
        <div className="absolute -top-6 -right-6 text-8xl opacity-10">🎓</div>
        <p className="text-xs font-medium text-[#FF4FA2] uppercase tracking-widest mb-2">2023 – 2027</p>
        <h3 className="text-xl font-bold text-[#2D1B2E] leading-tight mb-1">ENSIA</h3>
        <p className="text-sm font-medium text-[#B76E79] mb-3">
          National Higher School of Artificial Intelligence<br />
          Computer Science · Artificial Intelligence track
        </p>
        <p className="text-sm text-[#4A3040]">
          {t.educationSchoolDesc}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ background: 'rgba(255,79,162,0.1)', border: '1px solid rgba(255,79,162,0.2)' }}>
          <span>🌟</span>
          <span className="text-xs font-medium text-[#FF4FA2]">{t.educationBac}</span>
        </div>

        <div className="mt-4">
          <p className="text-xs text-[#B76E79] font-medium mb-2">{t.educationCoursework}</p>
          <div className="flex flex-wrap gap-1.5">
            {COURSES.map((c) => (
              <span key={c} className="text-[11px] px-2.5 py-1 rounded-full bg-white/70 text-[#4A3040]"
                style={{ border: '1px solid rgba(255,79,162,0.12)' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <h3 className="text-sm font-semibold text-[#2D1B2E] mb-3">{t.educationCerts}</h3>
      <div className="space-y-3">
        {CERTS.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="flex items-start gap-3 p-4 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(255,79,162,0.1)',
            }}
          >
            <span className="text-xl flex-shrink-0">{cert.emoji}</span>
            <div>
              <p className="text-sm font-medium text-[#2D1B2E]">{cert.name}</p>
              <p className="text-xs text-[#B76E79]">{cert.org} · {cert.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
