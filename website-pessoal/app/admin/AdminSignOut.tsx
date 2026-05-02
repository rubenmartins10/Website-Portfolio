'use client'
import { signOut } from "next-auth/react"

export default function AdminSignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-xs text-zinc-600 hover:text-red-400 transition-colors"
    >
      Sair
    </button>
  )
}
