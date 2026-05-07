import { motion, AnimatePresence, useTransform } from 'framer-motion'
import { User, Shield, Sparkles } from 'lucide-react'
import { useMousePosition } from '@/hooks/useMousePosition'

export default function IdentityShift() {
  const { x, y } = useMousePosition()
  const mouseX = useTransform(x, [-0.5, 0.5], [-20, 20])
  const mouseY = useTransform(y, [-0.5, 0.5], [-20, 20])

  return (
    <motion.div 
      style={{ x: mouseX, y: mouseY }}
      className="relative w-full py-12 flex items-center justify-center gap-4"
    >
      {/* Old Identity */}
      <motion.div 
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 0.2, x: -20, scale: 0.9 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="flex flex-col items-center gap-3 opacity-30"
      >
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <User className="w-8 h-8 text-white/40" />
        </div>
        <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Old Self</span>
      </motion.div>

      {/* Transition Arrow / Energy */}
      <div className="relative w-24 h-px bg-gradient-to-r from-white/5 via-blue-500/50 to-white/5">
        <motion.div 
          animate={{ x: [-40, 40], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 blur-lg rounded-full"
        />
      </div>

      {/* New Identity */}
      <motion.div 
        initial={{ opacity: 0.2, x: 20, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="flex flex-col items-center gap-3"
      >
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 border border-blue-500/20 border-dashed rounded-full"
          />
          <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-900/40 border border-blue-400/30">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <motion.div 
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-yellow-400 fill-current" />
          </motion.div>
        </div>
        <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Architect</span>
      </motion.div>
    </motion.div>
  )
}
