import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Building2 } from 'lucide-react';

export const InstituteSettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="border-b border-[#e3e3df] pb-4">
          <h1 className="text-2xl font-extrabold text-[#0f1a0f] flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#128C7E]" /> Representative Account Settings
          </h1>
          <p className="text-xs text-[#737373] mt-1">Manage official institute account credentials.</p>
        </div>

        <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-4 text-xs shadow-xs">
          <div className="space-y-1">
            <label className="text-[#737373] font-medium">Representative Name</label>
            <div className="p-3 bg-[#f3f3ef] border border-[#e3e3df] rounded-xl text-[#0f1a0f] font-semibold">
              {user?.name}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#737373] font-medium">Official Representative Email</label>
            <div className="p-3 bg-[#f3f3ef] border border-[#e3e3df] rounded-xl text-[#0f1a0f] font-mono">
              {user?.email}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#737373] font-medium">Associated Institute ID</label>
            <div className="p-3 bg-[#f3f3ef] border border-[#e3e3df] rounded-xl text-[#128C7E] font-mono font-bold">
              {user?.instituteId}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
