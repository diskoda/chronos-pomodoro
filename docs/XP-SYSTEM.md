# Sistema de XP e Níveis - Chronos Pomodoro

## 🎮 Visão Geral

Sistema completo de gamificação com experiência (XP), níveis, conquistas e progressão integrado ao Firebase. Desenvolvido para motivar e engajar estudantes de medicina através de recompensas por atividades de estudo.

## 📁 Estrutura do Sistema

```
src/
├── types/
│   └── xp.ts                    # Interfaces e tipos do sistema XP
├── data/
│   └── levels.ts                # Definições de níveis e conquistas
├── services/
│   └── xpService.ts             # Serviços Firebase para XP
├── hooks/
│   └── useXP.ts                 # Hook React para gerenciar XP
├── components/
│   └── xp/
│       ├── XPBar.tsx            # Barra de progresso de nível
│       ├── AchievementCard.tsx  # Cartões de conquistas
│       ├── XPNotification.tsx   # Notificações de XP ganho
│       └── index.ts             # Exportações
└── examples/
    └── XPSystemExample.tsx      # Página de demonstração
```

## 🎯 Funcionalidades

### 🔥 Sistema de XP
- **8 tipos de atividades** que geram XP
- **Multiplicadores** baseados em dificuldade
- **Progressão exponencial** de níveis
- **50 níveis** disponíveis

### 🏆 Sistema de Conquistas
- **12+ conquistas** organizadas por categoria
- **4 raridades**: Common, Rare, Epic, Legendary
- **Progresso automático** baseado em atividades
- **Recompensas de XP** por conquista

### 📊 Sistema de Níveis
- **Progressão exponencial**: cada nível requer mais XP
- **Títulos especiais**: Iniciante → Lenda
- **Recompensas por marco**: badges e recursos desbloqueados
- **Cores distintivas** por faixa de nível

## 🎮 Atividades que Geram XP

| Atividade | XP Base | Multiplicadores | Descrição |
|-----------|---------|-----------------|-----------|
| **Questão Correta** | 10 | Fácil: 1x, Médio: 1.5x, Difícil: 2x | Resposta correta |
| **Questão Incorreta** | 2 | - | Tentativa vale pontos |
| **Login Diário** | 5 | - | Manter consistência |
| **Marco de Streak** | 50 | 7 dias: 1x, 30 dias: 3x, 100 dias: 10x | Milestones de consistência |
| **Quiz Concluído** | 25 | - | Finalizar quiz completo |
| **Sessão de Estudo** | 15 | - | Tempo dedicado |
| **Caso Clínico** | 30 | Fácil: 1x, Médio: 1.5x, Difícil: 2x | Casos complexos |
| **Conquista** | Variável | - | Definido por conquista |

## 🏅 Conquistas Disponíveis

### 📚 Estudos
- **Primeira Resposta** (🎯): Responder primeira questão - 20 XP
- **Perfeccionista** (💎): 10 questões seguidas corretas - 100 XP
- **Centenário** (💯): 100 questões corretas - 200 XP

### 🔥 Consistência
- **Guerreiro da Semana** (🔥): 7 dias consecutivos - 75 XP
- **Mestre do Mês** (🏆): 30 dias consecutivos - 300 XP

### ⚡ Especiais
- **Demônio da Velocidade** (⚡): Resposta em <10s - 50 XP
- **Coruja Noturna** (🦉): Estudar após meia-noite - 25 XP
- **Madrugador** (🐦): Estudar antes das 6h - 30 XP

### 🎖️ Marcos
- **Ascensão** (⬆️): Nível 5 - 100 XP
- **Determinação** (🎖️): Nível 10 - 200 XP
- **Lendário** (👑): Nível 25 - 500 XP

## 📈 Progressão de Níveis

### Cálculo de XP
```typescript
// XP necessário para o nível N
xpRequired = 100 * (1.15 ^ (level - 1))

// Exemplos:
Nível 2: 115 XP
Nível 5: 175 XP
Nível 10: 405 XP
Nível 20: 1,637 XP
Nível 50: 108,366 XP
```

### Títulos por Nível
- **1-4**: Iniciante (Cinza)
- **5-9**: Aprendiz (Azul)
- **10-14**: Competente (Verde)
- **15-19**: Avançado (Âmbar)
- **20-29**: Especialista (Laranja)
- **30-39**: Mestre (Vermelho)
- **40-50**: Lenda (Roxo)

### Recompensas Especiais
- **Nível 5**: Temas personalizados
- **Nível 10**: Estatísticas avançadas
- **Nível 20**: Modo especialista
- **Nível 30**: Modo mentor
- **Nível 50**: Todos os recursos

## 💾 Integração Firebase

### Coleções Firestore
```
xp_activities/       # Atividades de XP do usuário
user_levels/         # Níveis e XP dos usuários
user_achievements/   # Conquistas desbloqueadas
```

### Estrutura de Dados

#### XPActivity
```typescript
{
  userId: string;
  type: ActivityType;
  xpGained: number;
  description: string;
  metadata: {
    difficulty?: string;
    timeSpent?: number;
    subject?: string;
  };
  createdAt: Timestamp;
}
```

#### UserLevel
```typescript
{
  userId: string;
  currentLevel: number;
  currentXP: number;
  totalXP: number;
  xpToNextLevel: number;
  lastLevelUp?: Timestamp;
  updatedAt: Timestamp;
}
```

#### UserAchievement
```typescript
{
  userId: string;
  achievementId: string;
  unlockedAt: Timestamp;
  progress?: number;
  maxProgress?: number;
}
```

## 🚀 Como Usar

### 1. Hook useXP
```typescript
import { useXP } from '../hooks/useXP';

const {
  userLevel,
  userStats,
  recordQuestionAnswer,
  recordStudySession,
  getTotalXPToday
} = useXP();

// Registrar resposta de questão
const result = await recordQuestionAnswer(true, 'medium', 30, 'Cardiologia');

// Registrar sessão de estudo
await recordStudySession(45, 'Neurologia');
```

### 2. Componente XPBar
```typescript
import { XPBar } from '../components/xp';

<XPBar 
  userLevel={userLevel} 
  showDetails={true} 
  size="lg" 
/>
```

### 3. Sistema de Notificações
```typescript
import { useXPNotification, XPNotification } from '../components/xp';

const { notification, showNotification, hideNotification } = useXPNotification();

// Mostrar notificação
showNotification({
  xpGained: 15,
  activityType: 'question_correct',
  description: 'Questão correta (médio)',
  leveledUp: false
});

// Componente
<XPNotification
  show={notification.show}
  onClose={hideNotification}
  {...notification}
/>
```

### 4. Grade de Conquistas
```typescript
import { AchievementGrid } from '../components/xp';

<AchievementGrid 
  userAchievements={userAchievements}
  showLocked={true}
  category="study"
/>
```

## 🎨 Exemplos de Integração

### Em uma Questão
```typescript
const handleAnswerSubmit = async (isCorrect: boolean) => {
  // Lógica da questão...
  
  // Registrar XP
  const result = await recordQuestionAnswer(
    isCorrect, 
    question.difficulty, 
    timeSpent,
    question.subject
  );
  
  // Mostrar notificação
  if (result) {
    showNotification({
      xpGained: result.xpGained,
      activityType: isCorrect ? 'question_correct' : 'question_incorrect',
      description: `Questão ${isCorrect ? 'correta' : 'incorreta'}`,
      leveledUp: result.leveledUp,
      newLevel: result.newLevel
    });
  }
};
```

### No Dashboard
```typescript
// Mostrar progresso do usuário
<div className="dashboard-xp">
  <XPBar userLevel={userLevel} showDetails={true} />
  
  <div className="stats">
    <div>XP Hoje: {getTotalXPToday()}</div>
    <div>Streak: {userStats?.currentStreak || 0}</div>
    <div>Conquistas: {userAchievements.length}</div>
  </div>
</div>
```

### Em Sessões de Estudo
```typescript
const handleStudyComplete = async () => {
  const duration = Math.floor((Date.now() - startTime) / 1000 / 60);
  
  await recordStudySession(duration, selectedSubject);
  
  // Verificar marcos de tempo
  if (duration >= 60) {
    // Possível conquista de sessão longa
  }
};
```

## 📊 Métricas e Analytics

### Estatísticas Disponíveis
- XP total e por assunto
- Atividades por tipo
- Streak atual e melhor
- Progresso em conquistas
- Histórico de atividades

### Relatórios
```typescript
const stats = useXPStats();

// Estatísticas gerais
const {
  currentLevel,
  totalXP,
  xpToNextLevel,
  totalActivities,
  currentStreak,
  achievementCount
} = stats;
```

## 🔧 Configuração e Personalização

### Configurar XP por Atividade
```typescript
// Em src/types/xp.ts
export const XP_CONFIG = {
  question_correct: {
    base: 10,
    multipliers: { easy: 1, medium: 1.5, hard: 2 }
  }
  // ... outras atividades
};
```

### Adicionar Nova Conquista
```typescript
// Em src/data/levels.ts
{
  id: 'nova_conquista',
  name: 'Novo Título',
  description: 'Descrição da conquista',
  icon: '🎉',
  xpReward: 100,
  category: 'study',
  requirements: {
    type: 'question_correct',
    conditions: { total: 50 }
  },
  rarity: 'rare'
}
```

## 🧪 Teste o Sistema

### Página de Demonstração
Acesse: `http://localhost:5174/xp-system`

### Funcionalidades de Teste
- Simular todas as atividades
- Ver notificações em tempo real
- Acompanhar progresso de nível
- Visualizar conquistas
- Monitorar estatísticas

## 🚀 Produção

### Regras do Firestore
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // XP activities
    match /xp_activities/{activityId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.userId;
    }
    
    // User levels
    match /user_levels/{userId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == userId;
    }
    
    // User achievements
    match /user_achievements/{achievementId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Índices Necessários
- `xp_activities`: `userId` + `createdAt` (desc)
- `xp_activities`: `userId` + `type` + `createdAt` (desc)
- `user_achievements`: `userId` + `unlockedAt` (desc)

## 🎯 Benefícios do Sistema

### Para Estudantes
- **Motivação**: Recompensas por progresso
- **Engajamento**: Mecânicas de jogo
- **Progresso Visual**: Acompanhar evolução
- **Reconhecimento**: Conquistas e títulos

### Para Educadores
- **Analytics**: Métricas de engajamento
- **Progressão**: Acompanhar desenvolvimento
- **Gamificação**: Tornar estudo divertido
- **Retenção**: Manter estudantes ativos

### Para Plataforma
- **Retenção**: Usuários mais engajados
- **Dados**: Insights de comportamento
- **Diferencial**: Sistema único
- **Escalabilidade**: Arquitetura robusta

O sistema está pronto para produção e pode ser facilmente expandido com novas funcionalidades! 🚀