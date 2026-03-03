"use client"

import { useMemo, useState } from "react"

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

type EventMap = Record<string, string[]>

const formatKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

const sampleEvents: EventMap = {
  [formatKey(new Date())]: ["Portfolio work session · 10:00 – 10:30 AM", "Product sync · 3:00 – 3:45 PM"],
}

export function Calendar() {
  const today = useMemo(() => new Date(), [])
  const [viewDate, setViewDate] = useState(today)
  const [selectedDate, setSelectedDate] = useState(today)

  const startOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)
  const endOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0)
  const daysInMonth = endOfMonth.getDate()
  const leadingDays = startOfMonth.getDay()
  const trailingDays = 42 - (leadingDays + daysInMonth)
  const prevMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0)

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  const gridDays = useMemo(() => {
    const days: { date: Date; isCurrentMonth: boolean }[] = []

    for (let i = leadingDays - 1; i >= 0; i--) {
      days.push({
        date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate() - i),
        isCurrentMonth: false,
      })
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ date: new Date(viewDate.getFullYear(), viewDate.getMonth(), d), isCurrentMonth: true })
    }

    for (let i = 1; i <= trailingDays; i++) {
      days.push({ date: new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, i), isCurrentMonth: false })
    }

    return days
  }, [daysInMonth, leadingDays, prevMonth, trailingDays, viewDate])

  const selectedEvents = sampleEvents[formatKey(selectedDate)] ?? []
  const isSelectedToday = isSameDay(selectedDate, today)

  const goToMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1))
  }

  return (
    <div className="flex h-full flex-col gap-6 bg-[#0c0c0f] px-5 py-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">Calendar</span>
          <div className="text-3xl font-semibold leading-tight">
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToMonth(-1)}
            className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            ←
          </button>
          <button
            onClick={() => goToMonth(1)}
            className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            →
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
          {dayNames.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-7 gap-2">
          {gridDays.map(({ date, isCurrentMonth }, idx) => {
            const isToday = isSameDay(date, today)
            const isSelected = isSameDay(date, selectedDate)
            return (
              <button
                key={`${formatKey(date)}-${idx}`}
                onClick={() => {
                  setSelectedDate(date)
                  setViewDate(new Date(date.getFullYear(), date.getMonth(), 1))
                }}
                className={`flex aspect-square items-center justify-center rounded-2xl text-sm font-semibold transition
                  ${isCurrentMonth ? "text-white" : "text-white/30"}
                  ${isSelected ? "bg-white text-slate-900 shadow-lg" : "hover:bg-white/10"}
                  ${isToday && !isSelected ? "ring-2 ring-orange-400 ring-offset-2 ring-offset-black/80" : ""}
                `}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">Schedule</p>
            <p className="text-lg font-semibold">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
            </p>
          </div>
          <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-200">
            {isSelectedToday ? "Today" : "Selected"}
          </span>
        </div>
        {selectedEvents.length === 0 ? (
          <p className="text-sm text-white/70">No events for this day.</p>
        ) : (
          <ul className="space-y-2 text-sm text-white">
            {selectedEvents.map((event) => (
              <li key={event} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white">
                {event}
              </li>
            ))}
          </ul>
        )}
        <a
          href="https://calendly.com/stephaniesgao/new-meeting"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:from-orange-600 hover:to-red-600"
        >
          Book time on Calendly
        </a>
      </div>
    </div>
  )
}
