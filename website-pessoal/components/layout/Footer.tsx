import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-white/[0.06] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                <span className="text-emerald-400 font-bold text-sm">R</span>
              </div>
              <span className="font-semibold text-white text-sm">Rúben Martins</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Junior Engineer passionate about building fast and elegant digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/projetos', label: 'Projects' },
                { href: '/artigos', label: 'Articles' },
                { href: '/certificados', label: 'Certifications' },
                { href: '/sobre', label: 'About' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-zinc-500 hover:text-white text-sm transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <Link
                href="mailto:rubendavidsilvamartins@gmail.com"
                className="flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors w-fit"
              >
                <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                rubendavidsilvamartins@gmail.com
              </Link>
              <Link
                href="https://linkedin.com/in/ruben-martins"
                target="_blank"
                className="flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors w-fit"
              >
                <svg className="w-4 h-4 text-zinc-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-zinc-600 text-xs">
            © {year} Rúben Martins. All rights reserved.
          </p>
          <p className="text-zinc-700 text-xs">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}