'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { avatarDataUrl } from './avatarData'

interface Props {
  speaking?: boolean
  onTalk?: () => void
}

function AvatarFallback({ speaking, blinking }: { speaking: boolean; blinking: boolean }) {
  return (
    <svg viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="faceGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#FF4FA2" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FF4FA2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="skinGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FDEBD0" />
          <stop offset="100%" stopColor="#F5C6A0" />
        </radialGradient>
        <filter id="blushBlur"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <ellipse cx="160" cy="210" rx="130" ry="150" fill="url(#faceGlow)" />
      <ellipse cx="160" cy="175" rx="92" ry="118" fill="#4A2315" />
      <path d="M 75 160 Q 60 280 72 340 Q 85 220 100 175 Z" fill="#3D1E10" />
      <path d="M 245 160 Q 260 280 248 340 Q 235 220 220 175 Z" fill="#3D1E10" />
      <ellipse cx="68" cy="210" rx="12" ry="17" fill="#F5C6A0" />
      <ellipse cx="252" cy="210" rx="12" ry="17" fill="#F5C6A0" />
      <ellipse cx="160" cy="215" rx="88" ry="98" fill="url(#skinGrad)" />
      <path d="M 75 165 Q 88 105 120 95 Q 150 88 160 88 Q 175 88 200 95 Q 232 105 245 165 Q 215 130 160 128 Q 105 130 75 165 Z" fill="#5C2D18" />
      <path d="M 126 112 Q 160 100 194 112 Q 178 138 160 136 Q 142 138 126 112 Z" fill="#4A2315" />
      <path d="M 105 183 Q 126 173 147 178" stroke="#3D1E10" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 173 178 Q 194 173 215 183" stroke="#3D1E10" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <ellipse cx="126" cy="204" rx="22" ry={blinking ? 2 : 16} fill="#2A1208" />
      {!blinking && <><ellipse cx="126" cy="204" rx="8" ry="8" fill="#160804" /><circle cx="131" cy="198" r="3.5" fill="white" opacity="0.95" /></>}
      <ellipse cx="194" cy="204" rx="22" ry={blinking ? 2 : 16} fill="#2A1208" />
      {!blinking && <><ellipse cx="194" cy="204" rx="8" ry="8" fill="#160804" /><circle cx="199" cy="198" r="3.5" fill="white" opacity="0.95" /></>}
      <path d="M 154 232 Q 160 244 166 232" stroke="#D4956A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="108" cy="234" rx="24" ry="14" fill="#FF9BB3" opacity="0.3" filter="url(#blushBlur)" />
      <ellipse cx="212" cy="234" rx="24" ry="14" fill="#FF9BB3" opacity="0.3" filter="url(#blushBlur)" />
      <path d={speaking ? "M 135 260 Q 160 278 185 260" : "M 138 258 Q 160 268 182 258"} stroke="#C8756A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <rect x="138" y="306" width="44" height="54" rx="10" fill="#F5C6A0" />
      <path d="M 50 420 Q 55 340 100 326 Q 130 318 138 315 L 182 315 Q 190 318 220 326 Q 265 340 270 420 Z" fill="#FF4FA2" />
      <motion.line x1="70" x2="250" stroke="#FF4FA2" strokeWidth="1.5" opacity="0.35"
        animate={{ y1: [95, 380, 95], y2: [95, 380, 95] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }} />
    </svg>
  )
}

export function HologramAvatar({ speaking = false, onTalk }: Props) {
  const [shimmer, setShimmer] = useState(false)

  // Occasional holographic shimmer pulse
  useEffect(() => {
    const schedule = () => {
      const delay = 3000 + Math.random() * 5000
      return setTimeout(() => {
        setShimmer(true)
        setTimeout(() => {
          setShimmer(false)
          timeoutRef.current = schedule()
        }, 400)
      }, delay)
    }
    const timeoutRef = { current: schedule() }
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Ambient glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[#FF4FA2]/10 blur-[80px] animate-breathe" />

      {/* Holographic rings */}
      {[370, 320, 270].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#FF4FA2]"
          style={{
            width: size,
            height: size,
            opacity: 0.10 + i * 0.06,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 5, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Spinning dashed arc */}
      <motion.div
        className="absolute"
        style={{ width: 410, height: 410 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 410 410" className="w-full h-full">
          <circle
            cx="205" cy="205" r="203"
            stroke="#FF4FA2" strokeWidth="1" fill="none"
            strokeDasharray="8 18"
            opacity="0.25"
          />
          <circle cx="205" cy="4" r="5" fill="#FF4FA2" opacity="0.7" />
        </svg>
      </motion.div>

      {/* Inner pulse ring */}
      <motion.div
        className="absolute rounded-full border-2 border-[#FF85C2]/25"
        style={{ width: 230, height: 230 }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />

      {/* Speaking ring */}
      {speaking && (
        <motion.div
          className="absolute rounded-full border-2 border-[#FF4FA2]/50"
          style={{ width: 280, height: 280 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}

      {/* Avatar image */}
      <motion.div
        className="relative z-10 overflow-hidden rounded-full"
        style={{ width: 300, height: 300 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Avatar photo */}
        <img
          src={avatarDataUrl}
          alt="AI Rayane avatar"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 15%', filter: 'brightness(1.08) contrast(1.02)' }}
        />

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 z-20 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, #FF4FA2, transparent)' }}
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        />

        {/* Holographic shimmer overlay */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,79,162,0.18) 0%, rgba(255,255,255,0.25) 50%, rgba(255,133,194,0.18) 100%)',
          }}
          animate={{ opacity: shimmer ? [0, 0.8, 0] : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Orbiting particles */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2
        const r = 140 + (i % 3) * 20
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#FF4FA2]"
            style={{ left: '50%', top: '50%' }}
            animate={{
              x: [
                Math.cos(angle) * r - 3,
                Math.cos(angle + 0.4) * (r + 15) - 3,
                Math.cos(angle) * r - 3,
              ],
              y: [
                Math.sin(angle) * r - 3,
                Math.sin(angle + 0.4) * (r + 15) - 3,
                Math.sin(angle) * r - 3,
              ],
              opacity: [0.6, 1, 0.6],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: (i / 10) * 4,
              ease: 'easeInOut',
            }}
          />
        )
      })}

      {/* AI indicator dots */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF4FA2]/40" />
        <div className="w-2 h-2 rounded-full bg-[#FF4FA2]/70 animate-pulse" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF4FA2]/40" />
      </div>

      {/* Talk button */}
      <motion.button
        data-hover="true"
        onClick={onTalk}
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium text-sm whitespace-nowrap"
        style={{
          background: 'linear-gradient(135deg, #FF4FA2, #FF85C2)',
          boxShadow: '0 8px 32px rgba(255,79,162,0.4)',
        }}
        whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(255,79,162,0.6)' }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        Talk to AI Rayane
      </motion.button>
    </div>
  )
}
