import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-gray-800">
      <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <Link to="/" className="text-2xl sm:text-3xl font-bold tracking-tight">
          <span className="text-amber-400">Code</span>
          <span className="text-teal-400">X</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition relative group">
            How it works
            <span className="absolute left-0 -bottom-1 w-0 h-px bg-teal-400 group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition relative group">
            Features
            <span className="absolute left-0 -bottom-1 w-0 h-px bg-teal-400 group-hover:w-full transition-all duration-300" />
          </a>
          <Link to="/login" className="text-sm text-gray-300 hover:text-white transition">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-amber-400 text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/30 transition-all"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-gray-300">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-4 px-6 py-4 border-t border-gray-800 bg-black/90">
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-sm text-gray-400">
            How it works
          </a>
          <a href="#features" onClick={() => setMenuOpen(false)} className="text-sm text-gray-400">
            Features
          </a>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-gray-300">
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="bg-amber-400 text-black text-sm font-semibold px-4 py-2 rounded-lg text-center"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;