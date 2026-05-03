'use client'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SphereMesh() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.09
    }
  })

  return (
    <group ref={groupRef}>
      {/* Full sphere wireframe */}
      <mesh>
        <sphereGeometry args={[1.75, 28, 14]} />
        <meshBasicMaterial
          color="#6ee7b7"
          wireframe
          transparent
          opacity={0.13}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.75, 0.007, 4, 90]} />
        <meshBasicMaterial color="#6ee7b7" transparent opacity={0.38} />
      </mesh>

      {/* Tilted orbit ring */}
      <mesh rotation={[Math.PI / 5, 0, Math.PI / 9]}>
        <torusGeometry args={[1.75, 0.005, 4, 90]} />
        <meshBasicMaterial color="#6ee7b7" transparent opacity={0.20} />
      </mesh>

      {/* Second tilted orbit ring */}
      <mesh rotation={[-Math.PI / 6, Math.PI / 4, 0]}>
        <torusGeometry args={[1.75, 0.004, 4, 90]} />
        <meshBasicMaterial color="#6ee7b7" transparent opacity={0.14} />
      </mesh>
    </group>
  )
}

export default function GlobeDome3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SphereMesh />
      </Suspense>
    </Canvas>
  )
}
