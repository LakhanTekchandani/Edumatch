import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const MandatoryRegisterModal: React.FC = () => {
  const { isAuthenticated, registerStudent, registerInstitute, loginAsStudent, loginAsInstitute } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');
  const [activeRole, setActiveRole] = useState<'student' | 'institute'>('student');

  // Student form state
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentMobile, setStudentMobile] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentConfirmPassword, setStudentConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Institute form state
  const [instName, setInstName] = useState('');
  const [instEmail, setInstEmail] = useState('');
  const [instPhone, setInstPhone] = useState('');
  const [instPassword, setInstPassword] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('student@edumatch.com');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Error state
  const [error, setError] = useState('');

  // 5-second delay timer logic
  useEffect(() => {
    if (isAuthenticated) {
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [isAuthenticated]);

  if (!isOpen || isAuthenticated) {
    return null;
  }

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (studentPassword !== studentConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      setError('Please accept the Terms & Privacy Policy.');
      return;
    }

    registerStudent({
      name: studentName,
      email: studentEmail,
      mobile: studentMobile
    });
    showToast('Registration Successful!', 'Welcome to EduMatch Student Portal.', 'success');
  };

  const handleInstituteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    registerInstitute({
      name: instName,
      email: instEmail,
      phone: instPhone
    });
    showToast('Registration Initiated', 'Institute account created. Please complete verification.', 'info');
    navigate('/institute/verification');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeRole === 'student') {
      loginAsStudent(loginEmail || 'student@edumatch.com', 'Aman Deep');
      showToast('Welcome Back!', 'Logged in as Student.', 'success');
    } else {
      loginAsInstitute(loginEmail || 'admissions@apexkota.edu.in', 'inst-1');
      showToast('Welcome Representative!', 'Logged in to Institute Portal.', 'success');
    }
  };

  const handleGoogleAuth = () => {
    loginAsStudent('google.student@edumatch.com', 'Google Verified Student');
    showToast('Signed Up via Google', 'Welcome to EduMatch!', 'success');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="max-w-md w-full max-h-[90vh] overflow-y-auto bg-white border border-[#e3e3df] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] p-0.5 shadow-md shadow-[#25D366]/20 mx-auto">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-[#128C7E]" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-[#0f1a0f] tracking-tight">
            {activeTab === 'register' ? 'Create your EduMatch account' : 'Log in to EduMatch'}
          </h2>
          <p className="text-xs text-[#737373] leading-relaxed">
            To explore verified coaching institutes and use EduMatch features, create your account.
          </p>
        </div>

        {/* Current Role Banner / Switcher */}
        {activeTab === 'register' ? (
          <div className="bg-[#f3f3ef] border border-[#e3e3df] rounded-2xl p-3 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#737373] font-medium">You're registering as:</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#d4f0e1] text-[#128C7E] border border-[#25D366]/40 capitalize flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                {activeRole}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setActiveRole('student');
                  setError('');
                }}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  activeRole === 'student'
                    ? 'bg-[#128C7E] text-white shadow-xs'
                    : 'bg-white text-[#2d4a2d] hover:bg-[#ebebeb] border border-[#e3e3df]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Student
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveRole('institute');
                  setError('');
                }}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  activeRole === 'institute'
                    ? 'bg-[#128C7E] text-white shadow-xs'
                    : 'bg-white text-[#2d4a2d] hover:bg-[#ebebeb] border border-[#e3e3df]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Switch to Institute
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1 bg-[#f3f3ef] p-1 rounded-xl border border-[#e3e3df] text-xs">
            <button
              type="button"
              onClick={() => {
                setActiveRole('student');
                setLoginEmail('student@edumatch.com');
                setError('');
              }}
              className={`py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeRole === 'student' ? 'bg-[#128C7E] text-white shadow-xs' : 'text-[#737373] hover:text-[#0f1a0f]'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Student Login
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveRole('institute');
                setLoginEmail('admissions@apexkota.edu.in');
                setError('');
              }}
              className={`py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeRole === 'institute' ? 'bg-[#128C7E] text-white shadow-xs' : 'text-[#737373] hover:text-[#0f1a0f]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> Institute Login
            </button>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* FORMS */}
        {activeTab === 'register' ? (
          <>
            {activeRole === 'student' ? (
              /* STUDENT REGISTRATION FORM */
              <div className="space-y-4">
                {/* Google Sign Up */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-[#f3f3ef] border border-[#e3e3df] text-[#0f1a0f] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                    />
                  </svg>
                  Sign Up with Google Account
                </button>

                <div className="relative flex items-center justify-center my-1">
                  <div className="border-t border-[#e3e3df] w-full" />
                  <span className="bg-white px-2 text-[10px] text-[#737373] uppercase font-semibold">
                    Or Student Form
                  </span>
                </div>

                <form onSubmit={handleStudentSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#2d4a2d] mb-1 font-medium">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#737373] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aman Deep"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#2d4a2d] mb-1 font-medium">Email / Gmail *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#737373] absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        placeholder="student@example.com"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#2d4a2d] mb-1 font-medium">Mobile Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#737373] absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 00000"
                        value={studentMobile}
                        onChange={(e) => setStudentMobile(e.target.value)}
                        className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[#2d4a2d] mb-1 font-medium">Password *</label>
                      <input
                        type="password"
                        required
                        value={studentPassword}
                        onChange={(e) => setStudentPassword(e.target.value)}
                        className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#2d4a2d] mb-1 font-medium">Confirm *</label>
                      <input
                        type="password"
                        required
                        value={studentConfirmPassword}
                        onChange={(e) => setStudentConfirmPassword(e.target.value)}
                        className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="modal-terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="accent-[#25D366] rounded"
                    />
                    <label htmlFor="modal-terms" className="text-[11px] text-[#737373]">
                      I agree to the Terms of Service & Guidelines
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors mt-2"
                  >
                    Register as Student <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              /* INSTITUTE REGISTRATION FORM */
              <form onSubmit={handleInstituteSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[#2d4a2d] mb-1 font-medium">Coaching Institute Name *</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#737373] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Academy"
                      value={instName}
                      onChange={(e) => setInstName(e.target.value)}
                      className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2d4a2d] mb-1 font-medium">Official Contact Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#737373] absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="admissions@coaching.edu.in"
                      value={instEmail}
                      onChange={(e) => setInstEmail(e.target.value)}
                      className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2d4a2d] mb-1 font-medium">Official Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#737373] absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={instPhone}
                      onChange={(e) => setInstPhone(e.target.value)}
                      className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2d4a2d] mb-1 font-medium">Account Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#737373] absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={instPassword}
                      onChange={(e) => setInstPassword(e.target.value)}
                      className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors mt-2"
                >
                  Register as Institute <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Toggle to Login */}
            <div className="pt-2 text-center text-xs text-[#737373] border-t border-[#e3e3df]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setError('');
                }}
                className="text-[#128C7E] font-semibold hover:underline"
              >
                Log in
              </button>
            </div>
          </>
        ) : (
          /* LOGIN FORM */
          <div className="space-y-4">
            {activeRole === 'student' && (
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-[#f3f3ef] border border-[#e3e3df] text-[#0f1a0f] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                  />
                </svg>
                Continue with Google Account
              </button>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#2d4a2d] mb-1 font-medium">
                  {activeRole === 'student' ? 'Student Email / Gmail' : 'Institute Representative Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#737373] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2d4a2d] mb-1 font-medium">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#737373] absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors mt-2"
              >
                Log In <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-[#737373] border-t border-[#e3e3df]">
              Need an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setError('');
                }}
                className="text-[#128C7E] font-semibold hover:underline"
              >
                Create Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
