import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export type RaseedNavTab = 
  | 'dashboard' 
  | 'ask-genie' 
  | 'students' 
  | 'placements' 
  | 'academics' 
  | 'labs' 
  | 'clubs' 
  | 'reports' 
  | 'alerts';

interface RaseedSidebarProps {
  activeTab: RaseedNavTab;
  onSelectTab: (tab: RaseedNavTab) => void;
  onOpenProfile: () => void;
}

export const RaseedSidebar: React.FC<RaseedSidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenProfile,
}) => {
  const { currentUser, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Exact 9 items matching reference screenshot with 'Ask Genie'
  const navItems: { id: RaseedNavTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'ask-genie', label: 'Ask Genie', icon: 'chat_bubble' },
    { id: 'students', label: 'Students', icon: 'group' },
    { id: 'placements', label: 'Placements', icon: 'business_center' },
    { id: 'academics', label: 'Academics', icon: 'school' },
    { id: 'labs', label: 'Labs & Facilities', icon: 'science' },
    { id: 'clubs', label: 'Clubs & Events', icon: 'diversity_3' },
    { id: 'reports', label: 'Reports', icon: 'description' },
    { id: 'alerts', label: 'Alerts', icon: 'notifications' },
  ];

  return (
    <aside className="w-[240px] shrink-0 bg-[#0C101C] border-r border-[#1C2538] flex flex-col justify-between py-5 px-3.5 h-screen overflow-y-auto select-none relative">
      <div>
        {/* Brand Logo Header matching reference */}
        <div className="flex items-center gap-2.5 px-2.5 mb-7">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#06B6D4]/30 to-[#3B82F6]/20 border border-[#06B6D4]/40 flex items-center justify-center shadow-glow-cyan">
            <svg className="w-5 h-5 text-[#22D3EE]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-white text-[15.5px] tracking-wider leading-none">
              UNI LENS
            </h1>
            <p className="text-[#818CF8] text-[10.5px] font-medium tracking-wide mt-1">
              Campus Intelligence
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#292652] text-[#A5B4FC] border border-[#4F46E5]/40 shadow-sm shadow-[#4F46E5]/20'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[19px] ${
                    isActive ? 'text-[#818CF8]' : 'text-[#64748B]'
                  }`}
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Area */}
      <div className="pt-4 space-y-4 relative">
        {/* Powered by Databricks Widget */}
        <div className="p-3.5 rounded-xl bg-[#111728] border border-[#1E293D]/80">
          <p className="text-[10px] text-[#64748B] uppercase tracking-wider mb-1.5 font-medium">
            Powered by
          </p>
          <div className="flex items-center gap-2 mb-1.5">
            <svg className="w-4 h-4 text-[#FF3621]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17L12 12L2 17Z" />
            </svg>
            <span className="text-[12px] font-semibold text-white">
              Databricks + Genie
            </span>
          </div>
          <p className="text-[10px] text-[#94A3B8] leading-tight">
            Turning campus data into actionable intelligence.
          </p>
        </div>

        {/* User Profile Area with Dynamic User & Dropdown Menu */}
        <div className="relative">
          <div
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center justify-between px-2 py-1.5 rounded-xl border border-transparent hover:border-[#1E293D] hover:bg-[#111728] cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={currentUser?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover border border-[#334155] shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white leading-tight truncate">
                  {currentUser?.name || 'Guest User'}
                </p>
                <p className="text-[10px] text-[#64748B] leading-tight truncate">
                  {currentUser?.role || 'Campus User'}
                </p>
              </div>
            </div>
            <span className={`material-symbols-outlined text-[#64748B] text-base transition-transform ${
              profileMenuOpen ? 'rotate-180 text-white' : ''
            }`}>
              expand_more
            </span>
          </div>

          {/* Profile Menu Popover */}
          {profileMenuOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-[#151C2E] border border-[#232F46] rounded-xl shadow-2xl py-1.5 z-50 text-xs animate-fade-in">
              <div className="px-3 py-1.5 border-b border-[#1E293B] mb-1">
                <p className="font-semibold text-white truncate">{currentUser?.name}</p>
                <p className="text-[10px] text-[#818CF8] truncate">{currentUser?.email}</p>
              </div>

              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  onOpenProfile();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[#94A3B8] hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <span className="material-symbols-outlined text-sm">person</span>
                <span>View Profile</span>
              </button>

              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  onOpenProfile();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[#94A3B8] hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <span className="material-symbols-outlined text-sm">settings</span>
                <span>Settings</span>
              </button>

              <div className="border-t border-[#1E293B] mt-1 pt-1">
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors font-medium"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
