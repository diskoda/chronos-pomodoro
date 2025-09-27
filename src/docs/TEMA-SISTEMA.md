# Sistema de Temas - PénaPED

Este documento explica como usar o sistema de temas light/dark implementado na aplicação PénaPED.

## 📋 Visão Geral

O sistema de temas utiliza:
- **React Context** para gerenciamento de estado global
- **CSS Variables** para definição das cores
- **Classes CSS personalizadas** para aplicação dos temas
- **Tailwind CSS** com suporte a dark mode
- **localStorage** para persistência da preferência do usuário

## 🚀 Como Usar

### 1. Usando o Hook useTheme

```tsx
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Tema atual: {theme}</p>
      <button onClick={toggleTheme}>Alternar Tema</button>
      <button onClick={() => setTheme('dark')}>Modo Escuro</button>
      <button onClick={() => setTheme('light')}>Modo Claro</button>
    </div>
  );
}
```

### 2. Aplicando Classes de Tema

#### Classes CSS Personalizadas:
```tsx
// Backgrounds
<div className="theme-bg-primary">Fundo primário</div>
<div className="theme-bg-secondary">Fundo secundário</div>

// Textos
<h1 className="theme-text-primary">Texto primário</h1>
<p className="theme-text-secondary">Texto secundário</p>

// Cards
<div className="theme-card">Card com tema</div>

// Botões
<button className="theme-button-primary">Botão primário</button>

// Inputs
<input className="theme-input" />
```

#### Classes Tailwind com Dark Mode:
```tsx
<div className="bg-white dark:bg-gray-800">
  <p className="text-gray-900 dark:text-gray-100">Texto adaptativo</p>
</div>
```

### 3. Hook Personalizado useThemeClasses

```tsx
import { useThemeClasses, themeClasses } from '../hooks/useThemeClasses';

function MyComponent() {
  const { theme, classes, conditional, combine, isDark } = useThemeClasses();
  
  return (
    <div className={themeClasses.page}>
      <div className={themeClasses.container}>
        <div className={themeClasses.card}>
          <h1 className={themeClasses.heading}>Título</h1>
          <p className={conditional('text-gray-600', 'text-gray-300')}>
            Texto condicional
          </p>
          <button className={themeClasses.buttonPrimary}>
            Ação
          </button>
        </div>
      </div>
    </div>
  );
}
```

## 🎨 Variáveis CSS Disponíveis

### Cores de Fundo:
- `--bg-primary`: Fundo principal (branco/cinza escuro)
- `--bg-secondary`: Fundo secundário (cinza claro/cinza médio)
- `--bg-tertiary`: Fundo terciário
- `--bg-accent`: Fundo de destaque

### Cores de Texto:
- `--text-primary`: Texto principal
- `--text-secondary`: Texto secundário
- `--text-tertiary`: Texto terciário
- `--text-accent`: Texto de destaque

### Cores de Borda:
- `--border-primary`: Borda principal
- `--border-secondary`: Borda secundária
- `--border-focus`: Borda de foco

### Cores da Marca:
- `--brand-primary`: Cor primária da marca
- `--brand-secondary`: Cor secundária da marca
- `--brand-accent`: Cor de destaque da marca

### Cores de Status:
- `--success`, `--success-bg`, `--success-text`
- `--warning`, `--warning-bg`, `--warning-text`
- `--error`, `--error-bg`, `--error-text`
- `--info`, `--info-bg`, `--info-text`

## 🔧 Componentes de Tema

### ThemeSelector
Botão de alternância simples:
```tsx
import ThemeSelector from '../components/common/ThemeSelector';

<ThemeSelector />
```

### ThemeDropdown
Dropdown com opções:
```tsx
import { ThemeDropdown } from '../components/common/ThemeSelector';

<ThemeDropdown />
```

### ThemeButtonGroup
Grupo de botões:
```tsx
import { ThemeButtonGroup } from '../components/common/ThemeSelector';

<ThemeButtonGroup />
```

## 💡 Boas Práticas

1. **Use classes de tema** sempre que possível em vez de cores hardcoded
2. **Combine classes CSS personalizadas** com classes Tailwind condicionais
3. **Teste sempre** os componentes em ambos os temas
4. **Use o hook useThemeClasses** para lógica condicional complexa
5. **Mantenha consistência** nas cores e estilos entre temas

## 🎯 Exemplo Completo

```tsx
import { useTheme } from '../contexts/ThemeContext';
import { useThemeClasses, themeClasses } from '../hooks/useThemeClasses';
import ThemeSelector from '../components/common/ThemeSelector';

export default function ExamplePage() {
  const { theme } = useTheme();
  const { conditional, isDark } = useThemeClasses();
  
  return (
    <div className={themeClasses.page}>
      <header className="theme-bg-primary theme-border-b">
        <div className={themeClasses.container}>
          <div className="flex justify-between items-center h-16">
            <h1 className={themeClasses.heading}>Minha Aplicação</h1>
            <ThemeSelector />
          </div>
        </div>
      </header>
      
      <main className="py-8">
        <div className={themeClasses.container}>
          <div className={themeClasses.cardHover}>
            <h2 className={themeClasses.heading}>Título da Seção</h2>
            <p className={themeClasses.body}>
              Conteúdo que se adapta ao tema {theme}.
            </p>
            <div className={conditional(
              'bg-blue-50 text-blue-700',
              'bg-blue-900 text-blue-300'
            )}>
              Status: {isDark ? '🌙' : '☀️'}
            </div>
            <button className={themeClasses.buttonPrimary}>
              Ação Principal
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
```

## 🔄 Migração de Componentes Existentes

Para migrar componentes existentes:

1. Substitua `bg-white` por `theme-bg-primary`
2. Substitua `text-gray-900` por `theme-text-primary`
3. Substitua `text-gray-600` por `theme-text-secondary`
4. Adicione classes condicionais dark: para elementos específicos
5. Use `theme-card` para cards
6. Use `theme-shadow-*` para sombras

Este sistema garante que toda a aplicação tenha temas consistentes e seja facilmente mantida e expandida.