"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Music, Brain } from 'lucide-react'

export default function BrainEncoder() {
  const pathways = [
    { icon: Eye, label: 'Visual', sub: 'Pictures & imagery', color: '#818cf8', delay: 0.4 },
    { icon: Music, label: 'Auditory', sub: 'Sound & rhythm', color: '#f472b6', delay: 0.9 },
    { icon: Brain, label: 'Semantic', sub: 'Meaning & connections', color: '#34d399', delay: 1.4, star: true }
  ]

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <motion.div 
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20"
      >
        <Brain className="w-8 h-8 text-white" />
      </motion.div>
      <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.2 }}
        className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent origin-top" />
      <div className="w-full flex flex-col gap-3 max-w-xs mx-auto">
        {pathways.map((p) => (
          <motion.div key={p.label}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: p.delay, duration: 0.4 }}
            className={`flex items-center gap-3 p-3 rounded-xl border ${
              p.star ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" 
              style={{ backgroundColor: `${p.color}20` }}>
              <p.icon className="w-5 h-5" style={{ color: p.color }} />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-white text-sm">{p.label}</div>
              <div className="text-white/40 text-xs">{p.sub}</div>
            </div>
            {p.star && (
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
                className="ml-auto shrink-0 bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                3x
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
