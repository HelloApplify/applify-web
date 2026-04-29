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
      setError("Passwords do not match.")
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
        setMessage('Verification link sent. Check your inbox.')
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
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Ambience - Identical to Landing Page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-slate-800/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-[420px] relative z-10">
        {/* Navbar-style Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10"
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
              <Zap className="text-black w-5 h-5 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">APPLIFY</span>
          </Link>
        </motion.div>

        {/* Main Interface */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl shadow-2xl overflow-hidden relative"
        >
          <div className="text-center mb-10">
            <motion.h1 
              key={isSignUp ? 'signup' : 'signin'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-black tracking-tight mb-2"
            >
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </motion.h1>
            <p className="text-gray-500 text-sm font-medium tracking-tight">
              {isSignUp ? 'Start your high-velocity transformation.' : 'Continue your execution sequence.'}
            </p>
          </div>

          {/* Social Auth */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-14 flex items-center justify-center gap-3 bg-white text-black rounded-2xl font-bold hover:bg-gray-100 transition-all active:scale-[0.98] mb-6 shadow-xl"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[10px] font-black tracking-widest text-gray-700 uppercase">or</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          {/* Form Control */}
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all placeholder-gray-700"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all placeholder-gray-700"
                required
              />
            </div>

            <AnimatePresence>
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="relative group overflow-hidden"
                >
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all placeholder-gray-700"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-[11px] font-bold text-center px-2">
                  {error}
                </motion.p>
              )}
              {message && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-400 text-[11px] font-bold text-center px-2">
                  {message}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] mt-4 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <span>{isSignUp ? 'Initialize Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Contextual Toggle */}
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-gray-500 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 mx-auto group"
            >
              {isSignUp ? (
                <>
                  <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Sign In
                </>
              ) : (
                <>
                  Don't have an account? <span className="text-white">Create Account</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Legal Micro-copy */}
        <p className="text-center text-gray-800 text-[9px] font-black uppercase tracking-[0.3em] mt-10">
          Secure Neural Interface • Applify Vault
        </p>
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
