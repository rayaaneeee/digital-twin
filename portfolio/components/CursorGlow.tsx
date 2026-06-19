'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorGlow() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX = useMotionValue(-100)
  const trailY = useMotionValue(-100)

  const springX = useSpring(trailX, { stiffness: 120, damping: 20 })
  const springY = useSpring(trailY, { stiffness: 120, damping: 20 })

  const hovering = useRef(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      hovering.current = !!(el.closest('button') || el.closest('a') || el.closest('[data-hover]'))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [cursorX, cursorY, trailX, trailY])

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-multiply"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        <div className="w-3 h-3 rounded-full bg-[#FF4FA2]" />
      </motion.div>

      {/* Trailing glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      >
        <div
          className="w-8 h-8 rounded-full border border-[#FF4FA2]/50"
          style={{ boxShadow: '0 0 20px rgba(255,79,162,0.3)' }}
        />
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      >
        <div className="w-40 h-40 rounded-full bg-[#FF4FA2]/8 blur-2xl" />
      </motion.div>
    </>
  )
}
