'use client'
import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Floating particles orbiting the sphere ── */
function Particles({ count = 90 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // random spherical distribution between radius 1.4 and 3.4
      const r = 1.4 + Math.random() * 2.0
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      sz[i] = 0.8 + Math.random() * 2.2
    }
    return [pos, sz]
  }, [count])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.18
      ref.current.rotation.x += delta * 0.04
      // subtle "breathing" scale
      const t = state.clock.elapsedTime
      ref.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.03)
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#6ee7b7"
        size={0.025}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ── Main sphere mesh — abstract energy field ── */
function SphereMesh() {
  const outerRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // Outer group — 3.5× faster than before
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.25
      outerRef.current.rotation.x += delta * 0.06
    }
    // Inner counter-rotating group — fast
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.35
      innerRef.current.rotation.z += delta * 0.15
    }
    // Pulsing glow
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.025 + Math.sin(t * 1.2) * 0.015
    }
  })

  return (
    <>
      {/* Central pulsing glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#6ee7b7"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer group — abstract wireframe + orbit rings */}
      <group ref={outerRef}>
        {/* Primary wireframe — denser, more ethereal */}
        <mesh>
          <sphereGeometry args={[2.6, 28, 14]} />
          <meshBasicMaterial color="#6ee7b7" wireframe transparent opacity={0.05} side={THREE.DoubleSide} />
        </mesh>

        {/* Second wireframe layer — offset rotation for depth */}
        <mesh rotation={[0.3, 0.5, 0.2]}>
          <sphereGeometry args={[2.55, 20, 10]} />
          <meshBasicMaterial color="#a7f3d0" wireframe transparent opacity={0.03} side={THREE.DoubleSide} />
        </mesh>

        {/* Equator ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.6, 0.006, 4, 120]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.35} />
        </mesh>

        {/* Orbit rings at various tilts */}
        <mesh rotation={[Math.PI / 5, 0, Math.PI / 9]}>
          <torusGeometry args={[2.6, 0.004, 4, 120]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.18} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[2.6, 0.004, 4, 120]} />
          <meshBasicMaterial color="#a7f3d0" transparent opacity={0.12} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 5, Math.PI / 7]}>
          <torusGeometry args={[2.6, 0.003, 4, 120]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.09} />
        </mesh>
        <mesh rotation={[-Math.PI / 7, -Math.PI / 4, Math.PI / 3]}>
          <torusGeometry args={[2.6, 0.003, 4, 120]} />
          <meshBasicMaterial color="#a7f3d0" transparent opacity={0.07} />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, Math.PI / 6, -Math.PI / 5]}>
          <torusGeometry args={[2.6, 0.003, 4, 120]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.06} />
        </mesh>

        {/* Outer halo ring — larger radius for layered depth */}
        <mesh rotation={[Math.PI / 6, 0.3, 0.1]}>
          <torusGeometry args={[3.2, 0.003, 4, 140]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.08} />
        </mesh>
        <mesh rotation={[-Math.PI / 3.5, 0.7, -0.4]}>
          <torusGeometry args={[3.1, 0.002, 4, 140]} />
          <meshBasicMaterial color="#a7f3d0" transparent opacity={0.05} />
        </mesh>
      </group>

      {/* Inner counter-rotating group — tighter, faster */}
      <group ref={innerRef}>
        <mesh rotation={[Math.PI / 3, 0.4, 0]}>
          <torusGeometry args={[1.85, 0.005, 4, 100]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.15} />
        </mesh>
        <mesh rotation={[-Math.PI / 5, 0.8, Math.PI / 4]}>
          <torusGeometry args={[1.85, 0.004, 4, 100]} />
          <meshBasicMaterial color="#a7f3d0" transparent opacity={0.10} />
        </mesh>
        <mesh rotation={[Math.PI / 4, -0.5, -Math.PI / 3]}>
          <torusGeometry args={[1.85, 0.003, 4, 100]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.07} />
        </mesh>
        {/* Extra inner ring for density */}
        <mesh rotation={[0.9, -0.3, 1.2]}>
          <torusGeometry args={[1.5, 0.003, 4, 80]} />
          <meshBasicMaterial color="#a7f3d0" transparent opacity={0.06} />
        </mesh>
      </group>

      {/* Orbiting particles */}
      <Particles count={90} />
    </>
  )
}

export default function GlobeDome3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SphereMesh />
      </Suspense>
    </Canvas>
  )
}
