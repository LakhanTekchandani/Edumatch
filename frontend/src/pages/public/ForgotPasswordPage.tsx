import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [sent, setSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-[80vh] bg-[#fafaf7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-[#e3e3df] rounded-3xl p-8 shadow-sm space-y-6">
        {sent ? (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="w-12 h-12 text-[#1a7a45] mx-auto" />
            <h3 className="text-lg font-bold text-[#0f1a0f]">Reset Link Dispatched</h3>
            <p className="text-xs text-[#737373]">
              We sent password recovery instructions to <span className="text-[#128C7E] font-semibold">{email}</span>.
            </p>
            <Link to="/reset-password" className="block py-2.5 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-xl text-xs font-semibold transition-colors">
              Go to Password Reset Screen
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-extrabold text-[#0f1a0f]">Recover Password</h2>
              <p className="text-xs text-[#737373]">
                Enter your registered email address to receive reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#2d4a2d] mb-1 font-medium">Registered Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                Send Password Reset Link <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
