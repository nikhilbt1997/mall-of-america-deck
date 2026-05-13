import { useState } from 'react'
import { motion } from 'framer-motion'

const CATEGORIES = [
  { label: 'Fashion & Apparel', avgSale: 85, convRate: 0.12 },
  { label: 'Luxury & Premium', avgSale: 320, convRate: 0.08 },
  { label: 'Food & Dining', avgSale: 42, convRate: 0.25 },
  { label: 'Tech & Electronics', avgSale: 280, convRate: 0.06 },
  { label: 'Beauty & Wellness', avgSale: 65, convRate: 0.18 },
  { label: 'Entertainment', avgSale: 38, convRate: 0.30 },
]

const SIZES = [
  { label: 'Kiosk / Pop-Up (50–500 sq ft)', traffic: 0.003 },
  { label: 'Inline (1,000–3,000 sq ft)', traffic: 0.008 },
  { label: 'Mid-Size (3,000–8,000 sq ft)', traffic: 0.015 },
  { label: 'Flagship (8,000+ sq ft)', traffic: 0.025 },
]

export default function ROICalculator() {
  const [catIdx, setCatIdx] = useState(0)
  const [sizeIdx, setSizeIdx] = useState(1)

  const cat = CATEGORIES[catIdx]
  const size = SIZES[sizeIdx]

  const annualVisitors = 40_000_000
  const zoneVisitors = Math.round(annualVisitors * size.traffic)
  const transactions = Math.round(zoneVisitors * cat.convRate)
  const annualRevenue = transactions * cat.avgSale
  const standaloneRevenue = Math.round(annualRevenue * 0.18) // typical standalone is ~18% of MOA traffic
  const uplift = Math.round(((annualRevenue - standaloneRevenue) / standaloneRevenue) * 100)

  const fmt = (n) => n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : `$${(n / 1_000).toFixed(0)}K`

  return (
    <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.2)', padding: '3rem', marginTop: '4rem' }}>
      <div style={{ position: 'absolute', top: 0, left: '3rem', width: '60px', height: '2px', background: 'var(--gold)' }} />
      <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>Revenue Estimator</span>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Calculate Your MOA Opportunity</h3>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', marginBottom: '2.5rem' }}>Estimated based on 40M annual visitors, category conversion rates, and zone traffic data.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
        {/* Category selector */}
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--gold)', display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Brand Category</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {CATEGORIES.map((c, i) => (
              <button key={i} onClick={() => setCatIdx(i)} style={{
                background: catIdx === i ? 'rgba(201,168,76,0.12)' : 'transparent',
                border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)',
                color: catIdx === i ? 'var(--gold)' : 'rgba(255,255,255,0.55)',
                padding: '0.7rem 1rem', textAlign: 'left', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                transition: 'all 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                {c.label}
                {catIdx === i && <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>SELECTED ✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--gold)', display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Space Type</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {SIZES.map((s, i) => (
              <button key={i} onClick={() => setSizeIdx(i)} style={{
                background: sizeIdx === i ? 'rgba(201,168,76,0.12)' : 'transparent',
                border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)',
                color: sizeIdx === i ? 'var(--gold)' : 'rgba(255,255,255,0.55)',
                padding: '0.7rem 1rem', textAlign: 'left', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                transition: 'all 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                {s.label}
                {sizeIdx === i && <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>SELECTED ✓</span>}
              </button>
            ))}
          </div>

          {/* Results */}
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(201,168,76,0.2)' }}>
            {[
              { label: 'Zone Visitors/Year', value: `${(zoneVisitors/1000).toFixed(0)}K` },
              { label: 'Est. Transactions', value: `${(transactions/1000).toFixed(0)}K` },
              { label: 'Est. Annual Revenue', value: fmt(annualRevenue), highlight: true },
              { label: 'vs. Standalone', value: `+${uplift}%`, highlight: true },
            ].map(({ label, value, highlight }) => (
              <div key={label} style={{ background: 'rgba(8,8,8,0.8)', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: highlight ? '1.6rem' : '1.3rem', color: highlight ? 'var(--gold)' : '#fff', fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>
        * Estimates based on MOA published visitor data, category avg transaction values, and zone traffic modeling. Actual results vary.
      </p>
    </div>
  )
}
