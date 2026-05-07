"use client"
import React from 'react'
import { PlayCircle, Lock, Target, Layers, Clock, Zap, Brain } from 'lucide-react'
import ProtocolPlayer from '@/components/ProtocolPlayer'
import { useProtocolStore } from '@/store/useProtocolStore'
import { PROTOCOLS } from '@/data/protocols'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const startProtocol = useProtocolStore(state => state.startProtocol)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ProtocolPlayer />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">Protocol Library</h2>
        <p className="text-xl text-neutral-500 font-medium tracking-tight">Select a high-velocity module to initiate cognitive recalibration.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROTOCOLS.map((protocol, idx) => {
          const isLocked = protocol.id !== 'proto_applied_cognition';
          
          return (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 transition-all duration-500 overflow-hidden
                ${isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]'}
              `}
            >
              {/* Background Glow */}
              {!isLocked && (
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-blue-500/20 transition-all duration-700" />
              )}

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border
                    ${isLocked ? 'bg-white/5 border-white/5' : 'bg-blue-500/10 border-blue-500/20'}
                  `}>
                    {protocol.category === 'Learning Science' && <Brain className="w-7 h-7 text-blue-400" />}
                    {protocol.category === 'Productivity' && <Target className="w-7 h-7 text-emerald-400" />}
                    {protocol.category === 'Finance' && <Zap className="w-7 h-7 text-yellow-400" />}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Duration</span>
                    <div className="flex items-center gap-1.5 text-white/60 font-bold text-xs uppercase tracking-tight">
                      <Clock className="w-3 h-3" />
                      {protocol.duration}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                  {protocol.title}
                </h3>
                <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-8 h-10 line-clamp-2">
                  {protocol.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Level</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(l => (
                        <div key={l} className={`w-3 h-1 rounded-full ${l <= protocol.level ? 'bg-blue-500' : 'bg-white/5'}`} />
                      ))}
                    </div>
                  </div>

                  {isLocked ? (
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-white/20" />
                    </div>
                  ) : (
                    <button 
                      onClick={() => startProtocol(protocol)}
                      className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                      <PlayCircle className="w-4 h-4" /> Start
                    </button>
                  )}
                </div>
              </div>

              {isLocked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-[#111] border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl">
                    <Lock className="w-3 h-3 text-white/40" />
                    <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Complete Previous Module</span>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
