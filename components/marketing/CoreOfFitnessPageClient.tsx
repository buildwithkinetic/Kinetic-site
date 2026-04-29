'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import CountUp from '@/components/CountUp'

export default function CoreOfFitnessPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal variant="fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <Link href="/" className="text-[rgba(255,255,255,0.45)] text-sm font-mono hover:text-[#10B981] transition-colors">HOME</Link>
              <span className="text-[rgba(255,255,255,0.45)]">/</span>
              <Link href="/results" className="text-[rgba(255,255,255,0.45)] text-sm font-mono hover:text-[#10B981] transition-colors">WORK</Link>
              <span className="text-[rgba(255,255,255,0.45)]">/</span>
              <span className="text-[#10B981] text-sm font-mono">CORE OF FITNESS</span>
            </div>
          </Reveal>

          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
            >
              💪
            </motion.div>
            <div>
              <Reveal variant="fadeIn">
                <p className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color: '#10B981' }}>Case Study</p>
              </Reveal>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 4.5vw, 60px)',
                  fontWeight: 400,
                  letterSpacing: '-1px',
                  color: 'var(--t1)',
                  lineHeight: 1.05,
                }}>
                Core of Fitness
              </motion.h1>
            </div>
          </div>

          <Reveal delay={0.2}>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--t3)", fontSize: "18px", lineHeight: 1.65, maxWidth: "640px", marginBottom: "40px", fontWeight: 300 }}>
              How Kinetic built a 5-layer member acquisition and retention system — conversion website, lead pipeline dashboard, WhatsApp automation, dead lead reactivation, and an AI booking agent — all live in 4 weeks.
            </p>
          </Reveal>

          <motion.div
            className="flex flex-wrap gap-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } }
            }}
          >
            {['Next.js', 'Supabase', 'n8n', 'Twilio', 'Claude API', 'Vercel', 'WhatsApp Automation', 'AI Agent'].map(tag => (
              <motion.span
                key={tag}
                variants={{ hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                style={{ background: "#111111" }} className="px-3 py-1.5 border border-white/[0.08] rounded-full text-xs font-mono text-[rgba(255,255,255,0.45)]">
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-white/[0.07]">
        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {[
            { value: 4, suffix: ' weeks', label: 'Full system live', sub: 'Website to AI agent' },
            { value: 5, suffix: ' layers', label: 'End-to-end system', sub: 'Nothing off the shelf' },
            { value: 30, suffix: 's', label: 'WhatsApp response', sub: 'Fully automated' },
            { value: 5000, suffix: '/mo', label: 'Infra cost (₹)', sub: 'Lean by design' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={{ hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
              style={{ background: "#111111" }} className="rounded-2xl p-5 border border-white/[0.08]">
              <div style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 400, backgroundImage: "linear-gradient(135deg, #10B981, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.5px", marginBottom: "4px" }}>
                {stat.label === 'Infra cost (₹)' ? (
                  <span>₹<CountUp end={stat.value} suffix={stat.suffix} /></span>
                ) : (
                  <CountUp end={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-sm font-semibold text-[rgba(255,255,255,0.9)]">{stat.label}</div>
              <div className="text-xs text-[rgba(255,255,255,0.45)] mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal variant="fadeIn">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "3px", color: "var(--t4)", textTransform: "uppercase", marginBottom: "16px" }}>/ THE PROBLEM</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.8px", marginBottom: "24px", color: "var(--t1)" }}>Zero digital infrastructure. Leads disappearing daily.</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-[rgba(255,255,255,0.45)] text-lg leading-relaxed mb-10">
              Core of Fitness is a premium gym with strong word-of-mouth — but no system to capture, track, or convert online interest. They had tried running Facebook and Instagram ads with poor results, not because the ads weren&apos;t working, but because nothing was catching the leads when they arrived.
            </p>
          </Reveal>

          <motion.div
            className="grid md:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {[
              'No dedicated gym website — just Instagram',
              'No lead capture form or CRM',
              'Follow-ups were manual and often missed entirely',
              'No way to identify hot vs. cold leads',
              'No WhatsApp automation — every message typed manually',
              'Dead leads were never re-engaged',
              'Zero visibility into conversion rates',
            ].map(pain => (
              <motion.div
                key={pain}
                variants={{ hidden: { y: 12, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}
                style={{ background: "#111111" }}
                className="rounded-xl p-4 border border-white/[0.07] flex items-start gap-3"
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(239,68,68,0.5)', flexShrink: 0, marginTop: '6px' }} />
                <span className="text-sm text-[rgba(255,255,255,0.45)] leading-relaxed">{pain}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The System */}
      <section style={{ background: "#111111" }} className="py-20 px-6 border-y border-white/[0.07]">
        <div className="max-w-4xl mx-auto">
          <Reveal variant="fadeIn">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "3px", color: "var(--t4)", textTransform: "uppercase", marginBottom: "16px" }}>/ THE SYSTEM BUILT</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.8px", marginBottom: "40px", color: "var(--t1)" }}>Five layers. One complete system.</h2>
          </Reveal>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {[
              {
                icon: '🌐',
                title: 'Conversion Website',
                desc: 'Built at coreoffitness.com — mobile-first, single conversion goal: claim a free 2-day trial pass + steam bath session. Hero, trainer profiles, testimonials, and facilities all written to reduce friction. Lead capture form connected directly to Supabase.',
                tags: ['Next.js', 'Vercel', 'Supabase', 'Meta Pixel'],
                color: '#3B82F6',
              },
              {
                icon: '📊',
                title: 'Lead Pipeline Dashboard',
                desc: 'A private Kanban dashboard for the CoF team — 5-stage pipeline (New Lead → Contacted → Trial Scheduled → Trial Done → Member), heat scoring to surface hot leads, call logging, WhatsApp reply badges, notes templates, and full conversion analytics.',
                tags: ['Supabase', 'Kanban', 'Analytics', 'Heat Scoring'],
                color: '#6366F1',
              },
              {
                icon: '💬',
                title: 'WhatsApp Automation',
                desc: 'Every lead gets a personalised WhatsApp message within 30 seconds of submitting the form — tailored to their fitness goal (Muscle & Strength, Weight Loss, Body Transformation, or Fitness & Stamina). Followed by a 3-message sequence on Day 1, Day 3, and Day 7.',
                tags: ['Twilio', 'n8n', 'Personalisation', 'Sequences'],
                color: '#10B981',
              },
              {
                icon: '🔁',
                title: 'Dead Lead Reactivation Engine',
                desc: 'Leads that went cold are automatically identified and re-engaged after a set period — recovering prospects who had previously been written off at zero additional ad spend.',
                tags: ['n8n', 'Automation', 'Re-engagement'],
                color: '#F59E0B',
              },
              {
                icon: '🤖',
                title: 'AI Tour Booking Agent',
                desc: 'Powered by the Anthropic Claude API, the agent handles inbound enquiries, answers FAQs, handles objections, and schedules gym tours — without any staff intervention required.',
                tags: ['Claude API', 'AI Agent', 'Booking Automation'],
                color: '#8B5CF6',
              },
            ].map((layer, idx) => (
              <motion.div
                key={layer.title}
                variants={{ hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                style={{ background: "var(--bg)" }} className="rounded-2xl p-6 border border-white/[0.08] hover:border-white/[0.15] transition-colors">
                <div className="flex items-start gap-4">
                  <div style={{ background: `${layer.color}15`, border: `1px solid ${layer.color}30` }} className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0">
                    {layer.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono" style={{ color: layer.color }}>0{idx + 1}</span>
                      <h3 className="font-bold text-[rgba(255,255,255,0.9)]">{layer.title}</h3>
                    </div>
                    <p className="text-[rgba(255,255,255,0.45)] text-sm leading-relaxed mb-3">{layer.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.tags.map(tag => (
                        <span key={tag} style={{ background: "#111111" }} className="px-2 py-0.5 rounded-full text-xs font-mono text-[rgba(255,255,255,0.45)] border border-white/[0.07]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal variant="fadeIn">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "3px", color: "var(--t4)", textTransform: "uppercase", marginBottom: "16px" }}>/ TECH STACK</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.8px", marginBottom: "40px", color: "var(--t1)" }}>Lean infrastructure. Maximum output.</h2>
          </Reveal>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {[
              { layer: 'Website', tech: 'Next.js, Vercel, Supabase' },
              { layer: 'Dashboard', tech: 'Supabase, PostgreSQL, RLS' },
              { layer: 'Automation', tech: 'n8n, Twilio, WhatsApp API' },
              { layer: 'AI Agent', tech: 'Anthropic Claude API' },
              { layer: 'Analytics', tech: 'Meta Pixel, Custom dashboard' },
              { layer: 'Infra Cost', tech: 'Under ₹5,000/month' },
            ].map(item => (
              <motion.div
                key={item.layer}
                variants={{ hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
                style={{ background: "#111111" }} className="rounded-2xl p-5 border border-white/[0.08]">
                <p className="text-xs font-mono mb-2 uppercase tracking-wider" style={{ color: '#10B981' }}>{item.layer}</p>
                <p className="text-sm text-[rgba(255,255,255,0.45)]">{item.tech}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Outcome */}
      <section style={{ background: "#111111" }} className="py-20 px-6 border-y border-white/[0.07]">
        <div className="max-w-4xl mx-auto">
          <Reveal variant="fadeIn">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "3px", color: "var(--t4)", textTransform: "uppercase", marginBottom: "16px" }}>/ THE OUTCOME</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.8px", marginBottom: "24px", color: "var(--t1)" }}>A gym that never misses a lead again.</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-[rgba(255,255,255,0.45)] text-lg leading-relaxed mb-10">
              The entire system — five layers, production-ready — was built and deployed within four weeks of signing, at a monthly infrastructure cost of under ₹5,000. Every lead that submits the form is now tracked, followed up automatically, and visible to the team in a live dashboard.
            </p>
          </Reveal>

          {/* Testimonial */}
          <Reveal delay={0.2}>
            <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.08))", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "16px", padding: "32px" }}>
              <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: '#10B981' }}>CLIENT FEEDBACK</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px,2vw,22px)", fontStyle: "italic", color: "var(--t2)", lineHeight: 1.6, marginBottom: "16px" }}>
                &ldquo;Before Kinetic, we had no system. Leads came in and disappeared. Now every inquiry is tracked, followed up automatically, and we can actually see what&apos;s converting.&rdquo;
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.35)]">— Core of Fitness, Kolkata</p>
            </div>
          </Reveal>

          {/* Build philosophy */}
          <Reveal delay={0.28}>
            <div style={{ marginTop: '24px', padding: '24px', background: 'var(--bg)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs font-mono tracking-widest uppercase mb-4 text-[rgba(255,255,255,0.25)]">BUILD PHILOSOPHY</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'One signed client before writing any code',
                  'One phase at a time — ship, validate, then build next',
                  'Infrastructure kept lean (under ₹5,000/month)',
                  'Entire system cloneable for future gym clients',
                ].map(p => (
                  <div key={p} className="flex items-start gap-3">
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981', flexShrink: 0, marginTop: '7px' }} />
                    <span className="text-sm text-[rgba(255,255,255,0.45)]">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal variant="fadeIn">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "3px", color: "var(--t4)", textTransform: "uppercase", marginBottom: "16px" }}>/ READY TO BUILD?</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 400, letterSpacing: "-1px", marginBottom: "24px", color: "var(--t1)" }}>Is your gym running without a system?</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-[rgba(255,255,255,0.45)] text-lg mb-8 max-w-lg mx-auto">
              The Kinetic Gym OS is a replicable system built for gyms. If you&apos;re running without a structured lead pipeline, automated follow-ups, or conversion tracking — you&apos;re leaving members on the table every day.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ display: 'inline-flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <Link href="/book-call"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 32px", background: "linear-gradient(135deg, #10B981, #3B82F6)", borderRadius: "100px", color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "15px", textDecoration: "none", border: "none" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15 9.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.5l4 3V6.5l-4 3Z"/>
                </svg>
                Book a Strategy Call
              </Link>
              <Link href="/lead-generation-system"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 32px", background: "transparent", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "100px", color: "#10B981", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "15px", textDecoration: "none" }}>
                See Kinetic Gym OS
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
