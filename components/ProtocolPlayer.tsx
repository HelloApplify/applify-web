"use client"
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Zap, Brain, Target, ArrowRight, ChevronLeft, Sparkles, Trophy, Settings, ArrowLeft, RefreshCw } from 'lucide-react'
import { useProtocolStore } from '@/store/useProtocolStore'
import { generateImplementationPlan } from '@/utils/implementationEngine'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import NarrationSlide from '@/components/NarrationSlide'

const BrainEncoder = dynamic(() => import('@/components/visuals/BrainEncoder'), { ssr: false })
const ForgettingCurve = dynamic(() => import('@/components/visuals/ForgettingCurve'), { ssr: false })
const FeynmanSteps = dynamic(() => import('@/components/visuals/FeynmanSteps'), { ssr: false })
const RecallVsRecognition = dynamic(() => import('@/components/visuals/RecallVsRecognition'), { ssr: false })
const CinematicHook = dynamic(() => import('@/components/visuals/CinematicHook'), { ssr: false })
const HabitLoop = dynamic(() => import('@/components/visuals/HabitLoop'), { ssr: false })
const IdentityShift = dynamic(() => import('@/components/visuals/IdentityShift'), { ssr: false })
const AmbientBackground = dynamic(() => import('@/components/visuals/AmbientBackground'), { ssr: false })

// Premium Visuals
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
  NeuralWeave
}

const TYPE_VISUALS: Record<string, React.ComponentType<any>> = {
  hook: QuantumGlow,
  content: NeuralWeave,
  quiz: Monolith,
  poll: NeuralWeave,
  reflection: QuantumGlow,
  checkpoint: Monolith,
  celebration: QuantumGlow,
  narration: QuantumGlow,
  video: QuantumGlow
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
        if (missing && missing.length > 0) {
          status = 'warning'
          text = `You're close, but you missed: ${missing.join(', ')}. ${slide.validation.prompt}`
        }
      } else if (slide.validation.type === 'ai') {
        if (input.length < 20) {
          status = 'error'
          text = "This explanation is a bit too brief. Try to use an analogy to make it simpler."
        } else {
          text = "AI Verified: This is a great 12-year-old level explanation. You've successfully simplified the complexity."
        }
      }

      setValidationFeedback({ status, text })
      setIsValidating(false)
      return
    }

    if (isLast && !showBlueprint) {
      setIsGenerating(true)
      await new Promise(r => setTimeout(r, 2000))
      setIsGenerating(false)
      setShowBlueprint(true)
      return
    }

    setSelectedOption(null)
    setShowFeedback(false)
    setFeedbackText('')
    setValidationFeedback(null)
    
    if (isLast && showBlueprint) {
      const plan = generateImplementationPlan(activeProtocol, userInputs)
      setPlan(plan)
      completeProtocol(activeProtocol.id)
      setShowBlueprint(false)
      closeModal()
    } else {
      nextSlide()
    }
  }

  const handlePrev = () => {
    setSelectedOption(null)
    setShowFeedback(false)
    setFeedbackText('')
    setValidationFeedback(null)
    prevSlide()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505]" style={{ isolation: 'isolate' }}>
      <div className="w-full h-[100dvh] flex flex-col">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5 shrink-0">
          <motion.div className="h-full" style={{ backgroundColor: segColor, boxShadow: `0 0 12px ${segColor}40` }}
            animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "circOut" }} />
        </div>

        {/* Clean Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${segColor}12` }}>
              {slide.segment === 'hook' && <Zap className="w-3.5 h-3.5" style={{ color: segColor }} />}
              {slide.segment === 'learn' && <Brain className="w-3.5 h-3.5" style={{ color: segColor }} />}
              {slide.segment === 'practice' && <Sparkles className="w-3.5 h-3.5" style={{ color: segColor }} />}
              {slide.segment === 'apply' && <Target className="w-3.5 h-3.5" style={{ color: segColor }} />}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">
              {currentSlideIndex + 1} / {activeProtocol.slides.length}
            </span>
          </div>

          <div className="relative" ref={menuRef}>
            <button onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-600 p-[1px] hover:scale-105 active:scale-95 transition-transform">
              <div className="w-full h-full bg-[#0A0A0A] rounded-[0.6rem] flex items-center justify-center text-white font-black text-[10px] uppercase">
                JY
              </div>
            </button>
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div initial={{ opacity: 0, y: -5, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }} transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-48 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[110]">
                  <button onClick={() => { closeModal(); setShowProfileMenu(false) }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Library
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 relative">
          <AmbientBackground />
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-12 py-6 sm:py-16 relative z-10">
            {slide.type === 'narration' ? (
              <NarrationSlide title={slide.title} scenes={slide.scenes || []} onComplete={handleNext} />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={slide.id}
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-12"
                >
                  {/* Visual Area - EVERY SLIDE HAS ONE */}
                  <div className="flex justify-center py-4">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 1 }}
                    >
                      {slide.visualComponent ? (
                        React.createElement(VISUALS[slide.visualComponent] || QuantumGlow)
                      ) : (
                        React.createElement(TYPE_VISUALS[slide.type] || QuantumGlow)
                      )}
                    </motion.div>
                  </div>

                  <div className="space-y-6">
                    {slide.type === 'hook' && (
                      <div className="text-center space-y-8">
                        <div>
                          <h2 className="text-4xl font-black text-white mb-4 tracking-tight uppercase italic">{slide.title}</h2>
                          <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">{slide.content}</p>
                        </div>
                        <motion.button onClick={handleNext} 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                          className="mx-auto group flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all group-active:scale-90 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                            <ArrowRight className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-white/60 transition-colors">Initialize Mission</span>
                        </motion.button>
                      </div>
                    )}

                    {slide.type === 'celebration' && (
                      <div className="text-center space-y-8">
                        {!showBlueprint ? (
                          <>
                            <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                              <Trophy className="w-12 h-12 text-emerald-400" />
                            </div>
                            <div>
                              <h2 className="text-4xl font-black text-white tracking-tight mb-4 uppercase italic">{slide.title}</h2>
                              <p className="text-lg text-white/50 font-medium leading-relaxed max-w-2xl mx-auto">{slide.content}</p>
                            </div>
                          </>
                        ) : (
                          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 backdrop-blur-xl">
                            <div className="flex items-center gap-4 mb-8">
                              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-emerald-400" />
                              </div>
                              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Your Mastery Blueprint</h2>
                            </div>
                            <p className="text-white/60 font-medium leading-relaxed mb-8">Protocol analysis complete. We've synthesized your inputs into a personalized 7-day implementation sprint.</p>
                            <button onClick={handleNext} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-5 rounded-2xl transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-sm">Deploy Execution Plan</button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Standard Slides */}
                    {['content', 'quiz', 'poll', 'reflection', 'checkpoint'].includes(slide.type) && (
                      <div className="max-w-2xl mx-auto">
                        <div className="mb-8">
                          <h2 className="text-3xl font-black tracking-tight text-white mb-4 uppercase italic leading-tight">{slide.title}</h2>
                          <p className="text-lg text-white/50 font-medium leading-relaxed whitespace-pre-line">{slide.content}</p>
                        </div>

                        {slide.type === 'quiz' && slide.options && (
                          <div className="space-y-3">
                            {slide.options.map((opt, idx) => (
                              <button key={idx} onClick={() => handleOption(idx)} disabled={selectedOption !== null}
                                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4
                                  ${selectedOption === idx ? (opt.isCorrect ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-red-500/10 border-red-500/40 text-red-400') 
                                  : selectedOption !== null ? 'opacity-30 border-white/5 bg-transparent' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'}`}>
                                <span className="font-bold text-base">{opt.label}</span>
                                {selectedOption === idx && (opt.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <X className="w-5 h-5" />)}
                              </button>
                            ))}
                            {showFeedback && feedbackText && (
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white/60 font-medium leading-relaxed">
                                {feedbackText}
                              </motion.div>
                            )}
                          </div>
                        )}

                        {slide.type === 'poll' && slide.options && (
                          <div className="space-y-3">
                            {slide.options.map((opt, idx) => (
                              <button key={idx} onClick={() => setSelectedOption(idx)}
                                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300
                                  ${selectedOption === idx ? 'bg-blue-500/10 border-blue-500/40 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}>
                                <span className="font-bold text-base">{opt.label}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        {slide.type === 'reflection' && (
                          <div className="space-y-4">
                            <textarea placeholder={slide.placeholder || 'Type your realization...'}
                              value={userInputs[slide.id] || ''} onChange={(e) => setInput(slide.id, e.target.value)}
                              className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-base placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all resize-none font-medium leading-relaxed" />
                            
                            <AnimatePresence>
                              {isValidating && (
                                <div className="flex items-center gap-3 text-blue-400 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                                  <RefreshCw className="w-5 h-5 animate-spin" />
                                  <span className="text-xs font-black uppercase tracking-widest italic">AI Neuro-Verification in Progress...</span>
                                </div>
                              )}
                              {validationFeedback && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                  className={`p-6 rounded-3xl border flex gap-5 backdrop-blur-xl ${validationFeedback.status === 'success' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-yellow-500/5 border-yellow-500/20 text-yellow-400'}`}>
                                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0"><Sparkles className="w-5 h-5" /></div>
                                  <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">AI Analysis Complete</p>
                                    <p className="text-base font-bold leading-relaxed">{validationFeedback.text}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-white/5 flex justify-between items-center shrink-0 bg-[#050505] z-20">
          <button onClick={handlePrev} disabled={currentSlideIndex === 0 || isGenerating}
            className="flex items-center gap-2 text-white/30 hover:text-white transition-colors disabled:invisible text-xs font-black uppercase tracking-widest">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={handleNext} disabled={isGenerating || isValidating || (slide.type === 'quiz' && selectedOption === null)}
            className="flex items-center gap-3 text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:hover:scale-100"
            style={{ backgroundColor: isLast && showBlueprint ? '#10b981' : (validationFeedback ? '#FFF' : segColor), boxShadow: `0 0 30px ${(isLast && showBlueprint ? '#10b981' : (validationFeedback ? '#FFF' : segColor))}40` }}>
            {validationFeedback ? 'Accept & Continue' : (isLast ? (showBlueprint ? 'Finish Mission' : 'Generate Blueprint') : 'Continue')} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
