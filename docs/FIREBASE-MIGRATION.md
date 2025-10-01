# Migração do Banco de Questões para Firebase

Este documento descreve como migrar e gerenciar o banco de questões usando Firebase Firestore.

## 📋 Índice

1. [Estrutura dos Serviços](#estrutura-dos-serviços)
2. [Hooks React](#hooks-react)
3. [Migração de Dados](#migração-de-dados)
4. [Como Usar](#como-usar)
5. [Administração](#administração)
6. [Troubleshooting](#troubleshooting)

## 🏗️ Estrutura dos Serviços

### QuestionsService (`src/services/questionsService.ts`)

Serviço principal para gerenciar questões no Firestore:

- **CRUD Operations**: Create, Read, Update, Delete
- **Filtros Avançados**: Por categoria, dificuldade, exame, tags
- **Busca por Texto**: Título, conteúdo e tags
- **Estatísticas**: Análise de performance e dados
- **Migração**: Utilitários para migrar dados locais

#### Principais Métodos:

```typescript
// Buscar todas as questões
questionsService.getAllQuestions()

// Buscar com filtros
questionsService.getQuestionsWithFilters({
  category: 'Pediatria',
  difficulty: 'Médio',
  searchText: 'asma'
})

// Buscar por ID
questionsService.getQuestionById(1)

// Criar questão
questionsService.createQuestion(questionData)

// Atualizar questão
questionsService.updateQuestion(id, updates)

// Migrar dados locais
questionsService.migrateLocalQuestions(localQuestions)
```

## 🎣 Hooks React

### useQuestions

Hook para buscar todas as questões:

```typescript
const { questions, loading, error, refetch } = useQuestions();
```

### useQuestionsWithFilters

Hook para buscar questões com filtros:

```typescript
const filters = {
  category: 'Pediatria',
  difficulty: 'Médio',
  searchText: 'broncoespasmo'
};

const { questions, loading, error } = useQuestionsWithFilters(filters);
```

### useQuestion

Hook para buscar uma questão específica:

```typescript
const { question, loading, error } = useQuestion(questionId);
```

### useQuestionActions

Hook para ações de CRUD:

```typescript
const { 
  createQuestion, 
  updateQuestion, 
  deleteQuestion, 
  toggleCompletion,
  migrateLocalQuestions,
  loading,
  error 
} = useQuestionActions();
```

### useQuestionsStats

Hook para estatísticas:

```typescript
const { stats, loading, error } = useQuestionsStats();

// stats contém:
// - total: número total de questões
// - completed: questões completadas
// - avgCorrectRate: taxa média de acerto
// - byDifficulty: questões por dificuldade
// - byCategory: questões por categoria
```

## 🔄 Migração de Dados

### Utilitário de Migração (`src/utils/questionMigration.ts`)

#### Migração Completa

```typescript
import { migrateAllQuestions } from '../utils/questionMigration';

// Migrar todas as questões locais
await migrateAllQuestions();
```

#### Migração por Exame

```typescript
import { migrateQuestionsByExam } from '../utils/questionMigration';

// Migrar questões de um exame específico
await migrateQuestionsByExam('USP-SP 2025');
```

#### Verificação da Migração

```typescript
import { verifyMigration } from '../utils/questionMigration';

const result = await verifyMigration();
console.log('Migração válida:', result.isValid);
console.log('Total local:', result.localCount);
console.log('Total Firebase:', result.firebaseCount);
```

#### Comparação de Estatísticas

```typescript
import { getComparisonStats } from '../utils/questionMigration';

await getComparisonStats(); // Exibe no console
```

## 🚀 Como Usar

### 1. Primeira Migração

**Opção A: Interface de Administração**

1. Navegue para `/admin/questions` (criar rota se necessário)
2. Use o componente `QuestionsAdmin` para migrar via interface
3. Clique em "Migrar Questões"
4. Aguarde a conclusão e verificação

**Opção B: Script de Migração**

```bash
# Executar script de migração
node scripts/migrate-questions.js
```

**Opção C: Console do Navegador**

```javascript
// No console do navegador (página da aplicação)
import { migrateAllQuestions } from './src/utils/questionMigration';
await migrateAllQuestions();
```

### 2. Atualizar Componentes

Os componentes já foram atualizados para usar Firebase:

- ✅ `QuestionsBank.tsx` - Usa `useQuestions` hook
- ✅ `QuestionSolver.tsx` - Usa `useQuestion` hook
- ✅ Novos estados de loading e error

### 3. Verificar Funcionamento

1. Acesse a página de questões
2. Verifique se as questões carregam corretamente
3. Teste filtros e busca
4. Verifique estatísticas

## 🔧 Administração

### Componente de Administração

O componente `QuestionsAdmin` oferece interface completa para:

- **Migração**: Migrar questões locais para Firebase
- **Verificação**: Validar integridade dos dados
- **Estatísticas**: Comparar dados locais vs Firebase
- **Status**: Monitorar estado da migração

### Funcionalidades Administrativas

```typescript
// Limpar todas as questões (CUIDADO!)
import { clearAllQuestions } from '../utils/questionMigration';
await clearAllQuestions();

// Recriar questão específica
await questionsService.createQuestion(questionData);

// Atualizar questão em lote
const updates = { completed: false };
await questionsService.updateQuestion(questionId, updates);
```

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. **Erro de Permissões (MAIS COMUM)**
```
Error: Missing or insufficient permissions
```
**Solução RÁPIDA**:
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Projeto: `penapedplataforma` → Firestore Database → Rules
3. Substitua as regras por:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // TEMPORÁRIO PARA DESENVOLVIMENTO
    }
  }
}
```
4. Clique em "Publish"
5. Aguarde 30 segundos e tente novamente

**Script automático**: `bash scripts/fix-firebase-permissions.sh`

#### 2. **Erro de Conexão Firebase**
```
Error: Failed to connect to Firebase
```
**Solução**: Verificar credenciais em `src/config/firebase.ts`

#### 2. **Questões Duplicadas**
```
Error: Document already exists
```
**Solução**: Limpar coleção antes de migrar novamente

#### 3. **Permissões Firestore**
```
Error: Missing or insufficient permissions
```
**Solução**: Configurar regras do Firestore:

```javascript
// Firestore Rules (temporário para desenvolvimento)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /questions/{document} {
      allow read, write: if true; // Apenas para desenvolvimento!
    }
  }
}
```

#### 4. **Dados Inconsistentes**
```
Warning: Missing questions found
```
**Solução**: Executar verificação e migrar questões faltantes

#### 5. **Performance Lenta**
**Solução**: Implementar índices no Firestore:
- Campo: `category` (array)
- Campo: `difficulty`
- Campo: `exam`
- Campo: `completed`

### Logs e Debug

Habilitar logs detalhados:

```typescript
// No navegador
localStorage.setItem('debug', 'firebase:*');

// Verificar logs de migração
console.log('Questões locais:', allQuestions.length);
console.log('Status Firebase:', await questionsService.getAllQuestions());
```

### Backup e Recuperação

#### Fazer Backup

```typescript
// Exportar questões do Firebase
const questions = await questionsService.getAllQuestions();
const backup = JSON.stringify(questions, null, 2);
console.log('Backup:', backup);
```

#### Restaurar Backup

```typescript
// Restaurar de backup JSON
const backupData = /* seu backup JSON */;
for (const question of backupData) {
  await questionsService.createQuestion(question);
}
```

## 🔮 Próximos Passos

1. **Índices de Performance**: Configurar índices otimizados no Firestore
2. **Cache**: Implementar cache local com React Query
3. **Paginação**: Adicionar paginação para grandes volumes
4. **Sincronização**: Sistema de sync offline-first
5. **Analytics**: Implementar tracking de uso das questões
6. **Backup Automático**: Sistema de backup incremental

## 📝 Exemplo de Uso Completo

```typescript
import { useQuestions, useQuestionActions } from '../hooks/useQuestions';

function MyComponent() {
  const { questions, loading, error } = useQuestions();
  const { updateQuestion } = useQuestionActions();

  const handleMarkComplete = async (questionId: number) => {
    try {
      await updateQuestion(questionId, { completed: true });
    } catch (error) {
      console.error('Erro ao marcar questão:', error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {questions.map(question => (
        <div key={question.id}>
          <h3>{question.title}</h3>
          <button onClick={() => handleMarkComplete(question.id)}>
            Marcar como Completa
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 🎯 Conclusão

O sistema Firebase está pronto para uso com:

- ✅ Serviços completos de CRUD
- ✅ Hooks React otimizados
- ✅ Utilitários de migração
- ✅ Interface de administração
- ✅ Tratamento de erros
- ✅ Estados de loading
- ✅ Filtros avançados

A migração pode ser executada de forma segura e verificada, mantendo a integridade dos dados.