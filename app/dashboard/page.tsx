'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, BookOpen, Target, LogOut, CheckCircle2, ChevronRight, Activity } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }
    checkUser()
  }, [router, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center animate-pulse">
          <Zap className="text-black w-5 h-5 fill-current" />
        </div>
      </div>
    )
  }

  // Temporary mock data for the dashboard
  const activeProtocols = [
    { id: 1, title: 'Atomic Habits', progress: 45, nextAction: 'Day 14: Environment Design', color: 'from-blue-500 to-blue-700' },
    { id: 2, title: 'Deep Work', progress: 12, nextAction: 'Day 3: Schedule Blocks', color: 'from-orange-500 to-orange-700' }
  ]

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 flex">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 hidden lg:flex flex-col relative z-10 bg-black/50 backdrop-blur-xl">
        <div className="p-8 border-b border-white/10">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <Zap className="text-black w-5 h-5 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">APPLIFY</span>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 mt-2">Neural Pathways</div>
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white/10 text-white rounded-xl font-medium transition-all">
            <Activity className="w-5 h-5" />
            Active Protocols
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-all">
            <BookOpen className="w-5 h-5" />
            Vault Library
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-all">
            <Target className="w-5 h-5" />
            Mastery Stats
          </a>
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user?.email}</p>
              <p className="text-xs text-gray-500">Initiate</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        <header className="lg:hidden p-6 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Zap className="text-black w-4 h-4 fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter">APPLIFY</span>
          </div>
          <button onClick={handleSignOut} className="text-sm text-gray-400">Disconnect</button>
        </header>

        <div className="p-6 md:p-12 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to the Vault.</h1>
            <p className="text-gray-400 text-lg">Your execution metrics are standing by.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {activeProtocols.map((protocol, i) => (
              <motion.div 
                key={protocol.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition-all cursor-pointer"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${protocol.color}`} />
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{protocol.title}</h3>
                    <p className="text-sm text-gray-400">Protocol Level 1</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Mastery Progress</span>
                    <span className="font-medium text-white">{protocol.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${protocol.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full bg-gradient-to-r ${protocol.color} rounded-full`}
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-white">{protocol.nextAction}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center hover:bg-white/5 transition-all cursor-pointer"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Access New Protocol</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Your neural pathways are ready for expansion. Browse the library to construct a new habit architecture.
            </p>
            <button className="mt-6 bg-white text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Browse Library
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}