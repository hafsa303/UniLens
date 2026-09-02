import React, { useState } from 'react';

export const CampusTrendChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<'trend' | 'graph'>('trend');
  const [timeRange, setTimeRange] = useState('This Year');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  
  // Placement readiness line values (around 60-70%)
  const placementData = [62, 65, 68, 64, 66, 73, 67, 70, 69, 74, 71, 75];
  // Avg attendance line values (around 45-50%)
  const attendanceData = [48, 49, 53, 47, 49, 52, 49, 51, 48, 50, 46, 48];

  // SVG dimensions
  const svgWidth = 720;
  const svgHeight = 140;
  const paddingX = 30;
  const paddingY = 20;

  const getPoint = (val: number, idx: number) => {
    const x = paddingX + (idx / (months.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - (val / 100) * (svgHeight - paddingY * 2);
    return { x, y };
  };

  // Build SVG path
  const placementPoints = placementData.map((v, i) => getPoint(v, i));
  const attendancePoints = attendanceData.map((v, i) => getPoint(v, i));

  const makeSmoothPath = (pts: { x: number; y: number }[]) => {
    return pts.reduce((acc, pt, i, arr) => {
      if (i === 0) return `M ${pt.x},${pt.y}`;
      const prev = arr[i - 1];
      const cp1x = prev.x + (pt.x - prev.x) / 2;
      const cp1y = prev.y;
      const cp2x = prev.x + (pt.x - prev.x) / 2;
      const cp2y = pt.y;
      return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${pt.x},${pt.y}`;
    }, '');
  };

  const placementPath = makeSmoothPath(placementPoints);
  const attendancePath = makeSmoothPath(attendancePoints);

  return (
    <div className="card-depth p-5 flex flex-col justify-between mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-white">Campus Trend Analysis</h3>
          
          {/* Subtle View Switcher Toggle: Trend vs Relationship Graph */}
          <div className="flex items-center bg-[#111728] rounded-lg p-0.5 border border-[#1E293D] text-[10.5px]">
            <button
              onClick={() => setViewMode('trend')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'trend'
                  ? 'bg-[#292652] text-[#A5B4FC] shadow-sm'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Trend Curves
            </button>
            <button
              onClick={() => setViewMode('graph')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'graph'
                  ? 'bg-[#292652] text-[#A5B4FC] shadow-sm'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Entity Graph
            </button>
          </div>
        </div>

        {/* Legend and Dropdown */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#8B5CF6]">
              <span className="w-3.5 h-0.5 bg-[#8B5CF6] rounded-full inline-block"></span>
              <span className="text-[11px] text-[#94A3B8]">Placement Readiness</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#22D3EE]">
              <span className="w-3.5 h-0.5 bg-[#22D3EE] rounded-full inline-block"></span>
              <span className="text-[11px] text-[#94A3B8]">Avg. Attendance</span>
            </span>
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-[#111728] border border-[#1E293D] text-[11px] text-[#94A3B8] flex items-center gap-1 cursor-pointer">
            <span>{timeRange}</span>
            <span className="material-symbols-outlined text-[13px]">expand_more</span>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'trend' ? (
        <div className="relative pt-2">
          {/* Y Axis Grid Lines */}
          <div className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none opacity-20 text-[10px] text-[#94A3B8]">
            <div className="border-b border-[#334155] w-full"><span>100%</span></div>
            <div className="border-b border-[#334155] w-full"><span>75%</span></div>
            <div className="border-b border-[#334155] w-full"><span>50%</span></div>
            <div className="border-b border-[#334155] w-full"><span>25%</span></div>
            <div className="border-b border-[#334155] w-full"><span>0%</span></div>
          </div>

          {/* SVG Splines */}
          <div className="overflow-x-auto">
            <svg
              className="w-full h-36 min-w-[620px]"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="none"
            >
              {/* Spline Lines */}
              <path
                d={placementPath}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d={attendancePath}
                fill="none"
                stroke="#22D3EE"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data Point Circles on Splines */}
              {placementPoints.map((pt, i) => {
                const isHovered = hoveredMonth === i;
                return (
                  <g key={`p-${i}`} className="cursor-pointer">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 6 : 3.5}
                      fill="#8B5CF6"
                      stroke="#0B0E17"
                      strokeWidth="2"
                      onMouseEnter={() => setHoveredMonth(i)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    />
                  </g>
                );
              })}

              {attendancePoints.map((pt, i) => {
                const isHovered = hoveredMonth === i;
                return (
                  <g key={`a-${i}`} className="cursor-pointer">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 6 : 3.5}
                      fill="#22D3EE"
                      stroke="#0B0E17"
                      strokeWidth="2"
                      onMouseEnter={() => setHoveredMonth(i)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Months X-Axis */}
          <div className="flex justify-between text-[10px] text-[#64748B] px-4 pt-1 font-medium">
            {months.map((m, i) => (
              <span
                key={m}
                className={`transition-colors cursor-pointer ${
                  hoveredMonth === i ? 'text-white font-bold' : ''
                }`}
                onMouseEnter={() => setHoveredMonth(i)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Campus Entity Relationship Graph matching design language */
        <div className="relative py-4">
          <div className="h-44 w-full bg-[#0E1322] rounded-xl border border-[#1E293D] flex items-center justify-center p-3 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 700 160">
              {/* Connected Lines */}
              <line x1="120" y1="80" x2="260" y2="40" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" strokeDasharray="4,4" />
              <line x1="120" y1="80" x2="260" y2="120" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" strokeDasharray="4,4" />
              <line x1="260" y1="40" x2="420" y2="40" stroke="#22D3EE" strokeWidth="1.5" opacity="0.6" />
              <line x1="260" y1="120" x2="420" y2="120" stroke="#22D3EE" strokeWidth="1.5" opacity="0.6" />
              <line x1="420" y1="40" x2="580" y2="80" stroke="#10B981" strokeWidth="1.5" opacity="0.6" />
              <line x1="420" y1="120" x2="580" y2="80" stroke="#F59E0B" strokeWidth="1.5" opacity="0.6" />

              {/* Node 1: Department */}
              <g transform="translate(120, 80)" className="cursor-pointer">
                <circle r="22" fill="#1A233A" stroke="#8B5CF6" strokeWidth="2" />
                <text textAnchor="middle" y="4" fill="#E2E8F0" fontSize="9" fontWeight="bold">CSE Dept</text>
                <text textAnchor="middle" y="32" fill="#94A3B8" fontSize="8">4,820 Students</text>
              </g>

              {/* Node 2: Skill Lab */}
              <g transform="translate(260, 40)" className="cursor-pointer">
                <circle r="18" fill="#1A233A" stroke="#22D3EE" strokeWidth="2" />
                <text textAnchor="middle" y="3" fill="#E2E8F0" fontSize="8" fontWeight="bold">Cloud Lab</text>
                <text textAnchor="middle" y="27" fill="#94A3B8" fontSize="8">74% Utilized</text>
              </g>

              {/* Node 3: AI Lab */}
              <g transform="translate(260, 120)" className="cursor-pointer">
                <circle r="18" fill="#1A233A" stroke="#22D3EE" strokeWidth="2" />
                <text textAnchor="middle" y="3" fill="#E2E8F0" fontSize="8" fontWeight="bold">AI Studio</text>
                <text textAnchor="middle" y="27" fill="#94A3B8" fontSize="8">82% Attendance</text>
              </g>

              {/* Node 4: Student Capstones */}
              <g transform="translate(420, 40)" className="cursor-pointer">
                <circle r="18" fill="#1A233A" stroke="#10B981" strokeWidth="2" />
                <text textAnchor="middle" y="3" fill="#E2E8F0" fontSize="8" fontWeight="bold">Capstones</text>
                <text textAnchor="middle" y="27" fill="#94A3B8" fontSize="8">40 Projects</text>
              </g>

              {/* Node 5: Hackathons */}
              <g transform="translate(420, 120)" className="cursor-pointer">
                <circle r="18" fill="#1A233A" stroke="#F59E0B" strokeWidth="2" />
                <text textAnchor="middle" y="3" fill="#E2E8F0" fontSize="8" fontWeight="bold">Clubs</text>
                <text textAnchor="middle" y="27" fill="#94A3B8" fontSize="8">CodeCrafters</text>
              </g>

              {/* Node 6: Placements */}
              <g transform="translate(580, 80)" className="cursor-pointer">
                <circle r="22" fill="#1A233A" stroke="#EC4899" strokeWidth="2" />
                <text textAnchor="middle" y="4" fill="#E2E8F0" fontSize="9" fontWeight="bold">Placements</text>
                <text textAnchor="middle" y="32" fill="#94A3B8" fontSize="8">68% Readiness</text>
              </g>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
