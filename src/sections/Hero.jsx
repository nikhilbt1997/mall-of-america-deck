import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Hero({ scrollTo }) {
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Delay iframe load by 3s so LCP/FCP can complete first
  useEffect(() => {
    const t = setTimeout(() => setVideoLoaded(true), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero" style={{
      position: 'relative', width: '100%', height: '100vh',
      overflow: 'hidden', background: '#080808',
    }}>
      {/* Static gradient background shown immediately */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(135deg, #0d0a04 0%, #080808 40%, #0a0806 100%)',
      }} />

      {/* YouTube loads AFTER page is interactive */}
      {videoLoaded && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden', pointerEvents: 'none' }}>
          <iframe
            src="https://www.youtube.com/embed/7PF-vJOMxVc?autoplay=1&mute=1&loop=1&playlist=7PF-vJOMxVc&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&start=20"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '130vw', height: '130vh', border: 'none', pointerEvents: 'none' }}
            allow="autoplay; encrypted-media"
            title="Mall of America"
            loading="lazy"
          />
        </div>
      )}

      {/* Dark overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'rgba(8,8,8,0.55)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.25) 35%, rgba(8,8,8,0.4) 70%, rgba(8,8,8,1) 100%)' }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 3, height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center',
        padding: '72px 2rem 120px', boxSizing: 'border-box',
      }}>
        <motion.span className="eyebrow"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          style={{ display: 'block', marginBottom: '1rem', textShadow: '0 1px 10px rgba(0,0,0,0.8)' }}>
          Bloomington, Minnesota · Est. 1992
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '1.25rem', textShadow: '0 2px 30px rgba(0,0,0,0.8)' }}>
          Where the <span className="shimmer">World</span> Comes to Play
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
          style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', color: 'rgba(255,255,255,0.75)', fontWeight: 400, maxWidth: '480px', lineHeight: 1.75, marginBottom: '2rem', textShadow: '0 1px 20px rgba(0,0,0,0.9)' }}>
          North America's premier retail and entertainment destination.
          40 million visitors. 5.6 million square feet. One address that changes everything.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }}
          style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <button onClick={() => scrollTo('leasing')} className="btn-gold" style={{ padding: '0.8rem 1.5rem', fontSize: '0.7rem' }}>Explore Leasing</button>
          <button onClick={() => scrollTo('events')} className="btn-outline" style={{ padding: '0.8rem 1.5rem', fontSize: '0.7rem' }}>Book an Event</button>
          <button onClick={() => scrollTo('sponsorship')} className="btn-outline" style={{ padding: '0.8rem 1.5rem', fontSize: '0.7rem' }}>Partner With Us</button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}
          style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 4rem)', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', width: '100%', maxWidth: '600px' }}>
          {[['5.6M', 'Sq Ft'], ['40M+', 'Visitors/Year'], ['500+', 'Stores'], ['#1', 'US Mall']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: 'var(--gold)', fontWeight: 500, lineHeight: 1, marginBottom: '0.3rem' }}>{val}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
        onClick={() => scrollTo('why')}
        style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.2)' }}>SCROLL</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: '1px', height: '24px', background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }} />
      </motion.div>
    </section>
  )
}
