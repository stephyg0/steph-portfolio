"use client"

import { motion } from "framer-motion"
import { useAppState } from "@/lib/app-state"
import Image from "next/image"
import type { ReactNode } from "react"

interface AppIconProps {
  id: string
  name: string
  color: string
  icon?: string | ReactNode
  customIcon?: ReactNode
  size?: "normal" | "small"
  externalUrl?: string
  reveal?: boolean
  revealIndex?: number
}

export function AppIcon({
  id,
  name,
  color,
  icon,
  customIcon,
  size = "normal",
  externalUrl,
  reveal = false,
  revealIndex = 0,
}: AppIconProps) {
  const { openApp } = useAppState()

  const handleClick = () => {
    if (externalUrl) {
      window.open(externalUrl, '_blank')
    } else {
      openApp(id)
    }
  }

  const renderIcon = () => {
    const svgIcons = [
      "facetime",
      "appstore",
      "music",
      "calendar",
      "messages",
      "podcasts",
      "safari",
      "maps",
      "health",
      "camera",
      "reminders",
      "phone",
      "mail",
      "clock",
      "settings",
      "wallet",
      "photos",
      "news",
      "tv",
      "notes",
      "spotify",
    ]

    if (svgIcons.includes(id)) {
      return (
        <Image
          src={`/icons/${id}.svg`}
          alt={`${name}`}
          width={size === "small" ? 28 : 56}
          height={size === "small" ? 28 : 56}
          className="w-full h-full"
          priority={true}
          onError={(e) => {
            console.error(`Failed to load icon: ${id}`)
            // Fallback to a colored div with text initial
            const target = e.target as HTMLImageElement
            target.style.display = "none"
            const parent = target.parentElement
            if (parent) {
              const fallback = document.createElement("div")
              fallback.className = "w-full h-full flex items-center justify-center"
              fallback.textContent = name[0].toUpperCase()
              parent.appendChild(fallback)
            }
          }}
        />
      )
    }

    if (customIcon) return customIcon
    if (icon) return <div className="text-2xl">{icon}</div>
    return <div className="flex items-center justify-center w-full h-full">{name[0].toUpperCase()}</div>
  }

  const revealVariants = {
    hidden: { opacity: 0, scale: 0.2 },
    show: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 520,
        damping: 28,
        mass: 0.7,
        delay: 0.08 + index * 0.035,
      },
    }),
  }

  return (
    <motion.div
      className="flex flex-col items-center select-none"
      variants={revealVariants}
      initial="hidden"
      animate={reveal ? "show" : "hidden"}
      custom={revealIndex}
    >
      <motion.div
        className={`app-icon ${color}`}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        onTouchStart={(e) => e.stopPropagation()}
        style={{
          width: size === "small" ? "100%" : "60px",
          height: size === "small" ? "100%" : "60px",
        }}
      >
        {renderIcon()}
      </motion.div>
      {size === "normal" && <div className="text-[10px] text-white mt-1">{name}</div>}
    </motion.div>
  )
}
