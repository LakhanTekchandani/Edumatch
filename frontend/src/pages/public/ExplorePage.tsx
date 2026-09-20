import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Institute } from '../../types';
import { useApp } from '../../context/AppContext';
import { VerificationBadge } from '../../components/common/Badge';
import { StarRating } from '../../components/common/StarRating';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Search,
  Filter,
  MapPin,
  BookOpen,
  IndianRupee,
  Bookmark,
  Scale,
  Building2,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { shortlist, compareList, toggleShortlist, toggleCompare, isInShortlist, isInCompare } = useApp();

  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [selectedCity, setSelectedCity] = useState<string>(searchParams.get('city') || '');
  const [selectedExam, setSelectedExam] = useState<string>(searchParams.get('examCategory') || '');
  const [selectedMode, setSelectedMode] = useState<string>(searchParams.get('mode') || '');
  const [maxFee, setMaxFee] = useState<number>(Number(searchParams.get('maxFee')) || 250000);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'fee_asc' | 'fee_desc'>('rating');

  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchInstitutes();
  }, [searchParams, sortBy]);

  const fetchInstitutes = async () => {
    setLoading(true);
    const data = await api.getInstitutes({
      search: searchParams.get('search') || undefined,
      city: searchParams.get('city') || undefined,
      examCategory: searchParams.get('examCategory') || undefined,
      maxFee: searchParams.get('maxFee') ? Number(searchParams.get('maxFee')) : undefined,
      mode: searchParams.get('mode') || undefined,
      sortBy
    });
    setInstitutes(data);
    setLoading(false);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCity) params.set('city', selectedCity);
    if (selectedExam) params.set('examCategory', selectedExam);
    if (selectedMode) params.set('mode', selectedMode);
    if (maxFee < 250000) params.set('maxFee', maxFee.toString());
    setSearchParams(params);
    setFilterDrawerOpen(false);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedExam('');
    setSelectedMode('');
    setMaxFee(250000);
    setSearchParams(new URLSearchParams());
    setFilterDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e3e3df] pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0f1a0f] tracking-tight">Explore Coaching Institutes</h1>
            <p className="text-xs sm:text-sm text-[#737373] mt-1">
              Search, filter, compare and discover verified coaching institutes across India.
            </p>
          </div>

          {/* Quick Sort Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#737373] font-medium hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#e3e3df] text-[#0f1a0f] text-xs rounded-xl px-3 py-2 font-medium focus:outline-none"
            >
              <option value="rating">Top Rated Alumni Reviews</option>
              <option value="reviews">Most Reviewed</option>
              <option value="fee_asc">Approx Fee: Low to High</option>
              <option value="fee_desc">Approx Fee: High to Low</option>
            </select>

            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-[#d4f0e1] text-[#128C7E] border border-[#25D366]/40 rounded-xl text-xs font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Layout: Filters Sidebar + Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* DESKTOP FILTER SIDEBAR */}
          <div className="hidden md:block space-y-6 bg-white border border-[#e3e3df] rounded-2xl p-5 h-fit shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#e3e3df]">
              <h3 className="font-bold text-sm text-[#0f1a0f] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#128C7E]" /> Filter Institutes
              </h3>
              <button onClick={clearFilters} className="text-[11px] text-[#737373] hover:text-[#128C7E] transition-colors">
                Reset All
              </button>
            </div>

            {/* Keyword Search */}
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-[#2d4a2d]">Institute Name / Keyword</label>
              <input
                type="text"
                placeholder="e.g. Apex, Kota, Physics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] placeholder:text-[#737373] text-xs"
              />
            </div>

            {/* City */}
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-[#2d4a2d]">City / Location</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] text-xs"
              >
                <option value="">All Cities</option>
                <option value="Kota">Kota</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            {/* Exam */}
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-[#2d4a2d]">Target Exam / Stream</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] text-xs"
              >
                <option value="">All Exams</option>
                <option value="JEE">JEE Entrance</option>
                <option value="NEET">NEET Medical</option>
                <option value="UPSC">UPSC Civil Services</option>
                <option value="Class 11-12 Board">Boards & Foundation</option>
              </select>
            </div>

            {/* Mode */}
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-[#2d4a2d]">Classroom Mode</label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] text-xs"
              >
                <option value="">All Modes</option>
                <option value="Offline">Offline Classroom</option>
                <option value="Online">Online Live</option>
                <option value="Hybrid">Hybrid Learning</option>
              </select>
            </div>

            {/* Max Fee Slider */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold text-[#2d4a2d]">
                <span>Max Approx Fee</span>
                <span className="text-[#1a7a45] font-mono">₹{maxFee.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="250000"
                step="5000"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="w-full accent-[#25D366] bg-[#e3e3df] rounded-lg h-2"
              />
            </div>

            <button
              onClick={applyFilters}
              className="w-full py-2.5 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs shadow-sm transition-all"
            >
              Apply Filter Parameters
            </button>
          </div>

          {/* MAIN INSTITUTE CARDS GRID */}
          <div className="md:col-span-3 space-y-4">
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : institutes.length === 0 ? (
              <EmptyState
                icon={Building2}
                title="No Coaching Institutes Match Your Filters"
                description="Try resetting your location or fee filters to view all available institutes."
                actionLabel="Reset Search Filters"
                onAction={clearFilters}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {institutes.map((inst) => {
                  const shortlisted = isInShortlist(inst.id);
                  const compared = isInCompare(inst.id);

                  return (
                    <div
                      key={inst.id}
                      className="bg-white border border-[#e3e3df] rounded-2xl p-5 hover:border-[#25D366] hover:shadow-md transition-all flex flex-col justify-between space-y-4 shadow-xs group"
                    >
                      {/* Top Header Card */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {inst.logoUrl ? (
                              <img
                                src={inst.logoUrl}
                                alt={inst.name}
                                className="w-12 h-12 rounded-xl object-cover border border-[#e3e3df]"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center text-[#128C7E] font-bold">
                                {inst.name[0]}
                              </div>
                            )}
                            <div>
                              <Link
                                to={`/institutes/${inst.id}`}
                                className="font-bold text-[#0f1a0f] text-base hover:text-[#128C7E] transition-colors line-clamp-1"
                              >
                                {inst.name}
                              </Link>
                              <div className="flex items-center gap-1.5 text-xs text-[#737373] mt-0.5">
                                <MapPin className="w-3.5 h-3.5 text-[#128C7E] shrink-0" />
                                <span>{inst.location.city}, {inst.location.state}</span>
                              </div>
                            </div>
                          </div>

                          <VerificationBadge status={inst.verificationStatus} size="sm" />
                        </div>

                        <p className="text-xs text-[#737373] line-clamp-2 leading-relaxed">
                          {inst.tagline || inst.about}
                        </p>
                      </div>

                      {/* Middle Attributes: Courses, Mode, Fees */}
                      <div className="bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df] text-xs space-y-2">
                        <div className="flex justify-between items-center text-[#2d4a2d]">
                          <span className="text-[#737373] flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-[#128C7E]" /> Featured Course:
                          </span>
                          <span className="font-semibold text-[#0f1a0f] truncate max-w-[150px]">
                            {inst.courses[0]?.courseName || 'General Prep'}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-[#2d4a2d]">
                          <span className="text-[#737373] flex items-center gap-1">
                            <IndianRupee className="w-3.5 h-3.5 text-[#1a7a45]" /> Approx Fee:
                          </span>
                          <span className="font-mono font-bold text-[#1a7a45]">
                            ₹{inst.courses[0]?.approxFee.toLocaleString()} / yr
                          </span>
                        </div>
                      </div>

                      {/* Bottom Rating & Action Buttons */}
                      <div className="pt-2 border-t border-[#e3e3df] flex items-center justify-between gap-2">
                        
                        {/* Rating Display */}
                        <StarRating
                          rating={inst.overallRating}
                          reviewCount={inst.reviewCount}
                          size="sm"
                        />

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleShortlist(inst.id)}
                            className={`p-2 rounded-xl border transition-colors ${
                              shortlisted
                                ? 'bg-[#fef9c3] border-[#fde047] text-[#854d0e]'
                                : 'bg-[#f3f3ef] border-[#e3e3df] text-[#737373] hover:text-[#0f1a0f]'
                            }`}
                            title={shortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
                          >
                            <Bookmark className="w-4 h-4 fill-current" />
                          </button>

                          <button
                            onClick={() => toggleCompare(inst.id)}
                            className={`p-2 rounded-xl border transition-colors ${
                              compared
                                ? 'bg-[#d4f0e1] border-[#25D366]/40 text-[#128C7E]'
                                : 'bg-[#f3f3ef] border-[#e3e3df] text-[#737373] hover:text-[#0f1a0f]'
                            }`}
                            title={compared ? 'Remove from comparison' : 'Add to comparison'}
                          >
                            <Scale className="w-4 h-4" />
                          </button>

                          <Link
                            to={`/institutes/${inst.id}`}
                            className="px-3 py-2 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
                          >
                            View Profile
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
