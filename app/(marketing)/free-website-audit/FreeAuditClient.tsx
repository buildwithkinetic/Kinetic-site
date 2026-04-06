"use client"

import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Loader2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { events } from '@/lib/analytics'

const checklist = [
  "SEO gaps stopping you from ranking on Google",
  "Conversion issues costing you leads every day",
  "Speed and Core Web Vitals score",
  "#1 highest-impact fix for your specific site",
]

export default function FreeAuditClient() {
  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [url, setUrl] = useState("")
  const [phone, setPhone] = useState("")
  const [businessType, setBusinessType] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  events.auditFormSubmit()
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
          message: `Free Website Audit Request\nWebsite: ${url}\nBusiness type: ${businessType}`,
          source: "free-website-audit",
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess(true)
      } else {
        setError(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please try again.")
    }
    setLoading(false)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <CheckCircle size={56} className="text-[#3B82F6] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#0F0E0C] mb-3">
            Audit Request Received
          </h2>
          <p className="text-[#6B6560] mb-2">
            Thanks <span className="text-[#0F0E0C] font-semibold">{name}</span>. I'll review <span className="text-[#0F0E0C] font-semibold">{url}</span> personally and send your audit to <span className="text-[#0F0E0C] font-semibold">{email}</span> within 24 hours.
          </p>
          <p className="text-sm text-[#9E9890] mb-8">You'll receive an automated acknowledgement within 60 seconds.</p>
          <Link href="/" className="text-[#3B82F6] hover:underline text-sm">← Back to home</Link>
        </motion.div>
      </main>
    )
  }

  return (
    <>
      <main className="min-h-screen bg-[#F5F0E8] pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Left — context */}
            <div>
              <p className="text-xs font-mono text-[#3B82F6] tracking-widest uppercase mb-4">Free · No credit card · 24-hour turnaround</p>
              <h1
                style={{ fontFamily: "var(--font-dm-serif)", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-1px", color: "#0F0E0C" }}
                className="mb-6"
              >
                Get your free<br />
                <em className="text-[#3B82F6]">website audit.</em>
              </h1>
              <p className="text-[#6B6560] text-lg leading-relaxed mb-10" style={{ fontWeight: 300 }}>
                I'll personally review your site and send you a concise breakdown of what's holding it back — and what to fix first.
              </p>

              <div className="space-y-3 mb-10">
                {checklist.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-[#3B82F6] mt-0.5 text-lg leading-none">✓</span>
                    <span className="text-[#0F0E0C] text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="border-l-2 border-[#3B82F6]/30 pl-4">
                <p className="text-sm text-[#6B6560] italic leading-relaxed">
                  "Most agencies build you a website and disappear. Kinetic does neither — I build the system, install it in your business, and make sure it runs."
                </p>
                <p className="text-xs text-[#9E9890] mt-2 font-mono">— Ayush Gupta, Founder @ Kinetic</p>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-white border border-black/[0.06] rounded-2xl p-8 shadow-sm">

              {step === 1 && (
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setStep(2) }}
                  className="space-y-5"
                >
                  <div>
                    <p className="text-xs font-mono text-[#9E9890] tracking-widest uppercase mb-4">Step 1 of 2</p>
                    <h2 className="text-xl font-bold text-[#0F0E0C] mb-1">Your details</h2>
                    <p className="text-sm text-[#6B6560]">Takes 30 seconds.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#6B6560] uppercase tracking-wider mb-1.5">Your name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-4 py-3 border border-black/10 rounded-xl text-sm text-[#0F0E0C] bg-[#F5F0E8]/40 focus:outline-none focus:border-[#3B82F6]/50 transition-colors placeholder:text-[#9E9890]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#6B6560] uppercase tracking-wider mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      placeholder="you@yourbusiness.com"
                      className="w-full px-4 py-3 border border-black/10 rounded-xl text-sm text-[#0F0E0C] bg-[#F5F0E8]/40 focus:outline-none focus:border-[#3B82F6]/50 transition-colors placeholder:text-[#9E9890]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#6B6560] uppercase tracking-wider mb-1.5">Website URL *</label>
                    <input
                      type="url"
                      required
                      value={url}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                      placeholder="https://yourbusiness.com"
                      className="w-full px-4 py-3 border border-black/10 rounded-xl text-sm text-[#0F0E0C] bg-[#F5F0E8]/40 focus:outline-none focus:border-[#3B82F6]/50 transition-colors placeholder:text-[#9E9890]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#3B82F6] text-white font-semibold py-3.5 rounded-xl hover:bg-[#a8370a] transition-colors text-sm"
                  >
                    Continue <ArrowRight size={16} />
                  </button>

                  <p className="text-center text-xs text-[#9E9890]">No spam. No credit card. Just your audit.</p>
                </motion.form>
              )}

              {step === 2 && (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div>
                    <p className="text-xs font-mono text-[#9E9890] tracking-widest uppercase mb-4">Step 2 of 2 · Optional</p>
                    <h2 className="text-xl font-bold text-[#0F0E0C] mb-1">A bit more context</h2>
                    <p className="text-sm text-[#6B6560]">Helps me make the audit more relevant. Skip if you prefer.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#6B6560] uppercase tracking-wider mb-1.5">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border border-black/10 rounded-xl text-sm text-[#0F0E0C] bg-[#F5F0E8]/40 focus:outline-none focus:border-[#3B82F6]/50 transition-colors placeholder:text-[#9E9890]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#6B6560] uppercase tracking-wider mb-1.5">Type of business</label>
                    <input
                      type="text"
                      value={businessType}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setBusinessType(e.target.value)}
                      placeholder="e.g. Gym, clinic, SaaS startup, café..."
                      className="w-full px-4 py-3 border border-black/10 rounded-xl text-sm text-[#0F0E0C] bg-[#F5F0E8]/40 focus:outline-none focus:border-[#3B82F6]/50 transition-colors placeholder:text-[#9E9890]"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#3B82F6] text-white font-semibold py-3.5 rounded-xl hover:bg-[#a8370a] transition-colors text-sm disabled:opacity-60"
                  >
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Get My Free Audit <ArrowRight size={16} /></>}
                  </button>

                  <button type="button" onClick={() => setStep(1)} className="w-full text-center text-xs text-[#9E9890] hover:text-[#6B6560] transition-colors">
                    ← Back
                  </button>

                  <p className="text-center text-xs text-[#9E9890]">No spam. No credit card. Just your audit.</p>
                </motion.form>
              )}
            </div>
          </div>

          {/* What Happens Next */}
          <div className="mt-20 border-t border-black/[0.06] pt-16">
            <p className="text-xs font-mono text-[#9E9890] tracking-widest uppercase mb-6 text-center">What happens after you submit</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Instant confirmation", body: "You'll get an automated acknowledgement to your email within 60 seconds of submitting." },
                { step: "02", title: "I review your site", body: "I personally audit your website — SEO, conversion, speed, and positioning — within 24 hours." },
                { step: "03", title: "You get the audit", body: "A concise, actionable breakdown lands in your inbox. No fluff, no sales pitch." },
              ].map(({ step: s, title, body }) => (
                <div key={s}>
                  <p className="text-xs font-mono text-[#3B82F6] tracking-widest mb-2">{s}</p>
                  <h3 className="font-bold text-[#0F0E0C] mb-2">{title}</h3>
                  <p className="text-sm text-[#6B6560] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
