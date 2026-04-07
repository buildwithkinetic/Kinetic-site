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

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  color: '#FFFFFF',
  fontSize: '15px',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s',
}

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
      <main style={{ background: 'var(--bg)', minHeight: '100vh' }} className="flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <CheckCircle size={56} className="text-[#3B82F6] mx-auto mb-6" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '28px', color: '#FFFFFF', marginBottom: '12px' }}>
            Audit Request Received
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.45)', fontSize: '16px', lineHeight: 1.6, marginBottom: '8px' }}>
            Thanks <span style={{ color: '#FFFFFF', fontWeight: 500 }}>{name}</span>. I&apos;ll review{' '}
            <span style={{ color: '#FFFFFF', fontWeight: 500 }}>{url}</span> personally and send your audit to{' '}
            <span style={{ color: '#FFFFFF', fontWeight: 500 }}>{email}</span> within 24 hours.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.25)', fontSize: '13px', marginBottom: '32px' }}>
            You&apos;ll receive an automated acknowledgement within 60 seconds.
          </p>
          <Link href="/" style={{ fontFamily: 'var(--font-body)', color: '#3B82F6', fontSize: '14px', textDecoration: 'none' }}>
            ← Back to home
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <div className="free-audit-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

          {/* Left — context */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#3B82F6', marginBottom: '20px' }}>
              Free · No credit card · 24-hour turnaround
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-2px',
              color: '#FFFFFF',
              margin: '0 0 20px',
            }}>
              Get your free<br />
              <span style={{ color: '#3B82F6' }}>website audit.</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, marginBottom: '40px', fontWeight: 400 }}>
              I&apos;ll personally review your site and send you a concise breakdown of what&apos;s holding it back — and what to fix first.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
              {checklist.map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#3B82F6', fontSize: '16px', lineHeight: 1, marginTop: '2px', flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ borderLeft: '2px solid rgba(59,130,246,0.3)', paddingLeft: '20px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, fontStyle: 'italic' }}>
                &ldquo;Most agencies build you a website and disappear. Kinetic does neither — I build the system, install it in your business, and make sure it runs.&rdquo;
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.22)', marginTop: '10px', letterSpacing: '1px' }}>
                — Ayush Gupta, Founder @ Kinetic
              </p>
            </div>
          </div>

          {/* Right — form card */}
          <div style={{
            background: '#111111',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '40px',
          }}>

            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setStep(2) }}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '16px' }}>Step 1 of 2</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, color: '#FFFFFF', margin: '0 0 6px' }}>Your details</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>Takes 30 seconds.</p>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Your name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="you@yourbusiness.com"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Website URL *</label>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                    placeholder="https://yourbusiness.com"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: '#3B82F6',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '15px',
                    padding: '14px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none' }}
                >
                  Continue <ArrowRight size={16} />
                </button>

                <p style={{ fontFamily: 'var(--font-body)', textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
                  No spam. No credit card. Just your audit.
                </p>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '16px' }}>Step 2 of 2 · Optional</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, color: '#FFFFFF', margin: '0 0 6px' }}>A bit more context</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>Helps me make the audit more relevant. Skip if you prefer.</p>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>WhatsApp / Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Type of business</label>
                  <input
                    type="text"
                    value={businessType}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setBusinessType(e.target.value)}
                    placeholder="e.g. Gym, clinic, SaaS startup, café..."
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  />
                </div>

                {error && (
                  <p style={{ fontFamily: 'var(--font-body)', color: '#f87171', fontSize: '14px', margin: 0 }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: '#3B82F6',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '15px',
                    padding: '14px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Get My Free Audit <ArrowRight size={16} /></>}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}
                >
                  ← Back
                </button>

                <p style={{ fontFamily: 'var(--font-body)', textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
                  No spam. No credit card. Just your audit.
                </p>
              </motion.form>
            )}
          </div>
        </div>

        {/* What Happens Next */}
        <div style={{ marginTop: '100px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '80px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '48px', textAlign: 'center' }}>
            What happens after you submit
          </p>
          <div className="free-audit-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[
              { step: '01', title: 'Instant confirmation', body: "You'll get an automated acknowledgement to your email within 60 seconds of submitting." },
              { step: '02', title: 'I review your site', body: 'I personally audit your website — SEO, conversion, speed, and positioning — within 24 hours.' },
              { step: '03', title: 'You get the audit', body: 'A concise, actionable breakdown lands in your inbox. No fluff, no sales pitch.' },
            ].map(({ step: s, title, body }) => (
              <div key={s}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', color: '#3B82F6', marginBottom: '12px' }}>{s}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 600, color: '#FFFFFF', marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Mobile responsiveness */}
      <style>{`
        @media (max-width: 768px) {
          .free-audit-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .free-audit-steps { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </main>
  )
}
