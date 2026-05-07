import { create } from 'zustand'

export type SegmentType = 'hook' | 'simulation' | 'integration';
export type SlideType = 'content' | 'quiz' | 'simulation' | 'integration';

export interface ProtocolSlide {
  id: string
  type: SlideType
  segment: SegmentType
  title: string
  description?: string
  content?: string
  imageUrl?: string
  simulationComponent?: string // Reference to a component name
  options?: { label: string; nextSlideIndex?: number; isCorrect?: boolean }[]
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
  startProtocol: (protocol: Protocol) => void
  nextSlide: () => void
  prevSlide: () => void
  closeModal: () => void
}

export const useProtocolStore = create<ProtocolState>((set) => ({
  activeProtocol: null,
  currentSlideIndex: 0,
  isModalOpen: false,
  startProtocol: (protocol) => set({ activeProtocol: protocol, currentSlideIndex: 0, isModalOpen: true }),
  nextSlide: () => set((state) => ({ 
    currentSlideIndex: Math.min(state.currentSlideIndex + 1, (state.activeProtocol?.slides.length || 1) - 1) 
  })),
  prevSlide: () => set((state) => ({ 
    currentSlideIndex: Math.max(state.currentSlideIndex - 1, 0) 
  })),
  closeModal: () => set({ activeProtocol: null, currentSlideIndex: 0, isModalOpen: false })
}))
