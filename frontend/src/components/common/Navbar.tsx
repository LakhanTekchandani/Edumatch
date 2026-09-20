import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Search,
  Scale,
  Bookmark,
  User as UserIcon,
  LogOut,
  Building2,
  CheckCircle2,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, role, isAuthenticated, logout, switchRole } = useAuth();
  const { shortlist, compareList } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e3e3df] text-[#0f1a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Wordmark */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] p-0.5 shadow-md shadow-[#25D366]/20 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#128C7E] group-hover:text-[#25D366] transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-[#0f1a0f] flex items-center gap-1">
                  Edu<span className="text-[#128C7E]">Match</span>
                </span>
                <span className="text-[10px] text-[#737373] -mt-1 font-medium tracking-wide">
                  Coaching Review Platform
                </span>
              </div>
            </Link>

            {/* Role Demo Switcher Pill */}
            <div className="relative hidden md:block ml-4">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-[#f3f3ef] border border-[#e3e3df] text-[#2d4a2d] hover:text-[#0f1a0f] hover:bg-[#ebebeb] transition-colors"
                title="Switch view mode to test different role interfaces"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                Role: <span className="text-[#128C7E] font-semibold capitalize">{role}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#737373]" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#e3e3df] rounded-xl shadow-xl py-2 z-50 text-xs"
                  onMouseLeave={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 font-semibold text-[#737373] uppercase tracking-wider text-[10px]">
                    Test View Roles
                  </div>
                  <button
                    onClick={() => { switchRole('visitor'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-[#f3f3ef] ${role === 'visitor' ? 'text-[#128C7E] font-bold bg-[#d4f0e1]/40' : 'text-[#2d4a2d]'}`}
                  >
                    Visitor Mode
                  </button>
                  <button
                    onClick={() => { switchRole('student'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-[#f3f3ef] ${role === 'student' ? 'text-[#128C7E] font-bold bg-[#d4f0e1]/40' : 'text-[#2d4a2d]'}`}
                  >
                    Student Mode
                  </button>
                  <button
                    onClick={() => { switchRole('institute'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-[#f3f3ef] ${role === 'institute' ? 'text-[#128C7E] font-bold bg-[#d4f0e1]/40' : 'text-[#2d4a2d]'}`}
                  >
                    Institute Mode
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            
            {/* PUBLIC NAVIGATION */}
            <Link
              to="/explore"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/explore') ? 'bg-[#d4f0e1] text-[#128C7E] font-semibold border border-[#25D366]/40' : 'text-[#2d4a2d] hover:text-[#0f1a0f] hover:bg-[#f3f3ef]'
              }`}
            >
              <Search className="w-4 h-4 text-[#128C7E]" />
              Explore Institutes
            </Link>

            <Link
              to="/student/compare"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/student/compare') ? 'bg-[#d4f0e1] text-[#128C7E] font-semibold border border-[#25D366]/40' : 'text-[#2d4a2d] hover:text-[#0f1a0f] hover:bg-[#f3f3ef]'
              }`}
            >
              <Scale className="w-4 h-4 text-[#128C7E]" />
              Compare
              {compareList.length > 0 && (
                <span className="ml-1 bg-[#d4f0e1] text-[#128C7E] text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {compareList.length}
                </span>
              )}
            </Link>

            <Link
              to="/how-it-works"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/how-it-works') ? 'bg-[#d4f0e1] text-[#128C7E] font-semibold border border-[#25D366]/40' : 'text-[#2d4a2d] hover:text-[#0f1a0f] hover:bg-[#f3f3ef]'
              }`}
            >
              How It Works
            </Link>

            {/* ROLE SPECIFIC DASHBOARD LINKS */}
            {role === 'student' && (
              <>
                <Link
                  to="/student/shortlist"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/student/shortlist') ? 'bg-[#d4f0e1] text-[#128C7E] font-semibold border border-[#25D366]/40' : 'text-[#2d4a2d] hover:text-[#0f1a0f] hover:bg-[#f3f3ef]'
                  }`}
                >
                  <Bookmark className="w-4 h-4 text-[#854d0e]" />
                  Shortlist
                  {shortlist.length > 0 && (
                    <span className="bg-[#fef9c3] text-[#854d0e] text-xs px-1.5 py-0.5 rounded-full font-bold border border-[#fde047]">
                      {shortlist.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/student/dashboard"
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive('/student/dashboard') ? 'bg-[#128C7E] text-white shadow-sm' : 'text-[#2d4a2d] hover:text-[#0f1a0f] hover:bg-[#f3f3ef]'
                  }`}
                >
                  Student Dashboard
                </Link>
              </>
            )}

            {role === 'institute' && (
              <>
                <Link
                  to="/institute/verification"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/institute/verification') ? 'bg-[#d4f0e1] text-[#128C7E] font-semibold border border-[#25D366]/40' : 'text-[#2d4a2d] hover:text-[#0f1a0f] hover:bg-[#f3f3ef]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1a7a45]" />
                  Verification
                </Link>
                <Link
                  to="/institute/dashboard"
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    isActive('/institute/dashboard') ? 'bg-[#128C7E] text-white shadow-sm' : 'bg-[#f3f3ef] text-[#128C7E] hover:bg-[#ebebeb]'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Institute Portal
                </Link>
              </>
            )}

          </div>

          {/* Authentication Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-[#2d4a2d] hover:text-[#0f1a0f] px-3 py-2 rounded-lg hover:bg-[#f3f3ef] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold bg-[#25D366] hover:bg-[#1ebd5a] text-[#075E54] px-4 py-2 rounded-lg shadow-sm shadow-[#25D366]/30 transition-all"
                >
                  Register
                </Link>
                <Link
                  to="/institute/register"
                  className="text-xs font-semibold border border-[#128C7E]/40 text-[#128C7E] hover:bg-[#d4f0e1]/40 px-3 py-2 rounded-lg transition-colors"
                >
                  For Institutes
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to={role === 'institute' ? '/institute/settings' : '/student/profile'}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f3f3ef] border border-[#e3e3df] text-xs font-medium text-[#0f1a0f] hover:border-[#25D366]/60 transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-[#128C7E]" />
                  <span className="max-w-[120px] truncate">{user?.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-[#737373] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2d4a2d] hover:text-[#0f1a0f] rounded-lg bg-[#f3f3ef] border border-[#e3e3df]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e3e3df] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {/* Mobile Role Switcher */}
          <div className="bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#737373]">Viewing App As:</span>
            <div className="flex gap-1">
              <button
                onClick={() => switchRole('visitor')}
                className={`px-2 py-1 text-[11px] rounded-md font-medium ${role === 'visitor' ? 'bg-[#128C7E] text-white' : 'text-[#2d4a2d] hover:bg-[#ebebeb]'}`}
              >
                Visitor
              </button>
              <button
                onClick={() => switchRole('student')}
                className={`px-2 py-1 text-[11px] rounded-md font-medium ${role === 'student' ? 'bg-[#128C7E] text-white' : 'text-[#2d4a2d] hover:bg-[#ebebeb]'}`}
              >
                Student
              </button>
              <button
                onClick={() => switchRole('institute')}
                className={`px-2 py-1 text-[11px] rounded-md font-medium ${role === 'institute' ? 'bg-[#128C7E] text-white' : 'text-[#2d4a2d] hover:bg-[#ebebeb]'}`}
              >
                Institute
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#0f1a0f] hover:bg-[#f3f3ef]"
            >
              Home Page
            </Link>
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#0f1a0f] hover:bg-[#f3f3ef]"
            >
              Explore Coaching Institutes
            </Link>
            <Link
              to="/student/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#0f1a0f] hover:bg-[#f3f3ef]"
            >
              Compare Institutes ({compareList.length})
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#0f1a0f] hover:bg-[#f3f3ef]"
            >
              How It Works & Trust Model
            </Link>

            {role === 'student' && (
              <>
                <Link
                  to="/student/shortlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-[#0f1a0f] hover:bg-[#f3f3ef]"
                >
                  My Shortlist ({shortlist.length})
                </Link>
                <Link
                  to="/student/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-semibold text-[#128C7E] bg-[#d4f0e1]/50 border border-[#25D366]/30"
                >
                  Student Dashboard
                </Link>
              </>
            )}

            {role === 'institute' && (
              <>
                <Link
                  to="/institute/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-semibold text-[#128C7E] bg-[#d4f0e1]/50 border border-[#25D366]/30"
                >
                  Institute Dashboard
                </Link>
                <Link
                  to="/institute/verification"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-[#0f1a0f] hover:bg-[#f3f3ef]"
                >
                  Verification Status
                </Link>
                <Link
                  to="/institute/students"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-[#0f1a0f] hover:bg-[#f3f3ef]"
                >
                  Student Associations
                </Link>
              </>
            )}
          </div>

          <div className="pt-3 border-t border-[#e3e3df] space-y-2">
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-lg text-sm font-semibold bg-[#f3f3ef] text-[#0f1a0f] border border-[#e3e3df]"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-lg text-sm font-semibold bg-[#25D366] text-[#075E54]"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-[#f3f3ef] p-3 rounded-xl border border-[#e3e3df]">
                <div className="text-xs">
                  <div className="font-semibold text-[#0f1a0f]">{user?.name}</div>
                  <div className="text-[#737373]">{user?.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
