'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Projeto {
  slug: string
  nome: string
  resumo?: string
  tecnologias: string[]
  imagem?: string
  url?: string
}

interface ProjectsCarouselProps {
  projetos: Projeto[]
}

export default function ProjectsCarousel({ projetos }: ProjectsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const card = scrollRef.current.querySelector('[data-card]') as HTMLElement | null
    const amount = card ? card.offsetWidth + 32 : 700
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-emerald-400 hover:border-emerald-400/50 transition-all duration-200"
        aria-label="Scroll left"
      >
        ←
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 pb-6 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projetos.map((projeto) => (
          <div
            key={projeto.slug}
            data-card
            className="group relative min-w-85 md:min-w-150 lg:min-w-205 snap-center"
          >
            <div className="flex flex-col lg:flex-row rounded-2xl border border-white/5 bg-zinc-900/60 backdrop-blur-md overflow-hidden hover:border-emerald-400/30 transition-colors duration-300 h-full">
              {/* Left: info */}
              <div className="flex flex-col p-8 flex-1 min-w-0">
                <h3 className="font-mono font-bold text-xl md:text-2xl text-emerald-400 mb-2 leading-tight">
                  {projeto.nome}
                </h3>
                {projeto.resumo && (
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {projeto.resumo}
                  </p>
                )}
                {projeto.tecnologias.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projeto.tecnologias.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-zinc-500 border border-zinc-700/60 px-2.5 py-1 rounded tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                    {projeto.tecnologias.length > 6 && (
                      <span className="font-mono text-[10px] text-zinc-600 border border-zinc-800 px-2.5 py-1 rounded">
                        +{projeto.tecnologias.length - 6}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex gap-4 mt-auto">
                  <Link
                    href={`/projetos/${projeto.slug}`}
                    className="flex items-center gap-2 font-mono text-xs text-emerald-400 border border-emerald-400/30 px-4 py-2 rounded hover:bg-emerald-400/10 transition-all duration-200"
                  >
                    View Details →
                  </Link>
                  {projeto.url && (
                    <a
                      href={projeto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-mono text-xs text-zinc-400 border border-zinc-700 px-4 py-2 rounded hover:border-zinc-500 transition-all duration-200"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right: image */}
              <div className="relative w-full lg:w-64 xl:w-80 aspect-video lg:aspect-auto shrink-0 bg-zinc-950">
                {projeto.imagem ? (
                  <Image
                    src={projeto.imagem}
                    alt={projeto.nome}
                    fill
                    sizes="(max-width: 1024px) 100vw, 320px"
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,rgba(52,211,153,0.08),rgba(96,165,250,0.06))' }}
                  >
                    <span className="font-mono text-zinc-700 text-xs tracking-widest">
                      NO PREVIEW
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-emerald-400 hover:border-emerald-400/50 transition-all duration-200"
        aria-label="Scroll right"
      >
        →
      </button>
    </div>
  )
}
