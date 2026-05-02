'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/projetos', label: 'PROJECTS' },
  { href: '/artigos', label: 'ARTICLES' },
  { href: '/certificados', label: 'CERTIFICATIONS' },
  { href: '/sobre', label: 'ABOUT' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono font-bold text-white tracking-[0.15em] text-sm hover:text-emerald-400 transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            RÚBEN<span className="text-emerald-400">.DEV</span>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[6px] text-zinc-400 hover:text-white transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${
                open ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${
                open ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${
                open ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Fullscreen overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#08090c]/98 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-mono font-bold text-3xl md:text-4xl tracking-[0.15em] text-zinc-400 hover:text-emerald-400 transition-colors duration-200"
              style={{
                transitionDelay: open ? `${i * 60}ms` : '0ms',
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                opacity: open ? 1 : 0,
                transition: `color 0.2s ease, opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`,
              }}
            >
              {label}
            </Link>
          ))}

          <div className="w-px h-10 bg-zinc-800 mt-2" />

          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="font-mono text-xs tracking-[0.25em] text-zinc-600 hover:text-emerald-400 transition-colors duration-200"
          >
            ADMIN PANEL
          </Link>
        </nav>
      </div>
    </>
  )
}