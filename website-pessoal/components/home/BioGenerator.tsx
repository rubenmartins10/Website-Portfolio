'use client'
import { useState, useEffect, useCallback } from 'react'

const BIOS = [
  'Computer Engineering finalist in Porto, Portugal. Production experience delivering a full-stack SaaS platform for a real client — 60% faster stock management. Specializing in AI, ML & Full-Stack development.',
  'Builder of production-grade software that solves real problems. From clinical management systems with barcode scanners to distributed evidence auditing — I ship code that matters. Python · React · Node.js · PostgreSQL.',
  'Passionate about the intersection of Data Science and Software Engineering. IBM & Coursera certified in AI/ML, with hands-on experience building end-to-end pipelines from data collection to model deployment.',
]

export default function BioGenerator() {
  const [bioIndex, setBioIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const typeText = useCallback((text: string) => {
    setIsTyping(true)
    setDisplayedText('')
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayedText(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 18)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const cleanup = typeText(BIOS[bioIndex])
    return cleanup
  }, [bioIndex, typeText])

  const generateNew = () => {
    if (isTyping) return
    setBioIndex((prev) => (prev + 1) % BIOS.length)
  }

  return (
    <div
      className="w-full max-w-xl lg:max-w-2xl rounded-xl text-left overflow-hidden"
      style={{
        background: 'rgba(10,10,15,0.8)',
        border: '1px solid rgba(52,211,153,0.12)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* macOS traffic lights + label */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
        <span className="ml-2 font-mono text-zinc-500 text-[10px] tracking-[0.2em]">
          NEURAL_CORE // BIO_GENERATOR
        </span>
      </div>

      {/* Bio content */}
      <div className="px-5 py-4">
        <p className="text-zinc-300 text-sm leading-relaxed font-mono min-h-[80px]">
          <span className="text-emerald-400 mr-1">&gt;</span>
          {displayedText}
          <span
            className={`inline-block w-[2px] h-4 bg-emerald-400 ml-0.5 align-middle ${
              isTyping ? 'animate-pulse' : 'animate-terminal-blink'
            }`}
          />
        </p>

        {/* Generate button */}
        <button
          onClick={generateNew}
          disabled={isTyping}
          className={`mt-4 flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase px-4 py-2 rounded-lg transition-all duration-300 ${
            isTyping
              ? 'text-zinc-600 border border-zinc-800 cursor-not-allowed'
              : 'text-emerald-400 border border-emerald-400/30 bg-emerald-400/5 hover:bg-emerald-400/10 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]'
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 ${isTyping ? '' : 'animate-spin-slow'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
            />
          </svg>
          GENERATE NEW BIO
        </button>
      </div>
    </div>
  )
}
