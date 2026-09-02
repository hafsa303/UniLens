import React from 'react';
import { CAMPUS_PULSE_INSIGHTS } from '../../data/campusData';
import { RaseedNavTab } from '../layout/RaseedSidebar';

interface CampusPulseProps {
  onNavigate: (tab: RaseedNavTab) => void;
}

export const CampusPulse: React.FC<CampusPulseProps> = ({ onNavigate }) => {
  const quickActions: { label: string; icon: string; tab: RaseedNavTab; color: string }[] = [
    { label: 'Ask UNI LENS', icon: 'chat_bubble', tab: 'ask-genie', color: '#8B5CF6' },
    { label: 'View Placement Analytics', icon: 'business_center', tab: 'placements', color: '#06B6D4' },
    { label: 'View Student Analytics', icon: 'group', tab: 'students', color: '#3B82F6' },
    { label: 'Generate Report', icon: 'description', tab: 'reports', color: '#10B981' },
    { label: 'View Alerts', icon: 'notifications', tab: 'alerts', color: '#EF4444' },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* CAMPUS PULSE */}
      <div className="card-depth p-5">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              CAMPUS PULSE
            </h3>
          </div>
          <span className="text-[11px] text-[#94A3B8]">Real-time telemetry stream</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {CAMPUS_PULSE_INSIGHTS.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-[#111728] border border-[#1E293D] flex items-start gap-3 hover:border-[#2A3752] transition-colors"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${item.color}20`, color: item.color }}
              >
                <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11.5px] text-[#E2E8F0] font-medium leading-snug">
                  {item.text}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-[#64748B]">
                  <span>{item.category}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="card-depth p-5">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">
          QUICK ACTIONS
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => onNavigate(action.tab)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111728] border border-[#1E293D] text-xs font-medium text-[#E2E8F0] hover:text-white hover:border-[#4F46E5] hover:bg-[#151C2E] transition-all shadow-sm"
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ color: action.color }}
              >
                {action.icon}
              </span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
