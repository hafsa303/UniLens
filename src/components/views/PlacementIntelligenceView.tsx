import React from 'react';
import {
  PLACEMENT_TRENDS,
  DEPARTMENT_PLACEMENT_RATES,
  COMPANY_HIRING_RECORDS,
} from '../../data/campusData';

export const PlacementIntelligenceView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Placement Intelligence</h2>
        <p className="text-sm text-[#94A3B8] mt-0.5">
          Track placement readiness, hiring outcomes and emerging skill gaps.
        </p>
      </div>

      {/* Top 5 KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Placement Rate</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">78.4%</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#10B981] mt-3 font-medium">↑ 4.2% vs last term</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center text-[#818CF8]">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Students Placed</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">612</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#818CF8] mt-3 font-medium">Across 42 companies</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 border border-[#06B6D4]/30 flex items-center justify-center text-[#22D3EE]">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Average Package</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">8.6 LPA</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#10B981] mt-3 font-medium">↑ 0.6 LPA growth</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/30 flex items-center justify-center text-[#FBBF24]">
              <span className="material-symbols-outlined text-[20px]">military_tech</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Highest Package</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">44.0 LPA</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#FBBF24] mt-3 font-medium">Microsoft India</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/30 flex items-center justify-center text-[#60A5FA]">
              <span className="material-symbols-outlined text-[20px]">business_center</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Readiness</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">68%</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#EF4444] mt-3 font-medium">↓ 4.2% gap vs benchmark</p>
        </div>
      </div>

      {/* Compact Visually Prominent AI INSIGHT */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#151C2E] via-[#1E1B4B] to-[#151C2E] border border-[#6366F1]/50 shadow-lg shadow-[#4F46E5]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6366F1] flex items-center justify-center text-white shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[22px]">psychology</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A5B4FC]">
                UNI LENS INSIGHT
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] font-semibold">
                Actionable
              </span>
            </div>
            <p className="text-xs text-white mt-1 font-medium leading-snug">
              ECE has the largest placement skill gap. The primary deficits are Cloud Computing (48% need improvement) and Machine Learning (54%).
            </p>
            <p className="text-[11px] text-[#94A3B8] mt-0.5">
              Recommended Action: Conduct a targeted 4-week Cloud + ML training program for final year ECE students.
            </p>
          </div>
        </div>
        <button
          onClick={() => alert('Initiating targeted 4-week Cloud + ML training program for final year ECE students.')}
          className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold shrink-0 transition-colors shadow-sm"
        >
          Authorize Training Program
        </button>
      </div>

      {/* Row 2: Placement Trend + Dept-wise Placement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* PLACEMENT TREND */}
        <div className="card-depth p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Placement Trend (Semesters)</h3>
            <span className="text-xs text-[#10B981] font-semibold">64% → 78.4%</span>
          </div>
          <div className="space-y-3 pt-2">
            {PLACEMENT_TRENDS.map((t) => (
              <div key={t.term} className="flex items-center gap-3 text-xs">
                <span className="w-24 text-[11.5px] text-[#94A3B8]">{t.term}</span>
                <div className="flex-1 h-3 bg-[#111728] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6366F1] rounded-full"
                    style={{ width: `${t.rate}%` }}
                  ></div>
                </div>
                <span className="w-14 text-right text-white font-bold">{t.rate}%</span>
                <span className="w-16 text-right text-[10.5px] text-[#818CF8] font-mono">
                  {t.avgPackage} LPA
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#64748B] mt-4">
            Steady upward trajectory in both placement conversion and average CTC over 3 consecutive academic cycles.
          </p>
        </div>

        {/* DEPARTMENT-WISE PLACEMENT */}
        <div className="card-depth p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Department-Wise Placement Outcomes</h3>
            <span className="text-xs text-[#818CF8] font-medium">CSE leads at 88%</span>
          </div>
          <div className="space-y-3 pt-2">
            {DEPARTMENT_PLACEMENT_RATES.map((d) => (
              <div key={d.dept} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[11.5px] font-semibold text-white">{d.dept}</span>
                <div className="flex-1 h-3 bg-[#111728] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${d.rate}%`, backgroundColor: d.color }}
                  ></div>
                </div>
                <span className="w-14 text-right font-bold text-white">{d.rate}%</span>
                <span className="w-16 text-right text-[10.5px] text-[#94A3B8]">
                  {d.placed}/{d.total}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#64748B] mt-4">
            Mechanical (62%) and Civil (58%) require core-engineering campus hiring drives.
          </p>
        </div>
      </div>

      {/* COMPANY HIRING TABLE */}
      <div className="card-depth p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Company Hiring Pipeline</h3>
            <p className="text-xs text-[#94A3B8]">
              Top recruiting organizations, student eligibility ratios, and offer distribution.
            </p>
          </div>
          <span className="text-xs text-[#818CF8] font-medium">42 Partner Companies</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1E293B] text-[#94A3B8]">
                <th className="pb-2.5 font-medium">Recruiting Company</th>
                <th className="pb-2.5 font-medium">Target Roles</th>
                <th className="pb-2.5 font-medium">Eligible</th>
                <th className="pb-2.5 font-medium">Applied</th>
                <th className="pb-2.5 font-medium">Selected</th>
                <th className="pb-2.5 font-medium">Average CTC</th>
                <th className="pb-2.5 font-medium text-right">Drive Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2538]/60">
              {COMPANY_HIRING_RECORDS.map((c) => (
                <tr key={c.company} className="hover:bg-[#111728] transition-colors">
                  <td className="py-3 font-semibold text-white flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: c.logoColor }}
                    ></span>
                    <span>{c.company}</span>
                  </td>
                  <td className="py-3 text-[#E2E8F0]">{c.roles}</td>
                  <td className="py-3 text-[#94A3B8] font-mono">{c.eligible}</td>
                  <td className="py-3 text-[#94A3B8] font-mono">{c.applications}</td>
                  <td className="py-3 text-[#10B981] font-bold font-mono">{c.selected}</td>
                  <td className="py-3 text-white font-semibold">{c.avgCtc}</td>
                  <td className="py-3 text-right">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        c.status === 'Completed'
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                      }`}
                    >
                      {c.status}
                    </span>
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
