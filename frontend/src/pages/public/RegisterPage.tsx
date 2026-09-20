import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Mail, User, Lock, Phone, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { registerStudent, loginAsStudent } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      setError('Please accept the Terms & Privacy Policy.');
      return;
    }

    registerStudent({ name: fullName, email, mobile });
    showToast('Registration Successful!', 'Welcome to EduMatch Student Portal.', 'success');
    navigate('/student/dashboard');
  };

  const handleGoogleRegister = () => {
    loginAsStudent('google.student@edumatch.com', 'Google Verified Student');
    showToast('Signed Up via Google', 'Welcome to EduMatch!', 'success');
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-[85vh] bg-[#fafaf7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-[#e3e3df] rounded-3xl p-8 shadow-sm space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center mx-auto text-[#128C7E]">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#0f1a0f]">Student Registration</h2>
          <p className="text-xs text-[#737373]">
            Create an account to shortlist, compare, and verify coaching experiences.
          </p>
        </div>

        {/* Google Registration UI Button */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full py-2.5 rounded-xl bg-white hover:bg-[#f3f3ef] border border-[#e3e3df] text-[#0f1a0f] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z" />
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z" />
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
          </svg>
          Sign Up with Google Account
        </button>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-[#e3e3df] w-full" />
          <span className="bg-white px-2 text-[10px] text-[#737373] uppercase font-semibold">Or Direct Registration</span>
        </div>

        {error && (
          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          <div>
            <label className="block text-[#2d4a2d] mb-1 font-medium">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#737373] absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="e.g. Aman Deep"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2.5 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#2d4a2d] mb-1 font-medium">Email / Gmail *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#737373] absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2.5 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#2d4a2d] mb-1 font-medium">Mobile Number *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#737373] absolute left-3 top-3" />
              <input
                type="tel"
                required
                placeholder="+91 98765 00000"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2.5 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#2d4a2d] mb-1 font-medium">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />
            </div>
            <div>
              <label className="block text-[#2d4a2d] mb-1 font-medium">Confirm *</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="accent-[#25D366] rounded"
            />
            <label htmlFor="terms" className="text-[11px] text-[#737373]">
              I agree to the Terms of Service & Authenticity Guidelines
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            Create Student Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-[#737373] border-t border-[#e3e3df]">
          Already registered?{' '}
          <Link to="/login" className="text-[#128C7E] font-semibold hover:underline">
            Sign In to your account
          </Link>
        </div>

      </div>
    </div>
  );
};
