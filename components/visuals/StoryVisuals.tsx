"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Lock, Zap, Eraser, Sparkles, AlertTriangle } from 'lucide-react'

// 1. Brain Trapped in a Box (The Illusion of Competence)
export const BrainBox = () => (
  <div className="relative w-48 h-48 flex items-center justify-center">
    <motion.div 
      animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="relative z-10"
    >
      <Brain className="w-20 h-20 text-blue-400 opacity-80" />
    </motion.div>
    
    {/* The Box */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 border-2 border-white/20 rounded-3xl"
    />
    
    {/* The Bars/Lock */}
    <div className="absolute inset-0 flex items-center justify-center">
       {[...Array(4)].map((_, i) => (
         <motion.div 
           key={i}
           animate={{ height: ["0%", "100%", "0%"] }}
           transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
           className="w-1 bg-white/10 mx-4 rounded-full"
         />
       ))}
    </div>
    
    <motion.div 
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute -top-4 bg-red-500/20 border border-red-500/40 p-2 rounded-xl"
    >
      <Lock className="w-4 h-4 text-red-400" />
    </motion.div>
  </div>
)

// 2. Neural Growth (Active Recall / Connection Building)
export const NeuralGrowth = () => (
  <div className="relative w-64 h-64">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x2 = 50 + Math.cos(angle) * 35
        const y2 = 50 + Math.sin(angle) * 35
        return (
          <motion.line
            key={i}
            x1="50" y1="50" x2={x2} y2={y2}
            stroke="rgba(59,130,246,0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
        )
      })}
      <motion.circle 
        cx="50" cy="50" r="5" 
        fill="#3b82f6" 
        animate={{ r: [5, 7, 5] }} 
        transition={{ duration: 2, repeat: Infinity }} 
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
    </div>
  </div>
)

// 3. The Eraser (The Forgetting Curve)
export const MemoryEraser = () => (
  <div className="relative w-64 h-32 flex items-center justify-center">
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative">
      <motion.div 
        animate={{ width: ["100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="h-full bg-blue-500"
      />
    </div>
    <motion.div 
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center">
        <Eraser className="w-6 h-6 text-white" />
      </div>
    </motion.div>
  </div>
)

// 4. Information Trap (Misleading Familiarity)
export const InfoTrap = () => (
  <div className="relative w-48 h-48 flex items-center justify-center">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 border border-dashed border-red-500/20 rounded-full"
    />
    <AlertTriangle className="w-16 h-16 text-yellow-500 animate-bounce" />
    <motion.div 
      animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute inset-0 bg-yellow-500/10 blur-3xl rounded-full"
    />
  </div>
)

// 5. Breakthrough (The Lightbulb)
export const Breakthrough = () => (
  <div className="relative w-48 h-48 flex items-center justify-center">
    <motion.div 
      animate={{ 
        y: [0, -10, 0],
        filter: ["drop-shadow(0 0 0px #fbbf24)", "drop-shadow(0 0 20px #fbbf24)", "drop-shadow(0 0 0px #fbbf24)"]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <Sparkles className="w-24 h-24 text-yellow-400 fill-current" />
    </motion.div>
    <motion.div 
      animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute w-32 h-32 border border-yellow-400/30 rounded-full"
    />
  </div>
)

// 6. The Waves (Spaced Repetition Schedule)
export const SpacedWaves = () => (
  <div className="relative w-64 h-32 flex items-center justify-center gap-4">
    {[1, 3, 7, 30].map((day, i) => (
      <motion.div 
        key={day}
        initial={{ height: 0 }}
        animate={{ height: 20 + (i * 20) }}
        transition={{ duration: 1, delay: i * 0.3 }}
        className="w-8 bg-blue-500/20 border border-blue-500/40 rounded-t-lg flex flex-col items-center justify-end pb-2"
      >
        <span className="text-[8px] font-black text-blue-400">D{day}</span>
      </motion.div>
    ))}
  </div>
)

// 7. Simplicity (The Child's Perspective)
export const Simplicity = () => (
  <div className="relative w-48 h-48 flex items-center justify-center">
    <motion.div 
      animate={{ scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="w-32 h-32 rounded-full border-4 border-emerald-500/20 flex items-center justify-center"
    >
      <div className="text-4xl">👶</div>
    </motion.div>
    <motion.div 
      animate={{ rotate: -360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 border border-dashed border-emerald-500/30 rounded-full"
    />
  </div>
)
