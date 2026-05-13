import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Action() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', company: '', email: '', phone: '', message: '' })
  const [step, setStep] = useState(0) // 0=form, 1=loading, 2=result
  const [aiReply, setAiReply] = useState('')

  const intents = [
    { id: 'lease', label: 'Retail Leasing', icon: '🏪', desc: "I'm interested in opening a location at MOA" },
    { id: 'sponsor', label: 'Sponsorship', icon: '🤝', desc: "I want to explore brand partnership opportunities" },
    { id: 'event', label: 'Book an Event', icon: '🎪', desc: "I want to host an event or activation at MOA" },
  ]

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async () => {
    if (!form.firstName || !form.email || !selected) return
    setStep(1)
    try {
      const prompt = `You are a senior partnership manager at Mall of America replying to an inbound inquiry.

Inquiry Type: ${intents.find(i => i.id === selected)?.label}
Name: ${form.firstName} ${form.lastName}
Company: ${form.company || 'Not provided'}
Message: ${form.message || 'No additional details'}

Write a warm, professional, personalised follow-up email reply (120-150 words). 
- Thank them by first name
- Reference their specific inquiry type
- Mention 1-2 specific MOA advantages relevant to their interest
- Propose a specific next step (15-minute discovery call)
- Sign off as "The MOA Partnership Team"
- Tone: premium, confident, genuine — not generic

Do not include subject line. Start directly with "Dear [Name],"`

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
      setAiReply(text)
      setStep(2)
    } catch (e) {
      setStep(0)
    }
  }

  return (
    <section id="action" style={{ padding: '0', background: 'var(--black)', position: 'relative', overflow: 'hidden' }} ref={ref}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="section-scroll"><div className="section-inner" style={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="eyebrow" style={{ marginBottom: '1.5rem', display: 'block' }}>Let's Talk</span>
          <h2 style={{ marginBottom: '1.5rem' }}>Your Place in the<br /><span className="shimmer">World's Destination</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '560px', margin: '0 auto 4rem', fontSize: '1rem', lineHeight: 1.8 }}>
            Whether you're leasing a flagship, launching a sponsorship, or booking the event of the year — our team is ready to make it happen.
          </p>
        </motion.div>

        {/* Intent selector */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(201,168,76,0.15)', maxWidth: '900px', margin: '0 auto 3rem' }}>
          {intents.map(intent => (
            <button key={intent.id} onClick={() => setSelected(intent.id)}
              style={{ background: selected === intent.id ? 'rgba(201,168,76,0.12)' : 'var(--black)', padding: '2rem', border: 'none', cursor: 'pointer', textAlign: 'center', transition: 'background 0.2s', position: 'relative' }}>
              {selected === intent.id && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--gold)' }} />}
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{intent.icon}</div>
              <div style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.4rem', color: selected === intent.id ? 'var(--gold)' : '#fff' }}>{intent.label}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{intent.desc}</div>
            </button>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          style={{ maxWidth: '640px', margin: '0 auto' }}>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                    <input placeholder="First Name *" value={form.firstName} onChange={e => update('firstName', e.target.value)} style={inputStyle} />
                    <input placeholder="Last Name" value={form.lastName} onChange={e => update('lastName', e.target.value)} style={inputStyle} />
                  </div>
                  <input placeholder="Company / Brand *" value={form.company} onChange={e => update('company', e.target.value)} style={inputStyle} />
                  <input placeholder="Email Address *" type="email" value={form.email} onChange={e => update('email', e.target.value)} style={inputStyle} />
                  <input placeholder="Phone Number" value={form.phone} onChange={e => update('phone', e.target.value)} style={inputStyle} />
                  <textarea placeholder="Tell us about your opportunity — size, timeline, goals..." rows={4}
                    value={form.message} onChange={e => update('message', e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '100px', fontFamily: 'var(--font-body)' }} />
                  <button onClick={submit}
                    disabled={!form.firstName || !form.email || !selected}
                    className="btn-gold"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', padding: '1.1rem', opacity: (!form.firstName || !form.email || !selected) ? 0.45 : 1 }}>
                    Submit Inquiry →
                  </button>
                  {(!form.firstName || !form.email || !selected) && (
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
                      Please fill in your name, email, and select an inquiry type above
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[0,1,2].map(i => (
                    <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                      style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }} />
                  ))}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                  PREPARING YOUR PERSONALISED RESPONSE...
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ padding: '2.5rem', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.25)', textAlign: 'left', position: 'relative', marginBottom: '1.5rem' }}>
                  <div style={{ position: 'absolute', top: 0, left: '2rem', width: '40px', height: '2px', background: 'var(--gold)' }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: '1.25rem', marginTop: '0.5rem' }}>
                    YOUR MOA TEAM REPLY
                  </div>
                  {aiReply.split('\n').map((line, i) => (
                    line.trim() ? (
                      <p key={i} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '0.75rem', fontWeight: 300 }}>{line}</p>
                    ) : <div key={i} style={{ height: '0.5rem' }} />
                  ))}
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(63,185,80,0.06)', border: '1px solid rgba(63,185,80,0.2)', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
                  <span style={{ fontSize: '1.25rem' }}>✓</span>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.88rem', color: '#6aaa7a', marginBottom: '0.2rem' }}>Inquiry Received</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Our team will follow up at {form.email} within 1 business day.</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Direct contacts */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '800px', margin: '5rem auto 0' }}>
          {[
            { role: 'Leasing', email: 'leasing@mallofamerica.com', phone: '(952) 883-8800' },
            { role: 'Events', email: 'events@mallofamerica.com', phone: '(952) 883-8500' },
            { role: 'Sponsorship', email: 'sponsorship@mallofamerica.com', phone: '(952) 883-8600' },
          ].map(c => (
            <div key={c.role} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{c.role}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.2rem' }}>{c.email}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>{c.phone}</div>
            </div>
          ))}
        </motion.div>
      </div></div>
    </section>
  )
}

const inputStyle = {
  width: '100%', padding: '1rem 1.25rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff', fontSize: '0.85rem',
  fontFamily: 'DM Sans, sans-serif',
  outline: 'none', transition: 'border-color 0.2s',
}
