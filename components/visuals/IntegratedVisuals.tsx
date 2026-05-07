"use client"
import { motion, useTransform, MotionValue } from 'framer-motion'
import { Brain, Zap, Target, Sparkles, HelpCircle } from 'lucide-react'
import { useMousePosition } from '@/hooks/useMousePosition'

interface IntegratedProps {
  title: string
  content?: string
  children?: React.ReactNode
}

// Sub-component for individual grid lines to avoid hook-in-callback error
const MatrixLine = ({ i, x }: { i: number; x: MotionValue<number> }) => {
  const lineX = useTransform(x, [-0.5, 0.5], [-(i + 1) * 20, (i + 1) * 20])
  return (
    <motion.div 
      animate={{ 
        y: [-20, 20, -20],
        opacity: [0.1, 0.3, 0.1]
      }}
      style={{ x: lineX, top: `${i * 20}%` }}
      transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
      className="absolute w-full h-px bg-emerald-500/20"
    />
  )
}

export const NeuralSpotlight = ({ title, content }: IntegratedProps) => {
  const { x, y } = useMousePosition()
  const mouseX = useTransform(x, [-0.5, 0.5], [-50, 50])
  const mouseY = useTransform(y, [-0.5, 0.5], [-50, 50])
  const textX = useTransform(x, [-0.5, 0.5], [-10, 10])
  const textY = useTransform(y, [-0.5, 0.5], [-10, 10])
  const iconX = useTransform(x, [-0.5, 0.5], [-30, 30])
  const iconY = useTransform(y, [-0.5, 0.5], [-30, 30])

  return (
    <div className="relative w-full py-20 flex flex-col items-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          style={{ x: mouseX, y: mouseY }}
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
          style={{ x: textX, y: textY }}
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
          style={{ x: iconX, y: iconY }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border border-dashed border-white/10 rounded-full flex items-center justify-center"
        >
          <Brain className="w-12 h-12 text-blue-400 opacity-50" strokeWidth={1} />
        </motion.div>
      </div>
    </div>
  )
}

export const DataPrism = ({ title, children }: IntegratedProps) => {
  const { x, y } = useMousePosition()
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10])
  const prismX = useTransform(x, [-0.5, 0.5], [-20, 20])
  const prismY = useTransform(y, [-0.5, 0.5], [-20, 20])

  return (
    <div className="relative w-full py-12">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1]
          }}
          style={{ x: prismX, y: prismY }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-[500px] h-[500px] border border-white/5 rounded-[4rem] rotate-45"
        />
      </div>
      
      <motion.div 
        style={{ perspective: 1000, rotateX, rotateY }}
        className="relative z-10 max-w-2xl mx-auto px-6"
      >
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-widest mb-2 opacity-40">Verification Phase</h2>
          <h3 className="text-3xl font-black text-white leading-tight">{title}</h3>
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export const MindFortress = ({ title, content, children }: IntegratedProps) => {
  const { x, y } = useMousePosition()
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5])
  const targetX = useTransform(x, [-0.5, 0.5], [-30, 30])
  const targetY = useTransform(y, [-0.5, 0.5], [-20, 20])

  return (
    <div className="relative w-full py-12 flex flex-col items-center">
      <div className="absolute top-0 w-full flex justify-center opacity-20">
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1, 0.8]
          }}
          style={{ x: targetX, y: targetY }}
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
          style={{ perspective: 1000, rotateX, rotateY }}
          className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export const GrowthMatrix = ({ title, content, children }: IntegratedProps) => {
  const { x, y } = useMousePosition()
  const mouseX = useTransform(x, [-0.5, 0.5], [-40, 40])
  const mouseY = useTransform(y, [-0.5, 0.5], [-40, 40])

  return (
    <div className="relative w-full py-20 flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0">
         {[...Array(6)].map((_, i) => (
           <MatrixLine key={i} i={i} x={x} />
         ))}
      </div>
      
      <div className="relative z-10 text-center max-w-3xl px-6">
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          style={{ x: mouseX, y: mouseY }}
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
}

// 5. The Quantum Reveal (For Checkpoints/Milestones)
// Text is revealed by a particle field
export const QuantumReveal = ({ title, content, children }: IntegratedProps) => {
  const { x, y } = useMousePosition()
  const mouseX = useTransform(x, [-0.5, 0.5], [-60, 60])
  const mouseY = useTransform(y, [-0.5, 0.5], [-60, 60])

  return (
    <div className="relative w-full py-24 flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          style={{ x: mouseX, y: mouseY }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-[120px]"
        />
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * i * 0.1
            }}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center max-w-3xl px-6">
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <h2 className="text-6xl font-black text-white mb-8 uppercase italic tracking-tighter shadow-2xl">
            {title}
          </h2>
          <p className="text-2xl text-white/40 font-medium leading-relaxed max-w-2xl mx-auto mb-12 italic">
            {content}
          </p>
        </motion.div>
        
        {children}
      </div>
    </div>
  )
}
