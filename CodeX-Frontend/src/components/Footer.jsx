import { Link } from "react-router-dom";
import { Mail, Link as LinkIcon, ExternalLink } from "lucide-react";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0d0e12] px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 sm:col-span-1">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Logo size={24} />
            <span>
              <span className="text-amber-400">Code</span>
              <span className="text-teal-400">X</span>
            </span>
          </h3>
          <p className="text-gray-500">Don't just read code — teach it back.</p>
        </div>

        <div>
          <p className="text-gray-300 font-medium mb-3">Product</p>
          <ul className="space-y-2 text-gray-500">
            <li>
              <a href="#features" className="hover:text-teal-400 transition">
                Features
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="hover:text-teal-400 transition"
              >
                How it works
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-gray-300 font-medium mb-3">Account</p>
          <ul className="space-y-2 text-gray-500">
            <li>
              <Link to="/login" className="hover:text-teal-400 transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-teal-400 transition">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-gray-300 font-medium mb-3">Connect</p>
          <div className="flex gap-4 text-gray-500 text-sm">
            <a href="https://github.com/S-shinde7777" className="hover:text-amber-400 transition">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/sagar-shinde-bab951381/" className="hover:text-amber-400 transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-amber-400 transition">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-gray-800 mt-10 pt-6 text-center text-gray-600 text-xs">
        © 2026 CodeX. Built by Sagar Shinde. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
