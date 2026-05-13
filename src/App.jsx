import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import Loader from './components/Loader.jsx'
import Hero from './sections/Hero.jsx'
import Why from './sections/Why.jsx'
import Retail from './sections/Retail.jsx'
import Luxury from './sections/Luxury.jsx'
import Dining from './sections/Dining.jsx'
import Entertainment from './sections/Entertainment.jsx'
import Events from './sections/Events.jsx'
import Leasing from './sections/Leasing.jsx'
import Sponsorship from './sections/Sponsorship.jsx'
import Action from './sections/Action.jsx'

const SECTIONS = ['hero','why','retail','luxury','dining','entertainment','events','leasing','sponsorship','action']

export default function App() {
  const [active, setActive] = useState('hero')
  const [loading, setLoading] = useState(true)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const containerRef = useRef(null)

  // Custom cursor
  useEffect(() => {
    let raf
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }
    const hide = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }
    const tick = () => {
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      if (ringRef.current) ringRef.current.style.transform = `translate(${pos.current.x - 18}px, ${pos.current.y - 18}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', hide)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', move); window.removeEventListener('mouseleave', hide) }
  }, [])

  // Track active section via IntersectionObserver on deck container
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) }),
      { root: container, threshold: 0.5 }
    )
    SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [loading])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      const idx = SECTIONS.indexOf(active)
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        const next = SECTIONS[Math.min(idx + 1, SECTIONS.length - 1)]
        document.getElementById(next)?.scrollIntoView({ behavior: 'smooth' })
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        const prev = SECTIONS[Math.max(idx - 1, 0)]
        document.getElementById(prev)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [active])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Cursor */}
      <div ref={dotRef} style={{ position: 'fixed', top: 0, left: 0, width: '8px', height: '8px', background: 'var(--gold)', borderRadius: '50%', pointerEvents: 'none', zIndex: 999999, opacity: 0, willChange: 'transform' }} />
      <div ref={ringRef} style={{ position: 'fixed', top: 0, left: 0, width: '36px', height: '36px', border: '1px solid rgba(201,168,76,0.45)', borderRadius: '50%', pointerEvents: 'none', zIndex: 999998, opacity: 0, willChange: 'transform' }} />

      {/* Loader */}
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Nav active={active} scrollTo={scrollTo} />
          <ProgressBar active={active} scrollTo={scrollTo} />

          {/* DECK CONTAINER — snap scroll */}
          <div id="deck-container" ref={containerRef}>
            <Hero scrollTo={scrollTo} />
            <Why />
            <Retail scrollTo={scrollTo} />
            <Luxury scrollTo={scrollTo} />
            <Dining />
            <Entertainment />
            <Events scrollTo={scrollTo} />
            <Leasing scrollTo={scrollTo} />
            <Sponsorship scrollTo={scrollTo} />
            <Action />
            <footer style={{
              height: '100vh', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              background: 'var(--black)',
            }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Mall of America</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>BLOOMINGTON, MINNESOTA · EST. 1992</div>
              </div>
              <button onClick={() => scrollTo('action')} className="btn-gold" style={{ marginBottom: '4rem' }}>Connect With Our Team →</button>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em' }}>© 2026 MALL OF AMERICA · PARTNER EXPERIENCE DECK</div>
            </footer>
          </div>
        </>
      )}
    </>
  )
}
