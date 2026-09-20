import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Building2, Mail, Phone, Lock, ArrowRight, ShieldAlert } from 'lucide-react';

export const InstituteRegisterPage: React.FC = () => {
  const { registerInstitute } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [instituteName, setInstituteName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [registered, setRegistered] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerInstitute({ name: instituteName, email, phone });
    setRegistered(true);
    showToast('Registration Initiated', 'Institute account created in unverified state.', 'info');
  };

  return (
    <div className="min-h-[85vh] bg-[#fafaf7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-[#e3e3df] rounded-3xl p-8 shadow-sm space-y-6">
        
        {registered ? (
          /* PROMPT SPECIFIC REGISTRATION PROMPT STEP */
          <div className="text-center space-y-5 py-4">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#0f1a0f]">Institute Account Created</h3>
              <p className="text-xs text-amber-800 font-semibold bg-amber-50 p-3 rounded-xl border border-amber-200">
                "Complete your verification to add your institute to EduMatch."
              </p>
            </div>

            <p className="text-xs text-[#737373] leading-relaxed">
              Your institute is currently in <span className="text-[#0f1a0f] font-bold">Unverified</span> state. Verified status is required before your profile is searchable and before student reviews are enabled.
            </p>

            <button
              onClick={() => navigate('/institute/verification')}
              className="w-full py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              Proceed to Complete Verification <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center mx-auto text-[#128C7E]">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#0f1a0f]">Register Coaching Institute</h2>
              <p className="text-xs text-[#737373]">
                Register representative account for institute management.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#2d4a2d] mb-1 font-medium">Coaching Institute Name *</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#737373] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Academy"
                    value={instituteName}
                    onChange={(e) => setInstituteName(e.target.value)}
                    className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2.5 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2d4a2d] mb-1 font-medium">Official Contact Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#737373] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="admissions@coaching.edu.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2.5 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2d4a2d] mb-1 font-medium">Official Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#737373] absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2.5 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2d4a2d] mb-1 font-medium">Account Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#737373] absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl py-2.5 pl-9 pr-3 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-[#737373] border-t border-[#e3e3df]">
              Already registered?{' '}
              <Link to="/login" className="text-[#128C7E] font-semibold hover:underline">
                Institute Representative Sign In
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
