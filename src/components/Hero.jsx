import { useState, useEffect } from 'react'

const WORDS = [
  { text: 'Construimos', hi: false },
  { text: 'plataformas', hi: false },
  { text: 'con',         hi: false },
  { text: 'IA',          hi: false },
  { text: 'más',         hi: true  },
  { text: 'rápido,',     hi: true  },
  { text: 'mejor',       hi: true  },
  { text: 'y',           hi: false },
  { text: 'con',         hi: false },
  { text: 'visión',      hi: false },
  { text: 'de',          hi: false },
  { text: 'negocio',     hi: false },
]

const go = (id) => (e) => {
  e.preventDefault()
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const [on, setOn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setOn(true), 200); return () => clearTimeout(t) }, [])

  return (
    <section
      className="relative flex flex-col justify-center min-h-screen"
      style={{ padding: 'clamp(80px,8vw,120px) clamp(32px,6vw,80px) 80px' }}
    >

      {/* Eyebrow — monospace técnico */}
      <div
        className="flex items-center gap-2.5 mb-10 w-fit"
        style={{
          opacity:    on ? 1 : 0,
          transform:  on ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        }}
      >
        <span className="w-5 h-px bg-[#0097D2]/60" />
        <span
          style={{
            fontFamily:    'monospace',
            fontSize:      '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'rgba(0,151,210,0.75)',
          }}
        >
          JhedAi × Informatik-AI &nbsp;/&nbsp; Alianza Estratégica
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#0097D2] animate-pulse" />
      </div>

      {/* H1 — reveal palabra a palabra */}
      <h1
        className="font-['Syne'] font-bold text-white mb-9"
        style={{
          fontSize:      'clamp(2.2rem, 4vw, 3.8rem)',
          lineHeight:    1.08,
          letterSpacing: '-0.025em',
        }}
        aria-label="Construimos plataformas con IA más rápido, mejor y con visión de negocio"
      >
        {WORDS.map((w, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              opacity:    on ? 1 : 0,
              transform:  on ? 'translateY(0)' : 'translateY(20px)',
              filter:     on ? 'blur(0)' : 'blur(6px)',
              transition: `opacity .55s cubic-bezier(.16,1,.3,1) ${.25 + i * .06}s,
                           transform .55s cubic-bezier(.16,1,.3,1) ${.25 + i * .06}s,
                           filter .5s ease ${.25 + i * .06}s`,
              marginRight: '0.28em',
              willChange: 'opacity,transform,filter',
              ...(w.hi ? {
                background:   'rgba(255,255,255,0.95)',
                color:        '#003764',
                fontWeight:   800,
                padding:      '0.03em 0.2em 0.07em',
                borderRadius: '5px',
              } : {}),
            }}
          >
            {w.text}
          </span>
        ))}
      </h1>

      {/* Línea separadora animada */}
      <div
        style={{
          height:     '1px',
          maxWidth:   '360px',
          background: 'rgba(0,151,210,0.12)',
          marginBottom: '1.5rem',
          overflow: 'hidden',
          borderRadius: '9999px',
          opacity: on ? 1 : 0,
          transition: 'opacity .4s ease 1.1s',
        }}
      >
        <div
          style={{
            height:     '100%',
            background: 'linear-gradient(to right,#0097D2,#FF5F00)',
            borderRadius: 'inherit',
            width:      on ? '50%' : '0%',
            transition: 'width .9s cubic-bezier(.16,1,.3,1) 1.2s',
          }}
        />
      </div>

      {/* Subtítulo */}
      <p
        style={{
          fontSize:   'clamp(.88rem, 1.1vw, 1rem)',
          color:      'rgba(255,255,255,0.62)',
          lineHeight: 1.7,
          maxWidth:   '380px',
          marginBottom: '2.5rem',
          opacity:    on ? 1 : 0,
          transform:  on ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity .7s ease 1.05s, transform .7s ease 1.05s',
        }}
      >
        De la estrategia al desarrollo: soluciones tecnológicas premium para empresas que quieren avanzar en serio.
      </p>

      {/* CTAs */}
      <div
        className="flex flex-wrap gap-3"
        style={{
          opacity:    on ? 1 : 0,
          transform:  on ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity .7s ease 1.2s, transform .7s ease 1.2s',
        }}
      >
        <a
          href="#servicios"
          onClick={go('#servicios')}
          className="inline-flex items-center gap-2 font-semibold text-white text-sm transition-all duration-300 hover:-translate-y-0.5"
          style={{
            padding:    '0.8rem 1.75rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg,#0097D2,#0077a8)',
            boxShadow:  '0 4px 22px rgba(0,151,210,0.3)',
          }}
        >
          Explorar servicios
        </a>
        <a
          href="#agenda"
          onClick={go('#agenda')}
          className="inline-flex items-center gap-2 font-semibold text-white/80 text-sm border border-white/10 transition-all duration-300 hover:text-white hover:border-white/25 hover:-translate-y-0.5"
          style={{
            padding:    '0.8rem 1.75rem',
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          Agendar reunión
        </a>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-10 left-[clamp(32px,6vw,80px)] flex items-center gap-3 pointer-events-none select-none"
        style={{ opacity: on ? 0.35 : 0, transition: 'opacity 1.4s ease 2.2s' }}
        aria-hidden="true"
      >
        <div className="flex flex-col gap-[3px]">
          {[0,1,2].map((i) => (
            <svg key={i} width="12" height="7" viewBox="0 0 12 7"
              style={{ opacity: .25+i*.28, animation: 'bounce 1.6s ease-in-out infinite', animationDelay: `${i*.15}s` }}>
              <path d="M1 1l5 5 5-5" stroke="#0097D2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          ))}
        </div>
        <span style={{ fontFamily:'monospace', fontSize:'0.6rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)' }}>
          scroll
        </span>
      </div>

    </section>
  )
}
