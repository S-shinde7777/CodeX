import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#12141A] text-gray-200">
      <Navbar />

      {/* Hero */}
      <section className="text-center px-4 py-20">
        <span className="inline-block border border-gray-700 rounded-full px-4 py-1 text-sm text-gray-400 mb-6">
          ✨ AI Coding Education, Reimagined
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
          <span className="text-gray-100">Don't just</span><br />
          <span className="text-amber-400">read code —</span><br />
          <span className="text-teal-400">teach it back.</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Most AI coding tools explain code to you. CodeX flips the script —
          you explain your code to the AI. It listens, evaluates, and helps you truly understand.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-amber-400 text-black font-semibold px-8 py-3 rounded-full shadow-lg shadow-amber-400/40 hover:bg-amber-300 transition"
        >
          🚀 Start Teaching Now
        </Link>
        <p className="text-gray-600 text-sm mt-4">No credit card required • Free to get started</p>
      </section>

      {/* How it works */}
      <section className="bg-[#181a21] py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-10">
          How it <span className="text-teal-400">works</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { step: '1', title: 'Write code', desc: 'Solve a problem and write your code in the editor.' },
            { step: '2', title: 'Explain it', desc: 'Teach the AI what your code does, step by step.' },
            { step: '3', title: 'AI evaluates', desc: 'Our AI checks your explanation and fills the gaps.' },
            { step: '4', title: 'Track progress', desc: 'See your growth over time. Get better, faster.' }
          ].map((item) => (
            <div key={item.step}>
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-400 text-black font-bold flex items-center justify-center mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-10">
          Built for <span className="text-teal-400">deeper</span> understanding
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { title: 'Teach-Back Feedback', desc: 'Get instant, AI-powered feedback on how well you explain your code.', color: 'teal' },
            { title: 'Concept Mastery', desc: 'Identify weak concepts, review smarter, and lock in real understanding.', color: 'amber' },
            { title: 'Progress Tracking', desc: 'Visualize your improvement with session stats and insights.', color: 'amber' },
            { title: 'Works with your workflow', desc: 'Use any language, any editor. We fit right into how you code.', color: 'teal' }
          ].map((f) => (
            <div
              key={f.title}
              className={`border rounded-xl p-6 text-left ${
                f.color === 'teal' ? 'border-teal-700 bg-teal-900/10' : 'border-amber-700 bg-amber-900/10'
              }`}
            >
              <h3 className={`font-semibold mb-2 ${f.color === 'teal' ? 'text-teal-400' : 'text-amber-400'}`}>
                {f.title}
              </h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="text-center py-10 px-4 border-t border-gray-800">
        <p className="text-gray-300">
          Students who teach their code, understand it better.{' '}
          <Link to="/signup" className="text-teal-400 hover:underline">
            Start your teach-back journey today.
          </Link>
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-600 border-t border-gray-800">
        <p>© 2026 CodeX. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;