import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const ResetPasswordPage: React.FC = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Error', 'Passwords do not match.', 'error');
      return;
    }
    showToast('Password Updated', 'Your password has been reset successfully.', 'success');
    navigate('/login');
  };

  return (
    <div className="min-h-[80vh] bg-[#fafaf7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-[#e3e3df] rounded-3xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-[#0f1a0f]">Set New Password</h2>
          <p className="text-xs text-[#737373]">Choose a secure password for your EduMatch account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#2d4a2d] mb-1 font-medium">New Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            />
          </div>

          <div>
            <label className="block text-[#2d4a2d] mb-1 font-medium">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs transition-colors shadow-xs"
          >
            Update Password & Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
