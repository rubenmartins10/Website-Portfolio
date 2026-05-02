'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // A animação de entrada (exatamente igual ao que tinhas: opacity 0 -> 1, y 20 -> 0)
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  return (
    // will-change-transform e will-change-opacity ajudam o browser a preparar a renderização
    <div ref={containerRef} className="will-change-transform will-change-opacity">
      {children}
    </div>
  );
}