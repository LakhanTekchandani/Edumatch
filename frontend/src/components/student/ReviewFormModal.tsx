import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Institute, StudentAssociation, DimensionRatings } from '../../types';
import { StarRating } from '../common/StarRating';
import { X, ShieldCheck, Loader2 } from 'lucide-react';

interface ReviewFormModalProps {
  institute: Institute;
  association: StudentAssociation;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
  institute,
  association,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const { showToast } = useApp();

  const [overallRating, setOverallRating] = useState<number>(4);
  const [dimensions, setDimensions] = useState<DimensionRatings>({
    facultyQuality: 4,
    studyMaterial: 4,
    doubtSupport: 4,
    feeTransparency: 4,
    batchManagement: 4,
    valueForMoney: 4
  });
  const [writtenReview, setWrittenReview] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleDimensionChange = (key: keyof DimensionRatings, value: number) => {
    setDimensions((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (writtenReview.trim().length < 30) {
      setErrorMsg('Please write at least 30 characters detailing your genuine experience.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      await api.submitReview({
        instituteId: institute.id,
        studentId: user.email,
        studentName: user.name,
        studentBatchYear: association.batchYear,
        courseName: association.courseName,
        examCategory: 'Exam Prep',
        overallRating,
        dimensions,
        writtenReview
      });

      setSubmitting(false);
      showToast('Review Published!', 'Your verified student review has been published.', 'success');
      onSuccess();
    } catch (err) {
      setSubmitting(false);
      setErrorMsg('Failed to submit review. Please try again.');
    }
  };

  const dimensionFields: { key: keyof DimensionRatings; label: string; description: string }[] = [
    { key: 'facultyQuality', label: 'Faculty Quality', description: 'Teaching depth, clarity & guidance' },
    { key: 'studyMaterial', label: 'Study Material', description: 'Relevance & question difficulty' },
    { key: 'doubtSupport', label: 'Doubt Support', description: 'Availability & speed of resolutions' },
    { key: 'feeTransparency', label: 'Fee Transparency', description: 'No unexpected fees or hidden costs' },
    { key: 'batchManagement', label: 'Batch Management', description: 'Schedule adherence & batch size' },
    { key: 'valueForMoney', label: 'Value for Money', description: 'Overall return on fee invested' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white border border-[#e3e3df] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-[#0f1a0f] my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e3e3df]">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1a7a45]" />
              <h3 className="font-bold text-lg text-[#0f1a0f]">Write a Verified Student Review</h3>
            </div>
            <p className="text-xs text-[#737373]">
              {institute.name} • <span className="text-[#128C7E] font-medium">{association.courseName} ({association.batchYear})</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#737373] hover:text-[#0f1a0f] p-1 rounded-lg hover:bg-[#f3f3ef]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="py-5 space-y-6">
          
          {/* Overall Rating */}
          <div className="bg-[#f3f3ef] p-4 rounded-xl border border-[#e3e3df] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <label className="font-semibold text-sm text-[#0f1a0f] block">Overall Experience Rating</label>
              <span className="text-xs text-[#737373]">How would you summarize your overall experience?</span>
            </div>
            <StarRating
              rating={overallRating}
              interactive={true}
              size="lg"
              showText={true}
              onChange={(r) => setOverallRating(r)}
            />
          </div>

          {/* Structured 6-Dimension Ratings */}
          <div>
            <h4 className="font-semibold text-sm text-[#0f1a0f] mb-3">Structured Category Evaluation</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dimensionFields.map((dim) => (
                <div key={dim.key} className="bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df] space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-[#2d4a2d]">{dim.label}</span>
                    <span className="font-bold text-amber-600 font-mono">{dimensions[dim.key]} / 5</span>
                  </div>
                  <p className="text-[10px] text-[#737373]">{dim.description}</p>
                  <div className="pt-1">
                    <StarRating
                      rating={dimensions[dim.key]}
                      interactive={true}
                      size="sm"
                      showText={false}
                      onChange={(val) => handleDimensionChange(dim.key, val)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Written Review */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-[#0f1a0f]">Detailed Student Experience</label>
              <span className={`font-mono font-medium ${writtenReview.length < 30 ? 'text-rose-600' : 'text-[#1a7a45]'}`}>
                {writtenReview.length} / 30 chars min
              </span>
            </div>
            <textarea
              rows={5}
              value={writtenReview}
              onChange={(e) => setWrittenReview(e.target.value)}
              placeholder="Describe faculty teaching style, doubt solving speed, study material clarity, test series quality, and any advice for future aspirants..."
              className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-3 text-xs text-[#0f1a0f] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            />
            <p className="text-[11px] text-[#737373]">
              Note: Your name will be displayed with initial protection (e.g. <span className="text-[#0f1a0f] font-medium">Aman S. Verified Student</span>) to safeguard student privacy.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Submit CTA */}
          <div className="pt-3 border-t border-[#e3e3df] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#f3f3ef] text-[#0f1a0f] border border-[#e3e3df] hover:bg-[#ebebeb] text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-[#128C7E] hover:bg-[#075E54] disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish Verified Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
