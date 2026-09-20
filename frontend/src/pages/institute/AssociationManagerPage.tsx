import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { StudentAssociation } from '../../types';
import { AddAssociationModal } from '../../components/institute/AddAssociationModal';
import { Users, UserPlus, Search, ShieldCheck } from 'lucide-react';

export const AssociationManagerPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useApp();

  const [associations, setAssociations] = useState<StudentAssociation[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

  useEffect(() => {
    loadAssocs();
  }, [user]);

  const loadAssocs = async () => {
    if (!user?.instituteId) return;
    setLoading(true);
    const data = await api.getStudentAssociations(user.instituteId);
    setAssociations(data);
    setLoading(false);
  };

  const handleToggle = async (id: string) => {
    const updated = await api.toggleAssociationStatus(id);
    if (updated) {
      setAssociations((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: updated.status } : a))
      );
      showToast('Status Updated', `Enrolment state toggled to ${updated.status}.`, 'info');
    }
  };

  const filtered = associations.filter(
    (a) =>
      a.studentEmail.toLowerCase().includes(search.toLowerCase()) ||
      a.courseName.toLowerCase().includes(search.toLowerCase()) ||
      (a.studentName && a.studentName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0f1a0f] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e3e3df] pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0f1a0f] flex items-center gap-2">
              <Users className="w-6 h-6 text-[#128C7E]" /> Student Association Management
            </h1>
            <p className="text-xs text-[#737373] mt-1">
              Authorize student email records to control OTP review eligibility on EduMatch.
            </p>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2.5 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <UserPlus className="w-4 h-4" /> Add Student Record
          </button>
        </div>

        {/* Informational Banner */}
        <div className="bg-[#d4f0e1]/40 border border-[#25D366]/30 p-4 rounded-xl text-xs text-[#0f1a0f] flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 shrink-0 text-[#128C7E] mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold text-[#0f1a0f]">How Review Eligibility Works:</span> Only students whose registered email exists in your active enrolment list can complete OTP verification and publish a review. Setting an enrolment to <span className="text-rose-600 font-semibold">inactive</span> temporarily suspends review submission capability for that student.
          </p>
        </div>

        {/* Filter Search */}
        <div className="flex items-center gap-2 bg-white border border-[#e3e3df] p-3 rounded-xl max-w-md shadow-xs">
          <Search className="w-4 h-4 text-[#737373]" />
          <input
            type="text"
            placeholder="Search student email, name or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs text-[#0f1a0f] placeholder:text-[#737373] focus:outline-none w-full"
          />
        </div>

        {/* Associations Table */}
        <div className="bg-white border border-[#e3e3df] rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#e3e3df] text-[#737373] uppercase tracking-wider text-[10px] bg-[#f3f3ef]">
                  <th className="py-3 px-4">Student Email</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Enrolled Course</th>
                  <th className="py-3 px-4">Batch Year</th>
                  <th className="py-3 px-4">Eligibility Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e3e3df]">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f3f3ef]/50">
                    <td className="py-3 px-4 font-mono font-semibold text-[#0f1a0f]">{item.studentEmail}</td>
                    <td className="py-3 px-4 text-[#4a554a]">{item.studentName || '—'}</td>
                    <td className="py-3 px-4 text-[#128C7E] font-medium">{item.courseName}</td>
                    <td className="py-3 px-4 font-mono text-[#737373]">{item.batchYear}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        item.status === 'active'
                          ? 'bg-[#d4f0e1] text-[#1a7a45] border border-[#25D366]/40'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleToggle(item.id)}
                        className="px-3 py-1 bg-[#f3f3ef] hover:bg-[#ebebeb] border border-[#e3e3df] text-[#0f1a0f] rounded-lg text-[11px] font-medium transition-colors"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {addModalOpen && (
        <AddAssociationModal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSuccess={() => loadAssocs()}
        />
      )}

    </div>
  );
};
