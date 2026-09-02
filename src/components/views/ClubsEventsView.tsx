import React from 'react';
import { CLUB_EVENTS, TOP_CAMPUS_CLUBS } from '../../data/campusData';

export const ClubsEventsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Clubs & Events</h2>
        <p className="text-sm text-[#94A3B8] mt-0.5">
          Understand student engagement and campus activities.
        </p>
      </div>

      {/* Top 5 KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EC4899]/20 border border-[#EC4899]/30 flex items-center justify-center text-[#F472B6]">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Upcoming Events</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">23</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#818CF8] mt-3 font-medium">Across September</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center text-[#818CF8]">
              <span className="material-symbols-outlined text-[20px]">diversity_3</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Active Clubs</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">16</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#10B981] mt-3 font-medium">Tech, Culture, Sports</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 border border-[#06B6D4]/30 flex items-center justify-center text-[#22D3EE]">
              <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Registrations</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">3,420</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#10B981] mt-3 font-medium">↑ 18% vs last term</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <span className="material-symbols-outlined text-[20px]">celebration</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Participation</p>
              <p className="text-[22px] font-bold text-white mt-1 leading-tight">78%</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#10B981] mt-3 font-medium">High turnout index</p>
        </div>

        <div className="card-depth p-4 flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/30 flex items-center justify-center text-[#FBBF24]">
              <span className="material-symbols-outlined text-[20px]">emoji_events</span>
            </div>
            <div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Most Active Club</p>
              <p className="text-[16px] font-bold text-white mt-1 leading-tight truncate">CodeCrafters</p>
            </div>
          </div>
          <p className="text-[10.5px] text-[#818CF8] mt-3 font-medium">86% engagement rate</p>
        </div>
      </div>

      {/* Row 2: UPCOMING EVENTS & TOP CLUBS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* UPCOMING EVENTS */}
        <div className="card-depth p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Upcoming Campus Events & Sprints</h3>
            <span className="text-xs text-[#818CF8] font-medium">Calendar</span>
          </div>

          <div className="space-y-3 pt-1">
            {CLUB_EVENTS.map((event) => (
              <div
                key={event.id}
                className="p-3 rounded-xl bg-[#111728] border border-[#1E293D] flex items-center justify-between gap-3 hover:border-[#2A3752] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${event.color}20`, color: event.color }}
                  >
                    <span className="material-symbols-outlined text-[20px]">{event.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{event.title}</h4>
                    <p className="text-[10px] text-[#94A3B8]">
                      {event.club} • {event.category} • {event.time}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-white block">{event.date}</span>
                  <span className="text-[10px] text-[#10B981]">
                    {event.registrations}/{event.capacity} registered
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOP CLUBS RANKED */}
        <div className="card-depth p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Top Clubs Ranked by Participation</h3>
            <span className="text-xs text-[#818CF8] font-medium">16 Registered Clubs</span>
          </div>

          <div className="space-y-3 pt-1">
            {TOP_CAMPUS_CLUBS.map((club, idx) => (
              <div key={club.name} className="p-3 rounded-xl bg-[#111728] border border-[#1E293D] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#6366F1]/20 text-[#818CF8] font-bold flex items-center justify-center text-[10px]">
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-white">{club.name}</span>
                    <span className="text-[10px] text-[#64748B]">Lead: {club.lead}</span>
                  </div>
                  <span className="font-bold text-[#818CF8]">{club.engagementRate}% active</span>
                </div>

                <div className="h-2 bg-[#0B0E17] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4] rounded-full"
                    style={{ width: `${club.engagementRate}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[10px] text-[#94A3B8]">
                  <span>{club.members} Verified Members</span>
                  <span>{club.eventsOrganized} Events Hosted</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
