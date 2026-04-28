'use client'

import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center p-4">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#007AFF]/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#007AFF]/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center space-x-2 mb-6 group">
            <div className="w-10 h-10 bg-[#007AFF] rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="text-white w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#1D1D1F]">Applify</span>
          </Link>
          <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">Welcome back</h1>
          <p className="text-[#86868B] mt-2">Enter your details to access your vault</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-[#D2D2D7]/30 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#86868B]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#F5F5F7] border-none rounded-xl py-3 pl-11 pr-4 text-[#1D1D1F] placeholder-[#86868B] focus:ring-2 focus:ring-[#007AFF]/20 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#86868B]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F5F5F7] border-none rounded-xl py-3 pl-11 pr-4 text-[#1D1D1F] placeholder-[#86868B] focus:ring-2 focus:ring-[#007AFF]/20 transition-all outline-none"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-100"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#007AFF] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0071E3] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:active:scale-100 shadow-[0_4px_12px_rgba(0,122,255,0.2)]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#F5F5F7] text-center">
            <p className="text-[#86868B] text-sm">
              Don't have an account?{' '}
              <Link href="/#pricing" className="text-[#007AFF] font-medium hover:underline">
                Get access to the Vault
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#86868B] text-sm hover:text-[#1D1D1F] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
