import { ArrowRight, CheckCircle2, Zap, BarChart3, Clock, Target, Search, Lock, PlusCircle, BookOpen } from 'lucide-react'

export default function LandingPage() {
  const library = [
    { title: 'Atomic Habits', author: 'James Clear', status: 'Available', color: 'text-brand-blue', bg: 'bg-blue-50' },
    { title: 'Deep Work', author: 'Cal Newport', status: 'Arriving Friday', color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'The 48 Laws of Power', author: 'Robert Greene', status: 'In Research', color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Can\'t Hurt Me', author: 'David Goggins', status: 'Coming Soon', color: 'text-brand-gray-400', bg: 'bg-brand-gray-50' },
  ]

  return (
    <main className="min-h-screen bg-white">
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
        </div>
        <button className="text-sm font-semibold bg-brand-gray-50 px-5 py-2.5 rounded-full text-brand-black hover:bg-brand-gray-100 transition-all border border-brand-gray-100">
          Sign In
        </button>
      </nav>

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

      <section id="vault" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-brand-black mb-2">The Protocol Vault</h2>
            <p className="text-brand-gray-400">Select a system to begin your transformation.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {library.map((book) => (
            <div key={book.title} className="glass-card group cursor-pointer hover:border-brand-blue/50 transition-all overflow-hidden flex flex-col">
              <div className={`h-48 ${book.bg} flex items-center justify-center relative overflow-hidden`}>
                <BookOpen className={`w-16 h-16 ${book.color} opacity-20`} />
                {book.status !== 'Available' && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-brand-gray-400">{book.status}</div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-brand-black mb-1 leading-tight">{book.title}</h3>
                <p className="text-xs text-brand-gray-400 font-medium mb-6">{book.author}</p>
                <div className="mt-auto pt-4 border-t border-brand-gray-50 flex justify-between items-center">
                  <span className="text-lg font-bold text-brand-black">{book.status === 'Available' ? '$12.00' : '---'}</span>
                  <button className={`p-2 rounded-lg ${book.status === 'Available' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'bg-brand-gray-50 text-brand-gray-200'}`}>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-brand-gray-100 text-center">
        <Zap className="text-brand-blue w-6 h-6 mx-auto mb-4 fill-current" />
        <span className="text-xl font-bold tracking-tight text-brand-black uppercase italic">Applify</span>
      </footer>
    </main>
  )
}

function BookOpen(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
  )
}