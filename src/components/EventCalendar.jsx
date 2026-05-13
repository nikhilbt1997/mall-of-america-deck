import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EVENTS = {
  '2026-01': [
    { day: 5, type: 'Concert', name: 'New Year Kickoff Concert', venue: 'Rotunda Stage', capacity: '5,000' },
    { day: 12, type: 'Brand Activation', name: 'Winter Fashion Launch', venue: 'East Broadway', capacity: '2,000' },
    { day: 20, type: 'Corporate', name: 'Twin Cities Business Summit', venue: 'Event Center', capacity: '1,200' },
    { day: 28, type: 'Family', name: 'LEGO Masters Experience', venue: 'North Garden', capacity: '3,500' },
  ],
  '2026-02': [
    { day: 7, type: 'Concert', name: "Valentine's Music Festival", venue: 'Rotunda Stage', capacity: '5,000' },
    { day: 14, type: 'Brand Activation', name: 'Luxury Brand Valentine Pop-Up', venue: 'Luxury Wing', capacity: '800' },
    { day: 21, type: 'ESports', name: 'Twin Cities Gaming Championship', venue: 'Event Center', capacity: '4,000' },
  ],
  '2026-03': [
    { day: 3, type: 'Auto Show', name: 'Twin Cities Auto Show', venue: 'Full Mall', capacity: '100,000' },
    { day: 15, type: 'Fashion', name: 'Spring Fashion Week', venue: 'Rotunda Stage', capacity: '3,000' },
    { day: 22, type: 'Corporate', name: 'Retail Innovation Summit', venue: 'Event Center', capacity: '1,500' },
    { day: 29, type: 'Concert', name: 'Spring Break Live', venue: 'Rotunda Stage', capacity: '5,000' },
  ],
  '2026-04': [
    { day: 4, type: 'Family', name: 'Easter Eggstravaganza', venue: 'Full Mall', capacity: '20,000' },
    { day: 11, type: 'Brand Activation', name: 'Nike Spring Collection Launch', venue: 'Nike Store', capacity: '1,000' },
    { day: 18, type: 'Concert', name: 'Earth Day Festival', venue: 'North Garden', capacity: '4,000' },
    { day: 25, type: 'Celebrity', name: 'Celebrity Appearance — TBA', venue: 'Rotunda Stage', capacity: '5,000' },
  ],
  '2026-05': [
    { day: 2, type: 'Corporate', name: 'Healthcare Innovation Expo', venue: 'Event Center', capacity: '2,000' },
    { day: 9, type: "Mother's Day", name: "Mother's Day Weekend Brunch", venue: 'Dining Level', capacity: '5,000' },
    { day: 16, type: 'ESports', name: 'Regional Gaming League Finals', venue: 'Event Center', capacity: '4,500' },
    { day: 23, type: 'Concert', name: 'Memorial Day Weekend Bash', venue: 'Rotunda Stage', capacity: '5,000' },
  ],
  '2026-06': [
    { day: 6, type: 'Fashion', name: 'Summer Style Showcase', venue: 'East Broadway', capacity: '2,500' },
    { day: 13, type: 'Brand Activation', name: 'Apple Summer Drop', venue: 'Apple Store', capacity: '1,200' },
    { day: 20, type: 'Family', name: 'Summer Kickoff Carnival', venue: 'Full Mall', capacity: '15,000' },
    { day: 27, type: 'Concert', name: 'Pride Music Festival', venue: 'Rotunda Stage', capacity: '5,000' },
  ],
}

const TYPE_COLORS = {
  'Concert': '#C9A84C',
  'Brand Activation': '#E8C96A',
  'Corporate': '#7A8A9A',
  'Family': '#6A9A7A',
  'ESports': '#8A6AC9',
  'Fashion': '#C96A8A',
  'Celebrity': '#C9A84C',
  'Auto Show': '#A08030',
  "Mother's Day": '#C96A8A',
}

const MONTHS = [
  { key: '2026-01', label: 'January 2026' },
  { key: '2026-02', label: 'February 2026' },
  { key: '2026-03', label: 'March 2026' },
  { key: '2026-04', label: 'April 2026' },
  { key: '2026-05', label: 'May 2026' },
  { key: '2026-06', label: 'June 2026' },
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDaysInMonth(monthKey) {
  const [y, m] = monthKey.split('-').map(Number)
  return new Date(y, m, 0).getDate()
}
function getFirstDay(monthKey) {
  const [y, m] = monthKey.split('-').map(Number)
  return new Date(y, m - 1, 1).getDay()
}

export default function EventCalendar() {
  const [monthIdx, setMonthIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const month = MONTHS[monthIdx]
  const events = EVENTS[month.key] || []
  const daysInMonth = getDaysInMonth(month.key)
  const firstDay = getFirstDay(month.key)
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const getEvent = (day) => events.find(e => e.day === day)

  return (
    <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>Event Calendar</span>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Book Your Date</h3>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginBottom: '2.5rem' }}>
        400+ events annually. Click any highlighted date to see event details.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
        {/* Calendar */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.15)' }}>
          {/* Month nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <button onClick={() => { setMonthIdx(Math.max(0, monthIdx - 1)); setSelected(null) }}
              disabled={monthIdx === 0}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: monthIdx === 0 ? 'rgba(255,255,255,0.2)' : '#fff', padding: '0.4rem 0.9rem', cursor: monthIdx === 0 ? 'default' : 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
              ← PREV
            </button>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold)' }}>{month.label}</span>
            <button onClick={() => { setMonthIdx(Math.min(MONTHS.length - 1, monthIdx + 1)); setSelected(null) }}
              disabled={monthIdx === MONTHS.length - 1}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: monthIdx === MONTHS.length - 1 ? 'rgba(255,255,255,0.2)' : '#fff', padding: '0.4rem 0.9rem', cursor: monthIdx === MONTHS.length - 1 ? 'default' : 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
              NEXT →
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0.75rem 1rem 0' }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', padding: '0.4rem 0' }}>{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', padding: '0.5rem 1rem 1.25rem' }}>
            {/* Empty cells for first day offset */}
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {/* Day cells */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const ev = getEvent(day)
              const isSelected = selected?.day === day && selected?.month === month.key
              return (
                <button key={day} onClick={() => ev && setSelected({ ...ev, month: month.key })}
                  style={{
                    background: isSelected ? 'var(--gold)' : ev ? 'rgba(201,168,76,0.08)' : 'transparent',
                    border: `1px solid ${isSelected ? 'var(--gold)' : ev ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.05)'}`,
                    color: isSelected ? '#080808' : ev ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                    padding: '0.5rem 0.25rem',
                    cursor: ev ? 'pointer' : 'default',
                    fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                    fontWeight: ev ? 600 : 400,
                    textAlign: 'center', position: 'relative',
                    transition: 'all 0.15s',
                    aspectRatio: '1',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px',
                  }}>
                  {day}
                  {ev && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: isSelected ? '#080808' : TYPE_COLORS[ev.type] || 'var(--gold)' }} />}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {Object.entries(TYPE_COLORS).slice(0, 6).map(([type, color]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Event detail panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={`${selected.month}-${selected.day}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                style={{ padding: '2rem', background: 'rgba(201,168,76,0.06)', border: `1px solid rgba(201,168,76,0.25)`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: '1.5rem', width: '40px', height: '2px', background: TYPE_COLORS[selected.type] || 'var(--gold)' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: TYPE_COLORS[selected.type] || 'var(--gold)', letterSpacing: '0.18em', marginBottom: '0.75rem', marginTop: '0.5rem', textTransform: 'uppercase' }}>{selected.type}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '1.25rem', lineHeight: 1.3 }}>{selected.name}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                  {[['Venue', selected.venue], ['Capacity', selected.capacity + ' guests'], ['Date', `${month.label.split(' ')[0]} ${selected.day}, 2026`], ['Status', 'Available for Booking']].map(([label, val]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
                      <span style={{ fontSize: '0.8rem', color: label === 'Status' ? '#6aaa7a' : 'rgba(255,255,255,0.75)', fontWeight: label === 'Status' ? 500 : 300 }}>{val}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollTo('action')} className="btn-gold" style={{ width: '100%', justifyContent: 'center', fontSize: '0.7rem', padding: '0.85rem' }}>
                  Enquire About This Date →
                </button>
              </motion.div>
            ) : (
              <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem', lineHeight: 1.7, textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📅</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(201,168,76,0.4)', marginBottom: '0.75rem' }}>SELECT A DATE</div>
                Click any highlighted date on the calendar to see event details and booking options.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(201,168,76,0.15)' }}>
            {[['400+', 'Annual Events'], ['50K+', 'Peak Capacity'], ['8', 'Venue Types'], ['365', 'Days Available']].map(([val, label]) => (
              <div key={label} style={{ background: 'var(--black2)', padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold)', lineHeight: 1 }}>{val}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginTop: '0.3rem', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
