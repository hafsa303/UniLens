import React, { useState } from 'react';

export const DepartmentReadinessCard: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const departments = [
    { name: 'CSE', value: 78, color: '#8B5CF6' },
    { name: 'ISE', value: 72, color: '#6366F1' },
    { name: 'ECE', value: 61, color: '#38BDF8' },
    { name: 'ME', value: 56, color: '#14B8A6' },
    { name: 'CV', value: 48, color: '#84CC16' },
    { name: 'EEE', value: 44, color: '#F59E0B' },
  ];

  return (
    <div className="card-depth p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">
          Placement Readiness by Department
        </h3>
        <button className="text-xs text-[#818CF8] hover:text-[#A5B4FC] transition-colors font-medium">
          View all
        </button>
      </div>

      {/* Chart Canvas */}
      <div className="relative pt-2 pb-1">
        <div className="flex h-44 items-end justify-between gap-3 px-1">
          {/* Y Axis Grid Lines */}
          <div className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none opacity-20 text-[10px] text-[#94A3B8]">
            <div className="border-b border-[#334155] w-full flex justify-between pr-1"><span>100%</span></div>
            <div className="border-b border-[#334155] w-full flex justify-between pr-1"><span>75%</span></div>
            <div className="border-b border-[#334155] w-full flex justify-between pr-1"><span>50%</span></div>
            <div className="border-b border-[#334155] w-full flex justify-between pr-1"><span>25%</span></div>
            <div className="border-b border-[#334155] w-full flex justify-between pr-1"><span>0%</span></div>
          </div>

          {/* Vertical Bars */}
          {departments.map((dept, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={dept.name}
                className="flex-1 flex flex-col items-center z-10 group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Bar Value Tooltip */}
                <div
                  className={`text-[11px] font-bold transition-all duration-200 mb-1 ${
                    isHovered ? 'scale-110 text-white' : 'text-[#94A3B8]'
                  }`}
                >
                  {dept.value}%
                </div>

                {/* Bar Column with subtle 3D rounded pillar */}
                <div className="w-full max-w-[34px] bg-[#111728] rounded-t-lg h-36 flex items-end overflow-hidden">
                  <div
                    className="w-full rounded-t-lg transition-all duration-300 ease-out relative group-hover:brightness-110"
                    style={{
                      height: `${dept.value}%`,
                      backgroundColor: dept.color,
                      boxShadow: isHovered ? `0 0 16px ${dept.color}60` : 'none',
                    }}
                  >
                    {/* Subtle 3D glossy highlight */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-white/30 rounded-t-lg"></div>
                  </div>
                </div>

                {/* Department Label */}
                <span className="text-[11px] font-medium text-[#94A3B8] mt-2 group-hover:text-white transition-colors">
                  {dept.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtext matching reference */}
      <p className="text-[10px] text-[#64748B] mt-3 leading-normal">
        Placement readiness is calculated based on skills, aptitude, interview performance & internship.
      </p>
    </div>
  );
};
