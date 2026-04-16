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
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: '#020D1A' }}
    >
      {/* Glow ambiental */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(0,55,100,0.18),transparent)' }}
        aria-hidden="true"
      />

      {/* Loading overlay */}
      {loading && (
        <div className="loading-overlay" role="status" aria-live="polite">
          <div className="spinner mb-4" />
          <p className="text-[#D0CFCD]/60 text-sm tracking-wide">
            Abriendo calendario — <span className="text-[#0097D2] font-semibold">{loadingLabel}</span>
          </p>
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14 anim-hidden">
          <span className="text-[#FF5F00] text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">
            Primer paso
          </span>
          <h2
            className="font-['Syne'] font-bold text-white mb-3"
            style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}
          >
            ¿Qué estás buscando?
          </h2>
          <p className="text-[#D0CFCD]/40 text-sm max-w-sm mx-auto">
            Elegí y llegás al calendario correcto.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                {/* Barra top */}
                <div
                  className="h-[2px] w-full transition-all duration-400"
                  style={{ background: isSelected ? `linear-gradient(to right,${opt.color},transparent)` : 'transparent' }}
                  aria-hidden="true"
                />

                <div className="p-8 flex flex-col gap-6">

                  {/* Icono */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isSelected ? `${opt.color}20` : 'rgba(0,151,210,0.08)',
                      border:     `1px solid ${isSelected ? opt.color + '35' : 'rgba(0,151,210,0.12)'}`,
                      color:       isSelected ? opt.color : 'rgba(0,151,210,0.55)',
                    }}
                  >
                    {opt.icon}
                  </div>

                  {/* Label */}
                  <div>
                    <h3 className="font-['Syne'] font-bold text-2xl text-white mb-2">{opt.label}</h3>
                    <p className="text-[#D0CFCD]/50 text-sm leading-relaxed">{opt.sub}</p>
                  </div>

                  {/* Note */}
                  <div
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase flex items-center gap-1.5"
                    style={{ color: isSelected ? opt.color : 'rgba(208,207,205,0.25)' }}
                  >
                    <svg viewBox="0 0 8 8" className="w-2 h-2" fill="currentColor">
                      <circle cx="4" cy="4" r="4" />
                    </svg>
                    {opt.note}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={(e) => handleBook(opt, e)}
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-250 hover:-translate-y-0.5"
                    style={{
                      background:  isSelected ? opt.color : 'rgba(0,151,210,0.08)',
                      color:        isSelected ? '#fff' : 'rgba(0,151,210,0.6)',
                      border:      `1px solid ${isSelected ? opt.color : 'rgba(0,151,210,0.15)'}`,
                      boxShadow:   isSelected ? `0 8px 25px ${opt.color}35` : 'none',
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
