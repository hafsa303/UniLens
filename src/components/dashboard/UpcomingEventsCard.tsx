import React from 'react';

export const UpcomingEventsCard: React.FC = () => {
  const events = [
    {
      name: 'HackOverflow 3.0',
      category: 'Coding Competition',
      date: '05',
      month: 'SEP',
      icon: 'terminal',
      color: '#8B5CF6',
    },
    {
      name: 'Tech Talk: AI in Real World',
      category: 'Guest Lecture',
      date: '07',
      month: 'SEP',
      icon: 'psychology',
      color: '#EC4899',
    },
    {
      name: 'Cultural Fest - Udaan',
      category: 'Campus Festival',
      date: '12',
      month: 'SEP',
      icon: 'celebration',
      color: '#F43F5E',
    },
  ];

  return (
    <div className="card-depth p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white">Upcoming Events</h3>
        <button className="text-xs text-[#818CF8] hover:text-[#A5B4FC] transition-colors font-medium">
          View calendar
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.map((e) => (
          <div key={e.name} className="flex items-center justify-between gap-3 group cursor-pointer">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${e.color}20`, color: e.color }}
              >
                <span className="material-symbols-outlined text-[17px]">{e.icon}</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-[12px] font-semibold text-white truncate group-hover:text-[#A5B4FC] transition-colors">
                  {e.name}
                </h4>
                <p className="text-[10px] text-[#64748B] truncate">{e.category}</p>
              </div>
            </div>

            {/* Date badge */}
            <div className="text-right shrink-0">
              <span className="text-[12px] font-bold text-white block leading-none">{e.date}</span>
              <span className="text-[9px] text-[#94A3B8] font-medium">{e.month}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Link */}
      <div className="mt-3 pt-2 border-t border-[#1C2538]/60">
        <button className="text-xs text-[#818CF8] hover:underline flex items-center gap-1 font-medium">
          <span>See all events</span>
          <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
