"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Battery, Zap } from 'lucide-react'

export default function PhoneBattery() {
  return (
    <div className="relative w-64 h-64 flex flex-col items-center justify-center">
      <motion.div
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <Battery className="w-32 h-32 text-blue-400 opacity-20" strokeWidth={1} />
        
        {/* Charging Level */}
        <motion.div
          animate={{
            height: ["10%", "90%", "10%"],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 bg-blue-500/40 rounded-sm blur-[1px]"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="w-12 h-12 text-blue-400" />
        </div>
      </motion.div>

      <div className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400/40">Storage Format Alpha</div>
    </div>
  )
}
