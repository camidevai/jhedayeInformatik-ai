import { useState } from 'react'

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.4">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    number: '01',
    tag: 'Desarrollo',
    title: 'Software con IA',
    tagline: 'Aplicaciones que piensan',
    description:
      'Sistemas que integran modelos de lenguaje, lógica de negocio y experiencia de usuario en un solo producto funcional y mantenible.',
    benefit: 'Automatizás decisiones sin perder control del negocio.',
    color: '#0097D2',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    number: '02',
    tag: 'Automatización',
    title: 'Agentes IA',
    tagline: 'Procesos que se ejecutan solos',
    description:
      'Agentes autónomos que toman decisiones, procesan datos y activan flujos complejos. Se conectan con tus plataformas de gestión, bases de datos y canales de comunicación — desde WhatsApp e Instagram hasta ERP o CRM.',
    benefit: 'Reducís costos operativos y escalás sin contratar. Tus herramientas actuales siguen funcionando.',
    color: '#FF5F00',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.4">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    number: '03',
    tag: 'Computer Vision',
    title: 'Visión por Computadora',
    tagline: 'Máquinas que ven y entienden',
    description:
      'Detección de objetos, análisis de imágenes y reconocimiento visual en tiempo real para operaciones críticas y procesos industriales.',
    benefit: 'Control de calidad, seguridad y análisis visual automatizados.',
    color: '#0097D2',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.4">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    number: '04',
    tag: 'ML',
    title: 'Machine Learning',
    tagline: 'Modelos que mejoran con el uso',
    description:
      'Desde clasificación hasta predicción: entrenamos modelos adaptados a tus datos y objetivos, con criterio de producción real.',
    benefit: 'Decisiones basadas en datos, no en intuición.',
    color: '#FF5F00',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.4">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    number: '05',
    tag: 'Custom',
    title: 'Soluciones a Medida',
    tagline: 'Arquitectura pensada para crecer',
    description:
      'Diseño técnico integral desde la base de datos hasta la interfaz, con criterio de escalabilidad real y deuda técnica controlada.',
    benefit: 'Plataformas que crecen con tu negocio sin reescribirse.',
    color: '#0097D2',
  },
]

function ServiceCard({ s, i, active, onEnter, onLeave }) {
  return (
    <div
      className="anim-hidden group relative flex flex-col overflow-hidden rounded-2xl cursor-default"
      style={{
        background:      'rgba(2,13,26,0.7)',
        border:          `1px solid ${active ? s.color + '40' : 'rgba(0,151,210,0.1)'}`,
        transitionDelay: `${i * 70}ms`,
        transition:      'border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease',
        transform:       active ? 'translateY(-6px)' : 'none',
        boxShadow:       active ? `0 20px 60px ${s.color}18, 0 0 0 1px ${s.color}20` : 'none',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Glow de fondo al hacer hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity:    active ? 1 : 0,
          background: `radial-gradient(ellipse 70% 50% at 20% 20%, ${s.color}12, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Barra de color superior */}
      <div
        className="h-[3px] w-full transition-all duration-500"
        style={{
          background: active
            ? `linear-gradient(to right, ${s.color}, transparent)`
            : 'rgba(0,151,210,0.1)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-5 p-7 flex-1">

        {/* Número + Tag */}
        <div className="flex items-center justify-between">
          <span
            className="font-['Syne'] font-bold text-4xl leading-none transition-colors duration-300"
            style={{ color: active ? s.color : 'rgba(255,255,255,0.06)' }}
          >
            {s.number}
          </span>
          <span
            className="text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full transition-all duration-300"
            style={{
              background: active ? `${s.color}18` : 'rgba(255,255,255,0.04)',
              color:       active ? s.color : 'rgba(255,255,255,0.25)',
              border:      `1px solid ${active ? s.color + '30' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            {s.tag}
          </span>
        </div>

        {/* Icono */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: active ? `${s.color}20` : 'rgba(0,151,210,0.08)',
            border:     `1px solid ${active ? s.color + '35' : 'rgba(0,151,210,0.12)'}`,
            color:       active ? s.color : 'rgba(0,151,210,0.6)',
          }}
        >
          {s.icon}
        </div>

        {/* Título y tagline */}
        <div>
          <h3 className="font-['Syne'] font-bold text-xl text-white mb-1.5 leading-tight">
            {s.title}
          </h3>
          <p
            className="text-sm font-medium transition-colors duration-300"
            style={{ color: active ? s.color : 'rgba(0,151,210,0.55)' }}
          >
            {s.tagline}
          </p>
        </div>

        {/* Descripción — visible siempre pero más visible en hover */}
        <p
          className="text-sm leading-relaxed flex-1 transition-colors duration-300"
          style={{ color: active ? 'rgba(208,207,205,0.85)' : 'rgba(208,207,205,0.65)' }}
        >
          {s.description}
        </p>

        {/* Benefit — aparece en hover */}
        <div
          className="pt-4 transition-all duration-300 overflow-hidden"
          style={{
            borderTop:  `1px solid ${active ? s.color + '20' : 'rgba(0,151,210,0.08)'}`,
            opacity:    active ? 1 : 0.4,
          }}
        >
          <p className="text-xs flex items-center gap-2" style={{ color: 'rgba(208,207,205,0.65)' }}>
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300"
              style={{
                background: active ? s.color : 'rgba(255,95,0,0.15)',
                color:      active ? '#fff' : '#FF5F00',
              }}
            >
              →
            </span>
            {s.benefit}
          </p>
        </div>

      </div>
    </div>
  )
}

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <section
      id="servicios"
      className="relative overflow-hidden"
      style={{ padding: `5rem clamp(32px,6vw,80px)`, borderTop: '1px solid rgba(0,151,210,0.08)' }}
    >
      <div className="relative z-10">

        {/* Header */}
        <div className="mb-12 anim-hidden">
          <div className="section-label">Capacidades</div>
          <h2 className="font-['Syne'] font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}>
            Lo que construimos
          </h2>
          <p className="text-[#D0CFCD]/65 text-sm leading-relaxed mt-3 max-w-xs">
            Cinco capacidades técnicas que cubren todo el ciclo de desarrollo con IA.
          </p>
        </div>

        {/* Grid — máximo 2 columnas en este layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              s={s}
              i={i}
              active={activeIdx === i}
              onEnter={() => setActiveIdx(i)}
              onLeave={() => setActiveIdx(null)}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 anim-hidden">
          <div
            className="flex items-center gap-4 px-5 py-3.5 rounded-2xl w-fit"
            style={{
              background: 'rgba(0,151,210,0.05)',
              border:     '1px solid rgba(0,151,210,0.12)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#FF5F00] animate-pulse flex-shrink-0" />
            <p className="text-[#D0CFCD]/65 text-sm">
              ¿No encontrás lo que necesitás?{' '}
              <a
                href="#agenda"
                onClick={(e) => { e.preventDefault(); document.querySelector('#agenda')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="text-[#0097D2] hover:text-white transition-colors font-medium underline-offset-4 hover:underline"
              >
                Hablemos de tu caso
              </a>
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
