# 🔥 Firebase Firestore - Índices Necessários

## ⚠️ PROBLEMA ATUAL
A consulta do Firebase está falhando porque precisa de índices compostos.

**Erro:** `The query requires an index`

## 🔧 SOLUÇÃO APLICADA (TEMPORÁRIA)
Removemos o `orderBy('timestamp', 'desc')` das consultas e fazemos a ordenação no lado do cliente.

```typescript
// ANTES (requer índice composto):
const q = query(
  collection(db, 'userQuestionAttempts'),
  where('userId', '==', userId),
  orderBy('timestamp', 'desc')
);

// DEPOIS (funciona sem índice):
const q = query(
  collection(db, 'userQuestionAttempts'),
  where('userId', '==', userId)
);
// Ordenação feita no cliente: attempts.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
```

## 🎯 SOLUÇÃO DEFINITIVA - CRIAR ÍNDICES

Para melhorar a performance, você deve criar os seguintes índices no Firebase Console:

### 1. Índice para getUserAttempts()
- **Collection**: `userQuestionAttempts`
- **Fields**: 
  - `userId` (Ascending)
  - `timestamp` (Descending)

### 2. Índice para getUserQuestionAttempts()
- **Collection**: `userQuestionAttempts`
- **Fields**:
  - `userId` (Ascending)
  - `questionId` (Ascending)
  - `timestamp` (Descending)

## 🚀 COMO CRIAR OS ÍNDICES

### Opção 1: Via Console Firebase
1. Acesse: https://console.firebase.google.com/project/penapedplataforma/firestore/indexes
2. Clique em "Create Index"
3. Selecione a collection `userQuestionAttempts`
4. Adicione os campos listados acima

### Opção 2: Via Link Automático
Quando o erro aparecer no console, o Firebase fornece um link direto:
```
https://console.firebase.google.com/v1/r/project/penapedplataforma/firestore/indexes?create_composite=...
```

### Opção 3: Via arquivo firestore.indexes.json
```json
{
  "indexes": [
    {
      "collectionGroup": "userQuestionAttempts",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "userQuestionAttempts", 
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "questionId", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    }
  ]
}
```

## ✅ QUANDO CRIAR OS ÍNDICES

**Agora**: A aplicação funciona sem os índices (ordenação no cliente)
**Futuro**: Para melhor performance com muitos dados, crie os índices e restaure o `orderBy`

## 🔄 REVERTER PARA ORDERBY (APÓS CRIAR ÍNDICES)

Quando os índices estiverem criados, você pode reverter para:

```typescript
// getUserAttempts() com orderBy
const q = query(
  collection(db, this.COLLECTION_NAME),
  where('userId', '==', userId),
  orderBy('timestamp', 'desc')
);

// getUserQuestionAttempts() com orderBy
const q = query(
  collection(db, this.COLLECTION_NAME),
  where('userId', '==', userId),
  where('questionId', '==', questionId),
  orderBy('timestamp', 'desc')
);
```

---

**Status**: ✅ Problema resolvido temporariamente
**Próximo passo**: Criar índices para melhor performance