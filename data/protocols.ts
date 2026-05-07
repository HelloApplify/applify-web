import { Protocol } from '@/store/useProtocolStore'

export const APPLIED_COGNITION_PROTOCOL: Protocol = {
  id: 'proto_applied_cognition',
  title: 'Applied Cognition: The Science of Speed',
  description: 'Master how your brain actually learns — and never forget what matters.',
  category: 'Learning Science',
  duration: '20-25 mins',
  level: 1,
  slides: [
    // ═══ HOOK ═══
    { id: 'h1', type: 'content', segment: 'hook', title: 'What if everything you know about learning... is wrong?',
      content: 'Most people think some people are just "naturally smart." They believe you either get it quickly, or you don\'t.\n\nBut science tells a completely different story.' },
    { id: 'h2', type: 'poll', segment: 'hook', title: 'Quick check-in',
      content: 'When you try to learn something new, what usually happens?',
      options: [
        { label: '🔥 I pick it up fast but forget it later' },
        { label: '😤 I struggle and give up' },
        { label: '📖 I re-read things over and over' },
        { label: '🤷 I wing it and hope for the best' }
      ] },

    // ─── NARRATION: Why learning feels broken ───
    { id: 'n1', type: 'narration', segment: 'hook', title: 'Why learning feels broken',
      scenes: [
        { text: 'Think about the last time you tried to learn something new.', icon: 'brain', highlight: 'learn something new' },
        { text: 'Maybe it was a new skill for work. Or a language. Or something you saw on YouTube that looked interesting.', icon: 'eye' },
        { text: 'You probably spent hours reading, watching videos, taking notes. And it felt productive, right?', icon: 'book', highlight: 'felt productive' },
        { text: 'But then a week later, someone asks you about it. And you can barely remember anything.', icon: 'brain', highlight: 'barely remember' },
        { text: 'This isn\'t your fault. Your brain was never designed to learn the way most people try to learn.', icon: 'zap', highlight: 'never designed' },
        { text: 'The good news? Once you understand how your brain actually processes information, everything changes.', icon: 'sparkles', highlight: 'everything changes' },
        { text: 'In the next few minutes, you\'re going to learn the exact system that top performers use. And it\'s simpler than you think.', icon: 'target', highlight: 'exact system' }
      ] },

    { id: 'h4', type: 'content', segment: 'hook', title: 'By the end of this protocol, you will:',
      content: '✅ Understand why you forget 80% of what you read\n\n✅ Know the one technique that 10x\'s retention\n\n✅ Build your personal "never forget" system\n\n✅ Apply this to any skill you\'re learning right now' },

    // ═══ LEARN: ENCODING ═══
    { id: 'l1', type: 'content', segment: 'learn', title: 'Think of your brain like a phone.',
      content: 'When you take a photo, your phone saves it in a specific format — .jpg, .png, etc.\n\nYour brain does the same thing. It "saves" information in specific formats.\n\nThe format you use determines whether you remember it... or lose it.' },
    { id: 'l2', type: 'visual', segment: 'learn', title: 'Your brain has 3 save formats.',
      visualComponent: 'BrainEncoder', content: 'Watch how each one works.' },

    // ─── NARRATION: The 3 encoding formats explained ───
    { id: 'n2', type: 'narration', segment: 'learn', title: 'How your memory actually saves information',
      scenes: [
        { text: 'Your brain has three different ways to save information. Think of them like file formats on your computer.', icon: 'brain', highlight: 'three different ways' },
        { text: 'The first format is Visual. When you create a mental picture of something, your brain saves it as an image.', icon: 'eye', highlight: 'Visual' },
        { text: 'This is why you can still picture your childhood bedroom, even if you haven\'t been there in years. Images stick.', icon: 'eye', highlight: 'Images stick' },
        { text: 'The second format is Auditory. Sound, rhythm, and repetition create incredibly sticky memories.', icon: 'music', highlight: 'Auditory' },
        { text: 'It\'s why you still remember the alphabet song from when you were four years old. Melody locks things in.', icon: 'music', highlight: 'Melody locks things in' },
        { text: 'But the third format is the real secret weapon. It\'s called Semantic encoding, which means connecting to meaning.', icon: 'sparkles', highlight: 'Semantic encoding' },
        { text: 'When you link new information to something you already know and care about, your brain treats it as important. It gets locked in.', icon: 'brain', highlight: 'locked in' },
        { text: 'Research shows semantic encoding is three times more effective than just reading something over and over.', icon: 'zap', highlight: 'three times more effective' }
      ] },

    { id: 'l4', type: 'quiz', segment: 'learn', title: 'Quick test',
      content: 'Which would you remember better after 1 week?',
      options: [
        { label: 'Reading "The capital of France is Paris"', isCorrect: false, feedback: 'Plain text = weak encoding. Your brain barely registers it.' },
        { label: 'Picturing the Eiffel Tower with a giant neon "PARIS" sign', isCorrect: true, feedback: 'Yes! Visual encoding creates a way stronger memory trace.' }
      ] },

    { id: 'l7', type: 'quiz', segment: 'learn', title: 'Let\'s make sure this clicked.',
      content: 'Your friend studies for a test by reading notes over and over. What would you tell them?',
      options: [
        { label: '"Keep going, repetition is key!"', isCorrect: false, feedback: 'Re-reading feels productive but creates weak memories.' },
        { label: '"Try connecting each concept to something in your own life."', isCorrect: true, feedback: 'Exactly! Semantic encoding (connecting to meaning) is 3x more effective.' },
        { label: '"Just highlight the important parts."', isCorrect: false, feedback: 'Highlighting is one of the least effective study methods according to research.' }
      ] },

    { id: 'l_check', type: 'checkpoint', segment: 'learn', title: '🏁 Checkpoint',
      content: 'You now understand the 3 encoding formats.\n\nBut here\'s the problem — even with the best encoding, your brain has a built-in delete button.\n\nLet\'s talk about that next.' },

    // ═══ LEARN: FORGETTING CURVE ═══
    { id: 'f1', type: 'content', segment: 'learn', title: 'Meet your brain\'s worst feature.',
      content: 'In 1885, a psychologist named Hermann Ebbinghaus discovered something terrifying.\n\nAfter learning something new, your brain starts DELETING it almost immediately.' },
    { id: 'f2', type: 'visual', segment: 'learn', title: 'The Forgetting Curve', visualComponent: 'ForgettingCurve',
      content: 'Watch what happens to your memory over time — then see the fix.' },

    // ─── NARRATION: The forgetting curve and the fix ───
    { id: 'n3', type: 'narration', segment: 'learn', title: 'Your brain\'s delete button (and how to disable it)',
      scenes: [
        { text: 'Here\'s something most people don\'t know. After you learn something new, your brain immediately starts erasing it.', icon: 'brain', highlight: 'starts erasing it' },
        { text: 'After just twenty minutes, you\'ve already lost forty percent of what you learned. After one day, seventy percent is gone.', icon: 'zap', highlight: 'seventy percent' },
        { text: 'After a week? Ninety percent has vanished. That book you read last month? You probably remember less than ten percent.', icon: 'brain', highlight: 'Ninety percent' },
        { text: 'But here\'s the breakthrough. Scientists discovered that if you review information at specific intervals, the forgetting curve flattens.', icon: 'target', highlight: 'specific intervals' },
        { text: 'This is called Spaced Repetition. Each review makes the memory stronger and longer-lasting.', icon: 'refresh', highlight: 'Spaced Repetition' },
        { text: 'The magic schedule is: review within twenty four hours, then after three days, then seven days, then thirty days.', icon: 'sparkles', highlight: 'magic schedule' },
        { text: 'After those four reviews, the memory becomes essentially permanent. Four touches. That\'s all it takes.', icon: 'shield', highlight: 'essentially permanent' }
      ] },

    { id: 'f5', type: 'quiz', segment: 'learn', title: 'Timing is everything.',
      content: 'You just learned an important concept. When should you review it for the first time?',
      options: [
        { label: 'Right before the test', isCorrect: false, feedback: 'This is cramming — works short-term, but you\'ll forget within days.' },
        { label: 'Within 24 hours', isCorrect: true, feedback: 'The first review within 24 hours prevents the steepest part of the forgetting curve!' },
        { label: 'Next week sometime', isCorrect: false, feedback: 'By next week, you\'ve already lost 90%. Way too late.' }
      ] },

    // ═══ PRACTICE: ACTIVE RECALL ═══
    { id: 'r1', type: 'content', segment: 'practice', title: 'The #1 study mistake.',
      content: 'Re-reading. Highlighting. Reviewing notes.\n\nThese all FEEL productive. But they\'re all passive.\n\nIt\'s like watching someone else work out and expecting to get stronger.' },
    { id: 'r2', type: 'visual', segment: 'practice', title: 'Recognition vs. Recall', visualComponent: 'RecallVsRecognition',
      content: 'There\'s a massive difference between these two.' },

    // ─── NARRATION: Active recall explained ───
    { id: 'n4', type: 'narration', segment: 'practice', title: 'The difference between thinking you know and actually knowing',
      scenes: [
        { text: 'There\'s a trap that almost every learner falls into. It\'s called the illusion of competence.', icon: 'eye', highlight: 'illusion of competence' },
        { text: 'Here\'s how it works. You read your notes. You see familiar words. Your brain says, "Oh yeah, I know this." But you don\'t.', icon: 'brain', highlight: 'you don\'t' },
        { text: 'That feeling of familiarity is called Recognition. It\'s your brain being lazy. It recognizes the information, but it can\'t actually retrieve it.', icon: 'eye', highlight: 'Recognition' },
        { text: 'Real learning requires Recall. That means pulling information from your memory with zero hints. No notes. No peeking.', icon: 'zap', highlight: 'Recall' },
        { text: 'The struggle you feel when trying to remember something? That struggle is literally building stronger neural connections.', icon: 'brain', highlight: 'stronger neural connections' },
        { text: 'Scientists call this desirable difficulty. The harder it is to recall, the stronger the memory becomes when you finally do.', icon: 'sparkles', highlight: 'desirable difficulty' },
        { text: 'So the next time something feels hard to remember, don\'t reach for your notes. Sit with the struggle. That\'s where the magic happens.', icon: 'target', highlight: 'That\'s where the magic happens' }
      ] },

    { id: 'r4', type: 'reflection', segment: 'practice', title: 'Let\'s test this right now.',
      content: 'WITHOUT scrolling back up, write down the 3 encoding formats your brain uses.\n\nNo peeking. The struggle is the point.',
      placeholder: 'The three encoding formats are...' },
    { id: 'r5', type: 'content', segment: 'practice', title: 'How did that feel?',
      content: 'If it was hard — GOOD.\n\nThat struggle is your brain building a stronger connection. The harder it is to recall something, the stronger the memory becomes when you finally do.\n\nScientists call this "desirable difficulty."' },

    { id: 'r6', type: 'quiz', segment: 'practice', title: 'Which study method builds real knowledge?',
      content: 'You have an exam next week. Which approach is most effective?',
      options: [
        { label: 'Re-read your notes 5 times', isCorrect: false, feedback: 'Passive review builds recognition, not recall. You\'ll freeze on the test.' },
        { label: 'Close your notes and quiz yourself from memory', isCorrect: true, feedback: 'Active recall forces your brain to retrieve — which is exactly what a test demands.' },
        { label: 'Highlight everything important in yellow', isCorrect: false, feedback: 'Highlighting gives the illusion of learning. Research shows it has almost zero effect.' }
      ] },

    // ═══ PRACTICE: FEYNMAN TECHNIQUE ═══
    { id: 'fe1', type: 'content', segment: 'practice', title: 'The technique that made a Nobel Prize winner.',
      content: 'Richard Feynman won a Nobel Prize in Physics.\n\nBut his real superpower wasn\'t being a genius — it was his METHOD for learning ANYTHING.\n\nHe said: "If you can\'t explain it to a 12-year-old, you don\'t understand it."' },
    { id: 'fe2', type: 'visual', segment: 'practice', title: 'The Feynman Technique', visualComponent: 'FeynmanSteps',
      content: '4 steps to understand anything deeply.' },

    // ─── NARRATION: Feynman Technique deep dive ───
    { id: 'n5', type: 'narration', segment: 'practice', title: 'The Feynman Method: learn anything in 4 steps',
      scenes: [
        { text: 'Richard Feynman was one of the most brilliant physicists who ever lived. But his real genius wasn\'t physics. It was his method for learning.', icon: 'sparkles', highlight: 'method for learning' },
        { text: 'Step one: Pick a concept you want to understand. It doesn\'t matter how complex it is.', icon: 'target', highlight: 'Step one' },
        { text: 'Step two: Explain it out loud as if you\'re teaching a twelve year old. Use simple words. No jargon. No shortcuts.', icon: 'book', highlight: 'Step two' },
        { text: 'Step three: Notice where you get stuck. The places where you stumble or use vague language? Those are the gaps in your understanding.', icon: 'eye', highlight: 'Step three' },
        { text: 'Step four: Go back and fill those gaps. Then simplify your explanation again. Keep going until a child could understand it.', icon: 'refresh', highlight: 'Step four' },
        { text: 'Why does this work? Because simplicity is the ultimate test of understanding. If you can\'t explain it simply, you don\'t truly know it.', icon: 'brain', highlight: 'simplicity is the ultimate test' },
        { text: 'The best part? You can use this for anything. Coding, business, psychology, cooking, investing. Everything becomes learnable.', icon: 'zap', highlight: 'Everything becomes learnable' }
      ] },

    { id: 'fe3', type: 'reflection', segment: 'practice', title: 'Your turn.',
      content: 'Pick ONE concept from this protocol so far.\n\nNow explain it like you\'re talking to a younger sibling who has no idea what any of this means.',
      placeholder: 'In really simple words, here\'s what I learned...' },

    { id: 'p_check', type: 'checkpoint', segment: 'practice', title: '🔥 You\'re crushing it.',
      content: 'You now know Active Recall, Spaced Repetition, and the Feynman Technique.\n\nThese three tools alone put you ahead of 95% of learners.\n\nOne more section to go — let\'s make this real.' },

    // ═══ APPLY ═══
    // ─── NARRATION: Putting it all together ───
    { id: 'n6', type: 'narration', segment: 'apply', title: 'Your new learning operating system',
      scenes: [
        { text: 'Let\'s pull everything together. You now have four powerful tools in your arsenal.', icon: 'shield', highlight: 'four powerful tools' },
        { text: 'Tool one: Encode with meaning. Don\'t just read information. Connect it to your own experiences, emotions, and goals.', icon: 'brain', highlight: 'Encode with meaning' },
        { text: 'Tool two: Recall actively. Test yourself constantly. Close the book. Close the notes. Pull from memory. The struggle is the growth.', icon: 'zap', highlight: 'Recall actively' },
        { text: 'Tool three: Space it out. Review what you learn at one day, three days, seven days, and thirty days. Four touches make it permanent.', icon: 'refresh', highlight: 'Space it out' },
        { text: 'Tool four: Explain simply. If you can teach it to a twelve year old, you truly understand it. If you can\'t, you know exactly where to dig deeper.', icon: 'sparkles', highlight: 'Explain simply' },
        { text: 'Most people consume information passively and wonder why nothing sticks. You now know the actual science behind how memory works.', icon: 'target', highlight: 'actual science' },
        { text: 'Knowledge without action is just entertainment. So let\'s build your personal protocol right now.', icon: 'zap', highlight: 'Knowledge without action is just entertainment' }
      ] },

    { id: 'a2', type: 'reflection', segment: 'apply', title: 'Step 1: What are you learning right now?',
      content: 'Think about one skill or topic you\'re actively trying to get better at.\n\nCoding, a language, business, music — anything.',
      placeholder: 'I\'m currently trying to learn...' },
    { id: 'a3', type: 'reflection', segment: 'apply', title: 'Step 2: Build your recall trigger.',
      content: 'Write one question about that topic that you could quiz yourself on tomorrow.\n\nThis is your first Retrieval Node — a prompt that forces your brain to actively search for the answer.',
      placeholder: 'Tomorrow I\'ll test myself by asking...' },
    { id: 'a4', type: 'poll', segment: 'apply', title: 'Step 3: Set your review schedule.',
      content: 'When will you do your first review of today\'s material?',
      options: [
        { label: '⏰ Tonight before bed' },
        { label: '☀️ Tomorrow morning' },
        { label: '📅 In 2-3 days' }
      ] },
    { id: 'a5', type: 'content', segment: 'apply', title: 'Your Applied Cognition Protocol:',
      content: '1️⃣ ENCODE with meaning\nConnect new info to your life.\n\n2️⃣ RECALL actively\nTest yourself — don\'t just re-read.\n\n3️⃣ SPACE it out\nReview at 1 day, 3 days, 7 days, 30 days.\n\n4️⃣ EXPLAIN simply\nIf you can\'t teach it, you don\'t know it.\n\nThis is your operating system for learning. Use it for everything.' },
    { id: 'done', type: 'celebration', segment: 'apply', title: 'Protocol Complete 🎉',
      content: 'You just upgraded your brain\'s operating system.\n\nLevel 1 of Applied Cognition is complete.\n\nYour next module unlocks now.' },
  ]
}

export const PROTOCOLS: Protocol[] = [
  APPLIED_COGNITION_PROTOCOL,
  {
    id: 'proto_deep_work',
    title: 'Deep Work Architecture',
    description: 'Design a distraction-free execution system for high-value tasks.',
    category: 'Productivity',
    duration: '12 mins',
    level: 1,
    slides: []
  },
  {
    id: 'proto_money_management',
    title: 'The Wealth Calibration',
    description: 'Apply behavioral finance to automate your savings and impulse control.',
    category: 'Finance',
    duration: '15 mins',
    level: 1,
    slides: []
  }
]
