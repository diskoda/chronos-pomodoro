import { useState } from 'react';
import { useXP } from '../hooks/useXP';
import { useXPNotification } from '../components/xp/XPNotification';
import XPBar from '../components/xp/XPBar';
import { AchievementGrid } from '../components/xp/AchievementCard';
import XPNotification from '../components/xp/XPNotification';
import FirebaseStatus from '../components/common/FirebaseStatus';
import { Trophy, Star, Zap, Target, Clock, BookOpen } from 'lucide-react';

export default function XPSystemExample() {
  const {
    userLevel,
    userStats,
    recentActivities,
    userAchievements,
    loading,
    recordQuestionAnswer,
    recordStudySession,
    recordQuizCompletion,
    recordClinicalCaseCompletion,
    getTotalXPToday,
    getActivityCount
  } = useXP();

  const { notification, showNotification, hideNotification } = useXPNotification();
  const [simulationLoading, setSimulationLoading] = useState(false);

  // Simular resposta de questão
  const simulateQuestionAnswer = async (correct: boolean, difficulty: 'easy' | 'medium' | 'hard') => {
    setSimulationLoading(true);
    try {
      const result = await recordQuestionAnswer(correct, difficulty, Math.random() * 60 + 10, 'Medicina');
      
      if (result) {
        showNotification({
          xpGained: result.xpGained,
          activityType: correct ? 'question_correct' : 'question_incorrect',
          description: `Questão ${correct ? 'correta' : 'incorreta'} (${difficulty})`,
          leveledUp: result.leveledUp,
          newLevel: result.newLevel
        });
      }
    } catch (error) {
      console.error('Erro ao simular resposta:', error);
    } finally {
      setSimulationLoading(false);
    }
  };

  // Simular conclusão de quiz
  const simulateQuizCompletion = async () => {
    setSimulationLoading(true);
    try {
      const result = await recordQuizCompletion(8, 10, 'medium');
      
      if (result) {
        showNotification({
          xpGained: result.xpGained,
          activityType: 'quiz_completed',
          description: 'Quiz concluído (8/10)',
          leveledUp: result.leveledUp,
          newLevel: result.newLevel
        });
      }
    } catch (error) {
      console.error('Erro ao simular quiz:', error);
    } finally {
      setSimulationLoading(false);
    }
  };

  // Simular sessão de estudo
  const simulateStudySession = async () => {
    setSimulationLoading(true);
    try {
      const result = await recordStudySession(45, 'Cardiologia');
      
      if (result) {
        showNotification({
          xpGained: result.xpGained,
          activityType: 'study_session',
          description: 'Sessão de estudo concluída (45min)',
          leveledUp: result.leveledUp,
          newLevel: result.newLevel
        });
      }
    } catch (error) {
      console.error('Erro ao simular sessão:', error);
    } finally {
      setSimulationLoading(false);
    }
  };

  // Simular caso clínico
  const simulateClinicalCase = async () => {
    setSimulationLoading(true);
    try {
      const result = await recordClinicalCaseCompletion('hard', 120, 'Neurologia');
      
      if (result) {
        showNotification({
          xpGained: result.xpGained,
          activityType: 'clinical_case_completed',
          description: 'Caso clínico concluído (difícil)',
          leveledUp: result.leveledUp,
          newLevel: result.newLevel
        });
      }
    } catch (error) {
      console.error('Erro ao simular caso clínico:', error);
    } finally {
      setSimulationLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando sistema de XP...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold theme-text-primary mb-2">Sistema de XP e Níveis</h1>
          <p className="theme-text-secondary">
            Teste o sistema completo de experiência, níveis e conquistas
          </p>
        </div>

        {/* XP Bar */}
        {userLevel && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold theme-text-primary mb-4">Seu Progresso</h2>
            <XPBar userLevel={userLevel} showDetails={true} size="lg" />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm theme-text-tertiary">XP Hoje</p>
                <p className="text-2xl font-bold theme-text-primary">{getTotalXPToday()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm theme-text-tertiary">Questões Corretas</p>
                <p className="text-2xl font-bold theme-text-primary">{getActivityCount('question_correct')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm theme-text-tertiary">Streak Atual</p>
                <p className="text-2xl font-bold theme-text-primary">{userStats?.currentStreak || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm theme-text-tertiary">Conquistas</p>
                <p className="text-2xl font-bold theme-text-primary">{userAchievements.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Firebase Status */}
        <FirebaseStatus className="mb-8" />

        {/* Simulation Buttons */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold theme-text-primary mb-4">Simular Atividades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium theme-text-primary">Questões</h3>
              <div className="space-y-2">
                <button
                  onClick={() => simulateQuestionAnswer(true, 'easy')}
                  disabled={simulationLoading}
                  className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm disabled:opacity-50"
                >
                  Correta (Fácil)
                </button>
                <button
                  onClick={() => simulateQuestionAnswer(true, 'medium')}
                  disabled={simulationLoading}
                  className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm disabled:opacity-50"
                >
                  Correta (Médio)
                </button>
                <button
                  onClick={() => simulateQuestionAnswer(true, 'hard')}
                  disabled={simulationLoading}
                  className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm disabled:opacity-50"
                >
                  Correta (Difícil)
                </button>
                <button
                  onClick={() => simulateQuestionAnswer(false, 'medium')}
                  disabled={simulationLoading}
                  className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm disabled:opacity-50"
                >
                  Incorreta
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium theme-text-primary">Quiz</h3>
              <button
                onClick={simulateQuizCompletion}
                disabled={simulationLoading}
                className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm disabled:opacity-50"
              >
                Concluir Quiz
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium theme-text-primary">Estudo</h3>
              <button
                onClick={simulateStudySession}
                disabled={simulationLoading}
                className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm disabled:opacity-50"
              >
                Sessão de Estudo
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium theme-text-primary">Casos Clínicos</h3>
              <button
                onClick={simulateClinicalCase}
                disabled={simulationLoading}
                className="w-full px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm disabled:opacity-50"
              >
                Caso Clínico
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        {recentActivities.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold theme-text-primary mb-4">Atividades Recentes</h2>
            <div className="space-y-3">
              {recentActivities.slice(0, 10).map((activity, index) => (
                <div key={activity.id || index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">
                      {activity.type === 'question_correct' && <Zap className="w-4 h-4 text-green-600" />}
                      {activity.type === 'question_incorrect' && <Target className="w-4 h-4 text-red-600" />}
                      {activity.type === 'quiz_completed' && <BookOpen className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'study_session' && <Clock className="w-4 h-4 text-purple-600" />}
                      {activity.type === 'clinical_case_completed' && <Trophy className="w-4 h-4 text-orange-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium theme-text-primary">{activity.description}</p>
                      <p className="text-xs theme-text-tertiary">
                        {activity.createdAt.toDate().toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-yellow-600">+{activity.xpGained} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold theme-text-primary mb-4">Conquistas</h2>
          <AchievementGrid userAchievements={userAchievements} showLocked={true} />
        </div>
      </div>

      {/* XP Notification */}
      <XPNotification
        show={notification.show}
        onClose={hideNotification}
        xpGained={notification.xpGained}
        activityType={notification.activityType}
        description={notification.description}
        leveledUp={notification.leveledUp}
        newLevel={notification.newLevel}
        achievementUnlocked={notification.achievementUnlocked}
      />
    </div>
  );
}