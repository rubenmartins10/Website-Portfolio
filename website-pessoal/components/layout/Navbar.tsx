'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
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

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'bg-[#08090c]/90 backdrop-blur-xl border-b border-white/[0.05]' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono font-bold text-white tracking-[0.15em] text-sm hover:text-emerald-400 transition-colors duration-200"
          >
            RÚBEN<span className="text-emerald-400">.DEV</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-mono text-xs tracking-[0.15em] transition-colors duration-200 ${
                    active
                      ? 'text-emerald-400'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {label.toUpperCase()}
                </Link>
              )
            })}
            <a
              href="mailto:rubendavidsilvamartins@gmail.com"
              className="font-mono text-xs tracking-[0.15em] px-4 py-2 border border-emerald-400/40 text-emerald-400 hover:bg-emerald-400 hover:text-[#08090c] transition-all duration-200 rounded"
            >
              CONTACT
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[6px] text-zinc-400 hover:text-white transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#08090c]/98 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden transition-all duration-500 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className="font-mono font-bold text-3xl tracking-[0.15em] text-zinc-400 hover:text-emerald-400 transition-colors duration-200"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transition: `color 0.2s ease, opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`,
              }}
            >
              {label}
            </Link>
          ))}
          <div className="w-px h-10 bg-zinc-800 mt-2" />
          <Link href="/admin" className="font-mono text-xs tracking-[0.25em] text-zinc-600 hover:text-emerald-400 transition-colors duration-200">
            ADMIN PANEL
          </Link>
        </nav>
      </div>
    </>
  )
}