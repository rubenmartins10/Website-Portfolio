'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Componente para animar a rotação das estrelas lentamente
function StarRotation({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
      groupRef.current.rotation.x += 0.0002;
    }
  });

  // Reduz drasticamente as estrelas em telemóveis para manter a performance a 60fps
  const starCount = isMobile ? 800 : 3000;

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={starCount} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

export default function Background3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Verifica o tamanho do ecrã após o componente montar
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Executa logo na primeira vez
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarRotation isMobile={isMobile} />
      </Canvas>
    </div>
  );
}