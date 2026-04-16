const stats = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    value: '3×',
    label: 'Más rápido',
    sub: 'que el desarrollo tradicional',
    accent: '#0097D2',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    value: '40%',
    label: 'Menos costo',
    sub: 'con el mismo nivel de calidad',
    accent: '#FF5F00',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    value: 'IA real',
    label: 'Aplicada',
    sub: 'no demos, no prototipos sin base',
    accent: '#0097D2',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    value: '100%',
    label: 'A medida',
    sub: 'arquitectura diseñada para tu caso',
    accent: '#FF5F00',
  },
]

export default function ValueStrip() {
  return (
    <section
      className="relative py-20 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020D1A 0%, rgba(0,55,100,0.12) 50%, #020D1A 100%)' }}
    >
      {/* Línea superior decorativa */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,151,210,0.4), rgba(255,95,0,0.3), transparent)' }}
        aria-hidden="true"
      />
      {/* Línea inferior decorativa */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,151,210,0.2), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">

        {/* Label de sección */}
        <div className="text-center mb-12 anim-hidden">
          <span className="text-[#D0CFCD]/35 text-xs tracking-[0.3em] uppercase font-medium">
            Por qué trabajar con nosotros
          </span>
        </div>

        {/* Grid de stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'rgba(0,151,210,0.08)', borderRadius: '20px', overflow: 'hidden' }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="anim-hidden group relative flex flex-col items-start gap-5 p-8 md:p-10 cursor-default"
              style={{
                background:     '#020D1A',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 30% 40%, ${stat.accent}0D, transparent)` }}
                aria-hidden="true"
              />

              {/* Icono */}
              <div
                className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${stat.accent}18`,
                  border:     `1px solid ${stat.accent}35`,
                  color:       stat.accent,
                }}
              >
                {stat.icon}
              </div>

              {/* Texto */}
              <div className="relative z-10">
                <div
                  className="font-['Syne'] font-bold leading-none mb-2"
                  style={{
                    fontSize:   'clamp(2rem, 3.5vw, 2.8rem)',
                    color:       stat.accent,
                    textShadow: `0 0 30px ${stat.accent}50`,
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-white font-semibold text-sm mb-1.5 tracking-wide">
                  {stat.label}
                </div>
                <div className="text-[#D0CFCD]/40 text-xs leading-relaxed">
                  {stat.sub}
                </div>
              </div>

              {/* Línea de acento inferior — aparece en hover */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(to right, ${stat.accent}, transparent)` }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
