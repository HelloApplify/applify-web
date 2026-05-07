"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ForgettingCurve() {
  const [showFix, setShowFix] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShowFix(true), 2500); return () => clearTimeout(t) }, [])

  const markers = [
    { label: '20 min', pct: '60%', x: 22 },
    { label: '1 day', pct: '30%', x: 40 },
    { label: '1 week', pct: '10%', x: 65 },
    { label: '1 month', pct: '5%', x: 88 },
  ]

  return (
    <div className="flex flex-col items-center gap-4 py-2 w-full max-w-sm mx-auto">
      <div className="w-full bg-white/5 rounded-2xl border border-white/10 p-4 relative overflow-hidden">
        <div className="text-[10px] font-black uppercase tracking-widest text-red-400/60 mb-3">Without Review</div>
        <div className="relative h-28">
          <div className="flex items-end justify-between h-full gap-1.5">
            {markers.map((m, i) => (
              <motion.div key={m.label} className="flex-1 flex flex-col items-center gap-1"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.4, duration: 0.4 }}>
                <span className="text-red-400 font-black text-xs">{m.pct}</span>
                <motion.div className="w-full rounded-t-lg bg-red-500/30 border border-red-500/20"
                  initial={{ height: 0 }}
                  animate={{ height: `${parseInt(m.pct)}%` }}
                  transition={{ delay: 0.3 + i * 0.4, duration: 0.6, ease: "easeOut" }}
                  style={{ minHeight: 8 }}
                />
                <span className="text-white/30 text-[9px] font-bold">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {showFix && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="w-full bg-emerald-500/5 rounded-2xl border border-emerald-500/20 p-4">
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60 mb-3">With Spaced Review</div>
          <div className="relative h-28">
            <div className="flex items-end justify-between h-full gap-1.5">
              {['95%', '90%', '85%', '80%'].map((pct, i) => (
                <motion.div key={i} className="flex-1 flex flex-col items-center gap-1"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.3 }}>
                  <span className="text-emerald-400 font-black text-xs">{pct}</span>
                  <motion.div className="w-full rounded-t-lg bg-emerald-500/30 border border-emerald-500/20"
                    initial={{ height: 0 }}
                    animate={{ height: `${parseInt(pct)}%` }}
                    transition={{ delay: 0.2 + i * 0.3, duration: 0.6 }}
                    style={{ minHeight: 8 }}
                  />
                  <span className="text-white/30 text-[9px] font-bold">{markers[i].label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
