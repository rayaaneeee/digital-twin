'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

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
    y: -220,
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

export function MemoryOrbs({ activePanel, onSelect }: Props) {
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
            animate={{
              y: [0, -12, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 4 + orb.delay * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: orb.delay,
            }}
          >
            <motion.button
              data-hover="true"
              onClick={() => onSelect(activePanel === orb.id ? null : orb.id)}
              className="flex flex-col items-center gap-2 group"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Orb sphere */}
              <motion.div
                className="relative w-16 h-16 rounded-full flex items-center justify-center"
                animate={activePanel === orb.id
                  ? { scale: [1, 1.1, 1] }
                  : { scale: 1 }
                }
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  background: `radial-gradient(circle at 35% 35%, white 0%, ${orb.color}CC 40%, ${orb.color} 100%)`,
                  boxShadow: activePanel === orb.id
                    ? `0 0 0 3px ${orb.color}, 0 0 30px ${orb.glow}, 0 0 60px ${orb.glow}`
                    : `0 8px 32px ${orb.glow}, 0 0 0 1px ${orb.color}40`,
                }}
              >
                <span className="text-2xl">{orb.emoji}</span>

                {/* Inner shine */}
                <div
                  className="absolute top-2 left-3 w-4 h-4 rounded-full bg-white/40 blur-sm"
                />
              </motion.div>

              {/* Label */}
              <motion.span
                className="text-xs font-medium tracking-wide"
                style={{ color: orb.color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 + orb.delay }}
              >
                {orb.label}
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
