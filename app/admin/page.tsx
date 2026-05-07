"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import AdminDashboard from '@/components/AdminDashboard'

export default function AdminPage() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.email !== 'helloapplify@gmail.com') {
        router.push('/dashboard')
      } else {
        setLoading(false)
      }
    }
    checkAdmin()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#050505]">
      <AdminDashboard />
    </main>
  )
}


