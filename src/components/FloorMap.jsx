import { useState } from 'react'
import { motion } from 'framer-motion'

const ZONES = [
  { id: 'retail', label: 'Retail', x: 80, y: 60, w: 180, h: 80, color: '#C9A84C', section: 'retail', desc: '500+ stores across 4 levels' },
  { id: 'luxury', label: 'Luxury Wing', x: 280, y: 60, w: 140, h: 80, color: '#E8C96A', section: 'luxury', desc: '40+ premium & luxury brands' },
  { id: 'entertainment', label: 'Nickelodeon Universe', x: 80, y: 160, w: 200, h: 120, color: '#C9A84C', section: 'entertainment', desc: '7-acre indoor theme park' },
  { id: 'dining', label: 'Dining', x: 300, y: 160, w: 120, h: 120, color: '#A08030', section: 'dining', desc: '50+ restaurants & food concepts' },
  { id: 'events', label: 'Event Venues', x: 80, y: 300, w: 340, h: 70, color: '#7A6020', section: 'events', desc: '400+ events/year · 50,000 capacity' },
  { id: 'sealife', label: 'SEA LIFE', x: 440, y: 60, w: 100, h: 120, color: '#3A6080', section: 'entertainment', desc: '10,000+ sea creatures' },
  { id: 'parking', label: 'Parking', x: 440, y: 200, w: 100, h: 170, color: '#2a2a2a', section: null, desc: '12,750 spaces — free parking' },
]

export default function FloorMap() {
  const [hovered, setHovered] = useState(null)
  const scrollTo = (id) => id && document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const active = ZONES.find(z => z.id === hovered)

  return (
    <div style={{ marginTop: '4rem' }}>
      <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>Property Map</span>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Explore the Property</h3>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginBottom: '2rem' }}>Hover any zone to learn more. Click to navigate to that section.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2rem', alignItems: 'start' }}>
        {/* SVG Map */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.15)', padding: '1.5rem', position: 'relative' }}>
          <svg viewBox="0 0 560 390" style={{ width: '100%', height: 'auto' }}>
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="560" height="390" fill="url(#grid)" />

            {/* Mall outline */}
            <rect x="70" y="45" width="480" height="340" rx="4" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="1" strokeDasharray="4 4" />

            {/* Level label */}
            <text x="75" y="38" fill="rgba(201,168,76,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">MALL OF AMERICA · FLOOR PLAN</text>

            {ZONES.map(zone => (
              <g key={zone.id}
                onMouseEnter={() => setHovered(zone.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => scrollTo(zone.section)}
                style={{ cursor: zone.section ? 'pointer' : 'default' }}
              >
                <rect
                  x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx="3"
                  fill={hovered === zone.id ? zone.color : `${zone.color}22`}
                  stroke={zone.color}
                  strokeWidth={hovered === zone.id ? 1.5 : 0.5}
                  style={{ transition: 'all 0.2s' }}
                />
                <text
                  x={zone.x + zone.w / 2} y={zone.y + zone.h / 2 - 6}
                  textAnchor="middle" dominantBaseline="central"
                  fill={hovered === zone.id ? '#080808' : zone.color}
                  fontSize="10" fontWeight="600" fontFamily="monospace"
                  letterSpacing="0.5"
                  style={{ transition: 'fill 0.2s', pointerEvents: 'none' }}
                >
                  {zone.label.split(' ').map((word, i, arr) => (
                    <tspan key={i} x={zone.x + zone.w / 2} dy={i === 0 ? (arr.length > 1 ? '-8' : '0') : '14'}>
                      {word}
                    </tspan>
                  ))}
                </text>
                {zone.section && hovered === zone.id && (
                  <text x={zone.x + zone.w / 2} y={zone.y + zone.h - 10}
                    textAnchor="middle" fill="#080808" fontSize="8" fontFamily="monospace">
                    CLICK TO EXPLORE →
                  </text>
                )}
              </g>
            ))}

            {/* Compass */}
            <g transform="translate(520, 55)">
              <circle cx="0" cy="0" r="16" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5"/>
              <text x="0" y="-4" textAnchor="middle" fill="rgba(201,168,76,0.6)" fontSize="10" fontWeight="bold">N</text>
              <line x1="0" y1="-14" x2="0" y2="14" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5"/>
              <line x1="-14" y1="0" x2="14" y2="0" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5"/>
            </g>
          </svg>
        </div>

        {/* Info panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {active ? (
            <motion.div key={active.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ padding: '2rem', background: 'rgba(201,168,76,0.06)', border: `1px solid ${active.color}40` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: active.color, letterSpacing: '0.2em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Zone</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>{active.label}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{active.desc}</div>
              {active.section && (
                <button onClick={() => scrollTo(active.section)}
                  style={{ background: 'var(--gold)', color: '#080808', border: 'none', padding: '0.6rem 1.2rem', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', width: '100%' }}>
                  Explore {active.label} →
                </button>
              )}
            </motion.div>
          ) : (
            <div style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem', lineHeight: 1.7 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', marginBottom: '1rem', color: 'rgba(201,168,76,0.4)' }}>HOW TO USE</div>
              Hover any zone on the map to see details. Click to jump directly to that section of the deck.
            </div>
          )}

          {/* Zone legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {ZONES.filter(z => z.section).map(z => (
              <button key={z.id} onClick={() => scrollTo(z.section)}
                onMouseEnter={() => setHovered(z.id)} onMouseLeave={() => setHovered(null)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', background: hovered === z.id ? 'rgba(201,168,76,0.06)' : 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: z.color, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: hovered === z.id ? 'var(--gold)' : 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{z.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
