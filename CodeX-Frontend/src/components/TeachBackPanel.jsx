import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function TeachBackPanel({ code, language, onClose }) {
  const { token } = useAuth();
  const [explanation, setExplanation] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!explanation.trim()) return;
    setLoading(true);
    setFeedback(null);
    try {
      const response = await fetch('http://localhost:5000/api/teachback/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ code, language, studentExplanation: explanation })
      });
      const data = await response.json();
      setFeedback(data.aiFeedback);
    } catch (err) {
      setFeedback({ correctPoints: [], gaps: ['Something went wrong. Try again.'], followUpQuestion: '' });
    }
    setLoading(false);
  };

  const handleTryAgain = () => {
    setFeedback(null);
    setExplanation('');
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#181a21] border-l border-gray-700 z-50 overflow-y-auto p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-teal-400">Teach-Back</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
      </div>

      {/* AI's question bubble */}
      <div className="bg-teal-900/30 border border-teal-700 rounded-lg p-4 mb-4">
        <p className="text-teal-300 text-sm">
          Walk me through what this code does, step by step. Explain it in your own words.
        </p>
      </div>

      {!feedback && (
        <>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Type your explanation here..."
            rows={8}
            className="w-full bg-[#1f2128] border border-gray-700 rounded-lg p-3 text-sm text-gray-200 focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-3 w-full bg-amber-400 text-black font-semibold px-5 py-2 rounded-lg hover:bg-amber-300 disabled:opacity-50"
          >
            {loading ? 'Evaluating...' : 'Submit Explanation'}
          </button>
        </>
      )}

      {feedback && (
        <div className="space-y-4 mt-4">
          {feedback.correctPoints?.length > 0 && (
            <div className="bg-teal-900/20 border border-teal-700 rounded-lg p-4">
              <p className="text-teal-400 font-medium mb-2">✓ What you got right</p>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                {feedback.correctPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {feedback.gaps?.length > 0 && (
            <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
              <p className="text-amber-400 font-medium mb-2">⚠ What's missing</p>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                {feedback.gaps.map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>
          )}

          {feedback.followUpQuestion && (
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
              <p className="text-gray-400 text-sm">{feedback.followUpQuestion}</p>
            </div>
          )}

          <button
            onClick={handleTryAgain}
            className="w-full bg-teal-500 text-black font-semibold px-5 py-2 rounded-lg hover:bg-teal-400"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default TeachBackPanel;