'use client'
import { useState, useEffect } from 'react'

const STATUS_MESSAGES = [
  'LOADING NEURAL MODULES...',
  'INITIALIZING PORTFOLIO ENGINE...',
  'CONNECTING TO DATA STREAMS...',
  'COMPILING PROJECT ARCHIVES...',
  'SYSTEM READY.',
]

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 35)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) =>
        prev < STATUS_MESSAGES.length - 1 ? prev + 1 : prev
      )
    }, 400)
    return () => clearInterval(msgInterval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setFadeOut(true), 300)
      const removeTimer = setTimeout(() => setVisible(false), 900)
      return () => {
        clearTimeout(timer)
        clearTimeout(removeTimer)
      }
    }
  }, [progress])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-600 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ background: '#030712' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Logo */}
      <div className="font-mono font-bold text-2xl text-white tracking-[0.2em] mb-10 z-10">
        RÚBEN<span className="text-emerald-400">.DEV</span>
      </div>

      {/* Terminal box */}
      <div className="relative z-10 w-[90%] max-w-md">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-t-lg border border-b-0 border-white/10 bg-white/[0.03]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="ml-2 font-mono text-[10px] text-zinc-600 tracking-[0.2em]">
            SYSTEM // INIT
          </span>
        </div>

        {/* Terminal body */}
        <div className="px-5 py-5 rounded-b-lg border border-white/10 bg-white/[0.02]">
          {/* Status messages */}
          <div className="space-y-1 mb-5 min-h-[120px]">
            {STATUS_MESSAGES.slice(0, messageIndex + 1).map((msg, i) => (
              <div
                key={msg}
                className="font-mono text-xs flex items-center gap-2"
                style={{
                  animation: 'fadeIn 0.3s ease forwards',
                }}
              >
                <span className={i <= messageIndex - 1 ? 'text-emerald-400' : 'text-zinc-500'}>
                  {i < messageIndex ? '✓' : '▸'}
                </span>
                <span className={i <= messageIndex - 1 ? 'text-zinc-400' : 'text-zinc-500'}>
                  {msg}
                </span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-mono text-[10px] text-zinc-500 tracking-[0.2em]">
                PROGRESS
              </span>
              <span className="font-mono text-[10px] text-emerald-400 font-bold tabular-nums">
                {progress}%
              </span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-100 ease-linear"
                style={{
                  width: `${progress}%`,
                  boxShadow: '0 0 12px rgba(52,211,153,0.5), 0 0 24px rgba(52,211,153,0.2)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="relative z-10 mt-8 font-mono text-[10px] text-zinc-700 tracking-[0.3em]">
        INITIALIZING PORTFOLIO ENGINE...
      </div>
    </div>
  )
}
