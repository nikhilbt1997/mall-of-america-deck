import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'why', label: 'Why MOA' },
  { id: 'retail', label: 'Retail' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'dining', label: 'Dining' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'events', label: 'Events' },
  { id: 'leasing', label: 'Leasing' },
  { id: 'sponsorship', label: 'Sponsorship' },
  { id: 'action', label: 'Connect' },
]

export default function ProgressBar({ active }) {
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const fn = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setProgress(total > 0 ? window.scrollY / total : 0)
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const activeIndex = SECTIONS.findIndex(s => s.id === active)

  return (
    <div style={{
      position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
      zIndex: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0',
    }}>
      {/* Progress track */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        {/* Full track line */}
        <div style={{
          position: 'absolute', left: '50%', top: '6px', bottom: '6px',
          width: '1px', background: 'rgba(255,255,255,0.1)', transform: 'translateX(-50%)',
        }} />
        {/* Progress fill */}
        <div style={{
          position: 'absolute', left: '50%', top: '6px',
          width: '1px', background: 'var(--gold)', transform: 'translateX(-50%)',
          height: `${progress * 100}%`,
          transition: 'height 0.1s ease',
          maxHeight: 'calc(100% - 12px)',
        }} />

        {SECTIONS.map((s, i) => (
          <div key={s.id} style={{ position: 'relative', padding: '5px 0', zIndex: 1 }}
            onMouseEnter={() => setHovered(s.id)} onMouseLeave={() => setHovered(null)}>
            {/* Dot */}
            <button onClick={() => scrollTo(s.id)} style={{
              width: active === s.id ? '10px' : '6px',
              height: active === s.id ? '10px' : '6px',
              borderRadius: '50%',
              background: active === s.id ? 'var(--gold)' : i <= activeIndex ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
              border: active === s.id ? '2px solid rgba(201,168,76,0.4)' : 'none',
              cursor: 'pointer',
              display: 'block',
              transition: 'all 0.2s ease',
              outline: 'none',
              boxShadow: active === s.id ? '0 0 8px rgba(201,168,76,0.6)' : 'none',
            }} />
            {/* Label tooltip */}
            {hovered === s.id && (
              <div style={{
                position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(8,8,8,0.95)', border: '1px solid rgba(201,168,76,0.2)',
                padding: '4px 10px', whiteSpace: 'nowrap',
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                letterSpacing: '0.1em', color: 'var(--gold)', textTransform: 'uppercase',
                pointerEvents: 'none',
              }}>{s.label}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
