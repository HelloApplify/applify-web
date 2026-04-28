import { ArrowRight, CheckCircle2, Zap, BarChart3, Clock, Target, Search, Lock, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const library = [
    { title: 'Atomic Habits', author: 'James Clear', status: 'Available', color: 'text-brand-blue', bg: 'bg-blue-50' },
    { title: 'Deep Work', author: 'Cal Newport', status: 'Arriving Friday', color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'The 48 Laws of Power', author: 'Robert Greene', status: 'In Research', color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Can\'t Hurt Me', author: 'David Goggins', status: 'Coming Soon', color: 'text-brand-gray-400', bg: 'bg-brand-gray-50' },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto border-b border-brand-gray-50">
        <div className="flex items-center gap-2">
          <div className="bg-brand-blue w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-brand-black">Applify</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-brand-gray-400">
          <a href="#vault" className="hover:text-brand-black transition-colors">The Vault</a>
          <a href="#how" className="hover:text-brand-black transition-colors">How it Works</a>
          <a href="#science" className="hover:text-brand-black transition-colors">The Science</a>
        </div>
        <Link href="/login" className="text-sm font-semibold bg-brand-gray-50 px-5 py-2.5 rounded-full text-brand-black hover:bg-brand-gray-100 transition-all border border-brand-gray-100">
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 bg-gradient-to-b from-brand-gray-50/50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-8xl font-extrabold text-brand-black tracking-tighter mb-8 leading-[1]">
            Read Less.<br />
            <span className="text-brand-blue">Execute More.</span>
          </h1>
          
          <p className="text-xl text-brand-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            World-class insights, compressed into interactive action protocols. Stop reading for entertainment and start building for results.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#vault" className="btn-primary flex items-center gap-2 text-xl px-10 py-4 shadow-xl shadow-brand-blue/30">
              Explore the Vault <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* The Protocol Vault */}
      <section id="vault" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-brand-black mb-2">The Protocol Vault</h2>
            <p className="text-brand-gray-400">Select a system to begin your transformation.</p>
          </div>
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-200 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search books..." 
              className="pl-10 pr-4 py-2 border border-brand-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {library.map((book) => (
            <div key={book.title} className="glass-card group cursor-pointer hover:border-brand-blue/50 transition-all overflow-hidden flex flex-col">
              <div className={`h-48 ${book.bg} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                <BookOpen className={`w-16 h-16 ${book.color} opacity-20 group-hover:scale-110 transition-transform`} />
                {book.status !== 'Available' && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-white px-3 py-1 rounded-full shadow-sm border border-brand-gray-100 flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-brand-gray-200" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray-400">{book.status}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-brand-black mb-1 leading-tight">{book.title}</h3>
                <p className="text-xs text-brand-gray-400 font-medium mb-6">{book.author}</p>
                <div className="mt-auto pt-4 border-t border-brand-gray-50 flex justify-between items-center">
                  <span className="text-lg font-bold text-brand-black">{book.status === 'Available' ? '$12.00' : '---'}</span>
                  <button className={`p-2 rounded-lg transition-all ${book.status === 'Available' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'bg-brand-gray-50 text-brand-gray-200'}`}>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Voting Card */}
          <div className="border-2 border-dashed border-brand-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-brand-gray-50 transition-all cursor-pointer">
            <PlusCircle className="w-12 h-12 text-brand-gray-200 mb-4" />
            <h3 className="font-bold text-brand-black mb-2">Request a Book</h3>
            <p className="text-xs text-brand-gray-400">Tell us what to research next and get notified when it drops.</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how" className="py-32 bg-brand-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-brand-black mb-4">The Mastery Path</h2>
            <p className="text-brand-gray-400">Three steps from information to implementation.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 relative">
             {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/3 left-0 w-full h-0.5 bg-brand-gray-100 -z-10" />
            
            {[
              { title: 'Unlock', desc: 'Choose a world-class book and unlock its master action protocol.', icon: <Lock className="text-brand-blue" /> },
              { title: 'Pace', desc: 'Set your intensity. Our system adapts to your unique schedule.', icon: <Clock className="text-orange-500" /> },
              { title: 'Master', desc: 'Execute daily tasks and visualize your identity shift in real-time.', icon: <Target className="text-green-500" /> }
            ].map((step, i) => (
              <div key={step.title} className="text-center group">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-brand-gray-100 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-brand-blue uppercase tracking-[0.2em] mb-2">Step 0{i+1}</div>
                <h3 className="text-2xl font-bold text-brand-black mb-4">{step.title}</h3>
                <p className="text-brand-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-brand-gray-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="text-brand-blue w-6 h-6 fill-current" />
          <span className="text-2xl font-bold tracking-tight text-brand-black uppercase italic">Applify</span>
        </div>
        <div className="flex justify-center gap-8 text-xs font-bold text-brand-gray-400 uppercase tracking-widest mb-8">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
        <p className="text-xs text-brand-gray-200">© 2026 Applify Digital Product Empire. All rights reserved.</p>
      </footer>
    </main>
  )
}

function BookOpen(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}
