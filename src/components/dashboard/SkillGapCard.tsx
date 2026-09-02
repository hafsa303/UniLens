import React, { useState } from 'react';

export const SkillGapCard: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { name: 'Python', value: 48 },
    { name: 'SQL', value: 37 },
    { name: 'Machine Learning', value: 54 },
    { name: 'Cloud Computing', value: 62 },
    { name: 'Data Structures', value: 31 },
  ];

  return (
    <div className="card-depth p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">
          Skill Gap Analysis (All Departments)
        </h3>
        <button className="text-xs text-[#818CF8] hover:text-[#A5B4FC] transition-colors font-medium">
          View all
        </button>
      </div>

      {/* Horizontal Bars */}
      <div className="space-y-3.5 pt-1">
        {skills.map((skill) => {
          const isHovered = hoveredSkill === skill.name;
          return (
            <div
              key={skill.name}
              className="flex items-center gap-3 text-xs group cursor-pointer"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <span className="w-28 text-[11.5px] text-[#94A3B8] truncate group-hover:text-white transition-colors">
                {skill.name}
              </span>

              {/* Bar track */}
              <div className="flex-1 h-3.5 bg-[#111728] rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-[#6366F1] transition-all duration-300 relative group-hover:bg-[#818CF8]"
                  style={{
                    width: `${skill.value}%`,
                    boxShadow: isHovered ? '0 0 12px rgba(99, 102, 241, 0.6)' : 'none',
                  }}
                >
                  {/* Subtle 3D shine */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-white/30 rounded-full"></div>
                </div>
              </div>

              {/* Percentage */}
              <span className="w-8 text-right text-[11.5px] font-semibold text-[#E2E8F0] group-hover:text-white">
                {skill.value}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Axis & Subtext */}
      <div className="mt-4 pt-2 border-t border-[#1C2538]/60">
        <div className="flex justify-between text-[10px] text-[#64748B] px-31 mb-1">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
        <p className="text-center text-[10px] text-[#64748B]">
          % of students who need improvement
        </p>
      </div>
    </div>
  );
};
