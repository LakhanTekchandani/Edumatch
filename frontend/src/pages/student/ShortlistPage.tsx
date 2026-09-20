import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Institute } from '../../types';
import { StarRating } from '../../components/common/StarRating';
import { EmptyState } from '../../components/common/EmptyState';
import { Bookmark, Scale, Trash2, ChevronRight } from 'lucide-react';

export const ShortlistPage: React.FC = () => {
  const { shortlist, toggleShortlist, toggleCompare, isInCompare } = useApp();
  const [savedInstitutes, setSavedInstitutes] = useState<Institute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadSaved();
  }, [shortlist]);

  const loadSaved = async () => {
    setLoading(true);
    const all = await api.getInstitutes();
    setSavedInstitutes(all.filter((i) => shortlist.includes(i.id)));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-[#e3e3df] pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0f1a0f] flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-amber-600" /> My Shortlisted Institutes
            </h1>
            <p className="text-xs text-[#737373] mt-1">Saved coaching institutes for easy access & comparison.</p>
          </div>
          {savedInstitutes.length > 0 && (
            <Link
              to="/student/compare"
              className="px-4 py-2 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Scale className="w-4 h-4" /> Compare Shortlisted
            </Link>
          )}
        </div>

        {savedInstitutes.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="No institutes shortlisted yet."
            description="Start exploring coaching institutes and click the bookmark icon on any card to save it here."
            actionLabel="Explore Coaching Institutes"
            onAction={() => window.location.href = '/explore'}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedInstitutes.map((inst) => {
              const compared = isInCompare(inst.id);

              return (
                <div key={inst.id} className="bg-white border border-[#e3e3df] rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-xs">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-base text-[#0f1a0f]">{inst.name}</h3>
                      <button
                        onClick={() => toggleShortlist(inst.id)}
                        className="text-[#737373] hover:text-rose-600 p-1"
                        title="Remove from shortlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[#737373]">{inst.location.city}, {inst.location.state}</p>
                    <StarRating rating={inst.overallRating} reviewCount={inst.reviewCount} size="sm" />
                  </div>

                  <div className="pt-3 border-t border-[#e3e3df] flex items-center gap-2">
                    <button
                      onClick={() => toggleCompare(inst.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border flex-1 transition-colors ${
                        compared ? 'bg-[#d4f0e1] text-[#128C7E] border-[#25D366]/40' : 'bg-[#f3f3ef] border-[#e3e3df] text-[#2d4a2d] hover:text-[#0f1a0f]'
                      }`}
                    >
                      {compared ? 'In Comparison' : 'Add to Compare'}
                    </button>
                    <Link
                      to={`/institutes/${inst.id}`}
                      className="px-4 py-2 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      View Profile <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
