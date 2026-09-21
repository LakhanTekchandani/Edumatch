import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { MandatoryRegisterModal } from './components/auth/MandatoryRegisterModal';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { ExplorePage } from './pages/public/ExplorePage';
import { InstituteDetailPage } from './pages/public/InstituteDetailPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { InstituteRegisterPage } from './pages/public/InstituteRegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/public/ResetPasswordPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { ShortlistPage } from './pages/student/ShortlistPage';
import { ComparePage } from './pages/student/ComparePage';
import { StudentReviewsPage } from './pages/student/StudentReviewsPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

// Institute Pages
import { InstituteDashboard } from './pages/institute/InstituteDashboard';
import { InstituteVerificationPage } from './pages/institute/InstituteVerificationPage';
import { InstituteProfileManager } from './pages/institute/InstituteProfileManager';
import { AssociationManagerPage } from './pages/institute/AssociationManagerPage';
import { InstituteReviewsPage } from './pages/institute/InstituteReviewsPage';
import { InstituteSettingsPage } from './pages/institute/InstituteSettingsPage';

// Protected Route for Students
const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role } = useAuth();
  if (role === 'institute') return <Navigate to="/institute/dashboard" replace />;
  // For demo & prompt testing flexibility, if visitor clicks student dashboard, we auto-redirect to login or allow
  return <>{children}</>;
};

// Protected Route for Institutes
const InstituteRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role } = useAuth();
  if (role === 'student') return <Navigate to="/student/dashboard" replace />;
  if (role === 'visitor') return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-[#fafaf7] text-[#0f1a0f] font-sans selection:bg-[#25D366]/25 selection:text-[#075E54]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/institutes/:id" element={<InstituteDetailPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/institute/register" element={<InstituteRegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

                {/* STUDENT PROTECTED ROUTES */}
                <Route
                  path="/student/dashboard"
                  element={
                    <StudentRoute>
                      <StudentDashboard />
                    </StudentRoute>
                  }
                />
                <Route
                  path="/student/shortlist"
                  element={
                    <StudentRoute>
                      <ShortlistPage />
                    </StudentRoute>
                  }
                />
                <Route path="/student/compare" element={<ComparePage />} />
                <Route
                  path="/student/reviews"
                  element={
                    <StudentRoute>
                      <StudentReviewsPage />
                    </StudentRoute>
                  }
                />
                <Route
                  path="/student/profile"
                  element={
                    <StudentRoute>
                      <StudentProfilePage />
                    </StudentRoute>
                  }
                />

                {/* INSTITUTE PROTECTED ROUTES */}
                <Route
                  path="/institute/dashboard"
                  element={
                    <InstituteRoute>
                      <InstituteDashboard />
                    </InstituteRoute>
                  }
                />
                <Route
                  path="/institute/verification"
                  element={
                    <InstituteRoute>
                      <InstituteVerificationPage />
                    </InstituteRoute>
                  }
                />
                <Route
                  path="/institute/profile"
                  element={
                    <InstituteRoute>
                      <InstituteProfileManager />
                    </InstituteRoute>
                  }
                />
                <Route
                  path="/institute/students"
                  element={
                    <InstituteRoute>
                      <AssociationManagerPage />
                    </InstituteRoute>
                  }
                />
                <Route
                  path="/institute/reviews"
                  element={
                    <InstituteRoute>
                      <InstituteReviewsPage />
                    </InstituteRoute>
                  }
                />
                <Route
                  path="/institute/settings"
                  element={
                    <InstituteRoute>
                      <InstituteSettingsPage />
                    </InstituteRoute>
                  }
                />

                {/* FALLBACK */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
            <MandatoryRegisterModal />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
