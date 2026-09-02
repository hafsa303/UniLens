import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { ProfileModal } from './components/auth/ProfileModal';
import { RaseedSidebar, RaseedNavTab } from './components/layout/RaseedSidebar';
import { RaseedTopHeader } from './components/layout/RaseedTopHeader';
import { KpiCardsRow } from './components/dashboard/KpiCardsRow';
import { DepartmentReadinessCard } from './components/dashboard/DepartmentReadinessCard';
import { SkillGapCard } from './components/dashboard/SkillGapCard';
import { LabUtilizationCard } from './components/dashboard/LabUtilizationCard';
import { TopClubsCard } from './components/dashboard/TopClubsCard';
import { UpcomingEventsCard } from './components/dashboard/UpcomingEventsCard';
import { CampusTrendChart } from './components/dashboard/CampusTrendChart';
import { CampusPulse } from './components/dashboard/CampusPulse';
import { AskRaseedSidebar } from './components/dashboard/AskRaseedSidebar';

// Dedicated Sub-Intelligence Views
import { StudentIntelligenceView } from './components/views/StudentIntelligenceView';
import { PlacementIntelligenceView } from './components/views/PlacementIntelligenceView';
import { AcademicIntelligenceView } from './components/views/AcademicIntelligenceView';
import { LabsFacilitiesView } from './components/views/LabsFacilitiesView';
import { ClubsEventsView } from './components/views/ClubsEventsView';
import { CampusReportsView } from './components/views/CampusReportsView';
import { CampusAlertsView } from './components/views/CampusAlertsView';

const DashboardContent: React.FC = () => {
  const { currentUser } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState<RaseedNavTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAiOpen, setMobileAiOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Protected Route Check
  if (!currentUser) {
    if (authView === 'signup') {
      return <SignupPage onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <LoginPage onSwitchToSignup={() => setAuthView('signup')} />;
  }

  return (
    <div className="flex h-screen w-screen bg-[#0B0E17] text-[#F1F5F9] font-sans antialiased overflow-hidden select-none">
      
      {/* 1. Left Sidebar Navigation matching reference image */}
      <div className={`fixed inset-y-0 left-0 z-40 md:static transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <RaseedSidebar
          activeTab={activeTab}
          onSelectTab={(t) => {
            setActiveTab(t);
            setMobileMenuOpen(false);
          }}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 2. Center Main Dashboard Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Mobile Header Bar */}
        <div className="md:hidden flex items-center justify-between p-3.5 bg-[#0C101C] border-b border-[#1C2538]">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 rounded-lg bg-[#141B2D] text-[#94A3B8]"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
          <span className="font-bold text-white text-sm">UNI LENS Intelligence</span>
          <button
            onClick={() => setMobileAiOpen(!mobileAiOpen)}
            className="p-1.5 rounded-lg bg-[#4338CA] text-white flex items-center gap-1 text-xs"
          >
            <span className="text-[14px]">✦</span>
            <span>Genie</span>
          </button>
        </div>

        {/* Scrollable Dashboard Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
          <div className="max-w-[1140px] mx-auto">
            {/* Top Personalized Welcome & Filter Header */}
            <RaseedTopHeader />

            {/* Role Personalization Banner */}
            {currentUser.role === 'Student' && activeTab === 'dashboard' && (
              <div className="mb-4 p-3.5 rounded-xl bg-[#6366F1]/15 border border-[#6366F1]/30 flex items-center justify-between text-xs animate-fade-in">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#818CF8]">badge</span>
                  <span>
                    Logged in as <strong>{currentUser.name}</strong> ({currentUser.department} Department, {currentUser.semester}). Target placement readiness: <strong className="text-[#10B981]">68%</strong>.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('placements')}
                  className="text-[#818CF8] hover:underline font-semibold"
                >
                  View Your Career Track →
                </button>
              </div>
            )}

            {/* Tab Views Routing */}
            {activeTab === 'dashboard' && (
              <div className="space-y-4">
                {/* Row 1: 5 KPI Metrics Cards */}
                <KpiCardsRow />

                {/* Row 2: 2 Column Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <DepartmentReadinessCard />
                  <SkillGapCard />
                </div>

                {/* Row 3: 3 Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <LabUtilizationCard />
                  <TopClubsCard />
                  <UpcomingEventsCard />
                </div>

                {/* Row 4: Wide Spline Trend & Entity Graph */}
                <CampusTrendChart />

                {/* Row 5: CAMPUS PULSE & QUICK ACTIONS */}
                <CampusPulse onNavigate={(tab) => setActiveTab(tab)} />
              </div>
            )}

            {activeTab === 'students' && <StudentIntelligenceView />}
            {activeTab === 'placements' && <PlacementIntelligenceView />}
            {activeTab === 'academics' && <AcademicIntelligenceView />}
            {activeTab === 'labs' && <LabsFacilitiesView />}
            {activeTab === 'clubs' && <ClubsEventsView />}
            {activeTab === 'reports' && <CampusReportsView />}
            {activeTab === 'alerts' && <CampusAlertsView />}

            {activeTab === 'ask-genie' && (
              <div className="card-depth p-8 text-center space-y-4 my-8 animate-fade-in">
                <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center text-[#818CF8] mx-auto">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Ask Genie — Databricks NL-to-SQL Space
                </h3>
                <p className="text-sm text-[#94A3B8] max-w-lg mx-auto">
                  Query the entire campus data warehouse in plain English. Use the right-hand AI assistant panel to execute questions against Unity Catalog tables.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-xs transition-colors"
                  >
                    Return to Campus Command Center
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 3. Right Sidebar: Context-Aware Ask UNI LENS AI Assistant */}
      <div className={`fixed inset-y-0 right-0 z-40 lg:static transition-transform duration-300 ${
        mobileAiOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        <AskRaseedSidebar activeTab={activeTab} />
      </div>

      {/* Mobile backdrop for AI panel */}
      {mobileAiOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setMobileAiOpen(false)}
        />
      )}

      {/* Profile & Settings Modal */}
      {isProfileModalOpen && (
        <ProfileModal onClose={() => setIsProfileModalOpen(false)} />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
};

export default App;
