'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

/* ─── Icons ─────────────────────────────────────────────────────────── */
const WebsiteIcon = () => (
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="6" width="40" height="32" rx="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
    <line x1="4" y1="14" x2="44" y2="14" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    <circle cx="10" cy="10" r="1.5" fill="rgba(255,255,255,0.3)" />
    <circle cx="15" cy="10" r="1.5" fill="rgba(255,255,255,0.3)" />
    <circle cx="20" cy="10" r="1.5" fill="rgba(255,255,255,0.3)" />
    <path d="M28 20l-2 8 3-3 4 1-5-6z" fill="rgba(255,255,255,0.7)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
    <rect x="10" y="18" width="14" height="2" rx="1" fill="rgba(255,255,255,0.15)" />
    <rect x="10" y="23" width="10" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
    <rect x="10" y="28" width="12" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
  </svg>
)

const CrmIcon = () => (
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="6" width="36" height="28" rx="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
    <rect x="6" y="6" width="36" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
    <rect x="10" y="8" width="8" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
    <rect x="20" y="8" width="6" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
    <rect x="10" y="16" width="8" height="14" rx="1.5" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
    <rect x="20" y="16" width="8" height="14" rx="1.5" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
    <rect x="30" y="16" width="8" height="14" rx="1.5" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
    <rect x="11" y="18" width="6" height="3" rx="1" fill="rgba(59,130,246,0.3)" />
    <rect x="11" y="23" width="6" height="3" rx="1" fill="rgba(59,130,246,0.15)" />
    <rect x="21" y="18" width="6" height="3" rx="1" fill="rgba(139,92,246,0.3)" />
    <rect x="31" y="18" width="6" height="3" rx="1" fill="rgba(139,92,246,0.15)" />
    <rect x="30" y="32" width="14" height="10" rx="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(17,17,17,0.9)" />
    <rect x="33" y="35" width="8" height="1.5" rx="0.75" fill="rgba(255,255,255,0.2)" />
    <rect x="33" y="38" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.12)" />
  </svg>
)

const AutomationsIcon = () => (
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="8" width="12" height="8" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
    <rect x="4" y="32" width="12" height="8" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
    <rect x="32" y="18" width="12" height="10" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
    <circle cx="7" cy="10" r="1" fill="rgba(59,130,246,0.6)" />
    <circle cx="10" cy="10" r="1" fill="rgba(59,130,246,0.6)" />
    <circle cx="13" cy="10" r="1" fill="rgba(59,130,246,0.6)" />
    <path d="M16 12 L24 12 L24 23 L32 23" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
    <path d="M16 36 L24 36 L24 23 L32 23" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
    <circle cx="38" cy="23" r="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
    <circle cx="38" cy="23" r="1" fill="rgba(255,255,255,0.2)" />
    <rect x="7" y="13" width="6" height="1" rx="0.5" fill="rgba(255,255,255,0.15)" />
    <rect x="7" y="35" width="6" height="1" rx="0.5" fill="rgba(255,255,255,0.15)" />
    <rect x="7" y="37" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.1)" />
  </svg>
)

const AdsIcon = () => (
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="6" width="40" height="32" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
    <rect x="10" y="26" width="5" height="8" rx="1" fill="rgba(59,130,246,0.25)" />
    <rect x="17" y="22" width="5" height="12" rx="1" fill="rgba(59,130,246,0.35)" />
    <rect x="24" y="18" width="5" height="16" rx="1" fill="rgba(99,102,241,0.4)" />
    <rect x="31" y="14" width="5" height="20" rx="1" fill="rgba(139,92,246,0.45)" />
    <path d="M12 25 L19 21 L26 17 L33 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M31 11 L34 12 L32 14" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
    <rect x="10" y="9" width="12" height="2" rx="1" fill="rgba(255,255,255,0.12)" />
  </svg>
)

/* ─── Card data with SVG-coordinate positions ───────────────────────── */
const cards = [
  { id: 'website',     label: 'Website',     Icon: WebsiteIcon,     cx: 100, cy: 80  },
  { id: 'crm',         label: 'CRM',          Icon: CrmIcon,         cx: 340, cy: 60  },
  { id: 'automations', label: 'Automations',  Icon: AutomationsIcon, cx: 80,  cy: 260 },
  { id: 'ads',         label: 'Ads',          Icon: AdsIcon,         cx: 360, cy: 260 },
]

const connections = [
  { from: 'website',     to: 'crm' },
  { from: 'website',     to: 'automations' },
  { from: 'crm',         to: 'ads' },
  { from: 'automations', to: 'ads' },
]

function getCenterById(id: string) {
  const card = cards.find(c => c.id === id)!
  return { cx: card.cx, cy: card.cy }
}

const VW = 460
const VH = 340
const CARD_W = 120
const CARD_H = 100

/* ═══ Desktop/Tablet Diagram — absolute positioned, scales via aspect-ratio ═══ */
function DiagramFull({ hovered, setHovered }: { hovered: string | null; setHovered: (v: string | null) => void }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '460px',
      aspectRatio: `${VW} / ${VH}`,
    }}>
      {/* Subtle glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120%', height: '120%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* SVG lines */}
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

        {/* Pulsing dots */}
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
      {cards.map(({ id, label, Icon, cx, cy }) => {
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
              background: isActive ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isActive ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '12px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '6px', cursor: 'pointer', zIndex: 2,
              transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              boxShadow: isActive
                ? '0 8px 32px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.1)'
                : '0 2px 8px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <Icon />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
              color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
              letterSpacing: '0.5px', transition: 'color 0.3s ease', whiteSpace: 'nowrap',
            }}>{label}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ═══ Mobile Diagram — simple 2x2 Grid with connecting lines ═══════ */
function DiagramCompact({ hovered, setHovered }: { hovered: string | null; setHovered: (v: string | null) => void }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      maxWidth: '300px',
      position: 'relative',
    }}>
      {/* Simple dashed lines connecting cards */}
      <svg viewBox="0 0 300 220" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}>
        {/* Horizontal lines */}
        <motion.line x1="75" y1="50" x2="225" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 3"
          animate={{ strokeDashoffset: [0, -14] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.line x1="75" y1="170" x2="225" y2="170" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 3"
          animate={{ strokeDashoffset: [0, -14] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        {/* Vertical lines */}
        <motion.line x1="75" y1="55" x2="75" y2="165" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 3"
          animate={{ strokeDashoffset: [0, -14] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.line x1="225" y1="55" x2="225" y2="165" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 3"
          animate={{ strokeDashoffset: [0, -14] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        {/* Center dot */}
        <motion.circle cx="150" cy="110" r="3" fill="rgba(59,130,246,0.5)"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '150px 110px' }}
        />
      </svg>

      {cards.map(({ id, label, Icon }) => {
        const isActive = hovered === id
        return (
          <motion.div
            key={id}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            whileTap={{ scale: 0.97 }}
            style={{
              background: isActive ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isActive ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '12px',
              padding: '20px 12px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '8px', zIndex: 1,
              transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              boxShadow: isActive
                ? '0 6px 24px rgba(59,130,246,0.12)'
                : '0 2px 8px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <Icon />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
              color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
              letterSpacing: '0.5px', transition: 'color 0.3s ease',
            }}>{label}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ═══ Main Export — switches between Full and Compact ═══════════════ */
export default function InfrastructureDiagram() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <>
      {/* Desktop / Tablet: absolute-positioned diagram */}
      <div className="infra-full" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <DiagramFull hovered={hovered} setHovered={setHovered} />
      </div>
      {/* Mobile: compact 2x2 grid */}
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
