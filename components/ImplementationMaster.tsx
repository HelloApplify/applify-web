"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, Calendar, CheckCircle2, Circle, Sparkles, 
  Brain, Zap, ArrowRight, ShieldCheck, Clock, RefreshCw 
} from 'lucide-react'
import { useProtocolStore } from '@/store/useProtocolStore'

export default function ImplementationMaster() {
  const { activePlan, toggleStep } = useProtocolStore()

  if (!activePlan) return null

  const completedSteps = activePlan.steps.filter(s => s.completed).length
  const progress = (completedSteps / activePlan.steps.length) * 100

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight uppercase italic">Active Deployment</h3>
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Deployment Phase: Implementation</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Protocol</p>
            <p className="text-xs font-bold text-white/60">{activePlan.protocolTitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Master Overview */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Target className="w-20 h-20" />
            </div>
            
            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Primary Objective</p>
            <h4 className="text-2xl font-black text-white leading-tight mb-6">
              Mastering {activePlan.userGoal}
            </h4>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] font-black text-white/20 uppercase">Deployment Progress</p>
                  <p className="text-xs font-black text-emerald-400">{Math.round(progress)}%</p>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
                  <p className="text-[9px] font-black text-white/20 uppercase">Completed</p>
                  <p className="text-lg font-black text-white">{completedSteps}</p>
                </div>
                <div className="flex-1 p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
                  <p className="text-[9px] font-black text-white/20 uppercase">Remaining</p>
                  <p className="text-lg font-black text-white/40">{activePlan.steps.length - completedSteps}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
            <h5 className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Brain className="w-3.5 h-3.5 text-blue-400" /> Mastery Analogy
            </h5>
            <p className="text-xs font-medium text-white/60 leading-relaxed italic">
              "{activePlan.feynmanAnalogy || "The struggle you feel during recall is the moment of growth. Don't look at the answers until you've sat with the silence for 30 seconds."}"
            </p>
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="lg:col-span-8 space-y-3">
          {activePlan.steps.map((step, i) => (
            <motion.button
              key={i}
              onClick={() => toggleStep(step.day)}
              whileHover={{ x: 4 }}
              className={`w-full p-6 rounded-[2rem] border text-left transition-all relative overflow-hidden flex items-center gap-6
                ${step.completed 
                  ? 'bg-emerald-500/5 border-emerald-500/20 opacity-60' 
                  : 'bg-white/[0.03] border-white/5 hover:border-white/20 shadow-xl'
                }
              `}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 transition-all
                ${step.completed 
                  ? 'bg-emerald-500 border-emerald-500 text-black' 
                  : 'bg-white/5 border-white/10 text-white/20'
                }
              `}>
                {step.completed ? <CheckCircle2 className="w-6 h-6" /> : <p className="text-xs font-black">D{step.day}</p>}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className={`text-sm font-black tracking-tight ${step.completed ? 'text-white/40 line-through' : 'text-white'}`}>
                    {step.title}
                  </p>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border
                    ${step.type === 'recall' ? 'border-blue-500/30 text-blue-400' : 
                      step.type === 'mastery' ? 'border-purple-500/30 text-purple-400' :
                      'border-emerald-500/30 text-emerald-400'}
                  `}>
                    {step.type}
                  </span>
                </div>
                <p className={`text-xs font-medium leading-relaxed truncate ${step.completed ? 'text-white/20' : 'text-white/40'}`}>
                  {step.description}
                </p>
              </div>

              {!step.completed && (
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase group-hover:text-white transition-colors">
                  Deploy
                </div>
              )}
            </motion.button>
          ))}
          
          <button className="w-full py-6 rounded-[2rem] border-2 border-dashed border-white/5 flex items-center justify-center gap-3 text-white/10 hover:text-white/30 hover:border-white/10 transition-all">
            <Clock className="w-4 h-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Next step unlocks at 06:00 AM</p>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
