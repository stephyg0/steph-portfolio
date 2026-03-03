"use client"

import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { HomeScreen } from "@/components/home-screen"
import { AppView } from "@/components/app-view"
import { useAppState } from "@/lib/app-state"
import { MoonIcon, SunIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { IPhoneFrame } from "@/components/iphone-frame"
import { ControlCenter } from "@/components/control-center/control-center"
import { SwipeDetector } from "@/components/swipe-detector"
import { DynamicGradientBackground } from "@/components/dynamic-gradient-background"

export default function IPhoneInterface() {
  const { currentApp } = useAppState()
  const [time, setTime] = useState(new Date())
  const { theme, setTheme } = useTheme()
  const [unlocked, setUnlocked] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)
  const [error, setError] = useState("")
  const [unlockProgress, setUnlockProgress] = useState(0)
  const [hydrated, setHydrated] = useState(false)
  const lockPhoneRef = useRef<HTMLDivElement | null>(null)
  const portfolioPhoneRef = useRef<HTMLDivElement | null>(null)
  const [phoneTarget, setPhoneTarget] = useState({ x: 0, y: 0, scale: 1 })
  const [phoneTargetReady, setPhoneTargetReady] = useState(false)
  const [revealApps, setRevealApps] = useState(false)
  const [lockScreenHidden, setLockScreenHidden] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    setUnlocked(false)
    setIntroComplete(false)
    setUnlockProgress(0)
    setError("")
  }, [])

  useEffect(() => {
    if (!unlocked) {
      setIntroComplete(false)
      setUnlockProgress(0)
      setError("")
    }
  }, [unlocked])

  useEffect(() => {
    setIntroComplete(false)
    setUnlockProgress(0)
    setError("")
    setRevealApps(false)
    setLockScreenHidden(false)
  }, [])

  useLayoutEffect(() => {
    if (!unlocked) {
      setPhoneTarget({ x: 0, y: 0, scale: 1 })
      setPhoneTargetReady(false)
      setRevealApps(false)
      setLockScreenHidden(false)
      return
    }

    const measure = () => {
      const from = lockPhoneRef.current?.getBoundingClientRect()
      const to = portfolioPhoneRef.current?.getBoundingClientRect()
      if (!from || !to) return

      setPhoneTarget({
        x: to.left - from.left,
        y: to.top - from.top,
        scale: from.width ? to.width / from.width : 1,
      })
      setPhoneTargetReady(true)
    }

    const raf = requestAnimationFrame(measure)
    window.addEventListener("resize", measure)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", measure)
    }
  }, [unlocked])

  useEffect(() => {
    if (!introComplete) {
      setRevealApps(false)
      setLockScreenHidden(false)
      return
    }

    const hideTimer = setTimeout(() => {
      setLockScreenHidden(true)
    }, 120)

    const revealTimer = setTimeout(() => {
      setRevealApps(true)
    }, 520)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(revealTimer)
    }
  }, [introComplete])

  useEffect(() => {
    document.documentElement.dataset.portfolioBg = "true"
    return () => {
      delete document.documentElement.dataset.portfolioBg
    }
  }, [])

  const code = ["S", "T", "E", "P", "H"]

  const handleBubbleClick = (letter: string, index: number) => {
    if (index !== unlockProgress || letter !== code[index]) {
      setUnlockProgress(0)
      setError("Hint: my name is Stephanie but you can call me ___")
      return
    }
    const nextProgress = unlockProgress + 1
    setUnlockProgress(nextProgress)
    setError("")
    if (nextProgress >= code.length) {
      setTheme("dark")
      setUnlocked(true)
    }
  }

  const lockScreen = (
    <motion.main
      className="absolute inset-0 z-50 overflow-hidden bg-[#0b0f1c] text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: introComplete ? 0 : 1 }}
      transition={{ duration: 0.35, delay: introComplete ? 0.9 : 0, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: introComplete ? "none" : "auto" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,150,200,0.22),_transparent_60%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <motion.div
          ref={lockPhoneRef}
          animate={{
            x: unlocked && phoneTargetReady ? phoneTarget.x : 0,
            y: unlocked && phoneTargetReady ? phoneTarget.y : 0,
            scale: unlocked && phoneTargetReady ? phoneTarget.scale : 1,
          }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            if (unlocked && phoneTargetReady) setIntroComplete(true)
          }}
          className="w-[340px] rounded-[68px] bg-black/50 p-2 ring-2 ring-white/40 shadow-[0_45px_140px_rgba(15,23,42,0.8)] sm:w-[400px]"
        >
          <IPhoneFrame
            className="w-full max-w-[400px] aspect-[375/740]"
            inset={8}
            insetTop={0}
            insetLeft={0}
            insetRight={0}
          >
            <div className="relative h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]">
              <div className="absolute inset-0 bg-[url('/Wallpaper.JPG')] bg-cover bg-center opacity-95" />
              <motion.div
                className="absolute inset-0 bg-slate-900/35 backdrop-blur-md"
                animate={{ opacity: unlocked ? 0 : 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              />
              <motion.div
                className="relative z-10 flex h-full flex-col items-center px-8 pb-12 pt-14 text-white"
                animate={{ opacity: lockScreenHidden ? 0 : 1, scale: lockScreenHidden ? 1.02 : 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mt-4 flex flex-col items-center gap-3 blur-[1.6px]">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">Steph's portfolio</p>
                  <p className="text-5xl font-semibold tabular-nums" suppressHydrationWarning>
                    {hydrated ? time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "—:—"}
                  </p>
                  <p className="text-sm text-white/75" suppressHydrationWarning>
                    {hydrated ? time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) : ""}
                  </p>
                </div>

                <motion.div
                  className="flex w-full flex-col items-center gap-4 mt-16"
                  animate={{ opacity: unlocked ? 0 : 1, y: unlocked ? 24 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                  <p className="text-sm uppercase tracking-[0.35em] text-white/70">Enter passcode</p>
                  <div className="flex items-center gap-3">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const filled = index < unlockProgress
                      return (
                        <span
                          key={`passcode-dot-${index}`}
                          className={`h-2.5 w-2.5 rounded-full border border-white/50 ${
                            filled ? "bg-white" : "bg-white/10"
                          }`}
                        />
                      )
                    })}
                  </div>
                  <div className="flex w-full flex-col items-center gap-4">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { letter: "T", key: "t" },
                        { letter: "", key: "blank-2" },
                        { letter: "S", key: "s" },
                        { letter: "", key: "blank-4" },
                        { letter: "E", key: "e" },
                        { letter: "", key: "blank-6" },
                        { letter: "H", key: "h" },
                        { letter: "", key: "blank-8" },
                        { letter: "P", key: "p" },
                      ].map((item) => {
                        const isLetter = Boolean(item.letter)
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => isLetter && handleBubbleClick(item.letter, code.indexOf(item.letter))}
                            className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/15 text-lg font-semibold text-white shadow-lg backdrop-blur transition ${
                              isLetter ? "hover:bg-white/25" : "pointer-events-none opacity-40"
                            }`}
                            aria-label={isLetter ? `Letter ${item.letter}` : "Empty passcode bubble"}
                          >
                            {item.letter || "•"}
                          </button>
                        )
                      })}
                    </div>
                    <button
                      type="button"
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/15 text-lg font-semibold text-white shadow-lg backdrop-blur opacity-40"
                      aria-label="Empty passcode bubble"
                    >
                      •
                    </button>
                  </div>
                  {error && <p className="text-xs uppercase tracking-[0.3em] text-rose-200">{error}</p>}
                </motion.div>
                <motion.div
                  className="mt-auto w-full px-2 text-xs uppercase tracking-[0.3em] text-white/70"
                  animate={{ opacity: unlocked ? 0 : 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                >
                  <div className="flex items-center justify-between">
                    <span>Emergency</span>
                    <span>Delete</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </IPhoneFrame>
        </motion.div>
      </div>
    </motion.main>
  )

  const portfolioScreen = (
    <motion.main
      className="portfolio-screen relative min-h-screen w-full overflow-hidden text-slate-900 transition-colors duration-500 dark:text-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: introComplete ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: introComplete ? "auto" : "none" }}
    >
      <motion.div
        className="relative z-10 px-6 pb-24 pt-6 sm:px-10 lg:px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.header
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: introComplete ? 1 : 0, x: introComplete ? 0 : -24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-3xl border border-white/40 bg-white/70 px-6 py-4 shadow-lg shadow-indigo-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white dark:bg-white dark:text-slate-900">
              SG
            </span>
            <div>
              <p className="text-sm font-semibold">Stephanie Gao</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Product leadership · Robotics storytelling</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#overview" className="transition hover:text-indigo-500 dark:hover:text-indigo-200">
              Overview
            </a>
            <a href="#work" className="transition hover:text-indigo-500 dark:hover:text-indigo-200">
              Work
            </a>
            <a href="#process" className="transition hover:text-indigo-500 dark:hover:text-indigo-200">
              Process
            </a>
            <a href="#contact" className="transition hover:text-indigo-500 dark:hover:text-indigo-200">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="!rounded-full"
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </motion.header>

        <section
          id="overview"
          className="mx-auto mt-16 flex w-full max-w-6xl flex-col-reverse items-center gap-12 lg:flex-row lg:items-start lg:justify-between"
        >
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: introComplete ? 1 : 0, x: introComplete ? 0 : -32 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="flex w-full max-w-2xl flex-col gap-8 lg:pt-6"
          >
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center self-start rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10">
                Strategic product leadership
              </span>
              <motion.h1
                layout
                className="mt-5 mb-6 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:mt-6 sm:mb-8 sm:text-5xl md:text-6xl dark:text-white"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Stephanie Gao
              </motion.h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                Curious about tech. Obsessed with building.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" asChild className="min-w-[200px]">
                <a href="https://calendly.com/stephaniesgao/new-meeting" target="_blank" rel="noopener noreferrer">
                  Schedule a coffee chat
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="min-w-[200px]">
                <Link href="#work">Resume</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: unlocked ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="relative w-full max-w-[28rem]"
          >
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-white/70 to-white/30 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl dark:from-white/10 dark:to-white/5" />
            <motion.div
              ref={portfolioPhoneRef}
              className="w-[340px] rounded-[68px] bg-black/50 p-2 ring-2 ring-white/20 shadow-[0_35px_120px_rgba(15,23,42,0.6)] sm:w-[400px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: unlocked ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              <IPhoneFrame
                className="w-full max-w-[400px] aspect-[375/740]"
                inset={8}
                insetTop={0}
                insetLeft={0}
                insetRight={0}
              >
                <SwipeDetector>
                  <motion.div
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: introComplete ? 1 : 0, scale: introComplete ? 1 : 1.06 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
                    className="relative h-full overflow-hidden pt-12"
                  >
                    <AnimatePresence mode="wait">
                      {currentApp ? (
                        <motion.div
                          key={`app-${currentApp}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 rounded-[26px]"
                        >
                          <AppView appId={currentApp} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="home-screen"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 rounded-[26px]"
                          style={{
                            backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iOS18-Azure-9Ax4tYYD2NK3Y9BWyohSWE63jMX9eo.webp)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <HomeScreen time={time} revealApps={revealApps} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      className="absolute inset-0 z-20 rounded-[26px]"
                      initial={false}
                      animate={{ opacity: revealApps ? 0 : 1 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ pointerEvents: "none" }}
                    >
                      <div className="absolute inset-0 bg-slate-900/45" />
                    </motion.div>

                    <ControlCenter />
                  </motion.div>
                </SwipeDetector>
              </IPhoneFrame>
            </motion.div>
          </motion.div>
        </section>

        <section
          id="work"
          className="mx-auto mt-24 w-full max-w-6xl rounded-3xl border border-white/60 bg-white/80 p-10 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">Featured work snapshots</h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                Highlights across healthcare, financial services, and robotics where a mix of research, experimentation,
                and storytelling unlocked measurable outcomes.
              </p>
            </div>
            <a
              href="mailto:hello@stephaniegao.com"
              className="text-sm font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-300"
            >
              Request full case studies
            </a>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Axlora",
                subtitle: "Healthcare AI",
                description:
                  "Accelerated clinician diagnosis workflows by 38% with explainable AI insights woven into iPad rounds.",
                badge: "Product Strategy | 2024",
                gradient: "from-purple-500 via-indigo-500 to-cyan-500",
              },
              {
                title: "Goldman Sachs",
                subtitle: "Digital Banking",
                description:
                  "Launched experiment velocity for Marcus mobile, doubling funded accounts via onboarding segmentation.",
                badge: "Lifecycle Growth | 2022",
                gradient: "from-amber-500 via-orange-500 to-rose-500",
              },
              {
                title: "Boston Dynamics",
                subtitle: "Robotics Education",
                description:
                  "Designed interactive demos and curriculum that brought Spot to 8k+ students through narrative-driven play.",
                badge: "Robotics Storytelling | 2021",
                gradient: "from-emerald-500 via-teal-500 to-sky-500",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="group flex flex-col justify-between rounded-2xl border border-white/40 bg-white p-6 shadow-xl transition dark:border-white/10 dark:bg-white/5"
              >
                <div>
                  <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-black/60 dark:bg-white/10 dark:text-white/70">
                    {item.badge}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-300">{item.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
                <div className={`mt-6 h-1 w-full rounded-full bg-gradient-to-r ${item.gradient} transition-all group-hover:h-1.5`} />
              </article>
            ))}
          </div>
        </section>

        <section
          id="process"
          className="mx-auto mt-20 w-full max-w-6xl"
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-6 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl shadow-indigo-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">How I partner with teams</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  {
                    title: "Find the sharp story",
                    description: "Synthesize qual research, data signals, and market context into a narrative everyone rallies around.",
                  },
                  {
                    title: "Prototype with intent",
                    description: "Co-build Figma, front-end, or robotics demos that expose unknowns quickly and inspire stakeholders.",
                  },
                  {
                    title: "Launch measurable bets",
                    description: "Stand up experiment loops, dashboards, and rituals that make impact transparent.",
                  },
                  {
                    title: "Enable teams to own it",
                    description: "Codify operating guides, playbooks, and onboarding so work keeps compounding after handoff.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-inner dark:border-white/10 dark:bg-white/5">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex h-full flex-col justify-between gap-4">
              <div
                className="rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white shadow-xl shadow-indigo-500/30"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-white/80">Latest note</p>
                <p className="mt-3 text-lg font-semibold">
                  "Complex systems deserve quiet, intentional interfaces. When we pair rigor with empathy, the tech fades and
                  the story shines."
                </p>
              </div>
              <div
                className="flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/80 p-8 text-slate-900 shadow-xl shadow-indigo-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-200">
                    Collaboration snapshot
                  </p>
                  <p className="mt-2 text-base">
                    Coaching women-led founding teams at House of Leaders through their first roadmap and launch metrics.
                  </p>
                </div>
                <Button
                  variant="outline"
                  asChild
                  className="self-start rounded-full border-white/40 bg-white/60 backdrop-blur dark:border-white/10 dark:bg-white/10"
                >
                  <Link href="https://www.linkedin.com/in/stephaniegao" target="_blank">
                    Connect on LinkedIn
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto mt-24 w-full max-w-6xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 p-10 text-white shadow-2xl backdrop-blur-xl dark:border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent)]" />
            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/70">Let’s build together</p>
                <h2 className="mt-3 text-3xl font-semibold">Ready to evolve your next product bet?</h2>
                <p className="mt-3 text-sm text-white/80">
                  Drop a note if you’re seeking an embedded leader across research, product strategy, or robotics-focused
                  storytelling. I take on a limited number of collaborations each quarter.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-white/90">
                  <a href="mailto:hello@stephaniegao.com">Email stephanie@stephaniegao.com</a>
                </Button>
                <Button variant="outline" asChild size="lg" className="border-white/60 text-white hover:bg-white/10">
                  <Link href="https://www.linkedin.com/in/stephaniesgao/" target="_blank">
                    Continue on LinkedIn
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </motion.main>
  )

  return (
    <>
      <DynamicGradientBackground />
      <motion.div
        className="fixed inset-0 z-0 bg-slate-950 dark:bg-black"
        initial={false}
        animate={{ opacity: unlocked ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: "none" }}
      />
      {lockScreen}
      {unlocked && portfolioScreen}
    </>
  )
}
