import React, { useState } from 'react';
import { STUDENT_PROJECTS } from '../../data/projects';
import { VC_PATENTS } from '../../data/vcPatents';
import { FACULTY_PUBLICATIONS } from '../../data/publications';
import { HACKATHONS } from '../../data/hackathons';
import { FACULTY_DIRECTORY } from '../../data/analytics';

type NodeType = 'ALL' | 'PROJECT' | 'STARTUP' | 'FACULTY' | 'HACKATHON' | 'PATENT';

export const CampusGraphView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<NodeType>('ALL');
  const [selectedNode, setSelectedNode] = useState<any>(null);

  // Core nodes representing cross-silo data fusion
  const graphNodes = [
    // Student Projects (Blue)
    { id: 'PRJ_101', type: 'PROJECT', label: 'Edge AI Pothole Monitor', sub: 'CivicTech (CSE)', x: 220, y: 160, color: '#8083ff' },
    { id: 'PRJ_102', type: 'PROJECT', label: 'Hostel Solar Arbitrage', sub: 'CleanTech (EEE)', x: 220, y: 280, color: '#8083ff' },
    { id: 'PRJ_103', type: 'PROJECT', label: 'Non-Invasive Glucose Screen', sub: 'HealthTech (ECE)', x: 220, y: 400, color: '#8083ff' },
    { id: 'PRJ_105', type: 'PROJECT', label: 'UPI Fraud Scoring Engine', sub: 'FinTech (ISE)', x: 220, y: 520, color: '#8083ff' },

    // Faculty Mentors / Researchers (Green)
    { id: 'FAC_201', type: 'FACULTY', label: 'Dr. Aarav Sharma', sub: 'Federated Learning (CSE)', x: 420, y: 120, color: '#4edea3' },
    { id: 'FAC_203', type: 'FACULTY', label: 'Dr. Meera Nambiar', sub: 'Solid-State Storage (EEE)', x: 420, y: 260, color: '#4edea3' },
    { id: 'FAC_206', type: 'FACULTY', label: 'Dr. Rajeshwari Kulkarni', sub: 'Neuromorphic Edge AI (CSE)', x: 420, y: 420, color: '#4edea3' },

    // Startups / VC Rounds (Purple)
    { id: 'VCP_401', type: 'STARTUP', label: 'UrbanPulse Dynamics', sub: '$3.5M VC Round (CivicTech)', x: 650, y: 160, color: '#bdc2ff' },
    { id: 'VCP_402', type: 'STARTUP', label: 'NammaGrid Power', sub: '$4.2M VC Round (CleanTech)', x: 650, y: 280, color: '#bdc2ff' },
    { id: 'VCP_405', type: 'STARTUP', label: 'Bengaluru PayShield', sub: '$5.5M VC Round (FinTech)', x: 650, y: 520, color: '#bdc2ff' },

    // Hackathons (Yellow/Orange)
    { id: 'HCK_501', type: 'HACKATHON', label: 'Smart Mobility Sprint 2026', sub: 'Registration: Sep 18', x: 200, y: 40, color: '#f59e0b' },
    { id: 'HCK_503', type: 'HACKATHON', label: 'FinTech FastPay AI Hack', sub: 'Registration: Sep 29', x: 420, y: 580, color: '#f59e0b' },

    // Patent Status / Alert (Red/Coral)
    { id: 'PAT_RISK_1', type: 'PATENT', label: 'UNPROTECTED IP ALERT', sub: 'Zero Campus Patents Filed', x: 860, y: 220, color: '#ffb4ab' },
    { id: 'PAT_RISK_2', type: 'PATENT', label: 'UNPROTECTED IP ALERT', sub: 'Zero Campus Patents Filed', x: 860, y: 480, color: '#ffb4ab' },
  ];

  // Cross-silo links
  const graphEdges = [
    // Projects to Mentors
    { from: 'PRJ_101', to: 'FAC_201', label: 'Mentored by' },
    { from: 'PRJ_102', to: 'FAC_203', label: 'Mentored by' },
    { from: 'PRJ_101', to: 'FAC_206', label: 'Co-mentored' },

    // Projects to Startups (Sector & Tech overlap)
    { from: 'PRJ_101', to: 'VCP_401', label: 'CivicTech overlap (9mo lag)', alert: true },
    { from: 'PRJ_102', to: 'VCP_402', label: 'CleanTech overlap (9.8mo lag)', alert: true },
    { from: 'PRJ_105', to: 'VCP_405', label: 'FinTech overlap (11.8mo lag)', alert: true },

    // Faculty to Startups (Research overlap)
    { from: 'FAC_201', to: 'VCP_401', label: 'Publication keyword match' },
    { from: 'FAC_203', to: 'VCP_402', label: 'Solid-State energy match' },

    // Projects to Hackathons
    { from: 'PRJ_101', to: 'HCK_501', label: 'Theme Fit Score 6/6' },
    { from: 'PRJ_105', to: 'HCK_503', label: 'Theme Fit Score 6/6' },

    // Startups to Patent Alert
    { from: 'VCP_401', to: 'PAT_RISK_1', label: 'No Patent Filed', alert: true },
    { from: 'VCP_405', to: 'PAT_RISK_2', label: 'No Patent Filed', alert: true },
  ];

  const filteredNodes = graphNodes.filter((n) => {
    if (activeFilter === 'ALL') return true;
    return n.type === activeFilter;
  });

  return (
    <div className="space-y-6 pb-16 max-w-[1440px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
            <span className="font-mono-label text-xs uppercase tracking-wider text-primary">
              Cross-Silo Campus Data Fusion Network
            </span>
          </div>
          <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-on-surface">
            Campus Knowledge Graph
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant max-w-2xl mt-1">
            Interactive relational map revealing hidden connections across Student Projects, Faculty Research, Venture Capital rounds, and Hackathon networks.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-container rounded-xl border border-border-muted text-xs">
          {(['ALL', 'PROJECT', 'FACULTY', 'STARTUP', 'HACKATHON', 'PATENT'] as NodeType[]).map((t) => (
            <button
              key={t}
              onClick={() => setActiveFilter(t)}
              className={`px-3 py-1.5 rounded-lg font-mono-label transition-all ${
                activeFilter === t
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="glass-panel rounded-2xl p-4 border border-border-muted relative overflow-hidden">
        <div className="w-full overflow-x-auto">
          <svg className="w-[960px] h-[640px] mx-auto select-none" viewBox="0 0 960 640">
            {/* Background Grid Lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="960" height="640" fill="url(#grid)" opacity="0.4" />

            {/* Edges */}
            {graphEdges.map((edge, idx) => {
              const src = graphNodes.find((n) => n.id === edge.from);
              const dst = graphNodes.find((n) => n.id === edge.to);
              if (!src || !dst) return null;

              const isVisible =
                (activeFilter === 'ALL' || src.type === activeFilter || dst.type === activeFilter);
              if (!isVisible) return null;

              return (
                <g key={idx}>
                  <line
                    x1={src.x}
                    y1={src.y}
                    x2={dst.x}
                    y2={dst.y}
                    stroke={edge.alert ? '#ffb4ab' : '#464554'}
                    strokeWidth={edge.alert ? 2 : 1.2}
                    strokeDasharray={edge.alert ? '5,5' : 'none'}
                    opacity={edge.alert ? 0.8 : 0.5}
                  />
                  <text
                    x={(src.x + dst.x) / 2}
                    y={(src.y + dst.y) / 2 - 4}
                    fill={edge.alert ? '#ffb4ab' : '#908fa0'}
                    fontSize="9"
                    fontFamily="JetBrains Mono"
                    textAnchor="middle"
                    opacity="0.75"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer group"
                >
                  {/* Outer Glow Ring */}
                  <circle
                    r={isSelected ? 32 : 24}
                    fill={node.color}
                    opacity={isSelected ? 0.25 : 0.12}
                    className={node.type === 'PATENT' ? 'active-node' : ''}
                  />
                  {/* Inner Node Circle */}
                  <circle
                    r={18}
                    fill="#1c1b1c"
                    stroke={node.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                  {/* Icon or Type Indicator */}
                  <text
                    y="4"
                    fill={node.color}
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="JetBrains Mono"
                    textAnchor="middle"
                  >
                    {node.type[0]}
                  </text>
                  {/* Node Label */}
                  <text
                    y="32"
                    fill="#e5e2e3"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Hanken Grotesk"
                    textAnchor="middle"
                  >
                    {node.label}
                  </text>
                  {/* Subtitle */}
                  <text
                    y="44"
                    fill="#c7c4d7"
                    fontSize="9"
                    fontFamily="JetBrains Mono"
                    textAnchor="middle"
                  >
                    {node.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Inspector Footer */}
        {selectedNode && (
          <div className="mt-4 p-4 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: `${selectedNode.color}20`, color: selectedNode.color }}
              >
                {selectedNode.type}
              </div>
              <div>
                <h4 className="font-headline-md text-sm font-bold text-on-surface">
                  {selectedNode.label} ({selectedNode.id})
                </h4>
                <p className="text-xs text-on-surface-variant font-mono-label">
                  {selectedNode.sub}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs text-on-surface hover:bg-surface-container-highest"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
