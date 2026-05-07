import { create } from 'zustand'

export type SegmentType = 'hook' | 'learn' | 'practice' | 'apply';
export type SlideType = 'content' | 'quiz' | 'poll' | 'visual' | 'reflection' | 'checkpoint' | 'celebration' | 'narration' | 'video';

export interface NarrationScene {
  text: string
  icon?: string
  highlight?: string
}

export interface ProtocolSlide {
  id: string
  type: SlideType
  segment: SegmentType
  title: string
  content?: string
  visualComponent?: string
  options?: { label: string; isCorrect?: boolean; feedback?: string }[]
  placeholder?: string
  scenes?: NarrationScene[]
  videoUrl?: string
}


export interface Protocol {
  id: string
  title: string
  description: string
  category: string
  duration: string
  level: number
  slides: ProtocolSlide[]
}

interface ProtocolState {
  activeProtocol: Protocol | null
  currentSlideIndex: number
  isModalOpen: boolean
  completedProtocols: string[]
  userInputs: Record<string, string>
  startProtocol: (protocol: Protocol) => void
  nextSlide: () => void
  prevSlide: () => void
  goToSlide: (index: number) => void
  completeProtocol: (id: string) => void
  setInput: (slideId: string, value: string) => void
  closeModal: () => void
}

export const useProtocolStore = create<ProtocolState>((set) => ({
  activeProtocol: null,
  currentSlideIndex: 0,
  isModalOpen: false,
  completedProtocols: [],
  userInputs: {},
  startProtocol: (protocol) => set({ activeProtocol: protocol, currentSlideIndex: 0, isModalOpen: true, userInputs: {} }),
  nextSlide: () => set((state) => ({ 
    currentSlideIndex: Math.min(state.currentSlideIndex + 1, (state.activeProtocol?.slides.length || 1) - 1) 
  })),
  prevSlide: () => set((state) => ({ 
    currentSlideIndex: Math.max(state.currentSlideIndex - 1, 0) 
  })),
  goToSlide: (index) => set({ currentSlideIndex: index }),
  completeProtocol: (id) => set((state) => ({
    completedProtocols: state.completedProtocols.includes(id)
      ? state.completedProtocols
      : [...state.completedProtocols, id]
  })),
  setInput: (slideId, value) => set((state) => ({
    userInputs: { ...state.userInputs, [slideId]: value }
  })),
  closeModal: () => set({ activeProtocol: null, currentSlideIndex: 0, isModalOpen: false, userInputs: {} })
}))
