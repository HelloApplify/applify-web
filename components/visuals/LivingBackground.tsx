"use client"
import React, { useMemo } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

interface LivingBackgroundProps {
  color?: string
}

const PARTICLE_COUNT = 150

export default function LivingBackground({ color = '#3b82f6' }: LivingBackgroundProps) {
  const { x: smoothX, y: smoothY } = useMousePosition()

  // Generate a very sparse, high-fidelity starfield
  const stars = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.8 + 0.2, // Tiny, pin-point stars
      opacity: Math.random() * 0.15 + 0.05,
      depth: Math.random() * 0.3 + 0.1, // Subtle parallax
      twinkleSpeed: 4 + Math.random() * 6
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#020202] z-[-1]">
      {/* High-End Environmental Wash - follows mouse with dampening */}
      <motion.div 
        style={{
          x: useTransform(smoothX, [-0.5, 0.5], [-150, 150]),
          y: useTransform(smoothY, [-0.5, 0.5], [-150, 150]),
          background: `radial-gradient(circle at center, ${color}08 0%, transparent 65%)`
        }}
        className="absolute inset-[-20%] opacity-40 mix-blend-screen"
      />

      {/* The Monolith Layer (Constellations) */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <Star 
            key={star.id} 
            star={star} 
            mouseX={smoothX} 
            mouseY={smoothY} 
            color={color}
          />
        ))}
      </div>

      {/* Ultra-subtle linear vignetting for professional depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
    </div>
  )
}

function Star({ star, mouseX, mouseY, color }: { star: any, mouseX: any, mouseY: any, color: string }) {
  const starX = (star.x - 50) / 100
  const starY = (star.y - 50) / 100
  
  // High-fidelity Parallax
  const x = useTransform(mouseX, [-0.5, 0.5], [star.depth * 30, star.depth * -30])
  const y = useTransform(mouseY, [-0.5, 0.5], [star.depth * 30, star.depth * -30])

  // Soft Magnetic Luminescence
  const opacity = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]: any[]) => {
      const dx = latestX - starX
      const dy = latestY - starY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const influence = Math.max(0, 1 - distance * 8) 
      return star.opacity + influence * 0.4
    }
  )

  return (
    <motion.div
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: star.size,
        height: star.size,
        x,
        y,
        opacity,
        backgroundColor: '#FFFFFF',
      }}
      animate={{
        opacity: [star.opacity, star.opacity * 1.5, star.opacity]
      }}
      transition={{
        duration: star.twinkleSpeed,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 5
      }}
      className="absolute rounded-full shadow-[0_0_2px_rgba(255,255,255,0.3)]"
    />
  )
}
