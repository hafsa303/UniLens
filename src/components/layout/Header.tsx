import React from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenGenie: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenGenie,
  unreadCount = 6,
}) => {
  return (
    <header className="fixed top-0 right-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 flex items-center justify-between w-[calc(100%-240px)] h-16 px-gutter">
      {/* Search Input */}
      <div className="flex items-center flex-1 max-w-lg">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects, faculty, startups, tech tags..."
            className="w-full bg-surface-container-high/60 border border-border-muted rounded-lg pl-10 pr-4 py-1.5 text-body-md text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-primary/60 transition-colors text-sm"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Databricks Genie Status */}
        <button
          onClick={onOpenGenie}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant/40 hover:border-primary/50 text-xs text-on-surface transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-tertiary ai-pulse"></span>
          <span className="font-mono-label text-primary">Genie Space</span>
          <span className="text-on-surface-variant text-[11px] font-normal">Connected</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 rounded-full p-2 transition-all">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error rounded-full text-[9px] font-bold flex items-center justify-center font-mono-label">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Apps Grid */}
        <button className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 rounded-full p-2 transition-all hidden sm:block">
          <span className="material-symbols-outlined text-[20px]">apps</span>
        </button>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full border border-border-muted bg-surface-container-high flex items-center justify-center text-primary font-semibold text-xs cursor-pointer hover:border-primary transition-colors">
          <span className="material-symbols-outlined text-[18px]">account_circle</span>
        </div>
      </div>
    </header>
  );
};
