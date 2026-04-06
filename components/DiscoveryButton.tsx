'use client'
import Link from 'next/link'
import { useState } from 'react'

interface DiscoveryButtonProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullWidth?: boolean
  darkMode?: boolean
}

export default function DiscoveryButton({ size = 'md', className = '', fullWidth = false, darkMode = false }: DiscoveryButtonProps) {
  const [hovered, setHovered] = useState(false)

  const pad     = size === 'sm' ? '9px 16px'  : size === 'lg' ? '16px 30px' : '13px 22px'
  const fsize   = size === 'sm' ? '13px'       : size === 'lg' ? '16px'      : '14px'
  const iconPx  = size === 'sm' ? 20           : size === 'lg' ? 28          : 24

  // Colour logic: darkMode = white outline on dark bg, hover flips to white fill
  const baseColor  = darkMode ? 'rgba(255,255,255,0.85)' : '#111111'
  const baseBorder = darkMode ? 'rgba(255,255,255,0.2)'  : '#111111'
  const hoverBg    = darkMode ? '#FFFFFF'                : '#3B82F6'
  const hoverColor = darkMode ? '#111111'                : '#FFFFFF'
  const hoverBorder= darkMode ? '#FFFFFF'                : '#3B82F6'

  return (
    <Link
      href="/book-call"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`discovery-btn ${className}`}
      style={{
        display:        fullWidth ? 'flex' : 'inline-flex',
        width:          fullWidth ? '100%' : 'auto',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '10px',
        padding:        pad,
        fontSize:       fsize,
        fontWeight:     500,
        letterSpacing:  '0.2px',
        color:          hovered ? hoverColor : baseColor,
        background:     hovered ? hoverBg    : 'transparent',
        border:         `1px solid ${hovered ? hoverBorder : baseBorder}`,
        borderRadius:   '8px',
        textDecoration: 'none',
        transition:     'all 280ms ease',
        boxShadow:      hovered ? '0 4px 20px rgba(59,130,246,0.25)' : 'none',
        cursor:         'pointer',
        whiteSpace:     'nowrap',
        minHeight:      '48px',
        lineHeight:     1,
      }}
    >
      {/* Meet icon container with sliding hover animation */}
      <span style={{
        position:   'relative',
        display:    'inline-flex',
        overflow:   'hidden',
        width:      `${iconPx}px`,
        height:     `${iconPx}px`,
        flexShrink: 0,
      }}>
        {/* Icon 1 — slides out on hover */}
        <img
          src="/icons/meet.svg"
          alt="Google Meet"
          width={iconPx}
          height={iconPx}
          style={{
            position:  'absolute',
            top:       0,
            left:      0,
            width:     `${iconPx}px`,
            height:    `${iconPx}px`,
            transform: hovered ? `translateY(-${iconPx}px) translateX(${iconPx * 0.33}px)` : 'translate(0,0)',
            transition:'transform 220ms ease',
          }}
        />
        {/* Icon 2 — slides in on hover */}
        <img
          src="/icons/meet.svg"
          alt=""
          aria-hidden="true"
          width={iconPx}
          height={iconPx}
          style={{
            position:  'absolute',
            top:       0,
            left:      `-${iconPx * 0.33}px`,
            width:     `${iconPx}px`,
            height:    `${iconPx}px`,
            transform: hovered ? 'translate(0,0)' : `translateY(${iconPx}px) translateX(-${iconPx * 0.33}px)`,
            transition:'transform 220ms ease',
          }}
        />
      </span>
      Book a Discovery Call
    </Link>
  )
}
