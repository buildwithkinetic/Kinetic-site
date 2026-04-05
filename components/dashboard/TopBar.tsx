"use client"

import { Bell, Search } from "lucide-react"

interface TopBarProps {
  title?: string
  subtitle?: string
}

/**
 * TopBar — horizontal header bar inside the dashboard shell.
 * Matches the dark-premium design system with consistent typography,
 * spacing, and icon style.
 */
export function TopBar({ title = "Dashboard", subtitle }: TopBarProps) {
  return (
    <header className="h-14 flex-shrink-0 bg-[#080A0F] border-b border-[#1E293B]/50 flex items-center justify-between px-6">
      {/* Page title */}
      <div>
        <h1 className="text-sm font-bold text-[#F8FAFC] leading-none">{title}</h1>
        {subtitle && (
          <p className="text-[10px] font-mono text-[#475569] mt-0.5 uppercase tracking-widest">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search trigger */}
        <button
          aria-label="Search"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111318] border border-[#1E293B]/50 text-xs text-[#475569] hover:text-[#94A3B8] hover:border-[#1E293B] transition-all"
        >
          <Search size={12} />
          <span className="hidden sm:inline font-mono">Search...</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-[9px] font-mono bg-[#1E293B]/50 rounded border border-[#334155]/50 text-[#334155]">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative p-2 rounded-lg text-[#475569] hover:text-[#94A3B8] hover:bg-[#111318] transition-all"
        >
          <Bell size={15} />
          {/* Unread indicator */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#F97316]" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}

export default TopBar
