import React from 'react';
import { LAB_FACILITIES, LAB_TIME_UTILIZATION } from '../../data/campusData';

export const LabsFacilitiesView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Labs & Facilities Intelligence</h2>
        <p className="text-sm text-[#94A3B8] mt-0.5">
          Monitor campus resource utilization and facility performance.
        </p>
      </div>

      {/* Top 5 KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 border border-[#06B6D4]/30 flex items-center justify-center text-[#22D3EE]">
              <span className="material-symbols-outlined text-[20px]">science</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Total Labs</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">24</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#818CF8] mt-3 font-medium">6 Departments</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <span className="material-symbols-outlined text-[20px]">speed</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Avg. Utilization</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">74%</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#10B981] mt-3 font-medium">↑ 5.3% vs last year</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center text-[#818CF8]">
              <span className="material-symbols-outlined text-[20px]">calendar_clock</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Active Bookings</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">18</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#818CF8] mt-3 font-medium">Across research labs</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/30 flex items-center justify-center text-[#FBBF24]">
              <span className="material-symbols-outlined text-[20px]">devices</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Equipment Health</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">94%</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#10B981] mt-3 font-medium">Hardware operational</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EF4444]/20 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444]">
              <span className="material-symbols-outlined text-[20px]">build</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Maintenance Issues</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">2</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#EF4444] mt-3 font-medium">Under active repair</p>
        </div>
      </div>

      {/* RESOURCE ALERTS BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="p-3.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center gap-3">
          <span className="material-symbols-outlined text-[#EF4444] text-[22px]">warning</span>
          <div>
            <p className="text-xs font-bold text-white leading-tight">AI Lab utilization reached 94% this week.</p>
            <p className="text-[11px] text-[#94A3B8]">GPU clusters operating near thermal ceiling. Workloads distributed.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center gap-3">
          <span className="material-symbols-outlined text-[#F59E0B] text-[22px]">construction</span>
          <div>
            <p className="text-xs font-bold text-white leading-tight">Computer Lab 3 has a scheduled maintenance issue.</p>
            <p className="text-[11px] text-[#94A3B8]">Switch port replacement underway by Central IT team.</p>
          </div>
        </div>
      </div>

      {/* Row 2: Lab Utilization & Utilization by Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LAB UTILIZATION BARS */}
        <div className="card-depth p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Lab Utilization Index</h3>
            <span className="text-xs text-[#818CF8] font-medium">Real-time telemetry</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {LAB_FACILITIES.map((lab) => (
              <div key={lab.id} className="space-y-1 text-xs">
                <div className="flex justify-between text-[11.5px]">
                  <span className="font-semibold text-white">{lab.name}</span>
                  <span className="font-bold text-[#818CF8]">{lab.utilization}%</span>
                </div>
                <div className="h-2.5 bg-[#111728] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${lab.utilization}%`,
                      backgroundColor: lab.utilization > 85 ? '#EF4444' : lab.utilization > 70 ? '#6366F1' : '#10B981',
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-[#64748B]">
                  <span>{lab.dept} • {lab.leadFaculty}</span>
                  <span>{lab.activeBookings}/{lab.capacity} seats active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UTILIZATION BY TIME (PEAK PERIODS) */}
        <div className="card-depth p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Utilization by Time (Peak Hours)</h3>
            <span className="text-xs text-[#10B981] font-semibold">14:00 - 16:00 Peak (92%)</span>
          </div>

          <div className="space-y-3 pt-2">
            {LAB_TIME_UTILIZATION.map((slot) => (
              <div key={slot.slot} className="flex items-center gap-3 text-xs">
                <span className="w-28 text-[11px] text-[#94A3B8]">{slot.slot}</span>
                <div className="flex-1 h-3 bg-[#111728] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${slot.utilPct}%`,
                      backgroundColor: slot.utilPct > 85 ? '#EF4444' : slot.utilPct > 70 ? '#6366F1' : '#06B6D4',
                    }}
                  ></div>
                </div>
                <span className="w-12 text-right font-bold text-white">{slot.utilPct}%</span>
                <span className="w-32 text-right text-[10.5px] text-[#64748B] truncate">
                  {slot.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#64748B] mt-4">
            Afternoon practicals and evening hackathon build nights account for maximum campus power and server draw.
          </p>
        </div>
      </div>

      {/* FACILITY STATUS TABLE */}
      <div className="card-depth p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Facility Operational Status</h3>
            <p className="text-xs text-[#94A3B8]">Live status across key instructional and advanced research laboratories.</p>
          </div>
          <span className="text-xs text-[#10B981] font-medium">94% Hardware Health</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1E293B] text-[#94A3B8]">
                <th className="pb-2.5 font-medium">Facility Name</th>
                <th className="pb-2.5 font-medium">Department</th>
                <th className="pb-2.5 font-medium">Lead Faculty</th>
                <th className="pb-2.5 font-medium">Active Bookings</th>
                <th className="pb-2.5 font-medium">Capacity</th>
                <th className="pb-2.5 font-medium">Hardware Health</th>
                <th className="pb-2.5 font-medium text-right">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2538]/60">
              {LAB_FACILITIES.map((lab) => (
                <tr key={lab.id} className="hover:bg-[#111728] transition-colors">
                  <td className="py-3 font-semibold text-white">{lab.name}</td>
                  <td className="py-3 text-[#E2E8F0]">{lab.dept}</td>
                  <td className="py-3 text-[#94A3B8]">{lab.leadFaculty}</td>
                  <td className="py-3 font-bold text-white">{lab.activeBookings}</td>
                  <td className="py-3 text-[#94A3B8]">{lab.capacity} Workstations</td>
                  <td className="py-3 text-[#10B981] font-semibold">{lab.equipmentHealth}%</td>
                  <td className="py-3 text-right">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        lab.status === 'Available'
                          ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                          : lab.status === 'Busy'
                          ? 'bg-[#6366F1]/20 text-[#818CF8] border border-[#6366F1]/30'
                          : 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30'
                      }`}
                    >
                      {lab.status}
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
