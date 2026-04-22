import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Nosotros', href: '#nosotros' },
]

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-[#0097D2]/10 py-3'
          : 'bg-transparent py-5'
      }`}
      role="banner"
    >
      {/* Scroll progress line */}
      {scrolled && (
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      )}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <div className="flex items-center gap-2">
            {/* JhedAi badge */}
            <span className="font-['Syne'] font-bold text-white text-lg tracking-tight leading-none">
              Jhed<span className="text-[#0097D2]">Ai</span>
            </span>
            <span className="text-[#D0CFCD]/40 text-sm font-light">×</span>
            <span className="font-['Syne'] font-bold text-white text-lg tracking-tight leading-none">
              Informatik<span className="text-[#0097D2]">-AI</span>
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm text-[#D0CFCD]/70 hover:text-white transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#agenda"
            onClick={(e) => handleNavClick(e, '#agenda')}
            className="px-5 py-2.5 rounded-full bg-[#FF5F00] hover:bg-[#e55500] text-white text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_25px_rgba(255,95,0,0.4)] hover:-translate-y-0.5"
          >
            Agendar reunión
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#D0CFCD] hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <div className="w-6 flex flex-col gap-1.5 items-end">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass border-t border-[#0097D2]/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[#D0CFCD]/80 hover:text-white transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#agenda"
            onClick={(e) => handleNavClick(e, '#agenda')}
            className="mt-2 w-full text-center px-5 py-2.5 rounded-full bg-[#FF5F00] text-white text-sm font-semibold"
          >
            Agendar reunión
          </a>
        </div>
      </div>
    </header>
  )
}
