import { Protocol } from '@/store/useProtocolStore'

export const APPLIED_COGNITION_PROTOCOL: Protocol = {
  id: 'proto_applied_cognition',
  title: 'Applied Cognition: The Science of Speed',
  description: 'Master the psychological frameworks for hyper-fast skill acquisition and retention.',
  category: 'Learning Science',
  duration: '15-20 mins',
  level: 1,
  slides: [
    {
      id: 'ac_slide_1',
      type: 'content',
      segment: 'hook',
      title: 'The IQ Trap',
      description: 'Why you were told learning is a fixed trait.',
      content: 'Most people believe learning speed is a result of innate IQ. But cognitive psychology shows that learning is a skill itself. We are moving from "Static Learning" to "Applied Cognition".'
    },
    {
      id: 'ac_slide_2',
      type: 'content',
      segment: 'hook',
      title: 'The 3 Pillars of Encoding',
      description: 'How your brain actually "saves" a file.',
      content: '1. Visual Encoding (Imagery)\n2. Auditory Encoding (Sound/Rhythm)\n3. Semantic Encoding (Meaning & Connection)\n\nSemantic is the most powerful. If you don\'t attach meaning, your brain deletes it within 48 hours.'
    },
    {
      id: 'ac_slide_3',
      type: 'simulation',
      segment: 'simulation',
      title: 'The Semantic Anchor Game',
      description: 'Link abstract concepts to physical anchors.',
      simulationComponent: 'SemanticAnchorGame',
      content: 'In this simulation, you will link the concept of "Neuroplasticity" to a specific object in your current environment. This creates a spatial-semantic anchor.'
    },
    {
      id: 'ac_slide_4',
      type: 'quiz',
      segment: 'simulation',
      title: 'Recognition vs. Recall',
      description: 'The most common learning mistake.',
      content: 'Is re-reading your notes an effective way to learn?',
      options: [
        { label: 'Yes, it builds familiarity.', isCorrect: false },
        { label: 'No, it only builds recognition, not retrieval strength.', isCorrect: true }
      ]
    },
    {
      id: 'ac_slide_5',
      type: 'content',
      segment: 'integration',
      title: 'The Retrieval Node',
      description: 'Designing your first "Trigger".',
      content: 'To prevent the forgetting curve, you need a Retrieval Node. This is a question or prompt that forces your brain to "search" for the info.'
    },
    {
      id: 'ac_slide_6',
      type: 'integration',
      segment: 'integration',
      title: 'Workbench: Anchor Creation',
      description: 'Apply this to a real-life skill.',
      content: 'What is one thing you are trying to learn right now? Write a "Retrieval Prompt" for it below.'
    }
  ]
}

export const PROTOCOLS: Protocol[] = [
  APPLIED_COGNITION_PROTOCOL,
  {
    id: 'proto_deep_work',
    title: 'Deep Work Architecture',
    description: 'Design a distraction-free execution sequence for high-value tasks.',
    category: 'Productivity',
    duration: '10 mins',
    level: 1,
    slides: []
  },
  {
    id: 'proto_money_management',
    title: 'The Wealth Calibration',
    description: 'Apply behavioral finance to automate your savings and impulse control.',
    category: 'Finance',
    duration: '12 mins',
    level: 1,
    slides: []
  }
]
