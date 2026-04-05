'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const sx = useSpring(mx, { stiffness: 350, damping: 30 })
  const sy = useSpring(my, { stiffness: 350, damping: 30 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true) }
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    const onOver = (e: MouseEvent) => {
      setHovering(!!(e.target as Element)?.closest?.('a,button,[role=button]'))
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onOver)
    }
  }, [mx, my])

  return (
    <>
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          pointerEvents: 'none',
          x: sx, y: sy,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          width: hovering ? 44 : clicking ? 20 : 32,
          height: hovering ? 44 : clicking ? 20 : 32,
        }}
        transition={{ duration: 0.18 }}
      >
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          border: `1.5px solid ${hovering ? '#3B82F6' : 'rgba(240,240,238,0.25)'}`,
          transition: 'border-color 0.2s',
        }} />
      </motion.div>
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          pointerEvents: 'none',
          x: mx, y: my,
          translateX: '-50%', translateY: '-50%',
          width: 5, height: 5,
          borderRadius: '50%',
          background: '#3B82F6',
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  )
}
