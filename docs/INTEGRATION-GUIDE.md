# 🔗 Guia de Integração - Sistema XP por Metodologias

## 🎯 Objetivo
Este guia mostra como integrar o novo sistema de XP por metodologias com os componentes existentes do Chronos Pomodoro.

## 📋 Checklist de Integração

### ✅ Completado
- [x] Sistema de tipos e interfaces
- [x] Serviços backend
- [x] Hooks React
- [x] Componentes visuais
- [x] Página de demonstração
- [x] Serviço de migração

### 🔄 Em Andamento
- [ ] Integração com componentes de questões
- [ ] Integração com casos clínicos
- [ ] Integração com dashboard
- [ ] Teste completo do fluxo
- [ ] Migração de dados

## 🛠️ Integração por Componente

### 1. 📚 Banco de Questões

#### Localização dos Arquivos
```
src/components/questionSolver/
├── QuestionSolver.tsx           # Componente principal
├── QuestionActions.tsx          # Botões de ação
├── QuestionAlternatives.tsx     # Alternativas da questão
└── index.ts                     # Exportações
```

#### Modificações Necessárias

##### 1.1 QuestionSolver.tsx
```typescript
// Adicionar imports
import { useMethodologyXP } from '../../hooks/useMethodologyXP';
import { MethodologyXPBar } from '../../components/xp/MethodologyXPBar';

// No componente QuestionSolver
export function QuestionSolver() {
  const { recordQuestionActivity } = useMethodologyXP();
  const { level: questionsLevel, title: questionsTitle } = useSpecificMethodologyXP('questions');
  
  // Função para registrar resposta
  const handleAnswerSubmit = async (selectedAnswer: string, isCorrect: boolean, timeSpent: number) => {
    try {
      if (isCorrect) {
        const result = await recordQuestionActivity('question_correct', {
          questionId: currentQuestion.id,
          difficulty: currentQuestion.difficulty || 'medium',
          subject: currentQuestion.subject,
          timeSpent: timeSpent,
          accuracy: 100
        });
        
        // Mostrar feedback de level up
        if (result?.leveledUp) {
          showLevelUpNotification(result.newLevel, 'questions');
        }
      } else {
        await recordQuestionActivity('question_incorrect', {
          questionId: currentQuestion.id,
          timeSpent: timeSpent
        });
      }
    } catch (error) {
      console.error('Erro ao registrar atividade XP:', error);
    }
  };

  return (
    <div className="question-solver">
      {/* Barra de XP no topo */}
      <div className="mb-4">
        <MethodologyXPBar
          methodology="questions"
          level={questionsLevel}
          title={questionsTitle}
          size="sm"
          showDetails={false}
        />
      </div>
      
      {/* Resto do componente... */}
    </div>
  );
}
```

##### 1.2 Integração com Streaks
```typescript
// Adicionar lógica de streak
const [currentStreak, setCurrentStreak] = useState(0);

const handleCorrectAnswer = async () => {
  const newStreak = currentStreak + 1;
  setCurrentStreak(newStreak);
  
  // Registrar streak bonus a cada 5 respostas corretas
  if (newStreak % 5 === 0) {
    await recordQuestionActivity('question_streak', {
      streakCount: newStreak,
      bonusMultiplier: Math.min(newStreak / 5, 5) // Max 5x
    });
  }
};

const handleIncorrectAnswer = () => {
  setCurrentStreak(0); // Reseta streak
};
```

### 2. 🫀 Casos Clínicos

#### Localização dos Arquivos
```
src/components/clinicalCase/
├── ClinicalCase.tsx             # Componente principal
├── CasePresentation.tsx         # Apresentação do caso
├── CaseStartCountdown.tsx       # Countdown inicial
└── StepTransition.tsx           # Transições entre etapas
```

#### Modificações Necessárias

##### 2.1 ClinicalCase.tsx
```typescript
// Adicionar imports
import { useMethodologyXP } from '../../hooks/useMethodologyXP';
import { MethodologyXPBar } from '../../components/xp/MethodologyXPBar';

export function ClinicalCase() {
  const { recordClinicalCaseActivity } = useMethodologyXP();
  const { level: clinicalLevel, title: clinicalTitle } = useSpecificMethodologyXP('clinical_cases');
  
  const [caseStartTime, setCaseStartTime] = useState<Date | null>(null);
  const [caseData, setCaseData] = useState(null);

  // Registrar início do caso
  const handleCaseStart = async (caseId: string) => {
    setCaseStartTime(new Date());
    
    await recordClinicalCaseActivity('case_started', {
      caseId: caseId,
      difficulty: caseData.difficulty
    });
  };

  // Registrar conclusão do caso
  const handleCaseComplete = async (accuracy: number, answers: any[]) => {
    if (!caseStartTime) return;
    
    const timeSpent = Math.floor((new Date().getTime() - caseStartTime.getTime()) / 1000 / 60); // em minutos
    const isPerfect = accuracy >= 100;
    const hasSpeedBonus = timeSpent <= (caseData.expectedTime || 30);
    
    try {
      // Registrar conclusão base
      const result = await recordClinicalCaseActivity('case_completed', {
        caseId: caseData.id,
        difficulty: caseData.difficulty,
        accuracy: accuracy,
        timeSpent: timeSpent,
        answers: answers
      });
      
      // Bonus por performance perfeita
      if (isPerfect) {
        await recordClinicalCaseActivity('case_perfect_score', {
          caseId: caseData.id,
          accuracy: accuracy
        });
      }
      
      // Bonus por velocidade
      if (hasSpeedBonus) {
        await recordClinicalCaseActivity('case_time_bonus', {
          caseId: caseData.id,
          timeSpent: timeSpent,
          expectedTime: caseData.expectedTime
        });
      }
      
      // Bonus por dificuldade
      if (caseData.difficulty === 'hard' && accuracy >= 80) {
        await recordClinicalCaseActivity('case_difficulty_bonus', {
          caseId: caseData.id,
          difficulty: caseData.difficulty,
          accuracy: accuracy
        });
      }
      
      // Notificação de level up
      if (result?.leveledUp) {
        showLevelUpNotification(result.newLevel, 'clinical_cases');
      }
      
    } catch (error) {
      console.error('Erro ao registrar XP do caso clínico:', error);
    }
  };

  return (
    <div className="clinical-case">
      {/* Barra de XP */}
      <div className="mb-6">
        <MethodologyXPBar
          methodology="clinical_cases"
          level={clinicalLevel}
          title={clinicalTitle}
          size="md"
          showDetails={true}
        />
      </div>
      
      {/* Resto do componente... */}
    </div>
  );
}
```

### 3. 📊 Dashboard

#### Localização dos Arquivos
```
src/pages/Dashboard.tsx
src/components/dashboardPage/
├── DashboardStats.tsx           # Estatísticas principais
├── UserProfile.tsx              # Perfil do usuário
└── StudyProgress.tsx            # Progresso de estudos
```

#### Modificações Necessárias

##### 3.1 Dashboard.tsx
```typescript
// Adicionar imports
import { useMethodologyXP } from '../hooks/useMethodologyXP';
import { MethodologyXPOverview, MethodologyXPCompact } from '../components/xp/MethodologyXPBar';

export function Dashboard() {
  const {
    overallLevel,
    methodologyLevels,
    methodologyTitles,
    userStats,
    getFavoriteMethodology
  } = useMethodologyXP();

  return (
    <div className="dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visão Geral XP */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Progresso por Metodologia</h2>
            <MethodologyXPOverview
              methodologyLevels={methodologyLevels}
              methodologyTitles={methodologyTitles}
              overallLevel={overallLevel.overallLevel}
              totalXP={overallLevel.totalXP}
              showDetails={true}
            />
          </div>
        </div>
        
        {/* Resumo Compacto */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Resumo Rápido</h2>
            <MethodologyXPCompact
              methodologyLevels={methodologyLevels}
              favoriteMethodology={getFavoriteMethodology()}
            />
          </div>
        </div>
        
        {/* Estatísticas Detalhadas */}
        <div className="lg:col-span-3">
          <MethodologyStats userStats={userStats} />
        </div>
        
      </div>
    </div>
  );
}
```

##### 3.2 Componente de Estatísticas Detalhadas
```typescript
// Novo componente: src/components/dashboardPage/MethodologyStats.tsx
interface MethodologyStatsProps {
  userStats: any; // Definir tipo apropriado
}

export function MethodologyStats({ userStats }: MethodologyStatsProps) {
  if (!userStats) return <div>Carregando estatísticas...</div>;

  const {
    overallStats,
    methodologyStats
  } = userStats;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-6">Estatísticas Detalhadas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Casos Clínicos */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            Casos Clínicos
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Nível:</span>
              <span className="font-medium">{methodologyStats.clinical_cases?.currentLevel || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Casos Completos:</span>
              <span className="font-medium">{methodologyStats.clinical_cases?.specific?.casesCompleted || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Precisão Média:</span>
              <span className="font-medium">{methodologyStats.clinical_cases?.specific?.averageAccuracy || 0}%</span>
            </div>
          </div>
        </div>
        
        {/* Questões */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3 flex items-center">
            <Book className="w-5 h-5 mr-2 text-blue-500" />
            Questões
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Nível:</span>
              <span className="font-medium">{methodologyStats.questions?.currentLevel || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Questões Corretas:</span>
              <span className="font-medium">{methodologyStats.questions?.specific?.questionsCorrect || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Melhor Streak:</span>
              <span className="font-medium">{methodologyStats.questions?.specific?.bestStreak || 0}</span>
            </div>
          </div>
        </div>
        
        {/* Flashcards */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-500" />
            Flashcards
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Nível:</span>
              <span className="font-medium">{methodologyStats.flashcards?.currentLevel || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Cards Revisados:</span>
              <span className="font-medium">{methodologyStats.flashcards?.specific?.cardsReviewed || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Decks Completos:</span>
              <span className="font-medium">{methodologyStats.flashcards?.specific?.decksCompleted || 0}</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
```

### 4. 🔔 Sistema de Notificações

#### Criar Componente de Level Up
```typescript
// src/components/xp/LevelUpNotification.tsx
interface LevelUpNotificationProps {
  methodology: StudyMethodology;
  newLevel: number;
  newTitle: string;
  onClose: () => void;
}

export function LevelUpNotification({
  methodology,
  newLevel,
  newTitle,
  onClose
}: LevelUpNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const methodologyData = {
    clinical_cases: { icon: Heart, color: 'text-red-500', name: 'Casos Clínicos' },
    questions: { icon: Book, color: 'text-blue-500', name: 'Questões' },
    flashcards: { icon: Zap, color: 'text-yellow-500', name: 'Flashcards' }
  };

  const { icon: Icon, color, name } = methodologyData[methodology];

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-lg shadow-2xl max-w-sm">
        <div className="flex items-center mb-3">
          <Icon className={`w-8 h-8 mr-3 ${color}`} />
          <div>
            <h3 className="font-bold text-lg">Level Up!</h3>
            <p className="text-sm opacity-90">{name}</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">Nível {newLevel}</div>
          <div className="text-lg italic">{newTitle}</div>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/70 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
```

#### Hook para Notificações
```typescript
// src/hooks/useLevelUpNotifications.ts
export function useLevelUpNotifications() {
  const [notification, setNotification] = useState<{
    methodology: StudyMethodology;
    newLevel: number;
    newTitle: string;
  } | null>(null);

  const showLevelUpNotification = (newLevel: number, methodology: StudyMethodology) => {
    const newTitle = getTitleForLevel(methodology, newLevel);
    setNotification({ methodology, newLevel, newTitle });
  };

  const hideLevelUpNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    showLevelUpNotification,
    hideLevelUpNotification
  };
}
```

## 🧪 Testes de Integração

### 1. Teste Manual - Questões
```typescript
// Sequência de teste para questões
1. Acessar página de questões
2. Verificar se a barra de XP aparece
3. Responder 5 questões corretas seguidas
4. Verificar se o streak bonus é aplicado
5. Responder uma questão errada
6. Verificar se o streak reseta
7. Completar um quiz completo
8. Verificar se o bonus de quiz é aplicado
```

### 2. Teste Manual - Casos Clínicos
```typescript
// Sequência de teste para casos clínicos
1. Acessar página de casos clínicos
2. Iniciar um caso clínico
3. Verificar se o XP de início é registrado
4. Completar o caso com 100% de acerto
5. Verificar se todos os bonus são aplicados
6. Tentar completar um caso difícil rapidamente
7. Verificar bonus de velocidade e dificuldade
```

### 3. Verificação do Dashboard
```typescript
// Checklist do dashboard
1. ✅ Barras de XP por metodologia aparecem
2. ✅ Estatísticas são carregadas corretamente
3. ✅ Nível geral é calculado como média
4. ✅ Metodologia favorita é identificada
5. ✅ Títulos específicos são exibidos
```

## 📋 Próximos Passos

### Ordem de Implementação
1. **Integrar componentes de questões** ⏳
2. **Integrar casos clínicos** ⏳
3. **Atualizar dashboard** ⏳
4. **Testar sistema completo** ⏳
5. **Executar migração de dados** ⏳
6. **Deploy em produção** ⏳

### Arquivos a Modificar
```
src/components/questionSolver/QuestionSolver.tsx
src/components/clinicalCase/ClinicalCase.tsx
src/pages/Dashboard.tsx
src/components/dashboardPage/DashboardStats.tsx
src/components/dashboardPage/UserProfile.tsx
src/components/common/PageHeader.tsx
src/App.tsx (para notificações globais)
```

### Considerações Importantes
- ⚠️ **Backup**: Fazer backup dos dados de XP atuais antes da migração
- 🔒 **Segurança**: Validar dados no frontend antes de enviar para o backend
- 📊 **Performance**: Otimizar consultas ao Firestore para evitar leituras excessivas
- 🎨 **UX**: Garantir que as notificações não sejam invasivas
- 📱 **Responsivo**: Testar componentes em diferentes tamanhos de tela

### Comando para Integração
```bash
# Execute para implementar as integrações
npm run test:integration
npm run build
npm run preview
```

Este guia fornece todos os passos necessários para integrar o novo sistema de XP por metodologias com os componentes existentes do Chronos Pomodoro.