"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function MemoryDecay() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Central Knowledge Core */}
      <motion.div
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.8, 0.4, 0.8]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 bg-red-500/20 rounded-full blur-xl border border-red-500/30"
      />

      {/* Dissolving Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            opacity: 0,
            scale: 0.5
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
          className="absolute w-2 h-2 bg-red-400 rounded-full blur-[1px]"
        />
      ))}

      {/* Warning Ring */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-48 h-48 border border-dashed border-red-500/20 rounded-full"
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-red-400/40">Data Loss Active</span>
      </div>
    </div>
  )
}
