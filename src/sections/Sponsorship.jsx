import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { MOA } from '../data/moa.js'
import AIQualifier from '../components/AIQualifier.jsx'

export default function Sponsorship({ scrollTo }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="sponsorship" style={{ padding: '0', background: 'var(--black2)' }} ref={ref}>
      <div className="section-scroll">
      <div className="section-inner">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="eyebrow">Sponsorship & Partnerships</span>
          <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Your Brand.<br />Our Platform.</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '600px', fontSize: '1rem', lineHeight: 1.8, marginBottom: '5rem' }}>
            40 million impressions annually. 500+ digital screens. 2.4 million social followers. MOA is one of the most powerful brand media environments in North America — with packages built for every partnership model.
          </p>
        </motion.div>

        {/* Reach metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(201,168,76,0.15)', marginBottom: '4rem' }}>
          {MOA.sponsorship.reach.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              style={{ background: 'var(--black2)', padding: '2.5rem 2rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '0.4rem' }}>{r.value}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Sponsorship tiers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(201,168,76,0.15)', marginBottom: '4rem' }}>
          {MOA.sponsorship.tiers.map((tier, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.1 }}
              style={{ background: i === 0 ? '#0c0b07' : 'var(--black2)', padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
              {i === 0 && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--gold)' }} />}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                {i === 0 ? '◆ PREMIUM' : i === 1 ? '◇ STANDARD' : '○ ENTRY'}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>{tier.name}</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--gold)', marginBottom: '2rem' }}>{tier.investment}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {tier.perks.map((perk, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.7rem', marginTop: '0.2rem', flexShrink: 0 }}>→</span>
                    <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{perk}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2.5rem' }}>
                <button onClick={() => scrollTo('action')} className={i === 0 ? 'btn-gold' : 'btn-outline'} style={{ width: '100%', justifyContent: 'center', fontSize: '0.65rem' }}>
                  {i === 0 ? 'Apply for Founding Partnership →' : 'Learn More →'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activation types */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
          style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <span className="eyebrow" style={{ marginBottom: '2rem', display: 'block' }}>Activation Formats</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {['Digital OOH Takeover', 'In-Mall Experience Pop-Ups', 'Rotunda Brand Activation', 'Event Co-Sponsorship', 'Digital Screen Network', 'Category Exclusivity', 'Influencer Integration', 'Seasonal Campaign Partnership', 'Mobile App Integration'].map((format, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.7 + i * 0.04 }}
                style={{ padding: '0.6rem 1.4rem', border: '1px solid rgba(201,168,76,0.2)', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {format}
              </motion.div>
            ))}
          </div>
        </motion.div>
      <AIQualifier />
      </div>
      </div>
    </section>
  )
}
