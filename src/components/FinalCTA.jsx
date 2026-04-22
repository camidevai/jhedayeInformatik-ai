import { useEffect, useRef } from 'react'

export default function FinalCTA() {
  const containerRef = useRef(null)

  useEffect(() => {
    const c = containerRef.current
    if (!c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const count = 30
    const colors = ['#0097D2', '#FF5F00', 'rgba(255,255,255,0.6)']
    const particles = []

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      const size = Math.random() * 3 + 1
      const color = colors[Math.floor(Math.random() * colors.length)]
      const tx = (Math.random() - 0.5) * 60
      const ty = -30 - Math.random() * 60
      p.style.cssText = [
        `position:absolute`,
        `width:${size}px`,
        `height:${size}px`,
        `border-radius:50%`,
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `background:${color}`,
        `--tx:${tx}px`,
        `--ty:${ty}px`,
        `animation:pdrift ${5 + Math.random() * 6}s ease-in-out infinite`,
        `animation-delay:${Math.random() * 5}s`,
        `pointer-events:none`,
      ].join(';')
      c.appendChild(p)
      particles.push(p)
    }

    return () => particles.forEach(p => p.remove())
  }, [])

  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: `5rem clamp(32px,6vw,80px) 6rem`, borderTop: '1px solid rgba(0,151,210,0.08)' }}
    >
      {/* Particles container */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Vertical line accent top */}
      <div
        className="absolute top-0 left-0 w-px h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom,rgba(0,151,210,0.5),transparent)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 anim-hidden">

        <div className="section-label mb-8">
          Siguiente paso
        </div>

        <h2
          className="font-['Syne'] font-bold text-white leading-[1.05] mb-6"
          style={{
            fontSize:      'clamp(2.4rem, 5.5vw, 4.5rem)',
            letterSpacing: '-0.025em',
          }}
        >
          El primer paso cuesta cero.
          <br />
          <span className="gradient-text-accent">La inacción, todo.</span>
        </h2>

        <p className="text-[#D0CFCD]/45 text-sm mb-10 max-w-xs">
          30 minutos. Sin formularios. Una conversación honesta.
        </p>

        <a
          href="#agenda"
          onClick={(e) => { e.preventDefault(); document.querySelector('#agenda')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-sm text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(255,95,0,0.5)]"
          style={{
            background: 'linear-gradient(135deg,#FF5F00,#cc4900)',
            boxShadow:  '0 4px 35px rgba(255,95,0,0.32)',
          }}
        >
          Agendar ahora
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>

      </div>
    </section>
  )
}
