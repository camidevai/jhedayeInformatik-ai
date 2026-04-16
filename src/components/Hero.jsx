import { useEffect, useRef, useState, useCallback } from 'react'

const VIDEO_DURATION = 24
const SENSITIVITY    = 0.009
const TOUCH_FACTOR   = 2.4

// ─── Tiempos de aparición ──────────────────────────────────────────────────
const BADGE_START = 0.03
const H1_START    = 0.08
const H1_END      = 0.52
const SUB_START   = 0.54
const SUB_END     = 0.84
const CTA_START   = 0.88

// ─── Tokens del H1 ────────────────────────────────────────────────────────
const H1_TOKENS = [
  { text: 'Construimos',  highlight: false },
  { text: 'plataformas',  highlight: false },
  { text: 'con',          highlight: false },
  { text: 'IA',           highlight: false },
  { text: 'más',          highlight: true  },
  { text: 'rápido,',      highlight: true  },
  { text: 'mejor',        highlight: true  },
  { text: 'y',            highlight: false },
  { text: 'con',          highlight: false },
  { text: 'visión',       highlight: false },
  { text: 'de',           highlight: false },
  { text: 'negocio',      highlight: false },
]

const SUBTITLE_TOKENS = [
  'De', 'la', 'estrategia', 'al', 'desarrollo:', 'soluciones',
  'tecnológicas', 'premium', 'para', 'empresas', 'que',
  'quieren', 'avanzar', 'en', 'serio.',
]

function buildThresholds(count, start, end) {
  return Array.from({ length: count }, (_, i) =>
    start + (i / Math.max(count - 1, 1)) * (end - start)
  )
}

const H1_THRESHOLDS  = buildThresholds(H1_TOKENS.length,      H1_START,  H1_END)
const SUB_THRESHOLDS = buildThresholds(SUBTITLE_TOKENS.length, SUB_START, SUB_END)

// ─── Componente de palabra ─────────────────────────────────────────────────
function Word({ text, visible, highlight = false }) {
  return (
    <span
      className="inline-block"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(16px)',
        filter:     visible ? 'blur(0px)' : 'blur(6px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease',
        marginRight: highlight ? '0.25em' : '0.28em',
        willChange: 'opacity, transform, filter',
        ...(highlight
          ? {
              background:    'rgba(255,255,255,0.95)',
              color:         '#003764',
              fontWeight:    800,
              padding:       '0.04em 0.22em 0.06em',
              borderRadius:  '5px',
              lineHeight:    'inherit',
            }
          : {}),
      }}
    >
      {text}
    </span>
  )
}

// ─── Hero principal ────────────────────────────────────────────────────────
export default function Hero() {
  const videoRef   = useRef(null)
  const durationRef = useRef(VIDEO_DURATION)
  const lastTouchY = useRef(null)
  const lockedRef  = useRef(true)

  const [locked,     setLocked]     = useState(true)
  const [videoReady, setVideoReady] = useState(false)
  const [progress,   setProgress]   = useState(0)

  // Lock / Unlock
  const lock = useCallback(() => {
    lockedRef.current = true
    setLocked(true)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow            = 'hidden'
  }, [])
  const unlock = useCallback(() => {
    lockedRef.current = false
    setLocked(false)
    document.documentElement.style.overflow = ''
    document.body.style.overflow            = ''
  }, [])
  useEffect(() => { lock(); return () => unlock() }, [lock, unlock])

  // Video ready
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onReady = () => {
      if (video.duration && isFinite(video.duration)) durationRef.current = video.duration
      setVideoReady(true)
    }
    if (video.readyState >= 3) { onReady(); return }
    video.addEventListener('canplaythrough', onReady, { once: true })
    video.load()
    return () => video.removeEventListener('canplaythrough', onReady)
  }, [])

  // Delta → video
  const handleDelta = useCallback((deltaY) => {
    const video = videoRef.current
    if (!video) return
    if (lockedRef.current) {
      const dur  = durationRef.current
      const next = Math.max(0, Math.min(dur, video.currentTime + deltaY * SENSITIVITY))
      video.currentTime = next
      const p = next / dur
      setProgress(p)
      if (p >= 1 && deltaY > 0) unlock()
    } else {
      if (window.scrollY <= 0 && deltaY < 0) {
        const v = videoRef.current
        if (v) { v.currentTime = durationRef.current; setProgress(1) }
        lock()
      }
    }
  }, [lock, unlock])

  // Wheel
  useEffect(() => {
    if (!videoReady) return
    const fn = (e) => {
      const raw = e.deltaMode === 1 ? e.deltaY * 40 : e.deltaMode === 2 ? e.deltaY * 800 : e.deltaY
      handleDelta(raw)
    }
    window.addEventListener('wheel', fn, { passive: true })
    return () => window.removeEventListener('wheel', fn)
  }, [videoReady, handleDelta])

  // Touch
  useEffect(() => {
    if (!videoReady) return
    const onS = (e) => { lastTouchY.current = e.touches[0].clientY }
    const onM = (e) => {
      if (lastTouchY.current === null) return
      const d = lastTouchY.current - e.touches[0].clientY
      lastTouchY.current = e.touches[0].clientY
      handleDelta(d * TOUCH_FACTOR)
    }
    window.addEventListener('touchstart', onS, { passive: true })
    window.addEventListener('touchmove',  onM, { passive: true })
    return () => { window.removeEventListener('touchstart', onS); window.removeEventListener('touchmove', onM) }
  }, [videoReady, handleDelta])

  // Teclado
  useEffect(() => {
    if (!videoReady) return
    const fn = (e) => {
      if (!lockedRef.current) return
      const map = { ArrowDown:120,' ':120,ArrowRight:120,ArrowUp:-120,ArrowLeft:-120,PageDown:600,PageUp:-600 }
      const d = map[e.key]
      if (d !== undefined) { e.preventDefault(); handleDelta(d) }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [videoReady, handleDelta])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const badgeVisible = progress >= BADGE_START
  const ctasVisible  = progress >= CTA_START

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Video */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        muted playsInline preload="auto" aria-hidden="true"
      />

      {/* Loading */}
      {!videoReady && (
        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4"
          style={{ background: 'linear-gradient(135deg,#020D1A 0%,#003764 50%,#020D1A 100%)' }}
        >
          <div className="spinner" />
          <p className="text-[#D0CFCD]/40 text-sm tracking-widest uppercase">Cargando...</p>
        </div>
      )}

      {/* ── Overlays de oscurecimiento ─────────────────────────────────── */}
      {/* Tinte base general */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(2,13,26,0.35)' }}
        aria-hidden="true"
      />
      {/* Gradiente lateral izquierdo fuerte */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, rgba(2,13,26,0.88) 0%, rgba(2,13,26,0.70) 30%, rgba(2,13,26,0.30) 58%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      {/* Fade inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
        style={{ background: 'linear-gradient(to top,#020D1A 15%,transparent)' }}
        aria-hidden="true"
      />

      {/* ── Contenido ─────────────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full pt-20">

          {/*
           * Panel de glassmorphism detrás del texto.
           * Garantiza legibilidad en cualquier frame del video.
           */}
          <div className="relative max-w-2xl px-0">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[0.16em] uppercase"
              style={{
                background:  'rgba(0,151,210,0.12)',
                border:      '1px solid rgba(0,151,210,0.3)',
                color:       '#0097D2',
                opacity:     badgeVisible ? 1 : 0,
                transform:   badgeVisible ? 'translateY(0)' : 'translateY(10px)',
                transition:  'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0097D2] animate-pulse" />
              JhedAi × Informatik-AI — Alianza Estratégica
            </div>

            {/* H1 */}
            <h1
              className="font-['Syne'] font-bold leading-[1.1] text-white mb-7"
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                textShadow: '0 2px 8px rgba(0,0,0,1), 0 4px 30px rgba(0,0,0,0.85)',
              }}
              aria-label="Construimos plataformas con IA más rápido, mejor y con visión de negocio"
            >
              {H1_TOKENS.map((t, i) => (
                <Word
                  key={i}
                  text={t.text}
                  highlight={t.highlight}
                  visible={progress >= H1_THRESHOLDS[i]}
                />
              ))}
            </h1>

            {/* Separador */}
            <div
              className="mb-6 h-px overflow-hidden rounded-full"
              style={{
                width:      '100%',
                background: 'rgba(0,151,210,0.12)',
                opacity:    progress >= SUB_START ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width:      progress >= SUB_START ? '40%' : '0%',
                  background: 'linear-gradient(to right,#0097D2,#FF5F00)',
                  transition: 'width 0.7s ease',
                }}
              />
            </div>

            {/* Subtítulo */}
            <p
              className="text-white/90 leading-relaxed mb-9"
              style={{
                fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                textShadow: '0 1px 6px rgba(0,0,0,1), 0 3px 20px rgba(0,0,0,0.9)',
              }}
              aria-label="De la estrategia al desarrollo: soluciones tecnológicas premium para empresas que quieren avanzar en serio."
            >
              {SUBTITLE_TOKENS.map((word, i) => (
                <Word
                  key={i}
                  text={word}
                  visible={progress >= SUB_THRESHOLDS[i]}
                />
              ))}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3"
              style={{
                opacity:       ctasVisible ? 1 : 0,
                transform:     ctasVisible ? 'translateY(0)' : 'translateY(16px)',
                transition:    'opacity 0.45s ease, transform 0.45s ease',
                pointerEvents: ctasVisible ? 'auto' : 'none',
              }}
            >
              <a
                href="#servicios"
                onClick={scrollTo('#servicios')}
                className="px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background:  '#0097D2',
                  boxShadow:   '0 4px 20px rgba(0,151,210,0.35)',
                }}
              >
                Explorar servicios
              </a>
              <a
                href="#agenda"
                onClick={scrollTo('#agenda')}
                className="px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-200 hover:text-[#FF5F00] hover:border-[#FF5F00] hover:-translate-y-0.5"
                style={{
                  background:  'rgba(255,255,255,0.06)',
                  border:      '1px solid rgba(255,255,255,0.18)',
                }}
              >
                Agendar reunión
              </a>
            </div>

          </div>{/* /panel */}
        </div>
      </div>

      {/* Barra de progreso */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-[3px]"
        style={{ background: 'rgba(0,55,100,0.25)' }}
        aria-hidden="true"
      >
        <div
          className="h-full transition-none"
          style={{
            width:      `${progress * 100}%`,
            background: 'linear-gradient(to right,#0097D2,#FF5F00)',
          }}
        />
      </div>

      {/* Hint de scroll */}
      {videoReady && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none select-none"
          style={{ opacity: locked ? Math.max(0, 1 - progress * 5) : 0.65 }}
          aria-hidden="true"
        >
          <span className="text-white/35 text-[10px] tracking-[0.22em] uppercase">
            {locked ? 'Scroll para avanzar · ↑ retroceder' : 'Continúa · ↑ retroceder el video'}
          </span>
          <div className="flex flex-col items-center gap-[3px]">
            {[0, 1, 2].map((i) => (
              <svg
                key={i}
                width="14" height="8" viewBox="0 0 14 8"
                style={{
                  color:            locked ? '#0097D2' : '#FF5F00',
                  opacity:          0.2 + i * 0.3,
                  animation:        'bounce 1.5s ease-in-out infinite',
                  animationDelay:   `${i * 0.16}s`,
                }}
              >
                <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            ))}
          </div>
        </div>
      )}

    </section>
  )
}
