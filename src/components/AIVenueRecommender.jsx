import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EVENT_TYPES = ['Concert / Live Music', 'Brand Activation', 'Product Launch', 'Corporate Conference', 'Fashion Show', 'ESports Tournament', 'Holiday Event', 'Celebrity Appearance', 'Convention / Expo', 'Private Dining Event']
const SIZES = ['Under 500 guests', '500 - 2,000 guests', '2,000 - 10,000 guests', '10,000+ guests']
const DURATIONS = ['Half day (4 hrs)', 'Full day (8 hrs)', 'Multi-day (2-3 days)', 'Extended (1 week+)']

export default function AIVenueRecommender() {
  const [eventType, setEventType] = useState('')
  const [size, setSize] = useState('')
  const [duration, setDuration] = useState('')
  const [details, setDetails] = useState('')
  const [step, setStep] = useState(0)
  const [result, setResult] = useState('')
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const generate = async () => {
    if (!eventType || !size || !duration) return
    setStep(1)
    try {
      const prompt = `You are a senior events consultant at Mall of America. A client wants to book an event.

Event Type: ${eventType}
Expected Attendance: ${size}
Duration: ${duration}
Additional Details: ${details || 'None provided'}

Respond with a structured venue recommendation in this exact format:

RECOMMENDED VENUE: [specific venue name at MOA]
CAPACITY: [number]
SETUP TIME: [time needed]
ESTIMATED INVESTMENT: [price range]

WHY THIS VENUE:
[2-3 sentences explaining why this specific venue at MOA is perfect for this event type and size]

WHAT'S INCLUDED:
- [3-4 bullet points of what MOA provides]

NEXT STEP:
[One sentence call to action]

Keep it under 200 words. Be specific to Mall of America venues (Rotunda Stage, Event Center, North Garden, East Broadway, Full Mall Takeover, Private Dining Suites, etc).`

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
      setStep(0)
    }
  }

  const reset = () => { setStep(0); setEventType(''); setSize(''); setDuration(''); setDetails(''); setResult('') }

  return (
    <div style={{ marginTop: '4rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '60px', height: '2px', background: 'var(--gold)' }} />
      <div style={{ padding: '3rem', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem', marginTop: '0.5rem' }}>AI-Powered</span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Find Your Perfect Venue</h3>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginBottom: '2.5rem', maxWidth: '560px' }}>
          Tell us about your event and our AI will recommend the perfect MOA venue — with capacity, setup details, and investment estimate.
        </p>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <label style={labelStyle}>Event Type</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {EVENT_TYPES.map(t => (
                      <button key={t} onClick={() => setEventType(t)} style={{
                        background: eventType === t ? 'rgba(201,168,76,0.12)' : 'transparent',
                        border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)',
                        color: eventType === t ? 'var(--gold)' : 'rgba(255,255,255,0.55)',
                        padding: '0.65rem 1rem', textAlign: 'left', cursor: 'pointer',
                        fontFamily: 'var(--font-body)', fontSize: '0.8rem', transition: 'all 0.15s',
                        display: 'flex', justifyContent: 'space-between',
                      }}>
                        {t} {eventType === t && <span style={{ fontSize: '0.6rem' }}>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>Expected Attendance</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {SIZES.map(s => (
                        <button key={s} onClick={() => setSize(s)} style={{
                          background: size === s ? 'rgba(201,168,76,0.12)' : 'transparent',
                          border: `1px solid ${size === s ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                          color: size === s ? 'var(--gold)' : 'rgba(255,255,255,0.55)',
                          padding: '0.65rem 1rem', textAlign: 'left', cursor: 'pointer',
                          fontFamily: 'var(--font-body)', fontSize: '0.8rem', transition: 'all 0.15s',
                        }}>{s}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Event Duration</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {DURATIONS.map(d => (
                        <button key={d} onClick={() => setDuration(d)} style={{
                          background: duration === d ? 'rgba(201,168,76,0.12)' : 'transparent',
                          border: `1px solid ${duration === d ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                          color: duration === d ? 'var(--gold)' : 'rgba(255,255,255,0.55)',
                          padding: '0.65rem 1rem', textAlign: 'left', cursor: 'pointer',
                          fontFamily: 'var(--font-body)', fontSize: '0.8rem', transition: 'all 0.15s',
                        }}>{d}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Additional Details <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(optional)</span></label>
                    <textarea value={details} onChange={e => setDetails(e.target.value)}
                      placeholder="e.g. outdoor stage needed, requires AV production, celebrity meet & greet..."
                      rows={3} style={{ ...inputStyle, resize: 'none', fontFamily: 'var(--font-body)', fontSize: '0.82rem' }} />
                  </div>
                </div>
              </div>

              <button onClick={generate}
                disabled={!eventType || !size || !duration}
                className="btn-gold"
                style={{ opacity: (!eventType || !size || !duration) ? 0.4 : 1, fontSize: '0.78rem', padding: '1rem 2.5rem' }}>
                Find My Venue →
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
                FINDING YOUR PERFECT VENUE...
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ marginBottom: '2rem', padding: '2rem', background: 'rgba(8,8,8,0.6)', border: '1px solid rgba(201,168,76,0.2)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: '2rem', width: '40px', height: '2px', background: 'var(--gold)' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: '1.25rem', marginTop: '0.5rem' }}>
                  VENUE RECOMMENDATION — {eventType.toUpperCase()}
                </div>
                {result.split('\n').map((line, i) => {
                  if (!line.trim()) return <div key={i} style={{ height: '0.75rem' }} />
                  const isBold = line.startsWith('RECOMMENDED') || line.startsWith('CAPACITY') || line.startsWith('SETUP') || line.startsWith('ESTIMATED') || line.startsWith('WHY') || line.startsWith('WHAT') || line.startsWith('NEXT')
                  const isBullet = line.trim().startsWith('-')
                  return (
                    <p key={i} style={{
                      color: isBold ? 'var(--gold)' : isBullet ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.8)',
                      fontSize: isBold ? '0.78rem' : '0.88rem',
                      fontFamily: isBold ? 'var(--font-mono)' : 'var(--font-body)',
                      letterSpacing: isBold ? '0.08em' : '0',
                      fontWeight: isBold ? 600 : 300,
                      lineHeight: 1.7,
                      marginBottom: '0.25rem',
                      paddingLeft: isBullet ? '1rem' : '0',
                    }}>{line}</p>
                  )
                })}
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => scrollTo('action')} className="btn-gold" style={{ fontSize: '0.75rem' }}>
                  Book This Venue →
                </button>
                <button onClick={reset} className="btn-outline" style={{ fontSize: '0.75rem' }}>
                  Try Another Event
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const labelStyle = { fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--gold)', display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase' }
const inputStyle = { width: '100%', padding: '0.9rem 1.1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.88rem', outline: 'none' }
