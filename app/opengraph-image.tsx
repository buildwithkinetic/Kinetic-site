import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Kinetic — The System Behind Your Growth'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0F0F0E',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(232,93,4,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Logo mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '52px' }}>
          <div style={{
            width: '52px', height: '52px',
            background: '#0F0F0E',
            border: '2px solid #3B82F6',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '30px', fontWeight: 900, color: '#3B82F6',
          }}>
            K
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#EDEAE3', letterSpacing: '4px' }}>
            KINETIC
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: '68px',
          fontWeight: 800,
          color: '#EDEAE3',
          lineHeight: 1.0,
          letterSpacing: '-2.5px',
          marginBottom: '28px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <span>The System Behind</span>
          <span style={{ color: '#3B82F6', fontStyle: 'italic' }}>Your Growth.</span>
        </div>

        {/* Service tags */}
        <div style={{
          fontSize: '15px',
          color: '#5A5A57',
          letterSpacing: '2.5px',
          fontFamily: 'Courier New, monospace',
          marginBottom: '0',
        }}>
          WEB · SEO · CRM · AUTOMATION · FULL STACK · AI AGENTS
        </div>

        {/* URL */}
        <div style={{
          position: 'absolute', bottom: '56px', right: '80px',
          fontSize: '14px', color: '#2E2E2C', letterSpacing: '1.5px',
          fontFamily: 'Courier New, monospace',
        }}>
          buildwithkinetic.org
        </div>

        {/* Orange accent line */}
        <div style={{
          position: 'absolute', left: '80px', bottom: '56px',
          width: '48px', height: '3px', background: '#3B82F6', borderRadius: '2px',
        }} />
      </div>
    ),
    { ...size }
  )
}
