"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Volume2, VolumeX, Brain, Eye, Music, Zap, Target, BookOpen, Sparkles, Shield, RefreshCw } from 'lucide-react'
import { NarrationScene, useProtocolStore } from '@/store/useProtocolStore'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain, eye: Eye, music: Music, zap: Zap, target: Target,
  book: BookOpen, sparkles: Sparkles, shield: Shield, refresh: RefreshCw
}

interface Props {
  title: string
  scenes: NarrationScene[]
  onComplete?: () => void
}

const SCENE_DURATION = 5000 // Fallback duration for silent mode

export default function NarrationSlide({ title, scenes, onComplete }: Props) {
  const { voiceEngine, elevenLabsVoiceId } = useProtocolStore()
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis?.cancel()
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const speakScene = useCallback(async (idx: number) => {
    if (idx >= scenes.length) {
      setIsPlaying(false)
      if (onComplete) onComplete()
      return
    }
    stopSpeech()
    setCurrentScene(idx)

    if (isMuted || typeof window === 'undefined') {
      const words = scenes[idx].text.split(' ').length
      const ms = Math.max(3000, words * 300)
      timerRef.current = setTimeout(() => speakScene(idx + 1), ms)
      return
    }

    if (voiceEngine === 'elevenlabs') {
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: scenes[idx].text, voiceId: elevenLabsVoiceId })
        })
        if (!response.ok) throw new Error('ElevenLabs API failed')
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audioRef.current = audio
        audio.onended = () => {
          timerRef.current = setTimeout(() => speakScene(idx + 1), 800)
        }
        audio.play()
        return
      } catch (err) {
        console.error('ElevenLabs fallback:', err)
      }
    }

    // Browser Fallback
    const utt = new SpeechSynthesisUtterance(scenes[idx].text)
    utt.rate = 1.0
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v => v.name.includes('Neural') && v.lang.startsWith('en')) || voices[0]
    if (preferred) utt.voice = preferred
    utt.onend = () => {
      timerRef.current = setTimeout(() => speakScene(idx + 1), 800)
    }
    window.speechSynthesis.speak(utt)
  }, [scenes, isMuted, stopSpeech, onComplete, voiceEngine, elevenLabsVoiceId])

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

  useEffect(() => {
    return () => stopSpeech()
  }, [stopSpeech])

  const scene = scenes[currentScene]
  const Icon = scene?.icon ? ICONS[scene.icon] : Brain

  return (
    <div className="relative w-full aspect-square sm:aspect-video rounded-[2.5rem] overflow-hidden bg-[#050505] border border-white/5 shadow-2xl group">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 w-full h-full bg-blue-600/30 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-emerald-600/30 blur-[150px] rounded-full" 
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
            animate={{ 
              y: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* Main Content Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12 z-10">
        {!hasStarted ? (
          <button onClick={handlePlay} className="group flex flex-col items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)] border border-blue-400/30"
            >
              <Play className="w-10 h-10 text-white fill-current ml-1" />
            </motion.div>
            <div className="text-center">
              <h3 className="text-xl font-black text-white tracking-tight mb-1">Start Presentation</h3>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Touch to begin immersion</p>
            </div>
          </button>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center text-center space-y-8"
            >
              {/* Animated Icon Container */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 flex items-center justify-center relative z-10 backdrop-blur-md">
                  {Icon && <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />}
                </div>
              </motion.div>

              {/* Premium Typography */}
              <div className="space-y-4 max-w-xl">
                <h3 className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">{title}</h3>
                <p className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight">
                  {scene.text.split(' ').map((word, i) => {
                    const isHighlighted = scene.highlight && word.toLowerCase().includes(scene.highlight.toLowerCase().split(' ')[0])
                    return (
                      <span key={i} className={isHighlighted ? "text-blue-400" : ""}>
                        {word}{' '}
                      </span>
                    )
                  })}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Controls / Progress Overlay */}
      {hasStarted && (
        <div className="absolute bottom-8 left-0 right-0 px-12 z-20 flex items-center justify-between gap-6">
          <div className="flex-1 flex gap-1.5">
            {scenes.map((_, i) => (
              <div key={i} className="h-1 rounded-full bg-white/5 overflow-hidden flex-1 min-w-[10px]">
                <motion.div 
                  className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  initial={{ width: "0%" }}
                  animate={{ width: i < currentScene ? "100%" : i === currentScene ? "100%" : "0%" }}
                  transition={{ duration: i === currentScene ? SCENE_DURATION / 1000 : 0.3, ease: "linear" }}
                />
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePlay}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
            </button>
            <button onClick={() => setIsMuted(!isMuted)} className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Scanline / Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
    </div>
  )
}
