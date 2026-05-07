"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Video, Wand2, Send, CheckCircle2, AlertCircle, Copy, ExternalLink, 
  Users, Layout, Settings2, BarChart3, Search, MoreHorizontal, 
  Mail, Calendar, ShieldCheck, Clock, ArrowUp, ArrowDown, Trash2, 
  Plus, Play, Save, ChevronRight, Activity, Zap, Eye, Image as ImageIcon,
  Type, HelpCircle, Sparkles, Database, Filter, Download
} from 'lucide-react'
import { PROTOCOLS } from '@/data/protocols'
import { Protocol, ProtocolSlide } from '@/store/useProtocolStore'

import { createClient } from '@/utils/supabase/client'

type AdminTab = 'orchestrator' | 'curator' | 'users' | 'settings';

export default function AdminDashboard() {
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState<AdminTab>('orchestrator')
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol>(PROTOCOLS[0])
  const [slides, setSlides] = useState<ProtocolSlide[]>(PROTOCOLS[0].slides)
  const [editingSlide, setEditingSlide] = useState<ProtocolSlide | null>(null)
  
  const [webhookUrl, setWebhookUrl] = useState('')
  const [script, setScript] = useState('')
  const [imagePrompt, setImagePrompt] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  // Real Data State
  const [users, setUsers] = useState<any[]>([])
  const [mediaLibrary, setMediaLibrary] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      // Try to fetch real users from profiles table
      const { data: profileData } = await supabase.from('profiles').select('*')
      if (profileData) setUsers(profileData)
      
      // Fetch media if you have a media table, else keep empty
      const { data: mediaData } = await supabase.from('media_vault').select('*')
      if (mediaData) setMediaLibrary(mediaData)
      
      setIsLoading(false)
    }
    fetchData()
  }, [supabase])

  const handleProtocolSelect = (proto: Protocol) => {
    setSelectedProtocol(proto)
    setSlides(proto.slides || [])
  }

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...slides]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newSlides.length) return
    
    [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]]
    setSlides(newSlides)
  }

  const saveSlideChanges = () => {
    if (!editingSlide) return
    const newSlides = slides.map(s => s.id === editingSlide.id ? editingSlide : s)
    setSlides(newSlides)
    setEditingSlide(null)
  }

  const handleTrigger = async () => {
    if (!webhookUrl) {
      alert('Please enter your Make.com Webhook URL first!')
      return
    }
    setStatus('sending')
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script, imagePrompt, timestamp: new Date().toISOString() })
      })
      if (response.ok) {
        setStatus('success')
        // Success, real data will be updated on next fetch or via realtime subscriptions
      }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-[#080808] flex flex-col py-8 px-4 gap-8">
        <div className="px-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/40">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tighter uppercase">Master Hub</h1>
            <p className="text-[10px] font-bold text-blue-400/70 uppercase tracking-widest">Administrator</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          {[
            { id: 'orchestrator', label: 'Orchestrator', icon: Video, desc: 'API Video Pipeline' },
            { id: 'curator', label: 'Curator', icon: Layout, desc: 'Lesson Architecture' },
            { id: 'users', label: 'Command', icon: Users, desc: 'Member Analytics' },
            { id: 'settings', label: 'Config', icon: Settings2, desc: 'Platform Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group
                ${activeTab === tab.id ? 'bg-white/5 text-white border border-white/10 shadow-xl' : 'text-white/30 hover:bg-white/[0.02] hover:text-white border border-transparent'}`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-400' : 'group-hover:text-white transition-colors'}`} />
              <div className="text-left">
                <p className="text-xs font-black tracking-tight">{tab.label}</p>
                <p className="text-[9px] font-medium opacity-40">{tab.desc}</p>
              </div>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/30 hover:text-white hover:bg-white/5 transition-all font-bold text-xs">
            <Zap className="w-3.5 h-3.5" /> Return to Workbench
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-all font-bold text-xs">
            <Mail className="w-3.5 h-3.5" /> Support Requests
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#050505]">
        <div className="max-w-7xl mx-auto p-10 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'orchestrator' && (
                <div className="space-y-10">
                  <header className="flex justify-between items-end">
                    <div className="space-y-2">
                      <h2 className="text-4xl font-black tracking-tight">Orchestrator</h2>
                      <p className="text-white/40 font-medium italic text-base">Headless Video Production Pipeline</p>
                    </div>
                    <div className="flex gap-4">
                      <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors">Documentation</button>
                      <button className="px-6 py-2.5 rounded-xl bg-blue-600 text-xs font-bold hover:bg-blue-500 transition-colors">Scenario Status</button>
                    </div>
                  </header>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                      <section className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-6 shadow-2xl shadow-black">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-400" /> Production Data
                          </h3>
                          <div className="flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Pipeline Active</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Narration Script (ElevenLabs)</label>
                            <textarea 
                              value={script}
                              onChange={(e) => setScript(e.target.value)}
                              placeholder="Paste the narration text here. High-quality voices will process this..."
                              className="w-full h-48 bg-black/40 border border-white/10 rounded-3xl p-6 text-sm text-white focus:border-blue-500/50 outline-none transition-all resize-none shadow-inner"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Visual Scene Description (Midjourney)</label>
                            <textarea 
                              value={imagePrompt}
                              onChange={(e) => setImagePrompt(e.target.value)}
                              placeholder="Describe the cartoon aesthetic, lighting, and characters..."
                              className="w-full h-24 bg-black/40 border border-white/10 rounded-3xl p-6 text-sm text-white focus:border-blue-500/50 outline-none transition-all resize-none shadow-inner"
                            />
                          </div>

                          <button 
                            onClick={handleTrigger}
                            disabled={status === 'sending'}
                            className="w-full py-6 rounded-[2rem] bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:text-white/20 text-white font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
                          >
                            {status === 'sending' ? <Clock className="animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
                            Trigger Production Sequence
                          </button>
                        </div>
                      </section>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                      <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Media Vault</h3>
                          <button className="text-[10px] font-black text-blue-400 hover:text-blue-300">View All</button>
                        </div>
                        <div className="space-y-3">
                          {mediaLibrary.length === 0 ? (
                            <div className="py-10 text-center border border-dashed border-white/5 rounded-2xl">
                              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Vault Empty</p>
                            </div>
                          ) : mediaLibrary.map((item) => (
                            <div key={item.id} className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-4 group hover:border-white/20 transition-all">
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                                {item.type === 'video' ? <Video className="w-5 h-5 text-white/30 group-hover:text-blue-400" /> : <ImageIcon className="w-5 h-5 text-white/30 group-hover:text-blue-400" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-bold text-white truncate">{item.name}</p>
                                <p className="text-[9px] text-white/20 font-medium uppercase mt-0.5">{item.date} • {item.size}</p>
                              </div>
                              <button className="p-2 text-white/10 hover:text-white transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 rounded-[2rem] bg-gradient-to-br from-indigo-600/10 to-blue-600/10 border border-blue-500/10 space-y-2">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Quota Usage</p>
                        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full bg-blue-500 w-[0%]" />
                        </div>
                        <p className="text-[9px] text-white/40 font-bold">0% of monthly production limit used</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="space-y-10">
                  <header className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h2 className="text-4xl font-black tracking-tight">Command Center</h2>
                      <p className="text-white/40 font-medium text-base italic">Real-time member activity and lifecycle management</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold flex items-center gap-2 hover:bg-white/10 transition-all"><Download className="w-3.5 h-3.5" /> Export CSV</button>
                      <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-2.5 flex items-center gap-3">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        <span className="text-[11px] font-bold text-white/70">{users.length > 0 ? 1 : 0} Online</span>
                      </div>
                    </div>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Platform Revenue', value: '$0', color: 'text-white', sub: '0% growth' },
                      { label: 'Active Retention', value: '0%', color: 'text-emerald-400', sub: 'Last 30 days' },
                      { label: 'Avg Mastery', value: '0%', color: 'text-blue-400', sub: 'Across protocols' },
                      { label: 'New Signups', value: users.length.toString(), color: 'text-purple-400', sub: 'All time' },
                    ].map((stat, i) => (
                      <div key={i} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 relative overflow-hidden group shadow-xl">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <BarChart3 className="w-12 h-12" />
                        </div>
                        <p className="text-[10px] font-black uppercase text-white/30 tracking-widest mb-1 relative z-10">{stat.label}</p>
                        <p className={`text-3xl font-black ${stat.color} relative z-10 tracking-tighter`}>{stat.value}</p>
                        <p className="text-[10px] font-bold text-white/20 mt-1 uppercase tracking-tight relative z-10">{stat.sub}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[3rem] border border-white/5 bg-[#080808] p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-8 px-4 pt-4">
                      <div className="flex gap-4 items-center">
                        <div className="relative w-80">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input type="text" placeholder="Search members by name or email..." className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-xs text-white focus:border-blue-500/30 outline-none transition-all shadow-inner" />
                        </div>
                        <button className="px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all"><Filter className="w-3.5 h-3.5" /> Filters</button>
                      </div>
                      <div className="flex gap-3">
                        <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all"><Database className="w-4 h-4" /></button>
                        <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all"><Settings2 className="w-4 h-4" /></button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-[10px] font-black uppercase tracking-widest text-white/20 border-b border-white/5">
                            <th className="px-8 py-5">Member Details</th>
                            <th className="px-8 py-5">Plan & Tier</th>
                            <th className="px-8 py-5">Activity Status</th>
                            <th className="px-8 py-5">Mastery Progress</th>
                            <th className="px-8 py-5">Device</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                          {users.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-8 py-20 text-center text-white/20 font-bold italic">
                                No members have joined the protocol yet.
                              </td>
                            </tr>
                          ) : users.map((u) => (
                            <tr key={u.id} className="group hover:bg-white/[0.01] transition-all">
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/40 to-indigo-600/40 border border-white/10 flex items-center justify-center text-sm font-black shadow-lg">
                                    {(u.full_name || u.email || 'U').split(' ').map((n: string) => n[0]).join('')}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-white/90">{u.full_name || 'Anonymous User'}</p>
                                    <p className="text-[10px] text-white/20 font-mono mt-0.5">{u.email}</p>
                                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-tighter mt-1">Joined {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-2 h-2 rounded-full ${u.plan === 'Founder' ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'}`} />
                                  <span className="text-xs font-black tracking-tight text-white/70 uppercase">{u.plan || 'Free'}</span>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <div className="space-y-1.5">
                                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${u.status === 'Active' ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500' : 'border-white/10 bg-white/5 text-white/20'}`}>
                                    {u.status || 'Offline'}
                                  </span>
                                  <p className="text-[9px] text-white/30 font-bold ml-1">{u.last_active || 'Never'}</p>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <div className="space-y-2">
                                  <div className="w-36 h-2 rounded-full bg-white/5 overflow-hidden shadow-inner">
                                    <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" style={{ width: `${u.progress || 0}%` }} />
                                  </div>
                                  <div className="flex justify-between items-center w-36">
                                    <p className="text-[9px] font-black text-white/30">{u.progress || 0}% Protocol Completion</p>
                                    <p className="text-[9px] font-black text-white/50">{u.sessions || 0} Sessions</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <span className="text-[10px] font-bold text-white/30 uppercase">{u.device || 'Unknown'}</span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                <button className="p-3 rounded-xl text-white/10 hover:text-white hover:bg-white/5 transition-all"><MoreHorizontal className="w-5 h-5" /></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'curator' && (
                <div className="space-y-10">
                  <header className="flex justify-between items-end">
                    <div className="space-y-2">
                      <h2 className="text-4xl font-black tracking-tight">Lesson Curator</h2>
                      <p className="text-white/40 font-medium text-base italic">Architect and Sequence Personal Mastery Protocols</p>
                    </div>
                    <button className="px-8 py-4 rounded-[1.5rem] bg-white text-black text-xs font-black hover:bg-neutral-200 transition-all flex items-center gap-3 shadow-2xl shadow-white/10 active:scale-[0.98]">
                      <Plus className="w-4 h-4" /> Create New Protocol
                    </button>
                  </header>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Protocol Selector */}
                    <div className="lg:col-span-4 space-y-6">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Engine Library</h3>
                      <div className="space-y-3">
                        {PROTOCOLS.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleProtocolSelect(p)}
                            className={`w-full text-left p-6 rounded-[2rem] border transition-all relative overflow-hidden group
                              ${selectedProtocol.id === p.id ? 'bg-blue-600/10 border-blue-600/30 shadow-xl' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                          >
                            <p className="text-base font-black tracking-tight relative z-10">{p.title}</p>
                            <div className="flex items-center gap-3 mt-2 relative z-10">
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{p.category}</span>
                              <span className="w-1 h-1 rounded-full bg-white/10" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{p.slides?.length || 0} Components</span>
                            </div>
                            {selectedProtocol.id === p.id && (
                              <motion.div layoutId="curator-active" className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent z-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Slide Sequencing */}
                    <div className="lg:col-span-8 space-y-6">
                      <div className="flex justify-between items-center px-4">
                        <div className="space-y-1">
                          <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Sequence Architecture</h3>
                          <p className="text-[10px] text-white/20 font-medium">Reorder or edit specific learning blocks</p>
                        </div>
                        <div className="flex gap-6">
                          <button className="text-[10px] font-black text-white/40 hover:text-white transition-colors flex items-center gap-2"><Trash2 className="w-3.5 h-3.5" /> Batch Actions</button>
                          <button className="text-[10px] font-black text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"><Save className="w-3.5 h-3.5" /> Commit Architecture</button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {slides.map((slide, i) => (
                          <motion.div 
                            key={slide.id}
                            layout
                            className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center gap-8 group hover:border-white/20 transition-all cursor-default"
                          >
                            <div className="flex flex-col gap-1 items-center opacity-0 group-hover:opacity-100 transition-all">
                              <button onClick={() => moveSlide(i, 'up')} className="p-1.5 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-colors"><ArrowUp className="w-4 h-4" /></button>
                              <button onClick={() => moveSlide(i, 'down')} className="p-1.5 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-colors"><ArrowDown className="w-4 h-4" /></button>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center font-black text-sm text-white/10 group-hover:text-blue-400 group-hover:border-blue-400/20 transition-all shadow-inner">
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-4">
                                <p className="text-base font-bold text-white/90 truncate tracking-tight">{slide.title}</p>
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                                  slide.type === 'narration' ? 'border-purple-500/40 text-purple-400 bg-purple-500/5 shadow-[0_0_10px_rgba(168,85,247,0.1)]' :
                                  slide.type === 'quiz' ? 'border-yellow-500/40 text-yellow-400 bg-yellow-500/5 shadow-[0_0_10px_rgba(234,179,8,0.1)]' :
                                  'border-blue-500/40 text-blue-400 bg-blue-500/5 shadow-[0_0_10px_rgba(59,130,246,0.1)]'
                                }`}>
                                  {slide.type}
                                </span>
                              </div>
                              <p className="text-[11px] text-white/20 mt-1.5 line-clamp-1 italic font-medium">"{slide.content || 'Video Asset Sequence'}"</p>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => setEditingSlide(slide)}
                                className="p-3.5 rounded-2xl bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all"
                              >
                                <Settings2 className="w-5 h-5" />
                              </button>
                              <button className="p-3.5 rounded-2xl bg-white/5 text-white/20 hover:text-red-400 hover:bg-red-400/5 transition-all">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </motion.div>
                        ))}

                        <button className="w-full py-12 rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-4 text-white/20 hover:text-white hover:border-white/20 transition-all group bg-white/[0.01]">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Plus className="w-6 h-6" />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-widest">Inject New Sequence Component</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-10">
                  <header>
                    <h2 className="text-4xl font-black tracking-tight">Platform Config</h2>
                    <p className="text-white/40 font-medium text-base italic">Global variables and engine tuning</p>
                  </header>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-7 space-y-8">
                      <section className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-8 shadow-2xl">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white/40 flex items-center gap-3">
                          <Activity className="w-5 h-5 text-blue-400" /> Voice Intelligence
                        </h3>
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="text-[11px] font-black text-white/20 uppercase tracking-widest ml-1">Default ElevenLabs Engine</label>
                            <div className="relative group">
                              <select className="w-full bg-black border border-white/10 rounded-3xl px-6 py-5 text-sm text-white focus:border-blue-500/50 outline-none appearance-none cursor-pointer group-hover:border-white/20 transition-all">
                                <option>The Strategist (Standard Output)</option>
                                <option>The Mentor (Empathetic Flow)</option>
                                <option>The CEO (Authoritative Command)</option>
                                <option>Personal Clone (Jacob V1.0)</option>
                              </select>
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                                <ArrowDown className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5">
                            <div className="space-y-1">
                              <p className="text-sm font-bold text-white/90">Auto-Sync Master Library</p>
                              <p className="text-[10px] text-white/30 font-medium">Sync new assets from production to user library instantly</p>
                            </div>
                            <div className="w-14 h-7 rounded-full bg-blue-600 relative p-1.5 cursor-pointer shadow-lg shadow-blue-600/20">
                              <div className="w-4 h-4 rounded-full bg-white absolute right-1.5" />
                            </div>
                          </div>
                        </div>
                      </section>

                      <section className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-8 shadow-2xl">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white/40 flex items-center gap-3">
                          <Zap className="w-5 h-5 text-blue-400" /> Interaction System
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: 'Accent Palette', val: 'Blue / Indigo', icon: Sparkles },
                            { label: 'Corner Radius', val: 'Super-Rounded (32px)', icon: Layout },
                            { label: 'Motion Physics', val: 'Spring (High Tension)', icon: Activity },
                            { label: 'Typography', val: 'Inter Black / Display', icon: Type },
                          ].map((item, i) => (
                            <button key={i} className="p-6 rounded-[2rem] bg-black/40 border border-white/5 text-left hover:border-white/20 transition-all group shadow-inner">
                              <item.icon className="w-5 h-5 text-white/10 group-hover:text-blue-400 mb-3 transition-colors" />
                              <p className="text-[10px] font-black uppercase text-white/20 mb-1">{item.label}</p>
                              <p className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">{item.val}</p>
                            </button>
                          ))}
                        </div>
                      </section>
                    </div>

                    <div className="lg:col-span-5 space-y-8">
                      <section className="p-10 rounded-[2.5rem] bg-red-500/5 border border-red-500/10 space-y-8 shadow-2xl shadow-red-900/5">
                        <h3 className="text-sm font-black uppercase tracking-widest text-red-400/60 flex items-center gap-3">
                          <AlertCircle className="w-5 h-5" /> Protocol Guard
                        </h3>
                        <div className="space-y-4">
                          <button className="w-full p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-left hover:bg-red-500/20 transition-all group">
                            <p className="text-sm font-black text-red-400">Emergency Maintenance</p>
                            <p className="text-[10px] text-red-400/40 mt-1 font-medium italic">Instantly locks access to the learning engine for all users</p>
                          </button>
                          <button className="w-full p-6 rounded-3xl border border-white/5 text-left hover:bg-white/5 transition-all group">
                            <p className="text-sm font-black text-white/60 group-hover:text-white">Flush Global Cache</p>
                            <p className="text-[10px] text-white/20 mt-1 font-medium">Forces all clients to refresh their protocol sequence data</p>
                          </button>
                          <button className="w-full p-6 rounded-3xl border border-white/5 text-left hover:bg-white/5 transition-all group">
                            <p className="text-sm font-black text-white/60 group-hover:text-white">Wipe User Input History</p>
                            <p className="text-[10px] text-white/20 mt-1 font-medium italic">Clears all personalized blueprint variables (Irreversible)</p>
                          </button>
                        </div>
                      </section>

                      <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center gap-4">
                        <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center">
                          <HelpCircle className="w-8 h-8 text-white/10" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-white/60">Documentation</p>
                          <p className="text-[10px] text-white/20 font-medium px-4">Mastering the Orchestrator and Curator workflows</p>
                        </div>
                        <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold hover:bg-white/10 transition-all mt-2">Open Guides</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Slide Editing Modal Overlay */}
      <AnimatePresence>
        {editingSlide && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#080808] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tight">Edit Component</h3>
                    <p className="text-xs text-white/30 font-bold uppercase tracking-widest">Slide ID: {editingSlide.id}</p>
                  </div>
                  <button onClick={() => setEditingSlide(null)} className="p-3 rounded-2xl bg-white/5 text-white/40 hover:text-white transition-all"><Plus className="w-6 h-6 rotate-45" /></button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Component Title</label>
                    <input 
                      type="text" 
                      value={editingSlide.title}
                      onChange={(e) => setEditingSlide({...editingSlide, title: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Core Content / Instruction</label>
                    <textarea 
                      value={editingSlide.content}
                      onChange={(e) => setEditingSlide({...editingSlide, content: e.target.value})}
                      className="w-full h-32 bg-black border border-white/10 rounded-2xl p-6 text-sm text-white focus:border-blue-500/50 outline-none transition-all resize-none shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Block Type</label>
                      <select 
                        value={editingSlide.type}
                        onChange={(e) => setEditingSlide({...editingSlide, type: e.target.value as any})}
                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500/50 outline-none appearance-none"
                      >
                        <option value="content">Content Block</option>
                        <option value="narration">Narration / Video</option>
                        <option value="quiz">Interactive Quiz</option>
                        <option value="poll">User Feedback</option>
                        <option value="reflection">Personal Reflection</option>
                        <option value="visual">Visual Data / Canvas</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Segment</label>
                      <select 
                        value={editingSlide.segment}
                        onChange={(e) => setEditingSlide({...editingSlide, segment: e.target.value as any})}
                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500/50 outline-none appearance-none"
                      >
                        <option value="hook">Phase 1: Hook</option>
                        <option value="learn">Phase 2: Learn</option>
                        <option value="practice">Phase 3: Practice</option>
                        <option value="apply">Phase 4: Apply</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setEditingSlide(null)}
                    className="flex-1 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 text-white/40 font-black hover:bg-white/10 transition-all"
                  >
                    Discard Changes
                  </button>
                  <button 
                    onClick={saveSlideChanges}
                    className="flex-1 py-5 rounded-[1.5rem] bg-blue-600 text-white font-black hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
                  >
                    Commit to Sequence
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


