import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts'

const AGE_DATA = [
  { name: '18–24', value: 14, fill: '#C9A84C' },
  { name: '25–34', value: 24, fill: '#E8C96A' },
  { name: '35–44', value: 22, fill: '#A08030' },
  { name: '45–54', value: 18, fill: '#7A6020' },
  { name: '55+', value: 22, fill: '#5A4A18' },
]

const INCOME_DATA = [
  { bracket: '<$50K', visitors: 18 },
  { bracket: '$50–75K', visitors: 26 },
  { bracket: '$75–100K', visitors: 28 },
  { bracket: '$100–150K', visitors: 18 },
  { bracket: '$150K+', visitors: 10 },
]

const ORIGIN_DATA = [
  { region: 'Minnesota', pct: 42 },
  { region: 'Midwest', pct: 28 },
  { region: 'Other US', pct: 19 },
  { region: 'International', pct: 11 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'rgba(8,8,8,0.95)', border: '1px solid rgba(201,168,76,0.3)', padding: '0.75rem 1rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold)', marginBottom: '0.25rem' }}>{label || payload[0].name}</div>
        <div style={{ fontSize: '1rem', fontWeight: 500 }}>{payload[0].value}{payload[0].name !== 'visitors' ? '%' : '%'}</div>
      </div>
    )
  }
  return null
}

export default function DemoCharts() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={ref} style={{ marginTop: '5rem' }}>
      <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>Visitor Analytics</span>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Know Your Audience</h3>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginBottom: '3rem', maxWidth: '560px' }}>
        40 million annual visitors with qualified purchasing power. Real data. Real decisions.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: 'rgba(201,168,76,0.15)' }}>

        {/* Age donut */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{ background: 'var(--black)', padding: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Age Breakdown</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={AGE_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={75}
                dataKey="value" strokeWidth={0} animationBegin={inView ? 0 : 99999} animationDuration={1200}>
                {AGE_DATA.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            {AGE_DATA.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: d.fill, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)' }}>{d.name}: {d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Income bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          style={{ background: 'var(--black)', padding: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Household Income</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={INCOME_DATA} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="bracket" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 8, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 8 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(201,168,76,0.05)' }} />
              <Bar dataKey="visitors" fill="#C9A84C" radius={[2, 2, 0, 0]}
                isAnimationActive={inView} animationDuration={1200} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', marginTop: '1rem' }}>
            56% earn $75K+ annually
          </div>
        </motion.div>

        {/* Origin bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          style={{ background: 'var(--black)', padding: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Visitor Origin</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            {ORIGIN_DATA.map((d, i) => (
              <motion.div key={d.region}
                initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)' }}>{d.region}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold)' }}>{d.pct}%</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }} animate={inView ? { width: `${d.pct}%` } : {}}
                    transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                    style={{ height: '100%', background: `rgba(201,168,76,${0.4 + i * 0.15})`, borderRadius: '2px' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', marginTop: '1.5rem' }}>
            11M+ international visitors annually
          </div>
        </motion.div>

      </div>
    </div>
  )
}
