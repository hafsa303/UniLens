import React, { useState } from 'react';
import { STUDENT_PROJECTS } from '../../data/projects';
import { STUDENT_SKILLS } from '../../data/skills';
import { FACULTY_PUBLICATIONS } from '../../data/publications';
import { HACKATHONS } from '../../data/hackathons';
import { VC_PATENTS } from '../../data/vcPatents';
import { DataTable } from '../common/DataTable';

type DatasetKey = 'projects' | 'skills' | 'publications' | 'hackathons' | 'vcPatents';

export const DataExplorerView: React.FC = () => {
  const [activeDataset, setActiveDataset] = useState<DatasetKey>('projects');

  const datasets: { key: DatasetKey; name: string; count: number; icon: string }[] = [
    { key: 'projects', name: 'Student Projects', count: STUDENT_PROJECTS.length, icon: 'folder_open' },
    { key: 'skills', name: 'Student Skill Profiles', count: STUDENT_SKILLS.length, icon: 'badge' },
    { key: 'publications', name: 'Faculty Publications', count: FACULTY_PUBLICATIONS.length, icon: 'menu_book' },
    { key: 'hackathons', name: 'Hackathon Events', count: HACKATHONS.length, icon: 'event' },
    { key: 'vcPatents', name: 'VC & Patent Records', count: VC_PATENTS.length, icon: 'assured_workload' },
  ];

  return (
    <div className="space-y-6 pb-16 max-w-[1440px] mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary text-[20px]">explore</span>
          <span className="font-mono-label text-xs uppercase tracking-wider text-primary">
            Databricks Delta Lake Storage Layer Browser
          </span>
        </div>
        <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-on-surface">
          Data Explorer
        </h2>
        <p className="font-body-md text-sm text-on-surface-variant max-w-2xl mt-1">
          Direct inspection of the 5 canonical tables populated from Databricks Unity Catalog volume: <code className="text-primary font-mono-label text-xs">unilens_db.default.*</code>.
        </p>
      </div>

      {/* Dataset Selector Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-2 border-b border-outline-variant/30">
        {datasets.map((d) => (
          <button
            key={d.key}
            onClick={() => setActiveDataset(d.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeDataset === d.key
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-md shadow-primary/10'
                : 'bg-surface-container border border-border-muted text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{d.icon}</span>
            <span>{d.name}</span>
            <span className="font-mono-label text-[10px] px-1.5 py-0.5 rounded bg-black/20">
              {d.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="glass-panel p-6 rounded-2xl border border-border-muted">
        {activeDataset === 'projects' && (
          <DataTable
            data={STUDENT_PROJECTS}
            searchField="title"
            searchPlaceholder="Search capstone projects by title or tag..."
            columns={[
              { key: 'project_id', header: 'Project ID', render: (r) => <span className="font-mono-label text-primary">{r.project_id}</span> },
              { key: 'title', header: 'Project Title', render: (r) => <span className="font-medium text-on-surface">{r.title}</span> },
              { key: 'sector_tag', header: 'Sector', render: (r) => <span className="font-mono-label text-tertiary">{r.sector_tag}</span> },
              { key: 'dept', header: 'Department', render: (r) => <span className="font-mono-label">{r.dept}</span> },
              { key: 'submission_date', header: 'Submission Date', render: (r) => <span className="font-mono-label">{r.submission_date}</span> },
              { key: 'tech_stack_tags', header: 'Tech Stack', render: (r) => <span className="text-[11px] text-on-surface-variant line-clamp-1">{r.tech_stack_tags}</span> },
            ]}
          />
        )}

        {activeDataset === 'skills' && (
          <DataTable
            data={STUDENT_SKILLS}
            searchField="student_id"
            searchPlaceholder="Search students by ID or skills..."
            columns={[
              { key: 'student_id', header: 'Student ID', render: (r) => <span className="font-mono-label text-secondary font-bold">{r.student_id}</span> },
              { key: 'self_reported_skills', header: 'Self-Reported Skills', render: (r) => <span className="text-on-surface text-xs">{r.self_reported_skills}</span> },
              { key: 'course_grades_summary', header: 'Academic Grades', render: (r) => <span className="font-mono-label text-[11px] text-tertiary">{r.course_grades_summary}</span> },
              { key: 'past_hackathon_history', header: 'Hackathon History', render: (r) => <span className="text-on-surface-variant text-[11px]">{r.past_hackathon_history}</span> },
            ]}
          />
        )}

        {activeDataset === 'publications' && (
          <DataTable
            data={FACULTY_PUBLICATIONS}
            searchField="keywords"
            searchPlaceholder="Search faculty publications by keywords..."
            columns={[
              { key: 'paper_id', header: 'Paper ID', render: (r) => <span className="font-mono-label text-primary">{r.paper_id}</span> },
              { key: 'faculty_id', header: 'Faculty ID', render: (r) => <span className="font-mono-label text-tertiary font-bold">{r.faculty_id}</span> },
              { key: 'keywords', header: 'Research Keywords', render: (r) => <span className="text-on-surface">{r.keywords}</span> },
              { key: 'citation_count', header: 'Citations', render: (r) => <span className="font-mono-label font-bold text-tertiary">{r.citation_count}</span> },
              { key: 'publish_date', header: 'Publish Date', render: (r) => <span className="font-mono-label">{r.publish_date}</span> },
              { key: 'co_authors', header: 'Authors', render: (r) => <span className="text-on-surface-variant text-[11px]">{r.co_authors}</span> },
            ]}
          />
        )}

        {activeDataset === 'hackathons' && (
          <DataTable
            data={HACKATHONS}
            searchField="name"
            searchPlaceholder="Search hackathons..."
            columns={[
              { key: 'hackathon_id', header: 'ID', render: (r) => <span className="font-mono-label text-primary">{r.hackathon_id}</span> },
              { key: 'name', header: 'Hackathon Name', render: (r) => <span className="font-bold text-on-surface">{r.name}</span> },
              { key: 'organizer', header: 'Organizer', render: (r) => <span className="text-on-surface-variant">{r.organizer}</span> },
              { key: 'registration_deadline', header: 'Deadline', render: (r) => <span className="font-mono-label text-tertiary">{r.registration_deadline}</span> },
              { key: 'theme_tags', header: 'Themes', render: (r) => <span className="text-xs">{r.theme_tags}</span> },
            ]}
          />
        )}

        {activeDataset === 'vcPatents' && (
          <DataTable
            data={VC_PATENTS}
            searchField="startup_or_applicant_name"
            searchPlaceholder="Search startups or patent applicants..."
            columns={[
              { key: 'record_id', header: 'Record ID', render: (r) => <span className="font-mono-label text-primary">{r.record_id}</span> },
              {
                key: 'type',
                header: 'Type',
                render: (r) => (
                  <span
                    className={`font-mono-label text-[10px] px-2 py-0.5 rounded-full ${
                      r.type === 'VC_ROUND'
                        ? 'bg-secondary/15 text-secondary border border-secondary/30'
                        : 'bg-tertiary/15 text-tertiary border border-tertiary/30'
                    }`}
                  >
                    {r.type}
                  </span>
                ),
              },
              { key: 'startup_or_applicant_name', header: 'Entity Name', render: (r) => <span className="font-semibold text-on-surface">{r.startup_or_applicant_name}</span> },
              { key: 'sector_tag', header: 'Sector', render: (r) => <span className="font-mono-label">{r.sector_tag}</span> },
              { key: 'date', header: 'Date', render: (r) => <span className="font-mono-label">{r.date}</span> },
              {
                key: 'capital_amount',
                header: 'Capital (USD)',
                render: (r) => (
                  <span className="font-mono-label font-bold text-tertiary">
                    {r.capital_amount ? `$${(r.capital_amount / 1000000).toFixed(1)}M` : '—'}
                  </span>
                ),
              },
              { key: 'related_project_id', header: 'Related Project', render: (r) => <span className="font-mono-label text-primary">{r.related_project_id ?? '—'}</span> },
            ]}
          />
        )}
      </div>
    </div>
  );
};
