'use client'

import { motion } from 'framer-motion'

const LINKS = [
  {
    label: 'Email',
    value: 'rayanerayane290905@gmail.com',
    href: 'mailto:rayanerayane290905@gmail.com',
    emoji: '✉️',
    color: '#FF4FA2',
    desc: 'Best for opportunities & collaboration',
  },
  {
    label: 'GitHub',
    value: '@rayaaneeee',
    href: 'https://github.com/rayaaneeee',
    emoji: '💻',
    color: '#B76E79',
    desc: '12+ public projects',
  },
  {
    label: 'HuggingFace',
    value: '@rytaaaaaaa',
    href: 'https://huggingface.co/rytaaaaaaa',
    emoji: '🤗',
    color: '#FF85C2',
    desc: 'DermAI live demo + models',
  },
  {
    label: 'Location',
    value: 'Algiers, Algeria',
    href: null,
    emoji: '📍',
    color: '#FF4FA2',
    desc: 'Open to remote worldwide',
  },
]

export function ContactPanel() {
  return (
    <div className="h-full overflow-y-auto px-2">
      <h2 className="font-display text-3xl font-light text-[#2D1B2E] mb-1">Contact</h2>
      <p className="text-sm text-[#B76E79] mb-6">Open to opportunities, research, and collaboration</p>

      {/* Hero CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl p-6 mb-6 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(255,79,162,0.1), rgba(255,133,194,0.08))',
          border: '1.5px solid rgba(255,79,162,0.2)',
        }}
      >
        <div className="text-4xl mb-3">👋</div>
        <h3 className="font-display text-xl font-medium text-[#2D1B2E] mb-2">
          Let's build something exceptional
        </h3>
        <p className="text-sm text-[#4A3040] mb-4">
          4th-year AI student at ENSIA, fluent in ML, full-stack, and cybersecurity.
          Fast learner, team leader, builder of real things.
        </p>
        <motion.a
          href="mailto:rayanerayane290905@gmail.com"
          data-hover="true"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block px-6 py-3 rounded-full text-white font-medium text-sm"
          style={{
            background: 'linear-gradient(135deg, #FF4FA2, #FF85C2)',
            boxShadow: '0 8px 24px rgba(255,79,162,0.35)',
          }}
        >
          Say hello →
        </motion.a>
      </motion.div>

      {/* Links */}
      <div className="space-y-3">
        {LINKS.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            {link.href ? (
              <a
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                data-hover="true"
                className="flex items-center gap-4 p-4 rounded-2xl group transition-all"
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  border: '1px solid rgba(255,79,162,0.1)',
                }}
              >
                <span className="text-2xl">{link.emoji}</span>
                <div className="flex-1">
                  <p className="text-xs text-[#B76E79] font-medium">{link.label}</p>
                  <p className="text-sm font-medium text-[#2D1B2E]">{link.value}</p>
                  <p className="text-xs text-[#B76E79]/70">{link.desc}</p>
                </div>
                <span style={{ color: link.color }} className="text-lg">↗</span>
              </a>
            ) : (
              <div className="flex items-center gap-4 p-4 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  border: '1px solid rgba(255,79,162,0.1)',
                }}>
                <span className="text-2xl">{link.emoji}</span>
                <div>
                  <p className="text-xs text-[#B76E79] font-medium">{link.label}</p>
                  <p className="text-sm font-medium text-[#2D1B2E]">{link.value}</p>
                  <p className="text-xs text-[#B76E79]/70">{link.desc}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
