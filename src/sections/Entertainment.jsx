import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { MOA } from '../data/moa.js'

export default function Entertainment() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section id="entertainment" style={{ padding: '0', background: 'var(--black)', position: 'relative', overflow: 'hidden' }} ref={ref}>
      <div style={{ position: 'absolute', bottom: '-300px', left: '-200px', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div className="section-scroll" style={{ position: "relative", zIndex: 1 }}>
      <div className="section-inner">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="eyebrow">Attractions & Entertainment</span>
          <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>The Reason<br />They Come Back</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '600px', fontSize: '1rem', lineHeight: 1.8, marginBottom: '4rem' }}>
            No mall in North America matches MOA's entertainment density. Nickelodeon Universe alone draws families from across the continent. This is the differentiator that makes MOA a multi-day destination — not just a shopping trip.
          </p>
        </motion.div>

        {/* Entertainment cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(201,168,76,0.12)', marginBottom: '5rem' }}>
          {MOA.entertainment.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              style={{ background: 'var(--black)', padding: '2.5rem 2.5rem', position: 'relative', overflow: 'hidden', transition: 'background 0.3s' }}
              onMouseEnter={el => el.currentTarget.style.background = '#0d0c08'}
              onMouseLeave={el => el.currentTarget.style.background = 'var(--black)'}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1rem' }}>{e.tag}</div>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{e.icon}</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', fontWeight: 500 }}>{e.name}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.7 }}>{e.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Hero entertainment stat */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(201,168,76,0.2)' }}>
          <div style={{ background: 'var(--black)', padding: '4rem 3rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--gold)', lineHeight: 1, marginBottom: '1rem' }}>7 Acres</div>
            <div style={{ fontWeight: 500, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Nickelodeon Universe</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6 }}>North America's largest indoor theme park. 30+ rides and attractions. Draws 10M+ visitors annually on its own.</div>
          </div>
          <div style={{ background: '#0a0a0a', padding: '4rem 3rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--gold)', lineHeight: 1, marginBottom: '1rem' }}>4+</div>
            <div style={{ fontWeight: 500, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Major Anchor Attractions</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6 }}>SEA LIFE Aquarium · FlyOver · Crayola Experience · Live entertainment venues — each a destination in its own right.</div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  )
}
