import type { ReactNode } from "react"

interface WidgetProps {
  title: string
  content: ReactNode
  className?: string
  hideTitle?: boolean
}

export function Widget({ title, content, className = "", hideTitle = false }: WidgetProps) {
  return (
    <div className="flex flex-col">
      <div className={`rounded-2xl p-4 backdrop-blur-xl bg-black/10 ${className}`}>{content}</div>
      {!hideTitle && <div className="mt-1 text-center text-[13px] text-white/80">{title}</div>}
    </div>
  )
}
