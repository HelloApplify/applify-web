"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Volume2, VolumeX, Brain, Eye, Music, Zap, Target, BookOpen, Sparkles, Shield, RefreshCw } from 'lucide-react'
import { NarrationScene, useProtocolStore } from '@/store/useProtocolStore'
import * as StoryVisuals from '@/components/visuals/StoryVisuals'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain, eye: Eye, music: Music, zap: Zap, target: Target,
  book: BookOpen, sparkles: Sparkles, shield: Shield, refresh: RefreshCw
}

const STORY_VISUALS: Record<string, React.ComponentType> = {
  BrainBox: StoryVisuals.BrainBox,
  NeuralGrowth: StoryVisuals.NeuralGrowth,
  MemoryEraser: StoryVisuals.MemoryEraser,
  InfoTrap: StoryVisuals.InfoTrap,
  Breakthrough: StoryVisuals.Breakthrough,
  SpacedWaves: StoryVisuals.SpacedWaves,
  Simplicity: StoryVisuals.Simplicity
}

interface Props {
  title: string
  scenes: NarrationScene[]
  onComplete?: () => void
}

const SCENE_DURATION = 5000 

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
  const Visual = scene?.storyVisual ? STORY_VISUALS[scene.storyVisual] : null

  return (
    <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] rounded-[3rem] overflow-hidden bg-[#050505] border border-white/5 shadow-2xl flex flex-col">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 w-full h-full bg-blue-600/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-emerald-600/20 blur-[150px] rounded-full" 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10">
        {!hasStarted ? (
          <button onClick={handlePlay} className="group flex flex-col items-center gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.4)] border border-blue-400/30"
            >
              <Play className="w-14 h-14 text-white fill-current ml-2" />
            </motion.div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-white tracking-tight mb-2 uppercase italic">Initialize Immersion</h3>
              <p className="text-xs font-bold text-white/30 uppercase tracking-[0.3em]">High Fidelity Neural Audio Ready</p>
            </div>
          </button>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-12 sm:gap-16">
             {/* Story Visual Area */}
             <div className="flex-1 flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScene + (scene.storyVisual || 'default')}
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    {Visual ? (
                      <Visual />
                    ) : (
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
                        <div className="w-40 h-40 rounded-[3rem] bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 flex items-center justify-center relative z-10 backdrop-blur-xl">
                          {Icon && <Icon className="w-20 h-20 text-white" strokeWidth={1} />}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
             </div>

             {/* Caption Area */}
             <div className="w-full max-w-2xl px-4 sm:px-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScene}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <h4 className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] text-center">{title}</h4>
                    <p className="text-xl sm:text-3xl font-medium text-white leading-tight tracking-tight text-center">
                      {scene.text.split(' ').map((word, i) => {
                        const isHighlighted = scene.highlight && word.toLowerCase().includes(scene.highlight.toLowerCase().split(' ')[0])
                        return (
                          <span key={i} className={isHighlighted ? "text-blue-400 font-bold" : "text-white/90"}>
                            {word}{' '}
                          </span>
                        )
                      })}
                    </p>
                  </motion.div>
                </AnimatePresence>
             </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      {hasStarted && (
        <div className="p-8 sm:p-12 pt-0 z-20 w-full">
           <div className="flex items-center justify-between gap-8 bg-white/[0.03] border border-white/5 p-4 rounded-3xl backdrop-blur-md">
              <div className="flex-1 flex gap-2">
                {scenes.map((_, i) => (
                  <div key={i} className="h-1.5 rounded-full bg-white/5 overflow-hidden flex-1 relative">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                      initial={{ width: "0%" }}
                      animate={{ width: i < currentScene ? "100%" : i === currentScene ? "100%" : "0%" }}
                      transition={{ duration: i === currentScene ? SCENE_DURATION / 1000 : 0.3, ease: "linear" }}
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <button onClick={() => setIsMuted(!isMuted)} className="w-10 h-10 flex items-center justify-center text-white/30 hover:text-white transition-colors">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button 
                  onClick={handlePlay}
                  className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90"
                >
                  {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
                </button>
              </div>
           </div>
        </div>
      )}

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-10" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  )
}
