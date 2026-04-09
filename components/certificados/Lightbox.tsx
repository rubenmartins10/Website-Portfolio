"use client";

import Image from "next/image";
import { useEffect } from "react";

interface LightboxProps {
  imagemUrl: string;
  nome: string; // <-- Atualizado
  onClose: () => void;
}

export default function Lightbox({ imagemUrl, nome, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-zinc-400 hover:text-white text-4xl transition-colors z-50"
      >
        &times;
      </button>
      
      <div 
        className="relative w-full max-w-5xl h-[80vh] rounded-lg overflow-hidden animate-in zoom-in-95 duration-200" 
        onClick={(e) => e.stopPropagation()} 
      >
        <Image 
          src={imagemUrl} 
          alt={nome} 
          fill 
          className="object-contain" 
        />
      </div>
    </div>
  );
}