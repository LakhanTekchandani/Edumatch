import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare } from 'lucide-react';
import { EmptyState } from '../../components/common/EmptyState';

export const StudentReviewsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-[#e3e3df] pb-4">
          <h1 className="text-2xl font-extrabold text-[#0f1a0f] flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#128C7E]" /> My Verified Student Reviews
          </h1>
          <p className="text-xs text-[#737373] mt-1">Manage and view your published coaching reviews.</p>
        </div>

        <EmptyState
          icon={MessageSquare}
          title="No reviews submitted yet."
          description="Your verified experiences can help other students make informed coaching decisions. Visit an institute profile to verify enrolment and write a review."
          actionLabel="Explore Institutes to Review"
          onAction={() => window.location.href = '/explore'}
        />
      </div>
    </div>
  );
};
