import React from 'react';

export const KpiCardsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-5">
      {/* 1. Total Students */}
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
        <div className="mt-3 flex items-center gap-1 text-[10.5px] text-[#10B981] font-medium">
          <span className="material-symbols-outlined text-[13px]">north</span>
          <span>8.6% vs last year</span>
        </div>
      </div>

      {/* 2. Placement Readiness */}
      <div className="card-depth p-4 flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 border border-[#06B6D4]/30 flex items-center justify-center text-[#22D3EE]">
            <span className="material-symbols-outlined text-[20px]">business_center</span>
          </div>
          <div>
            <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Placement Readiness</p>
            <p className="text-[22px] font-bold text-white mt-1 leading-tight">68%</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-[10.5px] text-[#EF4444] font-medium">
          <span className="material-symbols-outlined text-[13px]">south</span>
          <span>4.2% vs last year</span>
        </div>
      </div>

      {/* 3. Avg. Attendance */}
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
        <div className="mt-3 flex items-center gap-1 text-[10.5px] text-[#10B981] font-medium">
          <span className="material-symbols-outlined text-[13px]">north</span>
          <span>6.1% vs last year</span>
        </div>
      </div>

      {/* 4. Labs Utilization */}
      <div className="card-depth p-4 flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/30 flex items-center justify-center text-[#FBBF24]">
            <span className="material-symbols-outlined text-[20px]">science</span>
          </div>
          <div>
            <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Labs Utilization</p>
            <p className="text-[22px] font-bold text-white mt-1 leading-tight">74%</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-[10.5px] text-[#10B981] font-medium">
          <span className="material-symbols-outlined text-[13px]">north</span>
          <span>5.3% vs last year</span>
        </div>
      </div>

      {/* 5. Upcoming Events */}
      <div className="card-depth p-4 flex flex-col justify-between col-span-2 sm:col-span-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EC4899]/20 border border-[#EC4899]/30 flex items-center justify-center text-[#F472B6]">
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
          </div>
          <div>
            <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Upcoming Events</p>
            <p className="text-[22px] font-bold text-white mt-1 leading-tight">23</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-[10.5px] text-[#818CF8] font-medium cursor-pointer hover:underline">
          <span>View calendar</span>
          <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
        </div>
      </div>
    </div>
  );
};
