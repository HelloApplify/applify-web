import { motion, useTransform } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

interface LivingBackgroundProps {
  color?: string
}

export default function LivingBackground({ color = '#3b82f6' }: LivingBackgroundProps) {
  const { x: smoothX, y: smoothY } = useMousePosition()

  // Transformations for blobs
  const x1 = useTransform(smoothX, [-0.5, 0.5], [-100, 100])
  const y1 = useTransform(smoothY, [-0.5, 0.5], [-100, 100])

  const x2 = useTransform(smoothX, [-0.5, 0.5], [100, -100])
  const y2 = useTransform(smoothY, [-0.5, 0.5], [100, -100])

  const x3 = useTransform(smoothX, [-0.5, 0.5], [-50, 50])
  const y3 = useTransform(smoothY, [-0.5, 0.5], [50, -50])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Primary Breathing Organism */}
      <motion.div
        style={{
          x: x1,
          y: y1,
          backgroundColor: color,
        }}
        animate={{
          scale: [1, 1.1, 0.95, 1.05, 1],
          borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[60%] h-[60%] blur-[120px]"
      />

      {/* Secondary Pulse */}
      <motion.div
        style={{
          x: x2,
          y: y2,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-indigo-500 blur-[150px] rounded-full"
      />

      {/* Tertiary Subtle Glow */}
      <motion.div
        style={{
          x: x3,
          y: y3,
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500 blur-[180px] rounded-full"
      />

      {/* Liquid Mesh Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
    </div>
  )
}
