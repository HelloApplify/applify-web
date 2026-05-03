"use client"
import React from 'react'
import { PlayCircle, Lock, Target, Layers } from 'lucide-react'
import StartTaskModal from '@/components/StartTaskModal'
import { useProtocolStore, Protocol } from '@/store/useProtocolStore'

const DUMMY_PROTOCOL: Protocol = {
  id: 'proto_1',
  title: 'Morning Baseline Execution',
  firstStepId: 'step_1',
  steps: {
    'step_1': {
      id: 'step_1',
      prompt: 'Did you wake up within 10 minutes of your target time?',
      options: [
        { label: 'Yes, hit the target.', nextStepId: 'step_2_good' },
        { label: 'No, snoozed or slept in.', nextStepId: 'step_2_bad' }
      ]
    },
    'step_2_good': {
      id: 'step_2_good',
      prompt: 'Excellent. Drink 16oz of water immediately. Did you complete this?',
      options: [
        { label: 'Hydration complete.', nextStepId: 'END' }
      ]
    },
    'step_2_bad': {
      id: 'step_2_bad',
      prompt: 'Recovery mode. Drink 16oz of water and expose eyes to sunlight for 5 minutes. Did you complete this?',
      options: [
        { label: 'Recovery complete.', nextStepId: 'END' }
      ]
    }
  }
}

export default function DashboardPage() {
  const startProtocol = useProtocolStore(state => state.startProtocol)

  return (
    <div className="max-w-5xl mx-auto">
      <StartTaskModal />
      
      <div className="mb-12">
        <h2 className="text-3xl font-medium text-white mb-2">Today's Protocols</h2>
        <p className="text-neutral-400">Execute your active nodes to maintain your Habit Stability Index.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Task Card */}
        <div className="bg-[#111111] border border-white/[0.1] rounded-2xl p-6 hover:border-emerald-500/50 transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
          
          <div className="flex justify-between items-start mb-16">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-medium text-neutral-300">
              Level 1
            </div>
          </div>

          <h3 className="text-xl font-medium text-white mb-2">Morning Baseline</h3>
          <p className="text-sm text-neutral-400 mb-6 line-clamp-2">
            Establish the biochemical foundation for deep work. Hydration and sunlight protocol.
          </p>

          <button 
            onClick={() => startProtocol(DUMMY_PROTOCOL)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-medium hover:bg-neutral-200 transition-colors group-hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlayCircle className="w-5 h-5" /> Execute Protocol
          </button>
        </div>

        {/* Locked Task Card */}
        <div className="bg-[#050505] border border-white/[0.05] rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center">
             <div className="w-12 h-12 bg-[#111] rounded-full border border-white/[0.1] flex items-center justify-center mb-3">
               <Lock className="w-5 h-5 text-neutral-500" />
             </div>
             <span className="text-sm font-medium text-neutral-400">Complete Level 1 to Unlock</span>
          </div>

          <div className="flex justify-between items-start mb-16 opacity-50">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Layers className="w-6 h-6 text-blue-400" />
            </div>
            <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-medium text-neutral-300">
              Level 2
            </div>
          </div>

          <h3 className="text-xl font-medium text-white mb-2 opacity-50">Deep Work Integration</h3>
          <p className="text-sm text-neutral-400 mb-6 opacity-50">
            90-minute unbroken focus block with contextual triggers.
          </p>

          <button disabled className="w-full py-3 rounded-xl bg-[#111] text-neutral-500 font-medium opacity-50">
            Execute Protocol
          </button>
        </div>
      </div>
    </div>
  )
}