"use client"
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Zap, Brain, Target, ArrowRight, ChevronLeft, Sparkles, Trophy, Settings, ArrowLeft } from 'lucide-react'
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

const VISUALS: Record<string, React.ComponentType<any>> = {
  BrainEncoder, ForgettingCurve, FeynmanSteps, RecallVsRecognition, 
  CinematicHook, HabitLoop, IdentityShift
}

export default function ProtocolPlayer() {
  const { activeProtocol, currentSlideIndex, isModalOpen, nextSlide, prevSlide, closeModal, completeProtocol, userInputs, setInput, setPlan } = useProtocolStore()
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showBlueprint, setShowBlueprint] = useState(false)
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
    if (isLast && !showBlueprint) {
      setIsGenerating(true)
      // Simulate AI generating a personalized plan based on userInputs
      await new Promise(r => setTimeout(r, 2000))
      setIsGenerating(false)
      setShowBlueprint(true)
      return
    }

    setSelectedOption(null)
    setShowFeedback(false)
    setFeedbackText('')
    
    if (isLast && showBlueprint) {
      // Generate the official implementation plan for the dashboard
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
    prevSlide()
  }

  const VisualComp = slide.visualComponent ? VISUALS[slide.visualComponent] : null

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
          {/* Left: segment + slide count */}
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

          {/* Right: Profile Avatar */}
          <div className="relative" ref={menuRef}>
            <button onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-600 p-[1px] hover:scale-105 active:scale-95 transition-transform">
              <div className="w-full h-full bg-[#0A0A0A] rounded-[0.6rem] flex items-center justify-center text-white font-black text-[10px] uppercase">
                JY
              </div>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div initial={{ opacity: 0, y: -5, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }} transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-48 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[110]">
                  <button onClick={() => { closeModal(); setShowProfileMenu(false) }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Library
                  </button>
                  <Link href="/settings" onClick={() => { closeModal(); setShowProfileMenu(false) }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 relative">
          <AmbientBackground />
          <div className="max-w-lg mx-auto w-full px-5 sm:px-8 py-6 sm:py-10 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div key={slide.id}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>

                {/* Cinematic Hook */}
                {slide.type === 'hook' && (
                  <div className="space-y-8">
                    <CinematicHook title={slide.title} subtitle={slide.content} />
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                      className="flex justify-center"
                    >
                      <button onClick={handleNext} className="group flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Initialize Protocol</span>
                      </button>
                    </motion.div>
                  </div>
                )}

                {/* Celebration & Blueprint */}
                {slide.type === 'celebration' && (
                  <div className="space-y-8">
                    {!showBlueprint ? (
                      <div className="text-center py-8">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                          className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                          <Trophy className="w-10 h-10 text-emerald-400" />
                        </motion.div>
                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">{slide.title}</h2>
                        <p className="text-base text-white/50 font-medium leading-relaxed whitespace-pre-line">{slide.content}</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                            <Target className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-white tracking-tight">Your Applied Blueprint</h3>
                            <p className="text-xs font-bold text-emerald-400/70 uppercase tracking-widest">Personalized Strategy</p>
                          </div>
                        </div>

                        <div className="grid gap-4">
                          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                            <h4 className="text-xs font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
                              <Brain className="w-3 h-3" /> Core Focus
                            </h4>
                            <p className="text-white font-bold leading-relaxed">
                              You are mastering <span className="text-emerald-400">"{userInputs['a2'] || 'Applied Cognition'}"</span> using Active Recall.
                            </p>
                          </div>

                          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                            <h4 className="text-xs font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
                              <Zap className="w-3 h-3" /> Tomorrow's Recall Trigger
                            </h4>
                            <div className="p-3 rounded-lg bg-black/40 border border-white/5 italic text-white/70 text-sm">
                              "{userInputs['a3'] || 'What is the most important concept I learned today?'}"
                            </div>
                          </div>

                          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                            <h4 className="text-xs font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
                              <Sparkles className="w-3 h-3" /> 7-Day Schedule
                            </h4>
                            <div className="space-y-2">
                              {[
                                { day: 'Day 1', task: 'First Recall Trigger (Active)', time: userInputs['a4'] || 'Tomorrow morning' },
                                { day: 'Day 3', task: 'Feynman Technique (Teach)', time: '3 days from now' },
                                { day: 'Day 7', task: 'Mastery Checkpoint', time: '7 days from now' }
                              ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                  <span className="font-bold text-white/40">{item.day}</span>
                                  <span className="font-medium text-white/70">{item.task}</span>
                                  <span className="text-[10px] font-black uppercase text-emerald-400/50">{item.time}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-center text-[10px] font-medium text-white/20 uppercase tracking-[0.2em] pt-4">
                          Blueprint saved to your Knowledge Vault
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Loading State */}
                {isGenerating && (
                  <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
                    <div className="relative">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 rounded-full border-2 border-emerald-500/20 border-t-emerald-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white tracking-tight">Synthesizing Blueprint...</h3>
                      <p className="text-sm font-medium text-white/40 mt-1">Catering the protocol to your specific goals</p>
                    </div>
                  </div>
                ) || (
                  <>
                    {/* Checkpoint */}
                    {slide.type === 'checkpoint' && (
                      <div className="text-center py-6">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                          className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${segColor}15`, border: `1px solid ${segColor}30` }}>
                          <CheckCircle2 className="w-8 h-8" style={{ color: segColor }} />
                        </motion.div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">{slide.title}</h2>
                        <p className="text-base text-white/50 font-medium leading-relaxed whitespace-pre-line">{slide.content}</p>
                      </div>
                    )}

                    {/* Narration */}
                    {slide.type === 'narration' && (
                      <NarrationSlide 
                        scenes={slide.scenes || []} 
                        onComplete={handleNext}
                        title={slide.title}
                      />
                    )}
                  </>
                )}

                {/* Video */}
                {slide.type === 'video' && slide.videoUrl && (
                  <div className="w-full">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-6 leading-tight text-center">
                      {slide.title}
                    </h2>
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
                      {slide.videoUrl.includes('youtube.com') || slide.videoUrl.includes('youtu.be') ? (
                        <iframe
                          src={slide.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video src={slide.videoUrl} controls className="absolute inset-0 w-full h-full object-cover" />
                      )}
                    </div>
                    {slide.content && (
                      <p className="mt-6 text-base text-white/50 font-medium leading-relaxed">
                        {slide.content}
                      </p>
                    )}
                  </div>
                )}

                {/* Content / Quiz / Poll / Reflection / Visual */}
                {!['celebration', 'checkpoint', 'narration', 'video', 'hook'].includes(slide.type) && (
                  <>
                    <div className="mb-8">
                      {VisualComp ? (
                        <div className="relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 p-6 shadow-2xl">
                          <VisualComp />
                        </div>
                      ) : (
                        <div className="flex justify-center py-6">
                           <motion.div 
                             animate={{ 
                               scale: [1, 1.1, 1],
                               rotate: [0, 5, -5, 0] 
                             }}
                             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                             className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 flex items-center justify-center"
                           >
                             {slide.segment === 'hook' && <Zap className="w-8 h-8 text-yellow-400" />}
                             {slide.segment === 'learn' && <Brain className="w-8 h-8 text-blue-400" />}
                             {slide.segment === 'practice' && <Sparkles className="w-8 h-8 text-purple-400" />}
                             {slide.segment === 'apply' && <Target className="w-8 h-8 text-emerald-400" />}
                           </motion.div>
                        </div>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-base sm:text-lg text-white/50 font-medium leading-relaxed whitespace-pre-line mb-8">
                      {slide.content}
                    </p>


                    {/* Quiz Options */}
                    {(slide.type === 'quiz') && slide.options && (
                      <div className="flex flex-col gap-2.5 mt-4">
                        {slide.options.map((opt, idx) => {
                          const selected = selectedOption === idx
                          const correct = opt.isCorrect
                          return (
                            <button key={idx} onClick={() => handleOption(idx)}
                              disabled={selectedOption !== null}
                              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3
                                ${selected
                                  ? (correct ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-red-500/10 border-red-500/40 text-red-400')
                                  : selectedOption !== null ? 'bg-white/[0.02] border-white/5 text-white/30 opacity-50' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 active:scale-[0.98]'
                                }`}>
                              <span className="font-bold text-sm leading-snug">{opt.label}</span>
                              {selected && correct && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                              {selected && !correct && <X className="w-4 h-4 shrink-0" />}
                            </button>
                          )
                        })}
                        {showFeedback && feedbackText && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 mt-2">
                            <p className="text-sm text-white/60 font-medium">{feedbackText}</p>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* Poll Options */}
                    {slide.type === 'poll' && slide.options && (
                      <div className="flex flex-col gap-2.5 mt-4">
                        {slide.options.map((opt, idx) => (
                          <button key={idx} onClick={() => setSelectedOption(idx)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200
                              ${selectedOption === idx
                                ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 active:scale-[0.98]'
                              }`}>
                            <span className="font-bold text-sm">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Reflection */}
                    {slide.type === 'reflection' && (
                      <div className="mt-4">
                        <textarea placeholder={slide.placeholder || 'Type your answer...'}
                          onChange={(e) => setInput(slide.id, e.target.value)}
                          className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none" />
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-white/5 flex justify-between items-center shrink-0 bg-[#050505]">
          <button onClick={handlePrev} disabled={currentSlideIndex === 0 || isGenerating}
            className="flex items-center gap-1.5 text-white/30 hover:text-white transition-colors disabled:invisible text-sm font-bold">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={handleNext} disabled={isGenerating}
            className="flex items-center gap-2 text-black px-6 py-3 rounded-xl font-black text-sm hover:scale-[1.02] active:scale-[0.97] transition-all"
            style={{ backgroundColor: isLast && showBlueprint ? '#10b981' : segColor, boxShadow: `0 0 20px ${isLast && showBlueprint ? '#10b981' : segColor}30` }}>
            {isLast ? (showBlueprint ? 'Finish Mission' : 'Generate Blueprint') : 'Continue'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
