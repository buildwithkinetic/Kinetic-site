'use client'
import { useEffect, useRef } from 'react'

export default function NetworkCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    let cleanup: (() => void) | undefined

    const init = async () => {
      const THREE = await import('three')

      // ── Scene setup ──────────────────────────────────────────────
      const scene = new THREE.Scene()
      const w = mount.clientWidth || window.innerWidth
      const h = mount.clientHeight || window.innerHeight
      const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 200)
      camera.position.set(0, 0, 14)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)
      renderer.domElement.style.position = 'absolute'
      renderer.domElement.style.inset = '0'

      // ── Node positions (growth system topology) ───────────────────
      interface NodeData {
        label: string
        x: number
        y: number
        z: number
      }
      
      const NODE_DATA: NodeData[] = [
        { label: 'Website',    x: -4.5, y:  2.0, z:  0.5 },
        { label: 'SEO',        x: -1.5, y:  3.8, z: -1.0 },
        { label: 'Leads',      x:  2.5, y:  3.0, z:  1.0 },
        { label: 'CRM',        x:  4.5, y:  0.5, z: -0.5 },
        { label: 'Automation', x:  2.5, y: -2.5, z:  1.0 },
        { label: 'AI Agent',   x: -1.0, y: -3.5, z: -0.5 },
        { label: 'Revenue',    x: -4.0, y: -1.5, z:  0.5 },
        { label: '',           x:  0.5, y:  0.8, z:  2.5 },
        { label: '',           x: -2.0, y:  1.5, z: -2.0 },
        { label: '',           x:  1.5, y: -0.8, z: -2.0 },
        { label: '',           x: -0.5, y: -1.8, z:  2.5 },
        { label: '',           x:  3.5, y:  2.0, z: -1.5 },
        { label: '',           x: -3.0, y:  0.5, z:  1.5 },
      ]

      const LIME = new THREE.Color(0xC8FB4C)
      const WHITE = new THREE.Color(0xFFFFFF)

      // ── Build node meshes ─────────────────────────────────────────
      const nodes: any[] = []
      const halos: any[] = []
      const basePositions: any[] = []

      for (const nd of NODE_DATA) {
        const isLabeled = nd.label !== ''
        const radius = isLabeled ? 0.10 : 0.065
        const geo = new THREE.SphereGeometry(radius, 12, 12)
        const mat = new THREE.MeshBasicMaterial({
          color: isLabeled ? LIME : WHITE,
          transparent: true,
          opacity: isLabeled ? 0.95 : 0.6,
        })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(nd.x, nd.y, nd.z)
        scene.add(mesh)
        nodes.push(mesh)

        // Glow halo
        const haloGeo = new THREE.SphereGeometry(radius * 4, 12, 12)
        const haloMat = new THREE.MeshBasicMaterial({
          color: isLabeled ? LIME : WHITE,
          transparent: true,
          opacity: isLabeled ? 0.06 : 0.03,
        })
        const halo = new THREE.Mesh(haloGeo, haloMat)
        halo.position.copy(mesh.position)
        scene.add(halo)
        halos.push(halo)

        basePositions.push(mesh.position.clone())
      }

      // ── Build edges ───────────────────────────────────────────────
      type EdgePair = [number, number]
      const EDGES: EdgePair[] = [
        [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],
        [0,8],[1,8],[2,7],[3,7],[3,9],[4,9],[4,10],
        [5,10],[6,12],[0,12],[2,11],[3,11],[7,8],[9,10],
      ]

      const edgeLines: any[] = []
      const edgeLineMat = new THREE.LineBasicMaterial({
        color: 0xC8FB4C, transparent: true, opacity: 0.12,
      })

      for (const [a, b] of EDGES) {
        const pts = [nodes[a].position, nodes[b].position]
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        const line = new THREE.Line(geo, edgeLineMat)
        scene.add(line)
        edgeLines.push(line)
      }

      // ── Flowing particles ─────────────────────────────────────────
      const PARTICLE_COUNT = 40
      const pGeo = new THREE.SphereGeometry(0.045, 6, 6)

      interface Particle {
        mesh: any
        halo: any
        edge: EdgePair
        t: number
        speed: number
      }

      const particles: Particle[] = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const edge = EDGES[Math.floor(Math.random() * EDGES.length)]
        const pMat = new THREE.MeshBasicMaterial({
          color: 0xE5FFB0, transparent: true, opacity: 0.9,
        })
        const hMat = new THREE.MeshBasicMaterial({
          color: 0xC8FB4C, transparent: true, opacity: 0.15,
        })
        const mesh = new THREE.Mesh(pGeo, pMat)
        const halo = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), hMat)
        scene.add(mesh)
        scene.add(halo)
        particles.push({
          mesh, halo, edge,
          t: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
        })
      }

      // ── Background star field ────────────────────────────────────
      const starGeo = new THREE.BufferGeometry()
      const starCount = 120
      const starPos = new Float32Array(starCount * 3)
      for (let i = 0; i < starCount; i++) {
        starPos[i*3]   = (Math.random() - 0.5) * 60
        starPos[i*3+1] = (Math.random() - 0.5) * 40
        starPos[i*3+2] = -10 + Math.random() * -20
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
      const starMat = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.04, transparent: true, opacity: 0.3 })
      scene.add(new THREE.Points(starGeo, starMat))

      // ── Mouse parallax ────────────────────────────────────────────
      const mouse = { x: 0, y: 0 }
      const targetRot = { x: 0, y: 0 }
      const currentRot = { x: 0, y: 0 }
      const onMouseMove = (e: MouseEvent) => {
        const rect = mount.getBoundingClientRect()
        mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        targetRot.y = mouse.x * 0.3
        targetRot.x = -mouse.y * 0.15
      }
      window.addEventListener('mousemove', onMouseMove)

      // ── Group for rotation ────────────────────────────────────────
      const group = new THREE.Group()
      nodes.forEach((n: any) => { group.add(n); scene.remove(n) })
      halos.forEach((h: any) => { group.add(h); scene.remove(h) })
      edgeLines.forEach((l: any) => { group.add(l); scene.remove(l) })
      particles.forEach((p: Particle) => { group.add(p.mesh); group.add(p.halo); scene.remove(p.mesh); scene.remove(p.halo) })
      scene.add(group)

      // ── Animate ───────────────────────────────────────────────────
      let rafId: number
      let t = 0

      const animate = () => {
        rafId = requestAnimationFrame(animate)
        t += 0.008

        group.rotation.y += 0.0008
        currentRot.x += (targetRot.x - currentRot.x) * 0.04
        currentRot.y += (targetRot.y - currentRot.y) * 0.04
        group.rotation.x = currentRot.x
        group.rotation.y += (currentRot.y - group.rotation.y) * 0.01

        nodes.forEach((node: any, i: number) => {
          const base = basePositions[i]
          node.position.y = base.y + Math.sin(t + i * 0.7) * 0.12
          node.position.x = base.x + Math.cos(t * 0.6 + i * 0.5) * 0.06
          halos[i].position.copy(node.position)

          const isLabeled = i < 7
          if (isLabeled) {
            const pulse = 0.85 + Math.sin(t * 2 + i) * 0.15
            node.material.opacity = pulse
            halos[i].material.opacity = 0.04 + pulse * 0.06
          }
        })

        EDGES.forEach(([a, b]: EdgePair, i: number) => {
          const pos = edgeLines[i].geometry.attributes.position as any
          pos.setXYZ(0, nodes[a].position.x, nodes[a].position.y, nodes[a].position.z)
          pos.setXYZ(1, nodes[b].position.x, nodes[b].position.y, nodes[b].position.z)
          pos.needsUpdate = true
        })

        particles.forEach((p: Particle) => {
          p.t += p.speed
          if (p.t > 1) {
            p.t = 0
            const destNode = p.edge[1]
            const nextEdges = EDGES.filter(e => e[0] === destNode || e[1] === destNode)
            if (nextEdges.length > 0) {
              const next = nextEdges[Math.floor(Math.random() * nextEdges.length)]
              p.edge = next[0] === destNode ? next : [next[1], next[0]] as EdgePair
            }
          }

          const src = nodes[p.edge[0]].position
          const dst = nodes[p.edge[1]].position
          p.mesh.position.lerpVectors(src, dst, p.t)
          p.halo.position.copy(p.mesh.position)

          const fade = Math.sin(p.t * Math.PI)
          p.mesh.material.opacity = 0.5 + fade * 0.5
          p.halo.material.opacity = fade * 0.18
        })

        renderer.render(scene, camera)
      }
      animate()

      // Resize handler
      const onResize = () => {
        if (!mount) return
        const w2 = mount.clientWidth
        const h2 = mount.clientHeight
        camera.aspect = w2 / h2
        camera.updateProjectionMatrix()
        renderer.setSize(w2, h2)
      }
      window.addEventListener('resize', onResize)

      return () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      }
    }

    init().then(fn => { cleanup = fn })
    return () => { cleanup?.() }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
