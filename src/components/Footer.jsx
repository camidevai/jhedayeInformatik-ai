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
      className="text-[#D0CFCD]/65 hover:text-[#0097D2] text-sm transition-colors duration-200"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer
      className="border-t border-[#0097D2]/10"
      role="contentinfo"
      style={{ background: '#020D1A', padding: '4rem clamp(32px,5vw,80px)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-['Syne'] font-bold text-xl text-white mb-3">
              Jhed<span className="text-[#0097D2]">Ai</span>
              <span className="text-[#D0CFCD]/30 mx-2 font-light">×</span>
              Informatik<span className="text-[#0097D2]">-AI</span>
            </div>
            <p className="text-[#D0CFCD]/65 text-sm leading-relaxed max-w-xs">
              Alianza estratégica para el desarrollo de soluciones tecnológicas con inteligencia artificial aplicada.
            </p>
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
          <p className="text-[#D0CFCD]/50 text-xs">
            © 2025 JhedAi × Informatik-AI. Todos los derechos reservados.
          </p>
          <p className="text-[#D0CFCD]/40 text-xs">
            Diseñado y desarrollado por la propia alianza.
          </p>
        </div>
      </div>
    </footer>
  )
}
