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

const budgets = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
  "Not sure yet",
]

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#FFFFFF",
  fontSize: "15px",
  fontFamily: "var(--font-body)",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box" as const,
}

export default function BookCallClient() {
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [goal, setGoal] = useState("")
  const [budget, setBudget] = useState("")
  const [businessType, setBusinessType] = useState("")

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
          service_interest: goal,
          budget_range: budget,
          source: "book-call",
          message: `Strategy Call Request\nGoal: ${goal}\nBudget: ${budget}\nBusiness: ${businessType}`,
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

  if (submitted) {
    return (
      <main style={{ background: "#0A0A0A", minHeight: "100vh", color: "#FFFFFF" }} className="flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <CheckCircle size={56} color="#3B82F6" style={{ margin: "0 auto 24px" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "28px", color: "#FFFFFF", marginBottom: "12px" }}>
            You&apos;re on the list.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)", fontSize: "16px", lineHeight: 1.6, marginBottom: "8px" }}>
            Thanks <span style={{ color: "#FFFFFF", fontWeight: 500 }}>{name}</span>. I&apos;ll review your details and reach out within 24 hours to confirm a time.
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.25)", fontSize: "13px", marginBottom: "32px" }}>
            Or book directly below if you&apos;d prefer.
          </p>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#3B82F6", color: "#FFFFFF",
              fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "15px",
              padding: "13px 24px", borderRadius: "10px", textDecoration: "none",
              marginBottom: "20px",
            }}
          >
            <Calendar size={16} /> Pick a time on Cal.com
          </a>
          <br />
          <Link href="/" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.3)", fontSize: "13px", textDecoration: "none" }}>
            ← Back to home
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main
      style={{ background: "#0A0A0A", minHeight: "100vh", color: "#FFFFFF" }}
      className="flex items-center justify-center px-6 py-28"
    >
      <div style={{ maxWidth: "480px", width: "100%" }}>

        {/* Step 1 — Contact details */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); if (goal) setStep(2) }}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "16px" }}>
                  Step 1 of 2 · Your info
                </p>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px", letterSpacing: "-1px", lineHeight: 1.1 }}>
                  Book a strategy call.
                </h1>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "rgba(255,255,255,0.38)", margin: 0 }}>
                  Free, 30 minutes. I&apos;ll map out exactly what your business needs.
                </p>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>Your name *</label>
                <input
                  type="text" required value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)" }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>Email *</label>
                <input
                  type="email" required value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="you@yourbusiness.com"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)" }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>WhatsApp number *</label>
                <input
                  type="tel" required value={phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)" }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
                />
              </div>

              {/* Goal chips */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "12px" }}>What do you need help with? *</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {goals.map(g => (
                    <button
                      key={g} type="button"
                      onClick={() => setGoal(g)}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "10px",
                        border: goal === g ? "1.5px solid #3B82F6" : "1.5px solid rgba(255,255,255,0.1)",
                        background: goal === g ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.03)",
                        color: goal === g ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        fontWeight: goal === g ? 500 : 400,
                        cursor: "pointer",
                        textAlign: "left" as const,
                        transition: "all 0.15s",
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!goal}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  background: goal ? "#3B82F6" : "rgba(255,255,255,0.08)",
                  color: goal ? "#FFFFFF" : "rgba(255,255,255,0.25)",
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "15px",
                  padding: "14px", borderRadius: "10px", border: "none",
                  cursor: goal ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
              >
                Continue <ArrowRight size={16} />
              </button>
            </motion.form>
          )}

          {/* Step 2 — Budget + business context */}
          {step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "16px" }}>
                  Step 2 of 2 · Budget & context
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px", letterSpacing: "-0.5px" }}>
                  What&apos;s your budget range?
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.38)", margin: 0 }}>
                  Helps me recommend the right system for your stage.
                </p>
              </div>

              {/* Budget chips */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {budgets.map(b => (
                  <button
                    key={b} type="button"
                    onClick={() => setBudget(b)}
                    style={{
                      padding: "13px 16px",
                      borderRadius: "10px",
                      border: budget === b ? "1.5px solid #3B82F6" : "1.5px solid rgba(255,255,255,0.1)",
                      background: budget === b ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.03)",
                      color: budget === b ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      fontWeight: budget === b ? 500 : 400,
                      cursor: "pointer",
                      textAlign: "left" as const,
                      transition: "all 0.15s",
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>

              {/* Business type */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>
                  Type of business <span style={{ color: "rgba(255,255,255,0.2)" }}>(optional)</span>
                </label>
                <input
                  type="text" value={businessType}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setBusinessType(e.target.value)}
                  placeholder="e.g. Gym, clinic, SaaS startup, e-commerce..."
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)" }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
                />
              </div>

              {error && (
                <p style={{ fontFamily: "var(--font-body)", color: "#f87171", fontSize: "14px", margin: 0 }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !budget}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  background: budget && !loading ? "#3B82F6" : "rgba(255,255,255,0.08)",
                  color: budget && !loading ? "#FFFFFF" : "rgba(255,255,255,0.25)",
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "15px",
                  padding: "14px", borderRadius: "10px", border: "none",
                  cursor: loading || !budget ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Booking...</> : <>Book My Strategy Call <ArrowRight size={16} /></>}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.25)", textAlign: "center" }}
              >
                ← Back
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
