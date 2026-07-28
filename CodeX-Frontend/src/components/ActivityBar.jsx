import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, LayoutDashboard, History as HistoryIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function ActivityBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const items = [
    { path: '/editor', icon: Code2, label: 'Editor' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/history', icon: HistoryIcon, label: 'History' }
  ];

  return (
    <div className="w-16 bg-[#0d0e12] border-r border-gray-800 flex flex-col items-center py-4 h-screen">
      {/* Logo */}
      <Link to="/" className="mb-8 text-teal-400 font-bold text-lg">
        CX
      </Link>

      {/* Nav icons */}
      <div className="flex flex-col gap-4 flex-1">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={item.label}
              className={`p-3 rounded-lg transition ${
                isActive
                  ? 'bg-amber-400/20 text-amber-400'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
            </Link>
          );
        })}
      </div>

      {/* User + Logout */}
      <div className="flex flex-col items-center gap-3">
        {user && (
          <div
            title={user.name}
            className="w-8 h-8 rounded-full bg-teal-500 text-black text-xs font-bold flex items-center justify-center"
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <button
          onClick={handleLogout}
          title="Logout"
          className="p-3 rounded-lg text-gray-500 hover:text-red-400 hover:bg-gray-800 transition"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}

export default ActivityBar;