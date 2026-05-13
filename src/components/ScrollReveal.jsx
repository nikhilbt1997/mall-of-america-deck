import { useInView } from 'react-intersection-observer'

export default function ScrollReveal({ children, delay = 0, style = {} }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}
