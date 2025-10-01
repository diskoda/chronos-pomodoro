# Integração Firebase - Chronos Pomodoro

Este documento explica como o Firebase foi integrado ao projeto Chronos Pomodoro.

## 📁 Estrutura Criada

```
src/
├── config/
│   ├── firebase.ts              # Configuração principal do Firebase
│   └── firebase-env.ts          # Configuração com variáveis de ambiente
├── contexts/
│   └── AuthContext.tsx          # Context para autenticação
├── services/
│   └── firestore.ts             # Serviços do Firestore
├── components/
│   └── common/
│       ├── ProtectedRoute.tsx   # Componente para rotas protegidas
│       ├── UserMenu.tsx         # Menu dropdown com logout
│       └── LogoutButton.tsx     # Botão customizável de logout
└── examples/
    ├── DashboardWithFirebase.tsx # Exemplo de uso do Firebase
    └── LogoutExample.tsx         # Exemplos de logout
```

## 🔧 Configuração

### 1. Firebase Configuration

O arquivo `src/config/firebase.ts` contém a configuração básica do Firebase:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyBHJO-758wzc4IL3rpcAd_zcGBsP3ZAur0",
  authDomain: "penapedplataforma.firebaseapp.com",
  projectId: "penapedplataforma",
  storageBucket: "penapedplataforma.firebasestorage.app",
  messagingSenderId: "550474080281",
  appId: "1:550474080281:web:c2453a7df5fdd6c03c4a88"
};
```

### 2. Variáveis de Ambiente (Opcional)

Para usar variáveis de ambiente, copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

E edite as variáveis conforme necessário.

## 🔐 Autenticação

### AuthContext

O `AuthContext` fornece:

- `currentUser`: Usuário atual
- `login(email, password)`: Login com email/senha
- `register(email, password)`: Registro de novo usuário
- `loginWithGoogle()`: Login com Google
- `logout()`: Logout
- `resetPassword(email)`: Reset de senha

### Uso no componente de Login

```typescript
import { useAuth } from '../contexts/AuthContext';

const { login, loginWithGoogle } = useAuth();

// Login com email/senha
await login(email, password);

// Login com Google
await loginWithGoogle();
```

### Logout

Existem duas formas principais de implementar logout:

#### 1. UserMenu (Recomendado)
Menu dropdown com informações do usuário e opção de logout:

```typescript
import { UserMenu } from '../components/common';

// No seu header
<UserMenu />
```

#### 2. LogoutButton
Botão customizável de logout:

```typescript
import { LogoutButton } from '../components/common';

// Variações disponíveis
<LogoutButton variant="primary" />
<LogoutButton variant="secondary" />
<LogoutButton variant="text" />

// Tamanhos
<LogoutButton size="sm" />
<LogoutButton size="md" />
<LogoutButton size="lg" />

// Com/sem ícone
<LogoutButton showIcon={true} />
<LogoutButton showIcon={false} />
```

#### 3. Logout Programático
Para logout em código:

```typescript
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const { logout } = useAuth();
const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logout();
    navigate('/login');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};
```

### Rotas Protegidas

```typescript
import ProtectedRoute from '../components/common/ProtectedRoute';

<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

## 💾 Firestore

### Serviços Disponíveis

#### userService
- `createUserProfile(userData)`: Criar perfil do usuário
- `getUserProfile(uid)`: Buscar perfil do usuário
- `updateUserProfile(uid, updates)`: Atualizar perfil

#### studyService
- `recordStudySession(sessionData)`: Registrar sessão de estudo
- `getUserStudySessions(userId, limit)`: Buscar sessões do usuário
- `getUserStats(userId)`: Buscar estatísticas do usuário
- `updateUserStats(userId, updates)`: Atualizar estatísticas

### Exemplo de Uso

```typescript
import { studyService } from '../services/firestore';

// Registrar uma sessão de estudo
await studyService.recordStudySession({
  userId: currentUser.uid,
  questionId: 'q123',
  correct: true,
  timeSpent: 120,
  difficulty: 'medium',
  subject: 'Medicina'
});

// Buscar estatísticas
const stats = await studyService.getUserStats(currentUser.uid);
```

## 📊 Tipos de Dados

### UserProfile
```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### StudySession
```typescript
interface StudySession {
  id?: string;
  userId: string;
  questionId: string;
  correct: boolean;
  timeSpent: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  createdAt: Timestamp;
}
```

### UserStats
```typescript
interface UserStats {
  userId: string;
  totalQuestions: number;
  correctAnswers: number;
  totalTimeSpent: number;
  streak: number;
  lastActivityDate: Timestamp;
  favoriteSubjects: string[];
}
```

## 🚀 Como Usar

### 1. Login/Registro

A página de login (`src/pages/Login.tsx`) já foi atualizada para usar o Firebase:

- Login com email/senha
- Login com Google
- Tratamento de erros
- Estados de loading

### 2. Proteção de Rotas

Envolver componentes que precisam de autenticação:

```typescript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### 3. Dados do Usuário

Use o `AuthContext` para acessar dados do usuário:

```typescript
const { currentUser, loading } = useAuth();

if (loading) return <div>Carregando...</div>;
if (!currentUser) return <div>Não logado</div>;
```

### 4. Salvar Dados

Use os serviços do Firestore para persistir dados:

```typescript
// Após responder uma questão
await studyService.recordStudySession({
  userId: currentUser.uid,
  questionId: question.id,
  correct: userAnswer === correctAnswer,
  timeSpent: elapsedTime,
  difficulty: question.difficulty,
  subject: question.subject
});
```

## 🔄 Exemplo Completo

Veja `src/examples/DashboardWithFirebase.tsx` para um exemplo completo de como integrar os dados do Firebase em um componente React.

## 📝 Próximos Passos

1. **Configurar Regras do Firestore**: Definir regras de segurança
2. **Implementar Offline**: Configurar persistência offline
3. **Otimizar Queries**: Adicionar índices no Firestore
4. **Analytics**: Integrar Firebase Analytics
5. **Push Notifications**: Configurar notificações

## 🛡️ Segurança

Lembre-se de:

- Configurar regras apropriadas no Firestore
- Não expor chaves sensíveis no código cliente
- Validar dados no frontend e backend
- Implementar rate limiting para APIs