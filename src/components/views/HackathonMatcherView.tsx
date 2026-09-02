import React, { useState } from 'react';
import { HACKATHONS } from '../../data/hackathons';
import { HACKATHON_MATCHES } from '../../data/analytics';

export const HackathonMatcherView: React.FC = () => {
  const [selectedHackathonId, setSelectedHackathonId] = useState<string>('ALL');

  const filteredMatches = HACKATHON_MATCHES.filter((m) => {
    if (selectedHackathonId === 'ALL') return true;
    return m.hackathon_id === selectedHackathonId;
  });

  return (
    <div className="space-y-6 pb-16 max-w-[1440px] mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary text-[20px]">emoji_events</span>
          <span className="font-mono-label text-xs uppercase tracking-wider text-primary">
            Spark SQL Query D Multi-Tag Affinity Ranking Engine
          </span>
        </div>
        <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-on-surface">
          Hackathon Matcher
        </h2>
        <p className="font-body-md text-sm text-on-surface-variant max-w-2xl mt-1">
          Ranks unpatented student capstone projects by theme fit affinity against hackathons closing registration in the next 30 days.
        </p>
      </div>

      {/* Upcoming Hackathon Cards Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {HACKATHONS.slice(0, 3).map((h) => (
          <div
            key={h.hackathon_id}
            onClick={() => setSelectedHackathonId(h.hackathon_id)}
            className={`glass-panel p-4 rounded-xl border transition-all cursor-pointer ${
              selectedHackathonId === h.hackathon_id
                ? 'border-primary shadow-lg shadow-primary/10'
                : 'border-border-muted hover:border-outline-variant'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono-label text-[11px] text-secondary uppercase">
                {h.hackathon_id}
              </span>
              <span className="font-mono-label text-[11px] px-2 py-0.5 rounded bg-tertiary/15 text-tertiary">
                Deadline: {h.registration_deadline}
              </span>
            </div>
            <h4 className="font-headline-md text-sm font-bold text-on-surface line-clamp-1">
              {h.name}
            </h4>
            <p className="text-[11px] text-on-surface-variant mt-1 line-clamp-2">
              Themes: {h.theme_tags}
            </p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedHackathonId('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-label transition-all ${
              selectedHackathonId === 'ALL'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All Matched Projects ({HACKATHON_MATCHES.length})
          </button>
          {HACKATHONS.slice(0, 3).map((h) => (
            <button
              key={h.hackathon_id}
              onClick={() => setSelectedHackathonId(h.hackathon_id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-label transition-all ${
                selectedHackathonId === h.hackathon_id
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {h.hackathon_id} Sprints
            </button>
          ))}
        </div>
        <span className="font-mono-label text-xs text-on-surface-variant hidden sm:block">
          Showing {filteredMatches.length} ranked nominations
        </span>
      </div>

      {/* Ranked Project Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMatches.map((m, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-xl p-5 border border-border-muted flex flex-col justify-between glow-hover space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-container/30 border border-primary/50 text-primary font-mono-label text-xs flex items-center justify-center font-bold">
                    #{m.rank_in_hackathon}
                  </span>
                  <span className="font-mono-label text-xs text-on-surface-variant">
                    {m.project_id} • {m.dept}
                  </span>
                </div>
                <span className="font-mono-label text-xs px-2.5 py-0.5 rounded-full bg-tertiary/15 text-tertiary border border-tertiary/30">
                  Theme Fit Score: {m.theme_fit_score} / 6
                </span>
              </div>

              <h3 className="font-headline-md text-base font-bold text-on-surface mb-2">
                {m.project_title}
              </h3>

              <p className="font-mono-label text-xs text-secondary mb-1">
                Target: {m.hackathon_name}
              </p>

              <div className="p-2.5 rounded-lg bg-surface-container/60 border border-outline-variant/20 font-mono-label text-[11px] text-on-surface-variant">
                <span>Matched Tags: {m.tech_stack_tags}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between">
              <span className="font-mono-label text-xs text-tertiary flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {m.days_until_deadline} days until registration closes
              </span>
              <button
                onClick={() => alert(`Nomination submitted for ${m.project_id} to ${m.hackathon_id}`)}
                className="py-1.5 px-3 rounded-lg bg-primary-container text-on-primary-container font-semibold text-xs hover:opacity-90 transition-opacity"
              >
                Nominate Entry
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
