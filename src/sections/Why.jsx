import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { MOA } from '../data/moa.js'
import FloorMap from '../components/FloorMap.jsx'
import DemoCharts from '../components/DemoCharts.jsx'
import ImageSlider from '../components/ImageSlider.jsx'
const atriumImg = '/images/atrium.jpg'
const atriumImg2 = '/images/atrium2.jpg'

export default function Why() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="why" style={{ padding: '0', background: 'var(--black)' }} ref={ref}>
      <div className="section-scroll">
      <div className="section-inner">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="eyebrow">Why This Property</span>
          <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>The Numbers<br />Don't Lie</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '560px', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '4rem' }}>
            Mall of America isn't just a shopping center — it's a global platform. A city within a city that generates foot traffic no standalone retailer could dream of.
          </p>
        </motion.div>

        {/* Big animated stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(201,168,76,0.15)', marginBottom: '5rem' }}>
          {[
            { val: 40, suffix: 'M+', label: 'Annual Visitors', sub: 'More than 33 NFL stadiums combined', decimals: 0 },
            { val: 5.6, suffix: 'M', label: 'Square Feet', sub: 'Larger than 257 Walmarts', decimals: 1 },
            { val: 500, suffix: '+', label: 'Retail Stores', sub: 'Every category, every price point', decimals: 0 },
            { val: 530, suffix: 'M', label: 'Annual Spend ($)', sub: 'GDP of a small city', decimals: 0 },
          ].map(({ val, suffix, label, sub, decimals }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ background: 'var(--black)', padding: '3rem 2.5rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--gold)', lineHeight: 1, marginBottom: '0.5rem' }}>
                {inView ? <CountUp end={val} decimals={decimals} duration={2.5} delay={i * 0.1} /> : '0'}{suffix}
              </div>
              <div style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '0.4rem' }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Demographics + reach */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            <span className="eyebrow" style={{ marginBottom: '1.5rem', display: 'block' }}>Visitor Profile</span>
            {MOA.demographics.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + i * 0.08 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', flex: 1 }}>{d.label}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold)', fontWeight: 500, marginLeft: '1rem' }}>{d.value}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
            {/* MOA vs Standalone comparison */}
            <span className="eyebrow" style={{ marginBottom: '1.5rem', display: 'block' }}>MOA vs. Standalone Location</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(201,168,76,0.15)' }}>
              {[
                { metric: 'Annual Foot Traffic', moa: '40M+', standalone: '~1.2M', better: true },
                { metric: 'Avg Dwell Time', moa: '3–4 hrs', standalone: '45 min', better: true },
                { metric: 'Catchment Area', moa: '33% of US', standalone: '5-mile radius', better: true },
                { metric: 'Marketing Reach', moa: 'Included', standalone: 'Self-funded', better: true },
                { metric: 'Cross-Shopping', moa: '500+ brands', standalone: 'None', better: true },
                { metric: 'Event Traffic Spikes', moa: '400+/year', standalone: 'N/A', better: true },
              ].map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'var(--black)', padding: '0.9rem 1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>{row.metric}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gold)', textAlign: 'center' }}>{row.moa}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>{row.standalone}</span>
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'rgba(201,168,76,0.08)', padding: '0.6rem 1rem' }}>
                <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>METRIC</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--gold)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textAlign: 'center' }}>MALL OF AMERICA</span>
                <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textAlign: 'center' }}>STANDALONE</span>
              </div>
            </div>

            {/* Geo reach */}
            <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--gold)', lineHeight: 1, marginBottom: '0.75rem' }}>33%</div>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.6 }}>of the entire US population lives within a single day's drive.</p>
              <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8 }}>
                144 direct flight destinations · MSP Airport 7 min away · 11M+ international visitors
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI-Generated Atrium Render */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          style={{ marginBottom: '4rem' }}>
          <ImageSlider images={[atriumImg, atriumImg2]} height={340} position='center'
            label='5.6 Million Square Feet'
            sublabel="NORTH AMERICA'S LARGEST RETAIL + ENTERTAINMENT DESTINATION" />
        </motion.div>

        {/* Interactive Floor Map */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 0.8 }}>
          <FloorMap />
        </motion.div>
      </div>
      </div>
    </section>
  )
}
