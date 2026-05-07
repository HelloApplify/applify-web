import React from 'react'
import { LayoutDashboard, Settings, LogOut, Shield, Database } from 'lucide-react'
import Link from 'next/link'
import { ApplifyLogo } from '@/components/ApplifyLogo'
import DashboardSidebar from '@/components/DashboardSidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#000000] text-[#EDEDED] font-sans flex selection:bg-blue-500/30">
      <DashboardSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-[#000000]">
          {children}
        </div>
      </main>
    </div>
  )
}
