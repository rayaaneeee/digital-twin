'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const ORBS = [
  {
    id: 'projects',
    label: 'Projects',
    emoji: '🚀',
    color: '#FF4FA2',
    glow: 'rgba(255,79,162,0.5)',
    x: -280,
    y: -80,
    delay: 0,
  },
  {
    id: 'experience',
    label: 'Experience',
    emoji: '💼',
    color: '#B76E79',
    glow: 'rgba(183,110,121,0.5)',
    x: 280,
    y: -80,
    delay: 0.1,
  },
  {
    id: 'skills',
    label: 'Skills',
    emoji: '⚡',
    color: '#FF85C2',
    glow: 'rgba(255,133,194,0.5)',
    x: 0,
    y: -280,
    delay: 0.2,
  },
  {
    id: 'education',
    label: 'Education',
    emoji: '🎓',
    color: '#FF4FA2',
    glow: 'rgba(255,79,162,0.5)',
    x: -220,
    y: 160,
    delay: 0.3,
  },
  {
    id: 'contact',
    label: 'Contact',
    emoji: '📡',
    color: '#B76E79',
    glow: 'rgba(183,110,121,0.5)',
    x: 220,
    y: 160,
    delay: 0.4,
  },
]

interface Props {
  activePanel: string | null
  onSelect: (id: string | null) => void
}

function OrbButton({ orb, active, onSelect }: { orb: typeof ORBS[0]; active: boolean; onSelect: () => void }) {
  return (
    <motion.button
      data-hover="true"
      onClick={onSelect}
      className="flex flex-col items-center gap-1.5 group"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
        animate={active ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          background: `radial-gradient(circle at 35% 35%, white 0%, ${orb.color}CC 40%, ${orb.color} 100%)`,
          boxShadow: active
            ? `0 0 0 3px ${orb.color}, 0 0 30px ${orb.glow}, 0 0 60px ${orb.glow}`
            : `0 8px 32px ${orb.glow}, 0 0 0 1px ${orb.color}40`,
        }}
      >
        <span className="text-xl md:text-2xl">{orb.emoji}</span>
        <div className="absolute top-2 left-3 w-4 h-4 rounded-full bg-white/40 blur-sm" />
      </motion.div>
      <span className="text-xs font-medium tracking-wide" style={{ color: orb.color }}>
        {orb.label}
      </span>
    </motion.button>
  )
}

export function MemoryOrbs({ activePanel, onSelect }: Props) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleSelect = (id: string) => onSelect(activePanel === id ? null : id)

  // Mobile: grid layout below avatar
  if (isMobile) {
    return (
      <div className="absolute bottom-24 left-0 right-0 z-20 flex flex-col items-center gap-3 pointer-events-none">
        {/* Row 1: Projects, Skills, Experience */}
        <div className="flex gap-6 pointer-events-auto">
          {[ORBS[0], ORBS[2], ORBS[1]].map((orb, i) => (
            <motion.div
              key={orb.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
            >
              <OrbButton orb={orb} active={activePanel === orb.id} onSelect={() => handleSelect(orb.id)} />
            </motion.div>
          ))}
        </div>
        {/* Row 2: Education, Contact */}
        <div className="flex gap-6 pointer-events-auto">
          {[ORBS[3], ORBS[4]].map((orb, i) => (
            <motion.div
              key={orb.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 + i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
            >
              <OrbButton orb={orb} active={activePanel === orb.id} onSelect={() => handleSelect(orb.id)} />
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  // Desktop: orbital positions
  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
      {ORBS.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute pointer-events-auto"
          style={{ x: orb.x, y: orb.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 + orb.delay, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4 + orb.delay * 2, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
          >
            <OrbButton orb={orb} active={activePanel === orb.id} onSelect={() => handleSelect(orb.id)} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
