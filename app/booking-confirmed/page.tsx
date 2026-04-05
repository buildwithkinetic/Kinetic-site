"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"

// ── Per-offer next-step copy (Step 3) ────────────────────────────────────────
const NEXT_STEP_COPY: Record<string, string> = {
  "quick-win-audit": "Your complete audit report will be delivered within 48 hours.",
  "visibility-fix": "Your website and GMB optimisation begins. Live in 2 weeks.",
  "lead-capture": "Your lead capture system build begins. Live in 3 weeks.",
  "repeat-revenue": "Your automation sequences are being built. Live in 2 weeks.",
  "full-growth-system": "Your complete growth engine build begins. Live in 4 weeks.",
  "custom-build": "Kinetic will review your submission and reach out within 24 hours to schedule your free 30-minute discovery call.",
}

// ── Step configurations per type ─────────────────────────────────────────────
interface StepConfig {
  eyebrow: string
  heading: string
  body: string
  icon: "email" | "call" | "bolt"
}

function getSteps(offerParam: string): [StepConfig, StepConfig, StepConfig] {
  const nextCopy = NEXT_STEP_COPY[offerParam] || "Kinetic begins work on your project immediately."

  if (offerParam === "custom-build") {
    return [
      {
        eyebrow: "Right now",
        heading: "Check your inbox",
        body: "A confirmation email has been sent. Check your spam folder if you don't see it within 2 minutes.",
        icon: "email",
      },
      {
        eyebrow: "Within 24 hours",
        heading: "Ayush reviews your request",
        body: "I personally read every submission and reach out to schedule your free 30-minute discovery call.",
        icon: "call",
      },
      {
        eyebrow: "On the call",
        heading: "We scope your build",
        body: nextCopy,
        icon: "bolt",
      },
    ]
  }

  // Standard booking flow (paid offers)
  return [
    {
      eyebrow: "Right now",
      heading: "Check your inbox",
      body: "A confirmation email with next steps has been sent. Check your spam folder if you don't see it within 2 minutes.",
      icon: "email",
    },
    {
      eyebrow: "Within 24 hours",
      heading: "Kick-off message from Ayush",
      body: "I'll send a short message to align on goals, timeline, and first deliverables before we begin.",
      icon: "call",
    },
    {
      eyebrow: "Build phase",
      heading: "Work begins",
      body: nextCopy,
      icon: "bolt",
    },
  ]
}

// ── SVG icons ─────────────────────────────────────────────────────────────────
function IconEmail() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconCall() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconBolt() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function StepIcon({ icon }: { icon: StepConfig["icon"] }) {
  if (icon === "email") return <IconEmail />
  if (icon === "call") return <IconCall />
  return <IconBolt />
}

// ── Main content ──────────────────────────────────────────────────────────────
function BookingConfirmedContent() {
  const searchParams = useSearchParams()
  const offerParam = searchParams.get("offer") || ""
  const nameParam = searchParams.get("name") || "there"

  const isDiscovery = offerParam === "custom-build"
  const steps = getSteps(offerParam)

  return (
    <main style={{ background: "var(--bg-dark)" }} className="min-h-screen text-white flex flex-col">

      {/* ── Navbar ── */}
      <nav style={{ background: "rgba(15,15,14,0.95)" }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/[0.06] h-16">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="font-black text-xl tracking-tight text-white">
            KINETIC<span className="text-[#3B82F6]">.</span>
          </Link>
          <Link
            href="/work-with-us"
            className="text-sm font-medium text-white/50 hover:text-white transition-colors"
          >
            Growth Offers
          </Link>
        </div>
      </nav>

      {/* ── Content ── */}
      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <div className="max-w-xl w-full text-center">

          {/* Animated Checkmark */}
          <div className="flex justify-center mb-8">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <style>{`
                @keyframes drawCircle {
                  from { stroke-dashoffset: 251; }
                  to   { stroke-dashoffset: 0; }
                }
                @keyframes drawCheck {
                  from { stroke-dashoffset: 50; }
                  to   { stroke-dashoffset: 0; }
                }
                .booking-circle {
                  animation: drawCircle 0.6s ease-out 0.1s both;
                  stroke-dasharray: 251;
                  stroke-dashoffset: 251;
                }
                .booking-check {
                  animation: drawCheck 0.4s ease-out 0.7s both;
                  stroke-dasharray: 50;
                  stroke-dashoffset: 50;
                }
                @media (prefers-reduced-motion: reduce) {
                  .booking-circle, .booking-check {
                    animation: none;
                    stroke-dashoffset: 0;
                  }
                }
              `}</style>
              <circle
                cx="40" cy="40" r="38"
                stroke="#22C55E" strokeWidth="3" fill="none"
                className="booking-circle"
              />
              <path
                d="M24 40l12 12 20-22"
                stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                className="booking-check"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,52px)", fontWeight: 400, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "16px" }}>
            {isDiscovery ? "Request received," : "Booking received,"}{" "}
            <span className="text-[#3B82F6]">{nameParam}.</span>
          </h1>
          <p className="text-white/60 text-lg mb-12 leading-relaxed">
            {isDiscovery
              ? "Check your email — I'll reach out within 24 hours to schedule your free discovery call."
              : "Check your email — a confirmation with next steps has been sent."}
          </p>

          {/* Timeline Steps */}
          <div className="text-left space-y-0 mb-12">

            {steps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center flex-shrink-0">
                    <StepIcon icon={step.icon} />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-white/10 mt-2 mb-2 min-h-[40px]" />
                  )}
                </div>
                <div className={i < steps.length - 1 ? "pb-8" : ""}>
                  <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">{step.eyebrow}</p>
                  <h3 className="text-white font-bold text-lg mb-1.5">{step.heading}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}

          </div>

          {/* Contact Box */}
          <div style={{ background: "var(--bg-dark-2)" }} className="border-2 border-[#3B82F6]/30 rounded-2xl p-6 mb-10">
            <p className="text-white font-bold mb-2">Questions?</p>
            <p className="text-white/60 text-sm mb-3">
              Reply to your confirmation email, or reach out directly:
            </p>
            <a
              href="mailto:hello@buildwithkinetic.org"
              className="text-[#3B82F6] font-mono text-sm hover:underline"
            >
              hello@buildwithkinetic.org
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-7 py-3.5 rounded-full border border-white/20 text-white/70 font-medium text-sm hover:border-white/50 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
            <Link
              href="/work-with-us"
              className="px-7 py-3.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-medium text-sm hover:bg-[#3B82F6]/20 transition-colors"
            >
              Explore all growth offers →
            </Link>
          </div>

        </div>
      </div>

    </main>
  )
}

export default function BookingConfirmedPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-dark)" }}>
        <div className="text-white/40 font-mono text-sm">Loading...</div>
      </main>
    }>
      <BookingConfirmedContent />
    </Suspense>
  )
}
