import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CONTEXT_AWARE_PROMPTS } from '../../data/campusData';
import { RaseedNavTab } from '../layout/RaseedSidebar';

interface AskRaseedSidebarProps {
  activeTab?: RaseedNavTab;
}

export const AskRaseedSidebar: React.FC<AskRaseedSidebarProps> = ({ activeTab = 'dashboard' }) => {
  const { currentUser } = useAuth();

  const [messages, setMessages] = useState<{ sender: 'user' | 'assistant'; text?: string; data?: any }[]>([
    {
      sender: 'user',
      text: 'Which department has the largest placement skill gap?',
    },
    {
      sender: 'assistant',
      data: {
        headline: 'ECE has the largest placement skill gap.',
        readiness: '61%',
        benchmark: '75%',
        skills: [
          { name: 'Cloud Computing', pct: '48%', color: '#F97316' },
          { name: 'Machine Learning', pct: '54%', color: '#EF4444' },
          { name: 'SQL', pct: '63%', color: '#10B981' },
          { name: 'Python', pct: '65%', color: '#06B6D4' },
        ],
        action: 'Conduct a targeted 4-week Cloud + ML training program for final year ECE students.',
      },
    },
  ]);

  const [inputVal, setInputVal] = useState('');

  // Dynamically load context-aware chips based on activeTab
  const currentPrompts = CONTEXT_AWARE_PROMPTS[activeTab] || CONTEXT_AWARE_PROMPTS.dashboard;

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMsgs = [...messages, { sender: 'user' as const, text }];
    setMessages(newMsgs);
    setInputVal('');

    setTimeout(() => {
      let respData: any = {
        headline: 'Analysis complete for your query.',
        readiness: 'Verified across records',
        benchmark: 'Unity Catalog Standard',
        skills: [
          { name: 'Curriculum Baseline', pct: '78%', color: '#10B981' },
          { name: 'Student Readiness', pct: '68%', color: '#06B6D4' },
        ],
        action: 'Telemetry logged to university executive dashboard.',
      };

      const lower = text.toLowerCase();
      if (lower.includes('skill') || lower.includes('support') || lower.includes('placement')) {
        respData = {
          headline: 'ECE & ME require immediate placement support.',
          readiness: 'ECE: 61% | ME: 56%',
          benchmark: 'Target: 75%',
          skills: [
            { name: 'Cloud Architecture', pct: '48%', color: '#EF4444' },
            { name: 'Applied ML', pct: '54%', color: '#F97316' },
            { name: 'System Design', pct: '62%', color: '#10B981' },
          ],
          action: 'Authorize 4-week Cloud + ML training bridge course for ECE cohorts.',
        };
      } else if (lower.includes('risk') || lower.includes('academic') || lower.includes('cgpa')) {
        respData = {
          headline: '142 students flagged with attendance & CGPA risk.',
          readiness: 'Attendance &lt; 70%',
          benchmark: 'Avg CGPA: 5.92',
          skills: [
            { name: 'CS402 Operating Systems', pct: '14% fail', color: '#EF4444' },
            { name: 'EC401 Signal Processing', pct: '22% fail', color: '#EF4444' },
          ],
          action: 'Issue parent advisory and enroll flagged students in weekend tutorial sessions.',
        };
      } else if (lower.includes('lab') || lower.includes('utiliz') || lower.includes('facility')) {
        respData = {
          headline: 'AI Studio is at 88% capacity, Computer Lab 3 under repair.',
          readiness: '1,480 hrs used',
          benchmark: '2,000 hrs total',
          skills: [
            { name: 'AI Studio', pct: '88% load', color: '#EF4444' },
            { name: 'Cloud Lab', pct: '82% load', color: '#10B981' },
            { name: 'IoT Lab', pct: '74% load', color: '#06B6D4' },
          ],
          action: 'Reallocate non-GPU practical sessions to Computer Center 2.',
        };
      } else if (lower.includes('club') || lower.includes('event') || lower.includes('hack')) {
        respData = {
          headline: 'CodeCrafters leads with 86% engagement rate.',
          readiness: '420 registrations',
          benchmark: 'HackOverflow 3.0',
          skills: [
            { name: 'Coding Sprints', pct: '86%', color: '#10B981' },
            { name: 'Technical Talks', pct: '74%', color: '#06B6D4' },
          ],
          action: 'Sanction additional lab access and refreshments for 48-hour build night.',
        };
      } else if (lower.includes('report') || lower.includes('executive') || lower.includes('health')) {
        respData = {
          headline: 'Executive Health Index: 88.6/100 (Stable).',
          readiness: 'Placement: 78.4%',
          benchmark: 'Pass Rate: 92.4%',
          skills: [
            { name: 'Accreditation Metric', pct: '94%', color: '#10B981' },
            { name: 'Lab Health', pct: '94%', color: '#10B981' },
          ],
          action: 'Executive PDF briefing prepared and ready for Syndicate Board review.',
        };
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          data: respData,
        },
      ]);
    }, 450);
  };

  return (
    <aside className="w-[340px] xl:w-[360px] shrink-0 bg-[#0C101C] border-l border-[#1C2538] flex flex-col justify-between p-5 h-screen overflow-y-auto select-none">
      <div className="space-y-4">
        {/* Assistant Header */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-white flex items-center gap-1.5">
              <span>Ask UNI LENS</span>
            </h2>
            <span className="text-[#818CF8] text-[18px]">✦</span>
          </div>
          <p className="text-[11px] font-semibold text-[#818CF8] mt-0.5">
            Your AI Campus Assistant
          </p>
          <p className="text-[11px] text-[#94A3B8] mt-1 leading-snug">
            Ask anything about your campus data in natural language.
          </p>
        </div>

        {/* Current Active Context Badge */}
        <div className="px-2.5 py-1 rounded-lg bg-[#111728] border border-[#1E293D] flex items-center justify-between text-[10px]">
          <span className="text-[#64748B] uppercase font-mono">Current Context</span>
          <span className="font-semibold text-[#818CF8] capitalize">
            {activeTab.replace('-', ' ')}
          </span>
        </div>

        {/* Conversation Stream */}
        <div className="space-y-3.5 pt-1">
          {messages.map((m, idx) => {
            if (m.sender === 'user') {
              return (
                <div key={idx} className="flex justify-end">
                  <div className="bg-[#4338CA] text-white text-[12px] font-medium px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[90%] shadow-sm">
                    {m.text}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="bg-[#151C2E] border border-[#232F46] rounded-2xl p-4 text-xs space-y-3 shadow-md animate-fade-in"
              >
                {/* Status Bar */}
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-white">
                  <span className="text-[#818CF8]">✦</span>
                  <span>UNI LENS Analyzed</span>
                  <span className="text-[#10B981] material-symbols-outlined text-[14px]">
                    check_circle
                  </span>
                </div>

                {/* Analysis Body */}
                <div className="text-[12px] text-[#E2E8F0] space-y-1">
                  <p className="font-semibold">{m.data.headline}</p>
                  <p className="text-[11px] text-[#94A3B8]">
                    Metric: <span className="text-white font-medium">{m.data.readiness}</span>
                  </p>
                  <p className="text-[11px] text-[#94A3B8]">
                    Benchmark: <span className="text-white font-medium">{m.data.benchmark}</span>
                  </p>
                </div>

                {/* Skill Gaps List */}
                {m.data.skills && (
                  <div className="pt-2 border-t border-[#1E293B]">
                    <p className="text-[11px] font-semibold text-white mb-2">Breakdown:</p>
                    <div className="space-y-1 text-[11px]">
                      {m.data.skills.map((s: any) => (
                        <div key={s.name} className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-[#94A3B8]">
                            <span
                              className="w-2 h-2 rounded-full inline-block"
                              style={{ backgroundColor: s.color }}
                            ></span>
                            <span>{s.name}</span>
                          </span>
                          <span className="text-[#64748B] font-mono">({s.pct})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Action */}
                {m.data.action && (
                  <div className="pt-2 border-t border-[#1E293B]">
                    <p className="text-[11px] font-semibold text-white mb-1">Suggested Action:</p>
                    <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                      {m.data.action}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Context-Aware Suggestion Chips */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] text-[#64748B] uppercase font-semibold tracking-wider">
            Suggested for {activeTab.replace('-', ' ')}:
          </p>
          {currentPrompts.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="w-full text-left px-3.5 py-2 rounded-xl bg-[#141B2D] border border-[#1E293D] text-[11.5px] text-[#94A3B8] hover:text-white hover:border-[#384869] transition-all truncate"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Input & Databricks Footer */}
      <div className="pt-4 space-y-3">
        {/* Input Bar */}
        <div className="relative">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputVal)}
            placeholder="Ask UNI LENS anything..."
            className="w-full bg-[#141B2D] border border-[#232F46] rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#4F46E5]"
          />
          <button
            onClick={() => handleSend(inputVal)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] text-white flex items-center justify-center transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[15px]">send</span>
          </button>
        </div>

        {/* Security / Genie Note */}
        <div className="flex items-center gap-2 pt-1 text-[10px] text-[#64748B]">
          <svg className="w-3.5 h-3.5 text-[#FF3621] shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17L12 12L2 17Z" />
          </svg>
          <span className="leading-tight">
            UNI LENS uses Databricks Genie to analyze your campus data securely.
          </span>
        </div>
      </div>
    </aside>
  );
};
