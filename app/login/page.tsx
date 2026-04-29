'use client'

import { useState, useEffect, Suspense } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Mail, Lock, ArrowRight, Loader2, CheckCircle2, ChevronLeft, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

function LoginContent() {
  const searchParams = useSearchParams()
  const initialMode = searchParams.get('mode') === 'signup'
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(initialMode)
  const [message, setMessage] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const mode = searchParams.get('mode')
    if (mode === 'signup') setIsSignUp(true)
    if (mode === 'signin') setIsSignUp(false)
  }, [searchParams])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (isSignUp && password !== confirmPassword) {
      setError("Security keys do not match. Please verify.")
      setLoading(false)
      return
    }

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        setMessage('Account initialization started. Please verify your email.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Precision Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-slate-800/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Identity */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-12"
        >
          <Link href="/" className="group flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-[1.25rem] flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-all duration-500 mb-4">
              <Zap className="text-black w-8 h-8 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-widest">APPLIFY</span>
          </Link>
        </motion.div>

        {/* Auth Interface */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-[#0D0D0D] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl backdrop-blur-3xl relative overflow-hidden"
        >
          {/* Subtle Glass Highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="mb-10 text-center">
            <motion.h1 
              key={isSignUp ? 'signup' : 'signin'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold tracking-tight mb-3"
            >
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </motion.h1>
            <motion.p 
              key={isSignUp ? 'signup-p' : 'signin-p'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-sm font-medium"
            >
              {isSignUp ? 'Initialize your personal vault' : 'Access your secure protocols'}
            </motion.p>
          </div>

          {/* Social Access Control */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4.5 bg-white text-black rounded-2xl font-bold hover:bg-gray-100 transition-all active:scale-[0.98] mb-8 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative bg-[#0D0D0D] px-4 text-[9px] uppercase tracking-[0.3em] font-black text-gray-700">
              Direct Encryption
            </span>
          </div>

          {/* Core Credentials Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4.5 pl-12 pr-4 text-sm font-medium placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/[0.05] transition-all"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-white transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4.5 pl-12 pr-4 text-sm font-medium placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/[0.05] transition-all"
                required
              />
            </div>

            <AnimatePresence>
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="relative group overflow-hidden"
                >
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-white transition-colors" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4.5 pl-12 pr-4 text-sm font-medium placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/[0.05] transition-all"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-red-400 text-xs font-bold px-1 py-2 text-center"
                >
                  {error}
                </motion.div>
              )}
              {message && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-green-400 text-xs font-bold px-1 py-2 text-center flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:bg-gray-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-6 shadow-xl"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Experience Toggle */}
          <div className="mt-12 text-center border-t border-white/5 pt-8">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-gray-500 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 mx-auto group"
            >
              {isSignUp ? (
                <>
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                  Already have an account? Sign In
                </>
              ) : (
                <>
                  Need to join the vault? Create Account 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Terminal Meta */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-800 text-[9px] mt-12 uppercase tracking-[0.4em] font-black"
        >
          Secure Node Access • Applify v1.0.4
        </motion.p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <LoginContent />
    </Suspense>
  )
}
