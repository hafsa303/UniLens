import React from 'react';
import { StudentRecord } from '../../data/campusData';

interface StudentDetailModalProps {
  student: StudentRecord | null;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 select-none animate-fade-in">
      <div
        className="w-full max-w-lg bg-[#151C2E] border border-[#1F293D] rounded-2xl p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center text-lg font-bold text-[#818CF8]">
              {student.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{student.name}</h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    student.riskLevel === 'High'
                      ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40'
                      : student.riskLevel === 'Medium'
                      ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40'
                      : 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                  }`}
                >
                  {student.riskLevel} Risk
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                {student.id} • {student.dept} • {student.year}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* 4 Metric Pills */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="p-3 rounded-xl bg-[#111728] border border-[#1E293D]">
            <span className="text-[10px] text-[#94A3B8] block">CGPA</span>
            <span className="text-base font-bold text-white">{student.cgpa}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#111728] border border-[#1E293D]">
            <span className="text-[10px] text-[#94A3B8] block">Attendance</span>
            <span className={`text-base font-bold ${student.attendance < 70 ? 'text-[#EF4444]' : 'text-white'}`}>
              {student.attendance}%
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#111728] border border-[#1E293D]">
            <span className="text-[10px] text-[#94A3B8] block">Readiness</span>
            <span className="text-base font-bold text-[#818CF8]">{student.readiness}%</span>
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-2.5 text-xs">
          <div className="p-3 rounded-xl bg-[#111728] border border-[#1E293D] space-y-1">
            <span className="text-[10.5px] text-[#94A3B8] block font-medium">Internship History</span>
            <span className="text-white font-medium">{student.internship}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#111728] border border-[#1E293D] space-y-1">
            <span className="text-[10.5px] text-[#94A3B8] block font-medium">Placement Status</span>
            <span className="text-white font-medium">{student.placementStatus}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#111728] border border-[#1E293D] space-y-1.5">
            <span className="text-[10.5px] text-[#94A3B8] block font-medium">Verified Skills</span>
            <div className="flex flex-wrap gap-1.5">
              {student.skills.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded-md bg-[#6366F1]/15 text-[#A5B4FC] text-[11px] border border-[#6366F1]/30"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation & Action */}
        <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between">
          <span className="text-[11px] text-[#94A3B8]">Email: {student.email}</span>
          <button
            onClick={() => {
              alert(`Remedial intervention assigned to ${student.name}. Mentor notified.`);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold shadow-sm"
          >
            Assign Remedial Action
          </button>
        </div>
      </div>
    </div>
  );
};
