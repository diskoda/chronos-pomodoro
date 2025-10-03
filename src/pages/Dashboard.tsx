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

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'progress' | 'rewards' | 'social'>('overview');

  const tabOptions = [
    { id: 'overview' as const, name: 'Visão Geral', description: 'Stats e progresso' },
    { id: 'progress' as const, name: 'Progresso', description: 'Nível e metas' },
    { id: 'rewards' as const, name: 'Recompensas', description: 'Badges e conquistas' },
    { id: 'social' as const, name: 'Social', description: 'Ranking e comunidade' }
  ];

  return (
    <div className="dashboard-background">
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
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 max-w-2xl">
            {tabOptions.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-white dark:bg-gray-700 theme-text-primary shadow-sm'
                    : 'theme-text-secondary hover:theme-text-primary'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium">{tab.name}</div>
                  <div className="text-xs opacity-75">{tab.description}</div>
                </div>
              </button>
            ))}
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
      </div>

      {/* Right Sidebar - QuickActions */}
      <QuickActions 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
    </div>
  );
}
