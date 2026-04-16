import { useEffect, useRef } from 'react'

export default function FinalCTA() {
  const containerRef = useRef(null)

  useEffect(() => {
    const c = containerRef.current
    if (!c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const style = document.createElement('style')
    style.textContent = `@keyframes pdrift{0%,100%{transform:translate(0,0) scale(1);opacity:.12}50%{transform:translate(var(--tx),var(--ty)) scale(1.4);opacity:.45}}`
    document.head.appendChild(style)
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div')
      const size = Math.random() * 3 + 1
      p.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;background:${Math.random()>.7?'#FF5F00':'#0097D2'};--tx:${(Math.random()-0.5)*40}px;--ty:${-20-Math.random()*40}px;animation:pdrift ${4+Math.random()*5}s ease-in-out infinite;animation-delay:${Math.random()*4}s;pointer-events:none`
      c.appendChild(p)
    }
    return () => { style.remove(); [...c.children].forEach(ch => ch.remove()) }
  }, [])

  return (
    <section
      className="relative py-36 px-6 overflow-hidden text-center"
      style={{ background: 'linear-gradient(135deg,#020D1A 0%,#003764 50%,#020D1A 100%)' }}
    >
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 50%,rgba(0,151,210,0.10),transparent)' }} aria-hidden="true" />

      <div className="relative z-10 max-w-2xl mx-auto anim-hidden">

        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass text-[10px] text-[#0097D2] font-semibold tracking-[0.2em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F00] animate-pulse" />
          Siguiente paso
        </div>

        <h2
          className="font-['Syne'] font-bold text-white leading-tight mb-5"
          style={{ fontSize: 'clamp(2rem,5vw,3.2rem)' }}
        >
          El primer paso cuesta cero.
          <br />
          <span className="gradient-text-accent">La inacción, todo.</span>
        </h2>

        <p className="text-[#D0CFCD]/50 text-base mb-10">
          30 minutos. Sin formularios. Una conversación honesta.
        </p>

        <a
          href="#agenda"
          onClick={(e) => { e.preventDefault(); document.querySelector('#agenda')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg text-white transition-all duration-200 hover:-translate-y-1"
          style={{ background: '#FF5F00', boxShadow: '0 0 40px rgba(255,95,0,0.4)' }}
        >
          Agendar ahora
          <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>

      </div>
    </section>
  )
}
