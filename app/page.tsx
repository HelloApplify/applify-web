import React from 'react'
import { ArrowRight, Zap, Search, Lock, PlusCircle, BookOpen, Clock, Target } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const library = [
    { title: 'Atomic Habits', author: 'James Clear', status: 'Available', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Deep Work', author: 'Cal Newport', status: 'Arriving Friday', color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'The 48 Laws of Power', author: 'Robert Greene', status: 'In Research', color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Can\'t Hurt Me', author: 'David Goggins', status: 'Coming Soon', color: 'text-gray-400', bg: 'bg-gray-50' },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-black">Applify V2</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-400">
          <a href="#vault" className="hover:text-black transition-colors">The Vault</a>
          <a href="#how" className="hover:text-black transition-colors">How it Works</a>
        </div>
        <Link href="/login" className="text-sm font-semibold bg-gray-50 px-5 py-2.5 rounded-full text-black hover:bg-gray-100 transition-all border border-gray-100">
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-8xl font-extrabold text-black tracking-tighter mb-8 leading-[1]">
            Read Less.<br />
            <span className="text-blue-600">Execute More.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            World-class insights, compressed into interactive action protocols. Stop reading for entertainment and start building for results.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#vault" className="bg-blue-600 text-white flex items-center gap-2 text-xl px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all">
              Explore the Vault <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* The Protocol Vault */}
      <section id="vault" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-black mb-2">The Protocol Vault</h2>
            <p className="text-gray-400">Select a system to begin your transformation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {library.map((book) => (
            <div key={book.title} className="group cursor-pointer border border-gray-100 rounded-3xl p-2 hover:border-blue-600/50 transition-all flex flex-col bg-white shadow-sm">
              <div className={`h-48 ${book.bg} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                <BookOpen className={`w-16 h-16 ${book.color} opacity-20 group-hover:scale-110 transition-transform`} />
                {book.status !== 'Available' && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-gray-300" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{book.status}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-black mb-1 leading-tight">{book.title}</h3>
                <p className="text-xs text-gray-400 font-medium mb-6">{book.author}</p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-lg font-bold text-black">{book.status === 'Available' ? '$12.00' : '---'}</span>
                  <div className={`p-2 rounded-lg transition-all ${book.status === 'Available' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-200'}`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="border-2 border-dashed border-gray-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-all cursor-pointer">
            <PlusCircle className="w-12 h-12 text-gray-200 mb-4" />
            <h3 className="font-bold text-black mb-2">Request a Book</h3>
            <p className="text-xs text-gray-400">Tell us what to research next.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-gray-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="text-blue-600 w-6 h-6 fill-current" />
          <span className="text-2xl font-bold tracking-tight text-black uppercase italic">Applify</span>
        </div>
        <p className="text-xs text-gray-200">© 2026 Applify. All rights reserved.</p>
      </footer>
    </main>
  )
}
