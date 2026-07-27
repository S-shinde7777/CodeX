import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { token } = useAuth();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const response = await fetch('http://localhost:5000/api/teachback/history', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setAttempts(data);
    setLoading(false);
  };

  const totalSessions = attempts.length;
  const strongCount = attempts.filter((a) => !a.aiFeedback?.gaps?.length).length;
  const gapCount = totalSessions - strongCount;

  return (
    <div className="min-h-screen bg-[#12141A] text-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          <span className="text-amber-400">Progress</span>{' '}
          <span className="text-teal-400">Dashboard</span>
        </h1>
        <Link to="/editor" className="text-sm text-teal-400 hover:underline">
          ← Back to Editor
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#181a21] border border-gray-800 rounded-lg p-5 text-center">
              <p className="text-3xl font-bold text-white">{totalSessions}</p>
              <p className="text-sm text-gray-500 mt-1">Total Sessions</p>
            </div>
            <div className="bg-[#181a21] border border-teal-800 rounded-lg p-5 text-center">
              <p className="text-3xl font-bold text-teal-400">{strongCount}</p>
              <p className="text-sm text-gray-500 mt-1">Strong Explanations</p>
            </div>
            <div className="bg-[#181a21] border border-amber-800 rounded-lg p-5 text-center">
              <p className="text-3xl font-bold text-amber-400">{gapCount}</p>
              <p className="text-sm text-gray-500 mt-1">Had Gaps</p>
            </div>
          </div>

          <Link
            to="/history"
            className="inline-block bg-teal-500 text-black font-semibold px-5 py-2 rounded-lg hover:bg-teal-400"
          >
            View Full History
          </Link>
        </>
      )}
    </div>
  );
}

export default Dashboard;