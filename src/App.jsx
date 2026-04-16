import { useEffect } from 'react'
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
  useEffect(() => {
    // IntersectionObserver for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = document.querySelectorAll('.anim-hidden, .anim-left, .anim-right')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#020D1A] text-white overflow-x-hidden">
      <Navbar />
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
      <Footer />
    </div>
  )
}
