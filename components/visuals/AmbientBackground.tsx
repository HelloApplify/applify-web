"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {/* Deep Blue Smooth Pulse */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%]"
        style={{
          background: 'radial-gradient(circle at center, rgba(30, 58, 138, 0.2) 0%, transparent 70%)'
        }}
      />
      
      {/* Emerald Smooth Float */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%]"
        style={{
          background: 'radial-gradient(circle at center, rgba(6, 78, 59, 0.1) 0%, transparent 70%)'
        }}
      />

      {/* Floating Dust Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5
            }}
            animate={{
              y: [null, "-20%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
          />
        ))}
      </div>
    </div>
  )
}
