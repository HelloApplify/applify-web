import React from 'react'

export function ApplifyLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 2 98 L 21.2 98 L 51.2 2 L 32 2 Z" />
      <path d="M 98 98 L 78.8 98 L 52.4 13.52 L 56 2 L 68 2 Z" />
      <path d="M 50 21.2 L 74 98 L 26 98 Z M 50 51.92 L 38.6 88.4 L 61.4 88.4 Z" fillRule="evenodd" />
    </svg>
  )
}