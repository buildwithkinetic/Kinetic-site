import Link from "next/link"

interface CtaButton {
  label: string
  href: string
  variant?: "primary" | "secondary"
}

interface PageHeroProps {
  /** Short label shown above the headline (e.g. "Service · Web Apps") */
  badge?: string
  /** Main H1 text — should include primary keyword for SEO */
  headline: string
  /** Optional word / phrase highlighted in accent colour */
  accentWord?: string
  /** Supporting paragraph beneath the headline */
  description: string
  /** Primary call-to-action button */
  primaryCta?: CtaButton
  /** Secondary call-to-action button */
  secondaryCta?: CtaButton
}

/**
 * PageHero — reusable hero section for all service, industry, and
 * standalone marketing pages. Warm ivory / cream premium palette.
 */
export function PageHero({
  badge,
  headline,
  accentWord,
  description,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="pt-10 pb-20 px-6 relative overflow-hidden">
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(59,130,246,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(59,130,246,0.05) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-mono tracking-widest uppercase mb-6">
            {badge}
          </div>
        )}

        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6 max-w-4xl text-white">
          {headline}{" "}
          {accentWord && (
            <span className="text-[#3B82F6]">{accentWord}</span>
          )}
        </h1>

        <p className="text-[#a1a1aa] text-xl leading-relaxed max-w-2xl mb-10">
          {description}
        </p>

        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#111111] text-white font-bold rounded-full text-lg hover:bg-[#3B82F6] hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60"
              >
                {primaryCta.label} →
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 text-white font-semibold rounded-full text-lg hover:border-[#3B82F6]/40 hover:text-[#3B82F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/30"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
