import React from 'react';
import { LucideIcon, Search } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Search,
  title,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white border border-[#e3e3df] rounded-2xl shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-[#d4f0e1] border border-[#25D366]/40 flex items-center justify-center mb-4 text-[#128C7E]">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-[#0f1a0f] mb-2">{title}</h3>
      <p className="text-sm text-[#737373] max-w-md leading-relaxed mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-sm shadow-sm transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
