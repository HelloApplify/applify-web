import React from 'react'
import Image from 'next/image'

export function ApplifyLogo({ className = "h-8" }: { className?: string }) {
  // Strip any fixed width classes to preserve aspect ratio
  const safeClassName = className.replace(/w-\d+/g, '').trim()

  return (
    <div className={`relative ${safeClassName} aspect-square`}>
      <Image 
        src="/applify-logo.png" 
        alt="Applify Logo" 
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}
