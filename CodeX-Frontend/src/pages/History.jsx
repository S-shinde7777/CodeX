import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ActivityBar from '../components/ActivityBar';

function History() {
  const { token } = useAuth();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/teachback/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setAttempts(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this teach-back attempt? This cannot be undone.');
    if (!confirmed) return;

    await fetch(`${import.meta.env.VITE_API_URL}/api/teachback/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setAttempts(attempts.filter((a) => a._id !== id));
  };

  return (
    <div className="flex h-screen bg-[#12141A] text-gray-200">
      <ActivityBar />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6">
          <span className="text-amber-400">Explanation</span>{' '}
          <span className="text-teal-400">History</span>
        </h1>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && attempts.length === 0 && (
          <p className="text-gray-500">No teach-back attempts yet. Go explain some code!</p>
        )}

        <div className="space-y-4">
          {attempts.map((attempt) => {
            const hasGaps = attempt.aiFeedback?.gaps?.length > 0;
            return (
              <div
                key={attempt._id}
                className="bg-[#181a21] border border-gray-800 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-2">
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded-full text-gray-400">
                      {attempt.language}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        hasGaps
                          ? 'bg-amber-900/40 text-amber-400'
                          : 'bg-teal-900/40 text-teal-400'
                      }`}
                    >
                      {hasGaps ? 'Had gaps' : 'Strong explanation'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(attempt._id)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    ✕ Delete
                  </button>
                </div>
                <pre className="bg-[#0d0e12] text-xs text-gray-400 p-2 rounded mb-2 overflow-x-auto">
                  {attempt.code.slice(0, 150)}
                  {attempt.code.length > 150 ? '...' : ''}
                </pre>
                <p className="text-sm text-gray-300 mb-1">
                  <span className="text-gray-500">Your explanation: </span>
                  {attempt.studentExplanation}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  {new Date(attempt.createdAt).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default History;