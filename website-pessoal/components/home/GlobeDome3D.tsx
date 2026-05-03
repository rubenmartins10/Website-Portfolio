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
      {/* Outer slow-rotating sphere */}
      <group ref={groupRef}>
        {/* Main wireframe sphere — very sparse */}
        <mesh>
          <sphereGeometry args={[2.6, 16, 8]} />
          <meshBasicMaterial
            color="#6ee7b7"
            wireframe
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Equator ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.6, 0.007, 4, 100]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.35} />
        </mesh>

        {/* Tilted orbit 1 */}
        <mesh rotation={[Math.PI / 5, 0, Math.PI / 9]}>
          <torusGeometry args={[2.6, 0.005, 4, 100]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.18} />
        </mesh>

        {/* Tilted orbit 2 */}
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[2.6, 0.004, 4, 100]} />
          <meshBasicMaterial color="#a7f3d0" transparent opacity={0.10} />
        </mesh>
      </group>

      {/* Inner faster counter-rotating orbit — gives depth */}
      <group ref={innerRef}>
        <mesh rotation={[Math.PI / 3, 0.4, 0]}>
          <torusGeometry args={[1.8, 0.004, 4, 80]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.12} />
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
