import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Institute, VerificationDocument } from '../../types';
import { VerificationBadge } from '../../components/common/Badge';
import {
  Building2,
  ShieldCheck,
  MessageSquare,
  Clock,
  ArrowRight,
  Edit,
  CheckCircle2,
  Users
} from 'lucide-react';

export const InstituteDashboard: React.FC = () => {
  const { user } = useAuth();
  const [institute, setInstitute] = useState<Institute | null>(null);
  const [doc, setDoc] = useState<VerificationDocument | null>(null);
  const [assocCount, setAssocCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadInstData();
  }, [user]);

  const loadInstData = async () => {
    if (!user?.instituteId) return;
    setLoading(true);
    const inst = await api.getInstituteById(user.instituteId || 'inst-1');
    setInstitute(inst);

    const vDoc = await api.getVerificationDoc(user.instituteId || 'inst-1');
    setDoc(vDoc);

    const assocs = await api.getStudentAssociations(user.instituteId || 'inst-1');
    setAssocCount(assocs.length);
    setLoading(false);
  };

  const status = institute?.verificationStatus || 'unverified';

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e3e3df] pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f1a0f]">
                {institute?.name || 'Coaching Institute Portal'}
              </h1>
              <VerificationBadge status={status} size="md" />
            </div>
            <p className="text-xs text-[#737373] mt-1">
              Representative Management Portal • ID: <span className="font-mono text-[#128C7E] font-medium">{user?.instituteId || 'inst-1'}</span>
            </p>
          </div>

          <Link
            to="/institute/profile"
            className="px-4 py-2.5 bg-white hover:bg-[#f3f3ef] text-[#128C7E] rounded-xl text-xs font-semibold flex items-center gap-1.5 w-fit border border-[#e3e3df] transition-colors shadow-xs"
          >
            <Edit className="w-4 h-4" /> Edit Profile Details
          </Link>
        </div>

        {/* PROMINENT VERIFICATION STATUS BANNER */}
        <div className={`p-6 rounded-3xl border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
          status === 'verified'
            ? 'bg-[#d4f0e1]/40 border-[#25D366]/40 text-[#0f1a0f]'
            : status === 'pending'
            ? 'bg-amber-50 border-amber-200 text-[#0f1a0f]'
            : status === 'rejected'
            ? 'bg-rose-50 border-rose-200 text-[#0f1a0f]'
            : 'bg-white border-[#e3e3df] text-[#0f1a0f]'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              status === 'verified' ? 'bg-[#d4f0e1] text-[#1a7a45]' : 'bg-[#f3f3ef] text-[#128C7E]'
            }`}>
              {status === 'verified' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-[#0f1a0f]">
                Verification Status: <span className="capitalize">{status}</span>
              </h3>
              <p className="text-xs text-[#4a554a] leading-relaxed max-w-xl">
                {status === 'verified' && 'Your coaching institute is fully verified. Verified alumni badge is active on your public profile.'}
                {status === 'pending' && 'Your verification documents are currently under review by moderation. Approval takes 24-48 hours.'}
                {status === 'unverified' && 'Complete your verification to add your institute to EduMatch search discovery & enable reviews.'}
                {status === 'rejected' && 'Verification failed. Please check document feedback and submit fresh documents.'}
              </p>
            </div>
          </div>

          <Link
            to="/institute/verification"
            className="px-6 py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            {status === 'verified' ? 'View Verification Record' : 'Complete Verification Now'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          <div className="bg-white border border-[#e3e3df] rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[#737373] text-xs block font-medium">Registered Student Enrolments</span>
              <span className="text-2xl font-extrabold text-[#128C7E] font-mono mt-1 block">
                {assocCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center text-[#128C7E]">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#e3e3df] rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[#737373] text-xs block font-medium">Student Reviews Received</span>
              <span className="text-2xl font-extrabold text-amber-600 font-mono mt-1 block">
                {institute?.reviewCount || 0}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#e3e3df] rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[#737373] text-xs block font-medium">Overall Rating Average</span>
              <span className="text-2xl font-extrabold text-[#1a7a45] font-mono mt-1 block">
                {institute?.overallRating ? `${institute.overallRating} / 5` : 'No reviews'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center text-[#1a7a45]">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Dashboard Quick Management Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-base text-[#0f1a0f] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#128C7E]" /> Student Enrolment List
            </h3>
            <p className="text-xs text-[#737373]">
              Add student emails to authorize OTP review eligibility. Active association controls eligibility.
            </p>
            <Link
              to="/institute/students"
              className="w-full py-2.5 bg-[#f3f3ef] hover:bg-[#ebebeb] border border-[#e3e3df] text-[#128C7E] rounded-xl text-xs font-semibold text-center block transition-colors"
            >
              Manage Student Enrolments →
            </Link>
          </div>

          <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-base text-[#0f1a0f] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-600" /> Reviews & Official Responses
            </h3>
            <p className="text-xs text-[#737373]">
              View verified student reviews and post official institute responses to clarify feedback.
            </p>
            <Link
              to="/institute/reviews"
              className="w-full py-2.5 bg-[#f3f3ef] hover:bg-[#ebebeb] border border-[#e3e3df] text-amber-700 rounded-xl text-xs font-semibold text-center block transition-colors"
            >
              View Reviews & Respond →
            </Link>
          </div>

          <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-base text-[#0f1a0f] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#128C7E]" /> Institute Public Profile
            </h3>
            <p className="text-xs text-[#737373]">
              Update course fees, batch schedules, facilities, photos, and official website contact.
            </p>
            <Link
              to="/institute/profile"
              className="w-full py-2.5 bg-[#f3f3ef] hover:bg-[#ebebeb] border border-[#e3e3df] text-[#128C7E] rounded-xl text-xs font-semibold text-center block transition-colors"
            >
              Update Profile Information →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
