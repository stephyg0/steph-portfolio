"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useAppState } from "@/lib/app-state"

interface HomeIndicatorProps {
  children: React.ReactNode
}

export function HomeIndicator({ children }: HomeIndicatorProps) {
  const { closeApp } = useAppState()
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle swipe up gesture
  useEffect(() => {
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY
      const diff = touchStartY - touchY

      // If swiped up more than 100px, go home
      if (diff > 100) {
        closeApp()
      }
    }

    const element = containerRef.current
    if (element) {
      element.addEventListener("touchstart", handleTouchStart)
      element.addEventListener("touchmove", handleTouchMove)
    }

    return () => {
      if (element) {
        element.removeEventListener("touchstart", handleTouchStart)
        element.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [closeApp])

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      {children}

      {/* On-screen home button */}
      <button
        type="button"
        onClick={closeApp}
        className="absolute bottom-5 left-1/2 flex h-9 w-24 -translate-x-1/2 items-center justify-center rounded-full bg-black/50 text-[0] shadow-md transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        aria-label="Go Home"
      >
        <span className="h-1.5 w-12 rounded-full bg-white/80" />
      </button>
    </div>
  )
}
