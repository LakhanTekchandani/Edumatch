import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { X, Flag, CheckCircle2 } from 'lucide-react';

interface ReportReviewModalProps {
  reviewId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportReviewModal: React.FC<ReportReviewModalProps> = ({ reviewId, isOpen, onClose }) => {
  const { showToast } = useApp();
  const [reason, setReason] = useState<string>('Suspicious');
  const [explanation, setExplanation] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.reportReview(reviewId, reason, explanation);
    setSubmitted(true);
    showToast('Report Submitted', 'Thanks. Your report has been submitted to moderation.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-[#e3e3df] rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-[#0f1a0f]">
        <div className="flex items-center justify-between pb-4 border-b border-[#e3e3df]">
          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-rose-500" />
            <h3 className="font-bold text-base text-[#0f1a0f]">Report Student Review</h3>
          </div>
          <button onClick={onClose} className="text-[#737373] hover:text-[#0f1a0f] p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#1a7a45] mx-auto" />
            <h4 className="font-bold text-[#0f1a0f] text-base">Thanks! Report Received</h4>
            <p className="text-xs text-[#737373]">
              Our automated system and review team will investigate this report to preserve platform integrity.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-5 py-2 rounded-xl bg-[#128C7E] text-white text-xs font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#2d4a2d] mb-1">Reason for Report</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-xs text-[#0f1a0f]"
              >
                <option value="Suspicious">Suspicious / Spam</option>
                <option value="Abusive">Abusive or Vulgar Language</option>
                <option value="Inappropriate">Inappropriate Content</option>
                <option value="Misleading">Misleading or False Information</option>
                <option value="Other">Other Reason</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2d4a2d] mb-1">Additional Explanation (Optional)</label>
              <textarea
                rows={3}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Provide details on why this review appears inaccurate or inappropriate..."
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-xs text-[#0f1a0f] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#f3f3ef] border border-[#e3e3df] text-[#0f1a0f] text-xs font-semibold hover:bg-[#ebebeb] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
