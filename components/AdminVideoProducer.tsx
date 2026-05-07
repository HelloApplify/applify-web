"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, Wand2, Send, CheckCircle2, AlertCircle, Copy, ExternalLink } from 'lucide-react'

export default function AdminVideoProducer() {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [script, setScript] = useState('')
  const [imagePrompt, setImagePrompt] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [lastResponse, setLastResponse] = useState<any>(null)

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
        body: JSON.stringify({
          script,
          imagePrompt,
          timestamp: new Date().toISOString(),
          requestedBy: 'Applify Admin'
        })
      })
      
      if (response.ok) {
        setStatus('success')
        setLastResponse(await response.json())
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const copyJson = () => {
    const json = JSON.stringify({
      script: "Your video script here...",
      imagePrompt: "Your Midjourney prompt here...",
      timestamp: "2026-05-07T...",
      requestedBy: "Applify Admin"
    }, null, 2)
    navigator.clipboard.writeText(json)
    alert('JSON Structure copied! Paste this into Make.com "Determine Data Structure" settings.')
  }

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-10">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
            <Video className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Automated Video Producer</h1>
        </div>
        <p className="text-white/40 font-medium">Orchestrate ElevenLabs, Midjourney, and Creatomate via Make.com</p>
      </header>

      <div className="grid gap-8">
        {/* Step 1: Connectivity */}
        <section className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-[10px] flex items-center justify-center">1</span>
              Make.com Webhook
            </h2>
            <button onClick={copyJson} className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors">
              <Copy className="w-3 h-3" /> Copy JSON Structure
            </button>
          </div>
          <input 
            type="text" 
            placeholder="https://hook.us1.make.com/..." 
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none transition-all font-mono"
          />
          <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
            Create a "Custom Webhook" in Make.com and paste the URL here.
          </p>
        </section>

        {/* Step 2: Content */}
        <section className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-500 text-[10px] flex items-center justify-center">2</span>
            Production Data
          </h2>
          
          <div className="space-y-2">
            <label className="text-xs font-black text-white/30 uppercase tracking-widest">Video Script (ElevenLabs)</label>
            <textarea 
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Paste the narration text here..."
              className="w-full h-32 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-white/30 uppercase tracking-widest">Visual Prompt (Midjourney/DALL-E)</label>
            <textarea 
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="Describe the cartoon scene..."
              className="w-full h-24 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none transition-all resize-none"
            />
          </div>

          <button 
            onClick={handleTrigger}
            disabled={status === 'sending'}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-white/20 text-white font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]"
          >
            {status === 'sending' ? (
              <span className="flex items-center gap-2 animate-pulse">
                <Wand2 className="w-5 h-5 animate-spin" /> Triggering Workflow...
              </span>
            ) : (
              <>
                <Send className="w-5 h-5" /> Trigger Make.com Automation
              </>
            )}
          </button>

          {status === 'success' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
              <div>
                <p className="text-emerald-400 font-bold text-sm">Workflow Triggered!</p>
                <p className="text-emerald-400/60 text-xs mt-1">Check your Make.com scenario for status.</p>
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="text-red-400 font-bold text-sm">Trigger Failed</p>
                <p className="text-red-400/60 text-xs mt-1">Check your Webhook URL and internet connection.</p>
              </div>
            </div>
          )}
        </section>

        {/* Help Links */}
        <div className="grid grid-cols-2 gap-4">
          <a href="https://www.make.com/" target="_blank" className="p-4 rounded-2xl bg-white/2 hover:bg-white/5 border border-white/5 transition-colors flex items-center justify-between group">
            <span className="text-sm font-bold text-white/50 group-hover:text-white">Make.com Dashboard</span>
            <ExternalLink className="w-4 h-4 text-white/20" />
          </a>
          <a href="https://creatomate.com/" target="_blank" className="p-4 rounded-2xl bg-white/2 hover:bg-white/5 border border-white/5 transition-colors flex items-center justify-between group">
            <span className="text-sm font-bold text-white/50 group-hover:text-white">Creatomate Editor</span>
            <ExternalLink className="w-4 h-4 text-white/20" />
          </a>
        </div>
      </div>
    </div>
  )
}
