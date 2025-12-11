"use client"

export function LinkedInApp() {
  return (
    <div className="flex h-full flex-col bg-[#f3f2ef] text-[#1d2226]">
      <header className="bg-[#0a66c2] px-4 pt-4 pb-3 text-white shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-white text-xl font-bold text-[#0a66c2]">
              in
            </div>
            <div className="relative">
              <input
                className="h-9 w-36 rounded bg-white/15 px-8 text-sm placeholder:text-white/60 focus:outline-none"
                placeholder="Search"
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-base text-white/70">🔍</span>
            </div>
          </div>
          <a
            href="https://www.linkedin.com/in/stephaniesgao/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white transition hover:bg-white/25"
          >
            Visit Profile
          </a>
        </div>
      </header>

      <div className="flex flex-1 flex-col overflow-auto px-4 py-3">
        <div className="grid gap-3">
          {/* Profile card */}
          <section className="rounded-lg border border-black/5 bg-white shadow-sm">
            <div className="h-16 rounded-t-lg bg-gradient-to-r from-[#0a66c2] via-[#0a66c2] to-[#004182]" />
            <div className="-mt-8 px-4 pb-4">
              <div className="h-16 w-16 rounded-full border-4 border-white bg-[#0a66c2]/10" />
              <h1 className="mt-3 text-lg font-semibold">Stephanie Gao</h1>
              <p className="text-sm text-[#5f5f5f]">Product Manager & Software Engineer | Robotics Storyteller</p>
              <a
                href="https://www.linkedin.com/in/stephaniesgao/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-full border border-[#0a66c2] px-4 py-1 text-sm font-semibold text-[#0a66c2] transition hover:bg-[#0a66c2] hover:text-white"
              >
                Visit Profile
              </a>
            </div>
          </section>

          {/* Start a post */}
          <section className="rounded-lg border border-black/5 bg-white px-4 py-3 shadow-sm">
            <div className="flex gap-3">
              <div className="h-12 w-12 rounded-full bg-[#0a66c2]/10" />
              <button className="flex-1 rounded-full border border-[#0a66c2]/20 px-4 text-left text-sm text-[#5f5f5f] hover:bg-[#0a66c2]/10">
                Start a post
              </button>
            </div>
            <div className="mt-3 flex justify-between text-xs font-medium text-[#5f5f5f]">
              <span>Photo</span>
              <span>Video</span>
              <span>Event</span>
              <span>Write article</span>
            </div>
          </section>

          {/* Recent activity */}
          <section className="rounded-lg border border-black/5 bg-white px-4 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#0a66c2]">Activity</h2>
              <button className="text-xs font-semibold text-[#0a66c2]">View all</button>
            </div>
            <ul className="mt-3 space-y-3 text-sm text-[#1d2226]">
              <li>
                <p className="font-semibold">Launching clinician-first AI tools at Axlora</p>
                <p className="text-[#5f5f5f]">Product strategy • 1,245 views</p>
              </li>
              <li>
                <p className="font-semibold">Robotics storytelling lessons from TELUS Spark</p>
                <p className="text-[#5f5f5f]">STEM education • 987 views</p>
              </li>
              <li>
                <p className="font-semibold">What Goldman Sachs taught me about resilient systems</p>
                <p className="text-[#5f5f5f]">Career growth • 1,102 views</p>
              </li>
            </ul>
            <a
              href="https://www.linkedin.com/in/stephaniesgao/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-[#0a66c2] px-4 py-2 text-sm font-semibold text-[#0a66c2] transition hover:bg-[#0a66c2] hover:text-white"
            >
              Open LinkedIn Profile
            </a>
          </section>
        </div>
      </div>

      <footer className="border-t border-black/5 bg-white px-4 py-2 text-center text-xs text-[#5f5f5f]">
        LinkedIn — tap any button above to continue on the full site.
      </footer>
    </div>
  )
}
