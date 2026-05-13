import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BRAND_TYPES = [
  'Fashion & Apparel', 'Luxury & Premium', 'Food & Dining',
  'Tech & Electronics', 'Beauty & Wellness', 'Entertainment',
  'Health & Fitness', 'Home & Lifestyle', 'Sportswear', 'Other'
]

const GOALS = [
  'Drive foot traffic', 'Launch a new market', 'Build brand awareness',
  'Test a DTC concept', 'Host an event or activation', 'Reach affluent shoppers',
  'International visibility', 'Seasonal pop-up'
]

const STAGES = [
  'Early-stage / startup', 'Growing brand (regional)', 'Established national brand', 'Global brand'
]

export default function AIQualifier() {
  const [step, setStep] = useState(0) // 0=form, 1=loading, 2=result
  const [brand, setBrand] = useState('')
  const [brandType, setBrandType] = useState('')
  const [goals, setGoals] = useState([])
  const [stage, setStage] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const toggleGoal = (g) => setGoals(prev =>
    prev.includes(g) ? prev.filter(x => x !== g) : prev.length < 3 ? [...prev, g] : prev
  )

  const generate = async () => {
    if (!brand || !brandType || goals.length === 0 || !stage) return
    setStep(1)
    setError('')
    try {
      const prompt = `You are a senior leasing consultant at Mall of America writing a compelling, personalised pitch to a prospective tenant.

Brand: "${brand}"
Category: ${brandType}
Stage: ${stage}
Goals: ${goals.join(', ')}

Write a 3-paragraph personalised pitch (150-180 words total) explaining exactly why Mall of America is the perfect location for this specific brand right now. Be specific, confident, and data-driven. Reference MOA's 40M annual visitors, relevant demographics for this category, and how MOA directly addresses their stated goals. End with a clear call to action. Tone: premium, direct, no fluff.`

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      })
      const data = await res.json()
      const text = data.content?.find(b => b.type === 'text')?.text || ''
      setResult(text)
      setStep(2)
    } catch (e) {
      setError('Unable to generate pitch. Please try again.')
      setStep(0)
    }
  }

  const reset = () => {
    setStep(0); setBrand(''); setBrandType(''); setGoals([]); setStage(''); setResult('')
  }

  return (
    <div style={{ marginTop: '4rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: '3rem', width: '60px', height: '2px', background: 'var(--gold)' }} />
      <div style={{ padding: '3rem', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>AI-Powered</span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Your Personalised MOA Pitch</h3>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginBottom: '2.5rem', maxWidth: '560px' }}>
          Tell us about your brand and goals. Our AI will generate a personalised pitch showing exactly why Mall of America is the right move for you — right now.
        </p>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Brand name */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Your Brand Name</label>
                  <input value={brand} onChange={e => setBrand(e.target.value)}
                    placeholder="e.g. Acme Apparel Co."
                    style={inputStyle} />
                </div>

                {/* Brand type */}
                <div>
                  <label style={labelStyle}>Brand Category</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {BRAND_TYPES.map(t => (
                      <button key={t} onClick={() => setBrandType(t)} style={{
                        ...pillStyle,
                        background: brandType === t ? 'var(--gold)' : 'rgba(255,255,255,0.04)',
                        color: brandType === t ? '#080808' : 'rgba(255,255,255,0.55)',
                        border: `1px solid ${brandType === t ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                      }}>{t}</button>
                    ))}
                  </div>
                </div>

                {/* Stage */}
                <div>
                  <label style={labelStyle}>Brand Stage</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {STAGES.map(s => (
                      <button key={s} onClick={() => setStage(s)} style={{
                        background: stage === s ? 'rgba(201,168,76,0.12)' : 'transparent',
                        border: `1px solid ${stage === s ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                        color: stage === s ? 'var(--gold)' : 'rgba(255,255,255,0.55)',
                        padding: '0.6rem 1rem', textAlign: 'left', cursor: 'pointer',
                        fontFamily: 'var(--font-body)', fontSize: '0.8rem', transition: 'all 0.15s',
                      }}>{s}</button>
                    ))}
                  </div>
                </div>

                {/* Goals */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Primary Goals <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>(pick up to 3)</span></label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {GOALS.map(g => (
                      <button key={g} onClick={() => toggleGoal(g)} style={{
                        ...pillStyle,
                        background: goals.includes(g) ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)',
                        color: goals.includes(g) ? 'var(--gold)' : 'rgba(255,255,255,0.55)',
                        border: `1px solid ${goals.includes(g) ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      }}>{goals.includes(g) ? '✓ ' : ''}{g}</button>
                    ))}
                  </div>
                </div>
              </div>

              {error && <p style={{ color: '#f85149', fontSize: '0.82rem', marginBottom: '1rem' }}>{error}</p>}

              <button onClick={generate}
                disabled={!brand || !brandType || goals.length === 0 || !stage}
                className="btn-gold"
                style={{ opacity: (!brand || !brandType || goals.length === 0 || !stage) ? 0.4 : 1, fontSize: '0.78rem', padding: '1rem 2.5rem' }}>
                Generate My MOA Pitch →
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '3rem' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[0,1,2].map(i => (
                  <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }} />
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                CRAFTING YOUR PERSONALISED PITCH...
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ marginBottom: '2rem', padding: '2rem', background: 'rgba(8,8,8,0.6)', border: '1px solid rgba(201,168,76,0.2)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: '2rem', width: '40px', height: '2px', background: 'var(--gold)' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: '1.25rem', marginTop: '0.5rem' }}>
                  PERSONALISED PITCH FOR {brand.toUpperCase()}
                </div>
                {result.split('\n\n').map((para, i) => (
                  <p key={i} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '1.25rem', fontWeight: 300 }}>
                    {para}
                  </p>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => document.getElementById('action')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-gold" style={{ fontSize: '0.75rem' }}>
                  Schedule a Conversation →
                </button>
                <button onClick={reset} className="btn-outline" style={{ fontSize: '0.75rem' }}>
                  Generate Another Pitch
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const labelStyle = {
  fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em',
  color: 'var(--gold)', display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase'
}
const inputStyle = {
  width: '100%', padding: '0.9rem 1.1rem',
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff', fontSize: '0.88rem', fontFamily: 'var(--font-body)', outline: 'none',
  transition: 'border-color 0.2s',
}
const pillStyle = {
  padding: '0.4rem 0.9rem', fontSize: '0.72rem',
  fontFamily: 'var(--font-body)', cursor: 'pointer',
  transition: 'all 0.15s', letterSpacing: '0.02em',
}
