"use client"

import React from "react"
import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle, Loader2, Calendar } from "lucide-react"

type Step = 1 | 2

const CAL_URL = "https://cal.com/ayush-gupta-xpzedb/free-business-audit-kinetic"

const goals = [
  "Get more leads / customers",
  "Build a new website or web app",
  "Add AI agents / automation",
  "Rank higher on Google",
  "Launch a product fast",
  "Something else",
]

export default function BookCallClient() {
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [goal, setGoal] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company: businessType,
          message: `Strategy Call Request\nGoal: ${goal}\nBusiness type: ${businessType}`,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please try again.")
    }
    setLoading(false)
  }

  return (
    <main
      style={{ background: "#0A0A0A", minHeight: "100vh", color: "#FFFFFF" }}
      className="flex items-center justify-center px-6 py-28"
    >
      <div style={{ maxWidth: "480px", width: "100%" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "48px" }}>
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#FFFFFF" }}>KINETIC</span>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3B82F6", boxShadow: "0 0 8px rgba(59,130,246,0.8)", display: "inline-block" }} />
        </Link>

        <AnimatePresence mode="wait">

          {/* ── STEP 1: Basic info ─────────────────────────────────────── */}
          {!submitted && step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setStep(2) }}
              style={{ display: "flex", flexDirection: "column", gap: "0" }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>
                Step 1 of 2 · Quick details
              </p>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, letterSpacing: "-2px", lineHeight: 1.08, color: "#FFFFFF", margin: "0 0 32px" }}>
                Before we meet,<br />
                <span style={{ backgroundImage: "linear-gradient(135deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  tell me about you.
                </span>
              </h1>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>
                    Your name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    style={{
                      width: "100%", padding: "14px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      fontFamily: "var(--font-body)", fontSize: "15px", color: "#FFFFFF",
                      outline: "none", boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)" }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="you@yourbusiness.com"
                    style={{
                      width: "100%", padding: "14px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      fontFamily: "var(--font-body)", fontSize: "15px", color: "#FFFFFF",
                      outline: "none", boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)" }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>
                    WhatsApp / Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    style={{
                      width: "100%", padding: "14px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      fontFamily: "var(--font-body)", fontSize: "15px", color: "#FFFFFF",
                      outline: "none", boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)" }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "16px 32px",
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  color: "#FFFFFF", borderRadius: "100px",
                  fontSize: "15px", fontWeight: 600,
                  border: "none", cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)" }}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none" }}
              >
                Continue <ArrowRight size={16} />
              </button>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255,255,255,0.25)", marginTop: "16px", textAlign: "center" }}>
                No spam. No credit card. Your info stays private.
              </p>
            </motion.form>
          )}

          {/* ── STEP 2: Goal ───────────────────────────────────────────── */}
          {!submitted && step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "0" }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>
                Step 2 of 2 · Your goal
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-1.5px", lineHeight: 1.1, color: "#FFFFFF", margin: "0 0 8px" }}>
                What&apos;s the main thing<br />you want to fix?
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.35)", margin: "0 0 28px" }}>
                Pick one — this helps me make the call more useful.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                {goals.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    style={{
                      padding: "14px 16px",
                      background: goal === g ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)",
                      border: goal === g ? "1px solid rgba(59,130,246,0.5)" : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      fontFamily: "var(--font-body)", fontSize: "13px",
                      color: goal === g ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                      cursor: "pointer", textAlign: "left",
                      transition: "all 0.15s",
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>
                  Type of business
                </label>
                <input
                  type="text"
                  value={businessType}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setBusinessType(e.target.value)}
                  placeholder="e.g. Gym, clinic, SaaS startup, café..."
                  style={{
                    width: "100%", padding: "14px 16px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    fontFamily: "var(--font-body)", fontSize: "15px", color: "#FFFFFF",
                    outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)" }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
                />
              </div>

              {error && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#EF4444", marginBottom: "16px" }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "16px 32px",
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  color: "#FFFFFF", borderRadius: "100px",
                  fontSize: "15px", fontWeight: 600,
                  border: "none", cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-body)",
                  opacity: loading ? 0.6 : 1,
                  transition: "opacity 0.2s, transform 0.2s",
                }}
              >
                {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving...</> : <>Save & Continue <ArrowRight size={16} /></>}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-body)", fontSize: "13px",
                  color: "rgba(255,255,255,0.3)", marginTop: "16px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)" }}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)" }}
              >
                ← Back
              </button>
            </motion.form>
          )}

          {/* ── SUCCESS: Book the slot ──────────────────────────────────── */}
          {submitted && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center" }}
            >
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(59,130,246,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px",
              }}>
                <CheckCircle size={28} color="#3B82F6" />
              </div>

              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-1.5px", color: "#FFFFFF", margin: "0 0 12px" }}>
                Details saved.
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: "0 0 40px" }}>
                Now pick a time that works for you, <span style={{ color: "#FFFFFF" }}>{name}</span>. The call is 30 minutes — no pitch, just a clear plan.
              </p>

              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  padding: "18px 36px",
                  background: "#3B82F6",
                  color: "#FFFFFF", borderRadius: "100px",
                  fontSize: "16px", fontWeight: 600,
                  textDecoration: "none", fontFamily: "var(--font-body)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 0 0 rgba(59,130,246,0)",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.style.transform = "translateY(-3px)"
                  e.currentTarget.style.boxShadow = "0 16px 48px rgba(59,130,246,0.45)"
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.boxShadow = "0 0 0 rgba(59,130,246,0)"
                }}
              >
                <Calendar size={18} />
                Pick Your Time Slot
                <ArrowRight size={16} />
              </a>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255,255,255,0.2)", marginTop: "20px" }}>
                Opens in a new tab · No payment required
              </p>

              <div style={{
                marginTop: "48px", padding: "24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                textAlign: "left",
              }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "16px" }}>
                  What to expect
                </p>
                {[
                  "30-minute video or voice call",
                  "I review your business before the call",
                  "You get a clear diagnosis — not a sales pitch",
                  "If we're not a fit, you leave with a free action plan",
                ].map(item => (
                  <div key={item} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                    <span style={{ color: "#3B82F6", flexShrink: 0, marginTop: "2px" }}>✓</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </main>
  )
}
