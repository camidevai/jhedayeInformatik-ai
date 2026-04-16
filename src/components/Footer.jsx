const footerLinks = [
  {
    title: 'Servicios',
    links: [
      { label: 'Software con IA', href: '#servicios' },
      { label: 'Agentes IA', href: '#servicios' },
      { label: 'Visión por Computadora', href: '#servicios' },
      { label: 'Machine Learning', href: '#servicios' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Cómo trabajamos', href: '#proceso' },
      { label: 'Por qué elegirnos', href: '#nosotros' },
      { label: 'Agendar reunión', href: '#agenda' },
    ],
  },
]

function NavLink({ href, children }) {
  const handleClick = (e) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-[#D0CFCD]/45 hover:text-[#0097D2] text-sm transition-colors duration-200"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-[#0097D2]/10 py-16 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-['Syne'] font-bold text-xl text-white mb-3">
              Jhed<span className="text-[#0097D2]">Ai</span>
              <span className="text-[#D0CFCD]/30 mx-2 font-light">×</span>
              Informatik<span className="text-[#0097D2]">-AI</span>
            </div>
            <p className="text-[#D0CFCD]/45 text-sm leading-relaxed max-w-xs">
              Alianza estratégica para el desarrollo de soluciones tecnológicas con inteligencia artificial aplicada.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                {
                  label: 'LinkedIn',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  ),
                },
                {
                  label: 'Twitter / X',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <button
                  key={s.label}
                  className="w-9 h-9 rounded-full glass border border-[#0097D2]/15 flex items-center justify-center text-[#D0CFCD]/40 hover:text-[#0097D2] hover:border-[#0097D2]/40 transition-all duration-200"
                  aria-label={s.label}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">{col.title}</h4>
              <ul className="space-y-3" role="list">
                {col.links.map((link) => (
                  <li key={link.label} role="listitem">
                    <NavLink href={link.href}>{link.label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#0097D2]/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#D0CFCD]/30 text-xs">
            © 2025 JhedAi × Informatik-AI. Todos los derechos reservados.
          </p>
          <p className="text-[#D0CFCD]/20 text-xs">
            Diseñado y desarrollado por la propia alianza.
          </p>
        </div>
      </div>
    </footer>
  )
}
