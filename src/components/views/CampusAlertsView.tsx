import React, { useState } from 'react';
import { CAMPUS_ALERTS, CampusAlertRecord } from '../../data/campusData';

export const CampusAlertsView: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [activeAlert, setActiveAlert] = useState<CampusAlertRecord | null>(null);

  const filteredAlerts = CAMPUS_ALERTS.filter((a) => {
    if (selectedSeverity !== 'ALL' && a.severity !== selectedSeverity) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Campus Alerts</h2>
        <p className="text-sm text-[#94A3B8] mt-0.5">
          Important changes and issues that may require attention.
        </p>
      </div>

      {/* Severity Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-[#1E293B]">
        {['ALL', 'Critical', 'Needs Attention', 'Monitor', 'Resolved'].map((sev) => (
          <button
            key={sev}
            onClick={() => setSelectedSeverity(sev)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedSeverity === sev
                ? 'bg-[#4F46E5] text-white shadow-sm'
                : 'bg-[#111728] border border-[#1E293D] text-[#94A3B8] hover:text-white'
            }`}
          >
            {sev === 'ALL' ? 'All Alerts (5)' : sev}
          </button>
        ))}
      </div>

      {/* Alerts Stream */}
      <div className="space-y-3">
        {filteredAlerts.map((item) => (
          <div
            key={item.id}
            className={`card-depth p-4 border-l-4 transition-all ${
              item.severity === 'Critical'
                ? 'border-l-[#EF4444]'
                : item.severity === 'Needs Attention'
                ? 'border-l-[#F59E0B]'
                : item.severity === 'Monitor'
                ? 'border-l-[#06B6D4]'
                : 'border-l-[#10B981]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      item.severity === 'Critical'
                        ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40'
                        : item.severity === 'Needs Attention'
                        ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40'
                        : item.severity === 'Monitor'
                        ? 'bg-[#06B6D4]/20 text-[#22D3EE] border border-[#06B6D4]/40'
                        : 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                    }`}
                  >
                    {item.severity}
                  </span>
                  <span className="text-[11px] text-[#64748B] font-mono">{item.category}</span>
                  <span className="text-[11px] text-[#64748B]">•</span>
                  <span className="text-[11px] text-[#64748B]">{item.timestamp}</span>
                </div>

                <h4 className="text-sm font-bold text-white pt-1">{item.title}</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{item.description}</p>
                
                <div className="pt-2 flex items-center gap-2 text-[11.5px] text-[#A5B4FC]">
                  <span className="material-symbols-outlined text-[15px]">task_alt</span>
                  <span>Action: {item.actionRequired}</span>
                </div>
              </div>

              <div className="shrink-0 flex sm:flex-col items-end gap-2">
                <button
                  onClick={() => alert(`Opening alert resolution ticket: ${item.id}`)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#111728] border border-[#232F46] text-white text-xs font-medium hover:border-[#4F46E5] transition-colors"
                >
                  Resolve Alert
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
