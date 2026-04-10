'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function AnimatedTitle({ text, className = "" }: { text: string, className?: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const words = containerRef.current?.querySelectorAll('.word');
    if (words && words.length > 0) {
      gsap.from(words, {
        y: 30, // Desliza 30px de baixo para cima
        opacity: 0,
        duration: 0.8,
        stagger: 0.08, // Cada palavra espera 0.08s antes de seguir a anterior
        ease: "back.out(1.2)", // Dá um ressalto premium no final
        delay: 0.2 
      });
    }
  }, { scope: containerRef });

  return (
    <h1 ref={containerRef} className={className}>
      {text.split(' ').map((word, index) => (
        <span key={index} className="word inline-block mr-[0.25em]">
          {word}
        </span>
      ))}
    </h1>
  );
}