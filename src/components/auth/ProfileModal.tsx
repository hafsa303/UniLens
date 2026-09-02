import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface ProfileModalProps {
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const { currentUser, updateProfile } = useAuth();
  if (!currentUser) return null;

  const [name, setName] = useState(currentUser.name);
  const [department, setDepartment] = useState(currentUser.department || 'CSE');
  const [skills, setSkills] = useState(currentUser.skills || '');
  const [cgpa, setCgpa] = useState(currentUser.cgpa || '');
  const [semester, setSemester] = useState(currentUser.semester || '7th Semester');
  const [designation, setDesignation] = useState(currentUser.designation || '');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      department,
      skills,
      cgpa,
      semester,
      designation,
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in select-none">
      <div
        className="w-full max-w-lg bg-[#151C2E] border border-[#1F293D] rounded-2xl p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
              alt={currentUser.name}
              className="w-11 h-11 rounded-full object-cover border border-[#4F46E5]/40"
            />
            <div>
              <h3 className="text-base font-bold text-white">{currentUser.name}</h3>
              <p className="text-xs text-[#818CF8] font-medium">{currentUser.role} • {currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {savedMessage && (
          <div className="p-2.5 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 text-xs text-[#10B981] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>Profile successfully updated!</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="text-[#94A3B8]">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111728] border border-[#232F46] rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[#94A3B8]">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-[#111728] border border-[#232F46] rounded-xl px-2.5 py-2 text-white"
              >
                <option value="CSE">Computer Science (CSE)</option>
                <option value="ISE">Information Science (ISE)</option>
                <option value="ECE">Electronics & Comm. (ECE)</option>
                <option value="ME">Mechanical Eng. (ME)</option>
                <option value="CV">Civil Eng. (CV)</option>
                <option value="EEE">Electrical Eng. (EEE)</option>
              </select>
            </div>

            {currentUser.role === 'Student' ? (
              <div className="space-y-1">
                <label className="text-[#94A3B8]">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full bg-[#111728] border border-[#232F46] rounded-xl px-2.5 py-2 text-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={`${s}th Semester`}>{s}th Semester</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-[#94A3B8]">Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full bg-[#111728] border border-[#232F46] rounded-xl px-3 py-2 text-white"
                />
              </div>
            )}
          </div>

          {currentUser.role === 'Student' && (
            <>
              <div className="space-y-1">
                <label className="text-[#94A3B8]">Current CGPA</label>
                <input
                  type="text"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full bg-[#111728] border border-[#232F46] rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[#94A3B8]">Technical Skills</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full bg-[#111728] border border-[#232F46] rounded-xl px-3 py-2 text-white"
                />
              </div>
            </>
          )}

          <div className="pt-3 border-t border-[#1E293B] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-[#141B2D] border border-[#232F46] text-[#94A3B8] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold shadow-sm"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
