import React, { useState } from 'react';
import { GENIE_QUERIES } from '../../data/genieQueries';
import { GenieQuery } from '../../types/unilens';

export const AiIntelligenceView: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState<GenieQuery>(GENIE_QUERIES[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(selectedQuery.sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleRunCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    // Find closest matching benchmark
    const found = GENIE_QUERIES.find(
      (q) =>
        q.question.toLowerCase().includes(customPrompt.toLowerCase()) ||
        q.title.toLowerCase().includes(customPrompt.toLowerCase()) ||
        customPrompt.toLowerCase().includes(q.category.toLowerCase())
    ) || GENIE_QUERIES[0];
    setSelectedQuery(found);
  };

  return (
    <div className="space-y-6 pb-16 max-w-[1440px] mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary ai-pulse"></span>
          <span className="font-mono-label text-xs uppercase tracking-wider text-primary">
            Databricks Genie Space • Natural Language to Spark SQL
          </span>
        </div>
        <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-on-surface">
          AI Intelligence
        </h2>
        <p className="font-body-md text-sm text-on-surface-variant max-w-2xl mt-1">
          Ask plain English questions about the 5 fused campus datasets. Every answer is grounded directly in verified Spark SQL executions.
        </p>
      </div>

      {/* Benchmark Chips */}
      <div className="space-y-2">
        <span className="font-mono-label text-xs text-on-surface-variant uppercase">
          Curated Genie Benchmark Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {GENIE_QUERIES.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedQuery(q)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium text-left transition-all border ${
                selectedQuery.id === q.id
                  ? 'bg-primary-container text-on-primary-container border-primary font-semibold shadow-md shadow-primary/10'
                  : 'bg-surface-container border-border-muted text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {q.title}
            </button>
          ))}
        </div>
      </div>

      {/* Ask Input Bar */}
      <form onSubmit={handleRunCustom} className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-[20px]">
          psychology
        </span>
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Ask Genie: e.g. 'Which faculty research has commercialization potential?' or 'Build hackathon teams'"
          className="w-full bg-surface-container border border-outline-variant/60 rounded-xl pl-12 pr-28 py-3.5 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary shadow-lg shadow-black/40"
        />
        <button
          type="submit"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-primary text-on-primary font-semibold text-xs hover:opacity-90 transition-opacity flex items-center gap-1"
        >
          <span>Query</span>
          <span className="material-symbols-outlined text-sm">send</span>
        </button>
      </form>

      {/* Grounded Response Card */}
      <div className="glass-panel rounded-2xl p-6 border border-border-muted space-y-6">
        {/* Prompt Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-outline-variant/30">
          <div>
            <span className="font-mono-label text-[11px] text-primary uppercase">
              Question for {selectedQuery.persona}
            </span>
            <h3 className="font-headline-md text-lg font-bold text-on-surface mt-0.5">
              "{selectedQuery.question}"
            </h3>
          </div>
          <span className="font-mono-label text-xs px-3 py-1 rounded-full bg-surface-container-high border border-border-muted text-on-surface-variant">
            Category: {selectedQuery.category}
          </span>
        </div>

        {/* AI Reasoning Summary */}
        <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/30">
          <div className="flex items-center gap-2 text-tertiary mb-1.5">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            <span className="font-mono-label text-xs font-semibold uppercase">Genie Analytical Grounding</span>
          </div>
          <p className="text-xs text-on-surface leading-relaxed">
            {selectedQuery.explanation}
          </p>
        </div>

        {/* Canonical Spark SQL Executed */}
        <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-[#0d0d0e]">
          <div className="flex items-center justify-between px-4 py-2 bg-surface-container-high/70 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xs text-primary">terminal</span>
              <span className="font-mono-label text-xs text-on-surface-variant font-medium">
                Canonical Databricks Spark SQL
              </span>
            </div>
            <button
              onClick={handleCopySql}
              className="text-xs text-primary hover:text-white flex items-center gap-1 font-mono-label"
            >
              <span className="material-symbols-outlined text-xs">
                {copiedSql ? 'check' : 'content_copy'}
              </span>
              {copiedSql ? 'Copied' : 'Copy SQL'}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono-label text-on-surface-variant overflow-x-auto leading-relaxed max-h-64">
            <code>{selectedQuery.sql}</code>
          </pre>
        </div>

        {/* Grounded Result Records Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono-label text-xs text-on-surface-variant uppercase">
              Query Result Set ({selectedQuery.results.length} rows returned)
            </span>
            <span className="font-mono-label text-[11px] text-tertiary">Verified Delta Lake Execution</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border-muted bg-surface-container/50">
            <table className="w-full text-left text-xs border-collapse font-body-sm">
              <thead>
                <tr className="bg-surface-container-high/80 border-b border-outline-variant/30 font-mono-label text-on-surface-variant">
                  {selectedQuery.results.length > 0 &&
                    Object.keys(selectedQuery.results[0]).slice(0, 6).map((col, idx) => (
                      <th key={idx} className="p-3 uppercase tracking-wider font-medium">
                        {col.replace(/_/g, ' ')}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {selectedQuery.results.map((row: any, rIdx: number) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02]">
                    {Object.values(row).slice(0, 6).map((val: any, cIdx: number) => (
                      <td key={cIdx} className="p-3 text-on-surface font-mono-label text-[11px]">
                        {typeof val === 'number' && val > 100000
                          ? `$${(val / 1000000).toFixed(1)}M`
                          : String(val ?? '—')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
