'use client'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function DomeMesh() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Lower hemisphere (bowl) — rotation.x = Math.PI flips upper hemisphere */}
      <mesh rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[4, 44, 22, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial
          color="#34d399"
          wireframe
          transparent
          opacity={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Equator ring — brighter */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.012, 4, 120]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.55} />
      </mesh>

      {/* Inner glow disc at equator */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 60]} />
        <meshBasicMaterial
          color="#34d399"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default function GlobeDome3D() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 8.5], fov: 55 }}
      onCreated={({ camera }) => camera.lookAt(0, -0.8, 0)}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <DomeMesh />
      </Suspense>
    </Canvas>
  )
}
