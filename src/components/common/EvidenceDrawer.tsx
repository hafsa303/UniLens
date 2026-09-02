import React from 'react';
import { IpLeakRisk } from '../../types/unilens';
import { RiskBadge } from './RiskBadge';

interface EvidenceDrawerProps {
  riskItem: IpLeakRisk | null;
  onClose: () => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({ riskItem, onClose }) => {
  if (!riskItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-surface-container-low border-l border-outline-variant h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-outline-variant/30">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <RiskBadge tier={riskItem.ip_risk_tier} score={riskItem.risk_score} />
                <span className="font-mono-label text-xs text-on-surface-variant uppercase">
                  {riskItem.project_id}
                </span>
              </div>
              <h2 className="font-headline-md text-xl font-bold text-on-surface">
                {riskItem.student_project_title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Relationship Connection Flow */}
          <div className="my-6 p-4 rounded-xl bg-surface-container border border-border-muted">
            <h4 className="font-label-sm text-xs uppercase tracking-wider text-primary mb-3">
              Analytical Lineage & Evidence Match
            </h4>
            <div className="flex flex-col gap-3 font-mono-label text-xs">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">school</span>
                <div>
                  <span className="text-on-surface-variant text-[11px] block">STUDENT CAPSTONE SUBMISSION</span>
                  <span className="text-on-surface font-semibold">{riskItem.student_project_title}</span>
                  <span className="text-on-surface-variant block mt-0.5">
                    Dept: {riskItem.department} • Submitted: {riskItem.project_submission_date}
                  </span>
                </div>
              </div>

              <div className="flex justify-center text-outline-variant">
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/20">
                <span className="material-symbols-outlined text-tertiary text-sm mt-0.5">memory</span>
                <div>
                  <span className="text-on-surface-variant text-[11px] block">DOMAIN & TECHNOLOGY STACK</span>
                  <span className="text-tertiary font-semibold">{riskItem.sector}</span>
                  <span className="text-on-surface-variant block mt-0.5">
                    Tags: {riskItem.tech_stack_tags}
                  </span>
                </div>
              </div>

              <div className="flex justify-center text-outline-variant">
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/20">
                <span className="material-symbols-outlined text-secondary text-sm mt-0.5">rocket_launch</span>
                <div>
                  <span className="text-on-surface-variant text-[11px] block">VENTURE-FUNDED BENGALURU STARTUP</span>
                  <span className="text-secondary font-semibold">{riskItem.funded_startup_name}</span>
                  <span className="text-on-surface-variant block mt-0.5">
                    Funding Announced: {riskItem.vc_round_date} ({riskItem.months_post_submission} months post-capstone)
                  </span>
                </div>
              </div>

              <div className="flex justify-center text-outline-variant">
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-error/10 border border-error/30 text-error">
                <span className="material-symbols-outlined text-sm mt-0.5">policy</span>
                <div>
                  <span className="text-error font-semibold block">INSTITUTIONAL IP STATUS: UNPROTECTED</span>
                  <span className="text-on-surface-variant text-[11px] block mt-0.5">
                    No patent filing found in campus registry matching project ID {riskItem.project_id}.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Scoring Breakdown */}
          <div className="p-4 rounded-xl bg-surface-container border border-border-muted space-y-3">
            <h4 className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">
              Spark SQL Risk Score Breakdown
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-surface-container-high/50 border border-border-muted/60">
                <span className="text-xs text-on-surface-variant block">VC Capital Raised</span>
                <span className="text-lg font-bold text-tertiary">
                  ${(riskItem.vc_capital_raised_usd / 1000000).toFixed(1)}M USD
                </span>
                <span className="text-[10px] text-on-surface-variant block mt-0.5">Weight: 60%</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-high/50 border border-border-muted/60">
                <span className="text-xs text-on-surface-variant block">Time Urgency</span>
                <span className="text-lg font-bold text-primary">
                  {riskItem.months_post_submission} mo lag
                </span>
                <span className="text-[10px] text-on-surface-variant block mt-0.5">Weight: 40%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-outline-variant/30 flex gap-3">
          <button
            onClick={() => alert(`Initiated expedited patent filing protocol for ${riskItem.project_id}`)}
            className="flex-1 py-2.5 px-4 rounded-lg bg-primary-container text-on-primary-container font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">verified</span>
            Initiate Expedited Patent Filing
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-lg bg-surface-container-high border border-outline-variant text-on-surface text-sm hover:bg-white/5 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
