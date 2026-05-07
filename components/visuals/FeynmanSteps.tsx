"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, MessageSquare, Search, Sparkles } from 'lucide-react'

export default function FeynmanSteps() {
  const steps = [
    { icon: BookOpen, label: 'Pick a concept', desc: 'Choose what you want to learn', color: '#818cf8' },
    { icon: MessageSquare, label: 'Explain it simply', desc: 'Like teaching a 12-year-old', color: '#f472b6' },
    { icon: Search, label: 'Find the gaps', desc: 'Where did you get stuck?', color: '#fbbf24' },
    { icon: Sparkles, label: 'Simplify again', desc: 'Rewrite until it clicks', color: '#34d399' },
  ]
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs mx-auto py-2">
      {steps.map((s, i) => (
        <motion.div key={s.label}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.5, duration: 0.4 }}
          className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${s.color}15` }}>
            <s.icon className="w-5 h-5" style={{ color: s.color }} />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-white text-sm">{i + 1}. {s.label}</div>
            <div className="text-white/40 text-xs">{s.desc}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
