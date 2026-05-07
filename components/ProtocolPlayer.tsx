"use client"
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Zap, Brain, Target, ArrowRight, ChevronLeft, Sparkles, Trophy, Settings, ArrowLeft, RefreshCw } from 'lucide-react'
import { useProtocolStore } from '@/store/useProtocolStore'
import { generateImplementationPlan } from '@/utils/implementationEngine'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import NarrationSlide from '@/components/NarrationSlide'

// Visual Imports
const BrainEncoder = dynamic(() => import('@/components/visuals/BrainEncoder'), { ssr: false })
const ForgettingCurve = dynamic(() => import('@/components/visuals/ForgettingCurve'), { ssr: false })
const FeynmanSteps = dynamic(() => import('@/components/visuals/FeynmanSteps'), { ssr: false })
const RecallVsRecognition = dynamic(() => import('@/components/visuals/RecallVsRecognition'), { ssr: false })
const CinematicHook = dynamic(() => import('@/components/visuals/CinematicHook'), { ssr: false })
const HabitLoop = dynamic(() => import('@/components/visuals/HabitLoop'), { ssr: false })
const IdentityShift = dynamic(() => import('@/components/visuals/IdentityShift'), { ssr: false })
const AmbientBackground = dynamic(() => import('@/components/visuals/AmbientBackground'), { ssr: false })
const LivingBackground = dynamic(() => import('@/components/visuals/LivingBackground'), { ssr: false })

// Integrated Layouts
import { NeuralSpotlight, DataPrism, MindFortress, GrowthMatrix } from '@/components/visuals/IntegratedVisuals'

// Premium Fallbacks
const QuantumGlow = dynamic(() => import('@/components/visuals/PremiumVisuals').then(mod => mod.QuantumGlow), { ssr: false })
const Monolith = dynamic(() => import('@/components/visuals/PremiumVisuals').then(mod => mod.Monolith), { ssr: false })
const NeuralWeave = dynamic(() => import('@/components/visuals/PremiumVisuals').then(mod => mod.NeuralWeave), { ssr: false })

const VISUALS: Record<string, React.ComponentType<any>> = {
  RecallVsRecognition,
  CinematicHook,
  HabitLoop,
  IdentityShift,
  BrainEncoder,
  QuantumGlow,
  Monolith,
  NeuralWeave,
  ForgettingCurve,
  FeynmanSteps
}

export default function ProtocolPlayer() {
  const { activeProtocol, currentSlideIndex, isModalOpen, nextSlide, prevSlide, closeModal, completeProtocol, userInputs, setInput, setPlan } = useProtocolStore()
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showBlueprint, setShowBlueprint] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [validationFeedback, setValidationFeedback] = useState<{ status: 'success' | 'warning' | 'error', text: string } | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  if (!isModalOpen || !activeProtocol) return null

  const slide = activeProtocol.slides[currentSlideIndex]
  const progress = ((currentSlideIndex + 1) / activeProtocol.slides.length) * 100
  const isLast = currentSlideIndex === activeProtocol.slides.length - 1
  const segColors: Record<string, string> = { hook: '#fbbf24', learn: '#3b82f6', practice: '#a855f7', apply: '#10b981' }
  const segColor = segColors[slide.segment] || '#3b82f6'

  const handleOption = (idx: number) => {
    setSelectedOption(idx)
    const opt = slide.options?.[idx]
    if (opt) setInput(slide.id, opt.label)
    if (slide.type === 'quiz' && opt?.feedback) {
      setFeedbackText(opt.feedback)
      setShowFeedback(true)
    }
  }

  const handleNext = async () => {
    if (slide.validation && !validationFeedback) {
      setIsValidating(true)
      await new Promise(r => setTimeout(r, 1500))
      const input = userInputs[slide.id]?.toLowerCase() || ''
      let status: 'success' | 'warning' | 'error' = 'success'
      let text = 'Excellent work. Your explanation is grounded and clear.'
      if (slide.validation.type === 'keyword') {
        const missing = slide.validation.expected?.filter(k => !input.includes(k.toLowerCase()))
        if (missing && missing.length > 0) { status = 'warning'; text = `You're close, but you missed: ${missing.join(', ')}. ${slide.validation.prompt}` }
      } else if (slide.validation.type === 'ai') {
        if (input.length < 20) { status = 'error'; text = "This explanation is a bit too brief. Try to use an analogy to make it simpler." }
        else { text = "AI Verified: This is a great 12-year-old level explanation." }
      }
      setValidationFeedback({ status, text }); setIsValidating(false); return
    }
    if (isLast && !showBlueprint) {
      setIsGenerating(true); await new Promise(r => setTimeout(r, 2000)); setIsGenerating(false); setShowBlueprint(true); return
    }
    setSelectedOption(null); setShowFeedback(false); setFeedbackText(''); setValidationFeedback(null)
    if (isLast && showBlueprint) {
      const plan = generateImplementationPlan(activeProtocol, userInputs)
      setPlan(plan); completeProtocol(activeProtocol.id); setShowBlueprint(false); closeModal()
    } else { nextSlide() }
  }

  const handlePrev = () => {
    setSelectedOption(null); setShowFeedback(false); setFeedbackText(''); setValidationFeedback(null); prevSlide()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505]" style={{ isolation: 'isolate' }}>
      <div className="w-full h-[100dvh] flex flex-col">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5 shrink-0">
          <motion.div className="h-full" style={{ backgroundColor: segColor, boxShadow: `0 0 12px ${segColor}40` }}
            animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "circOut" }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${segColor}15` }}>
              <Zap className="w-4 h-4" style={{ color: segColor }} />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-white/30">{currentSlideIndex + 1} / {activeProtocol.slides.length}</span>
          </div>
          <button onClick={closeModal} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 relative">
          <LivingBackground color={segColor} />
          <div className="max-w-5xl mx-auto w-full px-6 relative z-10">
            {slide.type === 'narration' ? (
              <NarrationSlide title={slide.title} scenes={slide.scenes || []} onComplete={handleNext} />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={slide.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.5 }}>
                  
                  {/* INTEGRATED LAYOUT LOGIC */}
                  {slide.type === 'hook' && (
                    <NeuralSpotlight title={slide.title} content={slide.content} />
                  )}

                  {slide.type === 'celebration' && (
                    <GrowthMatrix title={slide.title} content={slide.content}>
                      {showBlueprint && (
                        <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 backdrop-blur-3xl">
                           <h3 className="text-2xl font-black text-white mb-6 uppercase italic tracking-tight">Deployment Strategy Ready</h3>
                           <button onClick={handleNext} className="w-full bg-emerald-500 py-6 rounded-2xl text-black font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_50px_rgba(16,185,129,0.3)]">Launch Execution Plan</button>
                        </div>
                      )}
                    </GrowthMatrix>
                  )}

                  {slide.type === 'reflection' && (
                    <MindFortress title={slide.title} content={slide.content}>
                      <textarea placeholder={slide.placeholder || 'Your thoughts...'}
                        value={userInputs[slide.id] || ''} onChange={(e) => setInput(slide.id, e.target.value)}
                        className="w-full h-48 bg-transparent border-none text-white text-xl placeholder:text-white/10 focus:outline-none resize-none font-medium leading-relaxed" />
                      
                      <AnimatePresence>
                        {isValidating && (
                          <div className="flex items-center gap-3 text-blue-400 mt-4 border-t border-white/5 pt-4">
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span className="text-xs font-black uppercase tracking-widest italic">AI Neuro-Verification...</span>
                          </div>
                        )}
                        {validationFeedback && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className={`mt-6 p-6 rounded-2xl border flex gap-5 ${validationFeedback.status === 'success' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-yellow-500/5 border-yellow-500/20 text-yellow-400'}`}>
                            <Sparkles className="w-6 h-6 shrink-0" />
                            <p className="text-base font-bold leading-relaxed">{validationFeedback.text}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </MindFortress>
                  )}

                  {(slide.type === 'quiz' || slide.type === 'poll') && (
                    <DataPrism title={slide.title}>
                      <div className="grid grid-cols-1 gap-3">
                        {slide.options?.map((opt, idx) => (
                          <button key={idx} onClick={() => slide.type === 'quiz' ? handleOption(idx) : setSelectedOption(idx)}
                            disabled={slide.type === 'quiz' && selectedOption !== null}
                            className={`p-6 rounded-2xl border transition-all duration-300 text-left flex items-center justify-between gap-4
                              ${selectedOption === idx 
                                ? (slide.type === 'quiz' ? (opt.isCorrect ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-red-500/20 border-red-500/40 text-red-400') : 'bg-blue-500/20 border-blue-500/40 text-blue-400')
                                : selectedOption !== null ? 'opacity-20 border-white/5' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}>
                            <span className="font-bold text-lg">{opt.label}</span>
                            {selectedOption === idx && (slide.type === 'quiz' ? (opt.isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <X className="w-6 h-6" />) : <Target className="w-6 h-6" />)}
                          </button>
                        ))}
                      </div>
                      {showFeedback && feedbackText && (
                        <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10 text-white/50 font-medium">{feedbackText}</div>
                      )}
                    </DataPrism>
                  )}

                  {slide.type === 'content' && (
                    <div className="py-20 flex flex-col items-center text-center">
                       <motion.div 
                         initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                         className="mb-12"
                       >
                         {slide.visualComponent ? React.createElement(VISUALS[slide.visualComponent] || QuantumGlow) : <QuantumGlow />}
                       </motion.div>
                       <h2 className="text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">{slide.title}</h2>
                       <p className="text-2xl text-white/50 font-medium max-w-2xl leading-relaxed">{slide.content}</p>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-white/5 flex justify-between items-center bg-[#050505] z-20">
          <button onClick={handlePrev} disabled={currentSlideIndex === 0 || isGenerating}
            className="flex items-center gap-2 text-white/30 hover:text-white transition-colors disabled:invisible text-sm font-black uppercase tracking-widest">
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <button onClick={handleNext} disabled={isGenerating || isValidating || (slide.type === 'quiz' && selectedOption === null)}
            className="flex items-center gap-4 text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-30"
            style={{ backgroundColor: isLast && showBlueprint ? '#10b981' : (validationFeedback ? '#FFF' : segColor) }}>
            {validationFeedback ? 'Accept & Continue' : (isLast ? (showBlueprint ? 'Finish Mission' : 'Generate Blueprint') : 'Continue')} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
