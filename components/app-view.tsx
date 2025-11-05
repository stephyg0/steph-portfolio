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
import AxloraLogo from "@/assets/AXLORA.jpeg"
import GoldmanLogo from "@/assets/GOLDMAN.png"
import FirstLogo from "@/assets/FIRST.jpg"
import BostonDynamicsLogo from "@/assets/BD.png"
import UnitreeLogo from "@/assets/UNITREE.png"

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
    const experienceApps: Record<string, JSX.Element> = {
      axlora: (
        <ExperienceApp
          company="Axlora"
          logo={AxloraLogo}
          role="Lead Product Manager"
          timeframe="2023 - Present"
          location="Toronto, ON"
          description="Partnering with clinicians and ML researchers to ship explainable AI tools that bring diagnostic insights to the point of care."
          focusAreas={["Clinical AI", "Workflow automation", "Launch strategy"]}
          highlights={[
            { label: "Speed to insight", value: "38% faster diagnostic workflows across pilot hospitals." },
            { label: "Teams coordinated", value: "4 cross-functional pods spanning ML, product, and design." },
            { label: "Platforms", value: "iPad and web experiences tuned for clinical rounds." },
          ]}
        />
      ),
      goldman: (
        <ExperienceApp
          company="Goldman Sachs - Marcus"
          logo={GoldmanLogo}
          role="Product Manager, Growth"
          timeframe="2021 - 2022"
          location="New York, NY"
          description="Scaled lifecycle experiments and mobile experience improvements that increased activation for Marcus high-yield savings."
          focusAreas={["Lifecycle experiments", "Mobile banking", "Acquisition"]}
          highlights={[
            { label: "Conversion lift", value: "2.1x increase in funded accounts from onboarding refresh." },
            { label: "Experiment cadence", value: "Launched 20+ experiments per quarter with shared dashboards." },
            { label: "Cross-team alignment", value: "Unified design, compliance, and servicing stakeholders." },
          ]}
        />
      ),
      first: (
        <ExperienceApp
          company="FIRST Robotics"
          logo={FirstLogo}
          role="Technical Mentor"
          timeframe="2018 - 2021"
          location="Calgary, AB"
          description="Guided student-led teams through end-to-end robotics builds, emphasizing storytelling, systems thinking, and inclusive leadership."
          focusAreas={["STEM mentorship", "Robotics", "Program design"]}
          highlights={[
            { label: "Students coached", value: "Supported 60+ students across build seasons." },
            { label: "Curriculum", value: "Introduced prototyping sprints and design reviews mirrored on industry rituals." },
            { label: "Awards", value: "Helped teams achieve regional innovation and impact recognition." },
          ]}
        />
      ),
      bostondynamics: (
        <ExperienceApp
          company="Boston Dynamics"
          logo={BostonDynamicsLogo}
          role="Product Strategist in Residence"
          timeframe="2020"
          location="Boston, MA"
          description="Explored human-robot interaction pilots for Spot deployments, translating field learnings into roadmap bets."
          focusAreas={["Robotics", "Field research", "Human-centered design"]}
          highlights={[
            { label: "Pilot programs", value: "Mapped deployment playbooks across 3 industrial partners." },
            { label: "Insight synthesis", value: "Codified operator feedback loops into product briefs." },
            { label: "Enablement", value: "Developed onboarding toolkit for customer success teams." },
          ]}
        />
      ),
      unitree: (
        <ExperienceApp
          company="Unitree Robotics"
          logo={UnitreeLogo}
          role="Advisor, Developer Ecosystem"
          timeframe="2022 - 2023"
          location="Remote"
          description="Supported the expansion of the Unitree developer ecosystem with rapid prototyping kits and community showcases."
          focusAreas={["Platform ecosystem", "Developer experience", "Rapid prototyping"]}
          highlights={[
            { label: "Community growth", value: "Activated 1.5x increase in developer signups post toolkit launch." },
            { label: "Showcases", value: "Produced quarterly demo days highlighting robotics use cases." },
            { label: "Tooling", value: "Released open-source starter packs for autonomy experiments." },
          ]}
        />
      ),
    }

    if (experienceApps[appId]) {
      return experienceApps[appId]
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
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full bg-white text-black p-6">
            <div className="text-2xl font-bold mb-4">{appId.charAt(0).toUpperCase() + appId.slice(1)} App</div>
            <div className="text-sm text-gray-500">This is a placeholder for the {appId} app</div>
          </div>
        )
    }
  }

  const showHeader = !["camera", "messages", "photos", "notes", "safari", "phone", "spotify"].includes(appId)

  return (
    <HomeIndicator>
      <div className="h-full w-full bg-white flex flex-col">
        {showHeader && (
          <div className="flex items-center px-4 py-3 border-b mt-12">
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleBackClick} className="text-blue-500 z-40">
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
            <div className="text-center flex-1 font-semibold -ml-5">
              {appId.charAt(0).toUpperCase() + appId.slice(1)}
            </div>
          </div>
        )}

        <div className={`flex-1 overflow-auto ${!showHeader ? "pt-0" : ""}`}>{renderApp()}</div>
      </div>
    </HomeIndicator>
  )
}
