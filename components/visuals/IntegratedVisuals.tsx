"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, Target, Sparkles, HelpCircle } from 'lucide-react'

interface IntegratedProps {
  title: string
  content?: string
  children?: React.ReactNode
}

// 1. The Neural Spotlight (For Content/Narration)
// Text is revealed by a sweeping neural beam
export const NeuralSpotlight = ({ title, content }: IntegratedProps) => (
  <div className="relative w-full py-20 flex flex-col items-center">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div 
        animate={{ 
          x: [-200, 200, -200],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="w-96 h-96 bg-blue-500 blur-[100px] rounded-full"
      />
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 text-center max-w-2xl px-6"
    >
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">
          {title}
        </h2>
      </motion.div>
      <p className="text-xl text-white/60 font-medium leading-relaxed">
        {content}
      </p>
    </motion.div>
    
    <div className="mt-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-32 h-32 border border-dashed border-white/10 rounded-full flex items-center justify-center"
      >
        <Brain className="w-12 h-12 text-blue-400 opacity-50" strokeWidth={1} />
      </motion.div>
    </div>
  </div>
)

// 2. The Data Prism (For Quizzes/Polls)
// Options float inside a geometric prism
export const DataPrism = ({ title, children }: IntegratedProps) => (
  <div className="relative w-full py-12">
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div 
        animate={{ 
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="w-[500px] h-[500px] border border-white/5 rounded-[4rem] rotate-45"
      />
    </div>
    
    <div className="relative z-10 max-w-2xl mx-auto px-6">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-black text-white uppercase italic tracking-widest mb-2 opacity-40">Verification Phase</h2>
        <h3 className="text-3xl font-black text-white leading-tight">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  </div>
)

// 3. The Mind Fortress (For Reflections)
// Textarea is inside a "Secure Thought" field
export const MindFortress = ({ title, content, children }: IntegratedProps) => (
  <div className="relative w-full py-12 flex flex-col items-center">
    <div className="absolute top-0 w-full flex justify-center opacity-20">
      <motion.div 
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
          scale: [0.8, 1, 0.8]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Target className="w-64 h-64 text-emerald-500" strokeWidth={0.5} />
      </motion.div>
    </div>
    
    <div className="relative z-10 w-full max-w-3xl px-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-white mb-4 uppercase italic tracking-tighter">{title}</h2>
        <p className="text-lg text-white/50 font-medium max-w-xl mx-auto">{content}</p>
      </div>
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl"
      >
        {children}
      </motion.div>
    </div>
  </div>
)

// 4. The Growth Matrix (For Celebrations)
export const GrowthMatrix = ({ title, content, children }: IntegratedProps) => (
  <div className="relative w-full py-20 flex flex-col items-center overflow-hidden">
    <div className="absolute inset-0">
       {[...Array(6)].map((_, i) => (
         <motion.div 
           key={i}
           animate={{ 
             y: [-20, 20, -20],
             opacity: [0.1, 0.3, 0.1]
           }}
           transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
           className="absolute w-full h-px bg-emerald-500/20"
           style={{ top: `${i * 20}%` }}
         />
       ))}
    </div>
    
    <div className="relative z-10 text-center max-w-3xl px-6">
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Sparkles className="w-20 h-20 text-emerald-400 mx-auto mb-8" />
        <h2 className="text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">{title}</h2>
        <p className="text-xl text-white/60 font-medium leading-relaxed mb-12">{content}</p>
      </motion.div>
      
      {children}
    </div>
  </div>
)
