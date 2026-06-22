'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HologramAvatar } from '@/components/HologramAvatar'
import { MemoryOrbs, MemoryOrbsMobile } from '@/components/MemoryOrbs'
import { ChatInterface } from '@/components/ChatInterface'
import { ProjectsPanel } from '@/components/panels/ProjectsPanel'
import { ExperiencePanel } from '@/components/panels/ExperiencePanel'
import { SkillsPanel } from '@/components/panels/SkillsPanel'
import { EducationPanel } from '@/components/panels/EducationPanel'
import { ContactPanel } from '@/components/panels/ContactPanel'

const ParticleField = dynamic(
  () => import('@/components/ParticleField').then(m => ({ default: m.ParticleField })),
  { ssr: false }
)
const CursorGlow = dynamic(
  () => import('@/components/CursorGlow').then(m => ({ default: m.CursorGlow })),
  { ssr: false }
)

const PANELS: Record<string, React.FC> = {
  projects: ProjectsPanel,
  experience: ExperiencePanel,
  skills: SkillsPanel,
  education: EducationPanel,
  contact: ContactPanel,
}

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #FFE8F4, #FFF4FA)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Animated rings */}
      {[80, 140, 200].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#FF4FA2]"
          style={{ width: size, height: size, opacity: 0.3 - i * 0.07 }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3 - i * 0.07, 0.1, 0.3 - i * 0.07] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        className="relative z-10 text-center"
      >
        <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl"
          style={{ background: 'linear-gradient(135deg, #FF4FA2, #FF85C2)', boxShadow: '0 16px 48px rgba(255,79,162,0.4)' }}>
          ✨
        </div>

        <motion.h1
          className="font-display text-4xl font-light text-[#2D1B2E] mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Rayane Toumi
        </motion.h1>

        <motion.p
          className="text-sm text-[#B76E79] tracking-widest uppercase"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Entering the digital universe...
        </motion.p>

        <motion.div
          className="mt-6 flex gap-1 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#FF4FA2]"
              animate={{ scale: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const ActivePanel = activePanel ? PANELS[activePanel] : null

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Particle background */}
      <ParticleField />

      {/* Custom cursor */}
      <CursorGlow />

      {/* Main canvas */}
      <main className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Background gradients */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#FF4FA2]/6 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#B76E79]/5 blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#FF85C2]/5 blur-[80px]" />
        </div>

        {/* Top bar */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-40 px-8 py-5 flex items-center justify-between"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: loaded ? 0 : 2.8 }}
        >
          <div>
            <p className="font-display text-lg font-medium text-[#2D1B2E]">Rayane Toumi</p>
            <p className="text-xs text-[#B76E79] -mt-0.5">AI · ENSIA · Algiers</p>
          </div>

          <nav className="flex items-center gap-1 md:gap-3">
            <a
              href="https://github.com/rayaaneeee"
              target="_blank"
              rel="noopener noreferrer"
              data-hover="true"
              className="text-xs text-[#B76E79] hover:text-[#FF4FA2] transition-colors px-2 md:px-3 py-1.5 rounded-full hover:bg-[#FF4FA2]/8"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/rayane-toumi-437634336/"
              target="_blank"
              rel="noopener noreferrer"
              data-hover="true"
              className="hidden sm:inline-flex text-xs text-[#B76E79] hover:text-[#FF4FA2] transition-colors px-3 py-1.5 rounded-full hover:bg-[#FF4FA2]/8"
            >
              in LinkedIn ↗
            </a>
            <a
              href="https://huggingface.co/rytaaaaaaa"
              target="_blank"
              rel="noopener noreferrer"
              data-hover="true"
              className="hidden sm:inline-flex text-xs text-[#B76E79] hover:text-[#FF4FA2] transition-colors px-3 py-1.5 rounded-full hover:bg-[#FF4FA2]/8"
            >
              🤗 HuggingFace ↗
            </a>
            <motion.button
              data-hover="true"
              onClick={() => setChatOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="text-xs px-3 md:px-4 py-2 rounded-full text-white font-medium"
              style={{
                background: 'linear-gradient(135deg, #FF4FA2, #FF85C2)',
                boxShadow: '0 4px 16px rgba(255,79,162,0.3)',
              }}
            >
              <span className="hidden sm:inline">Talk to </span>AI Rayane
            </motion.button>
          </nav>
        </motion.header>

        {/* Hero stage — center */}
        <div className="relative flex-1 flex items-center justify-center min-h-screen">

          {/* Memory orbs — desktop overlay only */}
          <div className="hidden md:contents">
            <MemoryOrbs activePanel={activePanel} onSelect={setActivePanel} />
          </div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.8 }}
            transition={{ delay: 2.6, duration: 0.8, type: 'spring' }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="scale-[0.62] sm:scale-[0.8] md:scale-100 origin-center">
              <HologramAvatar
                speaking={speaking}
                onTalk={() => setChatOpen(true)}
              />
            </div>

            {/* Name + tagline below avatar */}
            <motion.div
              className="mt-4 md:mt-20 text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
              transition={{ delay: 3.0 }}
            >
              <h1
                className="font-display text-3xl md:text-5xl font-light mb-2"
                style={{
                  background: 'linear-gradient(135deg, #FF4FA2, #B76E79)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Rayane Toumi
              </h1>
              <p className="text-[#B76E79] font-light tracking-wide">
                AI & Software Engineering · ENSIA · Algiers
              </p>
              <p className="text-sm text-[#B76E79]/70 mt-1">
                ML · Full-Stack · Cybersecurity · 12+ projects
              </p>
            </motion.div>

            {/* Mobile orbs — inline below name, hidden on desktop */}
            <div className="md:hidden">
              <MemoryOrbsMobile activePanel={activePanel} onSelect={setActivePanel} />
            </div>
          </motion.div>

          {/* Orb hint */}
          <motion.p
            className="absolute bottom-16 left-1/2 -translate-x-1/2 text-xs text-[#B76E79]/50 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            ✦ click the orbs to explore ✦
          </motion.p>
        </div>

        {/* Slide-in panel */}
        <AnimatePresence>
          {ActivePanel && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-30"
                style={{ background: 'rgba(255,200,220,0.12)', backdropFilter: 'blur(4px)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActivePanel(null)}
              />

              {/* Panel — bottom sheet on mobile, left drawer on desktop */}
              <motion.div
                className="fixed inset-x-0 bottom-0 top-[15vh] z-40 rounded-t-3xl md:inset-x-auto md:bottom-6 md:left-6 md:top-20 md:w-96 md:rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.88)',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid rgba(255,79,162,0.2)',
                  boxShadow: '0 32px 80px rgba(255,79,162,0.15)',
                }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Drag handle (mobile) */}
                <div className="md:hidden flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 rounded-full bg-[#FF4FA2]/30" />
                </div>

                {/* Close button */}
                <button
                  data-hover="true"
                  onClick={() => setActivePanel(null)}
                  className="absolute top-3 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-[#B76E79] hover:bg-[#FF4FA2]/10 transition-colors text-sm"
                >
                  ✕
                </button>

                <div className="h-full overflow-hidden p-6 pt-3">
                  <ActivePanel />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Chat */}
        <AnimatePresence>
          {chatOpen && (
            <ChatInterface
              onClose={() => setChatOpen(false)}
              onSpeaking={setSpeaking}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Stats ribbon — bottom of page */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-20 flex justify-center gap-4 md:gap-8 px-4 md:px-8 py-3 md:py-4 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        {[
          { n: '12+', label: 'Projects' },
          { n: '0.963', label: 'AUC-ROC' },
          { n: '3', label: 'Internships' },
          { n: '4th', label: 'Year @ ENSIA' },
        ].map(({ n, label }) => (
          <div key={label} className="text-center">
            <p className="text-sm font-bold" style={{ color: '#FF4FA2' }}>{n}</p>
            <p className="text-[10px] text-[#B76E79]/70 tracking-wide uppercase">{label}</p>
          </div>
        ))}
      </motion.div>
    </>
  )
}
