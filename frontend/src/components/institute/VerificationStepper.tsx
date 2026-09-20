import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { VerificationDocument, VerificationStatus } from '../../types';
import {
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building,
  UserCheck,
  Loader2
} from 'lucide-react';

interface VerificationStepperProps {
  currentStatus: VerificationStatus;
  existingDoc?: VerificationDocument | null;
  onSubmitted?: () => void;
}

export const VerificationStepper: React.FC<VerificationStepperProps> = ({
  currentStatus,
  existingDoc,
  onSubmitted
}) => {
  const { user } = useAuth();
  const { showToast } = useApp();

  const [step, setStep] = useState<number>(1);
  const [repName, setRepName] = useState<string>(existingDoc?.repName || user?.name || '');
  const [repDesignation, setRepDesignation] = useState<string>(existingDoc?.repDesignation || 'Director / Authorized Representative');
  const [officialWebsite, setOfficialWebsite] = useState<string>(existingDoc?.officialWebsite || '');

  // Simulated File Upload Names
  const [repIdFile, setRepIdFile] = useState<string>(existingDoc?.repIdProofName || '');
  const [addressFile, setAddressFile] = useState<string>(existingDoc?.addressProofName || '');
  const [businessFile, setBusinessFile] = useState<string>(existingDoc?.businessRegName || '');

  const [loading, setLoading] = useState<boolean>(false);

  const handleSimulatedFileUpload = (type: 'id' | 'address' | 'business', filename: string) => {
    if (type === 'id') setRepIdFile(filename);
    if (type === 'address') setAddressFile(filename);
    if (type === 'business') setBusinessFile(filename);
    showToast('File Uploaded', `${filename} attached successfully.`, 'success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.instituteId) return;

    if (!repIdFile || !addressFile || !businessFile) {
      showToast('Documents Required', 'Please upload all 3 required verification documents.', 'error');
      return;
    }

    setLoading(true);
    await api.submitVerificationDocs({
      instituteId: user.instituteId,
      repName,
      repDesignation,
      repIdProofName: repIdFile,
      addressProofName: addressFile,
      businessRegName: businessFile,
      officialWebsite
    });
    setLoading(false);
    showToast('Verification Submitted!', 'Your documents are currently under review by EduMatch moderation.', 'success');
    if (onSubmitted) onSubmitted();
  };

  return (
    <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-6 shadow-xs">
      
      {/* Top Banner Status */}
      <div className="p-4 rounded-xl border flex items-center justify-between gap-4 bg-[#f3f3ef] border-[#e3e3df]">
        <div className="flex items-center gap-3">
          {currentStatus === 'verified' && <CheckCircle2 className="w-6 h-6 text-[#1a7a45]" />}
          {currentStatus === 'pending' && <Clock className="w-6 h-6 text-amber-600 animate-pulse" />}
          {currentStatus === 'unverified' && <Building className="w-6 h-6 text-[#128C7E]" />}
          {currentStatus === 'rejected' && <AlertCircle className="w-6 h-6 text-rose-600" />}

          <div>
            <h4 className="font-bold text-[#0f1a0f] text-sm flex items-center gap-2">
              Verification Status: <span className="capitalize text-[#128C7E]">{currentStatus}</span>
            </h4>
            <p className="text-xs text-[#737373]">
              {currentStatus === 'verified' && 'Your coaching institute is verified. Your profile badge is live.'}
              {currentStatus === 'pending' && 'Documents submitted on ' + (existingDoc?.submittedAt ? new Date(existingDoc.submittedAt).toLocaleDateString() : 'today') + '. Review in progress.'}
              {currentStatus === 'unverified' && 'Complete your verification to add your institute to EduMatch search & reviews.'}
              {currentStatus === 'rejected' && 'Verification failed. Please review documents and resubmit.'}
            </p>
          </div>
        </div>
      </div>

      {/* Form Flow if unverified or re-submitting */}
      {currentStatus !== 'verified' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Step Indicator */}
          <div className="grid grid-cols-3 gap-2 border-b border-[#e3e3df] pb-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`p-2 rounded-lg text-xs font-semibold text-center transition-all ${
                step === 1 ? 'bg-[#128C7E] text-white shadow-xs' : 'bg-[#f3f3ef] text-[#737373]'
              }`}
            >
              1. Representative Details
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className={`p-2 rounded-lg text-xs font-semibold text-center transition-all ${
                step === 2 ? 'bg-[#128C7E] text-white shadow-xs' : 'bg-[#f3f3ef] text-[#737373]'
              }`}
            >
              2. Document Uploads
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className={`p-2 rounded-lg text-xs font-semibold text-center transition-all ${
                step === 3 ? 'bg-[#128C7E] text-white shadow-xs' : 'bg-[#f3f3ef] text-[#737373]'
              }`}
            >
              3. Review & Submit
            </button>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h5 className="font-semibold text-sm text-[#0f1a0f] flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#128C7E]" /> Authorized Representative Details
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#2d4a2d] mb-1 font-medium">Representative Full Name</label>
                  <input
                    type="text"
                    required
                    value={repName}
                    onChange={(e) => setRepName(e.target.value)}
                    className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                </div>
                <div>
                  <label className="block text-[#2d4a2d] mb-1 font-medium">Official Designation</label>
                  <input
                    type="text"
                    required
                    value={repDesignation}
                    onChange={(e) => setRepDesignation(e.target.value)}
                    className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#2d4a2d] mb-1 font-medium">Official Website URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://yourcoaching.com"
                    value={officialWebsite}
                    onChange={(e) => setOfficialWebsite(e.target.value)}
                    className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Continue to Document Uploads
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h5 className="font-semibold text-sm text-[#0f1a0f] flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#128C7E]" /> Private Business & Identity Verification Uploads
              </h5>
              <p className="text-xs text-[#737373]">
                Documents are kept strictly confidential and used solely for authenticating institute ownership.
              </p>

              <div className="space-y-3">
                
                {/* ID Proof */}
                <div className="p-3 bg-[#f3f3ef] border border-[#e3e3df] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-[#0f1a0f]">Representative Government ID (Aadhaar / PAN / Passport)</div>
                    <div className="text-[#737373] text-[11px]">{repIdFile ? repIdFile : 'No file selected (PDF / JPG up to 5MB)'}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSimulatedFileUpload('id', 'rep_id_government_proof.pdf')}
                    className="px-3 py-1.5 bg-white hover:bg-[#ebebeb] border border-[#e3e3df] text-[#128C7E] rounded-lg text-xs font-medium transition-colors"
                  >
                    {repIdFile ? 'Change File' : 'Upload File'}
                  </button>
                </div>

                {/* Address Proof */}
                <div className="p-3 bg-[#f3f3ef] border border-[#e3e3df] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-[#0f1a0f]">Institute Premises Lease / Utility Bill</div>
                    <div className="text-[#737373] text-[11px]">{addressFile ? addressFile : 'No file selected (PDF up to 10MB)'}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSimulatedFileUpload('address', 'premises_address_deed.pdf')}
                    className="px-3 py-1.5 bg-white hover:bg-[#ebebeb] border border-[#e3e3df] text-[#128C7E] rounded-lg text-xs font-medium transition-colors"
                  >
                    {addressFile ? 'Change File' : 'Upload File'}
                  </button>
                </div>

                {/* Business Registration */}
                <div className="p-3 bg-[#f3f3ef] border border-[#e3e3df] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-[#0f1a0f]">GST Certificate / Educational Registration Doc</div>
                    <div className="text-[#737373] text-[11px]">{businessFile ? businessFile : 'No file selected (PDF up to 10MB)'}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSimulatedFileUpload('business', 'gst_registration_cert.pdf')}
                    className="px-3 py-1.5 bg-white hover:bg-[#ebebeb] border border-[#e3e3df] text-[#128C7E] rounded-lg text-xs font-medium transition-colors"
                  >
                    {businessFile ? 'Change File' : 'Upload File'}
                  </button>
                </div>

              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl bg-[#f3f3ef] text-[#0f1a0f] border border-[#e3e3df] text-xs font-semibold hover:bg-[#ebebeb] transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Proceed to Review
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h5 className="font-semibold text-sm text-[#0f1a0f]">Review & Complete Verification Submission</h5>
              <div className="bg-[#f3f3ef] p-4 rounded-xl border border-[#e3e3df] text-xs space-y-2">
                <div><span className="text-[#737373]">Representative:</span> <span className="text-[#0f1a0f] font-medium">{repName} ({repDesignation})</span></div>
                <div><span className="text-[#737373]">Official Website:</span> <span className="text-[#128C7E] font-mono">{officialWebsite || 'None provided'}</span></div>
                <div><span className="text-[#737373]">Attached Documents:</span> <span className="text-[#1a7a45] font-mono font-medium">3 / 3 files attached</span></div>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl bg-[#f3f3ef] text-[#0f1a0f] border border-[#e3e3df] text-xs font-semibold hover:bg-[#ebebeb] transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Verification Request'}
                </button>
              </div>
            </div>
          )}

        </form>
      )}

    </div>
  );
};
