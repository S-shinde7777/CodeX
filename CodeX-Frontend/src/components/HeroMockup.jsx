import { useState, useEffect } from 'react';

const STEPS = [
  { type: 'code', text: 'function sum(a, b) {\n  return a + b;\n}' },
  { type: 'ai-question', text: 'Walk me through what this code does.' },
  { type: 'user', text: 'It takes two numbers and adds them together, then returns the result.' },
  { type: 'ai-feedback', text: '✓ Correct! You explained it clearly.' }
];

function HeroMockup() {
  const [stepIndex, setStepIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentStep = STEPS[stepIndex];
    if (charIndex < currentStep.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentStep.text.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 25);
      return () => clearTimeout(timeout);
    } else {
      const pause = setTimeout(() => {
        setStepIndex((stepIndex + 1) % STEPS.length);
        setCharIndex(0);
        setDisplayedText('');
      }, 1400);
      return () => clearTimeout(pause);
    }
  }, [charIndex, stepIndex]);

  const current = STEPS[stepIndex];

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-[#181a21] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Fake window bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0e12] border-b border-gray-800">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70" />
          <span className="w-3 h-3 rounded-full bg-teal-400/70" />
          <span className="ml-3 text-xs text-gray-500">CodeX</span>
        </div>

        <div className="p-5 min-h-[180px] flex flex-col justify-center">
          {current.type === 'code' && (
            <pre className="text-teal-300 text-sm font-mono whitespace-pre-wrap">
              {displayedText}
              <span className="animate-pulse">▌</span>
            </pre>
          )}

          {current.type === 'ai-question' && (
            <div className="bg-teal-900/30 border border-teal-700 rounded-lg p-3 text-sm text-teal-300">
              {displayedText}
              <span className="animate-pulse">▌</span>
            </div>
          )}

          {current.type === 'user' && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-300 ml-auto">
              {displayedText}
              <span className="animate-pulse">▌</span>
            </div>
          )}

          {current.type === 'ai-feedback' && (
            <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-300">
              {displayedText}
              <span className="animate-pulse">▌</span>
            </div>
          )}
        </div>
      </div>

      {/* Glow behind card */}
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-teal-500/20 blur-2xl -z-10 rounded-3xl" />
    </div>
  );
}

export default HeroMockup;