import React from 'react'
import Image from 'next/image'

export function ApplifyLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <Image 
      src="/applify-logo.png" 
      alt="Applify Logo" 
      width={875} 
      height={689} 
      className={className}
      style={{ objectFit: 'contain' }}
      priority
    />
  )
}
