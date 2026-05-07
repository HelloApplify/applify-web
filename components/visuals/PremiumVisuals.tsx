"use client"
import React from 'react'
import { motion } from 'framer-motion'

// 1. Quantum Glow (High-end ambient particles)
export const QuantumGlow = () => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12 + i * 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute inset-0 rounded-[4rem] blur-[60px] ${
          i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-indigo-500' : 'bg-emerald-500'
        }`}
      />
    ))}
    <motion.div
      animate={{
        scale: [0.95, 1.05, 0.95],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative z-10 w-32 h-32 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-emerald-500/10" />
      <motion.div 
        animate={{ y: [0, -100] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]"
      />
    </motion.div>
  </div>
)

// 2. The Monolith (Sleek geometric focus)
export const Monolith = () => (
  <div className="relative w-64 h-80 flex items-center justify-center">
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotateX: [45, 50, 45],
        rotateY: [10, 20, 10],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ perspective: 1000 }}
      className="w-32 h-48 bg-gradient-to-b from-white/20 to-white/5 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-xl relative"
    >
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-blue-500/20 to-transparent rounded-t-2xl" />
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-px bg-blue-400/40 shadow-[0_0_15px_rgba(96,165,250,0.5)]"
        />
      </div>
    </motion.div>
    <motion.div 
      animate={{ opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute bottom-4 w-40 h-8 bg-blue-500/20 blur-2xl rounded-full"
    />
  </div>
)

// 3. Neural Weave (Clean line animation)
export const NeuralWeave = () => (
  <div className="relative w-64 h-64">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
          <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[...Array(6)].map((_, i) => (
        <motion.path
          key={i}
          d={`M ${10 + i * 15} 0 Q ${50 + (i % 2 === 0 ? 20 : -20)} 50 ${10 + i * 15} 100`}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="0.5"
          animate={{
            d: [
              `M ${10 + i * 15} 0 Q ${50 + (i % 2 === 0 ? 20 : -20)} 50 ${10 + i * 15} 100`,
              `M ${10 + i * 15} 0 Q ${50 + (i % 2 === 0 ? -20 : 20)} 50 ${10 + i * 15} 100`,
              `M ${10 + i * 15} 0 Q ${50 + (i % 2 === 0 ? 20 : -20)} 50 ${10 + i * 15} 100`,
            ]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-md flex items-center justify-center"
      >
        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60A5FA]" />
      </motion.div>
    </div>
  </div>
)
