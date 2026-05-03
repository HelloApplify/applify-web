"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { useProtocolStore } from '@/store/useProtocolStore'

export default function StartTaskModal() {
  const { activeProtocol, currentStepId, isModalOpen, advanceStep, closeModal } = useProtocolStore()

  if (!isModalOpen || !activeProtocol || !currentStepId) return null

  const isCompleted = currentStepId === 'END'
  const currentStep = isCompleted ? null : activeProtocol.steps[currentStepId]

  const handleFinish = async () => {
    // Here we will trigger Supabase update to record Mastery
    // For now, close modal
    closeModal()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-[#0A0A0A] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/[0.05] flex justify-between items-center bg-[#111111]">
            <h3 className="text-lg font-medium text-white">{activeProtocol.title}</h3>
            <button onClick={closeModal} className="text-neutral-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div key="completed" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-medium text-white mb-2">Protocol Executed</h4>
                  <p className="text-neutral-400 mb-8">Your Habit Stability Index has increased.</p>
                  <button onClick={handleFinish} className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-neutral-200 transition-colors">
                    Return to Dashboard
                  </button>
                </motion.div>
              ) : (
                <motion.div key={currentStepId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h4 className="text-2xl font-medium text-white mb-8 leading-relaxed">
                    {currentStep?.prompt}
                  </h4>
                  <div className="flex flex-col gap-3">
                    {currentStep?.options.map((opt, idx) => (
                      <button 
                        key={idx}
                        onClick={() => advanceStep(opt.nextStepId)}
                        className="w-full text-left px-6 py-4 rounded-xl border border-white/[0.1] bg-[#111] hover:bg-white/[0.05] hover:border-white/[0.2] transition-all text-neutral-300 hover:text-white"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}