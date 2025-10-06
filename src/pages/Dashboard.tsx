import { useState } from 'react';
import { BarChart3, Target, Trophy } from 'lucide-react';
import DashboardHeader from '../components/dashboardPage/DashboardHeader';
import DashboardStats from '../components/dashboardPage/DashboardStats';
import UserProfile from '../components/dashboardPage/UserProfile';
import RecentAchievements from '../components/dashboardPage/RecentAchievements';
import RecentQuestions from '../components/dashboardPage/RecentQuestions';
import QuestionBankProgress from '../components/dashboardPage/QuestionBankProgress';
import AllAchievements from '../components/dashboardPage/AllAchievements';
import QuickActions from '../components/dashboardPage/QuickActions';
import LocalStorageMigration from '../components/migration/LocalStorageMigration';

type DashboardTab = 'overview' | 'progress' | 'rewards';

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState<DashboardTab>('overview');

  const tabOptions = [
    { id: 'overview' as const, name: 'Visão Geral', description: 'Perfil e atividade', icon: BarChart3 },
    { id: 'progress' as const, name: 'Progresso', description: 'Banco de questões', icon: Target },
    { id: 'rewards' as const, name: 'Espólios', description: 'Conquistas', icon: Trophy },
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserProfile />
              <RecentAchievements />
            </div>
            <RecentQuestions />
          </div>
        );
      case 'progress':
        return (
          <div className="space-y-6">
            <QuestionBankProgress />
          </div>
        );
      case 'rewards':
        return (
          <div className="space-y-6">
            <AllAchievements />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <DashboardHeader />
      
      {/* Migration Component */}
      <LocalStorageMigration />

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${
        isSidebarCollapsed ? 'mr-20' : 'mr-84'
      }`}>
        {/* Always show main stats */}
        <DashboardStats />

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="theme-card rounded-lg p-1">
            <div className="flex space-x-1">
              {tabOptions.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`group relative flex-1 px-6 py-4 text-sm font-medium rounded-lg transition-all duration-300 ${
                      selectedTab === tab.id
                        ? 'theme-bg-primary text-white shadow-lg'
                        : 'theme-bg-secondary theme-text-primary hover:theme-bg-tertiary'
                    }`}
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <IconComponent className="h-5 w-5" />
                        <span className="font-semibold">{tab.name}</span>
                      </div>
                      <div className={`text-xs ${
                        selectedTab === tab.id 
                          ? 'text-white/80' 
                          : 'theme-text-secondary'
                      }`}>
                        {tab.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>

      {/* Right Sidebar - QuickActions */}
      <QuickActions 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
    </div>
  );
}
