"use client"

import Image, { type StaticImageData } from "next/image"

interface EducationAppProps {
  institution: string
  location: string
  degree: string
  timeframe?: string
  crest?: StaticImageData
  description?: string
  highlights: Array<{ label: string; value: string }>
  extraNotes?: string
}

export function EducationApp({
  institution,
  location,
  degree,
  timeframe,
  crest,
  description,
  highlights,
  extraNotes,
}: EducationAppProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-slate-50 dark:bg-[#060712]">
      <div className="relative h-40 w-full overflow-hidden">
        {crest ? (
          <Image
            src={crest}
            alt={`${institution} crest`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-6 right-6 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">{timeframe ?? "Education"}</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight">{institution}</h2>
          <p className="text-sm text-white/80">{degree}</p>
          <p className="text-xs text-white/60">{location}</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-6 text-slate-900 dark:text-slate-100">
        {description && <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>}

        <div className="mt-6 grid gap-3">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/60 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10 dark:shadow-none"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">{item.label}</p>
              <p className="mt-1 text-sm text-slate-800 dark:text-slate-100">{item.value}</p>
            </div>
          ))}
        </div>

        {extraNotes && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
            {extraNotes}
          </div>
        )}
      </div>
    </div>
  )
}
