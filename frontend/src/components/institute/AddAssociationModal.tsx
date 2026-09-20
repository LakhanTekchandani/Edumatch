import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { X, UserPlus, ShieldCheck } from 'lucide-react';

interface AddAssociationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddAssociationModal: React.FC<AddAssociationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const { showToast } = useApp();

  const [studentEmail, setStudentEmail] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('JEE Advanced Target Batch');
  const [batchYear, setBatchYear] = useState<string>('2024-2025');
  const [submitting, setSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.instituteId) return;

    setSubmitting(true);
    await api.addStudentAssociation({
      instituteId: user.instituteId,
      studentEmail,
      studentName,
      courseName,
      batchYear
    });
    setSubmitting(false);

    showToast('Student Association Added', `Enrolment authorized for ${studentEmail}.`, 'success');
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-[#e3e3df] rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-[#0f1a0f]">
        <div className="flex items-center justify-between pb-4 border-b border-[#e3e3df]">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#128C7E]" />
            <h3 className="font-bold text-base text-[#0f1a0f]">Add Enrolled Student Record</h3>
          </div>
          <button onClick={onClose} className="text-[#737373] hover:text-[#0f1a0f] p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="bg-[#d4f0e1]/40 p-3 rounded-xl border border-[#25D366]/30 text-xs text-[#0f1a0f] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#128C7E]" />
            <span>Adding a student email authorizes them to complete OTP verification and write a review for your institute.</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[#2d4a2d] mb-1 font-medium">Student Registered Email *</label>
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />
            </div>

            <div>
              <label className="block text-[#2d4a2d] mb-1 font-medium">Student Full Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Aman Deep"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#2d4a2d] mb-1 font-medium">Enrolled Course *</label>
                <input
                  type="text"
                  required
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
              </div>
              <div>
                <label className="block text-[#2d4a2d] mb-1 font-medium">Batch Year *</label>
                <select
                  value={batchYear}
                  onChange={(e) => setBatchYear(e.target.value)}
                  className="w-full bg-[#f3f3ef] border border-[#e3e3df] rounded-xl p-2.5 text-[#0f1a0f] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                >
                  <option value="2024-2025">2024-2025</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2025-2026">2025-2026</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#f3f3ef] text-[#0f1a0f] border border-[#e3e3df] text-xs font-semibold hover:bg-[#ebebeb] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Save Student Association
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
