"use client"
import React, { useMemo } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

interface LivingBackgroundProps {
  color?: string
}

const PARTICLE_COUNT = 400

export default function LivingBackground({ color = '#3b82f6' }: LivingBackgroundProps) {
  const { x: smoothX, y: smoothY } = useMousePosition()

  // Generate a vast, high-density starfield
  const stars = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      baseOpacity: Math.random() * 0.15 + 0.05,
      // Random twinkle offsets
      twinkleSpeed: 2 + Math.random() * 4,
      twinkleDelay: Math.random() * 5
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#050505]">
      {/* Deep Silk Ambient Wash */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}10 0%, transparent 70%)`
        }}
      />

      {/* The Constellation Layer */}
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

      {/* Ultra-fine mesh overlay for technical texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} 
      />
    </div>
  )
}

function Star({ star, mouseX, mouseY, color }: { star: any, mouseX: any, mouseY: any, color: string }) {
  // Calculate distance from mouse for proximity lighting
  // Note: x/y are 0-100%, mouseX/Y are -0.5 to 0.5 (centered)
  // We need to normalize them to same space.
  
  // Create a proximity effect using framer-motion transforms
  // Distance from center-normalized coordinates
  const starX = (star.x - 50) / 100
  const starY = (star.y - 50) / 100
  
  // This transform increases scale and opacity when the mouse is near the star
  const proximityScale = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]: any[]) => {
      const dx = latestX - starX
      const dy = latestY - starY
      const distance = Math.sqrt(dx * dx + dy * dy)
      // If distance is small, return high scale, else 1
      const influence = Math.max(0, 1 - distance * 4) // Reach of 0.25 (25% of screen)
      return 1 + influence * 2.5
    }
  )

  const proximityOpacity = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]: any[]) => {
      const dx = latestX - starX
      const dy = latestY - starY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const influence = Math.max(0, 1 - distance * 5)
      return star.baseOpacity + influence * 0.8
    }
  )

  const glowColor = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]: any[]) => {
      const dx = latestX - starX
      const dy = latestY - starY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const influence = Math.max(0, 1 - distance * 5)
      return influence > 0.1 ? color : '#FFFFFF'
    }
  )

  return (
    <motion.div
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: star.size,
        height: star.size,
        scale: proximityScale,
        opacity: proximityOpacity,
        backgroundColor: glowColor,
        boxShadow: proximityOpacity.get() > 0.4 ? `0 0 10px ${color}` : 'none'
      }}
      animate={{
        opacity: [star.baseOpacity, star.baseOpacity * 1.5, star.baseOpacity]
      }}
      transition={{
        duration: star.twinkleSpeed,
        repeat: Infinity,
        delay: star.twinkleDelay,
        ease: "easeInOut"
      }}
      className="absolute rounded-full"
    />
  )
}
