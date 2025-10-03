import { useState, useEffect } from 'react';
import { Trophy, Star, Zap, BookOpen, Stethoscope, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { MethodologyXPService } from '../../services/methodologyXPService';
import type { StudyMethodology } from '../../types/xpMethodologies';

interface MethodologyProgress {
  methodology: StudyMethodology;
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  progressPercentage: number;
  icon: any;
  color: string;
  title: string;
}

interface LevelProgressData {
  overallLevel: number;
  totalXP: number;
  methodologies: MethodologyProgress[];
}

export default function LevelProgress() {
  const { currentUser } = useAuth();
  const [data, setData] = useState<LevelProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgressData = async () => {
      if (!currentUser) return;
      
      try {
        // Carregar nível geral
        const overallLevel = await MethodologyXPService.getUserOverallLevel(currentUser.uid);
        
        // Carregar dados de cada metodologia
        const methodologies: MethodologyProgress[] = [];
        
        const methodologyConfigs = [
          {
            methodology: 'clinical_cases' as StudyMethodology,
            icon: Stethoscope,
            color: 'from-purple-500 to-indigo-500',
            title: 'Casos Clínicos'
          },
          {
            methodology: 'questions' as StudyMethodology,
            icon: HelpCircle,
            color: 'from-yellow-500 to-orange-500',
            title: 'Questões'
          },
          {
            methodology: 'flashcards' as StudyMethodology,
            icon: BookOpen,
            color: 'from-green-500 to-emerald-500',
            title: 'Flashcards'
          }
        ];
        
        for (const config of methodologyConfigs) {
          const methodologyLevel = await MethodologyXPService.getMethodologyLevel(currentUser.uid, config.methodology);
          const nextLevelXP = MethodologyXPService.getXPRequiredForLevel(methodologyLevel.currentLevel + 1, config.methodology);
          const currentLevelXP = MethodologyXPService.getXPRequiredForLevel(methodologyLevel.currentLevel, config.methodology);
          
          const xpToNextLevel = nextLevelXP - methodologyLevel.totalXP;
          const xpProgressInLevel = methodologyLevel.totalXP - currentLevelXP;
          const xpNeededForLevel = nextLevelXP - currentLevelXP;
          const progressPercentage = Math.max(0, Math.min(100, (xpProgressInLevel / xpNeededForLevel) * 100));
          
          methodologies.push({
            methodology: config.methodology,
            currentLevel: methodologyLevel.currentLevel,
            currentXP: methodologyLevel.totalXP,
            xpToNextLevel,
            progressPercentage,
            icon: config.icon,
            color: config.color,
            title: config.title
          });
        }
        
        setData({
          overallLevel: overallLevel.overallLevel,
          totalXP: overallLevel.totalXP,
          methodologies
        });
        
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, [currentUser]);

  const getLevelBadgeColor = (level: number) => {
    if (level >= 20) return 'from-purple-500 to-pink-500';
    if (level >= 15) return 'from-blue-500 to-cyan-500';
    if (level >= 10) return 'from-green-500 to-emerald-500';
    if (level >= 5) return 'from-yellow-500 to-orange-500';
    return 'from-gray-500 to-gray-600';
  };

  const getRankTitle = (level: number) => {
    if (level >= 25) return 'Especialista Legendary';
    if (level >= 20) return 'Mestre Médico';
    if (level >= 15) return 'Doutor Experiente';
    if (level >= 10) return 'Residente Avançado';
    if (level >= 5) return 'Estudante Dedicado';
    return 'Iniciante Promissor';
  };

  if (loading) {
    return (
      <div className="theme-card rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
          </div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="theme-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold theme-text-primary">Progresso de Nível</h3>
        <div className={`bg-gradient-to-r ${getLevelBadgeColor(data.overallLevel)} text-white px-3 py-1 rounded-full flex items-center space-x-1`}>
          <Star className="h-4 w-4" />
          <span className="font-bold text-sm">Nível {data.overallLevel}</span>
        </div>
      </div>

      {/* Rank Title and Overall XP */}
      <div className="text-center mb-6 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <h4 className="text-lg font-bold theme-text-primary mb-1">{getRankTitle(data.overallLevel)}</h4>
        <div className="flex items-center justify-center space-x-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium theme-text-primary">{data.totalXP.toLocaleString()} XP Total</span>
        </div>
      </div>

      {/* Metodologias Progress */}
      <div className="space-y-4">
        <h5 className="font-medium theme-text-primary mb-3">Progresso por Metodologia</h5>
        
        {data.methodologies.map((methodology) => {
          const IconComponent = methodology.icon;
          
          return (
            <div key={methodology.methodology} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`bg-gradient-to-r ${methodology.color} rounded-full p-1.5`}>
                    <IconComponent className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium theme-text-primary">{methodology.title}</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full theme-text-secondary">
                    Nv. {methodology.currentLevel}
                  </span>
                </div>
                <div className="text-xs theme-text-secondary">
                  {methodology.xpToNextLevel} XP restantes
                </div>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${methodology.color} h-2 rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${methodology.progressPercentage}%` }}
                ></div>
              </div>
              
              <div className="text-xs theme-text-secondary text-right">
                {methodology.currentXP.toLocaleString()} XP
              </div>
            </div>
          );
        })}
      </div>

      {/* Level Benefits Preview */}
      <div className="mt-6 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4">
        <h5 className="font-medium theme-text-primary mb-2 flex items-center">
          <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
          Próximas Recompensas (Nível {data.overallLevel + 1})
        </h5>
        <ul className="space-y-1 text-sm theme-text-secondary">
          <li>• Novo avatar médico exclusivo</li>
          <li>• +5% bônus de XP em todas as metodologias</li>
          <li>• Acesso a conteúdo premium avançado</li>
        </ul>
      </div>
    </div>
  );
}