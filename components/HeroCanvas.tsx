'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const NODE_COUNT = 130
const CONNECTION_DISTANCE = 170
const HERO_NODES = 6 // brighter, larger anchor nodes

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const w = container.clientWidth
    const h = container.clientHeight

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ── Scene / Camera ─────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 2000)
    camera.position.set(0, 0, 750)

    // ── Nodes (particles) ─────────────────────────────────────────
    const nodePositions = new Float32Array(NODE_COUNT * 3)
    const velocities: THREE.Vector3[] = []
    const sizes = new Float32Array(NODE_COUNT)

    for (let i = 0; i < NODE_COUNT; i++) {
      nodePositions[i * 3]     = (Math.random() - 0.5) * 1400
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 1000
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 700
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.28,
        (Math.random() - 0.5) * 0.28,
        (Math.random() - 0.5) * 0.12,
      ))
      sizes[i] = i < HERO_NODES ? 7 + Math.random() * 4 : 1.5 + Math.random() * 2.5
    }

    // Small dots
    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))
    pointsGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const pointsMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      sizeAttenuation: true,
      size: 2.8,
      transparent: true,
      opacity: 0.75,
    })
    const points = new THREE.Points(pointsGeo, pointsMat)
    scene.add(points)

    // Hero nodes — glowing spheres
    const heroMeshes: THREE.Mesh[] = []
    for (let i = 0; i < HERO_NODES; i++) {
      const geo = new THREE.SphereGeometry(5 + Math.random() * 3, 16, 16)
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x3b82f6 : 0x818cf8,
        transparent: true,
        opacity: 0.9,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(
        nodePositions[i * 3],
        nodePositions[i * 3 + 1],
        nodePositions[i * 3 + 2],
      )
      scene.add(mesh)
      heroMeshes.push(mesh)
    }

    // ── Connection lines ───────────────────────────────────────────
    const MAX_LINES = NODE_COUNT * 5
    const linePositions = new Float32Array(MAX_LINES * 6)
    const lineColors = new Float32Array(MAX_LINES * 6) // per-vertex color for opacity fade

    const linesGeo = new THREE.BufferGeometry()
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    linesGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
    })
    const lineSegments = new THREE.LineSegments(linesGeo, linesMat)
    scene.add(lineSegments)

    // ── Mouse parallax ─────────────────────────────────────────────
    let targetMouseX = 0
    let targetMouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ─────────────────────────────────────────────────────
    const onResize = () => {
      const nw = container.clientWidth
      const nh = container.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ─────────────────────────────────────────────
    let frame = 0
    let animId: number
    const BOUNDS = { x: 700, y: 500, z: 350 }

    const animate = () => {
      animId = requestAnimationFrame(animate)
      frame++

      const pos = pointsGeo.attributes.position.array as Float32Array

      // Move particles
      for (let i = 0; i < NODE_COUNT; i++) {
        const xi = i * 3, yi = xi + 1, zi = xi + 2
        pos[xi] += velocities[i].x
        pos[yi] += velocities[i].y
        pos[zi] += velocities[i].z

        if (pos[xi] >  BOUNDS.x) pos[xi] = -BOUNDS.x
        if (pos[xi] < -BOUNDS.x) pos[xi] =  BOUNDS.x
        if (pos[yi] >  BOUNDS.y) pos[yi] = -BOUNDS.y
        if (pos[yi] < -BOUNDS.y) pos[yi] =  BOUNDS.y
        if (pos[zi] >  BOUNDS.z) pos[zi] = -BOUNDS.z
        if (pos[zi] < -BOUNDS.z) pos[zi] =  BOUNDS.z

        // Sync hero meshes
        if (i < HERO_NODES) {
          heroMeshes[i].position.set(pos[xi], pos[yi], pos[zi])
          const pulse = 1 + 0.18 * Math.sin(frame * 0.025 + i * 1.2)
          heroMeshes[i].scale.setScalar(pulse)
        }
      }
      pointsGeo.attributes.position.needsUpdate = true

      // Rebuild lines every 2 frames
      if (frame % 2 === 0) {
        let li = 0
        const lp = linesGeo.attributes.position.array as Float32Array
        const lc = linesGeo.attributes.color.array as Float32Array

        for (let i = 0; i < NODE_COUNT && li < MAX_LINES; i++) {
          for (let j = i + 1; j < NODE_COUNT && li < MAX_LINES; j++) {
            const dx = pos[i * 3] - pos[j * 3]
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

            if (dist < CONNECTION_DISTANCE) {
              const fade = 1 - dist / CONNECTION_DISTANCE
              const isHeroEdge = i < HERO_NODES || j < HERO_NODES
              const r = isHeroEdge ? 0.35 : 0.18
              const g = isHeroEdge ? 0.45 : 0.32
              const b = isHeroEdge ? 0.95 : 0.85

              const base = li * 6
              lp[base]     = pos[i * 3];     lp[base + 1] = pos[i * 3 + 1]; lp[base + 2] = pos[i * 3 + 2]
              lp[base + 3] = pos[j * 3];     lp[base + 4] = pos[j * 3 + 1]; lp[base + 5] = pos[j * 3 + 2]
              lc[base]     = r * fade;        lc[base + 1] = g * fade;        lc[base + 2] = b * fade
              lc[base + 3] = r * fade * 0.5; lc[base + 4] = g * fade * 0.5; lc[base + 5] = b * fade * 0.5
              li++
            }
          }
        }

        // Zero out stale lines
        for (let k = li * 6; k < MAX_LINES * 6; k++) {
          lp[k] = 0; lc[k] = 0
        }
        linesGeo.attributes.position.needsUpdate = true
        linesGeo.attributes.color.needsUpdate = true
        linesGeo.setDrawRange(0, li * 2)
      }

      // Camera — smooth parallax + slow drift
      camera.position.x += (targetMouseX * 55 - camera.position.x) * 0.04
      camera.position.y += (-targetMouseY * 38 - camera.position.y) * 0.04
      camera.lookAt(scene.position)

      // Slow scene rotation
      scene.rotation.y += 0.00022
      scene.rotation.x += 0.00006

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
