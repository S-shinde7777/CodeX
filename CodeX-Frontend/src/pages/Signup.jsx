import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      login(data.token, data.user);
      navigate('/editor');
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          <span className="text-amber-400">Code</span><span className="text-teal-400">X</span> Signup
        </h1>
        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400"
            required
          />
          <button
            type="submit"
            className="bg-amber-400 text-black font-semibold py-2 rounded-lg hover:bg-amber-300 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-teal-400">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;