"use client"
import React from 'react'
import Link from 'next/link'
import { PlayCircle, Lock, Target, Clock, Zap, Brain, CheckCircle2, ShieldCheck } from 'lucide-react'
import ProtocolPlayer from '@/components/ProtocolPlayer'
import { useProtocolStore } from '@/store/useProtocolStore'
import { PROTOCOLS } from '@/data/protocols'
import { motion } from 'framer-motion'
import { createClient } from '@/utils/supabase/client'

export default function DashboardPage() {
  const startProtocol = useProtocolStore(state => state.startProtocol)
  const completedProtocols = useProtocolStore(state => state.completedProtocols)

  // Unlock logic: first protocol always unlocked, others unlock sequentially
  const isUnlocked = (idx: number) => {
    if (idx === 0) return true
    const prevProtocol = PROTOCOLS[idx - 1]
    return completedProtocols.includes(prevProtocol.id)
  }

  const isCompleted = (id: string) => completedProtocols.includes(id)

  const [user, setUser] = React.useState<any>(null)
  const supabase = createClient()

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [supabase])

  const isAdmin = user?.email === 'helloapplify@gmail.com'

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <ProtocolPlayer />

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-10 sm:mb-14">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-1.5 tracking-tighter">Protocol Library</h2>
          <p className="text-sm sm:text-base text-neutral-500 font-medium tracking-tight">Select a module to begin.</p>
        </motion.div>
        
        <div className="flex items-center gap-4">
          {isAdmin && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Link href="/admin" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-black text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" /> Admin
              </Link>
            </motion.div>
          )}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-600 p-[1px] shrink-0">
            <div className="w-full h-full bg-[#0A0A0A] rounded-[0.65rem] flex items-center justify-center text-white font-black text-[10px] uppercase">
              JY
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {PROTOCOLS.map((protocol, idx) => {
          const unlocked = isUnlocked(idx)
          const completed = isCompleted(protocol.id)
          const hasContent = protocol.slides.length > 0
          const locked = !unlocked || !hasContent

          return (
            <motion.div key={protocol.id}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`group relative bg-[#0A0A0A] border rounded-2xl sm:rounded-3xl p-5 sm:p-7 transition-all duration-300 overflow-hidden
                ${locked ? 'border-white/5 opacity-50' : completed ? 'border-emerald-500/30' : 'border-white/10 hover:border-blue-500/40'}
              `}>
              {!locked && !completed && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/8 blur-[60px] rounded-full -mr-16 -mt-16" />
              )}

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border
                    ${completed ? 'bg-emerald-500/10 border-emerald-500/20' : locked ? 'bg-white/5 border-white/5' : 'bg-blue-500/10 border-blue-500/20'}`}>
                    {completed ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> :
                     protocol.category === 'Learning Science' ? <Brain className="w-5 h-5 text-blue-400" /> :
                     protocol.category === 'Productivity' ? <Target className="w-5 h-5 text-emerald-400" /> :
                     <Zap className="w-5 h-5 text-yellow-400" />}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/40 text-xs font-bold">
                    <Clock className="w-3 h-3" /> {protocol.duration}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-white mb-2 tracking-tight">{protocol.title}</h3>
                <p className="text-neutral-500 text-xs sm:text-sm font-medium leading-relaxed mb-6 line-clamp-2">{protocol.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Level</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(l => (
                        <div key={l} className={`w-2.5 h-1 rounded-full ${l <= protocol.level ? (completed ? 'bg-emerald-500' : 'bg-blue-500') : 'bg-white/5'}`} />
                      ))}
                    </div>
                  </div>

                  {locked ? (
                    <div className="flex items-center gap-1.5 text-white/20">
                      <Lock className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase tracking-wider">{!hasContent ? 'Coming Soon' : 'Locked'}</span>
                    </div>
                  ) : completed ? (
                    <button onClick={() => startProtocol(protocol)}
                      className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl font-black text-xs border border-emerald-500/20 hover:bg-emerald-500/20 active:scale-95 transition-all">
                      <PlayCircle className="w-3.5 h-3.5" /> Replay
                    </button>
                  ) : (
                    <button onClick={() => startProtocol(protocol)}
                      className="flex items-center gap-1.5 bg-white text-black px-5 py-2.5 rounded-xl font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-lg">
                      <PlayCircle className="w-3.5 h-3.5" /> Start
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
