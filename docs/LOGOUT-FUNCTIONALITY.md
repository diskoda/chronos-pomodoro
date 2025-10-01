# Funcionalidade de Logout - Chronos Pomodoro

## ✅ Funcionalidades Implementadas

### 1. **UserMenu** - Menu Dropdown Completo
Localização: `src/components/common/UserMenu.tsx`

**Características:**
- Exibe foto/avatar do usuário
- Mostra nome e email
- Menu dropdown com opção de logout
- Responsivo (esconde texto em telas pequenas)
- Suporte a temas claro/escuro

**Como usar:**
```tsx
import { UserMenu } from '../components/common';

// No header
<UserMenu />
```

### 2. **LogoutButton** - Botão Customizável
Localização: `src/components/common/LogoutButton.tsx`

**Variações:**
- **Variant**: `primary`, `secondary`, `text`
- **Size**: `sm`, `md`, `lg`
- **showIcon**: `true`/`false`

**Como usar:**
```tsx
import { LogoutButton } from '../components/common';

<LogoutButton variant="primary" />
<LogoutButton variant="secondary" size="sm" />
<LogoutButton variant="text" showIcon={false} />
```

### 3. **AuthContext** - Logout Programático
Localização: `src/contexts/AuthContext.tsx`

**Como usar:**
```tsx
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

## 🎯 Onde Usar

### DashboardHeader (Já implementado)
O `DashboardHeader` já foi atualizado para usar o `UserMenu`:

```tsx
// src/components/dashboardPage/DashboardHeader.tsx
import UserMenu from '../common/UserMenu';

// No render
<UserMenu />
```

### Qualquer Página
Pode ser usado em qualquer lugar:

```tsx
// Header simples
<header>
  <h1>Minha Página</h1>
  <UserMenu />
</header>

// Sidebar
<aside>
  <nav>...</nav>
  <LogoutButton variant="text" />
</aside>

// Footer
<footer>
  <LogoutButton variant="secondary" size="sm" />
</footer>
```

## 📝 Exemplos Disponíveis

### 1. `DashboardWithFirebase.tsx`
Mostra como usar logout em um dashboard completo com Firebase.

### 2. `LogoutExample.tsx`
Demonstra todas as variações do `LogoutButton` e como usar o `UserMenu`.

## 🔄 Fluxo de Logout

1. **Usuário clica em logout**
2. **Firebase Auth faz logout**
3. **AuthContext atualiza estado**
4. **Usuário é redirecionado para `/login`**
5. **Rotas protegidas ficam inacessíveis**

## 🚀 Para Usar Agora

1. **No DashboardHeader**: Já está pronto!
2. **Em outras páginas**: Importe e use `UserMenu` ou `LogoutButton`
3. **Customização**: Ajuste props conforme necessário

### Exemplo Rápido
```tsx
import { UserMenu, LogoutButton } from '../components/common';

// Menu completo (recomendado)
<UserMenu />

// Botão simples
<LogoutButton />

// Botão customizado
<LogoutButton variant="primary" size="lg" />
```

## ✨ Benefícios

- **Consistente**: Mesmo visual em toda aplicação
- **Reutilizável**: Componentes modulares
- **Flexível**: Múltiplas variações
- **Seguro**: Logout real do Firebase
- **Responsivo**: Funciona em mobile/desktop
- **Acessível**: Suporte a keyboard navigation