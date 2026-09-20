import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Institute, Review } from '../../types';
import { StarRating } from '../../components/common/StarRating';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Bookmark,
  Scale,
  MessageSquare,
  Search,
  Sparkles,
  Trash2
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { shortlist, compareList, toggleShortlist } = useApp();

  const [shortlistedInsts, setShortlistedInsts] = useState<Institute[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, [shortlist]);

  const loadData = async () => {
    setLoading(true);
    const all = await api.getInstitutes();
    const filteredShortlist = all.filter((i) => shortlist.includes(i.id));
    setShortlistedInsts(filteredShortlist);

    if (user?.email) {
      const allRevs = await api.getReviewsForInstitute('inst-1');
      const userRevs = allRevs.filter((r) => r.studentId === user.email);
      setMyReviews(userRevs);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-white border border-[#e3e3df] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4f0e1] border border-[#25D366]/40 text-[#1a7a45] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#128C7E]" />
              <span>Student Account Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f1a0f]">
              Welcome back, <span className="text-[#128C7E]">{user?.name}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-[#737373]">
              Manage your saved coaching institutes, comparison matrices, and verified alumni experiences.
            </p>
          </div>

          <Link
            to="/explore"
            className="px-6 py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs flex items-center gap-2 shadow-xs shrink-0 transition-colors"
          >
            <Search className="w-4 h-4" />
            Explore Institutes
          </Link>
        </div>

        {/* Real User Activity Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          
          <div className="bg-white border border-[#e3e3df] rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[#737373] block font-medium">Shortlisted Institutes</span>
              <span className="text-2xl font-extrabold text-[#854d0e] font-mono mt-1 block">
                {shortlist.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Bookmark className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#e3e3df] rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[#737373] block font-medium">Compare Matrix Items</span>
              <span className="text-2xl font-extrabold text-[#128C7E] font-mono mt-1 block">
                {compareList.length} / 4
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center text-[#128C7E]">
              <Scale className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#e3e3df] rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[#737373] block font-medium">My Verified Reviews</span>
              <span className="text-2xl font-extrabold text-[#128C7E] font-mono mt-1 block">
                {myReviews.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center text-[#128C7E]">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Shortlist Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-[#0f1a0f] flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-600" /> My Shortlisted Institutes
            </h3>
            {shortlist.length > 0 && (
              <Link to="/student/shortlist" className="text-xs text-[#128C7E] hover:underline font-semibold">
                View All Shortlisted ({shortlist.length})
              </Link>
            )}
          </div>

          {shortlistedInsts.length === 0 ? (
            <EmptyState
              icon={Bookmark}
              title="No institutes shortlisted yet."
              description="Start exploring coaching institutes and click the shortlist icon to save your preferred options."
              actionLabel="Start Exploring Institutes"
              onAction={() => window.location.href = '/explore'}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shortlistedInsts.map((inst) => (
                <div key={inst.id} className="bg-white border border-[#e3e3df] rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-xs">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-[#0f1a0f] text-sm line-clamp-1">{inst.name}</h4>
                      <button onClick={() => toggleShortlist(inst.id)} className="text-[#737373] hover:text-rose-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[#737373]">{inst.location.city}, {inst.location.state}</p>
                    <StarRating rating={inst.overallRating} reviewCount={inst.reviewCount} size="sm" />
                  </div>

                  <Link
                    to={`/institutes/${inst.id}`}
                    className="w-full py-2 bg-[#f3f3ef] hover:bg-[#ebebeb] text-[#128C7E] border border-[#e3e3df] rounded-xl text-xs font-semibold text-center block transition-colors"
                  >
                    View Institute Profile
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
