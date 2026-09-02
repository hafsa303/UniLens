import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const RaseedTopHeader: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedRange, setSelectedRange] = useState('1 Sep 2026 - 31 Aug 2026');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Extract first name dynamically from authenticated user
  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Admin';

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* Personalized Welcome Headline */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <span>Welcome back, {firstName}</span>
          <span>👋</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
          {currentUser?.role === 'Student'
            ? `Here's what's happening across ${currentUser.department || 'campus'} today.`
            : "Here's what's happening on campus today."}
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Date Range Dropdown Pill */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141B2D] border border-[#232F46] text-xs text-[#E2E8F0] hover:border-[#384869] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[15px] text-[#818CF8]">
              calendar_today
            </span>
            <span className="font-medium text-[11.5px]">{selectedRange}</span>
            <span className="material-symbols-outlined text-[16px] text-[#94A3B8]">
              expand_more
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#141B2D] border border-[#232F46] shadow-xl py-1 z-30 text-xs">
              {['1 Sep 2026 - 31 Aug 2026', 'Last 30 Days', 'Current Semester', 'Academic Year 2025-26'].map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-[#E2E8F0] hover:bg-[#1E293B] transition-colors"
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <button className="relative w-9 h-9 rounded-xl bg-[#141B2D] border border-[#232F46] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[18px]">
            notifications
          </span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444] border-2 border-[#141B2D]"></span>
        </button>
      </div>
    </header>
  );
};
