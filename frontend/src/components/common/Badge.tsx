import React from 'react';
import { VerificationStatus } from '../../types';
import { ShieldCheck, Clock, ShieldAlert, AlertCircle } from 'lucide-react';

interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status, size = 'sm' }) => {
  if (status === 'verified') {
    return (
      <span
        className={`inline-flex items-center gap-1 font-semibold rounded-full bg-[#d4f0e1] text-[#1a7a45] border border-[#25D366]/40 shadow-xs ${
          size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
        }`}
      >
        <ShieldCheck className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
        <span>Verified Institute</span>
      </span>
    );
  }

  if (status === 'pending') {
    return (
      <span
        className={`inline-flex items-center gap-1 font-semibold rounded-full bg-[#fef9c3] text-[#854d0e] border border-[#fde047] ${
          size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
        }`}
      >
        <Clock className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
        <span>Verification Pending</span>
      </span>
    );
  }

  if (status === 'rejected') {
    return (
      <span
        className={`inline-flex items-center gap-1 font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200 ${
          size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
        }`}
      >
        <AlertCircle className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
        <span>Verification Rejected</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full bg-[#f3f3ef] text-[#737373] border border-[#e3e3df] ${
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
    >
      <ShieldAlert className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      <span>Unverified</span>
    </span>
  );
};
