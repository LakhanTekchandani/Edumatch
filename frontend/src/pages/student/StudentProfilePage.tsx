import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, ShieldCheck } from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="border-b border-[#e3e3df] pb-4">
          <h1 className="text-2xl font-extrabold text-[#0f1a0f] flex items-center gap-2">
            <User className="w-6 h-6 text-[#128C7E]" /> Student Account Settings
          </h1>
          <p className="text-xs text-[#737373] mt-1">Manage your personal profile and security.</p>
        </div>

        <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-4 text-xs shadow-xs">
          <div className="space-y-1">
            <label className="text-[#737373] font-medium">Full Name</label>
            <div className="p-3 bg-[#f3f3ef] border border-[#e3e3df] rounded-xl text-[#0f1a0f] font-semibold">
              {user?.name}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#737373] font-medium">Email / Gmail Address</label>
            <div className="p-3 bg-[#f3f3ef] border border-[#e3e3df] rounded-xl text-[#0f1a0f] font-mono">
              {user?.email}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#737373] font-medium">Mobile Contact</label>
            <div className="p-3 bg-[#f3f3ef] border border-[#e3e3df] rounded-xl text-[#0f1a0f] font-mono">
              {user?.mobile || '+91 98765 00112'}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-[#1a7a45] bg-[#d4f0e1] border border-[#25D366]/40 p-3 rounded-xl font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#1a7a45]" />
            <span>Account Verified for Enrolment OTP Matching</span>
          </div>
        </div>
      </div>
    </div>
  );
};
