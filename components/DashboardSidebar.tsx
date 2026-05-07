"use client"
import React, { useEffect, useState } from 'react'
import { LayoutDashboard, Settings, LogOut, Shield, Database, Lock } from 'lucide-react'
import Link from 'next/link'
import { ApplifyLogo } from '@/components/ApplifyLogo'
import { createClient } from '@/utils/supabase/client'
import { useRouter, usePathname } from 'next/navigation'

export default function DashboardSidebar() {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserEmail(user?.email || null)
    }
    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const isAdmin = userEmail === 'helloapplify@gmail.com'

  const NavLink = ({ href, icon: Icon, children, color }: any) => {
    const active = pathname === href
    return (
      <Link href={href} 
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm border
          ${active 
            ? 'bg-white/[0.05] text-white border-white/[0.04]' 
            : 'hover:bg-white/[0.03] text-neutral-500 hover:text-white border-transparent'}`}>
        <Icon className={`w-4 h-4 ${active ? (color || 'text-blue-500') : 'group-hover:text-white'}`} /> 
        <span className="tracking-tight">{children}</span>
      </Link>
    )
  }

  return (
    <aside className="w-64 border-r border-white/[0.04] bg-[#030303] hidden lg:flex flex-col">
      <div className="px-6 py-7 flex items-center gap-3 border-b border-white/[0.04]">
        <ApplifyLogo className="text-white h-7" />
        <span className="text-lg font-black tracking-tighter text-white uppercase">Applify</span>
      </div>
      
      <nav className="flex-1 px-4 py-5 flex flex-col gap-1.5">
        <NavLink href="/dashboard" icon={LayoutDashboard} color="text-blue-500">Workbench</NavLink>
        <NavLink href="/dashboard/vault" icon={Database} color="text-emerald-500">Knowledge Vault</NavLink>
        <NavLink href="/dashboard/mastery" icon={Shield} color="text-yellow-500">Progress</NavLink>
        
        {isAdmin && (
          <div className="mt-4 pt-4 border-t border-white/[0.04] space-y-1.5">
            <p className="px-4 text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Master Control</p>
            <NavLink href="/admin" icon={Lock} color="text-red-500">Admin Producer</NavLink>
          </div>
        )}
      </nav>

      <div className="px-4 py-5 border-t border-white/[0.04] space-y-1">
        <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/[0.03] text-neutral-500 hover:text-white transition-all font-bold text-xs">
          <Settings className="w-3.5 h-3.5" /> Settings
        </Link>
        <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-500/10 text-neutral-500 hover:text-red-400 transition-all font-bold text-xs">
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
    </aside>
  )
}
