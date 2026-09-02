import React, { useState } from 'react';

export const LabUtilizationCard: React.FC = () => {
  const [month, setMonth] = useState('This Month');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="card-depth p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-white">Lab Utilization Overview</h3>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 text-[11px] text-[#94A3B8] hover:text-white bg-[#111728] px-2.5 py-1 rounded-lg border border-[#1E293D]"
          >
            <span>{month}</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-28 bg-[#141B2D] border border-[#232F46] rounded-lg shadow-lg py-1 z-20 text-[11px]">
              {['This Month', 'Last Month', 'This Term'].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMonth(m);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-white hover:bg-[#1E293B]"
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Donut and Stats */}
      <div className="flex items-center justify-between gap-4 my-2">
        {/* SVG Donut */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#111728"
              strokeWidth="12"
            />
            {/* Orange Segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#F59E0B"
              strokeWidth="12"
              strokeDasharray="238.76"
              strokeDashoffset="62"
            />
            {/* Dark Teal Segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#0D9488"
              strokeWidth="12"
              strokeDasharray="238.76"
              strokeDashoffset="140"
            />
            {/* Green Segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#22C55E"
              strokeWidth="12"
              strokeDasharray="238.76"
              strokeDashoffset="190"
            />
          </svg>

          {/* Donut Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[19px] font-bold text-white leading-none">74%</span>
            <span className="text-[9px] text-[#94A3B8] mt-0.5">Utilized</span>
          </div>
        </div>

        {/* Right Stats */}
        <div className="space-y-2 text-xs">
          <div>
            <span className="text-[10.5px] text-[#94A3B8] block">Utilized Hours</span>
            <span className="font-bold text-white text-sm">1,480</span>
          </div>
          <div>
            <span className="text-[10.5px] text-[#94A3B8] block">Available Hours</span>
            <span className="font-bold text-white text-sm">520</span>
          </div>
          <div>
            <span className="text-[10.5px] text-[#94A3B8] block">Total Hours</span>
            <span className="font-bold text-white text-sm">2,000</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-[10px] text-[#64748B] mt-1">
        Across all labs and departments
      </p>
    </div>
  );
};
