import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/unilens';

interface SignupPageProps {
  onSwitchToLogin: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSwitchToLogin }) => {
  const { signup } = useAuth();
  
  // Basic Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Student');

  // Role-Specific Profile Attributes
  const [department, setDepartment] = useState('CSE');
  const [semester, setSemester] = useState('6th Semester');
  const [cgpa, setCgpa] = useState('8.50');
  const [skills, setSkills] = useState('Python, Data Structures, Machine Learning');
  const [internshipStatus, setInternshipStatus] = useState('Seeking Internship');
  const [placementStatus, setPlacementStatus] = useState('Placement Eligible');
  const [designation, setDesignation] = useState('Associate Professor');
  const [organization, setOrganization] = useState('Campus Placement Cell');

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill out all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const success = signup({
      name: name.trim(),
      email: email.trim(),
      password,
      role,
      department,
      semester: role === 'Student' ? semester : undefined,
      cgpa: role === 'Student' ? cgpa : undefined,
      skills: role === 'Student' ? skills : undefined,
      internshipStatus: role === 'Student' ? internshipStatus : undefined,
      placementStatus: role === 'Student' ? placementStatus : undefined,
      designation: role === 'Faculty' || role === 'Placement Team' || role === 'Administrator' ? designation : undefined,
      organization: role === 'Placement Team' ? organization : undefined,
    });

    if (!success) {
      setError('An account with this email address already exists. Please log in.');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#0B0E17] flex items-center justify-center p-4 select-none relative overflow-y-auto py-8">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-lg bg-[#151C2E] border border-[#1F293D] rounded-2xl p-7 md:p-8 shadow-2xl relative z-10 space-y-6 my-auto animate-fade-in">
        {/* Brand Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white tracking-wider">Create Your Profile</h1>
          <p className="text-xs text-[#818CF8] font-medium">UNI LENS Campus Intelligence</p>
          <p className="text-xs text-[#94A3B8]">Set up your personalized university account</p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 text-xs text-[#EF4444] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white">Select Your Role</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Student', 'Faculty', 'Placement Team', 'Administrator'] as UserRole[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-all text-center ${
                    role === r
                      ? 'bg-[#4F46E5] text-white border-[#818CF8] shadow-sm'
                      : 'bg-[#111728] border-[#232F46] text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#94A3B8]">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                required
                className="w-full bg-[#111728] border border-[#232F46] rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#6366F1]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#94A3B8]">Campus Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul@unilens.edu"
                required
                className="w-full bg-[#111728] border border-[#232F46] rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#6366F1]"
              />
            </div>
          </div>

          {/* Password & Confirm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#94A3B8]">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#111728] border border-[#232F46] rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#6366F1]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#94A3B8]">Confirm Password *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#111728] border border-[#232F46] rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#6366F1]"
              />
            </div>
          </div>

          {/* Dynamic Role-Specific Fields */}
          <div className="p-3.5 rounded-xl bg-[#111728] border border-[#1E293D] space-y-3">
            <span className="text-[11px] font-bold text-[#818CF8] uppercase tracking-wider block">
              {role} Profile Attributes
            </span>

            {/* Department */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-[#94A3B8]">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#141B2D] border border-[#232F46] rounded-lg px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="CSE">Computer Science (CSE)</option>
                  <option value="ISE">Information Science (ISE)</option>
                  <option value="ECE">Electronics & Comm. (ECE)</option>
                  <option value="ME">Mechanical Eng. (ME)</option>
                  <option value="CV">Civil Eng. (CV)</option>
                  <option value="EEE">Electrical Eng. (EEE)</option>
                </select>
              </div>

              {role === 'Student' && (
                <div className="space-y-1">
                  <label className="text-[11px] text-[#94A3B8]">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#232F46] rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={`${s}th Semester`}>{s}th Semester</option>
                    ))}
                  </select>
                </div>
              )}

              {(role === 'Faculty' || role === 'Placement Team' || role === 'Administrator') && (
                <div className="space-y-1">
                  <label className="text-[11px] text-[#94A3B8]">Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Associate Professor"
                    className="w-full bg-[#141B2D] border border-[#232F46] rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              )}
            </div>

            {role === 'Student' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-[#94A3B8]">Current CGPA</label>
                    <input
                      type="text"
                      value={cgpa}
                      onChange={(e) => setCgpa(e.target.value)}
                      placeholder="e.g. 8.75"
                      className="w-full bg-[#141B2D] border border-[#232F46] rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-[#94A3B8]">Placement Status</label>
                    <select
                      value={placementStatus}
                      onChange={(e) => setPlacementStatus(e.target.value)}
                      className="w-full bg-[#141B2D] border border-[#232F46] rounded-lg px-2.5 py-1.5 text-xs text-white"
                    >
                      <option value="Placement Eligible">Placement Eligible</option>
                      <option value="Seeking Placement">Seeking Placement</option>
                      <option value="Placed (Tier 1)">Placed (Tier 1)</option>
                      <option value="Higher Studies">Higher Studies</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-[#94A3B8]">Key Technical Skills</label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g. React, Python, Cloud Computing"
                    className="w-full bg-[#141B2D] border border-[#232F46] rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-xs transition-colors shadow-sm shadow-[#4F46E5]/40 flex items-center justify-center gap-2"
          >
            <span>Complete Profile & Open Dashboard</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </form>

        <div className="text-center pt-1 text-xs text-[#94A3B8]">
          <span>Already have an account? </span>
          <button
            onClick={onSwitchToLogin}
            className="text-[#818CF8] hover:text-white font-semibold hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
