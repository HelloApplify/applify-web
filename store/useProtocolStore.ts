import { create } from 'zustand'

export interface ProtocolStep {
  id: string
  prompt: string
  options: { label: string; nextStepId: string | 'END' }[]
}

export interface Protocol {
  id: string
  title: string
  steps: Record<string, ProtocolStep>
  firstStepId: string
}

interface ProtocolState {
  activeProtocol: Protocol | null
  currentStepId: string | null
  isModalOpen: boolean
  startProtocol: (protocol: Protocol) => void
  advanceStep: (nextStepId: string) => void
  closeModal: () => void
}

export const useProtocolStore = create<ProtocolState>((set) => ({
  activeProtocol: null,
  currentStepId: null,
  isModalOpen: false,
  startProtocol: (protocol) => set({ activeProtocol: protocol, currentStepId: protocol.firstStepId, isModalOpen: true }),
  advanceStep: (nextStepId) => set({ currentStepId: nextStepId }),
  closeModal: () => set({ activeProtocol: null, currentStepId: null, isModalOpen: false })
}))