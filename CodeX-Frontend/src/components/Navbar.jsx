import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="h-auto w-full bg-black text-white flex justify-between items-center px-6 py-4 border-b border-gray-800">
      <Link to="/" className="text-3xl font-semibold">
        <span className="text-amber-400">Code</span>
        <span className="text-teal-400">X</span>
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm text-gray-300 hover:text-white">
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-amber-400 text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-300 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Navbar;