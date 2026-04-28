import React from 'react'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 bg-blue-600 rounded-2xl mb-8 flex items-center justify-center shadow-xl">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
      <h1 className="text-7xl font-black text-black tracking-tighter mb-4">APPLIFY <span className="text-blue-600">V3</span></h1>
      <p className="text-xl text-gray-500 max-w-md mx-auto">
        Deep Reset active. Deployment pipeline stabilization in progress. 
        Once this builds, we restore the Vault.
      </p>
      <div className="mt-12 flex gap-4">
        <div className="px-4 py-2 bg-gray-100 rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest">Pipeline: Testing</div>
        <div className="px-4 py-2 bg-green-100 rounded-full text-xs font-bold text-green-600 uppercase tracking-widest">Environment: Vercel</div>
      </div>
    </main>
  )
}
