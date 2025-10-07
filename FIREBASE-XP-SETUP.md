# 🔥 Guia Completo: Configuração Firebase para Sistema XP

## 📋 **Estruturas Necessárias no Firestore**

O sistema de XP utiliza **3 coleções principais** no Firebase Firestore. Aqui está o guia completo para criar e configurar cada uma:

---

## 🗂️ **1. Coleção: `xp_activities`**

**Finalidade**: Registra todas as atividades que geram XP para os usuários.

### 📄 **Estrutura do Documento:**

```javascript
// Documento ID: auto-gerado
{
  userId: "string",              // ID do usuário (Firebase Auth)
  type: "string",                // Tipo da atividade (ver tipos abaixo)
  xpGained: number,              // Quantidade de XP ganho
  description: "string",         // Descrição da atividade
  metadata: {                    // Dados extras (opcional)
    questionId: "string",        // ID da questão (se aplicável)
    difficulty: "string",        // easy/medium/hard
    subject: "string",           // Matéria/assunto
    timeSpent: number,           // Tempo em minutos
    streak: number,              // Sequência (se aplicável)
    // ... outros campos dinâmicos
  },
  createdAt: Timestamp          // Data/hora da atividade
}
```

### 🎯 **Tipos de Atividades (ActivityType):**

```javascript
// Tipos válidos para o campo 'type':
- "question_correct"           // Resposta correta
- "question_incorrect"         // Resposta incorreta
- "daily_login"               // Login diário
- "streak_milestone"          // Marco de sequência
- "quiz_completed"            // Quiz completado
- "study_session"             // Sessão de estudo
- "clinical_case_completed"   // Caso clínico completado
- "achievement_unlocked"      // Conquista desbloqueada
```

### 📝 **Exemplo de Documento:**

```javascript
{
  userId: "abc123def456",
  type: "quiz_completed",
  xpGained: 50,
  description: "Quiz completado com sucesso",
  metadata: {
    questionId: "quest_001",
    difficulty: "medium",
    subject: "Cardiologia",
    timeSpent: 5,
    accuracy: 85
  },
  createdAt: Timestamp("2025-10-06T21:30:00Z")
}
```

---

## 👤 **2. Coleção: `user_levels`**

**Finalidade**: Mantém o nível atual e XP total de cada usuário.

### 📄 **Estrutura do Documento:**

```javascript
// Documento ID: userId (mesmo ID do Firebase Auth)
{
  userId: "string",              // ID do usuário
  currentLevel: number,          // Nível atual (1, 2, 3...)
  currentXP: number,             // XP no nível atual
  totalXP: number,               // XP total acumulado
  xpToNextLevel: number,         // XP necessário para próximo nível
  lastLevelUp: Timestamp,        // Última vez que subiu de nível (opcional)
  updatedAt: Timestamp           // Última atualização
}
```

### 📝 **Exemplo de Documento:**

```javascript
// Documento ID: "abc123def456"
{
  userId: "abc123def456",
  currentLevel: 3,
  currentXP: 75,                 // 75 XP no nível 3
  totalXP: 425,                  // 425 XP total acumulado
  xpToNextLevel: 150,            // Precisa de 150 XP para nível 4
  lastLevelUp: Timestamp("2025-10-05T10:15:00Z"),
  updatedAt: Timestamp("2025-10-06T21:30:00Z")
}
```

---

## 🏆 **3. Coleção: `user_achievements`**

**Finalidade**: Registra as conquistas/achievements desbloqueadas pelos usuários.

### 📄 **Estrutura do Documento:**

```javascript
// Documento ID: auto-gerado
{
  userId: "string",              // ID do usuário
  achievementId: "string",       // ID da conquista
  unlockedAt: Timestamp,         // Quando foi desbloqueada
  progress: number,              // Progresso atual (opcional)
  maxProgress: number            // Progresso máximo (opcional)
}
```

### 📝 **Exemplo de Documento:**

```javascript
{
  userId: "abc123def456",
  achievementId: "first_correct_answer",
  unlockedAt: Timestamp("2025-10-06T15:45:00Z"),
  progress: 1,
  maxProgress: 1
}
```

---

## 🛠️ **Como Criar no Firebase Console**

### **Passo 1: Acessar Firestore**
1. Vá para [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Clique em **"Firestore Database"** no menu lateral
4. Se ainda não criou, clique **"Criar banco de dados"**

### **Passo 2: Criar as Coleções**

#### 🗂️ **Coleção `xp_activities`:**
1. Clique **"Iniciar coleção"**
2. ID da coleção: `xp_activities`
3. Adicione primeiro documento com campos de exemplo:
   ```
   userId: abc123 (string)
   type: quiz_completed (string)
   xpGained: 50 (number)
   description: Teste inicial (string)
   createdAt: [timestamp atual]
   ```

#### 👤 **Coleção `user_levels`:**
1. Clique **"Iniciar coleção"**
2. ID da coleção: `user_levels`
3. Adicione documento com ID personalizado (seu userID):
   ```
   ID do documento: abc123 (seu Firebase Auth UID)
   
   Campos:
   userId: abc123 (string)
   currentLevel: 1 (number)
   currentXP: 0 (number)
   totalXP: 0 (number)
   xpToNextLevel: 100 (number)
   updatedAt: [timestamp atual]
   ```

#### 🏆 **Coleção `user_achievements`:**
1. Clique **"Iniciar coleção"**
2. ID da coleção: `user_achievements`
3. Adicione documento de exemplo:
   ```
   userId: abc123 (string)
   achievementId: welcome (string)
   unlockedAt: [timestamp atual]
   ```

---

## 🔒 **Regras de Segurança (Firestore Rules)**

Adicione estas regras no **Firestore Rules** para proteger os dados:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Regras para xp_activities
    match /xp_activities/{activityId} {
      // Usuários só podem ler suas próprias atividades
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      // Só o sistema/servidor pode criar atividades
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
      // Não permite edição ou exclusão
      allow update, delete: if false;
    }
    
    // Regras para user_levels
    match /user_levels/{userId} {
      // Usuários podem ler apenas seu próprio nível
      allow read: if request.auth != null && request.auth.uid == userId;
      // Só o sistema pode criar/atualizar níveis
      allow create, update: if request.auth != null && request.auth.uid == userId;
      // Não permite exclusão
      allow delete: if false;
    }
    
    // Regras para user_achievements
    match /user_achievements/{achievementId} {
      // Usuários só podem ler suas próprias conquistas
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      // Só o sistema pode criar conquistas
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
      // Não permite edição ou exclusão
      allow update, delete: if false;
    }
  }
}
```

---

## 📊 **Índices Recomendados**

No **Firebase Console > Firestore > Índices**, crie estes índices compostos:

### **1. Índice para `xp_activities`:**
```
Coleção: xp_activities
Campos: 
  - userId (Ascending)
  - createdAt (Descending)
```

### **2. Índice para `user_achievements`:**
```
Coleção: user_achievements
Campos:
  - userId (Ascending)  
  - unlockedAt (Descending)
```

---

## 🧪 **Teste Inicial - Script de Dados**

Execute este script no **Console do Firebase** para criar dados de teste:

```javascript
// Dados de teste para xp_activities
await db.collection('xp_activities').add({
  userId: "SEU_USER_ID_AQUI",
  type: "quiz_completed",
  xpGained: 50,
  description: "Quiz completado com sucesso",
  metadata: {
    questionId: "quest_001",
    difficulty: "medium",
    subject: "Teste"
  },
  createdAt: firebase.firestore.Timestamp.now()
});

// Dados de teste para user_levels
await db.collection('user_levels').doc("SEU_USER_ID_AQUI").set({
  userId: "SEU_USER_ID_AQUI",
  currentLevel: 1,
  currentXP: 50,
  totalXP: 50,
  xpToNextLevel: 50,
  updatedAt: firebase.firestore.Timestamp.now()
});

console.log("✅ Dados de teste criados!");
```

---

## 🚀 **Checklist de Configuração**

- [ ] ✅ Coleção `xp_activities` criada
- [ ] ✅ Coleção `user_levels` criada  
- [ ] ✅ Coleção `user_achievements` criada
- [ ] ✅ Regras de segurança configuradas
- [ ] ✅ Índices compostos criados
- [ ] ✅ Dados de teste adicionados
- [ ] ✅ Permissões de leitura/escrita testadas

---

## 💡 **Dicas Importantes**

1. **IDs dos Documentos**: 
   - `user_levels` usa o Firebase Auth UID como ID do documento
   - `xp_activities` e `user_achievements` usam IDs auto-gerados

2. **Timestamps**: 
   - Use sempre `Timestamp.now()` do Firestore
   - Não use `Date()` JavaScript

3. **Escalabilidade**:
   - Considere sharding para usuários com muitas atividades
   - Use paginação nas consultas de atividades

4. **Backup**:
   - Configure backup automático no Firebase
   - Exporte dados periodicamente

Com essa estrutura, seu sistema de XP estará funcionando perfeitamente! 🎉