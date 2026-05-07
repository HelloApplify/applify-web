import React from 'react'
import { LayoutDashboard, Book, Award, Settings, LogOut, Zap, Shield, Database } from 'lucide-react'
import Link from 'next/link'
import { ApplifyLogo } from '@/components/ApplifyLogo'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#000000] text-[#EDEDED] font-sans flex selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/[0.05] bg-[#050505] hidden lg:flex flex-col">
        <div className="p-10 flex items-center gap-3 border-b border-white/[0.03]">
          <ApplifyLogo className="text-white h-8 w-8" />
          <span className="text-2xl font-black tracking-tighter text-white uppercase">Applify</span>
        </div>
        
        <nav className="flex-1 p-6 flex flex-col gap-3">
          <Link href="/dashboard" className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/[0.05] text-white font-bold transition-all border border-white/5">
            <LayoutDashboard className="w-5 h-5 text-blue-500" /> 
            <span className="tracking-tight">Workbench</span>
          </Link>
          <Link href="/dashboard/vault" className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/[0.02] text-neutral-500 hover:text-white transition-all font-bold group">
            <Database className="w-5 h-5 group-hover:text-emerald-500 transition-colors" /> 
            <span className="tracking-tight">Knowledge Vault</span>
          </Link>
          <Link href="/dashboard/mastery" className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/[0.02] text-neutral-500 hover:text-white transition-all font-bold group">
            <Shield className="w-5 h-5 group-hover:text-yellow-500 transition-colors" /> 
            <span className="tracking-tight">Execution Nodes</span>
          </Link>
        </nav>

        <div className="p-6 space-y-2">
          <div className="px-5 py-4 bg-blue-500/5 rounded-3xl border border-blue-500/10 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Pro Interface</span>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium leading-relaxed">Neural interface active. All protocols synced.</p>
          </div>
          
          <Link href="/settings" className="flex items-center gap-4 px-5 py-3 rounded-xl hover:bg-white/[0.02] text-neutral-500 hover:text-white transition-all font-bold text-sm">
            <Settings className="w-4 h-4" /> Settings
          </Link>
          <button className="w-full flex items-center gap-4 px-5 py-3 rounded-xl hover:bg-red-500/10 text-neutral-500 hover:text-red-400 transition-all font-bold text-sm">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background Ambience */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Topbar */}
        <header className="h-24 border-b border-white/[0.03] bg-[#0A0A0A]/40 backdrop-blur-3xl flex items-center justify-between px-10 z-10">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
             <h1 className="text-sm font-black text-white/40 uppercase tracking-[0.2em]">Neural Link: Active</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-black text-white tracking-tight uppercase">Jacob Yakhontov</div>
              <div className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Streak: 12 Days</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-600 p-[1px] shadow-2xl">
              <div className="w-full h-full bg-[#050505] rounded-[0.9rem] border border-white/5 flex items-center justify-center text-white font-black text-xs uppercase">
                JY
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-[#000000] z-0">
          {children}
        </div>
      </main>
    </div>
  )
}
