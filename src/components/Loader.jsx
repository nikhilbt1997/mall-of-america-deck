import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 1400)
    const t3 = setTimeout(() => { onComplete() }, 2400)
    return () => [t1,t2,t3].forEach(clearTimeout)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#080808',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2rem',
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: phase >= 0 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500, letterSpacing: '0.1em', color: '#fff' }}>
          MALL OF AMERICA
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--gold)', marginTop: '0.5rem', textTransform: 'uppercase' }}>
          Partner Experience
        </div>
      </motion.div>

      {/* Gold sweep line */}
      <div style={{ position: 'relative', width: '200px', height: '1px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: phase >= 1 ? '100%' : '-100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
        />
      </div>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}
      >
        Loading Partner Experience
      </motion.div>
    </motion.div>
  )
}
