const stats = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
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
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
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
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
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
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
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
  const SECTION_PAD = 'clamp(32px,6vw,80px)'

  return (
    <section style={{ padding: `5rem ${SECTION_PAD}`, borderTop: '1px solid rgba(0,151,210,0.08)' }}>

      <div className="section-label anim-hidden">Por qué trabajar con nosotros</div>

      <div
        className="grid grid-cols-2 gap-px anim-hidden"
        style={{
          background:    'rgba(0,151,210,0.07)',
          borderRadius:  '16px',
          overflow:      'hidden',
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="group relative flex flex-col gap-4 cursor-default"
            style={{
              background:      'rgba(2,13,26,0.9)',
              padding:         'clamp(1.5rem,3vw,2.5rem)',
              transitionDelay: `${i * 70}ms`,
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 80% 60% at 20% 40%,${s.accent}0D,transparent)` }}
            />
            {/* Accent bar bottom */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
              style={{ background: `linear-gradient(to right,${s.accent},transparent)` }}
            />

            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center relative z-10 transition-all duration-300 group-hover:scale-110"
              style={{ background: `${s.accent}18`, border: `1px solid ${s.accent}35`, color: s.accent }}
            >
              {s.icon}
            </div>

            <div className="relative z-10">
              <div
                className="font-['Syne'] font-bold leading-none mb-1.5"
                style={{ fontSize: 'clamp(1.8rem,3.2vw,2.6rem)', color: s.accent, textShadow: `0 0 28px ${s.accent}45` }}
              >
                {s.value}
              </div>
              <div className="text-white font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-[#D0CFCD]/40 text-xs leading-relaxed">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
