import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Layout, FolderKanban, LogIn, LogOut, User, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { currentUser, logout, loginAsDemoUser } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              Portfolio<span className="text-cyan-400">AI</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PRO
              </span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/templates" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Layout className="w-4 h-4 text-cyan-400" />
            Templates
          </Link>
          <Link to="/dashboard" className="hover:text-white transition-colors flex items-center gap-1.5">
            <FolderKanban className="w-4 h-4 text-indigo-400" />
            Dashboard
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/create"
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Create Portfolio</span>
          </Link>

          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="flex items-center gap-2">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-8 h-8 rounded-full ring-2 ring-indigo-500/40 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <span className="text-xs text-slate-300 font-medium hidden lg:inline max-w-[120px] truncate">
                  {currentUser.displayName || currentUser.email}
                </span>
              </div>
              <button
                onClick={async () => {
                  await logout();
                  navigate('/');
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={async () => {
                  await loginAsDemoUser();
                  navigate('/dashboard');
                }}
                className="hidden sm:flex text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
              >
                Demo Mode
              </button>
              <Link
                to="/login"
                className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
