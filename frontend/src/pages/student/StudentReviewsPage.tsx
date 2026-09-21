import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Review, DimensionRatings } from '../../types';
import { StarRating } from '../../components/common/StarRating';
import { EmptyState } from '../../components/common/EmptyState';
import {
  MessageSquare,
  Edit3,
  Trash2,
  X,
  Building,
  Loader2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

// ─── Edit Review Modal ──────────────────────────────────────────────────────

interface EditReviewModalProps {
  review: Review;
  onClose: () => void;
  onSaved: () => void;
}

const EditReviewModal: React.FC<EditReviewModalProps> = ({ review, onClose, onSaved }) => {
  const { showToast } = useApp();
  const [overallRating, setOverallRating] = useState<number>(review.overallRating);
  const [dimensions, setDimensions] = useState<DimensionRatings>({ ...review.dimensions });
  const [writtenReview, setWrittenReview] = useState<string>(review.writtenReview);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const dimensionFields: { key: keyof DimensionRatings; label: string; description: string }[] = [
    { key: 'facultyQuality', label: 'Faculty Quality', description: 'Teaching depth, clarity & guidance' },
    { key: 'studyMaterial', label: 'Study Material', description: 'Relevance & question difficulty' },
    { key: 'doubtSupport', label: 'Doubt Support', description: 'Availability & speed of resolutions' },
    { key: 'feeTransparency', label: 'Fee Transparency', description: 'No unexpected fees or hidden costs' },
    { key: 'batchManagement', label: 'Batch Management', description: 'Schedule adherence & batch size' },
    { key: 'valueForMoney', label: 'Value for Money', description: 'Overall return on fee invested' }
  ];

  const handleDimChange = (key: keyof DimensionRatings, val: number) => {
    setDimensions((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (writtenReview.trim().length < 30) {
      setErrorMsg('Please write at least 30 characters to describe your experience.');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');
    try {
      await api.editReview(review.id, { overallRating, dimensions, writtenReview });
      showToast('Review Updated', 'Your review has been updated successfully.', 'success');
      onSaved();
    } catch {
      setErrorMsg('Failed to update review. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white border border-[#e3e3df] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-[#0f1a0f] my-8">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e3e3df]">
          <div>
            <div className="flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-[#128C7E]" />
              <h3 className="font-bold text-lg text-[#0f1a0f]">Edit Your Review</h3>
            </div>
            <p className="text-xs text-[#737373] mt-0.5">
              {review.instituteName} ·{' '}
              <span className="text-[#128C7E] font-medium">
                {review.courseName} ({review.studentBatchYear})
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#737373] hover:text-[#0f1a0f] p-1 rounded-lg hover:bg-[#f3f3ef]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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

          {/* Dimension Ratings */}
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
                      onChange={(val) => handleDimChange(dim.key, val)}
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
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}

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
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Delete Confirmation Modal ───────────────────────────────────────────────

interface DeleteConfirmModalProps {
  review: Review;
  onClose: () => void;
  onDeleted: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ review, onClose, onDeleted }) => {
  const { showToast } = useApp();
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleting(true);
    await api.deleteReview(review.id);
    showToast('Review Deleted', 'Your review has been permanently deleted.', 'success');
    onDeleted();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-[#e3e3df] rounded-2xl max-w-md w-full p-6 shadow-2xl text-[#0f1a0f]">
        <div className="flex items-center gap-3 pb-4 border-b border-[#e3e3df]">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#0f1a0f]">Delete Review?</h3>
            <p className="text-xs text-[#737373]">This action cannot be undone.</p>
          </div>
        </div>

        <div className="py-4 space-y-2 text-xs text-[#737373]">
          <p>
            You are about to permanently delete your verified review for{' '}
            <span className="font-semibold text-[#0f1a0f]">{review.instituteName}</span>.
          </p>
          <p>
            The institute's overall rating will be recalculated. This review will no longer be
            visible to prospective students.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-[#e3e3df]">
          <button
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2.5 rounded-xl bg-[#f3f3ef] text-[#0f1a0f] border border-[#e3e3df] hover:bg-[#ebebeb] text-xs font-semibold transition-colors"
          >
            Keep Review
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            {deleting ? 'Deleting…' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export const StudentReviewsPage: React.FC = () => {
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deletingReview, setDeletingReview] = useState<Review | null>(null);

  const loadReviews = async () => {
    if (!user?.email) return;
    setLoading(true);
    const data = await api.getReviewsByStudent(user.email);
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, [user]);

  const handleEditSaved = () => {
    setEditingReview(null);
    loadReviews();
  };

  const handleDeleted = () => {
    setDeletingReview(null);
    loadReviews();
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="border-b border-[#e3e3df] pb-4">
          <h1 className="text-2xl font-extrabold text-[#0f1a0f] flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#128C7E]" /> My Verified Student Reviews
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Manage your published coaching reviews. You can edit or delete any review you have submitted.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-[#737373]">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading your reviews…</span>
          </div>
        ) : reviews.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No reviews submitted yet."
            description="Your verified experiences help other students make informed coaching decisions. Visit an institute profile to verify enrolment and write a review."
            actionLabel="Explore Institutes to Review"
            onAction={() => (window.location.href = '/explore')}
          />
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-4 shadow-xs"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs text-[#1a7a45] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Review
                    </div>
                    <div className="font-bold text-[#0f1a0f] text-sm flex items-center gap-2 flex-wrap">
                      <Building className="w-3.5 h-3.5 text-[#737373] shrink-0" />
                      {rev.instituteName}
                    </div>
                    <div className="text-xs text-[#737373]">
                      {rev.courseName} · Batch {rev.studentBatchYear}
                    </div>
                    <div className="text-[10px] text-[#aaaaaa]">
                      {formatDate(rev.createdAt)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <StarRating rating={rev.overallRating} size="sm" />
                  </div>
                </div>

                {/* Written Review */}
                <p className="text-xs text-[#0f1a0f] leading-relaxed bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df]">
                  "{rev.writtenReview}"
                </p>

                {/* Institute Response (read-only for student) */}
                {rev.instituteResponse && (
                  <div className="p-4 bg-[#d4f0e1]/40 border border-[#25D366]/30 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-[#128C7E]">
                      <Building className="w-4 h-4" />
                      Official Institute Response
                      <span className="text-[10px] font-normal text-[#737373] ml-1">
                        — {rev.instituteResponse.officialRole}
                      </span>
                    </div>
                    <p className="text-[#2d4a2d] italic">{rev.instituteResponse.responseText}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-1 border-t border-[#e3e3df]">
                  <Link
                    to={`/institutes/${rev.instituteId}`}
                    className="text-xs text-[#128C7E] hover:underline flex items-center gap-1 font-medium"
                  >
                    <ExternalLink className="w-3 h-3" /> View Institute Profile
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      id={`edit-review-${rev.id}`}
                      onClick={() => setEditingReview(rev)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f3f3ef] border border-[#e3e3df] hover:bg-[#ebebeb] text-xs font-medium text-[#0f1a0f] transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#128C7E]" />
                      Edit
                    </button>
                    <button
                      id={`delete-review-${rev.id}`}
                      onClick={() => setDeletingReview(rev)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 hover:bg-rose-100 text-xs font-medium text-rose-700 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingReview && (
        <EditReviewModal
          review={editingReview}
          onClose={() => setEditingReview(null)}
          onSaved={handleEditSaved}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingReview && (
        <DeleteConfirmModal
          review={deletingReview}
          onClose={() => setDeletingReview(null)}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
};
