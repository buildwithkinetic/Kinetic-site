"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export function StickyCtaBanner() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600 && !dismissed) {
        setVisible(true)
      } else if (window.scrollY < 200) {
        setVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [dismissed])

  if (dismissed || !visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-black/[0.08] shadow-lg px-4 py-3 flex items-center justify-between gap-4"
      role="banner"
      aria-label="Free website audit offer"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="shrink-0 w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
        <p className="text-sm text-[#0F0E0C] truncate">
          <span className="hidden sm:inline text-[#6B6560]">Not generating enough leads? </span>
          <span className="font-semibold">Check your Digital Health Score — free →</span>
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/work-with-us/quick-win-audit#quiz"
          className="px-4 py-1.5 bg-[#0F0E0C] text-[#F5F0E8] font-bold rounded-full text-sm hover:bg-[#3B82F6] transition-colors duration-300 whitespace-nowrap"
        >
          Free Health Score
        </Link>
        <button
          onClick={() => {
            setDismissed(true)
            setVisible(false)
          }}
          className="text-[#6B6560] hover:text-[#0F0E0C] transition-colors p-1"
          aria-label="Dismiss banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
