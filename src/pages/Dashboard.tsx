import { useState } from 'react';
import DashboardHeader from '../components/dashboardPage/DashboardHeader';
import DashboardStats from '../components/dashboardPage/DashboardStats';
import StudyProgress from '../components/dashboardPage/StudyProgress';
import ClinicalCases from '../components/dashboardPage/ClinicalCases';
import UserProfile from '../components/dashboardPage/UserProfile';
import Achievements from '../components/dashboardPage/Achievements';
import QuickActions from '../components/dashboardPage/QuickActions';

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen theme-bg-secondary">
      <DashboardHeader />

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${
        isSidebarCollapsed ? 'mr-20' : 'mr-84'
      }`}>
        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            <StudyProgress />
            <ClinicalCases />
          </div>

          {/* Left Sidebar Content */}
          <div className="space-y-6">
            <UserProfile />
            <Achievements />
          </div>
        </div>
      </div>

      {/* Right Sidebar - QuickActions */}
      <QuickActions 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
    </div>
  );
}
