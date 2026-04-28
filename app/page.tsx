import React from 'react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-black mb-4">Applify V3</h1>
      <p className="text-xl text-gray-500 mb-8 text-center max-w-md">
        The Action Protocol Engine is coming online. 
        Stabilizing deployment environment...
      </p>
      <Link href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
        Enter the Vault
      </Link>
    </div>
  )
}
