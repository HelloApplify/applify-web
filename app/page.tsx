import React from 'react'
import { ArrowRight, Zap, Search, Lock, PlusCircle, BookOpen, Clock, Target } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const library = [
    { title: 'Atomic Habits', author: 'James Clear', status: 'Available', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { title: 'Deep Work', author: 'Cal Newport', status: 'Arriving Friday', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { title: 'The 48 Laws of Power', author: 'Robert Greene', status: 'In Research', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { title: 'Can\'t Hurt Me', author: 'David Goggins', status: 'Coming Soon', color: 'text-gray-400', bg: 'bg-white/5' },
  ]

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      {/* Background glow similar to login */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Zap className="text-black w-5 h-5 fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">APPLIFY</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login?mode=signin" className="hidden sm:block text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/login?mode=signup" className="text-sm font-bold bg-white text-black px-6 py-2.5 rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Claim Access
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
            Read Less.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Execute More.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            World-class insights, compressed into interactive action protocols. Stop reading for entertainment and start building for results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login?mode=signup" className="w-full sm:w-auto bg-white text-black flex items-center justify-center gap-2 text-lg px-10 py-4 rounded-2xl font-bold shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform">
              Claim Access <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login?mode=signin" className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/10 flex items-center justify-center gap-2 text-lg px-10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">
              Access the Vault
            </Link>
          </div>
        </div>
      </section>

      {/* The Protocol Vault */}
      <section id="vault" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">The Protocol Vault</h2>
            <p className="text-gray-400 font-medium">Select a system to begin your transformation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {library.map((book) => (
            <div key={book.title} className="group cursor-pointer border border-white/10 rounded-3xl p-2 hover:border-blue-500/50 transition-all flex flex-col bg-white/5 backdrop-blur-md">
              <div className={`h-48 ${book.bg} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                <BookOpen className={`w-16 h-16 ${book.color} opacity-30 group-hover:scale-110 transition-transform duration-500`} />
                {book.status !== 'Available' && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-black/80 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">{book.status}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-white mb-1 leading-tight">{book.title}</h3>
                <p className="text-xs text-gray-400 font-medium mb-6">{book.author}</p>
                <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-lg font-bold text-white">{book.status === 'Available' ? '$12.00' : '---'}</span>
                  <div className={`p-2 rounded-xl transition-all ${book.status === 'Available' ? 'bg-white text-black group-hover:scale-110' : 'bg-white/5 text-gray-500'}`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="border-2 border-dashed border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-all cursor-pointer">
            <PlusCircle className="w-12 h-12 text-gray-600 mb-4" />
            <h3 className="font-bold text-white mb-2">Request a Blueprint</h3>
            <p className="text-xs text-gray-400">Tell us what to research next.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
            <Zap className="text-black w-3 h-3 fill-current" />
          </div>
          <span className="text-lg font-black tracking-tighter text-white">APPLIFY</span>
        </div>
        <p className="text-xs text-gray-500 font-medium">© 2026 Applify. Built for execution.</p>
      </footer>
    </main>
  )
}
