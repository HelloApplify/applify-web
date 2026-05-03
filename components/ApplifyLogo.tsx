import React from 'react'

export function ApplifyLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 5 90 L 35 10 L 47 10 L 17 90 Z" />
      <path d="M 25 90 L 55 10 L 67 10 L 97 90 L 85 90 L 61 26 L 37 90 Z" />
      <path d="M 47.5 62 L 74.5 62 L 79 74 L 43 74 Z" />
    </svg>
  )
}