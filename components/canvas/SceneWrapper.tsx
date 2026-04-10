'use client';

import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

// O next/dynamic desativa o SSR e carrega o código do Three.js apenas no lado do cliente
const Scene3D = dynamic(() => import('./Background3D'), {
  ssr: false,
});

export default function SceneWrapper() {
  // O triggerOnce garante que depois de carregar o 3D, não volta a descarregar
  const { ref, inView } = useInView({
    triggerOnce: true,
    fallbackInView: true,
  });

  return (
    // Um contentor invisível que serve para observar se o utilizador está na secção superior
    <div ref={ref} className="absolute inset-0 w-full h-full -z-20 pointer-events-none">
      {inView && <Scene3D />}
    </div>
  );
}