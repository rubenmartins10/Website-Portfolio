'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fazer o cursor seguir o rato
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX - 7);
      yTo(e.clientY - 7);
    };

    window.addEventListener("mousemove", moveCursor);

    // Animação contínua dos "brilhos" na frente da seta
    gsap.to(".burst-line", {
      opacity: 0.1,
      scale: 0.7,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      stagger: 0.15,
      ease: "sine.inOut",
      transformOrigin: "bottom right"
    });

    // Efeito de Hover OBM (Óbvio, Bonito e Memorável)
    // Agora inclui também campos de texto (input, textarea)
    const interactables = document.querySelectorAll('a, button, input, textarea, [data-cursor]');
    
    const onEnter = () => {
      // 1. Cresce um pouco mais (1.3x) e dá um "tilt" para a esquerda (-15 graus)
      gsap.to(cursorRef.current, { scale: 1.3, rotation: -15, duration: 0.3, ease: "back.out(1.7)" });
      // 2. A seta fica branca com borda verde para destaque máximo
      gsap.to(".arrow-path", { fill: "#ffffff", stroke: "#10b981", duration: 0.3 });
    };
    
    const onLeave = () => {
      // Volta ao tamanho, rotação e cores originais
      gsap.to(cursorRef.current, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(".arrow-path", { fill: "#10b981", stroke: "#ffffff", duration: 0.3 });
    };

    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  });

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block w-6 h-6"
    >
      <svg viewBox="0 0 40 40" className="w-full h-full overflow-visible drop-shadow-md">
        
        {/* As "faíscas" / Brilho */}
        <g>
          <line x1="8" y1="8" x2="2" y2="2" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" className="burst-line" />
          <line x1="10" y1="6" x2="8" y2="0" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" className="burst-line" />
          <line x1="6" y1="10" x2="0" y2="8" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" className="burst-line" />
        </g>
        
        {/* A Seta em si - Agora com a class 'arrow-path' para ser animada */}
        <path 
          className="arrow-path"
          d="M12,12 L19,34 L23,23 L34,19 Z" 
          fill="#10b981"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}