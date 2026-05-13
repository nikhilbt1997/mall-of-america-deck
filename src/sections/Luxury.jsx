import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { MOA } from '../data/moa.js'
import ImageSlider from '../components/ImageSlider.jsx'
const luxuryImg = '/images/luxury.jpg'
const luxuryImg2 = '/images/luxury2.jpg'

export default function Luxury({ scrollTo }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section id="luxury" style={{ padding: '0', background: 'var(--black)', position: 'relative', overflow: 'hidden' }} ref={ref}>
      <div style={{ position: 'absolute', top: '-200px', right: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div className="section-scroll">
      <div className="section-inner">
        <div style={{ maxWidth: '600px', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="eyebrow">Luxury Wing</span>
            <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Premium<br />Positioning</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.8 }}>
              MOA's curated luxury corridor commands premium traffic and a distinct shopper profile — higher income, higher intent, longer dwell time. This isn't mass retail. It's the prestige address your brand deserves.
            </p>
          </motion.div>
        </div>

        {/* Luxury brand marquee */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.3 }}
          style={{ overflow: 'hidden', marginBottom: '5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to right, var(--black), transparent)', zIndex: 2 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to left, var(--black), transparent)', zIndex: 2 }} />
          <motion.div animate={{ x: [0, -1200] }} transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            style={{ display: 'flex', gap: '4rem', whiteSpace: 'nowrap', padding: '2rem 0' }}>
            {[...MOA.luxury, ...MOA.luxury, ...MOA.luxury].map((brand, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '4rem' }}>
                {brand} <span style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>◆</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* AI-Generated Luxury Corridor */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          style={{ marginBottom: '4rem' }}>
          <ImageSlider images={[luxuryImg, luxuryImg2]} height={340} position="center 30%"
            label="The Luxury Corridor"
            sublabel="COACH · MICHAEL KORS · KATE SPADE · PANDORA · AND MORE" />
        </motion.div>

{/* Luxury positioning stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(201,168,76,0.15)' }}>
          {[
            { val: '$75K+', label: 'Median visitor income', desc: 'Qualified luxury purchasing power' },
            { val: '40+', label: 'Premium & luxury brands', desc: 'Coach, Kate Spade, Michael Kors & more' },
            { val: '12M', label: 'Affluent visitors annually', desc: 'Top 30% household income' },
          ].map(({ val, label, desc }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.1 }}
              style={{ background: 'var(--black)', padding: '3rem 2.5rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>{val}</div>
              <div style={{ fontWeight: 500, marginBottom: '0.4rem' }}>{label}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>{desc}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
          style={{ marginTop: '4rem', padding: '3rem', border: '1px solid rgba(201,168,76,0.2)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1px', left: '3rem', width: '60px', height: '2px', background: 'var(--gold)' }} />
          <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, fontStyle: 'italic', maxWidth: '700px' }}>
            "Mall of America delivers a luxury shopper who is engaged, dwell-time-intensive, and highly receptive to premium brand messaging at every touchpoint."
          </blockquote>
          <div style={{ marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.15em' }}>— MOA LEASING TEAM</div>
        </motion.div>
      </div>
      </div>
    </section>
  )
}
