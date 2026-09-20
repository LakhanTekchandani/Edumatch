import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Institute } from '../../types';
import { StarRating } from '../../components/common/StarRating';
import { EmptyState } from '../../components/common/EmptyState';
import { Scale, Trash2, Plus } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { compareList, toggleCompare, clearCompare } = useApp();
  const [comparedInstitutes, setComparedInstitutes] = useState<Institute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadCompare();
  }, [compareList]);

  const loadCompare = async () => {
    setLoading(true);
    const all = await api.getInstitutes();
    setComparedInstitutes(all.filter((i) => compareList.includes(i.id)));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e3e3df] pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0f1a0f] flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#128C7E]" /> Side-by-Side Institute Comparison
            </h1>
            <p className="text-xs text-[#737373] mt-1">
              Comparing {comparedInstitutes.length} of 4 maximum institutes across structured dimensions.
            </p>
          </div>

          {comparedInstitutes.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={clearCompare}
                className="px-3 py-1.5 rounded-xl border border-[#e3e3df] text-[#737373] hover:text-[#0f1a0f] hover:bg-[#f3f3ef] text-xs font-semibold transition-colors"
              >
                Clear All
              </button>
              <Link
                to="/explore"
                className="px-4 py-2 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Institute
              </Link>
            </div>
          )}
        </div>

        {comparedInstitutes.length === 0 ? (
          <EmptyState
            icon={Scale}
            title="No institutes added to comparison."
            description="Explore institutes and click the scale icon to compare fees, facilities, and verified alumni ratings side-by-side."
            actionLabel="Explore Institutes to Compare"
            onAction={() => window.location.href = '/explore'}
          />
        ) : (
          <div className="bg-white border border-[#e3e3df] rounded-3xl p-6 shadow-sm overflow-x-auto">
            
            {/* COMPARISON MATRIX TABLE */}
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              
              {/* Table Header: Institute Names */}
              <thead>
                <tr className="border-b border-[#e3e3df]">
                  <th className="py-4 px-4 w-52 text-[#737373] font-bold uppercase text-[10px] tracking-wider bg-[#f3f3ef] rounded-l-xl">
                    Attribute
                  </th>
                  {comparedInstitutes.map((inst) => (
                    <th key={inst.id} className="py-4 px-4 min-w-[220px] align-top bg-[#f3f3ef]/50 border-l border-[#e3e3df]">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <Link to={`/institutes/${inst.id}`} className="font-bold text-[#0f1a0f] text-sm hover:text-[#128C7E] line-clamp-1">
                            {inst.name}
                          </Link>
                          <button onClick={() => toggleCompare(inst.id)} className="text-[#737373] hover:text-rose-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-[11px] text-[#737373]">{inst.location.city}, {inst.location.state}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#e3e3df]">
                
                {/* 1. Overall Rating */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#2d4a2d] bg-[#f3f3ef]/40">Overall Rating</td>
                  {comparedInstitutes.map((inst) => (
                    <td key={inst.id} className="py-3 px-4 border-l border-[#e3e3df]">
                      {inst.overallRating ? (
                        <StarRating rating={inst.overallRating} reviewCount={inst.reviewCount} size="sm" />
                      ) : (
                        <span className="text-[#737373] italic">No reviews yet</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 2. Approx Course Fees */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#2d4a2d] bg-[#f3f3ef]/40">Approximate Fee</td>
                  {comparedInstitutes.map((inst) => (
                    <td key={inst.id} className="py-3 px-4 border-l border-[#e3e3df] font-mono font-bold text-[#1a7a45]">
                      ₹{inst.courses[0]?.approxFee.toLocaleString()} / yr
                    </td>
                  ))}
                </tr>

                {/* 3. Learning Mode */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#2d4a2d] bg-[#f3f3ef]/40">Classroom Mode</td>
                  {comparedInstitutes.map((inst) => (
                    <td key={inst.id} className="py-3 px-4 border-l border-[#e3e3df] text-[#0f1a0f]">
                      {inst.mode}
                    </td>
                  ))}
                </tr>

                {/* 4. Faculty Quality Rating */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#2d4a2d] bg-[#f3f3ef]/40">Faculty Quality</td>
                  {comparedInstitutes.map((inst) => (
                    <td key={inst.id} className="py-3 px-4 border-l border-[#e3e3df]">
                      {inst.dimensionAverages ? (
                        <span className="font-bold text-amber-600 font-mono">{inst.dimensionAverages.facultyQuality} / 5</span>
                      ) : (
                        <span className="text-[#737373] italic">Not enough review data</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 5. Study Material Rating */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#2d4a2d] bg-[#f3f3ef]/40">Study Material</td>
                  {comparedInstitutes.map((inst) => (
                    <td key={inst.id} className="py-3 px-4 border-l border-[#e3e3df]">
                      {inst.dimensionAverages ? (
                        <span className="font-bold text-amber-600 font-mono">{inst.dimensionAverages.studyMaterial} / 5</span>
                      ) : (
                        <span className="text-[#737373] italic">Not enough review data</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 6. Doubt Support */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#2d4a2d] bg-[#f3f3ef]/40">Doubt Support</td>
                  {comparedInstitutes.map((inst) => (
                    <td key={inst.id} className="py-3 px-4 border-l border-[#e3e3df]">
                      {inst.dimensionAverages ? (
                        <span className="font-bold text-amber-600 font-mono">{inst.dimensionAverages.doubtSupport} / 5</span>
                      ) : (
                        <span className="text-[#737373] italic">Not enough review data</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 7. Fee Transparency */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#2d4a2d] bg-[#f3f3ef]/40">Fee Transparency</td>
                  {comparedInstitutes.map((inst) => (
                    <td key={inst.id} className="py-3 px-4 border-l border-[#e3e3df]">
                      {inst.dimensionAverages ? (
                        <span className="font-bold text-amber-600 font-mono">{inst.dimensionAverages.feeTransparency} / 5</span>
                      ) : (
                        <span className="text-[#737373] italic">Not enough review data</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 8. Facilities */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#2d4a2d] bg-[#f3f3ef]/40">Facilities & Highlights</td>
                  {comparedInstitutes.map((inst) => (
                    <td key={inst.id} className="py-3 px-4 border-l border-[#e3e3df]">
                      <div className="flex flex-wrap gap-1">
                        {inst.facilities.map((fac, idx) => (
                          <span key={idx} className="bg-[#f3f3ef] border border-[#e3e3df] text-[10px] px-2 py-0.5 rounded text-[#2d4a2d]">
                            {fac}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Profile Link */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#2d4a2d] bg-[#f3f3ef]/40">Action</td>
                  {comparedInstitutes.map((inst) => (
                    <td key={inst.id} className="py-3 px-4 border-l border-[#e3e3df]">
                      <Link
                        to={`/institutes/${inst.id}`}
                        className="px-3 py-1.5 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-lg text-xs font-semibold inline-block transition-colors"
                      >
                        View Full Profile
                      </Link>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>

          </div>
        )}

      </div>
    </div>
  );
};
