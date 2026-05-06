import React from 'react'

export function ApplifyLogo({ className = "h-6" }: { className?: string }) {
  // Strip any fixed width classes (like w-8, w-5, w-10) so the logo can 
  // naturally size itself based on height without getting squished horizontally.
  const safeClassName = className.replace(/w-\d+/g, '').trim()

  return (
    <img 
      src="/applify-logo.png" 
      alt="Applify Logo" 
      className={`${safeClassName} w-auto object-contain`}
    />
  )
}
