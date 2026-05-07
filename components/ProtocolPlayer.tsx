"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, CheckCircle2, Zap, Brain, Target, ArrowRight } from 'lucide-react'
import { useProtocolStore, ProtocolSlide } from '@/store/useProtocolStore'

export default function ProtocolPlayer() {
  const { activeProtocol, currentSlideIndex, isModalOpen, nextSlide, prevSlide, closeModal } = useProtocolStore()
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  if (!isModalOpen || !activeProtocol) return null

  const currentSlide = activeProtocol.slides[currentSlideIndex]
  const progress = ((currentSlideIndex + 1) / activeProtocol.slides.length) * 100
  const isLastSlide = currentSlideIndex === activeProtocol.slides.length - 1

  const handleOptionClick = (idx: number, isCorrect?: boolean) => {
    setSelectedOption(idx)
    if (currentSlide.type === 'quiz') {
      setShowFeedback(true)
    }
  }

  const handleNext = () => {
    setSelectedOption(null)
    setShowFeedback(false)
    if (isLastSlide) {
      closeModal()
    } else {
      nextSlide()
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full h-full max-w-5xl md:h-[85vh] bg-[#0A0A0A] md:rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col relative"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div 
              className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </div>

          {/* Navigation Header */}
          <div className="flex items-center justify-between p-6 md:p-10 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                {currentSlide.segment === 'hook' && <Zap className="w-5 h-5 text-yellow-400" />}
                {currentSlide.segment === 'simulation' && <Brain className="w-5 h-5 text-blue-400" />}
                {currentSlide.segment === 'integration' && <Target className="w-5 h-5 text-emerald-400" />}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 block mb-1">
                  {currentSlide.segment} • Slide {currentSlideIndex + 1} of {activeProtocol.slides.length}
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-tight">{activeProtocol.title}</h3>
              </div>
            </div>
            <button 
              onClick={closeModal}
              className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Slide Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-20 flex flex-col justify-center max-w-3xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
                    {currentSlide.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed tracking-tight">
                    {currentSlide.content}
                  </p>
                </div>

                {/* Interactive Elements */}
                {currentSlide.type === 'quiz' && (
                  <div className="grid gap-3 pt-8">
                    {currentSlide.options?.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(idx, opt.isCorrect)}
                        className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group
                          ${selectedOption === idx 
                            ? (opt.isCorrect ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-red-500/10 border-red-500/50 text-red-400')
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80'
                          }`}
                      >
                        <span className="font-bold tracking-tight">{opt.label}</span>
                        {selectedOption === idx && opt.isCorrect && <CheckCircle2 className="w-5 h-5" />}
                        {selectedOption === idx && !opt.isCorrect && <X className="w-5 h-5" />}
                        {selectedOption !== idx && <div className="w-5 h-5 rounded-full border-2 border-white/10 group-hover:border-white/30" />}
                      </button>
                    ))}
                  </div>
                )}

                {currentSlide.type === 'simulation' && (
                  <div className="pt-8">
                    <div className="aspect-video bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-12 text-center group hover:border-blue-500/30 transition-all duration-500 cursor-pointer overflow-hidden relative">
                       <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                       <Brain className="w-16 h-16 text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500" />
                       <h4 className="text-2xl font-bold text-white mb-3">Launch Simulation</h4>
                       <p className="text-white/40 max-w-sm">
                         Interactive experiment: {currentSlide.description}
                       </p>
                    </div>
                  </div>
                )}

                {currentSlide.type === 'integration' && (
                  <div className="pt-8 space-y-6">
                    <textarea 
                      placeholder="Type your response here..."
                      className="w-full h-40 bg-white/5 border border-white/10 rounded-3xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    />
                    <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-xs font-bold text-emerald-500/80 uppercase tracking-widest">Saved to Workbench</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Footer */}
          <div className="p-6 md:p-10 border-t border-white/5 flex justify-between items-center bg-[#050505]">
            <button 
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors disabled:opacity-0"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-bold tracking-tight">Previous</span>
            </button>

            <button 
              onClick={handleNext}
              className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <span>{isLastSlide ? 'Finish Protocol' : 'Continue'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
