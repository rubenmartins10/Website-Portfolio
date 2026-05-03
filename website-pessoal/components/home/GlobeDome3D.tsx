'use client'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SphereMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.07
      groupRef.current.rotation.x += delta * 0.015
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.13
      innerRef.current.rotation.z += delta * 0.05
    }
  })

  return (
    <>
      {/* Outer slow-rotating group */}
      <group ref={groupRef}>
        {/* Sparse wireframe sphere */}
        <mesh>
          <sphereGeometry args={[2.6, 18, 9]} />
          <meshBasicMaterial color="#6ee7b7" wireframe transparent opacity={0.07} side={THREE.DoubleSide} />
        </mesh>

        {/* Equator */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.6, 0.007, 4, 110]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.38} />
        </mesh>

        {/* Orbit rings at various tilts */}
        <mesh rotation={[Math.PI / 5, 0, Math.PI / 9]}>
          <torusGeometry args={[2.6, 0.005, 4, 110]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.20} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[2.6, 0.005, 4, 110]} />
          <meshBasicMaterial color="#a7f3d0" transparent opacity={0.14} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 5, Math.PI / 7]}>
          <torusGeometry args={[2.6, 0.004, 4, 110]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.11} />
        </mesh>
        <mesh rotation={[-Math.PI / 7, -Math.PI / 4, Math.PI / 3]}>
          <torusGeometry args={[2.6, 0.004, 4, 110]} />
          <meshBasicMaterial color="#a7f3d0" transparent opacity={0.09} />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, Math.PI / 6, -Math.PI / 5]}>
          <torusGeometry args={[2.6, 0.003, 4, 110]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.08} />
        </mesh>
        <mesh rotation={[-Math.PI / 3.5, Math.PI / 2.2, Math.PI / 8]}>
          <torusGeometry args={[2.6, 0.003, 4, 110]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.07} />
        </mesh>
      </group>

      {/* Inner counter-rotating group — tighter, faster */}
      <group ref={innerRef}>
        <mesh rotation={[Math.PI / 3, 0.4, 0]}>
          <torusGeometry args={[1.85, 0.005, 4, 90]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.15} />
        </mesh>
        <mesh rotation={[-Math.PI / 5, 0.8, Math.PI / 4]}>
          <torusGeometry args={[1.85, 0.004, 4, 90]} />
          <meshBasicMaterial color="#a7f3d0" transparent opacity={0.10} />
        </mesh>
        <mesh rotation={[Math.PI / 4, -0.5, -Math.PI / 3]}>
          <torusGeometry args={[1.85, 0.003, 4, 90]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.08} />
        </mesh>
      </group>
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
