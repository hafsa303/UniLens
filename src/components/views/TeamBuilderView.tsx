import React from 'react';
import { HACKATHON_SQUADS } from '../../data/analytics';

export const TeamBuilderView: React.FC = () => {
  return (
    <div className="space-y-6 pb-16 max-w-[1440px] mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-secondary text-[20px]">groups</span>
          <span className="font-mono-label text-xs uppercase tracking-wider text-secondary">
            Spark SQL Query B & B (v2) Synergistic Matching Engine
          </span>
        </div>
        <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-on-surface">
          Synergistic Team Builder
        </h2>
        <p className="font-body-md text-sm text-on-surface-variant max-w-2xl mt-1">
          Constructs balanced hackathon triads pairing elite Backend Coders with Rapid Prototypers who have zero prior collaboration history, mapped with domain faculty research mentors.
        </p>
      </div>

      {/* Squad Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {HACKATHON_SQUADS.map((squad: any) => (
          <div
            key={squad.team_slot}
            className="glass-panel rounded-2xl p-6 border border-border-muted flex flex-col justify-between glow-hover space-y-6"
          >
            {/* Squad Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-label text-xs font-bold text-primary uppercase">
                  Slot #{squad.team_slot}
                </span>
                <span className="font-mono-label text-xs px-2.5 py-1 rounded-full bg-tertiary/15 text-tertiary border border-tertiary/30">
                  Synergy Score: {squad.squad_synergy_score}
                </span>
              </div>
              <h3 className="font-headline-md text-xl font-bold text-on-surface">
                {squad.assigned_squad_name}
              </h3>
              <p className="font-mono-label text-[11px] text-tertiary mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span>
                {squad.pairing_validation_status}
              </p>
            </div>

            {/* Squad Members */}
            <div className="space-y-4 font-mono-label text-xs">
              {/* Member 1: Backend Lead */}
              <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">{squad.backend_lead_id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    Backend Architect
                  </span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-relaxed pt-1">
                  {squad.backend_skills}
                </p>
              </div>

              {/* Member 2: Rapid Prototyper */}
              <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-bold">{squad.prototyper_id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20">
                    Rapid Prototyper
                  </span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-relaxed pt-1">
                  {squad.prototyper_skills}
                </p>
              </div>

              {/* Faculty Mentor */}
              <div className="p-3.5 rounded-xl bg-surface-container border border-tertiary/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-tertiary font-bold">{squad.mentor_faculty_name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-tertiary/10 text-tertiary border border-tertiary/20">
                    Faculty Research Mentor
                  </span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-relaxed pt-1">
                  {squad.mentor_domain}
                </p>
              </div>
            </div>

            {/* Target Recommendation Action */}
            <div className="pt-4 border-t border-outline-variant/30">
              <button
                onClick={() => alert(`Squad ${squad.team_slot} registration packet exported for upcoming hackathon entry.`)}
                className="w-full py-2.5 px-4 rounded-lg bg-surface-container-high border border-outline-variant text-primary font-semibold text-xs hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                Register for Upcoming Hackathon
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
