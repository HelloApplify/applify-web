"use client"
import React, { useMemo } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

interface LivingBackgroundProps {
  color?: string
}

const PARTICLE_COUNT = 250

export default function LivingBackground({ color = '#3b82f6' }: LivingBackgroundProps) {
  const { x: smoothX, y: smoothY } = useMousePosition()

  // Generate stable random particles in a vortex pattern
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2
      const radius = 2 + Math.pow(Math.random(), 0.5) * 48 // Cluster towards center
      const x = 50 + Math.cos(angle) * radius
      const y = 50 + Math.sin(angle) * radius
      
      return {
        id: i,
        x,
        y,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
        speed: (70 - radius) * 1.2, // Faster movement for outer particles for depth
        color: i % 15 === 0 ? '#fbbf24' : i % 10 === 0 ? '#f472b6' : i % 7 === 0 ? '#10b981' : color
      }
    })
  }, [color])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#050505]">
      {/* Subtle Background Glow - reduced blur significantly */}
      <motion.div
        style={{
          x: useTransform(smoothX, [-0.5, 0.5], [-50, 50]),
          y: useTransform(smoothY, [-0.5, 0.5], [-50, 50]),
          backgroundColor: color,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] blur-[120px] opacity-[0.07]"
      />

      {/* Sharp Particle Field */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <Particle key={p.id} p={p} mouseX={smoothX} mouseY={smoothY} />
        ))}
      </div>

      {/* Sharp Neural Mesh Grid (Subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} 
      />
    </div>
  )
}

function Particle({ p, mouseX, mouseY }: { p: any, mouseX: any, mouseY: any }) {
  // Parallax movement
  const x = useTransform(mouseX, [-0.5, 0.5], [p.speed, -p.speed])
  const y = useTransform(mouseY, [-0.5, 0.5], [p.speed, -p.speed])

  return (
    <motion.div
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        opacity: p.opacity,
        backgroundColor: p.color,
        x,
        y,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [p.opacity, p.opacity * 1.5, p.opacity],
      }}
      transition={{
        duration: 3 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)]"
    />
  )
}
