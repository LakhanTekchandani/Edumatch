import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import XylophoneHelix from '../../components/originkit/ui/xylophone-helix';
import {
  Search,
  ShieldCheck,
  Scale,
  Bookmark,
  CheckCircle2,
  Lock,
  GraduationCap,
  ChevronRight,
  Building2,
  FileCheck,
  Star
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCity) params.set('city', selectedCity);
    if (selectedExam) params.set('examCategory', selectedExam);
    navigate(`/explore?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] selection:bg-[#25D366]/25 selection:text-[#075E54]">
      
      {/* ================================================== */}
      {/* SECTION 1: HERO SECTION WITH XYLOPHONE HELIX BACKGROUND */}
      {/* ================================================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-[#e3e3df]">
        
        {/* Originkit Xylophone Helix Background Component */}
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-multiply pointer-events-auto">
          <XylophoneHelix />
        </div>

        {/* Ambient Warm Gradients Overlay for Content Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fafaf7]/85 via-[#fafaf7]/75 to-[#fafaf7] pointer-events-none z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center space-y-8">
          
          {/* Trust Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#25D366]/40 text-[#128C7E] text-xs font-semibold shadow-sm backdrop-blur-md animate-in fade-in slide-in-from-top-4">
            <ShieldCheck className="w-4 h-4 text-[#1a7a45]" />
            <span>100% Verified Student Reviews • Zero Fake Statistics</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#0f1a0f]">
            Find the Right Coaching Institute. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#075E54]">
              Learn from Real Experiences.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#4a554a] max-w-2xl mx-auto leading-relaxed">
            Choosing the wrong coaching institute costs students valuable years. EduMatch connects aspirants with authentic, OTP-verified student reviews and transparent comparison tools.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1ebd5a] text-[#075E54] font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/30 transition-all transform hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4" />
              Explore Institutes
            </Link>

            <Link
              to="/how-it-works"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-[#f3f3ef] text-[#0f1a0f] border border-[#e3e3df] font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              How It Works
              <ChevronRight className="w-4 h-4 text-[#737373]" />
            </Link>
          </div>

          {/* Quick Discovery Search Bar Container */}
          <div className="pt-6 max-w-3xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white border border-[#e3e3df] rounded-2xl p-3 shadow-lg flex flex-col md:flex-row gap-2"
            >
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[#f3f3ef] rounded-xl border border-[#e3e3df]">
                <Search className="w-4 h-4 text-[#737373] shrink-0" />
                <input
                  type="text"
                  placeholder="Institute name or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#0f1a0f] placeholder:text-[#737373] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 md:w-80">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-[#f3f3ef] border border-[#e3e3df] text-[#0f1a0f] rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="">All Cities</option>
                  <option value="Kota">Kota</option>
                  <option value="New Delhi">New Delhi</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                </select>

                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="bg-[#f3f3ef] border border-[#e3e3df] text-[#0f1a0f] rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="">All Exams</option>
                  <option value="JEE">JEE Prep</option>
                  <option value="NEET">NEET Prep</option>
                  <option value="UPSC">UPSC Civil</option>
                  <option value="Class 11-12 Board">Boards</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1"
              >
                Search
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 2: HOW EDUMATCH WORKS (JOURNEY) */}
      {/* ================================================== */}
      <section className="py-20 bg-[#f3f3ef] border-b border-[#e3e3df]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#128C7E]">
              Student Journey
            </h2>
            <h3 className="text-3xl font-extrabold text-[#0f1a0f] tracking-tight">
              From Discovery to Decision in 6 Clear Steps
            </h3>
            <p className="text-sm text-[#737373]">
              We eliminate hearsay, marketing gimmicks, and unverified ratings through a transparent verification lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { num: '01', title: 'Discover', desc: 'Filter by city, exam, course fees, and learning mode.', icon: Search },
              { num: '02', title: 'Evaluate', desc: 'Inspect structured 6-dimension ratings by verified alumni.', icon: Star },
              { num: '03', title: 'Compare', desc: 'Side-by-side comparison matrix of fees, faculty & support.', icon: Scale },
              { num: '04', title: 'Shortlist', desc: 'Save preferred institutes to your personal dashboard.', icon: Bookmark },
              { num: '05', title: 'Verify', desc: 'Students verify enrolment via OTP before publishing.', icon: Lock },
              { num: '06', title: 'Decide', desc: 'Make an informed decision with true peace of mind.', icon: CheckCircle2 }
            ].map((item) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.num}
                  className="bg-white border border-[#e3e3df] rounded-2xl p-5 hover:border-[#25D366] hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#1a7a45] bg-[#d4f0e1] border border-[#25D366]/30 px-2 py-0.5 rounded-md">
                      {item.num}
                    </span>
                    <StepIcon className="w-4 h-4 text-[#737373] group-hover:text-[#128C7E] transition-colors" />
                  </div>
                  <h4 className="font-bold text-[#0f1a0f] text-base mb-1">{item.title}</h4>
                  <p className="text-xs text-[#737373] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 3: TRUST & REVIEW VERIFICATION SYSTEM EXPLANATION */}
      {/* ================================================== */}
      <section className="py-20 bg-[#fafaf7] border-b border-[#e3e3df]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4f0e1] border border-[#25D366]/40 text-[#1a7a45] text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#1a7a45]" />
                <span>Zero Fake Review Guarantee</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1a0f] tracking-tight leading-snug">
                Why EduMatch Reviews Are 100% Trustworthy
              </h2>

              <p className="text-sm text-[#4a554a] leading-relaxed">
                Generic review sites suffer from fake positive reviews created by institute staff, or malicious negative reviews posted by competitors. EduMatch fixes this permanently with closed-loop student verification.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#e3e3df] shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center text-[#128C7E] shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0f1a0f] text-sm">Active Enrolment Matching</h4>
                    <p className="text-xs text-[#737373] mt-0.5">
                      Coaching institutes register student email records. A student can only initiate a review if an active enrolment record matches their account.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#e3e3df] shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center text-[#128C7E] shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0f1a0f] text-sm">6-Digit Email OTP Verification</h4>
                    <p className="text-xs text-[#737373] mt-0.5">
                      Prior to unlocking the review form, a 6-digit one-time passcode must be verified against the registered student email address.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#e3e3df] shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center text-[#128C7E] shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0f1a0f] text-sm">Official Institute Response Right</h4>
                    <p className="text-xs text-[#737373] mt-0.5">
                      Verified institutes can post official responses to student reviews, but CANNOT delete or edit student ratings.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Structured 6 Dimension Rating Card Preview */}
            <div className="bg-white border border-[#e3e3df] p-6 rounded-2xl shadow-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#e3e3df]">
                <div>
                  <h4 className="font-bold text-base text-[#0f1a0f]">Structured Evaluation Dimensions</h4>
                  <p className="text-xs text-[#737373]">Every student review evaluates 6 core dimensions:</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                  1 to 5 Stars
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                {[
                  { name: 'Faculty Quality', desc: 'Teaching methodology, experience & depth', val: '4.7' },
                  { name: 'Study Material', desc: 'Module quality & exam alignment', val: '4.5' },
                  { name: 'Doubt Support', desc: 'Speed & availability of resolution counters', val: '4.2' },
                  { name: 'Fee Transparency', desc: 'No hidden charges or surprise costs', val: '4.0' },
                  { name: 'Batch Management', desc: 'Batch size & timetable discipline', val: '4.3' },
                  { name: 'Value for Money', desc: 'Overall educational return on fee invested', val: '4.4' }
                ].map((dim) => (
                  <div key={dim.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#0f1a0f]">{dim.name}</span>
                      <span className="font-bold text-[#128C7E] font-mono">{dim.val} / 5</span>
                    </div>
                    <div className="w-full bg-[#f3f3ef] rounded-full h-2 overflow-hidden border border-[#e3e3df]">
                      <div
                        className="bg-gradient-to-r from-[#128C7E] to-[#25D366] h-full rounded-full"
                        style={{ width: `${(parseFloat(dim.val) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#f3f3ef] rounded-xl border border-[#e3e3df] text-[11px] text-[#737373] flex items-center justify-between">
                <span>Institutes with zero reviews display "No reviews yet".</span>
                <span className="text-[#128C7E] font-semibold">No Fake Ratings</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 4: SIDE-BY-SIDE COMPARISON FEATURE SPOTLIGHT */}
      {/* ================================================== */}
      <section className="py-20 bg-[#f3f3ef] border-b border-[#e3e3df]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#128C7E]">
              Core Platform Feature
            </h2>
            <h3 className="text-3xl font-extrabold text-[#0f1a0f] tracking-tight">
              Compare Coaching Institutes Side-by-Side
            </h3>
            <p className="text-sm text-[#737373]">
              Compare up to 4 institutes across location, batch size, exact course fees, facilities, and verified alumni ratings.
            </p>
          </div>

          <div className="bg-white border border-[#e3e3df] rounded-2xl p-6 shadow-md overflow-x-auto">
            <div className="min-w-[600px] grid grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#f3f3ef] rounded-xl font-bold text-[#2d4a2d] space-y-4">
                <div className="h-10 flex items-center text-sm text-[#0f1a0f]">Comparison Dimension</div>
                <div className="py-2 border-t border-[#e3e3df]">Location / City</div>
                <div className="py-2 border-t border-[#e3e3df]">Approximate Course Fees</div>
                <div className="py-2 border-t border-[#e3e3df]">Learning Mode</div>
                <div className="py-2 border-t border-[#e3e3df]">Faculty Quality Rating</div>
                <div className="py-2 border-t border-[#e3e3df]">Verification Status</div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#e3e3df] space-y-4">
                <div className="h-10 flex items-center font-bold text-[#128C7E] text-sm">Apex Academy (Kota)</div>
                <div className="py-2 border-t border-[#e3e3df] text-[#4a554a]">Kota, Rajasthan</div>
                <div className="py-2 border-t border-[#e3e3df] font-mono text-[#1a7a45] font-bold">₹1,45,000 / yr</div>
                <div className="py-2 border-t border-[#e3e3df] text-[#4a554a]">Offline Classroom</div>
                <div className="py-2 border-t border-[#e3e3df] font-bold text-amber-600">4.7 / 5 (3 reviews)</div>
                <div className="py-2 border-t border-[#e3e3df] text-[#1a7a45] font-semibold">✓ Verified</div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#e3e3df] space-y-4">
                <div className="h-10 flex items-center font-bold text-[#128C7E] text-sm">Zenith Science Hub</div>
                <div className="py-2 border-t border-[#e3e3df] text-[#4a554a]">Hyderabad, Telangana</div>
                <div className="py-2 border-t border-[#e3e3df] font-mono text-[#1a7a45] font-bold">₹45,000 / yr</div>
                <div className="py-2 border-t border-[#e3e3df] text-[#4a554a]">Offline Small Batch</div>
                <div className="py-2 border-t border-[#e3e3df] text-[#737373] italic">No reviews yet</div>
                <div className="py-2 border-t border-[#e3e3df] text-[#854d0e] font-semibold">⌛ Pending</div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                to="/student/compare"
                className="px-6 py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
              >
                <Scale className="w-4 h-4" />
                Open Full Interactive Comparison Matrix
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 5: CALL TO ACTION FOR STUDENTS & INSTITUTES */}
      {/* ================================================== */}
      <section className="py-20 bg-gradient-to-b from-[#fafaf7] to-[#f3f3ef] border-b border-[#e3e3df]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="w-16 h-16 rounded-2xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center mx-auto text-[#128C7E]">
            <GraduationCap className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1a0f] tracking-tight">
            Ready to Find the Coaching That Fits You Best?
          </h2>

          <p className="text-sm sm:text-base text-[#4a554a] max-w-xl mx-auto leading-relaxed">
            Join thousands of aspirants using EduMatch for transparent coaching institute discovery and verified alumni feedback.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd5a] text-[#075E54] font-bold text-sm shadow-md shadow-[#25D366]/30 transition-all"
            >
              Start Exploring Institutes
            </Link>
            <Link
              to="/institute/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-[#ebebeb] text-[#128C7E] font-semibold text-sm border border-[#e3e3df] transition-all"
            >
              Are you an Institute? Register Here
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
