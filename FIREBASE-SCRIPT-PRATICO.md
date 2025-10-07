# 🔧 Script Prático - Firebase Console

## 🚀 **Passo a Passo: Configuração Rápida no Firebase Console**

### **1. Abrir Firebase Console**
1. Acesse: https://console.firebase.google.com/
2. Selecione seu projeto `chronos-pomodoro`
3. Vá em **Firestore Database**

---

### **2. Criar Coleções Automaticamente**

#### 📋 **Script para Copiar e Colar:**

```javascript
// ===== SCRIPT DE CONFIGURAÇÃO FIREBASE XP =====
// Copie e cole este código no Console do Browser (F12)

// 1. Criar estrutura básica para um usuário teste
const userId = "USER_TEST_123"; // Substitua pelo seu Firebase Auth UID

// 2. Dados para user_levels
const userLevelData = {
  userId: userId,
  currentLevel: 1,
  currentXP: 0,
  totalXP: 0,
  xpToNextLevel: 100,
  updatedAt: firebase.firestore.Timestamp.now()
};

// 3. Dados para primeira atividade
const firstActivity = {
  userId: userId,
  type: "daily_login",
  xpGained: 5,
  description: "Primeira atividade - Bem-vindo!",
  metadata: {
    source: "initial_setup",
    welcome: true
  },
  createdAt: firebase.firestore.Timestamp.now()
};

// 4. Dados para primeiro achievement
const firstAchievement = {
  userId: userId,
  achievementId: "welcome_aboard",
  unlockedAt: firebase.firestore.Timestamp.now(),
  progress: 1,
  maxProgress: 1
};

// 5. Executar criação
async function setupXPStructure() {
  try {
    console.log("🚀 Iniciando configuração XP...");
    
    // Criar documento user_levels
    await firebase.firestore()
      .collection('user_levels')
      .doc(userId)
      .set(userLevelData);
    console.log("✅ user_levels criado");
    
    // Criar primeira atividade
    await firebase.firestore()
      .collection('xp_activities')
      .add(firstActivity);
    console.log("✅ xp_activities criado");
    
    // Criar primeiro achievement
    await firebase.firestore()
      .collection('user_achievements')
      .add(firstAchievement);
    console.log("✅ user_achievements criado");
    
    console.log("🎉 Estrutura XP configurada com sucesso!");
    console.log("📊 Coleções criadas:");
    console.log("  - user_levels");
    console.log("  - xp_activities"); 
    console.log("  - user_achievements");
    
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

// 6. Executar
setupXPStructure();
```

---

### **3. Verificar Criação**

Após executar o script, você deve ver no Firestore:

```
📁 user_levels
  └── 📄 USER_TEST_123
      ├── userId: "USER_TEST_123"
      ├── currentLevel: 1
      ├── currentXP: 0
      ├── totalXP: 0
      ├── xpToNextLevel: 100
      └── updatedAt: [timestamp]

📁 xp_activities  
  └── 📄 [auto-generated-id]
      ├── userId: "USER_TEST_123"
      ├── type: "daily_login"
      ├── xpGained: 5
      ├── description: "Primeira atividade..."
      ├── metadata: {...}
      └── createdAt: [timestamp]

📁 user_achievements
  └── 📄 [auto-generated-id]
      ├── userId: "USER_TEST_123"
      ├── achievementId: "welcome_aboard"
      ├── unlockedAt: [timestamp]
      ├── progress: 1
      └── maxProgress: 1
```

---

### **4. Dados de Exemplo Avançados**

Para criar mais dados de teste, use este script adicional:

```javascript
// ===== DADOS DE EXEMPLO AVANÇADOS =====

const sampleActivities = [
  {
    userId: userId,
    type: "quiz_completed",
    xpGained: 50,
    description: "Quiz de Cardiologia completado",
    metadata: {
      questionId: "quest_001",
      difficulty: "medium",
      subject: "Cardiologia",
      timeSpent: 5,
      accuracy: 85
    },
    createdAt: firebase.firestore.Timestamp.now()
  },
  {
    userId: userId,
    type: "question_correct",
    xpGained: 15,
    description: "Resposta correta - Pneumologia",
    metadata: {
      questionId: "quest_002",
      difficulty: "medium",
      subject: "Pneumologia"
    },
    createdAt: firebase.firestore.Timestamp.fromDate(new Date(Date.now() - 3600000))
  },
  {
    userId: userId,
    type: "streak_milestone",
    xpGained: 50,
    description: "7 dias de login consecutivo",
    metadata: {
      streak: 7,
      milestoneType: "weekly"
    },
    createdAt: firebase.firestore.Timestamp.fromDate(new Date(Date.now() - 86400000))
  }
];

// Função para criar atividades de exemplo
async function createSampleData() {
  try {
    console.log("📊 Criando dados de exemplo...");
    
    for (let i = 0; i < sampleActivities.length; i++) {
      await firebase.firestore()
        .collection('xp_activities')
        .add(sampleActivities[i]);
      console.log(`✅ Atividade ${i + 1} criada`);
    }
    
    // Atualizar user_levels com novo total
    const totalXP = 5 + 50 + 15 + 50; // 120 XP total
    await firebase.firestore()
      .collection('user_levels')
      .doc(userId)
      .update({
        currentLevel: 2,
        currentXP: 20,
        totalXP: totalXP,
        xpToNextLevel: 80,
        updatedAt: firebase.firestore.Timestamp.now()
      });
    
    console.log("🎉 Dados de exemplo criados!");
    console.log(`📈 Total XP: ${totalXP}`);
    console.log("🎯 Nível: 2");
    
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

// Executar
createSampleData();
```

---

### **5. Configurar Regras de Segurança**

No **Firestore > Regras**, substitua por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // XP Activities - só o próprio usuário pode ler
    match /xp_activities/{activityId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
      allow update, delete: if false;
    }
    
    // User Levels - só o próprio usuário
    match /user_levels/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow delete: if false;
    }
    
    // User Achievements - só o próprio usuário
    match /user_achievements/{achievementId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
      allow update, delete: if false;
    }
  }
}
```

---

### **6. Criar Índices (Opcional)**

Se você tiver muitas atividades, crie este índice:

1. Vá em **Firestore > Índices**
2. Clique **"Criar índice"**
3. Configure:
   ```
   Coleção: xp_activities
   Campos: 
     - userId (Crescente)
     - createdAt (Decrescente)
   ```

---

### **7. Testar no App**

1. **Faça login** no seu app com o usuário de teste
2. **Vá para uma questão** que usa `UniversalQuestionSolver`
3. **Verifique** se o componente `UserXPDisplay` mostra os dados
4. **Complete uma questão** e veja se XP aumenta

---

### **8. Debug Comum**

Se não aparecer XP:

```javascript
// Script de debug no Console
const debugUserId = "SEU_USER_ID_REAL";

firebase.firestore()
  .collection('user_levels')
  .doc(debugUserId)
  .get()
  .then(doc => {
    if (doc.exists) {
      console.log("✅ Dados encontrados:", doc.data());
    } else {
      console.log("❌ Usuário não encontrado no user_levels");
      console.log("💡 Execute o script de configuração inicial");
    }
  });
```

---

## 🎯 **Resultado Final**

Após seguir estes passos, você terá:

- ✅ **3 coleções** funcionais no Firestore
- ✅ **Dados de exemplo** para testar
- ✅ **Regras de segurança** configuradas
- ✅ **Índices** otimizados
- ✅ **Sistema XP** funcionando no app

**Total de tempo:** ~10 minutos ⏱️