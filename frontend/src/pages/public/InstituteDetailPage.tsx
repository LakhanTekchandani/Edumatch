import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Institute, Review } from '../../types';
import { useApp } from '../../context/AppContext';
import { VerificationBadge } from '../../components/common/Badge';
import { StarRating } from '../../components/common/StarRating';
import { ReviewEligibilityModal } from '../../components/student/ReviewEligibilityModal';
import { ReportReviewModal } from '../../components/student/ReportReviewModal';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  BookOpen,
  Bookmark,
  Scale,
  Building,
  ThumbsUp,
  Flag,
  PenSquare,
  MessageSquare,
  Users,
  Star
} from 'lucide-react';

export const InstituteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toggleShortlist, toggleCompare, isInShortlist, isInCompare, showToast } = useApp();

  const [institute, setInstitute] = useState<Institute | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modals
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState<boolean>(false);
  const [reportingReviewId, setReportingReviewId] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    if (!id) return;
    setLoading(true);
    const inst = await api.getInstituteById(id);
    setInstitute(inst);
    if (inst) {
      const revs = await api.getReviewsForInstitute(id);
      setReviews(revs);
    }
    setLoading(false);
  };

  const handleHelpfulVote = async (reviewId: string) => {
    const res = await api.voteHelpful(reviewId);
    if (res.success) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, helpfulCount: res.newCount, hasVotedHelpful: !r.hasVotedHelpful } : r
        )
      );
      showToast('Vote Registered', 'Thanks for helping other students!', 'info');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center p-8 text-[#737373]">
        <div className="animate-pulse space-y-4 text-center">
          <div className="w-16 h-16 bg-[#f3f3ef] rounded-full mx-auto" />
          <p className="text-xs">Loading Institute Profile & Verified Reviews...</p>
        </div>
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="min-h-screen bg-[#fafaf7] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold text-[#0f1a0f] mb-2">Institute Profile Not Found</h2>
        <p className="text-xs text-[#737373] mb-6">The requested coaching institute could not be found.</p>
        <Link to="/explore" className="px-5 py-2.5 bg-[#128C7E] text-white text-xs font-semibold rounded-xl">
          Back to Explore
        </Link>
      </div>
    );
  }

  const shortlisted = isInShortlist(institute.id);
  const compared = isInCompare(institute.id);

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ================================================== */}
        {/* TOP PROFILE HERO HEADER */}
        {/* ================================================== */}
        <div className="bg-white border border-[#e3e3df] rounded-3xl overflow-hidden shadow-xs">
          
          {/* Cover Image */}
          <div className="h-48 sm:h-64 w-full relative bg-[#f3f3ef]">
            {institute.coverImageUrl ? (
              <img
                src={institute.coverImageUrl}
                alt={institute.name}
                className="w-full h-full object-cover opacity-75"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-[#d4f0e1] via-[#f3f3ef] to-[#d4f0e1]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          </div>

          {/* Profile Header Details */}
          <div className="p-6 sm:p-8 -mt-20 relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                {institute.logoUrl ? (
                  <img
                    src={institute.logoUrl}
                    alt={institute.name}
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-md bg-white"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-[#d4f0e1] border-2 border-white shadow-md flex items-center justify-center text-2xl font-bold text-[#128C7E]">
                    {institute.name[0]}
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f1a0f]">{institute.name}</h1>
                    <VerificationBadge status={institute.verificationStatus} size="md" />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#737373]">
                    <MapPin className="w-4 h-4 text-[#128C7E]" />
                    <span>{institute.location.address}, {institute.location.city}, {institute.location.state}</span>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => toggleShortlist(institute.id)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    shortlisted
                      ? 'bg-[#fef9c3] border-[#fde047] text-[#854d0e]'
                      : 'bg-[#f3f3ef] border-[#e3e3df] text-[#0f1a0f] hover:bg-[#ebebeb]'
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                  {shortlisted ? 'Shortlisted' : 'Shortlist'}
                </button>

                <button
                  onClick={() => toggleCompare(institute.id)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    compared
                      ? 'bg-[#d4f0e1] border-[#25D366]/40 text-[#128C7E]'
                      : 'bg-[#f3f3ef] border-[#e3e3df] text-[#0f1a0f] hover:bg-[#ebebeb]'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  {compared ? 'In Comparison' : 'Compare'}
                </button>

                <button
                  onClick={() => setEligibilityModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-all"
                >
                  <PenSquare className="w-4 h-4" />
                  Write a Review
                </button>
              </div>

            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#e3e3df] text-xs">
              
              <div className="bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df]">
                <span className="text-[#737373] block text-[11px]">Alumni Overall Rating</span>
                <div className="mt-1">
                  <StarRating rating={institute.overallRating} reviewCount={institute.reviewCount} size="md" />
                </div>
              </div>

              <div className="bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df]">
                <span className="text-[#737373] block text-[11px]">Classroom Mode</span>
                <span className="font-semibold text-[#0f1a0f] mt-1 block">{institute.mode}</span>
              </div>

              <div className="bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df]">
                <span className="text-[#737373] block text-[11px]">Courses Offered</span>
                <span className="font-semibold text-[#128C7E] mt-1 block">{institute.courses.length} Exam Programs</span>
              </div>

              <div className="bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df]">
                <span className="text-[#737373] block text-[11px]">Contact Info</span>
                <span className="font-mono text-[#0f1a0f] mt-1 block truncate">{institute.contact.phone}</span>
              </div>

            </div>

          </div>
        </div>

        {/* ================================================== */}
        {/* MAIN BODY GRID: ABOUT, COURSES, 6-DIMENSION RATINGS, REVIEWS */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: ABOUT, COURSES, STUDENT REVIEWS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About & Batch Info */}
            <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-bold text-lg text-[#0f1a0f]">About the Institute</h3>
              <p className="text-xs sm:text-sm text-[#4a554a] leading-relaxed">{institute.about}</p>
              
              <div className="p-4 bg-[#d4f0e1]/40 border border-[#25D366]/30 rounded-xl space-y-1 text-xs">
                <div className="font-semibold text-[#128C7E] flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> Batch & Admission Guidance
                </div>
                <p className="text-[#4a554a]">{institute.batchInfo}</p>
              </div>
            </div>

            {/* Courses & Approximate Fees Table */}
            <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-bold text-lg text-[#0f1a0f] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#128C7E]" /> Offered Courses & Approximate Fees
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#e3e3df] text-[#737373] uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-3">Course Program</th>
                      <th className="py-2.5 px-3">Exam Target</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3">Approx Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e3e3df]">
                    {institute.courses.map((c, i) => (
                      <tr key={i} className="hover:bg-[#f3f3ef]/50">
                        <td className="py-3 px-3 font-semibold text-[#0f1a0f]">{c.courseName}</td>
                        <td className="py-3 px-3 text-[#128C7E] font-medium">{c.examCategory}</td>
                        <td className="py-3 px-3 text-[#4a554a]">{c.duration}</td>
                        <td className="py-3 px-3 font-mono font-bold text-[#1a7a45]">
                          ₹{c.approxFee.toLocaleString()} / yr
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* STUDENT REVIEWS SECTION */}
            <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-6 shadow-xs">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e3e3df]">
                <div>
                  <h3 className="font-bold text-lg text-[#0f1a0f] flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#128C7E]" /> Verified Student Reviews
                  </h3>
                  <p className="text-xs text-[#737373]">
                    Filtered & verified through student OTP authentication.
                  </p>
                </div>

                <button
                  onClick={() => setEligibilityModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <PenSquare className="w-3.5 h-3.5" />
                  Write Review
                </button>
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-10 space-y-2 bg-[#f3f3ef] rounded-xl border border-[#e3e3df]">
                  <Star className="w-8 h-8 text-[#737373] mx-auto" />
                  <h4 className="font-bold text-[#0f1a0f] text-sm">No reviews yet</h4>
                  <p className="text-xs text-[#737373] max-w-sm mx-auto">
                    This institute currently has 0 student reviews. Enrolled students can verify their OTP to submit the first review.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-[#f3f3ef]/50 border border-[#e3e3df] rounded-2xl p-5 space-y-4">
                      
                      {/* Review Card Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#0f1a0f] text-sm">{rev.studentName}</span>
                            <span className="text-[10px] bg-[#d4f0e1] text-[#1a7a45] border border-[#25D366]/40 px-2 py-0.5 rounded-full font-semibold">
                              Verified Student
                            </span>
                          </div>
                          <div className="text-xs text-[#737373] mt-0.5">
                            Course: <span className="text-[#0f1a0f] font-medium">{rev.courseName}</span> ({rev.studentBatchYear})
                          </div>
                        </div>

                        <StarRating rating={rev.overallRating} size="sm" showText={true} />
                      </div>

                      {/* 6 Dimension Ratings Mini Pill Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-[#e3e3df] text-[11px]">
                        <div className="flex justify-between"><span className="text-[#737373]">Faculty:</span> <span className="font-bold text-amber-600">{rev.dimensions.facultyQuality}/5</span></div>
                        <div className="flex justify-between"><span className="text-[#737373]">Material:</span> <span className="font-bold text-amber-600">{rev.dimensions.studyMaterial}/5</span></div>
                        <div className="flex justify-between"><span className="text-[#737373]">Doubt:</span> <span className="font-bold text-amber-600">{rev.dimensions.doubtSupport}/5</span></div>
                        <div className="flex justify-between"><span className="text-[#737373]">Fee Trans:</span> <span className="font-bold text-amber-600">{rev.dimensions.feeTransparency}/5</span></div>
                        <div className="flex justify-between"><span className="text-[#737373]">Batch:</span> <span className="font-bold text-amber-600">{rev.dimensions.batchManagement}/5</span></div>
                        <div className="flex justify-between"><span className="text-[#737373]">Value:</span> <span className="font-bold text-amber-600">{rev.dimensions.valueForMoney}/5</span></div>
                      </div>

                      {/* Review Text */}
                      <p className="text-xs text-[#0f1a0f] leading-relaxed bg-white p-3 rounded-xl border border-[#e3e3df]">
                        "{rev.writtenReview}"
                      </p>

                      {/* OFFICIAL INSTITUTE RESPONSE (IF AVAILABLE) */}
                      {rev.instituteResponse && (
                        <div className="p-4 bg-[#d4f0e1]/40 border border-[#25D366]/30 rounded-xl space-y-1.5 text-xs">
                          <div className="flex items-center justify-between font-semibold text-[#128C7E]">
                            <span className="flex items-center gap-1.5">
                              <Building className="w-4 h-4 text-[#128C7E]" />
                              Official Institute Response
                            </span>
                            <span className="text-[10px] text-[#737373] font-normal">
                              {new Date(rev.instituteResponse.respondedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-[#2d4a2d] italic">"{rev.instituteResponse.responseText}"</p>
                          <div className="text-[10px] text-[#737373] font-medium">— {rev.instituteResponse.officialRole}</div>
                        </div>
                      )}

                      {/* Review Footer Actions */}
                      <div className="pt-2 flex items-center justify-between text-xs text-[#737373] border-t border-[#e3e3df]">
                        <span>Posted on {new Date(rev.createdAt).toLocaleDateString()}</span>
                        
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleHelpfulVote(rev.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
                              rev.hasVotedHelpful
                                ? 'bg-[#d4f0e1] border-[#25D366] text-[#128C7E]'
                                : 'bg-white border-[#e3e3df] hover:text-[#0f1a0f]'
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Helpful ({rev.helpfulCount})</span>
                          </button>

                          <button
                            onClick={() => setReportingReviewId(rev.id)}
                            className="p-1.5 text-[#737373] hover:text-rose-600"
                            title="Report suspicious or inappropriate review"
                          >
                            <Flag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

          {/* RIGHT 1 COLUMN: 6-DIMENSION RATING BREAKDOWN & FACILITIES */}
          <div className="space-y-6">
            
            {/* 6 Dimension Rating Breakdown */}
            <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-4 shadow-xs">
              <h4 className="font-bold text-base text-[#0f1a0f]">Dimension Rating Averages</h4>
              
              {institute.dimensionAverages ? (
                <div className="space-y-3 text-xs">
                  {Object.entries(institute.dimensionAverages).map(([key, val]) => {
                    const labels: Record<string, string> = {
                      facultyQuality: 'Faculty Quality',
                      studyMaterial: 'Study Material',
                      doubtSupport: 'Doubt Support',
                      feeTransparency: 'Fee Transparency',
                      batchManagement: 'Batch Management',
                      valueForMoney: 'Value for Money'
                    };
                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between font-medium text-[#2d4a2d]">
                          <span>{labels[key] || key}</span>
                          <span className="font-bold text-[#128C7E] font-mono">{val} / 5</span>
                        </div>
                        <div className="w-full bg-[#f3f3ef] h-2 rounded-full overflow-hidden border border-[#e3e3df]">
                          <div
                            className="bg-[#25D366] h-full rounded-full"
                            style={{ width: `${(val / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 bg-[#f3f3ef] rounded-xl text-xs text-[#737373] text-center">
                  No structured reviews submitted yet for dimension breakdown.
                </div>
              )}
            </div>

            {/* Facilities */}
            <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-3 shadow-xs">
              <h4 className="font-bold text-base text-[#0f1a0f]">Campus Facilities & Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {institute.facilities.map((fac, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#f3f3ef] border border-[#e3e3df] text-[#2d4a2d] rounded-lg text-xs font-medium"
                  >
                    ✓ {fac}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-3 text-xs shadow-xs">
              <h4 className="font-bold text-base text-[#0f1a0f]">Official Contact Details</h4>
              <div className="space-y-2 text-[#4a554a]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#128C7E]" />
                  <span>{institute.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#128C7E]" />
                  <span>{institute.contact.email}</span>
                </div>
                {institute.contact.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#128C7E]" />
                    <a href={institute.contact.website} target="_blank" rel="noreferrer" className="text-[#128C7E] hover:underline font-medium">
                      Official Website
                    </a>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* REVIEW ELIGIBILITY MODAL */}
      {eligibilityModalOpen && (
        <ReviewEligibilityModal
          institute={institute}
          isOpen={eligibilityModalOpen}
          onClose={() => setEligibilityModalOpen(false)}
          onReviewSubmitted={() => fetchDetails()}
        />
      )}

      {/* REPORT REVIEW MODAL */}
      {reportingReviewId && (
        <ReportReviewModal
          reviewId={reportingReviewId}
          isOpen={!!reportingReviewId}
          onClose={() => setReportingReviewId(null)}
        />
      )}

    </div>
  );
};
