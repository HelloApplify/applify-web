import { Protocol } from '@/store/useProtocolStore'

export const APPLIED_COGNITION_PROTOCOL: Protocol = {
  id: 'proto_applied_cognition',
  title: 'Applied Cognition: The Science of Speed',
  description: 'Master how your brain actually learns — and never forget what matters.',
  category: 'Learning Science',
  duration: '15-20 mins',
  level: 1,
  slides: [
    // === HOOK ===
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
    { id: 'h3', type: 'content', segment: 'hook', title: 'Here\'s the truth nobody told you.',
      content: 'Learning speed isn\'t about IQ. It\'s about METHOD.\n\nThe top performers in every field aren\'t smarter — they just know how their brain actually works.\n\nToday, you\'re going to learn exactly that.' },
    { id: 'h4', type: 'content', segment: 'hook', title: 'By the end of this protocol, you will:',
      content: '✅ Understand why you forget 80% of what you read\n\n✅ Know the one technique that 10x\'s retention\n\n✅ Build your personal "never forget" system\n\n✅ Apply this to any skill you\'re learning right now' },

    // === LEARN: ENCODING ===
    { id: 'l1', type: 'content', segment: 'learn', title: 'Think of your brain like a phone.',
      content: 'When you take a photo, your phone saves it in a specific format — .jpg, .png, etc.\n\nYour brain does the same thing. It "saves" information in specific formats.\n\nThe format you use determines whether you remember it... or lose it.' },
    { id: 'l2', type: 'visual', segment: 'learn', title: 'Your brain has 3 save formats.',
      visualComponent: 'BrainEncoder', content: 'Watch how each one works.' },
    { id: 'l3', type: 'content', segment: 'learn', title: '📸 Format 1: Visual',
      content: 'When you create a mental picture of something, you\'re using visual encoding.\n\nThink about it — you can probably picture your childhood bedroom right now, even if you haven\'t been there in years.\n\nImages stick.' },
    { id: 'l4', type: 'quiz', segment: 'learn', title: 'Quick test',
      content: 'Which would you remember better after 1 week?',
      options: [
        { label: 'Reading "The capital of France is Paris"', isCorrect: false, feedback: 'Plain text = weak encoding. Your brain barely registers it.' },
        { label: 'Picturing the Eiffel Tower with a giant neon "PARIS" sign', isCorrect: true, feedback: 'Yes! Visual encoding creates a way stronger memory trace.' }
      ] },
    { id: 'l5', type: 'content', segment: 'learn', title: '🎵 Format 2: Sound',
      content: 'Ever had a song stuck in your head for DAYS?\n\nThat\'s auditory encoding at work. Rhythm, melody, and repetition make things stick.\n\nIt\'s why you still remember the alphabet song from when you were 4 years old.' },
    { id: 'l6', type: 'content', segment: 'learn', title: '🧠 Format 3: Meaning',
      content: 'This is the secret weapon.\n\nWhen you connect new information to something you ALREADY know — something meaningful to YOU — your brain locks it in.\n\nThis is called semantic encoding, and it\'s 3x more effective than just reading.' },
    { id: 'l7', type: 'quiz', segment: 'learn', title: 'Let\'s make sure this clicked.',
      content: 'Your friend studies for a test by reading notes over and over. What would you tell them?',
      options: [
        { label: '"Keep going, repetition is key!"', isCorrect: false, feedback: 'Re-reading feels productive but creates weak memories.' },
        { label: '"Try connecting each concept to something in your own life."', isCorrect: true, feedback: 'Exactly! Semantic encoding (connecting to meaning) is 3x more effective.' },
        { label: '"Just highlight the important parts."', isCorrect: false, feedback: 'Highlighting is one of the least effective study methods according to research.' }
      ] },
    { id: 'l_check', type: 'checkpoint', segment: 'learn', title: '🏁 Checkpoint',
      content: 'You now understand the 3 encoding formats.\n\nBut here\'s the problem — even with the best encoding, your brain has a built-in delete button.\n\nLet\'s talk about that next.' },

    // === LEARN: FORGETTING CURVE ===
    { id: 'f1', type: 'content', segment: 'learn', title: 'Meet your brain\'s worst feature.',
      content: 'In 1885, a psychologist named Hermann Ebbinghaus discovered something terrifying.\n\nAfter learning something new, your brain starts DELETING it almost immediately.\n\nHe called it the Forgetting Curve.' },
    { id: 'f2', type: 'visual', segment: 'learn', title: 'The Forgetting Curve', visualComponent: 'ForgettingCurve',
      content: 'Watch what happens to your memory over time — then see the fix.' },
    { id: 'f3', type: 'content', segment: 'learn', title: 'The numbers are brutal.',
      content: '⏰ After 20 minutes → you\'ve lost 40%\n\n📅 After 1 day → you\'ve lost 70%\n\n📆 After 1 week → you\'ve lost 90%\n\nThat book you read last month? You probably remember less than 10% of it.\n\nThis isn\'t a you problem. It\'s a brain problem.' },
    { id: 'f4', type: 'content', segment: 'learn', title: 'But there\'s a hack.',
      content: 'Scientists discovered that if you review information at specific intervals, the forgetting curve FLATTENS.\n\nEach review makes the memory stronger and longer-lasting.\n\nThis is called Spaced Repetition — and it\'s the closest thing to a memory superpower that exists.' },
    { id: 'f5', type: 'quiz', segment: 'learn', title: 'Timing is everything.',
      content: 'You just learned an important concept. When should you review it for the first time?',
      options: [
        { label: 'Right before the test', isCorrect: false, feedback: 'This is cramming — works short-term, but you\'ll forget within days.' },
        { label: 'Within 24 hours', isCorrect: true, feedback: 'The first review within 24 hours prevents the steepest part of the forgetting curve!' },
        { label: 'Next week sometime', isCorrect: false, feedback: 'By next week, you\'ve already lost 90%. Way too late.' }
      ] },
    { id: 'f6', type: 'content', segment: 'learn', title: 'The magic review schedule.',
      content: 'Here\'s the exact spacing scientists recommend:\n\n📌 Review 1 → within 24 hours\n📌 Review 2 → after 3 days\n📌 Review 3 → after 7 days\n📌 Review 4 → after 30 days\n\nAfter these 4 reviews, the memory is essentially permanent.' },

    // === PRACTICE: ACTIVE RECALL ===
    { id: 'r1', type: 'content', segment: 'practice', title: 'The #1 study mistake.',
      content: 'Re-reading. Highlighting. Reviewing notes.\n\nThese all FEEL productive. But they\'re all passive. Your brain is on autopilot.\n\nIt\'s like watching someone else work out and expecting to get stronger.' },
    { id: 'r2', type: 'visual', segment: 'practice', title: 'Recognition vs. Recall', visualComponent: 'RecallVsRecognition',
      content: 'There\'s a massive difference between these two.' },
    { id: 'r3', type: 'content', segment: 'practice', title: 'Here\'s the difference.',
      content: '👁️ RECOGNITION:\n"Oh yeah, I\'ve seen this before."\n→ Weak. Your brain barely works.\n\n💪 RECALL:\n"Let me pull this from memory with zero hints."\n→ Strong. Your brain is actively building connections.\n\nRecognition tricks you into THINKING you know something. Recall actually PROVES it.' },
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

    // === PRACTICE: FEYNMAN TECHNIQUE ===
    { id: 'fe1', type: 'content', segment: 'practice', title: 'The technique that made a Nobel Prize winner.',
      content: 'Richard Feynman won a Nobel Prize in Physics.\n\nBut his real superpower wasn\'t being a genius — it was his METHOD for learning ANYTHING.\n\nHe said: "If you can\'t explain it to a 12-year-old, you don\'t understand it."' },
    { id: 'fe2', type: 'visual', segment: 'practice', title: 'The Feynman Technique', visualComponent: 'FeynmanSteps',
      content: '4 steps to understand anything deeply.' },
    { id: 'fe3', type: 'reflection', segment: 'practice', title: 'Your turn.',
      content: 'Pick ONE concept from this protocol so far.\n\nNow explain it like you\'re talking to a younger sibling who has no idea what any of this means.',
      placeholder: 'In really simple words, here\'s what I learned...' },
    { id: 'fe4', type: 'quiz', segment: 'practice', title: 'Why does the Feynman Technique work?',
      content: 'What makes this method so effective?',
      options: [
        { label: 'It forces you to use impressive vocabulary', isCorrect: false, feedback: 'It\'s actually the opposite — simplicity reveals true understanding.' },
        { label: 'It exposes the gaps in your understanding', isCorrect: true, feedback: 'When you can\'t explain it simply, you know exactly where to dig deeper.' },
        { label: 'It makes you read more material', isCorrect: false, feedback: 'The power is in explaining, not consuming more content.' }
      ] },
    { id: 'p_check', type: 'checkpoint', segment: 'practice', title: '🔥 You\'re crushing it.',
      content: 'You now know Active Recall, Spaced Repetition, and the Feynman Technique.\n\nThese three tools alone put you ahead of 95% of learners.\n\nOne more section to go — let\'s make this real.' },

    // === APPLY ===
    { id: 'a1', type: 'content', segment: 'apply', title: 'Knowledge without action is just entertainment.',
      content: 'Everything you\'ve learned today is useless... unless you actually USE it.\n\nSo let\'s build your personal learning protocol right now.\n\nThis will take 2 minutes and will change how you learn forever.' },
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
