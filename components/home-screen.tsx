"use client"

import { useState, useEffect } from "react"
import NextImage from "next/image"
import { StatusBar } from "@/components/status-bar"
import { AppIcon } from "@/components/app-icon"
import { motion, AnimatePresence } from "framer-motion"
import { useAppState } from "@/lib/app-state"
import { Widget } from "@/components/Widget"
import AxloraLogo from "@/assets/AXLORA.jpeg"
import GoldmanLogo from "@/assets/GOLDMAN.png"
import BostonDynamicsLogo from "@/assets/BD.png"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HomeScreenProps {
  time: Date
}

export function HomeScreen({ time }: HomeScreenProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const { openControlCenter } = useAppState()

  // Preload critical SVG icons
  useEffect(() => {
    const preloadIcons = [
      "facetime",
      "calendar",
      "photos",
      "camera",
      "mail",
      "notes",
      "reminders",
      "clock",
      "phone",
      "safari",
      "messages",
      "spotify"
    ]

    preloadIcons.forEach((icon) => {
      const img = new Image()
      img.src = `/icons/${icon}.svg`
    })
  }, [])

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50 && currentPage < 1) {
      // Swipe left
      setCurrentPage(currentPage + 1)
    } else if (info.offset.x > 50 && currentPage > 0) {
      // Swipe right
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageToggle = () => {
    setCurrentPage((prev) => (prev === 0 ? 1 : 0))
  }

  // Add touch handler for swipe down from top
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY
      if (touchY < 30) {
        // Touch started near the top of the screen
        const handleTouchMove = (moveEvent: TouchEvent) => {
          const currentY = moveEvent.touches[0].clientY
          if (currentY - touchY > 30) {
            // Swiped down at least 30px
            openControlCenter()
            document.removeEventListener("touchmove", handleTouchMove)
          }
        }

        document.addEventListener("touchmove", handleTouchMove, { once: true })
      }
    }

    document.addEventListener("touchstart", handleTouchStart)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
    }
  }, [openControlCenter])

  return (
    <div
      className="h-full w-full flex flex-col relative select-none overflow-hidden"
      style={{
        backgroundImage: `url(/Wallpaper.JPG)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <StatusBar time={time} dark />

      {/* Pages Container */}
      <motion.div
        className="flex-1 relative"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {currentPage === 0 && (
            <motion.div
              key="page-0"
              className="absolute inset-0 flex flex-col px-6 pt-4 pb-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Experience widget */}
              <div className="mb-3">
                <Widget
                  title="Experience"
                  hideTitle
                  className="bg-gradient-to-br from-indigo-600 via-purple-500 to-sky-500 text-left text-white backdrop-blur-md"
                  content={
                    <div className="flex min-h-[30px] items-center justify-center text-xs font-semibold uppercase tracking-[0.25em] text-white">
                      Experience
                    </div>
                  }
                />
              </div>

              {/* Experience apps */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <AppIcon
                  id="axlora"
                  name="Axlora"
                  color="bg-white"
                  customIcon={
                    <div className="relative h-full w-full">
                      <NextImage
                        src={AxloraLogo}
                        alt="Axlora logo"
                        fill
                        className="object-cover"
                        sizes="60px"
                        priority
                      />
                    </div>
                  }
                />
                <AppIcon
                  id="goldman"
                  name="Goldman Sachs"
                  color="bg-white"
                  customIcon={
                    <div className="relative h-full w-full">
                      <NextImage
                        src={GoldmanLogo}
                        alt="Goldman Sachs logo"
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>
                  }
                />
                <AppIcon
                  id="bostondynamics"
                  name="Boston Dynamics"
                  color="bg-white"
                  customIcon={
                    <div className="relative h-full w-full">
                      <NextImage
                        src={BostonDynamicsLogo}
                        alt="Boston Dynamics logo"
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>
                  }
                />
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-4 gap-4 mt-auto">
                <AppIcon id="calendar" name="Calendar" color="" />
                <AppIcon id="notes" name="Notes" color="bg-yellow-100" />
                <AppIcon id="mail" name="Mail" color="bg-blue-500" />
                <AppIcon id="safari" name="Portfolio" color="bg-indigo-500" />
              </div>

              <div className="mt-4 flex justify-center">
                <AppIcon
                  id="linkedin"
                  name="LinkedIn"
                  color=""
                  customIcon={
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#0A66C2] text-xl font-semibold text-white">
                      in
                    </div>
                  }
                />
              </div>
            </motion.div>
          )}

          {currentPage === 1 && (
            <motion.div
              key="page-1"
              className="absolute inset-0 flex flex-col px-6 pt-4 pb-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Second page app icons */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <AppIcon id="maps" name="Maps" color="" />
                <AppIcon id="health" name="Health" color="" />
                <AppIcon id="wallet" name="Wallet" color="bg-gradient-to-b from-yellow-400 to-red-500" />
                <AppIcon id="settings" name="Settings" color="bg-gray-200" />
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <AppIcon id="news" name="News" color="bg-red-600" />
                <AppIcon id="tv" name="TV" color="bg-black" />
                <AppIcon id="podcasts" name="Podcasts" color="" />
                <AppIcon id="appstore" name="App Store" color="" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Page Indicators */}
      <div className="mb-2 flex items-center justify-center gap-2">
        <div className="flex gap-1.5">
          <button
            className={`h-1.5 w-1.5 rounded-full ${currentPage === 0 ? "bg-white" : "bg-white/30"}`}
            onClick={() => setCurrentPage(0)}
          />
          <button
            className={`h-1.5 w-1.5 rounded-full ${currentPage === 1 ? "bg-white" : "bg-white/30"}`}
            onClick={() => setCurrentPage(1)}
          />
        </div>
        <button
          type="button"
          onClick={handlePageToggle}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur transition hover:bg-white dark:bg-white/10 dark:text-white"
          aria-label={currentPage === 0 ? "Go to next page" : "Go to previous page"}
        >
          {currentPage === 0 ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Dock */}
      <div className="grid grid-cols-4 gap-4 px-6 mb-4">
        <AppIcon id="phone" name="Phone" color="bg-green-500" />
        <AppIcon id="safari" name="Safari" color="" />
        <AppIcon id="messages" name="Messages" color="" />
        <AppIcon id="spotify" name="Spotify" color="" />
      </div>
    </div>
  )
}
