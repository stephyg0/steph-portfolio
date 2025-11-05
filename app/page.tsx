"use client"

import { useState, useEffect } from "react"
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
import { ParticleBackground } from "@/components/particle-background"

export default function IPhoneInterface() {
  const { currentApp } = useAppState()
  const [time, setTime] = useState(new Date())
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-[#050816] dark:text-slate-100">
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(67,56,202,0.22),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(236,72,153,0.15),_transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,_rgba(236,72,153,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(79,70,229,0.05)_0deg,rgba(236,72,153,0.05)_120deg,rgba(59,130,246,0.05)_240deg,rgba(79,70,229,0.05)_360deg)]" />

        <svg className="absolute left-1/2 top-[-120px] h-[700px] w-[700px] -translate-x-1/2 opacity-60 dark:opacity-40" viewBox="0 0 600 600">
          <defs>
            <linearGradient id="hero-grid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(99,102,241,0.3)" />
              <stop offset="100%" stopColor="rgba(236,72,153,0.25)" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#hero-grid)" strokeWidth="0.7">
            {Array.from({ length: 15 }).map((_, i) => (
              <circle
                key={`outer-${i}`}
                cx="300"
                cy="300"
                r={40 * (i + 1)}
                opacity={0.7 - i * 0.04}
              />
            ))}
          </g>
        </svg>

        <div className="absolute inset-0 backdrop-blur-[70px]" />
      </div>

      <ParticleBackground />
      <div className="relative z-10 px-6 pb-24 pt-10 sm:px-10 lg:px-16">
        <header className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-3xl border border-white/40 bg-white/70 px-6 py-4 shadow-lg shadow-indigo-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 lg:flex-row lg:items-center lg:justify-between">
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
            <Button variant="ghost" asChild className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200 sm:inline-flex">
              <a href="mailto:hello@stephaniegao.com">Say hello</a>
            </Button>
          </div>
        </header>

        <section
          id="overview"
          className="mx-auto mt-16 flex w-full max-w-6xl flex-col-reverse items-center gap-12 lg:flex-row lg:items-start lg:justify-between"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex w-full max-w-2xl flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center self-start rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10">
                Strategic product leadership
              </span>
              <motion.h1
                layout
                className="text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Stephanie Gao
              </motion.h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                I partner with founders and enterprise teams to uncover nuanced stories, prototype quickly, and launch
                experiences that feel inevitable. Currently shipping healthcare AI at Axlora, previously growth at
                Goldman Sachs and robotics storytelling across TELUS Spark and Boston Dynamics.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" asChild className="min-w-[200px]">
                <a href="https://calendly.com/stephaniesgao/new-meeting" target="_blank" rel="noopener noreferrer">
                  Schedule a coffee chat
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="min-w-[200px]">
                <Link href="#work">Explore my work</Link>
              </Button>
            </div>

            <div className="grid w-full gap-4 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-indigo-500/10 backdrop-blur dark:border-white/10 dark:bg-white/5 sm:grid-cols-3">
              {[{ label: "Years shipping", value: "6" }, { label: "Apps & launches", value: "20+" }, { label: "Team pods led", value: "7" }].map((item) => (
                <div key={item.label} className="space-y-2">
                  <p className="text-3xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
              <span>Trusted by teams at</span>
              <span className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 shadow dark:bg-white/10">Axlora</span>
              <span className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 shadow dark:bg-white/10">Goldman Sachs</span>
              <span className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 shadow dark:bg-white/10">Boston Dynamics</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-[28rem]"
          >
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-white/70 to-white/30 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl dark:from-white/10 dark:to-white/5" />
            <IPhoneFrame>
              <SwipeDetector>
                <div className="relative h-full overflow-hidden pt-12">
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
                        <HomeScreen time={time} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <ControlCenter />
                </div>
              </SwipeDetector>
            </IPhoneFrame>
          </motion.div>
        </section>

        <motion.section
          id="work"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
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
              <motion.article
                key={item.title}
                whileHover={{ y: -6 }}
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
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="process"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
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
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white shadow-xl shadow-indigo-500/30"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-white/80">Latest note</p>
                <p className="mt-3 text-lg font-semibold">
                  "Complex systems deserve quiet, intentional interfaces. When we pair rigor with empathy, the tech fades and
                  the story shines."
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
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
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
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
        </motion.section>
      </div>
    </main>
  )
}
