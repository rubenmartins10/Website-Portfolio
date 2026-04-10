'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Registar o plugin apenas no lado do cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// O TypeScript agora sabe que o stagger existe!
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  distance?: number;
  stagger?: number; 
}

export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0,
  distance = 50,
  stagger = 0 
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let x = 0;
    let y = 0;

    switch (direction) {
      case 'up': y = distance; break;
      case 'down': y = -distance; break;
      case 'left': x = distance; break;
      case 'right': x = -distance; break;
    }

    // Se passarmos um stagger, o GSAP vai procurar os itens individuais e animá-los em sequência
    if (stagger > 0 && containerRef.current) {
      const items = containerRef.current.querySelectorAll('.stagger-item');
      if (items.length > 0) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", 
          },
          x: x,
          y: y,
          opacity: 0,
          duration: 0.8,
          delay: delay,
          stagger: stagger,
          ease: "power3.out"
        });
        return; // Termina aqui para não correr a animação global
      }
    }

    // Animação global (quando não há stagger ou itens específicos)
    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", 
      },
      x: x,
      y: y,
      opacity: 0,
      duration: 0.8,
      delay: delay,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="will-change-transform w-full">
      {children}
    </div>
  );
}