import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Lock, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f3f3ef] border-t border-[#e3e3df] text-[#737373] text-sm pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#128C7E] to-[#25D366] p-0.5">
                <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#128C7E]" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-[#0f1a0f]">
                Edu<span className="text-[#128C7E]">Match</span>
              </span>
            </div>
            <p className="text-xs text-[#737373] leading-relaxed">
              Find the right coaching institute. Learn from real, OTP-verified student experiences without fake statistics or unverified claims.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#1a7a45] bg-[#d4f0e1] border border-[#25D366]/40 px-3 py-1.5 rounded-lg w-fit font-medium">
              <ShieldCheck className="w-4 h-4 text-[#1a7a45]" />
              <span>100% Student Verified Platform</span>
            </div>
          </div>

          {/* Quick Discovery */}
          <div>
            <h4 className="text-[#0f1a0f] font-semibold mb-3 text-xs uppercase tracking-wider">Discovery</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/explore" className="text-[#4a554a] hover:text-[#128C7E] transition-colors">
                  Explore Coaching Institutes
                </Link>
              </li>
              <li>
                <Link to="/explore?examCategory=JEE" className="text-[#4a554a] hover:text-[#128C7E] transition-colors">
                  JEE Entrance Institutes
                </Link>
              </li>
              <li>
                <Link to="/explore?examCategory=NEET" className="text-[#4a554a] hover:text-[#128C7E] transition-colors">
                  NEET Medical Institutes
                </Link>
              </li>
              <li>
                <Link to="/explore?examCategory=UPSC" className="text-[#4a554a] hover:text-[#128C7E] transition-colors">
                  UPSC Civil Services Coaching
                </Link>
              </li>
              <li>
                <Link to="/student/compare" className="text-[#4a554a] hover:text-[#128C7E] transition-colors">
                  Side-by-Side Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Trust */}
          <div>
            <h4 className="text-[#0f1a0f] font-semibold mb-3 text-xs uppercase tracking-wider">Trust & Verification</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/how-it-works" className="text-[#4a554a] hover:text-[#128C7E] transition-colors">
                  How EduMatch Works
                </Link>
              </li>
              <li>
                <Link to="/how-it-works#review-eligibility" className="text-[#4a554a] hover:text-[#128C7E] transition-colors flex items-center gap-1">
                  Enrolment & OTP Verification <Lock className="w-3 h-3 text-[#128C7E]" />
                </Link>
              </li>
              <li>
                <Link to="/institute/verification" className="text-[#4a554a] hover:text-[#128C7E] transition-colors">
                  Institute Verification Process
                </Link>
              </li>
              <li>
                <Link to="/how-it-works#review-dimensions" className="text-[#4a554a] hover:text-[#128C7E] transition-colors">
                  6-Dimension Rating Framework
                </Link>
              </li>
            </ul>
          </div>

          {/* Portal Access */}
          <div>
            <h4 className="text-[#0f1a0f] font-semibold mb-3 text-xs uppercase tracking-wider">Account Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/login" className="text-[#4a554a] hover:text-[#128C7E] transition-colors">
                  Student Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-[#4a554a] hover:text-[#128C7E] transition-colors">
                  Student Registration
                </Link>
              </li>
              <li>
                <Link to="/institute/register" className="hover:text-[#128C7E] transition-colors flex items-center gap-1 text-[#128C7E] font-semibold">
                  Register Institute <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/institute/dashboard" className="text-[#4a554a] hover:text-[#128C7E] transition-colors">
                  Institute Representative Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-[#e3e3df] flex flex-col sm:flex-row items-center justify-between text-xs text-[#737373] gap-4">
          <p>© {new Date().getFullYear()} EduMatch Academic Review Platform. Production-Ready Frontend.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#737373]">Privacy Policy</span>
            <span className="text-[#737373]">Terms of Service</span>
            <span className="text-[#128C7E] font-medium text-[11px]">Supabase-Ready Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
