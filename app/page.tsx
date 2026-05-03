"use client"
import React from 'react'
import { ArrowRight, ChevronRight, Lock, BookOpen, Layers, Target, Shield } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ApplifyLogo } from '@/components/ApplifyLogo'

export default function LandingPage() {
  const library = [
    { title: 'Atomic Habits', author: 'James Clear', status: 'Available', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { title: 'Deep Work', author: 'Cal Newport', status: 'Arriving Friday', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { title: 'The 48 Laws of Power', author: 'Robert Greene', status: 'In Research', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { title: 'Can\'t Hurt Me', author: 'David Goggins', status: 'Coming Soon', color: 'text-neutral-400', bg: 'bg-white/5', border: 'border-white/10' },
  ]

  return (
    <main className="min-h-screen bg-[#000000] text-[#EDEDED] selection:bg-emerald-500/30 font-sans overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 flex justify-center pointer-events-none">
        <div className="absolute top-[-20%] w-[1000px] h-[600px] bg-gradient-to-b from-white/[0.04] to-transparent rounded-[100%] blur-3xl mix-blend-screen" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-black/40 backdrop-blur-xl">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <ApplifyLogo className="text-white w-8 h-8" />
            <span className="text-xl font-medium tracking-tight text-white">Applify</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login?mode=signin" className="hidden sm:block text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/login?mode=signup" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 px-6 flex flex-col items-center justify-center min-h-[90vh]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          {/* Top Badge */}
          <Link href="#vault" className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-xs font-medium text-neutral-300">
            <span>Introducing the Protocol Vault</span>
            <span className="w-px h-3 bg-white/[0.2]" />
            <span className="text-white flex items-center">Explore <ChevronRight className="w-3 h-3 ml-1" /></span>
          </Link>

          <h1 className="text-6xl md:text-8xl font-medium text-white tracking-tighter mb-6 leading-[1.05]">
            Read Less.<br />
            <span className="text-neutral-500">Execute More.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
            World-class insights, compressed into interactive action protocols. Stop reading for entertainment and start building for results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <Link href="/login?mode=signup" className="w-full sm:w-auto bg-white text-black flex items-center justify-center gap-2 text-sm px-6 py-3 rounded-full font-medium hover:bg-neutral-200 transition-colors">
              Start your journey
            </Link>
            <Link href="/login?mode=signin" className="w-full sm:w-auto bg-[#111111] text-white border border-white/[0.1] flex items-center justify-center gap-2 text-sm px-6 py-3 rounded-full font-medium hover:bg-[#1A1A1A] transition-colors">
              View Documentation
            </Link>
          </div>
        </motion.div>

        {/* Hero Interactive Element Placeholder (like the Supabase cube or Resend cards) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto mt-24 relative"
        >
          <div className="aspect-[21/9] rounded-2xl border border-white/[0.1] bg-[#0A0A0A] relative overflow-hidden shadow-2xl flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent opacity-50" />
             <div className="absolute inset-0 flex items-center justify-center">
                {/* Abstract graphic representing protocols */}
                <div className="flex gap-4 items-end">
                  {[40, 70, 100, 60, 85].map((height, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                      className="w-12 bg-gradient-to-t from-white/[0.05] to-white/[0.2] border border-white/[0.1] border-b-0 rounded-t-lg backdrop-blur-sm"
                    />
                  ))}
                </div>
             </div>
             
             {/* Floating UI Elements */}
             <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 hidden md:flex bg-[#111] border border-white/[0.1] rounded-xl p-4 shadow-2xl items-center gap-3"
             >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Target className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Habit Installed</div>
                  <div className="text-xs text-neutral-500">Atomic Protocol Active</div>
                </div>
             </motion.div>

             <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 hidden md:flex bg-[#111] border border-white/[0.1] rounded-xl p-4 shadow-2xl items-center gap-3"
             >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Focus Secured</div>
                  <div className="text-xs text-neutral-500">Deep Work Initiated</div>
                </div>
             </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid / Features */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto border-t border-white/[0.05]">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight">An entire framework<br/>in a single platform.</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">Every capability you need to execute world-class insights seamlessly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 bg-[#0A0A0A] border border-white/[0.1] rounded-3xl p-8 hover:border-white/[0.2] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors" />
            <Layers className="w-8 h-8 text-white mb-6" />
            <h3 className="text-2xl font-medium text-white mb-3">Interactive Protocols</h3>
            <p className="text-neutral-400 max-w-md">Transform static books into actionable workflows. Complete nodes, track streaks, and build real-world momentum.</p>
          </div>
          
          <div className="col-span-1 bg-[#0A0A0A] border border-white/[0.1] rounded-3xl p-8 hover:border-white/[0.2] transition-colors relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors" />
             <Target className="w-8 h-8 text-white mb-6" />
             <h3 className="text-2xl font-medium text-white mb-3">Mastery Tracking</h3>
             <p className="text-neutral-400">Your Habit Stability Index measures absolute consistency.</p>
          </div>
        </div>
      </section>

      {/* The Protocol Vault */}
      <section id="vault" className="relative z-10 py-32 px-6 max-w-7xl mx-auto border-t border-white/[0.05]">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-4 tracking-tight">The Protocol Vault</h2>
          <p className="text-lg text-neutral-400">Select a system to begin your transformation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {library.map((book, i) => (
            <motion.div 
              key={book.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group cursor-pointer border ${book.border} rounded-3xl p-2 hover:bg-white/[0.02] transition-colors flex flex-col bg-[#0A0A0A]`}
            >
              <div className={`h-48 ${book.bg} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                <BookOpen className={`w-12 h-12 ${book.color} opacity-50 group-hover:scale-110 transition-transform duration-700 ease-out`} />
                {book.status !== 'Available' && (
                  <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-[#111] px-3 py-1.5 rounded-full border border-white/[0.1] flex items-center gap-1.5 shadow-xl">
                      <Lock className="w-3 h-3 text-neutral-400" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-300">{book.status}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-medium text-white mb-1">{book.title}</h3>
                <p className="text-sm text-neutral-500 mb-6">{book.author}</p>
                <div className="mt-auto pt-4 border-t border-white/[0.05] flex justify-between items-center">
                  <span className="text-sm font-medium text-white">{book.status === 'Available' ? 'Start Protocol' : 'Locked'}</span>
                  <div className={`p-1.5 rounded-full transition-all ${book.status === 'Available' ? 'bg-white text-black group-hover:bg-neutral-200' : 'bg-[#111] border border-white/[0.05] text-neutral-600'}`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/[0.05] bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ApplifyLogo className="text-white w-5 h-5" />
            <span className="text-sm font-medium tracking-tight text-white">Applify</span>
          </div>
          <div className="flex gap-6 text-sm text-neutral-500">
            <Link href="#" className="hover:text-white transition-colors">Features</Link>
            <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-white transition-colors">Legal</Link>
          </div>
          <p className="text-sm text-neutral-600">© 2026 Applify Inc.</p>
        </div>
      </footer>
    </main>
  )
}