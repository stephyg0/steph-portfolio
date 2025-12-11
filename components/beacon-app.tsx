"use client"

import { useEffect, useMemo, useState } from "react"

type Screen = "consumer" | "evac"
type Language = "en" | "ja"
type EventType = "satFix" | "packet" | "ack" | "sync" | "alert"
type EventLog = { id: string; time: string; type: EventType }
type Team = {
  name: string
  eta: string
  task: Record<Language, string>
  channel: string
  acknowledgement?: { time: string }
}

const translations: Record<
  Language,
  {
    consumerTab: string
    evacTab: string
    instructionHeading: string
    instructionBody: string
    alertButton: string
    rescueLabel: string
    evacTitle: string
    mapTitle: string
    mapMode: string
    mapStatusActive: string
    mapStatusIdle: string
    windStatus: string
    packetsHeading: string
    autoSyncPrefix: string
    priorityLabel: (level: 1 | 2) => string
    eventNotes: Record<EventType, string>
    finalMessageActive: string
    finalMessageIdle: string
    finalSubtext: string
    etaLabel: string
    languageToggle: string
    ackLabel: string
  }
> = {
  en: {
    consumerTab: "Consumer screen",
    evacTab: "Evacuation team",
    instructionHeading: "Emergency instruction",
    instructionBody:
      "There is a tsunami warning. Please seek high ground immediately and move toward the nearest evacuation center marked on your local signage.",
    alertButton: "Alert",
    rescueLabel: "Rescue operations",
    evacTitle: "Evac command · Kamaishi",
    mapTitle: "Live map · Kamaishi coastline",
    mapMode: "Thermal + GPS",
    mapStatusActive: "Beacon lock · 39.3°N",
    mapStatusIdle: "Listening · 39.3°N",
    windStatus: "Wind E/12kt · Tide rising",
    packetsHeading: "Packets + alerts",
    autoSyncPrefix: "Auto-sync",
    priorityLabel: (level) => `Priority ${level}`,
    eventNotes: {
      satFix: "Satellite fix locked · 39.3°N / 142.0°E",
      packet: "Vitals packet pushed to evac servers",
      ack: "Responder acknowledgement · 3 teams",
      sync: "Vitals + GPS packet synced",
      alert: "Beacon alert transmitted to evac command",
    },
    finalMessageActive: "Evac servers streaming telemetry every 90s.",
    finalMessageIdle: "Awaiting operator trigger to sync with evac servers.",
    finalSubtext: "Field units only see the alert control; operations receive vitals, GPS, and acknowledgements in real time.",
    etaLabel: "ETA",
    languageToggle: "EN / JP",
    ackLabel: "Ack",
  },
  ja: {
    consumerTab: "利用者画面",
    evacTab: "避難チーム",
    instructionHeading: "避難指示",
    instructionBody: "津波警報が発令されています。直ちに高台へ避難し、案内表示に従って最寄りの避難所へ向かってください。",
    alertButton: "警報",
    rescueLabel: "救助オペレーション",
    evacTitle: "避難指令 · 釜石",
    mapTitle: "ライブマップ · 釜石海岸線",
    mapMode: "サーマル + GPS",
    mapStatusActive: "ビーコン接続 · 北緯39.3°",
    mapStatusIdle: "待機中 · 北緯39.3°",
    windStatus: "風向 東 / 12kt · 満ち潮",
    packetsHeading: "パケット & アラート",
    autoSyncPrefix: "自動同期",
    priorityLabel: (level) => `優先度 ${level}`,
    eventNotes: {
      satFix: "衛星測位を取得 · 北緯39.3° 東経142.0°",
      packet: "バイタルを避難サーバーへ送信",
      ack: "救助チーム3隊が確認",
      sync: "バイタル + GPS パケットを同期",
      alert: "ビーコン警報を避難指令へ送信",
    },
    finalMessageActive: "避難サーバーが90秒ごとに受信中。",
    finalMessageIdle: "オペレーターの送信待ちです。",
    finalSubtext: "利用者はアラートのみ、管制はバイタル・GPS・レスポンスをリアルタイムで取得します。",
    etaLabel: "到着",
    languageToggle: "JP / EN",
    ackLabel: "確認",
  },
}

const baseTeams: Team[] = [
  {
    name: "Unit North",
    eta: "8 min",
    task: { en: "Drone recon", ja: "ドローン偵察" },
    channel: "UHF 04",
  },
  {
    name: "Harbor 3",
    eta: "12 min",
    task: { en: "Water ingress", ja: "浸水対策" },
    channel: "SATCOM",
  },
  {
    name: "Med Evac A",
    eta: "18 min",
    task: { en: "Vitals handoff", ja: "バイタル引き継ぎ" },
    channel: "LoRa mesh",
  },
]

const createBaseEvents = (): EventLog[] => [
  { id: "evt-1204", time: "12:04", type: "satFix" },
  { id: "evt-1205", time: "12:05", type: "packet" },
  { id: "evt-1207", time: "12:07", type: "ack" },
]

const formatTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

export function BeaconApp() {
  const [alertSent, setAlertSent] = useState(false)
  const [teams, setTeams] = useState<Team[]>(baseTeams)
  const [events, setEvents] = useState<EventLog[]>(() => createBaseEvents())
  const [syncCountdown, setSyncCountdown] = useState(90)
  const [screen, setScreen] = useState<Screen>("consumer")
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncCountdown((prev) => {
        if (prev <= 1) {
          const timestamp = Date.now()
          const entry: EventLog = {
            id: `sync-${timestamp}`,
            time: formatTime(),
            type: "sync",
          }
          setEvents((prevEvents) => [entry, ...prevEvents].slice(0, 5))
          return 90
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSendAlert = () => {
    if (alertSent) return
    const time = formatTime()
    setAlertSent(true)
    setTeams((prev) =>
      prev.map((team) => ({
        ...team,
        acknowledgement: { time },
      })),
    )
    setEvents((prev) => [
      {
        id: `alert-${Date.now()}`,
        time,
        type: "alert" as const,
      },
      ...prev,
    ].slice(0, 5))
  }

  const formattedCountdown = useMemo(() => {
    const minutes = Math.floor(syncCountdown / 60)
    const seconds = String(syncCountdown % 60).padStart(2, "0")
    return `${minutes}:${seconds}`
  }, [syncCountdown])

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[32px] bg-slate-950 text-white">
      <div className="flex flex-col flex-1 px-6 py-6 min-h-0">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="grid grid-cols-2 gap-2 rounded-full border border-white/20 bg-white/5 p-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
            {(["consumer", "evac"] as Screen[]).map((key) => (
              <button
                key={key}
                onClick={() => setScreen(key)}
                className={`rounded-full px-2 py-2 transition ${
                  screen === key ? "bg-white text-slate-900 shadow-lg" : "bg-transparent text-white/70"
                }`}
              >
                {key === "consumer" ? translations[language].consumerTab : translations[language].evacTab}
              </button>
            ))}
          </div>
          <button
            onClick={() => setLanguage((prev) => (prev === "en" ? "ja" : "en"))}
            className="rounded-full border border-white/30 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:bg-white/10"
          >
            {translations[language].languageToggle}
          </button>
        </div>

        {screen === "consumer" ? (
          <section className="flex flex-1 min-h-0 flex-col gap-6 overflow-y-auto rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-left shadow-inner shadow-slate-900/20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
                {translations[language].instructionHeading}
              </p>
              <p className="mt-2 text-sm text-white/80">{translations[language].instructionBody}</p>
            </div>
            <div className={`flex justify-center ${language === "ja" ? "flex-1 items-center" : "mt-auto py-8"}`}>
              <button
                onClick={handleSendAlert}
                disabled={alertSent}
                aria-label={alertSent ? "Alert already sent" : "Send alert"}
                className={`h-52 w-52 rounded-full text-xl font-semibold uppercase tracking-[0.45em] shadow-[0_30px_80px_rgba(37,99,235,0.45)] transition focus:outline-none focus:ring-4 focus:ring-white/70 ${
                  alertSent ? "bg-white/15 text-white/70" : "bg-white text-slate-900 hover:scale-105"
                }`}
              >
                {translations[language].alertButton}
              </button>
            </div>
          </section>
        ) : (
          <section className="flex flex-1 min-h-0 flex-col overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(2,6,23,0.45)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{translations[language].rescueLabel}</p>
                <h2 className="mt-2 text-lg font-semibold">{translations[language].evacTitle}</h2>
              </div>
              <div className="rounded-full border border-amber-200/40 px-3 py-1 text-xs font-semibold text-amber-100">
                {alertSent ? translations[language].priorityLabel(1) : translations[language].priorityLabel(2)}
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-b from-slate-800 to-slate-950/90 p-4">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>{translations[language].mapTitle}</span>
                <span>{translations[language].mapMode}</span>
              </div>
              <div className="relative mt-3 h-48 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.3),transparent),radial-gradient(circle_at_80%_30%,rgba(129,140,248,0.25),transparent)]">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full text-cyan-200/80">
                  <path
                    d="M15,50 C60,30 110,20 150,40 C190,60 215,90 245,80 C275,70 290,90 305,120 L305,180 L15,180 Z"
                    fill="url(#coastline)"
                    opacity="0.15"
                  />
                  <path
                    d="M20,140 C60,110 110,100 150,120 C190,140 230,150 300,130"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                  />
                  <circle cx="210" cy="110" r="6" fill="#fcd34d" />
                  <circle cx="270" cy="125" r="4" fill="#c084fc" />
                  <circle cx="150" cy="95" r="4" fill="#22d3ee" />
                  <defs>
                    <linearGradient id="coastline" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-xs font-semibold text-white/80">
                  <span>{alertSent ? translations[language].mapStatusActive : translations[language].mapStatusIdle}</span>
                  <span>{translations[language].windStatus}</span>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                <span>{translations[language].packetsHeading}</span>
                <span>
                  {translations[language].autoSyncPrefix} {formattedCountdown}
                </span>
              </div>
              <div className="mt-3 max-h-48 space-y-3 overflow-y-auto pr-1">
                {events.map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
                    <div className="text-sm font-semibold text-white/70">{entry.time}</div>
                    <div className="text-sm text-white/80">{translations[language].eventNotes[entry.type]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {teams.map((team) => (
                <div
                  key={`${team.name}-${team.channel}`}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold">{team.name}</p>
                    <p className="text-xs text-white/60">{team.task[language]}</p>
                  </div>
                  <div className="text-right text-xs text-white/70">
                    <p>
                      {translations[language].etaLabel} · {team.eta}
                    </p>
                    <p>{team.acknowledgement ? `${translations[language].ackLabel} ${team.acknowledgement.time}` : team.channel}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-100">
              <p className="font-semibold">
                {alertSent ? translations[language].finalMessageActive : translations[language].finalMessageIdle}
              </p>
              <p className="text-xs text-emerald-200/80">
                {translations[language].finalSubtext}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
