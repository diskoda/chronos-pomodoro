# Sistema TextExplanation

## 📝 Visão Geral

O **TextExplanation** é um sistema completo para adicionar explicações interativas a qualquer texto da aplicação. Ele permite envolver palavras ou frases com explicações detalhadas que aparecem em tooltips elegantes e informativos.

## 🚀 Funcionalidades

### ✨ **Recursos Principais**
- **Tooltips Inteligentes**: Posicionamento automático baseado no espaço disponível
- **Múltiplos Tipos**: Definições, conceitos, termos médicos, dicas, avisos
- **Temas Visuais**: Light, dark, medical, educational
- **Interação Flexível**: Hover, click ou ambos
- **Responsivo**: Funciona perfeitamente em dispositivos móveis
- **Acessibilidade**: Suporte completo a screen readers

### 🎨 **Tipos de Explicação**
- **`definition`** - Definições básicas (azul)
- **`concept`** - Conceitos complexos (roxo)
- **`medical`** - Termos médicos (teal)
- **`educational`** - Conteúdo educacional (índigo)
- **`tip`** - Dicas e sugestões (âmbar)
- **`important`** - Informações importantes (vermelho)
- **`warning`** - Avisos e alertas (laranja)

## 🛠️ Como Usar

### **Uso Básico**
```tsx
import { TextExplanation } from '../components/common';

// Exemplo simples
<p>
  Durante a <TextExplanation explanationId="anamnese">anamnese</TextExplanation>, 
  colete todas as informações necessárias.
</p>
```

### **Uso Avançado**
```tsx
// Com configurações personalizadas
<TextExplanation 
  explanationId="diagnostico-diferencial"
  variant="both"           // hover + click
  theme="medical"          // tema médico
  position="bottom"        // força posição
  showIcon={true}          // mostra ícone
  maxWidth={400}           // largura máxima
  delay={300}              // delay do hover
>
  diagnóstico diferencial
</TextExplanation>
```

## 📋 Propriedades do Componente

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `explanationId` | `string` | **obrigatório** | ID único da explicação |
| `children` | `ReactNode` | **obrigatório** | Texto a ser explicado |
| `variant` | `'hover' \| 'click' \| 'both'` | `'hover'` | Tipo de interação |
| `theme` | `'light' \| 'dark' \| 'medical' \| 'educational'` | `'light'` | Tema visual |
| `position` | `'top' \| 'bottom' \| 'auto'` | `'auto'` | Posição do tooltip |
| `showIcon` | `boolean` | `false` | Mostra ícone de informação |
| `maxWidth` | `number` | `320` | Largura máxima em pixels |
| `delay` | `number` | `500` | Delay do hover em ms |
| `className` | `string` | `''` | Classes CSS adicionais |

## 🗂️ Gerenciamento de Explicações

### **Adicionando Nova Explicação**
```tsx
import { addExplanation } from '../data/explanations';

// Nova explicação
addExplanation({
  id: 'minha-explicacao',
  type: 'medical',
  title: 'Novo Termo',
  content: 'Descrição detalhada do termo...',
  icon: '🩺',
  category: 'Cardiologia',
  examples: ['Exemplo 1', 'Exemplo 2'],
  keywords: ['termo', 'cardiologia'],
  difficulty: 'intermediate'
});
```

### **Usando o Gerenciador Visual**
```tsx
import { ExplanationManager } from '../components/common';

// Componente para gerenciar explicações
<ExplanationManager />
```

## 🎯 Exemplos Práticos

### **1. Termo Médico Simples**
```tsx
A <TextExplanation explanationId="anamnese">anamnese</TextExplanation> é fundamental.
```

### **2. Conceito com Tema Educacional**
```tsx
<TextExplanation 
  explanationId="pbl-metodologia" 
  theme="educational"
>
  metodologia PBL
</TextExplanation>
```

### **3. Aviso Importante**
```tsx
<TextExplanation 
  explanationId="contraindicacao"
  variant="both"
  showIcon={true}
>
  contraindicações
</TextExplanation>
```

### **4. Dica com Click**
```tsx
Use a <TextExplanation 
  explanationId="repeticao-espacada"
  variant="click"
  theme="educational"
>
  repetição espaçada
</TextExplanation> para melhor retenção.
```

## 📱 Hooks Disponíveis

### **useExplanation**
```tsx
const { explanation, loading } = useExplanation('anamnese');
```

### **useExplanationSearch**
```tsx
const { results, loading, search } = useExplanationSearch();
search('cardiologia');
```

### **useExplanationTheme**
```tsx
const { theme, setExplanationTheme } = useExplanationTheme();
setExplanationTheme('medical');
```

## 🎨 Customização de Temas

### **Tema Medical**
- Cores: Teal/Cyan
- Uso: Termos médicos, procedimentos
- Visual: Gradiente sutil, ícones médicos

### **Tema Educational**
- Cores: Índigo/Roxo  
- Uso: Conceitos educacionais, metodologias
- Visual: Gradiente educacional, ícones acadêmicos

### **Tema Light/Dark**
- Cores: Adaptáveis ao sistema
- Uso: Geral, definições básicas
- Visual: Minimalista, clean

## 📊 Categorias Disponíveis

- **Metodologia de Ensino**
- **Tecnologia Educacional**
- **Semiologia Médica**
- **Diagnóstico Médico**
- **Técnicas de Estudo**
- **Medicina Baseada em Evidências**
- **Segurança Médica**
- **Farmacologia**
- **Especialidades Médicas**
- **Medicina de Emergência**

## 🔧 Configuração Avançada

### **Analytics e Métricas**
```tsx
const { trackView, getViewCount } = useExplanationAnalytics();

// Rastrear visualizações
trackView('anamnese');

// Obter contagem
const views = getViewCount('anamnese');
```

### **Histórico de Visualizações**
```tsx
const { addToHistory, getRecentExplanations } = useExplanationHistory();

// Adicionar ao histórico
addToHistory('diagnostico-diferencial');

// Obter recentes
const recent = getRecentExplanations();
```

## 🎯 Melhores Práticas

### **✅ Faça**
- Use IDs descritivos e únicos
- Mantenha explicações concisas mas informativas
- Adicione exemplos práticos
- Use o tema apropriado para o contexto
- Teste em dispositivos móveis

### **❌ Evite**
- Explicações muito longas (>200 palavras)
- IDs genéricos ('explicacao1', 'termo')
- Sobrecarga de explicações na mesma frase
- Temas inconsistentes na mesma página

## 🔗 Estrutura de Arquivos

```
src/
├── components/common/
│   ├── TextExplanation.tsx       # Componente principal
│   ├── ExplanationManager.tsx    # Gerenciador visual
│   └── index.ts                  # Exports
├── data/
│   └── explanations.ts           # Base de dados
├── hooks/
│   └── useExplanations.ts        # Hooks personalizados
└── docs/
    └── EXPLANATION_SYSTEM.md     # Esta documentação
```

## 🚀 Exemplo Completo

```tsx
import React from 'react';
import { TextExplanation, ExplanationManager } from '../components/common';

export const MeuComponente = () => {
  return (
    <div>
      <h1>Guia de Estudos Médicos</h1>
      
      <p>
        O primeiro passo é realizar uma 
        <TextExplanation 
          explanationId="anamnese"
          theme="medical"
          variant="hover"
        >
          anamnese
        </TextExplanation> completa. 
        
        Em seguida, proceda com o 
        <TextExplanation 
          explanationId="exame-fisico"
          theme="medical"
        >
          exame físico
        </TextExplanation> sistemático.
      </p>

      <p>
        Lembre-se sempre de verificar 
        <TextExplanation 
          explanationId="contraindicacao"
          variant="both"
          showIcon={true}
        >
          contraindicações
        </TextExplanation> antes de qualquer procedimento.
      </p>

      <p>
        Para estudar de forma eficaz, utilize a técnica de 
        <TextExplanation 
          explanationId="repeticao-espacada"
          theme="educational"
        >
          repetição espaçada
        </TextExplanation> combinada com 
        <TextExplanation 
          explanationId="flashcards"
          theme="educational"
        >
          flashcards
        </TextExplanation>.
      </p>

      {/* Gerenciador para administradores */}
      <ExplanationManager />
    </div>
  );
};
```

---

## 🎉 Resultado

O sistema TextExplanation está **100% funcional** e pronto para uso! Você pode começar a envolver qualquer texto da aplicação com explicações interativas usando os IDs já disponíveis na base de dados.

**Principais benefícios:**
- ✅ **Educação Aprimorada**: Explicações contextuais melhoram o aprendizado
- ✅ **UX Superior**: Tooltips elegantes e responsivos
- ✅ **Manutenibilidade**: Sistema organizado e extensível
- ✅ **Flexibilidade**: Múltiplas opções de customização
- ✅ **Acessibilidade**: Suporte completo a tecnologias assistivas