import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { MOA } from '../data/moa.js'

export default function Dining() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="dining" style={{ padding: '0', background: 'var(--black2)' }} ref={ref}>
      <div className="section-scroll">
      <div className="section-inner">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 5rem' }}>
          <span className="eyebrow">Dining & Lifestyle</span>
          <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Food as a<br />Destination</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.8 }}>
            50+ dining concepts turn a shopping trip into an all-day experience. MOA's F&B drives dwell time, repeat visits, and cross-category spend — making dining partnerships among the highest-ROI opportunities on the property.
          </p>
        </motion.div>

        {/* Dining grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '4rem' }}>
          {MOA.dining.map((d, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
              style={{ background: 'var(--black2)', padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--black2)'}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>{d.type}</div>
              <div style={{ fontWeight: 500, fontSize: '1.05rem' }}>{d.name}</div>
            </motion.div>
          ))}
        </div>

        {/* F&B opportunity banner */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', padding: '4rem', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}>
          <div>
            <span className="eyebrow" style={{ marginBottom: '1.5rem', display: 'block' }}>F&B Opportunity</span>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--white)' }}>The F&B Gap is Your Opportunity</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '2rem' }}>
              MOA actively seeks distinctive F&B concepts that elevate visitor experience — from fast casual to full-service brasseries, food halls to chef-driven concepts. First-mover advantage in underpenetrated categories.
            </p>
            <button onClick={() => scrollTo('leasing')} className="btn-gold">Explore F&B Spaces →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[['50+', 'Current dining concepts'], ['$47', 'Avg per-visit F&B spend'], ['3–4hr', 'Dwell time drives multiple meals'], ['400+', 'Annual events create captive dining']].map(([val, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)', minWidth: '80px' }}>{val}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  )
}
