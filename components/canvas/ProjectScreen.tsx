'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, PresentationControls, useTexture } from '@react-three/drei';

function ScreenImage({ url }: { url: string }) {
  const texture = useTexture(url);
  return (
    <mesh position={[0, 0, 0.03]}>
      <planeGeometry args={[4, 2.25]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

export default function ProjectScreen({ imageUrl }: { imageUrl: string }) {
  if (!imageUrl) return null;

  return (
    <div className="w-full h-75 sm:h-100 md:h-125 cursor-grab active:cursor-grabbing rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        
        <PresentationControls
          global
          rotation={[0.05, -0.15, 0]}
          polar={[-0.2, 0.2]}
          azimuth={[-0.5, 0.5]}
          snap={true}
        >
          <Float rotationIntensity={0.4} floatIntensity={1.5} speed={2}>
            <mesh>
              <boxGeometry args={[4.2, 2.45, 0.05]} />
              <meshStandardMaterial color="#18181b" roughness={0.8} metalness={0.2} />
            </mesh>

            <Suspense fallback={null}>
              <ScreenImage url={imageUrl} />
            </Suspense>
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
}