import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Institute } from '../../types';

export const InstituteProfileManager: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useApp();
  const [institute, setInstitute] = useState<Institute | null>(null);

  const [tagline, setTagline] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [batchInfo, setBatchInfo] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  useEffect(() => {
    if (user?.instituteId) {
      api.getInstituteById(user.instituteId).then((inst) => {
        if (inst) {
          setInstitute(inst);
          setTagline(inst.tagline);
          setAbout(inst.about);
          setBatchInfo(inst.batchInfo);
          setPhone(inst.contact.phone);
          setWebsite(inst.contact.website || '');
        }
      });
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile Updated', 'Institute details saved successfully.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-[#e3e3df] pb-4">
          <h1 className="text-2xl font-extrabold text-[#0f1a0f]">Manage Institute Profile</h1>
          <p className="text-xs text-[#737373] mt-1">Update public details, batch info, and official contacts.</p>
        </div>

        <form onSubmit={handleSave} className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-4 text-xs shadow-xs">
          <div>
            <label className="block text-[#2d4a2d] font-medium mb-1">Tagline Concept</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            />
          </div>

          <div>
            <label className="block text-[#2d4a2d] font-medium mb-1">About Institute</label>
            <textarea
              rows={4}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            />
          </div>

          <div>
            <label className="block text-[#2d4a2d] font-medium mb-1">Batch Schedule & Info</label>
            <textarea
              rows={2}
              value={batchInfo}
              onChange={(e) => setBatchInfo(e.target.value)}
              className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#2d4a2d] font-medium mb-1">Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />
            </div>
            <div>
              <label className="block text-[#2d4a2d] font-medium mb-1">Official Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold rounded-xl text-xs shadow-xs transition-colors"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
