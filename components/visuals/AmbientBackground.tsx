"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.05, 0.03],
          x: [0, 50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.02, 0.04, 0.02],
          x: [0, -50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-600 rounded-full blur-[150px]"
      />
    </div>
  )
}
