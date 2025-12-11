"use client"

import Image, { type StaticImageData } from "next/image"

interface ExperienceAppProps {
  company: string
  logo: StaticImageData
  role: string
  timeframe: string
  location: string
  description: string
  focusAreas: string[]
  highlights: Array<{ label: string; value: string }>
  links?: Array<{ label: string; href: string }>
}

export function ExperienceApp({
  company,
  logo,
  role,
  timeframe,
  location,
  description,
  focusAreas,
  highlights,
  links,
}: ExperienceAppProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-slate-50 dark:bg-[#060712]">
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={logo}
          alt={`${company} logo`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-6 right-6 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">{timeframe}</p>
          <h2 className="mt-2 text-2xl font-semibold">{company}</h2>
          <p className="text-sm text-white/80">
            {role} - {location}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-6 text-slate-900 dark:text-slate-100">
        <section>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
        </section>

        <section className="mt-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Focus Areas
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-white/10 dark:text-slate-200"
              >
                {area}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Highlights
          </h3>
          <div className="mt-3 grid gap-3">
            {highlights.map((highlight) => (
              <div
                key={`${highlight.label}-${highlight.value}`}
                className="rounded-2xl border border-white/60 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10 dark:shadow-none"
              >
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-300">{highlight.label}</p>
                <p className="mt-1 text-sm text-slate-800 dark:text-slate-100">{highlight.value}</p>
              </div>
            ))}
          </div>
        </section>

        {links && links.length > 0 && (
          <section className="mt-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Links
          </h3>
          <div className="mt-3 flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:border-indigo-200 hover:text-indigo-700 dark:border-white/10 dark:bg-white/10 dark:text-indigo-300 dark:hover:border-indigo-400/40 dark:hover:text-indigo-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
        )}
      </div>
    </div>
  )
}
