"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FlipVertical2Icon as FlipCamera2 } from "lucide-react"
import { useAppState } from "@/lib/app-state"

type Theme = {
  id: string
  name: string
  bg: string
  frame: string
  accent: string
}

const themes: Theme[] = [
  { id: "classic", name: "Classic", bg: "#0b0b0f", frame: "#f5f5f7", accent: "#f97316" },
  { id: "neon", name: "Neon", bg: "#0b1020", frame: "#15182a", accent: "#22d3ee" },
  { id: "studio", name: "Studio", bg: "#0c0c0c", frame: "#111827", accent: "#c084fc" },
]

const frameStyles = ["Clean", "Rounded", "Film"] as const

function useCameraStream(isFrontCamera: boolean) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const getStream = useCallback(async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isFrontCamera ? "user" : "environment",
        },
        audio: false,
      })

      streamRef.current = newStream
      setStream(newStream)
      setError(null)
    } catch (err) {
      console.error("Camera error:", err)
      setError(err instanceof Error ? err : new Error(String(err)))
      setStream(null)
    }
  }, [isFrontCamera])

  useEffect(() => {
    getStream()
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
    }
  }, [getStream])

  return { stream, error }
}

export function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isFrontCamera, setIsFrontCamera] = useState(false)
  const [capturingStrip, setCapturingStrip] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [capturedFrames, setCapturedFrames] = useState<string[]>([])
  const [photostripUrl, setPhotostripUrl] = useState<string | null>(null)
  const [theme, setTheme] = useState<Theme>(themes[0])
  const [frameStyle, setFrameStyle] = useState<(typeof frameStyles)[number]>("Clean")
  const { closeApp, openApp } = useAppState()

  const { stream, error } = useCameraStream(isFrontCamera)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  const handleFlipCamera = useCallback(() => {
    setIsFrontCamera((prev) => !prev)
  }, [])

  const captureFrame = useCallback(async (): Promise<string | null> => {
    if (!videoRef.current || !canvasRef.current) return null
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth || 1080
    canvas.height = video.videoHeight || 1440
    const context = canvas.getContext("2d")
    if (!context) return null
    context.save()
    context.translate(canvas.width, 0)
    context.scale(-1, 1)
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    context.restore()
    return canvas.toDataURL("image/jpeg")
  }, [])

  const createPhotostrip = useCallback(
    async (frames: string[]) => {
      if (frames.length === 0) return null
      const images = await Promise.all(
        frames.map(
          (frame) =>
            new Promise<HTMLImageElement>((resolve) => {
              const img = new Image()
              img.onload = () => resolve(img)
              img.src = frame
            }),
        ),
      )

      const frameWidth = 720
      const frameHeight = 960
      const padding = 32
      const gap = 16
      const stripWidth = frameWidth + padding * 2
      const stripHeight = frames.length * frameHeight + (frames.length + 1) * gap + padding * 2

      const canvas = document.createElement("canvas")
      canvas.width = stripWidth
      canvas.height = stripHeight
      const ctx = canvas.getContext("2d")
      if (!ctx) return null

      ctx.fillStyle = theme.bg
      ctx.fillRect(0, 0, stripWidth, stripHeight)

      images.forEach((img, idx) => {
        const x = padding
        const y = padding + gap + idx * (frameHeight + gap)
        ctx.fillStyle = theme.frame
        const radius = frameStyle === "Rounded" ? 32 : frameStyle === "Film" ? 0 : 12
        // frame background
        ctx.save()
        if (ctx.roundRect) {
          ctx.beginPath()
          // @ts-expect-error roundRect isn't typed in older TS DOM libs
          ctx.roundRect(x - 8, y - 8, frameWidth + 16, frameHeight + 16, radius)
          ctx.fill()
        } else {
          ctx.fillRect(x - 8, y - 8, frameWidth + 16, frameHeight + 16)
        }

        // draw image fitting into frame
        const scale = Math.max(frameWidth / img.width, frameHeight / img.height)
        const drawW = img.width * scale
        const drawH = img.height * scale
        const dx = x + (frameWidth - drawW) / 2
        const dy = y + (frameHeight - drawH) / 2
        ctx.beginPath()
        if (ctx.roundRect) {
          // @ts-expect-error roundRect typing
          ctx.roundRect(x, y, frameWidth, frameHeight, radius)
          ctx.clip()
        }
        ctx.drawImage(img, dx, dy, drawW, drawH)
        ctx.restore()
      })

      // footer accent
      ctx.fillStyle = theme.accent
      ctx.fillRect(padding, stripHeight - padding - 10, stripWidth - padding * 2, 6)

      return canvas.toDataURL("image/png")
    },
    [frameStyle, theme],
  )

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const capturePhotostrip = useCallback(async () => {
    if (capturingStrip) return
    setCapturedFrames([])
    setPhotostripUrl(null)
    setCapturingStrip(true)

    const frames: string[] = []
    for (let i = 0; i < 4; i++) {
      for (let c = 3; c > 0; c--) {
        setCountdown(c)
        await sleep(1000)
      }
      setCountdown(null)
      const frame = await captureFrame()
      if (frame) {
        frames.push(frame)
        setCapturedFrames((prev) => [...prev, frame])
      }
      await sleep(500)
    }

    const strip = await createPhotostrip(frames)
    if (strip) {
      setPhotostripUrl(strip)
      const stored = localStorage.getItem("photostrips")
      const strips = stored ? JSON.parse(stored) : []
      strips.unshift({ id: Date.now().toString(), url: strip, timestamp: Date.now(), theme: theme.id })
      localStorage.setItem("photostrips", JSON.stringify(strips))
      const storedPhotos = localStorage.getItem("photos")
      const photos = storedPhotos ? JSON.parse(storedPhotos) : []
      photos.unshift({ id: Date.now().toString(), url: strip, timestamp: Date.now() })
      localStorage.setItem("photos", JSON.stringify(photos))
    }

    setCapturingStrip(false)
  }, [captureFrame, capturingStrip, createPhotostrip, theme.id])

  const handleOpenPhotos = useCallback(() => {
    closeApp()
    openApp("photos")
  }, [closeApp, openApp])

  const previewBg = useMemo(() => theme.bg, [theme.bg])

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: previewBg }}>
      <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover opacity-90 [transform:scaleX(-1)]" />
      <canvas ref={canvasRef} className="hidden" />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-white text-center p-4">
            <p className="text-red-500 mb-2">Camera error</p>
            <p>{error.message}</p>
          </div>
        </div>
      )}

      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-black/50 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2 text-white/80 text-xs uppercase tracking-[0.3em]">
          Photobooth
          <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold text-white">
            4-shot strip
          </span>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={theme.id}
            onChange={(e) => setTheme(themes.find((t) => t.id === e.target.value) || themes[0])}
            className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none"
          >
            {themes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <select
            value={frameStyle}
            onChange={(e) => setFrameStyle(e.target.value as (typeof frameStyles)[number])}
            className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none"
          >
            {frameStyles.map((style) => (
              <option key={style} value={style}>
                {style} frame
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-4 rounded-3xl bg-black/55 p-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <button
            onClick={closeApp}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Close
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleFlipCamera}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Flip
            </button>
            <button
              disabled={capturingStrip}
              onClick={capturePhotostrip}
              className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-orange-600 hover:to-red-600 disabled:opacity-60"
            >
              {capturingStrip ? "Capturing…" : "Start photostrip"}
            </button>
          </div>
        </div>

        {countdown !== null && (
          <div className="flex items-center justify-center text-6xl font-bold text-white drop-shadow-lg">{countdown}</div>
        )}

        {capturedFrames.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {capturedFrames.map((frame, idx) => (
              <div
                key={`${frame}-${idx}`}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/10 shadow-inner"
              >
                <img src={frame} alt={`Capture ${idx + 1}`} className="h-32 w-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {photostripUrl && (
          <div className="flex flex-col gap-2 rounded-2xl bg-white/5 p-3 border border-white/10">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Saved photostrip</p>
              <button
                onClick={handleOpenPhotos}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                View in Photos
              </button>
            </div>
            <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/50">
              <img src={photostripUrl} alt="Photostrip" className="mx-auto max-h-80 w-full object-contain" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
