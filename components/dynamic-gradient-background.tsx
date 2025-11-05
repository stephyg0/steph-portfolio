"use client"

import { useEffect } from "react"

const lerp = (start: number, end: number, amt: number) => start + (end - start) * amt

export function DynamicGradientBackground() {
  useEffect(() => {
    const root = document.documentElement
    let currentX = 50
    let currentY = 50
    let targetX = 50
    let targetY = 50

    let rafId: number

    const updateVariables = (time: number) => {
      currentX = lerp(currentX, targetX, 0.016)
      currentY = lerp(currentY, targetY, 0.016)

      const pulse = (Math.sin(time * 0.00008) + 1) / 2
      const hueShift = Math.sin(time * 0.00007) * 14

      root.style.setProperty("--gradient-x", `${currentX}%`)
      root.style.setProperty("--gradient-y", `${currentY}%`)
      root.style.setProperty("--gradient-pulse", pulse.toFixed(3))
      root.style.setProperty("--gradient-hue", `${220 + hueShift}deg`)

      rafId = requestAnimationFrame(updateVariables)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const xPercent = (event.clientX / window.innerWidth) * 100
      const yPercent = (event.clientY / window.innerHeight) * 100
      targetX = xPercent
      targetY = yPercent
    }

    const handlePointerLeave = () => {
      targetX = 50
      targetY = 50
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerleave", handlePointerLeave)

    rafId = requestAnimationFrame(updateVariables)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  return null
}
