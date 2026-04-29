'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

/* ─── Icons ─────────────────────────────────────────────────────────── */
const DigitalMarketingIcon = () => (
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
    {/* Bar chart with upward arrow */}
    <rect x="7" y="30" width="5" height="10" rx="1" fill="rgba(16,185,129,0.22)" stroke="rgba(16,185,129,0.25)" strokeWidth="0.5" />
    <rect x="14" y="24" width="5" height="16" rx="1" fill="rgba(16,185,129,0.32)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5" />
    <rect x="21" y="17" width="5" height="23" rx="1" fill="rgba(16,185,129,0.42)" stroke="rgba(16,185,129,0.35)" strokeWidth="0.5" />
    <rect x="28" y="11" width="5" height="29" rx="1" fill="rgba(16,185,129,0.52)" stroke="rgba(16,185,129,0.4)" strokeWidth="0.5" />
    {/* Trend line */}
    <path d="M9 29 L16 23 L23 16 L30 10" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Arrow tip */}
    <path d="M27 8 L31 10 L29 14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Sparkle */}
    <circle cx="39" cy="10" r="2" fill="rgba(16,185,129,0.7)" />
    <line x1="39" y1="6" x2="39" y2="8" stroke="rgba(16,185,129,0.5)" strokeWidth="1" strokeLinecap="round" />
    <line x1="39" y1="12" x2="39" y2="14" stroke="rgba(16,185,129,0.5)" strokeWidth="1" strokeLinecap="round" />
    <line x1="35" y1="10" x2="37" y2="10" stroke="rgba(16,185,129,0.5)" strokeWidth="1" strokeLinecap="round" />
    <line x1="41" y1="10" x2="43" y2="10" stroke="rgba(16,185,129,0.5)" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

const AiAgentsIcon = () => (
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
    {/* Neural network nodes */}
    <circle cx="24" cy="10" r="5" stroke="rgba(245,158,11,0.55)" strokeWidth="1.5" fill="rgba(245,158,11,0.06)" />
    <circle cx="10" cy="32" r="5" stroke="rgba(245,158,11,0.55)" strokeWidth="1.5" fill="rgba(245,158,11,0.06)" />
    <circle cx="38" cy="32" r="5" stroke="rgba(245,158,11,0.55)" strokeWidth="1.5" fill="rgba(245,158,11,0.06)" />
    {/* Connecting lines */}
    <path d="M20 14 L13 28" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M28 14 L35 28" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M15 32 L33 32" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="3 3" />
    {/* Node fills */}
    <circle cx="24" cy="10" r="2.5" fill="rgba(245,158,11,0.75)" />
    <circle cx="10" cy="32" r="2.5" fill="rgba(245,158,11,0.5)" />
    <circle cx="38" cy="32" r="2.5" fill="rgba(245,158,11,0.5)" />
    {/* Mid-point dots */}
    <circle cx="17" cy="21" r="1.5" fill="rgba(245,158,11,0.35)" />
    <circle cx="31" cy="21" r="1.5" fill="rgba(245,158,11,0.35)" />
    <circle cx="24" cy="32" r="1.5" fill="rgba(245,158,11,0.35)" />
    {/* Sparkle above */}
    <path d="M24 2 L25 5 L28 5 L26 7 L27 10 L24 8 L21 10 L22 7 L20 5 L23 5 Z" fill="rgba(245,158,11,0.35)" />
  </svg>
)

const WebsitesIcon = () => (
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
    {/* Browser chrome */}
    <rect x="4" y="7" width="40" height="32" rx="4" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" fill="rgba(59,130,246,0.04)" />
    <rect x="4" y="7" width="40" height="9" rx="4" fill="rgba(59,130,246,0.06)" />
    {/* Browser dots */}
    <circle cx="11" cy="11.5" r="1.5" fill="rgba(255,255,255,0.2)" />
    <circle cx="16" cy="11.5" r="1.5" fill="rgba(255,255,255,0.15)" />
    <circle cx="21" cy="11.5" r="1.5" fill="rgba(255,255,255,0.1)" />
    {/* URL bar */}
    <rect x="26" y="9" width="14" height="5" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
    {/* Hero section */}
    <rect x="9" y="20" width="30" height="8" rx="2" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />
    {/* Content lines */}
    <rect x="9" y="31" width="18" height="2" rx="1" fill="rgba(255,255,255,0.12)" />
    <rect x="9" y="34" width="12" height="2" rx="1" fill="rgba(255,255,255,0.07)" />
    {/* CTA button */}
    <rect x="29" y="30" width="10" height="6" rx="2" fill="rgba(59,130,246,0.3)" stroke="rgba(59,130,246,0.4)" strokeWidth="0.5" />
  </svg>
)

const AndroidAppsIcon = () => (
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
    {/* Phone body */}
    <rect x="13" y="4" width="22" height="40" rx="4" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" fill="rgba(139,92,246,0.04)" />
    {/* Screen area */}
    <rect x="15" y="11" width="18" height="26" rx="1" fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.1)" strokeWidth="0.5" />
    {/* Home indicator */}
    <rect x="20" y="42" width="8" height="1.5" rx="0.75" fill="rgba(255,255,255,0.15)" />
    {/* Camera dot */}
    <circle cx="24" cy="7.5" r="1.2" fill="rgba(255,255,255,0.15)" />
    {/* App icons 2x2 grid */}
    <rect x="17" y="13" width="6" height="6" rx="1.5" fill="rgba(59,130,246,0.2)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />
    <rect x="25" y="13" width="6" height="6" rx="1.5" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.2)" strokeWidth="0.5" />
    <rect x="17" y="21" width="6" height="6" rx="1.5" fill="rgba(245,158,11,0.2)" stroke="rgba(245,158,11,0.2)" strokeWidth="0.5" />
    <rect x="25" y="21" width="6" height="6" rx="1.5" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.25)" strokeWidth="0.5" />
    {/* Bottom bar */}
    <rect x="16" y="30" width="16" height="2" rx="1" fill="rgba(255,255,255,0.08)" />
    <rect x="16" y="33" width="10" height="2" rx="1" fill="rgba(255,255,255,0.05)" />
    {/* Android signal bars at top right */}
    <rect x="28" y="7" width="1.5" height="1.5" rx="0.5" fill="rgba(255,255,255,0.25)" />
    <rect x="30" y="6.5" width="1.5" height="2" rx="0.5" fill="rgba(255,255,255,0.2)" />
    <rect x="32" y="6" width="1.5" height="2.5" rx="0.5" fill="rgba(255,255,255,0.15)" />
  </svg>
)

/* ─── Card data ─────────────────────────────────────────────────────── */
const cards = [
  { id: 'marketing', label: 'Digital Marketing', Icon: DigitalMarketingIcon, cx: 100, cy: 80,  color: 'rgba(16,185,129,' },
  { id: 'ai',        label: 'AI Agents',          Icon: AiAgentsIcon,        cx: 340, cy: 60,  color: 'rgba(245,158,11,' },
  { id: 'websites',  label: 'Websites',           Icon: WebsitesIcon,        cx: 80,  cy: 260, color: 'rgba(59,130,246,' },
  { id: 'apps',      label: 'Android Apps',       Icon: AndroidAppsIcon,     cx: 360, cy: 260, color: 'rgba(139,92,246,' },
]

const connections = [
  { from: 'marketing', to: 'ai'       },
  { from: 'marketing', to: 'websites' },
  { from: 'ai',        to: 'apps'     },
  { from: 'websites',  to: 'apps'     },
]

function getCenterById(id: string) {
  const card = cards.find(c => c.id === id)!
  return { cx: card.cx, cy: card.cy }
}

const VW = 460
const VH = 340
const CARD_W = 120
const CARD_H = 100

/* ═══ Desktop Diagram ═══════════════════════════════════════════════ */
function DiagramFull({ hovered, setHovered }: { hovered: string | null; setHovered: (v: string | null) => void }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '460px',
      aspectRatio: `${VW} / ${VH}`,
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120%', height: '120%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* SVG connection lines */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, overflow: 'visible' }}
      >
        <defs>
          <marker id="infra-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.15)" />
          </marker>
        </defs>

        {connections.map(({ from, to }) => {
          const a = getCenterById(from)
          const b = getCenterById(to)
          const isActive = hovered === from || hovered === to
          const midX = (a.cx + b.cx) / 2
          const midY = (a.cy + b.cy) / 2
          const offsetX = (b.cy - a.cy) * 0.12
          const offsetY = -(b.cx - a.cx) * 0.12

          return (
            <motion.path
              key={`${from}-${to}`}
              d={`M ${a.cx} ${a.cy} Q ${midX + offsetX} ${midY + offsetY} ${b.cx} ${b.cy}`}
              fill="none"
              stroke={isActive ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.08)'}
              strokeWidth={isActive ? 1.5 : 1}
              strokeDasharray="6 4"
              markerEnd="url(#infra-arrow)"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
            />
          )
        })}

        {/* Pulsing mid-point dots */}
        {connections.map(({ from, to }) => {
          const a = getCenterById(from)
          const b = getCenterById(to)
          const midX = (a.cx + b.cx) / 2
          const midY = (a.cy + b.cy) / 2
          const isActive = hovered === from || hovered === to
          return (
            <motion.circle
              key={`dot-${from}-${to}`}
              cx={midX} cy={midY}
              r={isActive ? 4 : 3}
              fill={isActive ? '#3B82F6' : 'rgba(59,130,246,0.5)'}
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${midX}px ${midY}px` }}
            />
          )
        })}
      </svg>

      {/* Cards */}
      {cards.map(({ id, label, Icon, cx, cy, color }) => {
        const isActive = hovered === id
        const leftPct = ((cx - CARD_W / 2) / VW) * 100
        const topPct  = ((cy - CARD_H / 2) / VH) * 100
        const wPct    = (CARD_W / VW) * 100
        const hPct    = (CARD_H / VH) * 100

        return (
          <motion.div
            key={id}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            animate={{ y: isActive ? -4 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: `${leftPct}%`,
              top: `${topPct}%`,
              width: `${wPct}%`,
              height: `${hPct}%`,
              background: isActive ? `${color}0.07)` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isActive ? `${color}0.35)` : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '14px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '8px', cursor: 'default', zIndex: 2,
              transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              boxShadow: isActive
                ? `0 8px 32px ${color}0.12), 0 0 0 1px ${color}0.1)`
                : '0 2px 8px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <Icon />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
              color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
              letterSpacing: '0.3px', transition: 'color 0.3s ease',
              whiteSpace: 'nowrap', textAlign: 'center', lineHeight: 1.3,
            }}>{label}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ═══ Mobile Diagram — 2x2 Grid ════════════════════════════════════ */
function DiagramCompact({ hovered, setHovered }: { hovered: string | null; setHovered: (v: string | null) => void }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      maxWidth: '300px',
      position: 'relative',
    }}>
      <svg viewBox="0 0 300 220" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}>
        <motion.line x1="75" y1="50" x2="225" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 3"
          animate={{ strokeDashoffset: [0, -14] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.line x1="75" y1="170" x2="225" y2="170" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 3"
          animate={{ strokeDashoffset: [0, -14] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.line x1="75" y1="55" x2="75" y2="165" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 3"
          animate={{ strokeDashoffset: [0, -14] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.line x1="225" y1="55" x2="225" y2="165" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 3"
          animate={{ strokeDashoffset: [0, -14] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.circle cx="150" cy="110" r="3" fill="rgba(59,130,246,0.5)"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '150px 110px' }}
        />
      </svg>

      {cards.map(({ id, label, Icon, color }) => {
        const isActive = hovered === id
        return (
          <motion.div
            key={id}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            whileTap={{ scale: 0.97 }}
            style={{
              background: isActive ? `${color}0.07)` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isActive ? `${color}0.35)` : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '12px',
              padding: '20px 12px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '8px', zIndex: 1,
              transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              boxShadow: isActive
                ? `0 6px 24px ${color}0.12)`
                : '0 2px 8px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <Icon />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500,
              color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
              letterSpacing: '0.3px', transition: 'color 0.3s ease',
              textAlign: 'center', lineHeight: 1.3,
            }}>{label}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ═══ Main Export ════════════════════════════════════════════════════ */
export default function InfrastructureDiagram() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <>
      <div className="infra-full" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <DiagramFull hovered={hovered} setHovered={setHovered} />
      </div>
      <div className="infra-compact" style={{ display: 'none', justifyContent: 'center' }}>
        <DiagramCompact hovered={hovered} setHovered={setHovered} />
      </div>

      <style>{`
        .infra-full { display: flex !important; }
        .infra-compact { display: none !important; }
        @media (max-width: 640px) {
          .infra-full { display: none !important; }
          .infra-compact { display: flex !important; }
        }
      `}</style>
    </>
  )
}
