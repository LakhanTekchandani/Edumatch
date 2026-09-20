import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Review } from '../../types';
import { StarRating } from '../../components/common/StarRating';
import { MessageSquare, Building, Edit3, X } from 'lucide-react';

export const InstituteReviewsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useApp();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Response Modal state
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string>('');
  const [officialRole, setOfficialRole] = useState<string>('Academic Director');

  useEffect(() => {
    loadReviews();
  }, [user]);

  const loadReviews = async () => {
    if (!user?.instituteId) return;
    setLoading(true);
    const data = await api.getReviewsForInstitute(user.instituteId);
    setReviews(data);
    setLoading(false);
  };

  const handleOpenResponse = (rev: Review) => {
    setActiveReviewId(rev.id);
    setResponseText(rev.instituteResponse?.responseText || '');
    setOfficialRole(rev.instituteResponse?.officialRole || 'Academic Director');
  };

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReviewId) return;

    await api.respondToReview(activeReviewId, responseText, officialRole);
    showToast('Response Published', 'Official institute response published.', 'success');
    setActiveReviewId(null);
    loadReviews();
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="border-b border-[#e3e3df] pb-4">
          <h1 className="text-2xl font-extrabold text-[#0f1a0f] flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-amber-600" /> Student Reviews & Official Responses
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Read verified student reviews and publish official responses. Institute accounts cannot modify student reviews.
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white border border-[#e3e3df] rounded-2xl p-8 text-center space-y-2 shadow-xs">
            <MessageSquare className="w-10 h-10 text-[#737373] mx-auto" />
            <h3 className="font-bold text-[#0f1a0f] text-base">No Student Reviews Yet</h3>
            <p className="text-xs text-[#737373] max-w-sm mx-auto">
              Once enrolled students verify their OTP and submit feedback, reviews will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-4 shadow-xs">
                
                {/* Review Top Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-[#0f1a0f] text-sm">{rev.studentName}</div>
                    <div className="text-xs text-[#737373]">{rev.courseName} ({rev.studentBatchYear})</div>
                  </div>
                  <StarRating rating={rev.overallRating} size="sm" />
                </div>

                <p className="text-xs text-[#0f1a0f] leading-relaxed bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df]">
                  "{rev.writtenReview}"
                </p>

                {/* Existing Official Response */}
                {rev.instituteResponse ? (
                  <div className="p-4 bg-[#d4f0e1]/40 border border-[#25D366]/30 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between font-semibold text-[#128C7E]">
                      <span className="flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-[#128C7E]" /> Official Institute Response
                      </span>
                      <button
                        onClick={() => handleOpenResponse(rev)}
                        className="text-[11px] text-[#128C7E] hover:underline flex items-center gap-1 font-medium"
                      >
                        <Edit3 className="w-3 h-3" /> Edit Response
                      </button>
                    </div>
                    <p className="text-[#2d4a2d] italic">"{rev.instituteResponse.responseText}"</p>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenResponse(rev)}
                    className="px-4 py-2 bg-[#d4f0e1] text-[#128C7E] border border-[#25D366]/40 hover:bg-[#d4f0e1]/80 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Building className="w-3.5 h-3.5" /> Post Official Response
                  </button>
                )}

              </div>
            ))}
          </div>
        )}

      </div>

      {/* OFFICIAL RESPONSE MODAL */}
      {activeReviewId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-[#e3e3df] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-[#0f1a0f]">
            <div className="flex items-center justify-between pb-4 border-b border-[#e3e3df]">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-[#128C7E]" />
                <h3 className="font-bold text-base text-[#0f1a0f]">Post Official Institute Response</h3>
              </div>
              <button onClick={() => setActiveReviewId(null)} className="text-[#737373] hover:text-[#0f1a0f] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitResponse} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block text-[#2d4a2d] font-medium mb-1">Official Representative Role</label>
                <input
                  type="text"
                  required
                  value={officialRole}
                  onChange={(e) => setOfficialRole(e.target.value)}
                  placeholder="e.g. Academic Director / Management"
                  className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
              </div>

              <div>
                <label className="block text-[#2d4a2d] font-medium mb-1">Official Response Message</label>
                <textarea
                  rows={4}
                  required
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Acknowledge feedback, detail academic improvements, or provide official clarification..."
                  className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveReviewId(null)}
                  className="px-4 py-2 rounded-xl bg-[#f3f3ef] text-[#0f1a0f] border border-[#e3e3df] text-xs font-semibold hover:bg-[#ebebeb] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Publish Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
