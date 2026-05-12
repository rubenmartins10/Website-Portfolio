'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import CustomCursor from '../animations/CustomCursor'
import GreenTrail from '../animations/GreenTrail'
import LoadingScreen from '../home/LoadingScreen'

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isKeystatic = pathname.startsWith('/keystatic') || pathname.startsWith('/api/keystatic')

  return (
    <>
      {!isKeystatic && <LoadingScreen />}
      {!isKeystatic && <CustomCursor />}
      {!isKeystatic && <GreenTrail />}
      {!isKeystatic && <Navbar />}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </>
  )
}
