"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  hue: number
}

const PARTICLE_COUNT = 200
const POINTER_FORCE = 0.024
const DAMPING = 0.9
const CONNECTION_DISTANCE = 150

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pointerRef = useRef({ x: 0, y: 0, active: false })
  const orbitRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrame: number
    const particles: Particle[] = []

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: 1.2 + Math.random() * 2.6,
          hue: 220 + Math.random() * 80,
        })
      }
    }

    const drawConnections = (width: number, height: number) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < CONNECTION_DISTANCE) {
            const alpha = 1 - dist / CONNECTION_DISTANCE
            ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.5})`
            ctx.lineWidth = 0.9
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const update = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.globalCompositeOperation = "screen"

      if (!pointerRef.current.active) {
        orbitRef.current += 0.006
        const radius = Math.min(width, height) * 0.18
        pointerRef.current.x = width / 2 + Math.cos(orbitRef.current) * radius
        pointerRef.current.y = height / 2 + Math.sin(orbitRef.current * 1.2) * radius
      }

      const pointerGradient = ctx.createRadialGradient(
        pointerRef.current.x,
        pointerRef.current.y,
        0,
        pointerRef.current.x,
        pointerRef.current.y,
        180
      )
      pointerGradient.addColorStop(0, "rgba(255, 255, 255, 0.6)")
      pointerGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.beginPath()
      ctx.fillStyle = pointerGradient
      ctx.arc(pointerRef.current.x, pointerRef.current.y, 180, 0, Math.PI * 2)
      ctx.fill()

      particles.forEach((particle) => {
        const dx = pointerRef.current.x - particle.x
        const dy = pointerRef.current.y - particle.y
        const distance = Math.hypot(dx, dy) || 1
        const force = Math.min(POINTER_FORCE / distance, 0.06)
        particle.vx += dx * force
        particle.vy += dy * force

        particle.vx *= DAMPING
        particle.vy *= DAMPING

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < -120) particle.x = width + 120
        if (particle.x > width + 120) particle.x = -120
        if (particle.y < -120) particle.y = height + 120
        if (particle.y > height + 120) particle.y = -120

        const speed = Math.hypot(particle.vx, particle.vy)
        const alpha = Math.min(0.85, 0.4 + speed * 2.1)
        const particleGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 5
        )
        particleGradient.addColorStop(0, `hsla(${particle.hue}, 100%, 90%, ${Math.min(1, alpha + 0.2)})`)
        particleGradient.addColorStop(1, `hsla(${particle.hue}, 100%, 90%, 0)`)

        ctx.beginPath()
        ctx.fillStyle = particleGradient
        ctx.arc(particle.x, particle.y, particle.size * 2.8, 0, Math.PI * 2)
        ctx.fill()
      })

      drawConnections(width, height)
      ctx.restore()
      animationFrame = requestAnimationFrame(update)
    }

    resize()
    initParticles()
    update()

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      }
    }

    const handlePointerLeave = () => {
      pointerRef.current.active = false
    }

    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerdown", handlePointerMove)
    window.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 -z-20" />
}
