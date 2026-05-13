import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { MOA } from '../data/moa.js'

export default function Retail({ scrollTo }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="retail" style={{ padding: '0', background: 'var(--black2)' }} ref={ref}>
      <div className="section-scroll">
      <div className="section-inner">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="eyebrow">Retail Environment</span>
            <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>500+ Brands.<br />One Address.</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              From global flagships to emerging DTC concepts, Mall of America offers the most diverse retail environment in North America — with foot traffic and dwell time that no standalone location can match.
            </p>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
              <div><div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)' }}>$530M</div><div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Annual retail spend</div></div>
              <div><div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)' }}>3–4hr</div><div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Average dwell time</div></div>
            </div>
            <button onClick={() => scrollTo('leasing')} className="btn-gold">View Leasing Options →</button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(201,168,76,0.1)' }}>
              {MOA.retailCategories.map((cat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
                  style={{ background: 'var(--black2)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--black2)'}>
                  <div>
                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{cat.name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>{cat.anchor}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>{cat.count}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Full-width brand marquee */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          style={{ overflow: 'hidden', margin: '3rem 0', position: 'relative', height: '2rem' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, var(--black2), transparent)', zIndex: 2 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, var(--black2), transparent)', zIndex: 2 }} />
          <motion.div animate={{ x: [0, -1200] }} transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', alignItems: 'center', height: '100%' }}>
            {['NIKE', 'APPLE', 'H&M', 'ZARA', 'COACH', 'SAMSUNG', 'SEPHORA', 'LEVIS', 'PANDORA', 'LEGO', 'MAC', 'FOREVER 21', 'CHEESECAKE FACTORY', 'MICROSOFT', 'BATH & BODY WORKS', 'SWAROVSKI', 'HUGO BOSS', 'KATE SPADE', 'NIKE', 'APPLE', 'H&M', 'ZARA', 'COACH', 'SAMSUNG'].map((b, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.25em' }}>
                {b} <span style={{ color: 'rgba(201,168,76,0.4)', marginLeft: '1.5rem' }}>◆</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Growth metric bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          style={{ marginTop: '5rem', padding: '3rem', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem' }}>
          {[['#1', 'Most visited mall in the US'], ['Zero', 'Property tax (est. 1992)'], ['$30M+', 'Capital improvements (2023–25)'], ['12%', 'YoY visitor growth (post-2022)']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold)', marginBottom: '0.4rem' }}>{val}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      </div>
    </section>
  )
}
