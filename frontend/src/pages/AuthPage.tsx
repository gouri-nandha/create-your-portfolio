import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/common/Navbar';

export const AuthPage: React.FC = () => {
  const location = useLocation();
  const isSignupRoute = location.pathname === '/signup';
  const [isSignup, setIsSignup] = useState(isSignupRoute);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { loginWithGoogle, loginWithEmail, signupWithEmail, loginAsDemoUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignup) {
        await signupWithEmail(email, password, name);
      } else {
        await loginWithEmail(email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    setLoading(true);
    try {
      await loginAsDemoUser();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to initialize demo session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl relative">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              {isSignup ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {isSignup
                ? 'Sign up to build, customize and export AI portfolios'
                : 'Access your saved portfolios and visual builder'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Button */}
          <div className="mb-6">
            <button
              onClick={handleDemoAccess}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>1-Click Instant Demo Login (No Setup Needed)</span>
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-xs text-slate-500">or continue with</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white transition-all flex items-center justify-center gap-2 mb-6"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.09C3.26 21.3 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.24C.45 8.15 0 9.97 0 12s.45 3.85 1.24 5.41l4.04-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.7 1.24 6.59l4.04 3.09c.95-2.83 3.6-4.93 6.72-4.93z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 mt-2"
            >
              <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center text-xs text-slate-400">
            {isSignup ? (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-indigo-400 hover:underline font-semibold"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-indigo-400 hover:underline font-semibold"
                >
                  Sign Up
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
