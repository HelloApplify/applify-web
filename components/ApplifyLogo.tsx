import React from 'react'

export function ApplifyLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 32.4 19.2 L 46.48 19.2 L 15.68 80.8 L 1.6 80.8 Z" />
      <path d="M 53.52 19.2 L 67.6 19.2 L 98.4 80.8 L 84.32 80.8 L 78.16 68.48 L 28.88 68.48 L 35.92 54.4 L 71.12 54.4 Z" />
    </svg>
  )
}