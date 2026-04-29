"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Settings,
  Zap,
  ExternalLink,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/pipeline", label: "Pipeline", icon: TrendingUp },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/dashboard/automations", label: "Automations", icon: Zap },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

interface SidebarProps {
  className?: string
}

/**
 * Sidebar — persistent left navigation for the dashboard.
 * Matches the dark-premium design system: #080A0F background,
 * #F97316 accent, monospace labels, consistent icon sizes.
 */
export function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={`w-56 flex-shrink-0 bg-[#080A0F] border-r border-[#1E293B]/50 flex flex-col min-h-screen ${className}`}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#1E293B]/50">
        <Link href="/" className="text-lg font-black tracking-tight text-[#F8FAFC]">
          KINETIC<span className="text-[#F97316]">.</span>
        </Link>
        <p className="text-[10px] font-mono text-[#475569] uppercase tracking-widest mt-0.5">
          Growth Dashboard
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Dashboard navigation">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                active
                  ? "bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20"
                  : "text-[#64748B] hover:text-[#F8FAFC] hover:bg-[#1E293B]/40"
              }`}
            >
              <Icon
                size={16}
                className={`flex-shrink-0 ${
                  active
                    ? "text-[#F97316]"
                    : "text-[#475569] group-hover:text-[#94A3B8]"
                }`}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer — link back to marketing site */}
      <div className="px-3 py-4 border-t border-[#1E293B]/50">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-[#475569] hover:text-[#94A3B8] transition-colors"
        >
          <ExternalLink size={13} className="flex-shrink-0" />
          Back to Website
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
