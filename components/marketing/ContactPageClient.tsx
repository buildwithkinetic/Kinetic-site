'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '@/components/Reveal'

const MeetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 9.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.5l4 3V6.5l-4 3Z"/>
  </svg>
)

const revenueOptions = ['Under ₹5 lakh/month', '₹5–20 lakh/month', '₹20–50 lakh/month', '₹50 lakh+/month', 'Pre-revenue']
const goalOptions = ['Generate more leads', 'Improve lead conversion', 'Automate follow-ups', 'Build a complete system', 'Not sure yet']

export default function ContactPageClient() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [business, setBusiness] = useState('')
  const [revenue, setRevenue] = useState('')
  const [adSpend, setAdSpend] = useState('')
  const [goal, setGoal] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company: business, message: `Revenue: ${revenue} | Ad Spend: ${adSpend || 'N/A'} | Goal: ${goal}` }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    color: 'var(--t1)',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: 'var(--t3)',
    marginBottom: '8px',
  }

  if (success) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', maxWidth: '480px' }}
        >
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '40px', fontWeight: 400,
            color: 'var(--t1)', margin: '0 0 12px', letterSpacing: '-1px',
          }}>Request Received</h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '16px',
            color: 'var(--t3)', lineHeight: 1.6, margin: '0 0 32px',
          }}>
            Thanks, {name}. I'll review your details and get back to you within 24 hours
            to schedule our strategy call.
          </p>
          <a href="/" style={{
            fontFamily: 'var(--font-body)', fontSize: '14px',
            color: '#3B82F6', textDecoration: 'none',
          }}>← Back to home</a>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      <section style={{ padding: '160px 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px', alignItems: 'start',
        }}
        className="contact-grid">

          {/* Left */}
          <Reveal>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '11px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'var(--t4)', marginBottom: '24px',
              }}>Strategy Call</p>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 400, lineHeight: 1.05,
                letterSpacing: '-2px', color: 'var(--t1)',
                margin: '0 0 20px',
              }}>
                Let's Build Your<br/>
                <span style={{
                  backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Growth System</span>
              </h1>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '16px',
                color: 'var(--t3)', lineHeight: 1.6, margin: '0 0 40px',
              }}>
                Fill out the form and I'll get back to you within 24 hours.
                We'll spend 30 minutes mapping out exactly what a growth system
                would look like for your business.
              </p>

              <div style={{ display: 'grid', gap: '16px' }}>
                {[
                  { icon: '📋', title: 'No pitch deck', desc: 'Just a clear conversation about your business and what you need.' },
                  { icon: '⚡', title: 'Response in 24h', desc: 'I review every submission personally before scheduling.' },
                  { icon: '🎯', title: 'System blueprint', desc: "You'll leave with a clear picture of what we'd build and why." },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--t1)', margin: '0 0 2px' }}>{item.title}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--t3)', margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Your name *</label>
                <input
                  required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Rahul Kumar"
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(59,130,246,0.5)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Email address *</label>
                <input
                  required type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="rahul@company.com"
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(59,130,246,0.5)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Business name *</label>
                <input
                  required value={business} onChange={e => setBusiness(e.target.value)}
                  placeholder="Your company or brand"
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(59,130,246,0.5)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Monthly revenue range *</label>
                <select
                  required value={revenue} onChange={e => setRevenue(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  <option value="" style={{ background: '#111111' }}>Select range</option>
                  {revenueOptions.map(o => <option key={o} value={o} style={{ background: '#111111' }}>{o}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Current monthly ad spend <span style={{ color: 'var(--t4)' }}>(optional)</span></label>
                <input
                  value={adSpend} onChange={e => setAdSpend(e.target.value)}
                  placeholder="₹0 / ₹10,000 / ₹50,000..."
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(59,130,246,0.5)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Primary goal *</label>
                <select
                  required value={goal} onChange={e => setGoal(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  <option value="" style={{ background: '#111111' }}>Select goal</option>
                  {goalOptions.map(o => <option key={o} value={o} style={{ background: '#111111' }}>{o}</option>)}
                </select>
              </div>

              {error && (
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px',
                  color: '#ef4444', margin: 0,
                }}>{error}</p>
              )}

              <button type="submit" disabled={loading} style={{
                width: '100%', padding: '16px',
                background: loading ? 'rgba(59,130,246,0.5)' : 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                color: '#FFFFFF', border: 'none', borderRadius: '10px',
                fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <MeetIcon /> Book a Strategy Call
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>

              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '12px',
                color: 'var(--t4)', textAlign: 'center', margin: 0,
              }}>
                No spam. No pitch. Just a focused conversation about your growth.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      <style>{`
        .contact-grid { grid-template-columns: 1fr !important; }
        @media (min-width: 768px) { .contact-grid { grid-template-columns: 1fr 1fr !important; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
