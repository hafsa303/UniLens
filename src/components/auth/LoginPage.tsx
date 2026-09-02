import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface LoginPageProps {
  onSwitchToSignup: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToSignup }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const success = login(email, password);
    if (!success) {
      setError('Invalid credentials. You can use the quick demo accounts below or click Sign Up.');
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    login(demoEmail, 'password123');
  };

  return (
    <div className="min-h-screen w-screen bg-[#0B0E17] flex items-center justify-center p-4 select-none relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#151C2E] border border-[#1F293D] rounded-2xl p-7 md:p-8 shadow-2xl relative z-10 space-y-6 animate-fade-in">
        {/* Brand Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#06B6D4]/30 to-[#3B82F6]/20 border border-[#06B6D4]/40 flex items-center justify-center mx-auto mb-3 shadow-glow-cyan">
            <svg className="w-7 h-7 text-[#22D3EE]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider">UNI LENS</h1>
          <p className="text-xs text-[#818CF8] font-medium">Campus Intelligence Platform</p>
          <p className="text-xs text-[#94A3B8] pt-1">Sign in to access your personalized campus dashboard</p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 text-xs text-[#EF4444] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#94A3B8]">Campus Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px]">
                mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@unilens.edu"
                className="w-full bg-[#111728] border border-[#232F46] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#6366F1]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-[#94A3B8]">Password</label>
              <span className="text-[11px] text-[#818CF8] hover:underline cursor-pointer">Forgot password?</span>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px]">
                lock
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#111728] border border-[#232F46] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#6366F1]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-xs transition-colors shadow-sm shadow-[#4F46E5]/40 flex items-center justify-center gap-2"
          >
            <span>Sign In to Dashboard</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </form>

        {/* Quick Demo Switcher */}
        <div className="pt-2 border-t border-[#1E293B] space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold text-center">
            Quick 1-Click Demo Accounts:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => handleQuickLogin('rahul@unilens.edu')}
              className="p-2 rounded-lg bg-[#111728] border border-[#232F46] text-[#94A3B8] hover:text-white hover:border-[#4F46E5] transition-all text-left"
            >
              <span className="font-semibold text-white block">Rahul Sharma</span>
              <span className="text-[10px] text-[#818CF8]">Student (ECE)</span>
            </button>
            <button
              onClick={() => handleQuickLogin('aarav@unilens.edu')}
              className="p-2 rounded-lg bg-[#111728] border border-[#232F46] text-[#94A3B8] hover:text-white hover:border-[#4F46E5] transition-all text-left"
            >
              <span className="font-semibold text-white block">Dr. Aarav</span>
              <span className="text-[10px] text-[#10B981]">Faculty (CSE)</span>
            </button>
            <button
              onClick={() => handleQuickLogin('saamia@unilens.edu')}
              className="p-2 rounded-lg bg-[#111728] border border-[#232F46] text-[#94A3B8] hover:text-white hover:border-[#4F46E5] transition-all text-left"
            >
              <span className="font-semibold text-white block">Saamia N</span>
              <span className="text-[10px] text-[#F59E0B]">Administrator</span>
            </button>
            <button
              onClick={() => handleQuickLogin('priya@unilens.edu')}
              className="p-2 rounded-lg bg-[#111728] border border-[#232F46] text-[#94A3B8] hover:text-white hover:border-[#4F46E5] transition-all text-left"
            >
              <span className="font-semibold text-white block">Priya V</span>
              <span className="text-[10px] text-[#EC4899]">Placement Team</span>
            </button>
          </div>
        </div>

        {/* Switch to Signup */}
        <div className="text-center pt-1 text-xs text-[#94A3B8]">
          <span>Don't have an account? </span>
          <button
            onClick={onSwitchToSignup}
            className="text-[#818CF8] hover:text-white font-semibold hover:underline"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};
