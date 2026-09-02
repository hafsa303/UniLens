import React from 'react';

export const TopClubsCard: React.FC = () => {
  const clubs = [
    { rank: 1, name: 'CodeCrafters', value: 86 },
    { rank: 2, name: 'Dance Club', value: 78 },
    { rank: 3, name: 'Robotics Club', value: 74 },
    { rank: 4, name: 'SAE Club', value: 69 },
    { rank: 5, name: 'Photography Club', value: 65 },
  ];

  return (
    <div className="card-depth p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white">Top Engaged Clubs</h3>
        <button className="text-xs text-[#818CF8] hover:text-[#A5B4FC] transition-colors font-medium">
          View all
        </button>
      </div>

      {/* List */}
      <div className="space-y-2.5">
        {clubs.map((c) => (
          <div key={c.name} className="flex items-center gap-2.5 text-xs group cursor-pointer">
            <span className="w-3 text-[11px] text-[#64748B] font-semibold">{c.rank}</span>
            <span className="w-28 text-[11.5px] text-[#E2E8F0] group-hover:text-white truncate">
              {c.name}
            </span>

            {/* Progress bar */}
            <div className="flex-1 h-2 bg-[#111728] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6366F1] rounded-full transition-all duration-300 group-hover:bg-[#818CF8]"
                style={{ width: `${c.value}%` }}
              ></div>
            </div>

            <span className="w-7 text-right text-[11px] font-semibold text-[#94A3B8] group-hover:text-white">
              {c.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
