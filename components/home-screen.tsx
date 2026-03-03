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
  revealApps?: boolean
}

export function HomeScreen({ time, revealApps = false }: HomeScreenProps) {
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
              <div className="grid grid-cols-4 gap-4 mt-2 mb-1">
                <AppIcon
                  id="axlora"
                  name="Axlora"
                  color="bg-white"
                  reveal={revealApps}
                  revealIndex={0}
                  customIcon={
                    renderCompanyLogo(AxloraLogo, "Axlora logo", { priority: true })
                  }
                />
                <AppIcon
                  id="goldman"
                  name="Goldman Sachs"
                  color="bg-white"
                  reveal={revealApps}
                  revealIndex={1}
                  customIcon={
                    renderCompanyLogo(GoldmanLogo, "Goldman Sachs logo", { borderless: true })
                  }
                />
                <AppIcon
                  id="bostondynamics"
                  name="Boston Dynamics"
                  color="bg-white"
                  reveal={revealApps}
                  revealIndex={2}
                  customIcon={
                    renderCompanyLogo(BostonDynamicsLogo, "Boston Dynamics logo")
                  }
                />
                <AppIcon
                  id="matcha"
                  name="Matcha"
                  color="bg-white"
                  reveal={revealApps}
                  revealIndex={3}
                  externalUrl="https://trymatcha.ai/"
                  customIcon={
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200 via-lime-200 to-amber-100 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-800">
                      AI
                    </div>
                  }
                />
              </div>

              <div className="mt-3">
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

              <div className="mt-4 grid grid-cols-4 gap-4 mb-2">
                <AppIcon
                  id="christmas"
                  name="Lights"
                  color="bg-white"
                  reveal={revealApps}
                  revealIndex={4}
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
                  reveal={revealApps}
                  revealIndex={5}
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
                  reveal={revealApps}
                  revealIndex={6}
                  customIcon={
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-200 via-sky-200 to-indigo-200 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-800">
                      SOS
                    </div>
                  }
                />
                <AppIcon
                  id="prate"
                  name="PRate"
                  color="bg-white"
                  reveal={revealApps}
                  revealIndex={7}
                  externalUrl="https://prateapp.com/"
                  customIcon={
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-orange-200 via-rose-200 to-fuchsia-200 text-[11px] font-semibold uppercase tracking-[0.25em] text-rose-700">
                      PR
                    </div>
                  }
                />
              </div>

              <div className="mt-1 mb-3">
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
                  reveal={revealApps}
                  revealIndex={8}
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
                  reveal={revealApps}
                  revealIndex={9}
                  customIcon={
                    <div
                      className={`${companyIconBase} bg-gradient-to-br from-sky-200 via-purple-200 to-indigo-200 text-indigo-700`}
                    >
                      UWC
                    </div>
                  }
                />
              </div>
              <div className="mt-auto" />
          </motion.div>
        )}

        {currentPage === 1 && (
          <motion.div className="absolute inset-0 flex flex-col px-6 pt-8 pb-6">
              {/* Second page app icons */}
              <div className="grid grid-cols-4 gap-4">
                <AppIcon id="maps" name="Maps" color="" reveal={revealApps} revealIndex={10} />
                <AppIcon id="notes" name="Notes" color="bg-yellow-100" reveal={revealApps} revealIndex={11} />
                <AppIcon id="camera" name="Camera" color="" reveal={revealApps} revealIndex={12} />
                <AppIcon
                  id="linkedin"
                  name="LinkedIn"
                  color=""
                  reveal={revealApps}
                  revealIndex={13}
                  customIcon={
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#0A66C2] text-xl font-semibold text-white">
                      in
                    </div>
                  }
                />
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
        <AppIcon
          id="calendar"
          name="Calendar"
          color="bg-gradient-to-b from-red-500 to-orange-400"
          reveal={revealApps}
          revealIndex={14}
        />
        <AppIcon id="safari" name="Safari" color="" reveal={revealApps} revealIndex={15} />
        <AppIcon
          id="mail"
          name="Mail"
          color="bg-blue-500"
          externalUrl="mailto:hello@stephaniegao.com"
          reveal={revealApps}
          revealIndex={16}
        />
        <AppIcon id="spotify" name="Spotify" color="" reveal={revealApps} revealIndex={17} />
      </div>
    </div>
  )
}
