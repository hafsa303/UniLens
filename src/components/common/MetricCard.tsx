import React from 'react';

interface MetricCardProps {
  label: string;
  value: number | string;
  icon: string;
  valueColor?: string;
  growth?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  valueColor = 'text-on-surface',
  growth,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="glass-panel p-4 rounded-xl flex flex-col justify-between glow-hover cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-[11px]">
          {label}
        </span>
        <span className="material-symbols-outlined text-outline-variant text-[18px]">
          {icon}
        </span>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className={`font-metric-xl text-metric-xl text-[36px] font-bold ${valueColor}`}>
          {value}
        </span>
        {growth && (
          <span className="text-xs text-primary flex items-center gap-0.5 font-label-sm">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            {growth}
          </span>
        )}
      </div>
    </div>
  );
};
