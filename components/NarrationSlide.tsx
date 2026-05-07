"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Volume2, VolumeX, Brain, Eye, Music, Zap, Target, BookOpen, Sparkles, Shield, RefreshCw } from 'lucide-react'
import { NarrationScene } from '@/store/useProtocolStore'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain, eye: Eye, music: Music, zap: Zap, target: Target,
  book: BookOpen, sparkles: Sparkles, shield: Shield, refresh: RefreshCw
}

interface Props {
  title: string
  scenes: NarrationScene[]
}

export default function NarrationSlide({ title, scenes }: Props) {
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const scene = scenes[currentScene]
  const progress = ((currentScene + 1) / scenes.length) * 100

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis?.cancel()
    }
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const speakScene = useCallback((idx: number) => {
    if (idx >= scenes.length) {
      setIsPlaying(false)
      return
    }
    stopSpeech()
    setCurrentScene(idx)

    if (isMuted || typeof window === 'undefined' || !window.speechSynthesis) {
      // Silent mode: auto-advance after estimated read time
      const words = scenes[idx].text.split(' ').length
      const ms = Math.max(3000, words * 300)
      timerRef.current = setTimeout(() => speakScene(idx + 1), ms)
      return
    }

    const utt = new SpeechSynthesisUtterance(scenes[idx].text)
    utt.rate = 0.92
    utt.pitch = 1.0

    // Try to pick a natural voice
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v =>
      v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Premium')
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0]
    if (preferred) utt.voice = preferred

    utt.onend = () => {
      timerRef.current = setTimeout(() => speakScene(idx + 1), 600)
    }
    utteranceRef.current = utt
    window.speechSynthesis.speak(utt)
  }, [scenes, isMuted, stopSpeech])

  const handlePlay = () => {
    if (!hasStarted) {
      setHasStarted(true)
      setIsPlaying(true)
      speakScene(0)
    } else if (isPlaying) {
      setIsPlaying(false)
      stopSpeech()
    } else {
      setIsPlaying(true)
      speakScene(currentScene)
    }
  }

  const handleRestart = () => {
    stopSpeech()
    setCurrentScene(0)
    setIsPlaying(true)
    setHasStarted(true)
    setTimeout(() => speakScene(0), 100)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (isPlaying) {
      stopSpeech()
      // Will restart in new mode
      setTimeout(() => speakScene(currentScene), 100)
    }
  }

  useEffect(() => {
    // Load voices
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices()
    }
    return () => stopSpeech()
  }, [stopSpeech])

  const IconComp = scene?.icon ? ICONS[scene.icon] : Brain

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-6 leading-tight text-center">
        {title}
      </h2>

      {/* Player Card */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden">
        {/* Visual Area */}
        <div className="relative aspect-[16/10] bg-[#080808] flex items-center justify-center overflow-hidden">
          {!hasStarted ? (
            <button onClick={handlePlay}
              className="flex flex-col items-center gap-4 group cursor-pointer">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.div>
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Tap to play</span>
            </button>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={currentScene}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-4 px-6 text-center">
                {/* Animated Icon */}
                <motion.div
                  animate={isPlaying ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {IconComp && <IconComp className="w-8 h-8 text-blue-400" />}
                </motion.div>
                {/* Spoken Text */}
                <p className="text-base sm:text-lg text-white/70 font-medium leading-relaxed max-w-sm">
                  {scene?.highlight ? (
                    <>
                      {scene.text.split(scene.highlight).map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="text-blue-400 font-black">{scene.highlight}</span>
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  ) : scene?.text}
                </p>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pulsing ring when playing */}
          {isPlaying && (
            <motion.div animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 border-2 border-blue-500/20 rounded-2xl pointer-events-none" />
          )}
        </div>

        {/* Controls */}
        <div className="px-4 py-3 border-t border-white/5 flex items-center gap-3">
          {/* Play/Pause */}
          <button onClick={handlePlay}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors shrink-0">
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
          </button>

          {/* Progress Bar */}
          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div className="h-full bg-blue-500 rounded-full"
              animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>

          {/* Scene Count */}
          <span className="text-[10px] font-bold text-white/30 shrink-0">
            {currentScene + 1}/{scenes.length}
          </span>

          {/* Mute */}
          <button onClick={toggleMute}
            className="w-9 h-9 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors shrink-0">
            {isMuted ? <VolumeX className="w-4 h-4 text-white/30" /> : <Volume2 className="w-4 h-4 text-white/40" />}
          </button>

          {/* Restart */}
          <button onClick={handleRestart}
            className="w-9 h-9 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors shrink-0">
            <RotateCcw className="w-3.5 h-3.5 text-white/30" />
          </button>
        </div>

        {/* Scene Dots */}
        <div className="px-4 pb-3 flex justify-center gap-1">
          {scenes.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === currentScene ? 'bg-blue-500' : i < currentScene ? 'bg-white/20' : 'bg-white/5'
            }`} />
          ))}
        </div>
      </div>
    </div>
  )
}
