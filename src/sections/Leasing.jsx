import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { MOA } from '../data/moa.js'
import ROICalculator from '../components/ROICalculator.jsx'

export default function Leasing({ scrollTo }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="leasing" style={{ padding: '0', background: 'var(--black)', position: 'relative' }} ref={ref}>
      <div className="section-scroll">
      <div className="section-inner">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 5rem' }}>
          <span className="eyebrow">Leasing Paths</span>
          <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Your Space.<br />Your Terms.</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.8 }}>
            Whether you're planting a flagship flag or testing a DTC concept, MOA has the format, location, and traffic profile to match your strategy.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'rgba(201,168,76,0.15)', marginBottom: '4rem' }}>
          {MOA.leasing.map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              style={{ background: 'var(--black)', padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', transition: 'background 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#0c0b07'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--black)'}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--gold)', opacity: 0.5 }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Format</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>{l.type}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Size Range</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>{l.size}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Traffic</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>{l.traffic}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{l.ideal}</div>
              </div>
              <button onClick={() => scrollTo('action')} className="btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.65rem' }}>
                Inquire →
              </button>
            </motion.div>
          ))}
        </div>

        {/* ROI Calculator */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          style={{ position: 'relative' }}>
          <ROICalculator />
        </motion.div>

        {/* CTA bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}
          style={{ marginTop: '3rem', padding: '3rem', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', background: 'rgba(201,168,76,0.04)' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Ready to find your space?</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Our leasing team will match you with the right format, location, and terms.</p>
          </div>
          <button onClick={() => scrollTo('action')} className="btn-gold">Schedule a Leasing Call →</button>
        </motion.div>
      </div>
      </div>
    </section>
  )
}
