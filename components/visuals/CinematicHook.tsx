"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Brain, Zap, Target } from 'lucide-react'

interface CinematicHookProps {
  title: string
  subtitle?: string
}

export default function CinematicHook({ title, subtitle }: CinematicHookProps) {
  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[#050505] border border-white/5 shadow-2xl">
      {/* Dynamic Background Particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Floating Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-600/10 blur-[100px] rounded-full"
      />

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0.5 }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6"
        >
          <Brain className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase mb-3"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-white/40 font-bold tracking-widest text-[10px] uppercase"
        >
          {subtitle || "Mission Briefing Initiated"}
        </motion.p>

        {/* Pulse Ring */}
        <motion.div 
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-40 h-40 border border-blue-500/30 rounded-full"
        />
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
    </div>
  )
}
