import React, { useState } from 'react';
import { IP_LEAK_RISKS } from '../../data/analytics';
import { MetricCard } from '../common/MetricCard';
import { EvidenceDrawer } from '../common/EvidenceDrawer';
import { IpLeakRisk } from '../../types/unilens';

interface OverviewViewProps {
  onNavigateTab: (tab: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigateTab }) => {
  const [selectedRiskIndex, setSelectedRiskIndex] = useState(2); // Default to PRJ_101 (Edge AI) matching Stitch
  const [inspectItem, setInspectItem] = useState<IpLeakRisk | null>(null);

  const activeRisk = IP_LEAK_RISKS[selectedRiskIndex] || IP_LEAK_RISKS[0];

  return (
    <div className="space-y-8 pb-16 max-w-[1440px] mx-auto animate-fade-in">
      {/* Header Section matching Stitch */}
      <header className="mb-2">
        <h2 className="font-display-lg text-[44px] md:text-[52px] font-bold text-on-surface tracking-tight leading-tight">
          UNI-LENS
        </h2>
        <h3 className="font-headline-md text-xl md:text-2xl text-primary font-medium mt-1 mb-2">
          University intelligence, connected.
        </h3>
        <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
          Discover relationships, risks, and opportunities hidden across your campus data.
        </p>
      </header>

      {/* Hero Intelligence Panel (Exact Stitch Relationship Flow) */}
      <section className="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden glow-hover">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 via-transparent to-transparent pointer-events-none"></div>

        {/* Card Top Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">hub</span>
            </div>
            <div>
              <h3 className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-2">
                Campus Intelligence
              </h3>
              <p className="text-xs text-on-surface-variant">
                Your university data reveals more when you connect it.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-error-container/20 text-error px-3.5 py-1.5 rounded-full font-label-sm text-xs border border-error/30 flex items-center gap-1.5 badge-pulse">
              <span className="material-symbols-outlined text-[15px]">warning</span>
              <span>Potential IP Risk Detected</span>
            </span>
          </div>
        </div>

        {/* Relationship Pipeline (Nodes and Glowing Connectors matching Stitch 1-to-1) */}
        <div className="relative z-10 py-6 px-2">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-2">
            
            {/* Node 1: Student Project */}
            <div
              onClick={() => setInspectItem(activeRisk)}
              className="flex flex-col items-center gap-2.5 text-center group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center border-primary/50 text-primary group-hover:border-primary group-hover:scale-105 transition-all shadow-lg shadow-primary/5">
                <span className="material-symbols-outlined text-[26px]">school</span>
              </div>
              <div>
                <p className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">
                  STUDENT PROJECT
                </p>
                <p className="font-body-md text-sm text-on-surface font-semibold max-w-[150px] truncate">
                  {activeRisk.project_id === 'PRJ_101' ? 'Edge AI' : activeRisk.student_project_title.split(' ')[0]} ({activeRisk.project_id})
                </p>
              </div>
            </div>

            {/* Connector 1 */}
            <div className="hidden lg:block flex-1 h-[2px] bg-outline-variant/40 relative mx-2">
              <div className="absolute top-0 left-0 h-full bg-primary w-2/3 glow-line"></div>
            </div>

            {/* Node 2: Technology / Sector */}
            <div className="flex flex-col items-center gap-2.5 text-center">
              <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center border-tertiary/50 text-tertiary shadow-lg shadow-tertiary/5">
                <span className="material-symbols-outlined text-[26px]">memory</span>
              </div>
              <div>
                <p className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">
                  TECHNOLOGY
                </p>
                <p className="font-body-md text-sm text-on-surface font-semibold">
                  {activeRisk.sector}
                </p>
              </div>
            </div>

            {/* Connector 2 */}
            <div className="hidden lg:block flex-1 h-[2px] bg-outline-variant/40 relative mx-2">
              <div className="absolute top-0 left-0 h-full bg-tertiary w-1/2 glow-line"></div>
            </div>

            {/* Node 3: Funded Startup */}
            <div className="flex flex-col items-center gap-2.5 text-center">
              <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center border-secondary/50 text-secondary shadow-lg shadow-secondary/5">
                <span className="material-symbols-outlined text-[26px]">domain</span>
              </div>
              <div>
                <p className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">
                  STARTUP
                </p>
                <p className="font-body-md text-sm text-on-surface font-semibold max-w-[160px] truncate">
                  {activeRisk.funded_startup_name.replace(' Pvt Ltd', '').replace(' Systems', '')}
                </p>
              </div>
            </div>

            {/* Connector 3 */}
            <div className="hidden lg:block flex-1 h-[2px] bg-outline-variant/40 relative mx-2">
              <div className="absolute top-0 left-0 h-full bg-secondary w-2/3 glow-line"></div>
            </div>

            {/* Node 4: Funding */}
            <div className="flex flex-col items-center gap-2.5 text-center">
              <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center border-[#4edea3]/50 text-[#4edea3] shadow-lg shadow-emerald-500/5">
                <span className="material-symbols-outlined text-[26px]">attach_money</span>
              </div>
              <div>
                <p className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">
                  FUNDING
                </p>
                <p className="font-body-md text-sm text-on-surface font-semibold">
                  ${(activeRisk.vc_capital_raised_usd / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>

            {/* Connector 4 */}
            <div className="hidden lg:block flex-1 h-[2px] bg-outline-variant/40 relative mx-2">
              <div className="absolute top-0 right-0 h-full bg-error w-full glow-line-error"></div>
            </div>

            {/* Node 5: Alert / No Patent */}
            <div
              onClick={() => setInspectItem(activeRisk)}
              className="flex flex-col items-center gap-2.5 text-center group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-error-container/20 border-2 border-error flex items-center justify-center text-error active-node shadow-lg shadow-error/20 group-hover:scale-105 transition-all">
                <span className="material-symbols-outlined text-[26px]">policy</span>
              </div>
              <div>
                <p className="font-label-sm text-[11px] text-error font-bold uppercase tracking-wider">
                  ALERT
                </p>
                <p className="font-body-md text-sm text-error font-bold">
                  No Patent
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Quick-Switch Selector for all 6 detected IP risks */}
        <div className="mt-8 pt-5 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono-label text-on-surface-variant">Switch Signal:</span>
            <div className="flex flex-wrap gap-1.5">
              {IP_LEAK_RISKS.map((r, i) => (
                <button
                  key={r.project_id}
                  onClick={() => setSelectedRiskIndex(i)}
                  className={`px-2.5 py-1 rounded-md font-mono-label transition-all ${
                    selectedRiskIndex === i
                      ? 'bg-primary-container text-on-primary-container font-semibold'
                      : 'bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  {r.project_id} ({r.sector})
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setInspectItem(activeRisk)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant/50 hover:border-primary/50 text-on-surface text-xs font-medium transition-colors"
          >
            <span>Inspect Evidence & Timeline</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Key Metrics Bento Grid (Matching Stitch 1-to-1) */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <MetricCard
            label="Student Projects"
            value={40}
            icon="folder_open"
            valueColor="text-primary"
            growth="12%"
            onClick={() => onNavigateTab('data-explorer')}
          />
          <MetricCard
            label="Skill Profiles"
            value={40}
            icon="badge"
            valueColor="text-secondary"
            growth="8%"
            onClick={() => onNavigateTab('team-builder')}
          />
          <MetricCard
            label="Faculty Pubs"
            value={25}
            icon="menu_book"
            valueColor="text-tertiary"
            growth="170 cit"
            onClick={() => onNavigateTab('research-startup')}
          />
          <MetricCard
            label="Hackathons"
            value={6}
            icon="event"
            valueColor="text-[#c0c1ff]"
            growth="3 active"
            onClick={() => onNavigateTab('hackathon-matcher')}
          />
          <MetricCard
            label="VC & Patents"
            value={20}
            icon="assured_workload"
            valueColor="text-on-surface"
            growth="$48.4M"
            onClick={() => onNavigateTab('ip-radar')}
          />
        </div>
      </section>

      {/* Institutional Intelligence Highlights Feed */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Highlight 1: Critical IP Risk */}
        <div className="glass-panel p-5 rounded-xl flex flex-col justify-between glow-hover">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-label text-xs text-error uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">crisis_alert</span>
                Urgent IP Audit
              </span>
              <span className="font-mono-label text-xs text-on-surface-variant">Score: 75.7</span>
            </div>
            <h4 className="font-headline-md text-base font-bold text-on-surface mb-1">
              Bengaluru PayShield vs PRJ_105
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Real-time UPI fraud scoring engine was submitted 11.8 months before startup raised $5.5M in FinTech with zero campus patent protection.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('ip-radar')}
            className="w-full py-2 px-3 rounded-lg bg-surface-container-high border border-outline-variant text-xs text-primary font-medium hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Review IP Radar</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Highlight 2: Faculty Commercialization Gap */}
        <div className="glass-panel p-5 rounded-xl flex flex-col justify-between glow-hover">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-label text-xs text-tertiary uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">psychology</span>
                Commercialization Gap
              </span>
              <span className="font-mono-label text-xs text-on-surface-variant">4 Faculty Found</span>
            </div>
            <h4 className="font-headline-md text-base font-bold text-on-surface mb-1">
              Dr. Meera Nambiar (170 Citations)
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Solid-state battery research overlaps 2 VC-funded startups ($10.2M capital). Zero institutional patent co-filings on record.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('research-startup')}
            className="w-full py-2 px-3 rounded-lg bg-surface-container-high border border-outline-variant text-xs text-tertiary font-medium hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Faculty Gap Analysis</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Highlight 3: Upcoming Hackathon Sprints */}
        <div className="glass-panel p-5 rounded-xl flex flex-col justify-between glow-hover">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-label text-xs text-secondary uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">timer</span>
                30-Day Opportunity
              </span>
              <span className="font-mono-label text-xs text-on-surface-variant">17 Days Left</span>
            </div>
            <h4 className="font-headline-md text-base font-bold text-on-surface mb-1">
              Smart Mobility Sprint (HCK_501)
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              22 unpatented campus capstones have high multi-tag theme fit scores (≥4). Recommend nominating Squad 1 & 2 for entry.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('hackathon-matcher')}
            className="w-full py-2 px-3 rounded-lg bg-surface-container-high border border-outline-variant text-xs text-secondary font-medium hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Match Hackathons</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Detail Drawer */}
      <EvidenceDrawer riskItem={inspectItem} onClose={() => setInspectItem(null)} />
    </div>
  );
};
