'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Mail, Lock, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Account created! Check your email to confirm.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
      }
    }
    setLoading(false)
  }

  // Spring animation config
  const springConfig = { type: "spring", stiffness: 400, damping: 30 }

  return (
    <div className="min-h-screen bg-black flex text-white font-sans selection:bg-blue-500/30">
      {/* Left Side - Premium Branding & Quote */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 border-r border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-black z-0" />
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center space-x-3 group w-fit">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <Zap className="text-black w-6 h-6 fill-current" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white">APPLIFY</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...springConfig }}
          >
            <h2 className="text-5xl font-bold leading-[1.1] tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">
              The Protocol Vault.
            </h2>
            <p className="text-xl text-gray-400 font-medium leading-relaxed">
              Stop consuming content for entertainment. Start executing blueprints designed for elite performance.
            </p>
          </motion.div>
          
          <div className="mt-12 flex items-center space-x-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br ${i === 1 ? 'from-blue-500 to-purple-500' : i === 2 ? 'from-orange-500 to-red-500' : 'from-green-500 to-emerald-500'} flex items-center justify-center shadow-lg`}>
                  <Zap className="w-4 h-4 text-white/50" />
                </div>
              ))}
            </div>
            <div className="text-sm font-medium text-gray-500">
              <span className="text-white">10,000+</span> protocols executed
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Mobile background elements */}
        <div className="lg:hidden absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[420px] relative z-10">
          <div className="lg:hidden mb-12 flex justify-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Zap className="text-black w-5 h-5 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">APPLIFY</span>
            </Link>
          </div>

          <motion.div 
            layout
            transition={springConfig}
            className="mb-8"
          >
            <motion.h1 layout className="text-3xl font-bold tracking-tight mb-2">
              {isSignUp ? 'Claim your access' : 'Welcome back'}
            </motion.h1>
            <motion.p layout className="text-gray-400">
              {isSignUp ? 'Enter your details to construct your vault.' : 'Enter your details to unlock your vault.'}
            </motion.p>
          </motion.div>

          <motion.div layout transition={springConfig}>
            <form onSubmit={handleAuth} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300 ml-1">Email address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <AnimatePresence mode="popLayout">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">!</span>
                    </div>
                    {error}
                  </motion.div>
                )}

                {message && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 text-sm flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                layout
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(255,255,255,0.1)] mt-4"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{isSignUp ? 'Initialize Protocol' : 'Access Vault'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div layout transition={springConfig} className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              {isSignUp ? 'Already mapped your neural pathways?' : "Haven't initialized your vault yet?"}{' '}
              <button 
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError(null)
                  setMessage(null)
                }} 
                className="text-white font-bold hover:text-blue-400 transition-colors focus:outline-none"
              >
                {isSignUp ? 'Access Vault' : 'Initialize Protocol'}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}