'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ParallaxCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    // Ativa a perspetiva 3D no GSAP
    gsap.set(card, { transformPerspective: 1000 });

    const xTo = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      // Inclina no máximo 8 graus (subtil e luxuoso)
      xTo(percentX * 8);
      yTo(-percentY * 8); 
    };

    const handleMouseLeave = () => {
      // Volta ao zero e tamanho normal quando o rato sai
      xTo(0);
      yTo(0);
      gsap.to(card, { scale: 1, duration: 0.5, ease: "power3.out" });
    };
    
    const handleMouseEnter = () => {
       // Dá um ligeiro "pop" (cresce 2%) quando o rato entra
       gsap.to(card, { scale: 1.02, duration: 0.5, ease: "power3.out" });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, { scope: cardRef });

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  );
}