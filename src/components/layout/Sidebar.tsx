import React from 'react';

export type NavTab = 
  | 'overview' 
  | 'ai-intelligence' 
  | 'ip-radar' 
  | 'team-builder' 
  | 'research-startup' 
  | 'hackathon-matcher' 
  | 'campus-graph' 
  | 'data-explorer';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  ipRiskCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, ipRiskCount }) => {
  const navItems: { id: NavTab; label: string; icon: string; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'ai-intelligence', label: 'AI Intelligence', icon: 'psychology' },
    { id: 'ip-radar', label: 'IP Radar', icon: 'radar', badge: `${ipRiskCount} Leaks` },
    { id: 'team-builder', label: 'Team Builder', icon: 'groups' },
    { id: 'research-startup', label: 'Research -> Startup', icon: 'rocket_launch' },
    { id: 'hackathon-matcher', label: 'Hackathon Matcher', icon: 'emoji_events' },
    { id: 'campus-graph', label: 'Campus Graph', icon: 'hub' },
    { id: 'data-explorer', label: 'Data Explorer', icon: 'explore' },
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-sidebar-width bg-surface border-r border-outline-variant/30 flex flex-col justify-between p-4 z-50 select-none overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="mb-8 px-2 pt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-container/20 border border-primary/40 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-lg">search_insights</span>
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight leading-none">
                UNI-LENS
              </h1>
              <p className="text-on-surface-variant font-label-sm text-[10px] mt-1 uppercase tracking-widest leading-none">
                University Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-secondary-container/20 text-primary font-semibold border-r-2 border-primary scale-[0.98]'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-error/15 text-error border border-error/30 font-label-sm text-[10px] px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Nav */}
      <div className="mt-auto pt-4 border-t border-outline-variant/30 space-y-1">
        <button
          onClick={() => onSelectTab('data-explorer')}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span>Settings</span>
        </button>

        <div className="pt-2 px-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-label-sm text-xs">
            RD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-on-surface truncate">Dean of R&D</p>
            <p className="text-[10px] text-on-surface-variant truncate">Bengaluru Campus</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-tertiary ai-pulse" title="System Online"></div>
        </div>
      </div>
    </nav>
  );
};
