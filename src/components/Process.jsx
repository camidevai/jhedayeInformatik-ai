const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.4">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Diseño',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.4">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Desarrollo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.4">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Deploy',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.4">
        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Optimización',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.4">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Process() {
  return (
    <section
      id="proceso"
      className="relative overflow-hidden"
      style={{ padding: `5rem clamp(32px,6vw,80px)`, borderTop: '1px solid rgba(0,151,210,0.08)' }}
    >
      <div>

        {/* Header */}
        <div className="mb-14 anim-hidden">
          <div className="section-label">Metodología</div>
          <h2
            className="font-['Syne'] font-bold text-white"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
          >
            Cómo trabajamos
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Línea conectora */}
          <div className="hidden lg:block absolute top-[52px] left-[4%] right-[4%] h-px" aria-hidden="true">
            <div className="h-full process-line opacity-20" />
            {steps.map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#0097D2]/50"
                style={{ left: `${i * 25}%` }}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-3">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="anim-hidden group flex flex-col items-center text-center gap-4"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Círculo principal */}
                <div
                  className="relative w-[104px] h-[104px] rounded-full flex items-center justify-center transition-all duration-400 group-hover:scale-105"
                  style={{
                    background: 'rgba(0,55,100,0.35)',
                    border:     '1px solid rgba(0,151,210,0.2)',
                    boxShadow:  '0 0 0 8px rgba(0,151,210,0.04)',
                  }}
                >
                  {/* Número de fondo */}
                  <span
                    className="absolute font-['Syne'] font-bold text-5xl leading-none select-none"
                    style={{ color: 'rgba(0,151,210,0.07)', top: '10px', right: '14px' }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  {/* Icono */}
                  <div
                    className="relative z-10 flex flex-col items-center gap-1"
                    style={{ color: '#0097D2' }}
                  >
                    {step.icon}
                  </div>
                  {/* Anillo exterior en hover */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ boxShadow: '0 0 25px rgba(0,151,210,0.35)' }}
                    aria-hidden="true"
                  />
                </div>

                {/* Número visible */}
                <span
                  className="text-[#FF5F00] text-xs font-bold tracking-[0.2em] font-['Syne']"
                >
                  {step.number}
                </span>

                {/* Título */}
                <h3 className="font-['Syne'] font-bold text-white text-base group-hover:text-[#0097D2] transition-colors duration-300">
                  {step.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
