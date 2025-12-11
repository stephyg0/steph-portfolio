"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Clock } from "@/components/clock"
import { Settings } from "@/components/settings"
import { Weather } from "@/components/weather"
import { Calendar } from "@/components/calendar"
import { Camera } from "@/components/camera"
import { Photos } from "@/components/photos"
import { NotesApp } from "@/components/notes/notes-app"
import { useAppState } from "@/lib/app-state"
import { HomeIndicator } from "@/components/home-indicator"
import { MessagesApp } from "@/components/messages/messages-app"
import { SafariApp } from "@/components/safari/safari-app"
import { MusicApp } from "@/components/music/music-app"
import { PhoneApp } from "@/components/phone/phone-app"
import { ExperienceApp } from "@/components/experience-app"
import { EducationApp } from "@/components/education-app"
import { ProjectsApp } from "@/components/projects-app"
import { BeaconApp } from "@/components/beacon-app"
import AxloraLogo from "@/assets/AXLORA.jpeg"
import GoldmanLogo from "@/assets/GOLDMAN.png"
import BostonDynamicsLogo from "@/assets/BD.png"
import { LinkedInApp } from "@/components/linkedin-app"

interface AppViewProps {
  appId: string
}

export function AppView({ appId }: AppViewProps) {
  const { closeApp } = useAppState()

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    closeApp()
  }

  const renderApp = () => {
    const contentApps: Record<string, JSX.Element> = {
      axlora: (
        <ExperienceApp
          company="Axlora"
          logo={AxloraLogo}
          role="Technical Project Management Intern"
          timeframe="May 2025 - Aug 2025"
          location="San Francisco, CA"
          description="Led enterprise-scale delivery while owning key surfaces across the Next.js front-end and Convex-powered backend."
          focusAreas={["Project leadership", "Next.js & TypeScript", "Convex infrastructure"]}
          highlights={[
            {
              label: "Enterprise delivery",
              value:
                "Coordinated 20+ customer workstreams with engineering, legal, and compliance to achieve 100% on-time frameworks.",
            },
            {
              label: "Product development",
              value:
                "Built authenticated onboarding flows with Next.js, TypeScript, and Convex to elevate customer engagement.",
            },
            {
              label: "Reliability",
              value:
                "Maintained Convex data architecture with automated sync and real-time updates to sustain 99.9% uptime.",
            },
          ]}
        />
      ),
      goldman: (
        <ExperienceApp
          company="Goldman Sachs Possibilities Summit"
          logo={GoldmanLogo}
          role="Scholar"
          timeframe="Jan 2025 - May 2025"
          location="San Francisco, CA"
          description="Selected for a competitive engineering apprenticeship focused on leadership, security, risk, and cloud systems."
          focusAreas={["Leadership development", "Security & risk", "Cloud infrastructure"]}
          highlights={[
            {
              label: "Apprenticeship",
              value:
                "Completed Goldman Sachs' immersive program blending technical deep dives with mentorship from engineering leaders.",
            },
            {
              label: "Industry exposure",
              value:
                "Partnered with security, risk, and cloud teams to explore resiliency practices behind large-scale platforms.",
            },
            {
              label: "Skill growth",
              value:
                "Advanced data structures, systems design, and operations knowledge through Forage job simulations and workshops.",
            },
          ]}
        />
      ),
      bostondynamics: (
        <ExperienceApp
          company="Boston Dynamics"
          logo={BostonDynamicsLogo}
          role="Robot Operator & Science Guide Performer"
          timeframe="Jun 2023 - Aug 2024"
          location="Calgary, AB"
          description="Brought Spot robots to life for thousands of visitors while building educational programs around human-robot play."
          focusAreas={["STEM education", "Robotics operations", "Interactive storytelling"]}
          highlights={[
            {
              label: "STEM facilitation",
              value:
                "Delivered 100+ hours of lab demos, translating robotics concepts for 150+ curious learners every day.",
            },
            {
              label: "Spot programming",
              value:
                "Co-programmed sensor-reactive fetch games and Scratch-based learning tools for Boston Dynamics Spot.",
            },
            {
              label: "Operational leadership",
              value:
                "Served as the first Unitree operator at TELUS Spark and authored the training manual adopted by future guides.",
            },
          ]}
        />
      ),
      minerva: (
        <EducationApp
          institution="Minerva University"
          location="San Francisco, CA"
          degree="B.A. Computer Science & Cognitive Science"
          timeframe="Undergraduate Studies"
          description="Immersive global undergraduate program blending computational thinking, cognitive science, and entrepreneurship."
          highlights={[
            {
              label: "GPA",
              value: "4.0/4.0 cumulative across the interdisciplinary core and major coursework.",
            },
            {
              label: "Coursework",
              value:
                "Modern Economic Thought · Single & Multivariate Calculus · Linear Algebra · Data Structures & Algorithms · Complex Systems · Formal & Empirical Analysis.",
            },
            {
              label: "Fellowships",
              value: "180 Degrees Consulting Fellow • AI Consensus Fellow.",
            },
          ]}
        />
      ),
      pearson: (
        <EducationApp
          institution="Pearson College UWC"
          location="Victoria, BC"
          degree="International Baccalaureate Diploma"
          timeframe="Grant MacEwan Scholar"
          description="Two-year residential program among 100+ nationalities focused on leadership, sustainability, and innovation."
          highlights={[
            {
              label: "Scholarship",
              value: "Awarded the Grant MacEwan Award—Canada's largest undergraduate scholarship—to attend Pearson College UWC.",
            },
            {
              label: "Leadership",
              value:
                "Led student-run ventures including Le Dép and Chic Boutique, funding wellness and arts initiatives while advancing sustainable fashion programs.",
            },
            {
              label: "Academic performance",
              value: "Ranked in the top 5% of IB students globally and mentored peers as an English language buddy.",
            },
          ]}
          extraNotes="Served as House Representative, Health & Wellness Assembly Representative, APAC Leader, Creative Director, and Student Representative for the Council of International Schools—championing community, wellbeing, and creative sustainability."
        />
      ),
      christmas: (
        <ProjectsApp
          name="North Star Lights"
          role="Solo Developer"
          timeframe="Holiday 2023"
          description="A multiplayer Christmas game where players sprint around a snowy 3D village, collect light shards, craft strands, and decorate neighborhood houses together."
          stack={["JavaScript", "Three.js", "WebSockets", "Node.js", "GLTF assets"]}
          highlights={[
            {
              label: "Realtime sync",
              value: "WebSocket state keeps player movement, shard spawns, and strand placements aligned under ~120ms latency.",
            },
            {
              label: "Gameplay loop",
              value: "Collect shards → craft light strands → wrap them onto houses to unlock festive effects and team bonuses.",
            },
            {
              label: "Holiday atmosphere",
              value: "Snowfall particles, reactive carol soundtrack, and emissive light strings that glow brighter as teams decorate.",
            },
          ]}
        />
      ),
      spotlight: (
        <ProjectsApp
          name="Spotlight Robotics Showcase"
          role="Creative Director"
          timeframe="2023"
          description="An interactive exhibition platform highlighting human-robot collaboration stories from TELUS Spark and Boston Dynamics pilots."
          stack={["Next.js", "Three.js", "Framer Motion", "Vercel"]}
          highlights={[
            {
              label: "Immersive storytelling",
              value: "Produced interactive timelines and 3D spot choreography viewed by 20k+ visitors during the museum residency.",
            },
            {
              label: "Content pipeline",
              value: "Built CMS that allowed educators to upload demos and reflections, automatically generating narrated spotlight reels.",
            },
            {
              label: "Impact",
              value: "Increased workshop signups by 2.4x and inspired new sponsorship from regional robotics clubs.",
            },
          ]}
        />
      ),
      beacon: <BeaconApp />,
    }

    if (contentApps[appId]) {
      return contentApps[appId]
    }

    switch (appId) {
      case "clock":
        return <Clock />
      case "settings":
        return <Settings />
      case "weather":
        return <Weather />
      case "calendar":
        return <Calendar />
      case "camera":
        return <Camera />
      case "photos":
        return <Photos />
      case "notes":
        return <NotesApp />
      case "messages":
        return <MessagesApp />
      case "safari":
        return <SafariApp />

      case "spotify":
        return <MusicApp />
      case "phone":
        return <PhoneApp />
      case "linkedin":
        return <LinkedInApp />
      default:
        return (
          <div className="flex h-full flex-col items-center justify-center bg-slate-50 p-6 text-slate-800 dark:bg-[#060712] dark:text-slate-100">
            <div className="mb-4 text-2xl font-bold">{appId.charAt(0).toUpperCase() + appId.slice(1)} App</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              This is a placeholder for the {appId} app
            </div>
          </div>
        )
    }
  }

  const showHeader = !["camera", "messages", "photos", "notes", "safari", "phone", "spotify"].includes(appId)

  return (
    <HomeIndicator>
      <motion.div
        initial={{ y: 36, scale: 0.88, borderRadius: 42 }}
        animate={{ y: 0, scale: 1, borderRadius: 32 }}
        exit={{ y: 24, scale: 0.94, opacity: 0.98 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full will-change-transform"
        style={{ transformOrigin: "50% 92%" }}
      >
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[32px] bg-gradient-to-br from-white/92 via-slate-100/90 to-white/88 text-slate-900 shadow-[0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-2xl transition-colors duration-300 dark:from-[#050714]/95 dark:via-[#040512]/92 dark:to-[#02030c]/94 dark:text-slate-100 dark:shadow-[0_28px_70px_rgba(1,3,12,0.55)]">
          {showHeader && (
            <div className="mt-12 flex items-center border-b px-4 py-3 dark:border-white/10">
              <motion.button whileTap={{ scale: 0.92 }} onClick={handleBackClick} className="text-blue-500 z-40">
                <ArrowLeft className="h-5 w-5" />
              </motion.button>
              <div className="-ml-5 flex-1 text-center font-semibold">
                {appId.charAt(0).toUpperCase() + appId.slice(1)}
              </div>
            </div>
          )}

          <div className={`flex-1 overflow-auto ${!showHeader ? "pt-0" : ""}`}>{renderApp()}</div>
        </div>
      </motion.div>
    </HomeIndicator>
  )
}
