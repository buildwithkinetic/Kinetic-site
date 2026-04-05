"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ArrowRight } from "lucide-react"

export default function StickyAuditBanner() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed && window.scrollY > 500) {
        setVisible(true)
      } else if (window.scrollY <= 500) {
        setVisible(false)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [dismissed])

  if (dismissed) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white border-t border-black/[0.08] shadow-lg shadow-black/10">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse flex-shrink-0" />
            <p className="text-sm text-[#0F0E0C] truncate">
              <span className="font-semibold">Free Digital Health Score</span>
              <span className="hidden sm:inline text-[#6B6560]"> — 2-minute quiz, instant results.</span>
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/work-with-us/quick-win-audit#quiz"
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#0F0E0C] text-[#F5F0E8] font-bold rounded-full text-xs hover:bg-[#3B82F6] transition-colors duration-300"
            >
              Check Score <ArrowRight size={12} />
            </Link>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss banner"
              className="p-1.5 text-[#6B6560] hover:text-[#0F0E0C] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
