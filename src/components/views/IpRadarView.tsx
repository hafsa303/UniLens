import React, { useState } from 'react';
import { IP_LEAK_RISKS } from '../../data/analytics';
import { IpLeakRisk } from '../../types/unilens';
import { RiskBadge } from '../common/RiskBadge';
import { EvidenceDrawer } from '../common/EvidenceDrawer';

export const IpRadarView: React.FC = () => {
  const [selectedRisk, setSelectedRisk] = useState<IpLeakRisk | null>(null);
  const [tierFilter, setTierFilter] = useState<string>('ALL');

  const filteredRisks = IP_LEAK_RISKS.filter((r) => {
    if (tierFilter === 'ALL') return true;
    return r.ip_risk_tier === tierFilter;
  });

  return (
    <div className="space-y-6 pb-16 max-w-[1440px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-error text-[20px]">radar</span>
            <span className="font-mono-label text-xs uppercase tracking-wider text-error">
              Spark SQL Query A & A (v2) Analytical Radar
            </span>
          </div>
          <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-on-surface">
            IP Risk Radar
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant max-w-2xl mt-1">
            Unprotected student projects matched against external venture capital rounds announced 6–18 months after submission where no patent was filed.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-container rounded-xl border border-border-muted text-xs">
          {['ALL', 'CRITICAL_IP_EXPOSURE', 'HIGH_IP_EXPOSURE', 'MODERATE_IP_EXPOSURE'].map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1.5 rounded-lg font-mono-label transition-all ${
                tierFilter === tier
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tier === 'ALL' ? 'All Risks (6)' : tier.replace('_IP_EXPOSURE', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Explainer Card */}
      <div className="glass-panel p-4 rounded-xl border border-border-muted flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono-label">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl">functions</span>
          <div>
            <span className="text-on-surface font-semibold block">Composite Risk Formula (0 - 100 Scale):</span>
            <span className="text-on-surface-variant">
              Risk Score = [Capital Magnitude ($ / 6.0M * 100) * 0.60] + [Time Urgency ((18.0 - mo_lag) / 12 * 100) * 0.40]
            </span>
          </div>
        </div>
        <span className="bg-primary/10 text-primary border border-primary/30 px-2.5 py-1 rounded-md text-[11px]">
          Target: Incubation Head & Dean of R&D
        </span>
      </div>

      {/* Risk Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRisks.map((item) => (
          <div
            key={item.project_id}
            className="glass-panel rounded-xl p-5 border border-border-muted flex flex-col justify-between glow-hover relative overflow-hidden group cursor-pointer"
            onClick={() => setSelectedRisk(item)}
          >
            {/* Top row */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <RiskBadge tier={item.ip_risk_tier} score={item.risk_score} />
                <span className="font-mono-label text-xs text-on-surface-variant">
                  {item.project_id}
                </span>
              </div>

              <h3 className="font-headline-md text-base font-bold text-on-surface mb-2 line-clamp-2">
                {item.student_project_title}
              </h3>

              <div className="space-y-1.5 text-xs text-on-surface-variant mb-4 font-mono-label">
                <div className="flex justify-between">
                  <span>Sector:</span>
                  <span className="text-on-surface font-medium">{item.sector} ({item.department})</span>
                </div>
                <div className="flex justify-between">
                  <span>Funded Startup:</span>
                  <span className="text-secondary font-medium truncate max-w-[170px]">
                    {item.funded_startup_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>VC Capital:</span>
                  <span className="text-tertiary font-bold">
                    ${(item.vc_capital_raised_usd / 1000000).toFixed(1)}M USD
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Post-Submission Lag:</span>
                  <span className="text-primary font-medium">{item.months_post_submission} months</span>
                </div>
              </div>
            </div>

            {/* Bottom action */}
            <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between">
              <span className="font-label-sm text-[11px] text-error">Unprotected IP</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRisk(item);
                }}
                className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
              >
                <span>Inspect Evidence</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Evidence Drawer */}
      <EvidenceDrawer riskItem={selectedRisk} onClose={() => setSelectedRisk(null)} />
    </div>
  );
};
