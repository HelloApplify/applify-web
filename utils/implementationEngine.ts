import { Protocol } from '@/store/useProtocolStore'

export interface ImplementationStep {
  day: number;
  title: string;
  description: string;
  action: string;
  completed: boolean;
  type: 'recall' | 'application' | 'mastery' | 'audit';
}

export interface ImplementationPlan {
  protocolId: string;
  protocolTitle: string;
  userGoal: string;
  feynmanAnalogy: string;
  steps: ImplementationStep[];
  startedAt: string;
}

export function generateImplementationPlan(protocol: Protocol, userInputs: Record<string, string>): ImplementationPlan {
  const userGoal = userInputs['a2'] || 'General Mastery';
  const recallTrigger = userInputs['a3'] || 'What is the core concept?';
  const feynmanAnalogy = userInputs['fe3'] || 'Simplicity is the ultimate sophistication.';
  
  const steps: ImplementationStep[] = [];

  // Logic based on Protocol ID
  if (protocol.id === 'proto_applied_cognition') {
    steps.push(
      {
        day: 1,
        title: 'The 24-Hour Recall',
        description: `Perform active recall on "${userGoal}". Use your trigger question.`,
        action: recallTrigger,
        completed: false,
        type: 'recall'
      },
      {
        day: 2,
        title: 'Semantic Connection',
        description: 'Connect one thing you learned to a real-life situation today.',
        action: 'Write down the connection in your vault.',
        completed: false,
        type: 'application'
      },
      {
        day: 3,
        title: 'The Feynman Sprint',
        description: 'Refine your explanation: ' + feynmanAnalogy.substring(0, 50) + '...',
        action: 'Teach this to one person today.',
        completed: false,
        type: 'mastery'
      },
      {
        day: 5,
        title: 'Spaced Repetition Phase 2',
        description: 'Review the protocol slides briefly and test yourself again.',
        action: 'Can you list the 3 encoding formats without peeking?',
        completed: false,
        type: 'recall'
      },
      {
        day: 7,
        title: 'Mastery Audit',
        description: 'Audit your learning process for the past week.',
        action: 'Did you use active recall or recognition?',
        completed: false,
        type: 'audit'
      }
    );
  } else {
    // Default fallback plan
    steps.push(
      {
        day: 1,
        title: 'Day 1 Application',
        description: `Implement the first core concept of ${protocol.title}.`,
        action: 'Check your notes and execute.',
        completed: false,
        type: 'application'
      },
      {
        day: 3,
        title: 'Day 3 Review',
        description: 'Review your progress and adjust.',
        action: 'What is working? What is not?',
        completed: false,
        type: 'audit'
      },
      {
        day: 7,
        title: 'Day 7 Mastery',
        description: 'Final implementation check.',
        action: 'Ensure the habit is locked in.',
        completed: false,
        type: 'mastery'
      }
    );
  }

  return {
    protocolId: protocol.id,
    protocolTitle: protocol.title,
    userGoal,
    feynmanAnalogy,
    steps,
    startedAt: new Date().toISOString()
  };
}
