# 🔥 ÍNDICES NECESSÁRIOS PARA userQuestionAttempts

## 📋 ÍNDICES ATUAIS NO FIRESTORE
Baseado na imagem fornecida, você já tem índices para:
- ✅ user_answers (userId, createdAt, __name__)
- ✅ xp_activities (userId, createdAt, __name__)
- ✅ user_achievements (userId, achievementId, __name__)
- ✅ study_sessions (userId, startTime, __name__)

## ❌ ÍNDICES FALTANDO
**Collection:** `userQuestionAttempts` - **NENHUM ÍNDICE CRIADO**

## 🚀 CRIAR OS ÍNDICES NECESSÁRIOS

### 1. Índice Principal (userId + timestamp)
**Collection ID:** `userQuestionAttempts`
**Fields indexed:**
- `userId` (Ascending)
- `timestamp` (Descending)
- `__name__` (Ascending) - automático

### 2. Índice para Questão Específica (userId + questionId + timestamp)  
**Collection ID:** `userQuestionAttempts`
**Fields indexed:**
- `userId` (Ascending)
- `questionId` (Ascending)
- `timestamp` (Descending)
- `__name__` (Ascending) - automático

## 🛠️ COMO CRIAR NO FIREBASE CONSOLE

1. **Acesse:** https://console.firebase.google.com/project/penapedplataforma/firestore/indexes

2. **Clique em "Create Index"**

3. **Primeiro Índice:**
   - Collection ID: `userQuestionAttempts`
   - Add field: `userId` → Ascending
   - Add field: `timestamp` → Descending
   - Query scope: Collection
   - Clique "Create"

4. **Segundo Índice:**
   - Collection ID: `userQuestionAttempts`
   - Add field: `userId` → Ascending
   - Add field: `questionId` → Ascending  
   - Add field: `timestamp` → Descending
   - Query scope: Collection
   - Clique "Create"

## ⏱️ TEMPO DE CRIAÇÃO
- Índices levam alguns minutos para serem criados
- Status aparecerá como "Building" → "Enabled"

## 🔄 APÓS CRIAR OS ÍNDICES

Quando os índices estiverem criados (status "Enabled"), podemos otimizar as consultas restaurando o `orderBy`:

```typescript
// Restaurar esta funcionalidade otimizada:
const q = query(
  collection(db, this.COLLECTION_NAME),
  where('userId', '==', userId),
  orderBy('timestamp', 'desc')  // ← Isso funcionará após criar o índice
);
```

---

**🎯 Ação Necessária:** Criar os 2 índices listados acima no Firebase Console