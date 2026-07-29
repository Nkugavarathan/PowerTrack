'use client';

import { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  AlertCircle 
} from 'lucide-react';

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify both fields.');
      return;
    }

    setError('');
    console.log('Submitted:', formData);
    // Submit to your backend API here
  };

  return (
    <div className="min-h-screen bg-[#0B1326] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Main Container Card */}
      <div className="w-full max-w-5xl bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT COLUMN: Visual Showcase */}
        <div className="relative p-8 sm:p-12 flex flex-col justify-between overflow-hidden bg-slate-950/20 border-b lg:border-b-0 lg:border-r border-slate-800/50">
          <div className="flex items-center gap-2.5 text-[#10DB91] text-2xl font-bold tracking-tight z-10">
            <Zap className="w-7 h-7 fill-[#10DB91]" />
            <span>PowerTrack SL</span>
          </div>

          <div className="my-12 sm:my-16 space-y-6 relative z-10">
            {/* Card 1 */}
            <div className="w-full max-w-xs bg-[#0F172A]/90 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-sm transform -rotate-3 transition-transform hover:rotate-0 duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">Current Load</span>
                <div className="p-1 rounded bg-[#36B6D4]/10 text-[#36B6D4]">
                  <Zap className="w-3.5 h-3.5 fill-[#36B6D4]" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-3xl font-extrabold text-white">3.4</span>
                <span className="text-sm font-semibold text-slate-400">kW</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#36B6D4] to-[#10DB91] w-[65%] rounded-full"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-full max-w-xs bg-[#0F172A]/90 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-sm transform rotate-2 ml-auto transition-transform hover:rotate-0 duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">Monthly Forecast</span>
                <TrendingUp className="w-4 h-4 text-[#F9BE0B]" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                Rs. 14,500
              </div>
              <div className="flex items-center gap-1 text-xs text-[#F9BE0B] font-medium">
                <span>↑ 12% vs last month</span>
              </div>
            </div>
          </div>

          <div className="z-10 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-wide">
              Take control of your energy.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Join thousands of Sri Lankans optimizing their electricity usage with real-time tracking and AI-driven insights.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-[#0F172A]">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
              <p className="text-sm text-slate-400 mt-1">
                Start monitoring your energy usage today.
              </p>
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/40 rounded-lg text-xs text-red-400 font-medium flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Full Name</label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-white text-slate-900 placeholder-slate-400 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#10DB91] transition-all font-medium"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full bg-white text-slate-900 placeholder-slate-400 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#10DB91] transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className={`w-full bg-white text-slate-900 placeholder-slate-400 text-sm rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 transition-all font-medium ${
                      error ? 'focus:ring-red-500 border-2 border-red-500' : 'focus:ring-[#10DB91]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 cursor-pointer text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Confirm Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className={`w-full bg-white text-slate-900 placeholder-slate-400 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 transition-all font-medium ${
                      error ? 'focus:ring-red-500 border-2 border-red-500' : 'focus:ring-[#10DB91]'
                    }`}
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#10DB91] focus:ring-[#10DB91] focus:ring-offset-slate-900 cursor-pointer"
                />
                <label htmlFor="agreeToTerms" className="text-xs text-slate-400 leading-none cursor-pointer">
                  I agree to the{' '}
                  <a href="#" className="text-[#36B6D4] hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#36B6D4] hover:underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 bg-slate-900/60 hover:bg-slate-900 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-all border border-slate-700/50 hover:border-slate-600 shadow-md group cursor-pointer"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>

            <div className="pt-6 border-t border-slate-800/80 text-center">
              <p className="text-xs text-slate-400">
                Already have an account?{' '}
                <a href="#" className="text-[#36B6D4] font-semibold hover:underline">
                  Sign In
                </a>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}