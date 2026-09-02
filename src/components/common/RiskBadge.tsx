import React from 'react';

interface RiskBadgeProps {
  tier: 'CRITICAL_IP_EXPOSURE' | 'HIGH_IP_EXPOSURE' | 'MODERATE_IP_EXPOSURE';
  score?: number;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ tier, score }) => {
  if (tier === 'CRITICAL_IP_EXPOSURE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono-label bg-error/20 text-error border border-error/40 badge-pulse">
        <span className="material-symbols-outlined text-[14px]">crisis_alert</span>
        <span>Critical Risk {score ? `(${score})` : ''}</span>
      </span>
    );
  }

  if (tier === 'HIGH_IP_EXPOSURE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono-label bg-error-container/20 text-error border border-error/30">
        <span className="material-symbols-outlined text-[14px]">warning</span>
        <span>High Risk {score ? `(${score})` : ''}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono-label bg-data-warning/15 text-data-warning border border-data-warning/30">
      <span className="material-symbols-outlined text-[14px]">info</span>
      <span>Moderate Risk {score ? `(${score})` : ''}</span>
    </span>
  );
};
