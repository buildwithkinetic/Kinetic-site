import Image from 'next/image'

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--background)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '32px clamp(24px, 8vw, 80px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      {/* Left — wordmark */}
      <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
        KINETIC
      </span>

      {/* Center — copyright */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          color: '#334155',
          margin: 0,
          textAlign: 'center',
        }}
      >
        © 2024 Kinetic. All rights reserved.
      </p>

      {/* Right — domain */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          color: '#334155',
          margin: 0,
        }}
      >
        buildwithkinetic.org
      </p>
    </footer>
  )
}
