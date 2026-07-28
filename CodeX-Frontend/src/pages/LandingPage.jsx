import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import HeroMockup from '../components/HeroMockup';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#12141A] text-gray-200 overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative px-4 py-16 sm:py-24 overflow-hidden">
  {/* Animated grid background */}
  <div
    className="absolute inset-0 opacity-[0.07] pointer-events-none"
    style={{
      backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }}
  />

  {/* Floating glow blobs */}
  <div className="absolute top-10 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-float pointer-events-none" />
  <div className="absolute top-32 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

  <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="text-center lg:text-left animate-fadeInUp">
      <span className="inline-block border border-gray-700 rounded-full px-4 py-1 text-sm text-gray-400 mb-6 animate-glowPulse">
        ✨ AI Coding Education, Reimagined
      </span>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
        <span className="text-gray-100">Don't just</span><br />
        <span className="text-amber-400">read code —</span><br />
        <span className="text-teal-400 relative inline-block">
          teach it back.
          <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
            <path
              d="M0,5 Q50,0 100,5 T200,5"
              stroke="#2dd4bf"
              strokeWidth="3"
              fill="none"
              strokeDasharray="200"
              strokeDashoffset="200"
              style={{ animation: 'draw 1.2s ease-out 0.6s forwards' }}
            />
          </svg>
        </span>
      </h1>
      <p className="text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8">
        Most AI coding tools explain code to you. CodeX flips the script —
        you explain your code to the AI. It listens, evaluates, and helps you truly understand.
      </p>
      <Link
        to="/signup"
        className="inline-block bg-amber-400 text-black font-semibold px-8 py-3 rounded-full shadow-lg shadow-amber-400/40 hover:bg-amber-300 hover:scale-105 hover:shadow-amber-400/60 transition-all duration-300"
      >
        🚀 Start Teaching Now
      </Link>
      <p className="text-gray-600 text-sm mt-4">No credit card required • Free to get started</p>
    </div>

    <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
      <HeroMockup />
    </div>
  </div>
</section>

      {/* How it works */}
      <section id="how-it-works" className="bg-[#181a21] py-16 px-4 text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold mb-10">
            How it <span className="text-teal-400">works</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { step: '1', title: 'Write code', desc: 'Solve a problem and write your code in the editor.' },
            { step: '2', title: 'Explain it', desc: 'Teach the AI what your code does, step by step.' },
            { step: '3', title: 'AI evaluates', desc: 'Our AI checks your explanation and fills the gaps.' },
            { step: '4', title: 'Track progress', desc: 'See your growth over time. Get better, faster.' }
          ].map((item, i) => (
            <Reveal key={item.step} delay={i * 120}>
              <div className="group cursor-default">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-400 text-black font-bold flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-400/40">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-4 text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold mb-10">
            Built for <span className="text-teal-400">deeper</span> understanding
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { title: 'Teach-Back Feedback', desc: 'Get instant, AI-powered feedback on how well you explain your code.', color: 'teal' },
            { title: 'Concept Mastery', desc: 'Identify weak concepts, review smarter, and lock in real understanding.', color: 'amber' },
            { title: 'Progress Tracking', desc: 'Visualize your improvement with session stats and insights.', color: 'amber' },
            { title: 'Works with your workflow', desc: 'Use any language, any editor. We fit right into how you code.', color: 'teal' }
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div
                className={`border rounded-xl p-6 text-left h-full transition-all duration-300 hover:-translate-y-1 ${
                  f.color === 'teal'
                    ? 'border-teal-700 bg-teal-900/10 hover:shadow-lg hover:shadow-teal-500/20 hover:border-teal-500'
                    : 'border-amber-700 bg-amber-900/10 hover:shadow-lg hover:shadow-amber-500/20 hover:border-amber-500'
                }`}
              >
                <h3 className={`font-semibold mb-2 ${f.color === 'teal' ? 'text-teal-400' : 'text-amber-400'}`}>
                  {f.title}
                </h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <Reveal>
        <section className="text-center py-10 px-4 border-t border-gray-800">
          <p className="text-gray-300">
            Students who teach their code, understand it better.{' '}
            <Link to="/signup" className="text-teal-400 hover:underline">
              Start your teach-back journey today.
            </Link>
          </p>
        </section>
      </Reveal>

      <Footer />
    </div>
  );
}

export default LandingPage;