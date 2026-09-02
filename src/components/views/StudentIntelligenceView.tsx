import React, { useState } from 'react';
import { STUDENT_RECORDS, STUDENT_DEPARTMENT_DISTRIBUTION, StudentRecord } from '../../data/campusData';
import { StudentDetailModal } from './StudentDetailModal';

export const StudentIntelligenceView: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  const filteredStudents = STUDENT_RECORDS.filter((s) => {
    if (selectedDept !== 'ALL' && s.dept !== selectedDept) return false;
    if (selectedRisk !== 'ALL' && s.riskLevel !== selectedRisk) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Student Intelligence</h2>
        <p className="text-sm text-[#94A3B8] mt-0.5">
          Understand student performance, engagement and development across campus.
        </p>
      </div>

      {/* Top 5 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center text-[#818CF8]">
              <span className="material-symbols-outlined text-[20px]">group</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Total Students</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">4,820</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#10B981] mt-3 font-medium">↑ 8.6% enrollment</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 border border-[#06B6D4]/30 flex items-center justify-center text-[#22D3EE]">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Average CGPA</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">8.24</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#10B981] mt-3 font-medium">↑ 0.18 vs last sem</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/30 flex items-center justify-center text-[#60A5FA]">
              <span className="material-symbols-outlined text-[20px]">event_available</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Avg. Attendance</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">82%</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#10B981] mt-3 font-medium">↑ 6.1% vs last year</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/30 flex items-center justify-center text-[#FBBF24]">
              <span className="material-symbols-outlined text-[20px]">work_history</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Internships</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">64%</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#10B981] mt-3 font-medium">↑ 12% industry live</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EF4444]/20 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444]">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Students At Risk</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">142</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#EF4444] mt-3 font-medium">Requires intervention</p>
        </div>
      </div>

      {/* Charts Row: Student Distribution + Academic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* STUDENT DISTRIBUTION */}
        <div className="card-depth p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Student Distribution by Department</h3>
            <span className="text-xs text-[#818CF8] font-medium">4,820 Total</span>
          </div>

          <div className="space-y-3 pt-1">
            {STUDENT_DEPARTMENT_DISTRIBUTION.map((d) => (
              <div key={d.dept} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[11.5px] font-semibold text-[#E2E8F0]">{d.dept}</span>
                <div className="flex-1 h-3 bg-[#111728] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${d.percentage * 2.5}%`, backgroundColor: d.color }}
                  ></div>
                </div>
                <span className="w-16 text-right text-[11px] text-[#94A3B8]">
                  {d.count} ({d.percentage}%)
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#64748B] mt-4">
            CSE and ECE represent over 46% of total campus undergraduate student body.
          </p>
        </div>

        {/* ACADEMIC & ENGAGEMENT OVERVIEW */}
        <div className="card-depth p-5 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white mb-3">Academic & Engagement Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#111728] border border-[#1E293D]">
              <span className="text-[10.5px] text-[#94A3B8] block">CGPA Distribution</span>
              <span className="text-sm font-bold text-white mt-1 block">78% above 7.5</span>
              <span className="text-[10px] text-[#10B981]">Consistently strong</span>
            </div>
            <div className="p-3 rounded-xl bg-[#111728] border border-[#1E293D]">
              <span className="text-[10.5px] text-[#94A3B8] block">Attendance Compliance</span>
              <span className="text-sm font-bold text-white mt-1 block">94.8% &gt;75% min</span>
              <span className="text-[10px] text-[#10B981]">Meets university rules</span>
            </div>
            <div className="p-3 rounded-xl bg-[#111728] border border-[#1E293D]">
              <span className="text-[10.5px] text-[#94A3B8] block">Internship Engagement</span>
              <span className="text-sm font-bold text-white mt-1 block">3,084 Enrolled</span>
              <span className="text-[10px] text-[#818CF8]">64% Participation</span>
            </div>
            <div className="p-3 rounded-xl bg-[#111728] border border-[#1E293D]">
              <span className="text-[10.5px] text-[#94A3B8] block">Skill Certified</span>
              <span className="text-sm font-bold text-white mt-1 block">2,410 Students</span>
              <span className="text-[10px] text-[#818CF8]">Cloud + AI Track</span>
            </div>
          </div>
          <p className="text-[10px] text-[#64748B] mt-4">
            Cross-tabulated with campus LMS records and university registrar gradebook.
          </p>
        </div>
      </div>

      {/* STUDENTS REQUIRING ATTENTION TABLE */}
      <div className="card-depth p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Students Requiring Attention</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30">
                Action Needed
              </span>
            </h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Click any student to view detailed academic profile and assign interventions.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-[#111728] border border-[#1E293D] rounded-lg px-2.5 py-1 text-xs text-white"
            >
              <option value="ALL">All Depts</option>
              <option value="CSE">CSE</option>
              <option value="ISE">ISE</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
              <option value="CV">CV</option>
              <option value="EEE">EEE</option>
            </select>

            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="bg-[#111728] border border-[#1E293D] rounded-lg px-2.5 py-1 text-xs text-white"
            >
              <option value="ALL">All Risks</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1E293B] text-[#94A3B8]">
                <th className="pb-2.5 font-medium">Student Name</th>
                <th className="pb-2.5 font-medium">Dept</th>
                <th className="pb-2.5 font-medium">Year</th>
                <th className="pb-2.5 font-medium">Attendance</th>
                <th className="pb-2.5 font-medium">CGPA</th>
                <th className="pb-2.5 font-medium">Readiness</th>
                <th className="pb-2.5 font-medium">Risk Level</th>
                <th className="pb-2.5 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2538]/60">
              {filteredStudents.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelectedStudent(s)}
                  className="hover:bg-[#111728] cursor-pointer transition-colors"
                >
                  <td className="py-2.5 font-semibold text-white">
                    <div>{s.name}</div>
                    <span className="text-[10px] text-[#64748B] font-mono">{s.id}</span>
                  </td>
                  <td className="py-2.5 text-[#E2E8F0]">{s.dept}</td>
                  <td className="py-2.5 text-[#94A3B8]">{s.year}</td>
                  <td className={`py-2.5 font-semibold ${s.attendance < 70 ? 'text-[#EF4444]' : 'text-white'}`}>
                    {s.attendance}%
                  </td>
                  <td className="py-2.5 font-mono text-white">{s.cgpa}</td>
                  <td className="py-2.5 text-[#818CF8] font-medium">{s.readiness}%</td>
                  <td className="py-2.5">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        s.riskLevel === 'High'
                          ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30'
                          : s.riskLevel === 'Medium'
                          ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                          : 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                      }`}
                    >
                      {s.riskLevel}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    <button className="text-[11px] text-[#818CF8] hover:underline">
                      Inspect Profile →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};
