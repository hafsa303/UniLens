import React from 'react';
import { FACULTY_COMMERCIALIZATION_GAPS } from '../../data/analytics';

export const ResearchStartupView: React.FC = () => {
  return (
    <div className="space-y-6 pb-16 max-w-[1440px] mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-tertiary text-[20px]">rocket_launch</span>
          <span className="font-mono-label text-xs uppercase tracking-wider text-tertiary">
            Spark SQL Query C Commercialization Gap Engine
          </span>
        </div>
        <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-on-surface">
          Research → Startup Opportunities
        </h2>
        <p className="font-body-md text-sm text-on-surface-variant max-w-2xl mt-1">
          Identifies high-impact faculty publications overlapping 2+ funded Bengaluru startups where zero institutional patents have been filed.
        </p>
      </div>

      {/* Faculty Commercialization Gap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FACULTY_COMMERCIALIZATION_GAPS.map((fac) => (
          <div
            key={fac.faculty_id}
            className="glass-panel rounded-2xl p-6 border border-border-muted flex flex-col justify-between glow-hover space-y-6"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="font-mono-label text-xs text-primary font-semibold">
                    {fac.faculty_id} • {fac.department}
                  </span>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface mt-0.5">
                    {fac.faculty_name}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Domain: {fac.domain}
                  </p>
                </div>
                <span className="bg-error-container/20 text-error border border-error/30 text-[11px] font-mono-label px-2.5 py-1 rounded-full whitespace-nowrap">
                  0 Patents
                </span>
              </div>

              {/* Publication Stats */}
              <div className="grid grid-cols-2 gap-3 my-4 font-mono-label text-xs">
                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/30">
                  <span className="text-on-surface-variant block text-[11px]">Academic Citations</span>
                  <span className="text-lg font-bold text-tertiary">{fac.total_citations}</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/30">
                  <span className="text-on-surface-variant block text-[11px]">Funded Startups Overlap</span>
                  <span className="text-lg font-bold text-secondary">{fac.overlapping_funded_startups_count} Companies</span>
                </div>
              </div>

              {/* Overlapping Startups */}
              <div className="p-3.5 rounded-xl bg-surface-container/60 border border-outline-variant/30 space-y-1.5 font-mono-label text-xs">
                <span className="text-on-surface-variant text-[11px] block uppercase">
                  Overlapping Funded Startups in Bengaluru:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {fac.overlapping_startups_list.split('; ').map((startup: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-secondary-container/20 border border-secondary/30 text-secondary text-[11px]"
                    >
                      {startup}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-outline-variant/30 flex gap-3">
              <button
                onClick={() => alert(`Initiated commercial patent consultation for ${fac.faculty_name}`)}
                className="flex-1 py-2.5 px-3 rounded-lg bg-primary text-on-primary font-semibold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
                Initiate Commercial Patent Disclosure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
