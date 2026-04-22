import { useState, useEffect, useRef } from 'react'

function SparkVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {[140, 100, 64].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-[#0097D2]/15"
          style={{ width: size, height: size, animation: `spin ${4 + i * 2}s linear infinite` }}
        />
      ))}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: 'radial-gradient(circle,rgba(255,95,0,0.35) 0%,rgba(0,151,210,0.08) 70%)', animation: 'pulseGlow 2.5s ease-in-out infinite' }}
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#FF5F00]" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: i % 2 ? '#0097D2' : '#FF5F00',
            top: `${28 + Math.sin((i / 5) * Math.PI * 2) * 32}%`,
            left: `${50 + Math.cos((i / 5) * Math.PI * 2) * 28}%`,
            opacity: 0.5,
            animation: `float ${2.5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  )
}

function DiagramVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 260 180" className="w-full max-w-[260px]" aria-hidden="true">
        {[[130,30,50,110],[130,30,130,110],[130,30,210,110],[50,110,130,165],[130,110,130,165],[210,110,130,165]].map(([x1,y1,x2,y2],i)=>(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0097D2" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3">
            <animate attributeName="stroke-opacity" values="0.1;0.5;0.1" dur={`${2+i*0.3}s`} repeatCount="indefinite"/>
          </line>
        ))}
        {[[130,30,true],[50,110,false],[130,110,false],[210,110,false],[130,165,true]].map(([cx,cy,acc],i)=>(
          <g key={i}>
            <circle cx={cx} cy={cy} r={acc?16:11} fill={acc?'rgba(255,95,0,0.12)':'rgba(0,151,210,0.12)'} stroke={acc?'#FF5F00':'#0097D2'} strokeWidth="1.5" strokeOpacity="0.65">
              <animate attributeName="r" values={`${acc?16:11};${acc?19:13};${acc?16:11}`} dur={`${2.5+i*0.4}s`} repeatCount="indefinite"/>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}

function DashboardVisual() {
  return (
    <div className="w-full max-w-[280px] mx-auto">
      <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(0,55,100,0.25)', border: '1px solid rgba(0,151,210,0.15)' }}>
        <div className="flex items-center gap-2 pb-3 border-b border-[#0097D2]/10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F00] animate-pulse"/>
          <div className="h-2 w-20 rounded bg-[#0097D2]/25"/>
          <div className="ml-auto h-2 w-10 rounded bg-white/8"/>
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {[55,75,48,90,65,85,70].map((h,i)=>(
            <div key={i} className="flex-1 rounded-t-sm" style={{ height:`${h}%`, background: i===4?'linear-gradient(to top,#FF5F00,#ff8c42)':'linear-gradient(to top,#0097D2,#00c4ff)', opacity:0.7 }}/>
          ))}
        </div>
        <div className="flex gap-2">
          {[['98.2%','Precisión'],['1.4s','Respuesta'],['4.2K','Eventos/h']].map(([v,l])=>(
            <div key={l} className="flex-1 rounded-lg p-2 text-center" style={{ background: 'rgba(0,151,210,0.08)' }}>
              <div className="text-[#0097D2] font-['Syne'] font-bold text-sm">{v}</div>
              <div className="text-[#D0CFCD]/35 text-[9px] mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const panels = [
  { label: 'Problema', title: 'Una idea o proceso sin resolver', visual: SparkVisual },
  { label: 'Arquitectura', title: 'Se convierte en diseño técnico', visual: DiagramVisual },
  { label: 'Solución', title: 'Y en un producto que opera', visual: DashboardVisual },
]

export default function StorySection() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(parseInt(e.target.dataset.idx)) }),
      { threshold: 0.6 }
    )
    sectionRef.current?.querySelectorAll('[data-idx]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const Visual = panels[active].visual

  return (
    <section
      className="overflow-hidden"
      style={{ padding: `5rem clamp(32px,6vw,80px)`, borderTop: '1px solid rgba(0,151,210,0.08)' }}
    >
      <div>

        {/* Header */}
        <div className="mb-12 anim-hidden">
          <div className="section-label">El proceso real</div>
          <h2 className="font-['Syne'] font-bold text-white" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-0.02em' }}>
            De la idea al producto
          </h2>
        </div>

        <div ref={sectionRef} className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Paneles de texto — mínimos */}
          <div className="space-y-4">
            {panels.map((p, i) => (
              <div
                key={p.label}
                data-idx={i}
                onClick={() => setActive(i)}
                className={`rounded-2xl p-6 cursor-pointer transition-all duration-400 flex items-center gap-5 ${
                  active === i
                    ? 'border border-[#0097D2]/25 shadow-[0_0_30px_rgba(0,151,210,0.08)]'
                    : 'border border-transparent opacity-40 hover:opacity-60'
                }`}
                style={{ background: active === i ? 'rgba(0,55,100,0.2)' : 'transparent' }}
              >
                {/* Step circle */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-['Syne'] font-bold text-sm transition-all duration-300"
                  style={{
                    background: active === i ? '#FF5F00' : 'rgba(0,151,210,0.1)',
                    color:       active === i ? '#fff' : '#0097D2',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <span className="text-[#D0CFCD]/55 text-[10px] tracking-[0.2em] uppercase block mb-0.5">{p.label}</span>
                  <h3 className="font-['Syne'] font-bold text-white text-base">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Visual */}
          <div className="lg:sticky lg:top-32 h-72 lg:h-80">
            <div
              className="w-full h-full rounded-3xl flex items-center justify-center transition-all duration-600"
              style={{
                background: 'rgba(0,55,100,0.15)',
                border:     '1px solid rgba(0,151,210,0.12)',
                boxShadow:  '0 0 60px rgba(0,151,210,0.05)',
              }}
            >
              <Visual />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
