"use client"

import NextImage, { type StaticImageData } from "next/image"
import { useState, useEffect } from "react"
import { StatusBar } from "@/components/status-bar"
import { AppIcon } from "@/components/app-icon"
import { motion } from "framer-motion"
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
  const companyIconBase =
    "flex h-full w-full items-center justify-center rounded-2xl border border-white/25 text-[11px] font-semibold uppercase tracking-[0.25em]"
  const companyLogoBase = "relative h-full w-full overflow-hidden rounded-2xl border border-white/25 bg-white/80"
  const renderCompanyLogo = (
    src: StaticImageData,
    alt: string,
    options: { priority?: boolean; borderless?: boolean } = {}
  ) => (
    <div className={`${companyLogoBase} ${options.borderless ? "border-0 bg-transparent" : ""}`}>
      <NextImage
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="60px"
        priority={Boolean(options.priority)}
      />
    </div>
  )

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
        {currentPage === 0 && (
          <motion.div className="absolute inset-0 flex flex-col px-6 pt-8 pb-6">
              {/* Experience widget */}
              <div className="mb-3">
                <Widget
                  title="Experience"
                  hideTitle
                  className="border border-white/40 bg-white/20 text-left text-white/90 shadow-[0_8px_32px_rgba(24,26,54,0.22)] backdrop-blur-2xl !px-3 !py-2 dark:border-white/15 dark:bg-white/10"
                  content={
                    <div className="flex min-h-[22px] items-center justify-center text-[11px] font-semibold uppercase tracking-[0.3em] text-white/95">
                      Experience
                    </div>
                  }
                />
              </div>

              {/* Experience apps */}
              <div className="grid grid-cols-3 gap-4 mt-2">
                <AppIcon
                  id="axlora"
                  name="Axlora"
                  color="bg-white"
                  customIcon={
                    renderCompanyLogo(AxloraLogo, "Axlora logo", true)
                  }
                />
                <AppIcon
                  id="goldman"
                  name="Goldman Sachs"
                  color="bg-white"
                  customIcon={
                    renderCompanyLogo(GoldmanLogo, "Goldman Sachs logo", { borderless: true })
                  }
                />
                <AppIcon
                  id="bostondynamics"
                  name="Boston Dynamics"
                  color="bg-white"
                  customIcon={
                    renderCompanyLogo(BostonDynamicsLogo, "Boston Dynamics logo")
                  }
                />
              </div>

              <div className="mt-2 mb-3">
                <Widget
                  title="Education"
                  hideTitle
                  className="border border-white/35 bg-white/18 text-left text-white/90 shadow-[0_12px_45px_rgba(24,26,54,0.22)] backdrop-blur-2xl !px-3 !py-2 dark:border-white/12 dark:bg-white/8"
                  content={
                    <div className="flex min-h-[22px] items-center justify-center text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90">
                      Education
                    </div>
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-1">
                <AppIcon
                  id="minerva"
                  name="Minerva"
                  color="bg-white"
                  customIcon={
                    <div
                      className={`${companyIconBase} bg-gradient-to-br from-amber-200 via-pink-200 to-rose-200 text-rose-700`}
                    >
                      MU
                    </div>
                  }
                />
                <AppIcon
                  id="pearson"
                  name="Pearson"
                  color="bg-white"
                  customIcon={
                    <div
                      className={`${companyIconBase} bg-gradient-to-br from-sky-200 via-purple-200 to-indigo-200 text-indigo-700`}
                    >
                      UWC
                    </div>
                  }
                />
              </div>

              <div className="mt-1">
                <Widget
                  title="Projects"
                  hideTitle
                  className="border border-white/35 bg-white/18 text-left text-white/90 shadow-[0_12px_45px_rgba(24,26,54,0.22)] backdrop-blur-2xl !px-3 !py-2 dark:border-white/12 dark:bg-white/8"
                  content={
                    <div className="flex min-h-[22px] items-center justify-center text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90">
                      Projects
                    </div>
                  }
                />
              </div>

              <div className="mt-2 grid grid-cols-4 gap-4 mb-4">
                <AppIcon
                  id="christmas"
                  name="Lights"
                  color="bg-white"
                  customIcon={
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200 via-amber-200 to-rose-200 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-800">
                      XMAS
                    </div>
                  }
                />
                <AppIcon
                  id="spotlight"
                  name="Spotlight"
                  color="bg-white"
                  customIcon={
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-200 via-rose-200 to-amber-200 text-[11px] font-semibold uppercase tracking-[0.25em] text-rose-700">
                      Spot
                    </div>
                  }
                />
                <AppIcon
                  id="beacon"
                  name="Beacon"
                  color="bg-white"
                  customIcon={
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-200 via-sky-200 to-indigo-200 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-800">
                      SOS
                    </div>
                  }
                />
                <AppIcon
                  id="matcha"
                  name="Matcha"
                  color="bg-white"
                  externalUrl="https://trymatcha.ai/"
                  customIcon={
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200 via-lime-200 to-amber-100 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-800">
                      AI
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
          <motion.div className="absolute inset-0 flex flex-col px-6 pt-8 pb-6">
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
