'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/LanguageContext'

const ORB_DEFS = [
  { id: 'projects',   emoji: '🚀', color: '#FF4FA2', glow: 'rgba(255,79,162,0.5)',   x: -280, y: -80,  delay: 0   },
  { id: 'experience', emoji: '💼', color: '#B76E79', glow: 'rgba(183,110,121,0.5)', x:  280, y: -80,  delay: 0.1 },
  { id: 'skills',     emoji: '⚡', color: '#FF85C2', glow: 'rgba(255,133,194,0.5)', x:    0, y: -280, delay: 0.2 },
  { id: 'education',  emoji: '🎓', color: '#FF4FA2', glow: 'rgba(255,79,162,0.5)',   x: -220, y:  160, delay: 0.3 },
  { id: 'contact',    emoji: '📡', color: '#B76E79', glow: 'rgba(183,110,121,0.5)', x:  220, y:  160, delay: 0.4 },
]

interface Props {
  activePanel: string | null
  onSelect: (id: string | null) => void
}

function OrbButton({ orb, label, active, onSelect, size = 'md' }: {
  orb: typeof ORB_DEFS[0]
  label: string
  active: boolean
  onSelect: () => void
  size?: 'sm' | 'md'
}) {
  return (
    <motion.button
      data-hover="true"
      onClick={onSelect}
      className="flex flex-col items-center gap-1.5"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`relative ${size === 'sm' ? 'w-14 h-14' : 'w-16 h-16'} rounded-full flex items-center justify-center`}
        animate={active ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          background: `radial-gradient(circle at 35% 35%, white 0%, ${orb.color}CC 40%, ${orb.color} 100%)`,
          boxShadow: active
            ? `0 0 0 3px ${orb.color}, 0 0 30px ${orb.glow}, 0 0 60px ${orb.glow}`
            : `0 8px 32px ${orb.glow}, 0 0 0 1px ${orb.color}40`,
        }}
      >
        <span className={size === 'sm' ? 'text-xl' : 'text-2xl'}>{orb.emoji}</span>
        <div className="absolute top-2 left-3 w-4 h-4 rounded-full bg-white/40 blur-sm" />
      </motion.div>
      <span className="text-xs font-medium tracking-wide" style={{ color: orb.color }}>
        {label}
      </span>
    </motion.button>
  )
}

/** Mobile inline grid — place inside flex column, no absolute positioning */
export function MemoryOrbsMobile({ activePanel, onSelect }: Props) {
  const { t } = useTranslation()
  const labels: Record<string, string> = {
    projects: t.orbProjects,
    experience: t.orbExperience,
    skills: t.orbSkills,
    education: t.orbEducation,
    contact: t.orbContact,
  }

  const handle = (id: string) => onSelect(activePanel === id ? null : id)
  const ROW1 = [ORB_DEFS[0], ORB_DEFS[2], ORB_DEFS[1]]
  const ROW2 = [ORB_DEFS[3], ORB_DEFS[4]]

  return (
    <div className="flex flex-col items-center gap-4 mt-8 mb-4">
      <div className="flex gap-7">
        {ROW1.map((orb, i) => (
          <motion.div key={orb.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}>
            <OrbButton orb={orb} label={labels[orb.id]} active={activePanel === orb.id} onSelect={() => handle(orb.id)} size="sm" />
          </motion.div>
        ))}
      </div>
      <div className="flex gap-7">
        {ROW2.map((orb, i) => (
          <motion.div key={orb.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 + i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}>
            <OrbButton orb={orb} label={labels[orb.id]} active={activePanel === orb.id} onSelect={() => handle(orb.id)} size="sm" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Desktop overlay — absolute-positioned orbs orbiting the avatar */
export function MemoryOrbs({ activePanel, onSelect }: Props) {
  const { t } = useTranslation()
  const labels: Record<string, string> = {
    projects: t.orbProjects,
    experience: t.orbExperience,
    skills: t.orbSkills,
    education: t.orbEducation,
    contact: t.orbContact,
  }

  const handle = (id: string) => onSelect(activePanel === id ? null : id)
  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
      {ORB_DEFS.map((orb) => (
        <motion.div key={orb.id} className="absolute pointer-events-auto" style={{ x: orb.x, y: orb.y }}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 + orb.delay, type: 'spring', stiffness: 200, damping: 20 }}>
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4 + orb.delay * 2, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}>
            <OrbButton orb={orb} label={labels[orb.id]} active={activePanel === orb.id} onSelect={() => handle(orb.id)} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
