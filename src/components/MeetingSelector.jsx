import { useState } from 'react'

const CALENDAR_ALIANZA = 'https://calendar.app.google/cryRc5oYVPDoiS4i6'
const CALENDAR_DEV     = 'https://calendar.app.google/SJ8wmHYCHoq9DNsK9'

const options = [
  {
    id: 'alianza',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.3">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Alianza',
    sub: 'Partnership o propuesta comercial conjunta.',
    cta: 'Explorar alianza',
    calendar: CALENDAR_ALIANZA,
    color: '#FF5F00',
    note: 'Reunión paga',
  },
  {
    id: 'desarrollo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.3">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Desarrollo',
    sub: 'Construir una solución, plataforma o automatización.',
    cta: 'Solicitar desarrollo',
    calendar: CALENDAR_DEV,
    color: '#0097D2',
    note: 'Sin costo',
  },
  {
    id: 'colaboracion',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.3">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Colaboración',
    sub: 'Proyecto conjunto o iniciativa específica.',
    cta: 'Iniciar conversación',
    calendar: CALENDAR_DEV,
    color: '#00c4ff',
    note: 'Sin costo',
  },
]

export default function MeetingSelector() {
  const [selected, setSelected] = useState(null)
  const [loading,  setLoading]  = useState(false)
  const [loadingLabel, setLoadingLabel] = useState('')

  const handleBook = (opt, e) => {
    e?.stopPropagation()
    setLoadingLabel(opt.label)
    setLoading(true)
    setTimeout(() => {
      window.open(opt.calendar, '_blank', 'noopener,noreferrer')
      setLoading(false)
    }, 700)
  }

  return (
    <section
      id="agenda"
      className="relative overflow-hidden"
      style={{ padding: `5rem clamp(32px,6vw,80px)`, borderTop: '1px solid rgba(0,151,210,0.08)' }}
    >

      {/* Loading overlay */}
      {loading && (
        <div className="loading-overlay" role="status" aria-live="polite">
          <div className="spinner mb-4" />
          <p className="text-[#D0CFCD]/60 text-sm tracking-wide">
            Abriendo calendario — <span className="text-[#0097D2] font-semibold">{loadingLabel}</span>
          </p>
        </div>
      )}

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-10 anim-hidden">
          <div className="section-label">Primer paso</div>
          <h2
            className="font-['Syne'] font-bold text-white mb-2"
            style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.02em' }}
          >
            ¿Qué estás buscando?
          </h2>
          <p className="text-[#D0CFCD]/65 text-sm">
            Elegí y llegás al calendario correcto.
          </p>
        </div>

        {/* Cards — apiladas en esta columna */}
        <div className="grid grid-cols-1 gap-4">
          {options.map((opt, i) => {
            const isSelected = selected === opt.id
            return (
              <div
                key={opt.id}
                className="anim-hidden group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-350"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  background:      isSelected ? `${opt.color}0f` : 'rgba(0,55,100,0.15)',
                  border:          `1px solid ${isSelected ? opt.color + '40' : 'rgba(0,151,210,0.12)'}`,
                  transform:       isSelected ? 'translateY(-6px)' : 'none',
                  boxShadow:       isSelected ? `0 20px 60px ${opt.color}18` : 'none',
                }}
                onClick={() => setSelected(isSelected ? null : opt.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelected(isSelected ? null : opt.id) }}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
              >
                {/* Barra izquierda de color */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-400"
                  style={{ background: isSelected ? `linear-gradient(to bottom,${opt.color},transparent)` : 'transparent' }}
                  aria-hidden="true"
                />

                {/* Layout horizontal: icono | info | CTA */}
                <div className="flex items-center gap-5 p-5 pl-6">

                  {/* Icono */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isSelected ? `${opt.color}20` : 'rgba(0,151,210,0.08)',
                      border:     `1px solid ${isSelected ? opt.color + '35' : 'rgba(0,151,210,0.12)'}`,
                      color:       isSelected ? opt.color : 'rgba(0,151,210,0.55)',
                    }}
                  >
                    {opt.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-['Syne'] font-bold text-white text-base">{opt.label}</h3>
                      <span
                        className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
                        style={{
                          background: `${opt.color}15`,
                          color:      isSelected ? opt.color : 'rgba(208,207,205,0.35)',
                          border:     `1px solid ${isSelected ? opt.color + '30' : 'transparent'}`,
                        }}
                      >
                        {opt.note}
                      </span>
                    </div>
                    <p className="text-[#D0CFCD]/65 text-xs leading-relaxed">{opt.sub}</p>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={(e) => handleBook(opt, e)}
                    className="flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-250 hover:-translate-y-0.5 whitespace-nowrap"
                    style={{
                      background:  (isSelected || opt.id === 'alianza') ? opt.color : 'rgba(0,151,210,0.08)',
                      color:        (isSelected || opt.id === 'alianza') ? '#fff' : 'rgba(0,151,210,0.6)',
                      border:      `1px solid ${(isSelected || opt.id === 'alianza') ? opt.color : 'rgba(0,151,210,0.15)'}`,
                      boxShadow:   (isSelected || opt.id === 'alianza') ? `0 6px 20px ${opt.color}30` : 'none',
                    }}
                  >
                    {opt.cta} →
                  </button>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
