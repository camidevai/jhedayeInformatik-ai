import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ValueStrip from './components/ValueStrip'
import Services from './components/Services'
import Process from './components/Process'
import StorySection from './components/StorySection'
import Credibility from './components/Credibility'
import MeetingSelector from './components/MeetingSelector'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  const videoRef  = useRef(null)
  const rafRef    = useRef(null)
  const [videoReady, setVideoReady] = useState(false)
  const [scrollPct, setScrollPct]   = useState(0)

  // Video scrub — avanza con el scroll de la página
  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoReady) return
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        if (max <= 0) return
        const p = Math.min(1, window.scrollY / max)
        video.currentTime = p * (video.duration || 24)
        setScrollPct(p * 100)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [videoReady])

  // Scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.07 }
    )
    document.querySelectorAll('.anim-hidden, .anim-left, .anim-right').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-[#020D1A] text-white" style={{ overflowX: 'hidden' }}>

      {/* Grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Scroll progress — línea vertical izquierda */}
      <div
        className="fixed left-0 top-0 z-50 w-[2px] pointer-events-none"
        style={{
          height:     `${scrollPct}%`,
          background: 'linear-gradient(to bottom, #0097D2, #FF5F00)',
        }}
        aria-hidden="true"
      />

      <Navbar />

      {/* ── Split layout ─────────────────────────────────────────────────── */}
      <div className="flex">

        {/* LEFT — contenido con fondo sólido */}
        <div className="w-full lg:w-[57%] bg-[#020D1A] relative z-10 border-r border-white/[0.03]">
          <main>
            <Hero />
            <ValueStrip />
            <Services />
            <Process />
            <StorySection />
            <Credibility />
            <MeetingSelector />
            <FinalCTA />
          </main>
        </div>

        {/* RIGHT — video sticky, siempre visible */}
        <div
          className="hidden lg:block lg:w-[43%] sticky top-0 h-screen overflow-hidden"
          aria-hidden="true"
        >
          {!videoReady && (
            <div className="absolute inset-0 z-10" style={{ background: '#010812' }} />
          )}
          <video
            ref={videoRef}
            src="/hero.mp4"
            className="absolute inset-0 w-full h-full object-cover object-center"
            muted
            playsInline
            preload="auto"
            onCanPlayThrough={() => setVideoReady(true)}
          />
          {/* Fade suave en el borde izquierdo — une visualmente con el panel de contenido */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(2,13,26,0.75) 0%, rgba(2,13,26,0.35) 18%, rgba(2,13,26,0.08) 40%, transparent 65%)',
            }}
          />
          {/* Vignette top/bottom */}
          <div className="absolute inset-x-0 top-0 h-28 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(2,13,26,0.6), transparent)' }} />
          <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(2,13,26,0.6), transparent)' }} />
        </div>

      </div>

      {/* Footer — full width fuera del split */}
      <Footer />

    </div>
  )
}
