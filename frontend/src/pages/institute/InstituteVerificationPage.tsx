import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { VerificationStepper } from '../../components/institute/VerificationStepper';
import { Institute, VerificationDocument } from '../../types';

export const InstituteVerificationPage: React.FC = () => {
  const { user } = useAuth();
  const [institute, setInstitute] = useState<Institute | null>(null);
  const [doc, setDoc] = useState<VerificationDocument | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user?.instituteId) return;
    setLoading(true);
    const inst = await api.getInstituteById(user.instituteId);
    setInstitute(inst);
    const vDoc = await api.getVerificationDoc(user.instituteId);
    setDoc(vDoc);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-[#e3e3df] pb-4">
          <h1 className="text-2xl font-extrabold text-[#0f1a0f]">Institute Verification Center</h1>
          <p className="text-xs text-[#737373] mt-1">
            Upload representative authorization & business documentation to claim your verified badge.
          </p>
        </div>

        <VerificationStepper
          currentStatus={institute?.verificationStatus || 'unverified'}
          existingDoc={doc}
          onSubmitted={() => loadData()}
        />
      </div>
    </div>
  );
};
