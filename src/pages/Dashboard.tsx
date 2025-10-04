import { useState } from 'react';
import DashboardHeader from '../components/dashboardPage/DashboardHeader';
import DashboardStats from '../components/dashboardPage/DashboardStats';
import StudyProgress from '../components/dashboardPage/StudyProgress';
import ClinicalCases from '../components/dashboardPage/ClinicalCases';
import UserProfile from '../components/dashboardPage/UserProfile';
import Achievements from '../components/dashboardPage/Achievements';
import QuickActions from '../components/dashboardPage/QuickActions';
import LevelProgress from '../components/dashboardPage/LevelProgress';
import StreaksAndGoals from '../components/dashboardPage/StreaksAndGoals';
import RewardsSystem from '../components/dashboardPage/RewardsSystem';
import Leaderboard from '../components/dashboardPage/Leaderboard';
import GamificationNotifications from '../components/dashboardPage/GamificationNotifications';
import LocalStorageMigration from '../components/migration/LocalStorageMigration';
import QuickTest from '../components/QuickTest';

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'progress' | 'rewards' | 'social' | 'test'>('overview');

  const tabOptions = [
    { id: 'overview' as const, name: 'Visão Geral', description: 'Stats e progresso', icon: '📊' },
    { id: 'progress' as const, name: 'Progresso', description: 'Nível e metas', icon: '🎯' },
    { id: 'rewards' as const, name: 'Recompensas', description: 'Badges e conquistas', icon: '🏆' },
    { id: 'social' as const, name: 'Social', description: 'Ranking e comunidade', icon: '👥' },
    { id: 'test' as const, name: 'Laboratório', description: 'Experimentação avançada', icon: '🧪' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <DashboardHeader />
      
      {/* Gamification Notifications */}
      <GamificationNotifications />
      
      {/* Migration Component */}
      <LocalStorageMigration />

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${
        isSidebarCollapsed ? 'mr-20' : 'mr-84'
      }`}>
        {/* Always show main stats */}
        <DashboardStats />

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="relative">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-teal-900/20 rounded-xl blur-sm opacity-50"></div>
            
            {/* Main Navigation Container */}
            <div className="relative bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-orange-500/20 rounded-xl p-2 shadow-2xl">
              {/* Animated Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/30 via-purple-600/30 to-teal-600/30 rounded-xl blur opacity-75 animate-pulse"></div>
              
              <div className="relative flex space-x-2">
                {tabOptions.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`group relative flex-1 px-6 py-4 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      selectedTab === tab.id
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 scale-105'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/60 hover:text-white border border-slate-600/30 hover:border-orange-400/40'
                    }`}
                  >
                    {/* Selected Tab Glow */}
                    {selectedTab === tab.id && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    )}
                    
                    {/* Tab Content */}
                    <div className="relative text-center">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <span className="text-lg">{tab.icon}</span>
                        <span className="font-semibold tracking-wide">{tab.name}</span>
                      </div>
                      <div className={`text-xs font-medium ${
                        selectedTab === tab.id 
                          ? 'text-orange-100' 
                          : 'text-slate-400 group-hover:text-slate-300'
                      }`}>
                        {tab.description}
                      </div>
                    </div>

                    {/* Hover Effect Lines */}
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-teal-400 transition-all duration-300 ${
                      selectedTab !== tab.id ? 'group-hover:w-full' : ''
                    }`}></div>
                  </button>
                ))}
              </div>

              {/* Neural Network Pattern */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-2 left-4 w-1 h-1 bg-teal-400 rounded-full animate-ping"></div>
                <div className="absolute top-6 right-8 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-3 left-1/3 w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-2 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Content */}
            <div className="space-y-8">
              <StudyProgress />
              <ClinicalCases />
            </div>

            {/* Right Sidebar Content */}
            <div className="space-y-6">
              <UserProfile />
              <Achievements />
            </div>
          </div>
        )}

        {selectedTab === 'progress' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Content */}
            <div className="space-y-8">
              <LevelProgress />
              <StreaksAndGoals />
            </div>

            {/* Right Sidebar Content */}
            <div className="space-y-6">
              <UserProfile />
              <StudyProgress />
            </div>
          </div>
        )}

        {selectedTab === 'rewards' && (
          <div className="space-y-8">
            <RewardsSystem />
          </div>
        )}

        {selectedTab === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Content */}
            <div className="space-y-8">
              <Leaderboard />
            </div>

            {/* Right Sidebar Content */}
            <div className="space-y-6">
              <UserProfile />
              <Achievements />
            </div>
          </div>
        )}

        {selectedTab === 'test' && (
          <div className="space-y-8">
            <QuickTest />
          </div>
        )}
      </div>

      {/* Right Sidebar - QuickActions */}
      <QuickActions 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
    </div>
  );
}
