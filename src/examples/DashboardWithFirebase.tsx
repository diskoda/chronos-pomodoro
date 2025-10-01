import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService, studyService } from '../services/firestore';
import type { 
  UserProfile as FirebaseUserProfile, 
  UserStats as FirebaseUserStats
} from '../services/firestore';
import DashboardHeader from '../components/dashboardPage/DashboardHeader';
import DashboardStats from '../components/dashboardPage/DashboardStats';
import StudyProgress from '../components/dashboardPage/StudyProgress';
import ClinicalCases from '../components/dashboardPage/ClinicalCases';
import UserProfileComponent from '../components/dashboardPage/UserProfile';
import Achievements from '../components/dashboardPage/Achievements';
import LogoutButton from '../components/common/LogoutButton';

export default function DashboardWithFirebase() {
  const { currentUser } = useAuth();
  
  // Estados para dados do Firebase
  const [userProfile, setUserProfile] = useState<FirebaseUserProfile | null>(null);
  const [userStats, setUserStats] = useState<FirebaseUserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        
        // Carregar perfil do usuário
        const profile = await userService.getUserProfile(currentUser.uid);
        setUserProfile(profile);
        
        // Carregar estatísticas do usuário
        const stats = await studyService.getUserStats(currentUser.uid);
        setUserStats(stats);
        
        // Carregar sessões de estudo recentes
        const sessions = await studyService.getUserStudySessions(currentUser.uid, 10);
        console.log('Sessões carregadas:', sessions);
        
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando dados...</p>
        </div>
      </div>
    );
  }

  // Exemplo de como usar os dados do Firebase
  const handleRecordStudySession = async (questionId: string, correct: boolean, timeSpent: number) => {
    if (!currentUser) return;

    try {
      await studyService.recordStudySession({
        userId: currentUser.uid,
        questionId,
        correct,
        timeSpent,
        difficulty: 'medium', // Pode ser dinâmico
        subject: 'Medicina' // Pode ser dinâmico
      });
      
      // Recarregar dados após registrar sessão
      const sessions = await studyService.getUserStudySessions(currentUser.uid, 10);
      console.log('Sessões atualizadas:', sessions);
    } catch (error) {
      console.error('Erro ao registrar sessão de estudo:', error);
    }
  };

  return (
    <div className="dashboard-background">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Componentes originais sem modificações nas props */}
        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            <StudyProgress />
            <ClinicalCases />
            
            {/* Exemplo de dados do Firebase */}
            {userStats && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Estatísticas do Firebase</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total de Questões</p>
                    <p className="text-2xl font-bold">{userStats.totalQuestions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Acertos</p>
                    <p className="text-2xl font-bold">{userStats.correctAnswers}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Left Sidebar Content */}
          <div className="space-y-6">
            <UserProfileComponent />
            <Achievements />
            
            {/* Exemplo de perfil do Firebase */}
            {userProfile && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Perfil do Firebase</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email: {userProfile.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Criado em: {userProfile.createdAt.toDate().toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botões de ação fixos */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => handleRecordStudySession('test-question-1', true, 120)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Testar Firebase
        </button>
        
        <LogoutButton 
          variant="secondary" 
          size="sm"
          className="shadow-lg"
        />
      </div>
    </div>
  );
}