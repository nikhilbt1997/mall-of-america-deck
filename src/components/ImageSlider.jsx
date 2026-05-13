import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImageSlider({ images, height = 420, position = 'center', label, sublabel }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.2)', height }}>
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={images[current]}
          alt={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.88 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: position }}
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 35%, rgba(8,8,8,0.88) 100%)', zIndex: 1 }} />

      {/* Caption */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', right: '2rem', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', marginBottom: '0.25rem' }}>{label}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>{sublabel}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                width: i === current ? '20px' : '6px', height: '6px',
                borderRadius: '3px', background: i === current ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0,
              }} />
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.12em', textAlign: 'right' }}>
            AI-GENERATED<br />VISUAL RENDER
          </div>
        </div>
      </div>
    </div>
  )
}
