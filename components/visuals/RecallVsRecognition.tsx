"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

export default function RecallVsRecognition() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto py-2">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }} className="flex-1 p-4 bg-red-500/5 rounded-xl border border-red-500/20 text-center">
        <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-red-500/10 flex items-center justify-center">
          <Eye className="w-5 h-5 text-red-400" />
        </div>
        <div className="font-black text-red-400 text-sm mb-1">Recognition</div>
        <div className="text-white/40 text-xs leading-relaxed">&quot;Oh yeah, I&apos;ve seen this before.&quot;</div>
        <motion.div initial={{ width: 0 }} animate={{ width: '30%' }} transition={{ delay: 1, duration: 1 }}
          className="h-1.5 bg-red-500/40 rounded-full mt-3 mx-auto" />
        <div className="text-red-400/60 text-[9px] font-bold mt-1">WEAK</div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }} className="flex-1 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
        <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <EyeOff className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="font-black text-emerald-400 text-sm mb-1">Recall</div>
        <div className="text-white/40 text-xs leading-relaxed">&quot;Let me pull this from memory.&quot;</div>
        <motion.div initial={{ width: 0 }} animate={{ width: '90%' }} transition={{ delay: 1.5, duration: 1 }}
          className="h-1.5 bg-emerald-500/40 rounded-full mt-3 mx-auto" />
        <div className="text-emerald-400/60 text-[9px] font-bold mt-1">STRONG</div>
      </motion.div>
    </div>
  )
}
