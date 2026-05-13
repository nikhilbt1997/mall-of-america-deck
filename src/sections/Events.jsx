import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { MOA } from '../data/moa.js'
import EventCalendar from '../components/EventCalendar.jsx'
import ImageSlider from '../components/ImageSlider.jsx'
const concertImg = '/images/concert.jpg'
const concertImg2 = '/images/concert2.jpg'
import AIVenueRecommender from '../components/AIVenueRecommender.jsx'

export default function Events({ scrollTo }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="events" style={{ padding: '0', background: 'var(--black2)', position: 'relative', overflow: 'hidden' }} ref={ref}>
      <div className="section-scroll" style={{ position: "relative", zIndex: 1 }}>
      <div className="section-inner">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start', marginBottom: '5rem' }}>
          <div>
            <span className="eyebrow">Events Platform</span>
            <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>A Global Stage<br />for Your Moment</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              400+ events per year. 50,000+ capacity. 1.2M sq ft of event-capable space. MOA is one of the most proven event platforms in North America.
            </p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {[['400+', 'Events/Year'], ['50K+', 'Peak Capacity'], ['1.2M', 'Sq Ft Available']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold)' }}>{val}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => scrollTo('action')} className="btn-gold">Book Your Event →</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(201,168,76,0.15)' }}>
            {MOA.events.highlights.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.08 }}
                style={{ background: 'var(--black2)', padding: '1.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{h.title}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>{h.scale}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>{h.year}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI-Generated Concert Render */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          style={{ marginBottom: '4rem' }}>
          <ImageSlider images={[concertImg, concertImg2]} height={340} position="center"
            label="The Rotunda Stage"
            sublabel="50,000+ CAPACITY · 400+ EVENTS ANNUALLY · GLOBAL PLATFORM" />
        </motion.div>

        {/* Event types */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
          <span className="eyebrow" style={{ marginBottom: '2rem', display: 'block' }}>Event Categories</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '5rem' }}>
            {MOA.events.types.map((type, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5 + i * 0.05 }}
                style={{ padding: '0.6rem 1.4rem', border: '1px solid rgba(201,168,76,0.25)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', background: 'rgba(201,168,76,0.04)', textTransform: 'uppercase' }}>
                {type}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Venue detail */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          style={{ padding: '4rem', background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02))', border: '1px solid rgba(201,168,76,0.2)', marginBottom: '0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: '1.5rem', display: 'block' }}>Performing Arts & Venues</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '1rem' }}>Built for the Spotlight</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                The Rotunda Stage handles full concert productions. Private event suites for corporate briefings. The entire common area network transforms for brand activations.
              </p>
            </div>
            <div>
              <span className="eyebrow" style={{ marginBottom: '1.5rem', display: 'block' }}>Expo & Convention</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '1rem' }}>Scale Without Limits</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Convention-grade floor space, dedicated loading bays, in-house AV production, and a built-in audience of 40M annual visitors.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Event Calendar */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}>
          <EventCalendar />
        </motion.div>

        {/* AI Venue Recommender */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}>
          <AIVenueRecommender />
        </motion.div>
      </div>
      </div>
    </section>
  )
}
