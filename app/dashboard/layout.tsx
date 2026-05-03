import React from 'react'
import { LayoutDashboard, Book, Award, Settings, LogOut, Zap } from 'lucide-react'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#000000] text-[#EDEDED] font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/[0.05] bg-[#050505] hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/[0.05]">
          <div className="w-8 h-8 rounded flex items-center justify-center bg-white">
            <Zap className="text-black w-4 h-4 fill-current" />
          </div>
          <span className="text-xl font-medium tracking-tight text-white">Applify</span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.05] text-white font-medium">
            <LayoutDashboard className="w-4 h-4 text-emerald-400" /> Workbench
          </Link>
          <Link href="/dashboard/vault" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/[0.02] text-neutral-400 hover:text-white transition-colors font-medium">
            <Book className="w-4 h-4" /> The Vault
          </Link>
          <Link href="/dashboard/mastery" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/[0.02] text-neutral-400 hover:text-white transition-colors font-medium">
            <Award className="w-4 h-4" /> Mastery
          </Link>
        </nav>

        <div className="p-4 border-t border-white/[0.05]">
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/[0.02] text-neutral-400 hover:text-white transition-colors font-medium">
            <Settings className="w-4 h-4" /> Settings
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-red-400 transition-colors font-medium">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar for mobile + user info */}
        <header className="h-20 border-b border-white/[0.05] bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-between px-8">
          <h1 className="text-xl font-medium text-white">Command Center</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium text-white">Jacob Y.</div>
              <div className="text-xs text-emerald-400 font-medium">Streak: 12 Days</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 p-[1px]">
              <div className="w-full h-full bg-black rounded-full border border-[#111]"></div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-[#0A0A0A]">
          {children}
        </div>
      </main>
    </div>
  )
}