"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Play, Trophy, RefreshCcw } from 'lucide-react'

export default function HabitLoop() {
  const steps = [
    { icon: Bell, label: 'Cue', color: '#60a5fa', pos: 'top' },
    { icon: Play, label: 'Action', color: '#a78bfa', pos: 'right' },
    { icon: Trophy, label: 'Reward', color: '#34d399', pos: 'bottom' },
    { icon: RefreshCcw, label: 'Routine', color: '#facc15', pos: 'left' }
  ]

  return (
    <div className="relative w-full aspect-square max-w-[280px] mx-auto py-10">
      {/* Central Connector Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-40 h-40 rounded-full border border-dashed border-white/10"
        />
      </div>

      {/* Orbiting Steps */}
      <div className="absolute inset-0">
        {steps.map((step, i) => {
          const rotation = i * 90
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.3 + 0.5, type: "spring" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ transform: `rotate(${rotation}deg) translateY(-80px) rotate(-${rotation}deg)` }}
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-14 h-14 rounded-2xl bg-[#0A0A0A] border border-white/10 flex flex-col items-center justify-center gap-1 shadow-2xl"
              >
                <step.icon className="w-5 h-5" style={{ color: step.color }} />
                <span className="text-[8px] font-black uppercase tracking-tighter text-white/40">{step.label}</span>
              </motion.div>
              
              {/* Connecting Pulse Line */}
              <motion.div 
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-white/20 origin-top"
                style={{ transform: `rotate(${rotation}deg) translateY(40px)` }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Core Energy */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-12 h-12 rounded-full bg-blue-500/20 blur-xl"
        />
        <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
      </div>
    </div>
  )
}
