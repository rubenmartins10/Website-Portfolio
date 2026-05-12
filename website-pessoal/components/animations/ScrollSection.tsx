'use client'
import { useRef, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function ScrollSection({ children, className = '', delay = 0 }: ScrollSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
