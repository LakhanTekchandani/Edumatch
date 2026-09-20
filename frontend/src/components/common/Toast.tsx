import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl bg-white transition-all animate-in slide-in-from-bottom-5 ${
            toast.type === 'success'
              ? 'border-[#25D366] text-[#0f1a0f]'
              : toast.type === 'error'
              ? 'border-rose-300 text-[#0f1a0f]'
              : 'border-[#128C7E] text-[#0f1a0f]'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#128C7E] shrink-0 mt-0.5" />}

          <div className="flex-1 text-xs">
            <h5 className="font-semibold text-[#0f1a0f] text-sm">{toast.title}</h5>
            {toast.message && <p className="mt-0.5 text-[#4a554a] leading-snug">{toast.message}</p>}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#737373] hover:text-[#0f1a0f] p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
