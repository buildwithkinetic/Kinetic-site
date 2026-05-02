import Link from "next/link"
import { ArrowRight, BarChart2, Zap, Search } from "lucide-react"

const auditItems = [
  { icon: Search, label: "SEO & visibility score" },
  { icon: BarChart2, label: "Conversion rate analysis" },
  { icon: Zap, label: "Speed & Core Web Vitals" },
]

export default function LeadAuditCTA() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#3B82F6]/20 bg-[#111111]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/60 to-transparent" />

      {/* Glow */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, rgba(59,130,246,0.05) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 p-8 md:p-10">
        <span className="inline-block text-xs font-mono text-[#3B82F6] tracking-widest uppercase mb-4">
          Free — No sign-up required
        </span>

        <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
          Check Your{" "}
          <span className="text-[#3B82F6]">Digital Health Score</span>
        </h3>

        <p className="text-[#a1a1aa] mb-6 leading-relaxed max-w-lg">
          A 2-minute quiz that shows you exactly what&apos;s holding your website back — for free, no sign-up required.
        </p>

        <ul className="space-y-3 mb-8">
          {auditItems.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-sm text-[#a1a1aa]">
              <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                <Icon size={14} className="text-[#3B82F6]" />
              </div>
              {label}
            </li>
          ))}
        </ul>

        <Link
          href="/free-website-audit"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#0A0A0A] font-bold rounded-full text-sm hover:bg-[#3B82F6] hover:text-white transition-colors duration-300"
        >
          Check My Health Score — Free <ArrowRight size={15} />
        </Link>

        <p className="mt-4 text-xs text-[#a1a1aa] font-mono">
          Instant results. No credit card required.
        </p>
      </div>
    </div>
  )
}
