'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  r: number
  color: string
  alpha: number
  pulse: number
  pulseSpeed: number
}

const COLORS = ['#FF4FA2', '#FFD6EA', '#FF85C2', '#B76E79', '#FFAFD0', '#FFFFFF']

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number>(0)
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // Init particles
    const count = 180
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: 0.2 + Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 2.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.3 + Math.random() * 0.5,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.02,
    }))

    // Floating orbs (large, blurred)
    const orbs = Array.from({ length: 6 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.15,
      r: 80 + Math.random() * 120,
      color: COLORS[Math.floor(Math.random() * 3)],
      alpha: 0.04 + Math.random() * 0.06,
    }))

    const draw = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx
        orb.y += orb.vy
        if (orb.x < -orb.r) orb.x = canvas.width + orb.r
        if (orb.x > canvas.width + orb.r) orb.x = -orb.r
        if (orb.y < -orb.r) orb.y = canvas.height + orb.r
        if (orb.y > canvas.height + orb.r) orb.y = -orb.r

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
        grad.addColorStop(0, orb.color + Math.round(orb.alpha * 255).toString(16).padStart(2, '0'))
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Mouse glow
      const mg = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, 200
      )
      mg.addColorStop(0, 'rgba(255,79,162,0.08)')
      mg.addColorStop(1, 'transparent')
      ctx.fillStyle = mg
      ctx.beginPath()
      ctx.arc(mouse.current.x, mouse.current.y, 200, 0, Math.PI * 2)
      ctx.fill()

      // Draw particles
      particles.current.forEach((p) => {
        p.pulse += p.pulseSpeed
        const currentAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse))
        const currentR = p.r * (0.9 + 0.1 * Math.sin(p.pulse * 1.3))

        // Mouse influence
        const dx = mouse.current.x - p.x
        const dy = mouse.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.4
          p.vx += (dx / dist) * force * 0.01
          p.vy += (dy / dist) * force * 0.01
        }

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 0.8) { p.vx *= 0.8 / speed; p.vy *= 0.8 / speed }

        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw with glow
        ctx.save()
        ctx.globalAlpha = currentAlpha * 0.4
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentR * 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = currentAlpha
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentR, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Connect nearby particles
        particles.current.forEach((p2) => {
          const dx = p2.x - p.x
          const dy = p2.y - p.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 80 && d > 0) {
            ctx.save()
            ctx.globalAlpha = (1 - d / 80) * 0.08
            ctx.strokeStyle = p.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      frameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  )
}
