import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { ReviewEligibilityState, Institute, StudentAssociation } from '../../types';
import {
  ShieldCheck,
  Lock,
  Mail,
  X,
  AlertCircle,
  Loader2,
  CheckCircle2,
  HelpCircle,
  KeyRound
} from 'lucide-react';
import { ReviewFormModal } from './ReviewFormModal';

interface ReviewEligibilityModalProps {
  institute: Institute;
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted?: () => void;
}

export const ReviewEligibilityModal: React.FC<ReviewEligibilityModalProps> = ({
  institute,
  isOpen,
  onClose,
  onReviewSubmitted
}) => {
  const { user, isAuthenticated, loginAsStudent } = useAuth();
  const { showToast } = useApp();

  const [eligibilityState, setEligibilityState] = useState<ReviewEligibilityState>('not_logged_in');
  const [association, setAssociation] = useState<StudentAssociation | undefined>(undefined);
  const [reason, setReason] = useState<string>('');
  
  // OTP state
  const [otpCode, setOtpCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>('');

  // Unlocked form modal
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);

  // Check eligibility on open
  React.useEffect(() => {
    if (!isOpen) return;
    checkState();
  }, [isOpen, user]);

  const checkState = async () => {
    setLoading(true);
    setOtpError('');
    if (!isAuthenticated || !user) {
      setEligibilityState('not_logged_in');
      setLoading(false);
      return;
    }

    const result = await api.checkEligibility(user.email, institute.id);
    setEligibilityState(result.state);
    setAssociation(result.association);
    setReason(result.reason || '');
    setLoading(false);
  };

  const handleSendOTP = async () => {
    if (!user?.email) return;
    setLoading(true);
    setOtpError('');
    await api.sendOTP(user.email);
    setEligibilityState('otp_sent');
    setLoading(false);
    showToast('OTP Sent', `6-digit verification code sent to ${user.email}`, 'info');
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;
    setLoading(true);
    setOtpError('');

    const res = await api.verifyOTP(user.email, otpCode);
    setLoading(false);

    if (res.success) {
      setEligibilityState('verified_form_unlocked');
      showToast('Enrolment Verified!', 'Review submission form unlocked.', 'success');
      setShowReviewForm(true);
    } else {
      setOtpError(res.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-[#e3e3df] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-[#0f1a0f]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e3e3df]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#128C7E]" />
            <h3 className="font-bold text-base text-[#0f1a0f]">Review Verification Flow</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#737373] hover:text-[#0f1a0f] p-1 rounded-lg hover:bg-[#f3f3ef]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body State Switcher */}
        <div className="py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
              <Loader2 className="w-8 h-8 text-[#128C7E] animate-spin" />
              <p className="text-xs text-[#737373]">Verifying student enrolment criteria...</p>
            </div>
          ) : (
            <>
              {/* STATE 1: NOT LOGGED IN */}
              {eligibilityState === 'not_logged_in' && (
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#f3f3ef] border border-[#e3e3df] flex items-center justify-center mx-auto text-[#128C7E]">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-lg text-[#0f1a0f]">Student Login Required</h4>
                  <p className="text-xs text-[#737373] leading-relaxed max-w-sm mx-auto">
                    To maintain 100% review integrity, reviews on EduMatch are restricted to enrolled students.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        loginAsStudent();
                        checkState();
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      Log In as Demo Student (Instant)
                    </button>
                    <p className="text-[11px] text-[#737373]">
                      Or use your verified student email account.
                    </p>
                  </div>
                </div>
              )}

              {/* STATE 2: NO ASSOCIATION FOUND */}
              {eligibilityState === 'no_association_found' && (
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-base text-amber-800">No Student Enrolment Found</h4>
                  <p className="text-xs text-[#4a554a] bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df] leading-relaxed text-left">
                    {reason}
                  </p>
                  <div className="text-left text-xs text-[#4a554a] space-y-2 bg-[#d4f0e1]/30 p-3 rounded-xl border border-[#25D366]/30">
                    <div className="font-semibold text-[#128C7E]">How to fix this:</div>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Ask your coaching institute representative to add your email ({user?.email}) to their active student list.</li>
                      <li>Ensure you logged in using the exact email registered with {institute.name}.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* STATE 3: ASSOCIATION INACTIVE */}
              {eligibilityState === 'association_inactive' && (
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-base text-rose-700">Enrolment Record Inactive</h4>
                  <p className="text-xs text-[#4a554a] bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df] text-left">
                    {reason}
                  </p>
                </div>
              )}

              {/* STATE 4: ELIGIBLE - OTP REQUIRED */}
              {eligibilityState === 'eligible_otp_required' && (
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center mx-auto text-[#1a7a45]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-base text-[#1a7a45]">Enrolment Record Match Found!</h4>
                  <div className="bg-[#f3f3ef] p-3.5 rounded-xl border border-[#e3e3df] text-left text-xs space-y-1">
                    <div className="text-[#737373]">Matched Institute: <span className="text-[#0f1a0f] font-medium">{institute.name}</span></div>
                    <div className="text-[#737373]">Course: <span className="text-[#0f1a0f] font-medium">{association?.courseName}</span></div>
                    <div className="text-[#737373]">Batch Year: <span className="text-[#0f1a0f] font-medium">{association?.batchYear}</span></div>
                  </div>
                  <p className="text-xs text-[#737373]">
                    Before writing your review, click below to receive a 6-digit OTP on your registered email <span className="text-[#128C7E] font-semibold">{user?.email}</span>.
                  </p>
                  <button
                    onClick={handleSendOTP}
                    className="w-full py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Send Verification OTP Code
                  </button>
                </div>
              )}

              {/* STATE 5 & 6: OTP SENT & VERIFYING */}
              {(eligibilityState === 'otp_sent' || eligibilityState === 'otp_verifying') && (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="text-center space-y-1">
                    <KeyRound className="w-8 h-8 text-[#128C7E] mx-auto" />
                    <h4 className="font-bold text-base text-[#0f1a0f]">Enter 6-Digit Verification Code</h4>
                    <p className="text-xs text-[#737373]">
                      We sent an OTP code to <span className="text-[#128C7E] font-medium">{user?.email}</span>.
                    </p>
                  </div>

                  <div className="bg-[#f3f3ef] p-4 rounded-xl border border-[#e3e3df] text-center space-y-3">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 123456"
                      className="w-48 mx-auto text-center tracking-[0.5em] font-mono text-xl font-bold bg-white text-[#128C7E] border border-[#25D366]/50 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    />
                    <div className="text-[11px] text-[#737373]">
                      Demo test code: <span className="font-mono text-[#128C7E] font-bold">123456</span> (or any 6-digit number ending in even digit)
                    </div>
                  </div>

                  {otpError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{otpError}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-[#737373]">
                    <span>Code expires in 05:00</span>
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="text-[#128C7E] hover:underline font-medium"
                    >
                      Resend OTP
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={otpCode.length !== 6 || loading}
                    className="w-full py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify OTP & Unlock Form'}
                  </button>
                </form>
              )}

              {/* STATE 7 & 8: VERIFIED OR SUBMITTED */}
              {eligibilityState === 'verified_form_unlocked' && (
                <div className="text-center space-y-4 py-4">
                  <CheckCircle2 className="w-12 h-12 text-[#1a7a45] mx-auto" />
                  <h4 className="font-bold text-base text-[#0f1a0f]">Enrolment Verified!</h4>
                  <p className="text-xs text-[#737373]">
                    You are verified as an enrolled student of {institute.name}. Click below to write your structured review.
                  </p>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebd5a] text-[#075E54] font-bold text-xs shadow-xs transition-colors"
                  >
                    Open Review Form
                  </button>
                </div>
              )}

              {eligibilityState === 'review_submitted' && (
                <div className="text-center space-y-4 py-4">
                  <CheckCircle2 className="w-12 h-12 text-[#128C7E] mx-auto" />
                  <h4 className="font-bold text-base text-[#0f1a0f]">Review Already Submitted</h4>
                  <p className="text-xs text-[#4a554a] bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df]">
                    {reason}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#e3e3df] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#f3f3ef] text-[#0f1a0f] border border-[#e3e3df] hover:bg-[#ebebeb] text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* RENDER UNLOCKED REVIEW FORM MODAL */}
      {showReviewForm && association && (
        <ReviewFormModal
          institute={institute}
          association={association}
          isOpen={showReviewForm}
          onClose={() => {
            setShowReviewForm(false);
            onClose();
          }}
          onSuccess={() => {
            setShowReviewForm(false);
            onClose();
            if (onReviewSubmitted) onReviewSubmitted();
          }}
        />
      )}
    </div>
  );
};
