"use client"

import type React from "react"

interface IPhoneFrameProps {
  children?: React.ReactNode
  className?: string
  inset?: number
  insetTop?: number
  insetRight?: number
  insetBottom?: number
  insetLeft?: number
  radius?: number
  bezel?: number
}

export function IPhoneFrame({
  children,
  className = "",
  inset = 12,
  insetTop,
  insetRight,
  insetBottom,
  insetLeft,
  radius = 60,
  bezel = 8,
}: IPhoneFrameProps) {
  const resolvedInsets = {
    top: insetTop ?? inset,
    right: insetRight ?? inset,
    bottom: insetBottom ?? inset,
    left: insetLeft ?? inset,
  }
  const maxInset = Math.max(resolvedInsets.top, resolvedInsets.right, resolvedInsets.bottom, resolvedInsets.left)
  const innerRadius = Math.max(radius - maxInset, 0)
  const bezelRadius = Math.max(innerRadius - bezel, 0)

  return (
    <div
      className={`relative mx-auto aspect-[375/812] w-full max-w-[375px] overflow-hidden ${className}`}
      style={{ borderRadius: `${radius}px` }}
    >
      {/* iPhone outer frame */}
      <div
        className="absolute inset-0 bg-black shadow-lg z-10 overflow-hidden"
        style={{ borderRadius: `${radius}px` }}
      >
        {/* Inner frame with border */}
        <div
          className="absolute bg-[#050816] overflow-hidden transition-colors duration-300"
          style={{
            top: `${resolvedInsets.top}px`,
            right: `${resolvedInsets.right}px`,
            bottom: `${resolvedInsets.bottom}px`,
            left: `${resolvedInsets.left}px`,
            borderRadius: `${innerRadius}px`,
          }}
        >
          {/* Screen bezel */}
          <div
            className="absolute inset-0 overflow-hidden z-10"
            style={{ borderRadius: `${bezelRadius}px`, boxShadow: `inset 0 0 0 ${bezel}px #000` }}
          >
            {/* Dynamic Island (pill) */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-[30px] z-50 mt-2" />

            {/* Content area */}
            <div className="w-full h-full overflow-hidden" style={{ borderRadius: `${bezelRadius}px` }}>
              {children}
            </div>
          </div>
        </div>

        {/* Side buttons */}
        {/* Volume up */}
        <div className="absolute left-[-2px] top-[100px] w-[4px] h-[40px] bg-[#121212] rounded-l-sm" />

        {/* Volume down */}
        <div className="absolute left-[-2px] top-[160px] w-[4px] h-[40px] bg-[#121212] rounded-l-sm" />

        {/* Power button */}
        <div className="absolute right-[-2px] top-[120px] w-[4px] h-[100px] bg-[#121212] rounded-r-sm" />
      </div>
    </div>
  )
}
