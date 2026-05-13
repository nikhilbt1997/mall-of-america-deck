import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'why', label: 'Why MOA' },
  { id: 'retail', label: 'Retail' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'dining', label: 'Dining' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'events', label: 'Events' },
  { id: 'leasing', label: 'Leasing' },
  { id: 'sponsorship', label: 'Sponsorship' },
  { id: 'action', label: 'Connect' },
]

export default function Nav({ active }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60)
      const total = document.body.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.05)', zIndex: 600 }}>
        <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))', width: `${scrollPct}%`, transition: 'width 0.1s ease' }} />
      </div>

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: '2px', left: 0, right: 0, zIndex: 500,
          padding: 'clamp(1rem, 2vw, 1.25rem) clamp(1rem, 3vw, 3rem)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        <button onClick={() => scrollTo('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 500, color: '#fff', letterSpacing: '0.06em' }}>MALL OF AMERICA</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.22em', color: 'var(--gold)', textTransform: 'uppercase' }}>Partner Experience</span>
          </div>
        </button>

        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['why', 'retail', 'entertainment', 'events'].map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: active === id ? 'var(--gold)' : 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}>
              {id === 'why' ? 'Why MOA' : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* Share button */}
          <button onClick={handleShare} style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: copied ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
            padding: '0.55rem 0.9rem', cursor: 'pointer', fontSize: '0.62rem', fontFamily: 'var(--font-mono)',
            letterSpacing: '0.1em', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem'
          }}>
            {copied ? '✓ COPIED' : '⤴ SHARE'}
          </button>
          <button onClick={() => scrollTo('action')} className="btn-gold" style={{ padding: '0.6rem 1.4rem', fontSize: '0.68rem' }}>Connect →</button>
          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.55rem 0.8rem', cursor: 'pointer', letterSpacing: '0.1em', fontSize: '0.68rem', fontFamily: 'var(--font-mono)' }}>
            {open ? 'ESC' : 'MENU'}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '360px', background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(30px)', zIndex: 499, borderLeft: '1px solid rgba(201,168,76,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 3rem' }}
          >
            <span className="eyebrow" style={{ marginBottom: '2rem' }}>Navigate</span>
            {NAV_ITEMS.map((item, i) => (
              <motion.button key={item.id} onClick={() => scrollTo(item.id)}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: active === item.id ? 'var(--gold)' : 'rgba(255,255,255,0.65)', textAlign: 'left', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'color 0.2s' }}
              >{item.label}</motion.button>
            ))}

            {/* Print button in menu */}
            <button onClick={() => window.print()} style={{ marginTop: '2rem', background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', padding: '0.7rem 1rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textAlign: 'left', transition: 'all 0.2s' }}>
              ⎙ EXPORT AS PDF
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
