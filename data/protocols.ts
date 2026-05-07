import { Protocol } from '../store/useProtocolStore'

export const PROTOCOLS: Protocol[] = [
  {
    id: 'applied-cognition',
    title: 'Applied Cognition',
    description: 'Master the mechanics of high-speed learning and memory retention.',
    category: 'Productivity',
    duration: '15 min',
    level: 1,
    slides: [
      // ─── HOOK: The intro ───
      { id: 'h1', type: 'hook', segment: 'hook', title: 'Mission Initialize: Applied Cognition', 
        content: 'You are about to upgrade your brain\'s hardware. Most people learn at 10% efficiency. You\'re about to hit 100%.' },
      
      // ─── NARRATION: Why learning feels broken ───
      { id: 'n1', type: 'narration', segment: 'hook', title: 'Why learning feels broken',
        scenes: [
          { text: 'Think about the last time you tried to learn something new.', icon: 'brain', highlight: 'learn something new', storyVisual: 'NeuralGrowth' },
          { text: 'Maybe it was a new skill for work. Or a language. Or something you saw on YouTube that looked interesting.', icon: 'eye' },
          { text: 'You probably spent hours reading, watching videos, taking notes. And it felt productive, right?', icon: 'book', highlight: 'felt productive' },
          { text: 'But then a week later, someone asks you about it. And you can barely remember anything.', icon: 'brain', highlight: 'barely remember', storyVisual: 'MemoryEraser' },
          { text: 'This isn\'t your fault. Your brain was never designed to learn the way most people try to learn.', icon: 'zap', highlight: 'never designed' },
          { text: 'The good news? Once you understand how your brain actually processes information, everything changes.', icon: 'sparkles', highlight: 'everything changes', storyVisual: 'NeuralGrowth' },
          { text: 'In the next few minutes, you\'re going to learn the exact system that top performers use. And it\'s simpler than you think.', icon: 'target', highlight: 'exact system' }
        ] },

      { id: 'h4', type: 'content', segment: 'hook', title: 'By the end of this protocol, you will:',
        content: '✅ Understand why you forget 80% of what you read\n\n✅ Know the one technique that 10x\'s retention\n\n✅ Build your personal "never forget" system',
        visualComponent: 'NeuralWeave' },

      // ═══ LEARN: ENCODING ═══
      { id: 'l1', type: 'content', segment: 'learn', title: 'Think of your brain like a phone.',
        content: 'When you take a photo, your phone saves it in a specific format — .jpg, .png, etc.\n\nYour brain does the same thing. It "saves" information in specific formats.',
        visualComponent: 'PhoneBattery' },
      
      { id: 'l2', type: 'visual', segment: 'learn', title: 'Your brain has 3 save formats.',
        visualComponent: 'BrainEncoder', content: 'Watch how each one works.' },

      { id: 'n2', type: 'narration', segment: 'learn', title: 'How your memory actually saves information',
        scenes: [
          { text: 'Your brain has three different ways to save information. Think of them like file formats on your computer.', icon: 'brain', highlight: 'three different ways', storyVisual: 'NeuralGrowth' },
          { text: 'The first format is Visual. When you create a mental picture of something, your brain saves it as an image.', icon: 'eye', highlight: 'Visual' },
          { text: 'This is why you can still picture your childhood bedroom, even if you haven\'t been there in years. Images stick.', icon: 'eye', highlight: 'Images stick', storyVisual: 'Breakthrough' },
          { text: 'The second format is Auditory. Sound, rhythm, and repetition create incredibly sticky memories.', icon: 'music', highlight: 'Auditory' },
          { text: 'It\'s why you still remember the alphabet song from when you were four years old. Melody locks things in.', icon: 'music', highlight: 'Melody locks things in', storyVisual: 'SpacedWaves' },
          { text: 'But the third format is the real secret weapon. It\'s called Semantic encoding, which means connecting to meaning.', icon: 'sparkles', highlight: 'Semantic encoding' },
          { text: 'When you link new information to something you already know and care about, your brain treats it as important. It gets locked in.', icon: 'brain', highlight: 'locked in', storyVisual: 'NeuralGrowth' }
        ] },

      { id: 'l4', type: 'quiz', segment: 'learn', title: 'Quick test',
        content: 'Which would you remember better after 1 week?',
        visualComponent: 'Monolith',
        options: [
          { label: 'Reading "The capital of France is Paris"', isCorrect: false, feedback: 'Plain text = weak encoding.' },
          { label: 'Picturing the Eiffel Tower with a giant neon "PARIS" sign', isCorrect: true, feedback: 'Yes! Visual encoding creates a way stronger memory trace.' }
        ] },

      { id: 'l7', type: 'quiz', segment: 'learn', title: 'Let\'s make sure this clicked.',
        content: 'Your friend studies for a test by reading notes over and over. What would you tell them?',
        visualComponent: 'NeuralWeave',
        options: [
          { label: '"Keep going, repetition is key!"', isCorrect: false, feedback: 'Re-reading feels productive but creates weak memories.' },
          { label: '"Try connecting each concept to something in your own life."', isCorrect: true, feedback: 'Exactly! Semantic encoding is 3x more effective.' },
          { label: '"Just highlight the important parts."', isCorrect: false, feedback: 'Highlighting has almost zero effect.' }
        ] },

      { id: 'l_check', type: 'checkpoint', segment: 'learn', title: '🏁 Checkpoint',
        content: 'You now understand the 3 encoding formats.\n\nBut here\'s the problem — even with the best encoding, your brain has a built-in delete button.',
        visualComponent: 'Monolith' },

      // ═══ LEARN: FORGETTING CURVE ═══
      { id: 'f1', type: 'content', segment: 'learn', title: 'Meet your brain\'s worst feature.',
        content: 'After learning something new, your brain starts DELETING it almost immediately.',
        visualComponent: 'MemoryDecay' },
      
      { id: 'f2', type: 'visual', segment: 'learn', title: 'The Forgetting Curve', visualComponent: 'ForgettingCurve',
        content: 'Watch what happens to your memory over time — then see the fix.' },

      { id: 'n3', type: 'narration', segment: 'learn', title: 'Your brain\'s delete button (and how to disable it)',
        scenes: [
          { text: 'Here\'s something most people don\'t know. After you learn something new, your brain immediately starts erasing it.', icon: 'brain', highlight: 'starts erasing it', storyVisual: 'MemoryEraser' },
          { text: 'After just twenty minutes, you\'ve already lost forty percent of what you learned. After one day, seventy percent is gone.', icon: 'zap', highlight: 'seventy percent' },
          { text: 'After a week? Ninety percent has vanished. That book you read last month? You probably remember less than ten percent.', icon: 'brain', highlight: 'Ninety percent' },
          { text: 'But here\'s the breakthrough. Scientists discovered that if you review information at specific intervals, the forgetting curve flattens.', icon: 'target', highlight: 'specific intervals', storyVisual: 'Breakthrough' },
          { text: 'This is called Spaced Repetition. Each review makes the memory stronger and longer-lasting.', icon: 'refresh', highlight: 'Spaced Repetition' },
          { text: 'The magic schedule is: review within twenty four hours, then after three days, then seven days, then thirty days.', icon: 'sparkles', highlight: 'magic schedule', storyVisual: 'SpacedWaves' },
          { text: 'After those four reviews, the memory becomes essentially permanent. Four touches. That\'s all it takes.', icon: 'shield', highlight: 'essentially permanent' }
        ] },

      { id: 'f5', type: 'quiz', segment: 'learn', title: 'Timing is everything.',
        content: 'You just learned an important concept. When should you review it for the first time?',
        visualComponent: 'Monolith',
        options: [
          { label: 'Right before the test', isCorrect: false, feedback: 'This is cramming — works short-term only.' },
          { label: 'Within 24 hours', isCorrect: true, feedback: 'The first review within 24 hours prevents the steepest part of the curve!' },
          { label: 'Next week sometime', isCorrect: false, feedback: 'By next week, you\'ve already lost 90%.' }
        ] },

      // ═══ PRACTICE: ACTIVE RECALL ═══
      { id: 'r1', type: 'content', segment: 'practice', title: 'The #1 study mistake.',
        content: 'Re-reading. Highlighting. Reviewing notes.\n\nThese all FEEL productive. But they\'re all passive.',
        visualComponent: 'RecallVsRecognition' },
      
      { id: 'r2', type: 'visual', segment: 'practice', title: 'Recognition vs. Recall', visualComponent: 'RecallVsRecognition',
        content: 'There\'s a massive difference between these two.' },

      { id: 'n4', type: 'narration', segment: 'practice', title: 'The difference between thinking you know and actually knowing',
        scenes: [
          { text: 'There\'s a trap that almost every learner falls into. It\'s called the illusion of competence.', icon: 'eye', highlight: 'illusion of competence', storyVisual: 'BrainBox' },
          { text: 'Here\'s how it works. You read your notes. You see familiar words. Your brain says, "Oh yeah, I know this." But you don\'t.', icon: 'brain', highlight: 'you don\'t' },
          { text: 'That feeling of familiarity is called Recognition. It\'s your brain being lazy. It recognizes the information, but it can\'t actually retrieve it.', icon: 'eye', highlight: 'Recognition', storyVisual: 'InfoTrap' },
          { text: 'Real learning requires Recall. That means pulling information from your memory with zero hints. No notes. No peeking.', icon: 'zap', highlight: 'Recall' },
          { text: 'The struggle you feel when trying to remember something? That struggle is literally building stronger neural connections.', icon: 'brain', highlight: 'stronger neural connections', storyVisual: 'NeuralGrowth' },
          { text: 'Scientists call this desirable difficulty. The harder it is to recall, the stronger the memory becomes when you finally do.', icon: 'sparkles', highlight: 'desirable difficulty' },
          { text: 'So the next time something feels hard to remember, don\'t reach for your notes. Sit with the struggle. That\'s where the magic happens.', icon: 'target', highlight: 'That\'s where the magic happens' }
        ] },

      { id: 'r4', type: 'reflection', segment: 'practice', title: 'Let\'s test this right now.',
        content: 'WITHOUT scrolling back up, write down the 3 encoding formats your brain uses.\n\nNo peeking. The struggle is the point.',
        placeholder: 'The three encoding formats are...',
        visualComponent: 'RecallVsRecognition',
        validation: {
          type: 'keyword',
          expected: ['visual', 'auditory', 'semantic'],
          prompt: 'The 3 encoding formats are Visual, Auditory, and Semantic.'
        } },
      
      { id: 'r5', type: 'content', segment: 'practice', title: 'How did that feel?',
        content: 'If it was hard — GOOD.\n\nThat struggle is your brain building a stronger connection.',
        visualComponent: 'IdentityShift' },

      { id: 'r6', type: 'quiz', segment: 'practice', title: 'Which study method builds real knowledge?',
        content: 'You have an exam next week. Which approach is most effective?',
        visualComponent: 'Monolith',
        options: [
          { label: 'Re-read your notes 5 times', isCorrect: false, feedback: 'Passive review builds recognition, not recall.' },
          { label: 'Close your notes and quiz yourself from memory', isCorrect: true, feedback: 'Active recall forces your brain to retrieve.' },
          { label: 'Highlight everything important in yellow', isCorrect: false, feedback: 'Highlighting gives the illusion of learning.' }
        ] },

      // ═══ PRACTICE: FEYNMAN ═══
      { id: 'fe1', type: 'content', segment: 'practice', title: 'The ultimate test of knowledge.',
        content: 'If you can\'t explain it to a 12-year-old, you don\'t understand it yourself.',
        visualComponent: 'FeynmanSteps' },
      
      { id: 'fe2', type: 'visual', segment: 'practice', title: 'The Feynman Method', visualComponent: 'FeynmanSteps',
        content: 'Four steps to total mastery.' },

      { id: 'n5', type: 'narration', segment: 'practice', title: 'The Feynman Method: learn anything in 4 steps',
        scenes: [
          { text: 'Richard Feynman was one of the most brilliant physicists who ever lived. But his real genius was his method for learning.', icon: 'sparkles', highlight: 'method for learning' },
          { text: 'Step one: Pick a concept you want to understand. It doesn\'t matter how complex it is.', icon: 'target', highlight: 'Step one' },
          { text: 'Step two: Explain it out loud as if you\'re teaching a twelve year old. Use simple words. No jargon. No shortcuts.', icon: 'book', highlight: 'Step two', storyVisual: 'Simplicity' },
          { text: 'Step three: Notice where you get stuck. The places where you stumble or use vague language? Those are the gaps in your understanding.', icon: 'eye', highlight: 'Step three', storyVisual: 'InfoTrap' },
          { text: 'Step four: Go back and fill those gaps. Then simplify your explanation again. Keep going until a child could understand it.', icon: 'refresh', highlight: 'Step four' },
          { text: 'Why does this work? Because simplicity is the ultimate test of understanding. If you can\'t explain it simply, you don\'t truly know it.', icon: 'brain', highlight: 'simplicity is the ultimate test' },
          { text: 'The best part? You can use this for anything. Coding, business, psychology, cooking, investing. Everything becomes learnable.', icon: 'zap', highlight: 'Everything becomes learnable', storyVisual: 'Breakthrough' }
        ] },

      { id: 'fe3', type: 'reflection', segment: 'practice', title: 'Your turn.',
        content: 'Pick ONE concept from this protocol so far.\n\nNow explain it like you\'re talking to a younger sibling.',
        placeholder: 'In really simple words, here\'s what I learned...',
        visualComponent: 'FeynmanSteps',
        validation: {
          type: 'ai',
          prompt: 'Check if this explanation is simple enough for a 12-year-old.'
        } },

      { id: 'p_check', type: 'checkpoint', segment: 'practice', title: '🔥 You\'re crushing it.',
        content: 'You now know Active Recall, Spaced Repetition, and the Feynman Technique.',
        visualComponent: 'Monolith' },

      // ─── CELEBRATION ───
      { id: 'cel', type: 'celebration', segment: 'apply', title: 'Level 1: Complete.',
        content: 'You\'ve mastered the mechanics of human memory. You are now part of the top 5% of learners on the planet.' }
    ]
  }
]
