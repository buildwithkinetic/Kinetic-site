'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import CountUp from '@/components/CountUp'

export default function SheknowmicsPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal variant="fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <Link href="/" className="text-[rgba(255,255,255,0.45)] text-sm font-mono hover:text-[#3B82F6] transition-colors">HOME</Link>
              <span className="text-[rgba(255,255,255,0.45)]">/</span>
              <Link href="/work/sheknowmics" className="text-[rgba(255,255,255,0.45)] text-sm font-mono hover:text-[#3B82F6] transition-colors">WORK</Link>
              <span className="text-[rgba(255,255,255,0.45)]">/</span>
              <span className="text-[#3B82F6] text-sm font-mono">SHEKNOWMICS</span>
            </div>
          </Reveal>

          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
            >
              🩺
            </motion.div>
            <div>
              <Reveal variant="fadeIn">
                <p className="text-xs font-mono text-[#3B82F6] tracking-widest uppercase mb-1">Case Study</p>
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
                Sheknowmics
              </motion.h1>
            </div>
          </div>

          <Reveal delay={0.2}>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--t3)", fontSize: "18px", lineHeight: 1.65, maxWidth: "640px", marginBottom: "40px", fontWeight: 300 }}>
              Engineering India's first AI-native women's health platform — from zero to a full-stack product with cycle intelligence, home diagnostics, AI risk prediction, and doctor consultations.
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
            {['Full Stack Engineering', 'Next.js', 'React', 'Supabase', 'AI Integration', 'Product Architecture'].map(tag => (
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
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="contents"
          >
            {[
              { value: 1200, suffix: '+', label: 'Waitlist Users', sub: 'Organic, zero paid ads' },
              { value: 72, suffix: '', label: 'User Satisfaction (NPS)', sub: 'Pilot cohort' },
              { value: 5, suffix: '', label: 'Core Modules', sub: 'Built end to end' },
              { value: 48, suffix: 'hr', label: 'Lab Turnaround', sub: 'For diagnostics' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={{ hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
                style={{ background: "#111111" }} className="rounded-2xl p-5 border border-white/[0.08]">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 400, backgroundImage: "linear-gradient(135deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.5px", marginBottom: "4px" }}>
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-semibold text-[rgba(255,255,255,0.9)]">{stat.label}</div>
                <div className="text-xs text-[rgba(255,255,255,0.45)] mt-0.5">{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Brief */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal variant="fadeIn">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "3px", color: "var(--t4)", textTransform: "uppercase", marginBottom: "16px" }}>/ THE BRIEF</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.8px", marginBottom: "24px", color: "var(--t1)" }}>The problem worth solving</h2>
          </Reveal>
          <motion.div
            className="grid md:grid-cols-3 gap-4 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {[
              { stat: '1 in 5', desc: 'Indian women have PCOS' },
              { stat: '6+ yrs', desc: 'Average diagnosis delay for hormonal conditions' },
              { stat: '80%', desc: 'Of tests are clinical or invasive — causing stigma' },
            ].map(item => (
              <motion.div
                key={item.stat}
                variants={{ hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
                style={{ background: "#111111" }} className="rounded-2xl p-6 border border-[#3B82F6]/15">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 400, backgroundImage: "linear-gradient(135deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.5px", marginBottom: "8px" }}>{item.stat}</div>
                <p className="text-[rgba(255,255,255,0.45)] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <Reveal delay={0.16}>
            <p className="text-[rgba(255,255,255,0.45)] text-lg leading-relaxed">
              Sheknowmics came to Kinetic with a bold vision — build India's first full-stack women's health OS that combines non-invasive home diagnostics, AI-powered cycle intelligence, and personalised care in a single platform. No such product existed. I was brought in to architect and build the entire product from scratch.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What We Built */}
      <section style={{ background: "#111111" }} className="py-20 px-6 border-y border-white/[0.07]">
        <div className="max-w-4xl mx-auto">
          <Reveal variant="fadeIn">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "3px", color: "var(--t4)", textTransform: "uppercase", marginBottom: "16px" }}>/ WHAT WE BUILT</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.8px", marginBottom: "40px", color: "var(--t1)" }}>Five modules. One platform.</h2>
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
                icon: '🌙',
                title: 'Cycle Intelligence Dashboard',
                desc: 'Real-time cycle phase tracking (Luteal, Follicular, Ovulatory, Menstrual) with hormone level visualisation — Estrogen, Progesterone, LH, FSH — health score, regularity index, and fertility window prediction.',
                tags: ['React', 'Data Visualisation', 'AI'],
              },
              {
                icon: '🧪',
                title: 'Home Diagnostics Shop',
                desc: 'End-to-end e-commerce for CDSCO/CE/FDA/IVD approved at-home test kits — PCOS Panel, CerviArogya HPV DNA, Period Blood Panel, and Hormobalance. Order management, discreet delivery, and 48hr lab TAT.',
                tags: ['E-commerce', 'Order Management', 'Supabase'],
              },
              {
                icon: '👩‍⚕️',
                title: 'Doctor Consultation Booking',
                desc: 'Full telemedicine and in-clinic appointment booking with specialty filtering (Gynaecology, Reproductive Endocrinology), doctor profiles, ratings, and 100% confidential consultation guarantee.',
                tags: ['Booking System', 'Real-time', 'Privacy'],
              },
              {
                icon: '📚',
                title: 'Learn & AI Assistant',
                desc: 'Daily personalised health insights, expert reads, and the Sheknowmics AI — a conversational health assistant trained to answer questions about cycles, PCOS, fertility, and more.',
                tags: ['AI Integration', 'Content Engine', 'Personalisation'],
              },
              {
                icon: '👤',
                title: 'User Profile & Health Summary',
                desc: 'Longitudinal health tracking with cycle summary, test history, notification management, DISHA-compliant privacy controls, and multi-language support.',
                tags: ['DISHA Compliance', 'Encryption', 'i18n'],
              },
            ].map((module, idx) => (
              <motion.div
                key={module.title}
                variants={{ hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                style={{ background: "#111111" }} className="rounded-2xl p-6 border border-white/[0.08] hover:border-[#3B82F6]/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center text-xl shrink-0">
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-[#3B82F6]">0{idx + 1}</span>
                      <h3 className="font-bold text-[rgba(255,255,255,0.9)]">{module.title}</h3>
                    </div>
                    <p className="text-[rgba(255,255,255,0.45)] text-sm leading-relaxed mb-3">{module.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {module.tags.map(tag => (
                        <span key={tag} style={{ background: "var(--bg)" }} className="px-2 py-0.5 rounded-full text-xs font-mono text-[rgba(255,255,255,0.45)] border border-white/[0.07]">
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
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.8px", marginBottom: "40px", color: "var(--t1)" }}>Built to scale from day one</h2>
          </Reveal>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {[
              { layer: 'Frontend', tech: 'Next.js 14, React, Tailwind CSS' },
              { layer: 'Backend', tech: 'Supabase, PostgreSQL, Row Level Security' },
              { layer: 'AI Layer', tech: 'Custom AI assistant, Personalisation engine' },
              { layer: 'Compliance', tech: 'DISHA-compliant, Encrypted at rest' },
            ].map(item => (
              <motion.div
                key={item.layer}
                variants={{ hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
                style={{ background: "#111111" }} className="rounded-2xl p-5 border border-white/[0.08]">
                <p className="text-xs font-mono text-[#3B82F6] mb-2 uppercase tracking-wider">{item.layer}</p>
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
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.8px", marginBottom: "24px", color: "var(--t1)" }}>Pre-launch. Already gaining traction.</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-[rgba(255,255,255,0.45)] text-lg leading-relaxed mb-10">
              Sheknowmics launched with a complete, production-ready platform that no competitor in India has fully replicated. With 1,200+ waitlist signups acquired organically and an NPS of 72 from its pilot cohort, the platform is primed for its public launch.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "16px", padding: "32px" }}>
              <p className="text-xs font-mono text-[#8B5CF6] tracking-widest uppercase mb-3">WHAT MAKES IT UNIQUE</p>
              <p className="text-[rgba(255,255,255,0.9)] text-lg leading-relaxed">
                Sheknowmics is the only platform in India that combines consumer cycle tracking, molecular diagnostics, AI risk prediction, and telemedicine in a single privacy-first product. We didn't just build an app — we built the infrastructure for a new category.
              </p>
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
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 400, letterSpacing: "-1px", marginBottom: "24px", color: "var(--t1)" }}>Have a product that needs engineering?</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-[rgba(255,255,255,0.45)] text-lg mb-8">I build full-stack digital products end to end — from architecture to deployment.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="https://cal.com/ayush-gupta-xpzedb/free-business-audit-kinetic"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 32px", background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", borderRadius: "100px", color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "15px", textDecoration: "none", transition: "all 0.25s ease", border: "none" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15 9.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.5l4 3V6.5l-4 3Z"/>
                </svg>
                Book a Strategy Call
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/[0.07] text-center">
        <p className="text-xs font-mono text-[rgba(255,255,255,0.45)]">© 2026 KINETIC // BUILDWITHKINETIC.ORG</p>
      </footer>
    </>
  )
}
