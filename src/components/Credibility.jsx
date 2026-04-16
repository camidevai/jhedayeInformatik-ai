const pillars = [
  {
    stat: '100%',
    label: 'Ejecución propia',
    sub: 'No consultamos sin construir.',
    color: '#0097D2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.4">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    stat: '2 en 1',
    label: 'Estrategia + código',
    sub: 'Negocio y técnica en el mismo equipo.',
    color: '#FF5F00',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.4">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    stat: 'Rápido',
    label: 'Ciclos cortos',
    sub: 'Equipos pequeños, decisiones inmediatas.',
    color: '#0097D2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.4">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Credibility() {
  return (
    <section
      id="nosotros"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#020D1A 0%,rgba(0,55,100,0.1) 50%,#020D1A 100%)' }}
    >
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(0,151,210,0.06),transparent 70%)', filter: 'blur(40px)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20 anim-hidden">
          <span className="text-[#FF5F00] text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">
            Por qué elegirnos
          </span>
          <h2 className="font-['Syne'] font-bold text-white" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
            La alianza que construye
          </h2>
        </div>

        {/* 3 pilares visuales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className="anim-hidden group relative rounded-2xl p-8 flex flex-col gap-6 overflow-hidden hover:-translate-y-2 transition-all duration-350"
              style={{
                background:      'rgba(2,13,26,0.7)',
                border:          '1px solid rgba(0,151,210,0.1)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Fondo hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 20% 30%,${p.color}10,transparent)` }}
                aria-hidden="true"
              />
              {/* Barra superior */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(to right,${p.color},transparent)` }}
                aria-hidden="true"
              />

              {/* Stat grande */}
              <div
                className="font-['Syne'] font-bold leading-none"
                style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', color: p.color, textShadow: `0 0 40px ${p.color}40` }}
              >
                {p.stat}
              </div>

              {/* Icono + label */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}25`, color: p.color }}
                >
                  {p.icon}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{p.label}</div>
                  <div className="text-[#D0CFCD]/40 text-xs mt-0.5">{p.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote — mínima */}
        <blockquote
          className="anim-hidden text-center max-w-2xl mx-auto"
        >
          <div className="font-['Syne'] text-xl md:text-2xl text-white/80 font-semibold leading-relaxed">
            "La calidad de lo que construimos es el mejor argumento que tenemos."
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#0097D2]/30" />
            <span className="text-[#D0CFCD]/35 text-xs tracking-widest uppercase">JhedAi × Informatik-AI</span>
            <div className="h-px w-12 bg-[#0097D2]/30" />
          </div>
        </blockquote>

      </div>
    </section>
  )
}
