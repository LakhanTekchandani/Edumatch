import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 border-b border-[#e3e3df] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4f0e1] border border-[#25D366]/40 text-[#1a7a45] text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#1a7a45]" />
            <span>EduMatch Platform Verification Standard</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#0f1a0f] tracking-tight">How EduMatch Works</h1>
          <p className="text-sm text-[#4a554a] max-w-xl mx-auto leading-relaxed">
            Discover how we verify student enrolments, structure 6-dimension ratings, and protect coaching reviews from fake ratings and marketing bias.
          </p>
        </div>

        {/* 4 Pillars of EduMatch Trust */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center text-[#128C7E] font-bold">
              1
            </div>
            <h3 className="font-bold text-lg text-[#0f1a0f]">Student Enrolment Authorization</h3>
            <p className="text-xs text-[#737373] leading-relaxed">
              Verified coaching institutes upload their active student email lists. A student can only initiate a review if their logged-in email matches an authorized enrolment record.
            </p>
          </div>

          <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center text-[#128C7E] font-bold">
              2
            </div>
            <h3 className="font-bold text-lg text-[#0f1a0f]">6-Digit OTP Email Verification</h3>
            <p className="text-xs text-[#737373] leading-relaxed">
              Before unlocking the review form, a 6-digit one-time passcode is sent to the student's email inbox. This prevents unauthorized reviews and bot submissions.
            </p>
          </div>

          <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center text-[#128C7E] font-bold">
              3
            </div>
            <h3 className="font-bold text-lg text-[#0f1a0f]">Structured 6-Dimension Ratings</h3>
            <p className="text-xs text-[#737373] leading-relaxed">
              Instead of vague 1-line opinions, reviews rate Faculty Quality, Study Material, Doubt Support, Fee Transparency, Batch Management, and Value for Money.
            </p>
          </div>

          <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center text-[#128C7E] font-bold">
              4
            </div>
            <h3 className="font-bold text-lg text-[#0f1a0f]">No Fake Zeroes or Invented Ratings</h3>
            <p className="text-xs text-[#737373] leading-relaxed">
              Institutes with zero reviews display "No reviews yet" rather than an invented 0 rating. Institutes can post official responses but cannot delete student reviews.
            </p>
          </div>

        </div>

        {/* Call to Action */}
        <div className="bg-white border border-[#e3e3df] rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <h3 className="text-2xl font-bold text-[#0f1a0f]">Explore Coaching Institutes Now</h3>
          <p className="text-xs text-[#737373] max-w-md mx-auto">
            Search institutes by location, course, and fee structure. Compare ratings from verified alumni.
          </p>
          <div className="pt-2">
            <Link to="/explore" className="px-6 py-3 bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs rounded-xl inline-flex items-center gap-2 shadow-xs transition-colors">
              Start Exploring <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
