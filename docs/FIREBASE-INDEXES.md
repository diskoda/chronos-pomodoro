# 🔥 Firebase Indexes - Sistema XP por Metodologias

## 📋 Índices Necessários no Firestore

### 1. **methodology_levels**
```javascript
// Índice composto para buscar níveis por usuário e metodologia
Collection: methodology_levels
Fields:
- userId (Ascending)
- methodology (Ascending)

// Índice para ranking por metodologia
Collection: methodology_levels
Fields:
- methodology (Ascending)
- currentLevel (Descending)
- totalXP (Descending)

// Índice para buscar por data de atualização
Collection: methodology_levels
Fields:
- userId (Ascending)
- updatedAt (Descending)
```

### 2. **methodology_xp_activities**
```javascript
// Índice para histórico de atividades por usuário
Collection: methodology_xp_activities
Fields:
- userId (Ascending)
- createdAt (Descending)

// Índice para atividades por metodologia e usuário
Collection: methodology_xp_activities
Fields:
- userId (Ascending)
- methodology (Ascending)
- createdAt (Descending)

// Índice para filtrar por tipo de atividade
Collection: methodology_xp_activities
Fields:
- userId (Ascending)
- methodology (Ascending)
- activityType (Ascending)
- createdAt (Descending)

// Índice para analytics e relatórios
Collection: methodology_xp_activities
Fields:
- methodology (Ascending)
- activityType (Ascending)
- createdAt (Descending)
```

### 3. **methodology_stats**
```javascript
// Índice simples por usuário
Collection: methodology_stats
Fields:
- userId (Ascending)

// Índice para ranking geral
Collection: methodology_stats
Fields:
- overallStats.totalLevel (Descending)
- overallStats.totalXP (Descending)
```

### 4. **user_overall_levels**
```javascript
// Índice para ranking geral
Collection: user_overall_levels
Fields:
- overallLevel (Descending)
- totalXP (Descending)

// Índice por data de atualização
Collection: user_overall_levels
Fields:
- updatedAt (Descending)
```

## 🛠️ Como Criar os Índices

### Opção 1: Firebase Console (Recomendado)
1. Acesse: https://console.firebase.google.com/
2. Selecione seu projeto
3. Vá em **Firestore Database** → **Indexes**
4. Clique em **Create Index**
5. Configure cada índice conforme especificado acima

### Opção 2: Firebase CLI
```bash
# 1. Instalar Firebase CLI (se não tiver)
npm install -g firebase-tools

# 2. Fazer login
firebase login

# 3. Inicializar projeto (na pasta do projeto)
firebase init firestore

# 4. Editar firestore.indexes.json (ver seção abaixo)

# 5. Deploy dos índices
firebase deploy --only firestore:indexes
```

### Opção 3: Arquivo firestore.indexes.json
Crie/edite o arquivo `firestore.indexes.json` na raiz do projeto:

```json
{
  "indexes": [
    {
      "collectionGroup": "methodology_levels",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "methodology", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "methodology_levels",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "methodology", "order": "ASCENDING" },
        { "fieldPath": "currentLevel", "order": "DESCENDING" },
        { "fieldPath": "totalXP", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "methodology_levels",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "updatedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "methodology_xp_activities",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "methodology_xp_activities",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "methodology", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "methodology_xp_activities",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "methodology", "order": "ASCENDING" },
        { "fieldPath": "activityType", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "methodology_xp_activities",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "methodology", "order": "ASCENDING" },
        { "fieldPath": "activityType", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "user_overall_levels",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "overallLevel", "order": "DESCENDING" },
        { "fieldPath": "totalXP", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "user_overall_levels",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "updatedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "methodology_stats",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

## ⚠️ Considerações Importantes

### 📊 **Custo dos Índices**
- Cada índice consome espaço de armazenamento
- Escritas ficam mais lentas com muitos índices
- Monitore o uso através do console Firebase

### 🚀 **Performance**
- Índices compostos são específicos para as consultas exatas
- Use apenas os índices necessários
- Firestore sugere índices automaticamente nas consultas

### 🔄 **Tempo de Criação**
- Índices podem demorar para serem criados em coleções grandes
- O status aparece no Firebase Console
- Consultas falham até o índice estar pronto

## 🧪 Teste dos Índices

Após criar os índices, teste as principais consultas:

```javascript
// Teste 1: Buscar níveis de um usuário
const userLevels = await getDocs(
  query(
    collection(db, 'methodology_levels'),
    where('userId', '==', 'user123')
  )
);

// Teste 2: Ranking por metodologia
const ranking = await getDocs(
  query(
    collection(db, 'methodology_levels'),
    where('methodology', '==', 'questions'),
    orderBy('currentLevel', 'desc'),
    orderBy('totalXP', 'desc'),
    limit(10)
  )
);

// Teste 3: Histórico de atividades
const activities = await getDocs(
  query(
    collection(db, 'methodology_xp_activities'),
    where('userId', '==', 'user123'),
    where('methodology', '==', 'questions'),
    orderBy('createdAt', 'desc'),
    limit(20)
  )
);
```

## 📝 Checklist de Implementação

- [ ] Criar índices no Firebase Console
- [ ] Aguardar conclusão da criação (pode demorar)
- [ ] Testar consultas principais
- [ ] Monitorar performance
- [ ] Verificar custos no console
- [ ] Implementar cache quando necessário

## 🔧 Comandos Úteis

```bash
# Ver status dos índices
firebase firestore:indexes

# Deploy apenas dos índices
firebase deploy --only firestore:indexes

# Verificar regras de segurança
firebase firestore:rules

# Backup antes de mudanças grandes
gcloud firestore export gs://[BUCKET_NAME]/[EXPORT_PREFIX]
```

Estes índices garantem que todas as consultas do sistema XP por metodologias funcionem de forma otimizada e escalável.