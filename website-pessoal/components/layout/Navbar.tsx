'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projetos', label: 'Projects' },
  { href: '/artigos', label: 'Articles' },
  { href: '/certificados', label: 'Certifications' },
  { href: '/sobre', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono font-bold text-white tracking-[0.15em] text-sm hover:text-emerald-400 transition-colors duration-200 z-50"
          >
            RÚBEN<span className="text-emerald-400">.DEV</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative h-full font-mono text-xs tracking-widest transition-colors duration-200 flex items-center group ${
                    active ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {label.toUpperCase()}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 transition-all duration-300 ${
                      active
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-50'
                    }`}
                  />
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* DOWNLOAD CV — desktop only */}
            <a
              href="/RubenMartins_CV.pdf"
              download
              className="hidden md:inline-flex items-center justify-center px-4 py-2 font-mono text-xs font-bold tracking-widest rounded transition-all duration-200 hover:bg-emerald-400 hover:text-black"
              style={{
                background: 'rgba(52, 211, 153, 0.1)',
                border: '1px solid rgba(52, 211, 153, 0.5)',
                color: 'rgb(52, 211, 153)',
              }}
            >
              DOWNLOAD CV
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen(!open)}
              className="relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-zinc-400 hover:text-emerald-400 transition-colors duration-200 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span
                className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${
                  open ? 'rotate-45 translate-y-1.75' : ''
                }`}
              />
              <span
                className={`block w-6 h-px bg-current transition-all duration-300 ${
                  open ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${
                  open ? '-rotate-45 -translate-y-1.75' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Nav links */}
        <nav className="flex flex-col items-center gap-6 mb-12">
          {navLinks.map(({ href, label }, i) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`font-mono font-bold text-4xl md:text-5xl tracking-widest transition-all duration-200 ${
                  active ? 'text-emerald-400' : 'text-zinc-300 hover:text-emerald-400'
                }`}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(24px)',
                  transition: `color 0.2s ease, opacity 0.45s ease ${i * 70}ms, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms`,
                }}
              >
                {label.toUpperCase()}
              </Link>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="w-px h-12 bg-zinc-800 mb-8" />

        {/* Social / contact */}
        <div
          className="flex items-center gap-8"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.5s ease ${navLinks.length * 70 + 60}ms, transform 0.5s ease ${navLinks.length * 70 + 60}ms`,
          }}
        >
          <a
            href="mailto:rubendavidsilvamartins@gmail.com"
            className="font-mono text-xs text-zinc-500 hover:text-emerald-400 tracking-[0.2em] transition-colors duration-200"
          >
            EMAIL
          </a>
          <a
            href="https://linkedin.com/in/ruben-martins"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-500 hover:text-emerald-400 tracking-[0.2em] transition-colors duration-200"
          >
            LINKEDIN
          </a>
          <a
            href="https://github.com/rubendavid"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-500 hover:text-emerald-400 tracking-[0.2em] transition-colors duration-200"
          >
            GITHUB
          </a>
        </div>

        {/* Admin link */}
        <Link
          href="/admin"
          className="absolute bottom-10 font-mono text-[10px] tracking-[0.25em] text-zinc-700 hover:text-emerald-400 transition-colors duration-200"
          style={{
            opacity: open ? 1 : 0,
            transition: `opacity 0.5s ease ${navLinks.length * 70 + 120}ms`,
          }}
        >
          ADMIN PANEL
        </Link>
      </div>
    </>
  )
}
