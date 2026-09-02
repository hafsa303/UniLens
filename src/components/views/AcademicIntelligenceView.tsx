import React from 'react';
import {
  SUBJECT_PERFORMANCE,
  ATTENDANCE_VS_PERFORMANCE,
  STUDENT_DEPARTMENT_DISTRIBUTION,
} from '../../data/campusData';

export const AcademicIntelligenceView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Academic Intelligence</h2>
        <p className="text-sm text-[#94A3B8] mt-0.5">
          Identify academic trends, performance gaps and students requiring intervention.
        </p>
      </div>

      {/* Top 5 KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center text-[#818CF8]">
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
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Pass Rate</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">92.4%</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#10B981] mt-3 font-medium">↑ 2.1% improvement</p>
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
            <div className="w-10 h-10 rounded-xl bg-[#EF4444]/20 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444]">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Students At Risk</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">142</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#EF4444] mt-3 font-medium">&lt; 70% attendance / CGPA</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 border border-[#06B6D4]/30 flex items-center justify-center text-[#22D3EE]">
              <span className="material-symbols-outlined text-[20px]">leaderboard</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Top Department</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">CSE</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#818CF8] mt-3 font-medium">8.65 Avg CGPA</p>
        </div>
      </div>

      {/* AI ACADEMIC RISK INSIGHT */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#151C2E] via-[#1F1938] to-[#151C2E] border border-[#EF4444]/40 shadow-md flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-[#EF4444]/20 border border-[#EF4444]/40 flex items-center justify-center text-[#EF4444] shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px]">analytics</span>
        </div>
        <div>
          <span className="text-xs font-bold text-[#F87171] uppercase tracking-wider block">
            ACADEMIC RISK TELEMETRY
          </span>
          <p className="text-xs text-white mt-0.5 font-medium leading-relaxed">
            "Students with attendance below 70% show significantly lower average academic performance (Avg CGPA: 5.92 vs 8.65 for cohorts above 85%). Failure probability in semester end finals rises by 5.8x."
          </p>
        </div>
      </div>

      {/* Row 2: Attendance vs Performance & Department Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ATTENDANCE VS PERFORMANCE */}
        <div className="card-depth p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Attendance vs Academic Performance</h3>
            <span className="text-xs text-[#818CF8] font-medium">4,820 Cohort Analysis</span>
          </div>

          <div className="space-y-3 pt-2">
            {ATTENDANCE_VS_PERFORMANCE.map((b) => (
              <div key={b.attendanceBucket} className="flex items-center gap-3 text-xs">
                <span className="w-24 text-[11px] text-[#94A3B8]">{b.attendanceBucket}</span>
                <div className="flex-1 h-3 bg-[#111728] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(b.avgCgpa / 10) * 100}%`,
                      backgroundColor: b.avgCgpa < 7.0 ? '#EF4444' : b.avgCgpa < 8.0 ? '#F59E0B' : '#10B981',
                    }}
                  ></div>
                </div>
                <span className="w-16 text-right font-bold text-white">{b.avgCgpa} CGPA</span>
                <span className="w-16 text-right text-[10.5px] text-[#94A3B8]">
                  {b.studentCount} stds
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#64748B] mt-4">
            Strong positive correlation (r = 0.84) between classroom practical presence and examination grades.
          </p>
        </div>

        {/* DEPARTMENT PERFORMANCE COMPARISON */}
        <div className="card-depth p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Department Academic Benchmarks</h3>
            <span className="text-xs text-[#818CF8] font-medium">Semester 2026</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { dept: 'CSE', cgpa: 8.65, passRate: 96, attendance: 86, color: '#8B5CF6' },
              { dept: 'ISE', cgpa: 8.42, passRate: 94, attendance: 84, color: '#6366F1' },
              { dept: 'ECE', cgpa: 8.18, passRate: 91, attendance: 81, color: '#38BDF8' },
              { dept: 'EEE', cgpa: 8.05, passRate: 90, attendance: 82, color: '#F59E0B' },
              { dept: 'ME', cgpa: 7.92, passRate: 88, attendance: 78, color: '#14B8A6' },
              { dept: 'CV', cgpa: 7.84, passRate: 86, attendance: 77, color: '#84CC16' },
            ].map((d) => (
              <div key={d.dept} className="flex items-center justify-between p-2.5 rounded-xl bg-[#111728] border border-[#1E293D] text-xs">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: d.color }}
                  ></span>
                  <span className="font-bold text-white">{d.dept}</span>
                </div>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="text-[#94A3B8]">CGPA: <strong className="text-white">{d.cgpa}</strong></span>
                  <span className="text-[#94A3B8]">Pass: <strong className="text-[#10B981]">{d.passRate}%</strong></span>
                  <span className="text-[#94A3B8]">Att: <strong className="text-white">{d.attendance}%</strong></span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#64748B] mt-3">
            All 6 engineering departments exceed national accreditation compliance baselines.
          </p>
        </div>
      </div>

      {/* SUBJECT PERFORMANCE TABLE */}
      <div className="card-depth p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Subject-Level Performance & Failure Rates</h3>
            <p className="text-xs text-[#94A3B8]">
              Identifying subjects with high failure percentages requiring tutorial intervention.
            </p>
          </div>
          <span className="text-xs text-[#EF4444] font-medium">2 Core Subjects Flagged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1E293B] text-[#94A3B8]">
                <th className="pb-2.5 font-medium">Subject Name</th>
                <th className="pb-2.5 font-medium">Course Code</th>
                <th className="pb-2.5 font-medium">Average Marks</th>
                <th className="pb-2.5 font-medium">Pass Rate</th>
                <th className="pb-2.5 font-medium">Failure Rate</th>
                <th className="pb-2.5 font-medium text-right">Intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2538]/60">
              {SUBJECT_PERFORMANCE.map((s) => (
                <tr key={s.code} className="hover:bg-[#111728] transition-colors">
                  <td className="py-3 font-semibold text-white">{s.subject}</td>
                  <td className="py-3 font-mono text-[#818CF8]">{s.code}</td>
                  <td className="py-3 font-bold text-white">{s.avgMarks} / 100</td>
                  <td className="py-3 text-[#10B981] font-semibold">{s.passPct}%</td>
                  <td className={`py-3 font-bold ${s.failPct > 15 ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`}>
                    {s.failPct}%
                  </td>
                  <td className="py-3 text-right">
                    {s.failPct > 15 ? (
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#EF4444]/20 text-[#EF4444] font-medium border border-[#EF4444]/30">
                        Tutorial Required
                      </span>
                    ) : (
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] font-medium">
                        Normal
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
