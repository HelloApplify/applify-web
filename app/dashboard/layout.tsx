import React from 'react'
import { LayoutDashboard, Settings, LogOut, Shield, Database } from 'lucide-react'
import Link from 'next/link'
import { ApplifyLogo } from '@/components/ApplifyLogo'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#000000] text-[#EDEDED] font-sans flex selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/[0.04] bg-[#030303] hidden lg:flex flex-col">
        <div className="px-6 py-7 flex items-center gap-3 border-b border-white/[0.04]">
          <ApplifyLogo className="text-white h-7" />
          <span className="text-lg font-black tracking-tighter text-white uppercase">Applify</span>
        </div>
        
        <nav className="flex-1 px-4 py-5 flex flex-col gap-1.5">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.05] text-white font-bold text-sm transition-all border border-white/[0.04]">
            <LayoutDashboard className="w-4 h-4 text-blue-500" /> 
            <span className="tracking-tight">Workbench</span>
          </Link>
          <Link href="/dashboard/vault" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.03] text-neutral-500 hover:text-white transition-all font-bold text-sm group">
            <Database className="w-4 h-4 group-hover:text-emerald-500 transition-colors" /> 
            <span className="tracking-tight">Knowledge Vault</span>
          </Link>
          <Link href="/dashboard/mastery" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.03] text-neutral-500 hover:text-white transition-all font-bold text-sm group">
            <Shield className="w-4 h-4 group-hover:text-yellow-500 transition-colors" /> 
            <span className="tracking-tight">Progress</span>
          </Link>
        </nav>

        <div className="px-4 py-5 border-t border-white/[0.04] space-y-1">
          <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/[0.03] text-neutral-500 hover:text-white transition-all font-bold text-xs">
            <Settings className="w-3.5 h-3.5" /> Settings
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-500/10 text-neutral-500 hover:text-red-400 transition-all font-bold text-xs">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-[#000000]">
          {children}
        </div>
      </main>
    </div>
  )
}
