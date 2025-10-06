# USP-SP 2025 Especialidades Pediátricas - Banco de Questões

Este diretório contém as questões organizadas da prova USP-SP 2025 de Especialidades Pediátricas, estruturadas no formato QuestionFlowData para integração com o sistema de fluxo educacional.

## 📁 Estrutura de Arquivos

```
uspSp2025EspecialidadesPediatricas/
├── README.md                 # Este arquivo de documentação
├── index.ts                  # Índice central com importações e metadados
├── templateQuestion.ts       # Template para criação de novas questões
├── question17.ts             # Questão 17 - Vacina pneumocócica
├── question18.ts             # Questão 18 - Desenvolvimento neuromotor
├── question19.ts             # Questão 19 - Sopros cardíacos
├── question20.ts             # Questão 20 - Bronquiolite
├── question21.ts             # Questão 21 - Convulsão febril
├── question22.ts             # Questão 22 - Diarreia/desidratação
└── ...                       # Questões futuras (23-120)
```

## 🎯 Questões Implementadas

| ID | Tema | Especialidade | Dificuldade | Status |
|----|------|---------------|-------------|--------|
| 17 | Vacina pneumocócica | Imunizações | Medium | ✅ |
| 18 | Marcos desenvolvimento | Desenvolvimento | Easy | ✅ |
| 19 | Sopros cardíacos | Cardiologia | Medium | ✅ |
| 20 | Bronquiolite | Pneumologia | Medium | ✅ |
| 21 | Convulsão febril | Neurologia | Medium | ✅ |
| 22 | Diarreia aguda | Gastroenterologia | Medium | ✅ |
| 23-120 | Pendentes | Várias | - | ⏳ |

## 🏗️ Estrutura da Questão

Cada arquivo de questão segue o padrão `QuestionFlowData`:

### Campos Obrigatórios:

- **`contextText`**: Contexto educacional + caso clínico detalhado
- **`explanationText`**: Explicação abrangente dos conceitos
- **`alternativesAnalysis`**: Análise detalhada de cada alternativa (A-D)
- **`metadata`**: Metadados da questão (especialidade, dificuldade, tags, etc.)

### Exemplo de Estrutura:

```typescript
export const questionXXFlowData: QuestionFlowData = {
  contextText: `Contexto educacional + caso clínico...`,
  explanationText: `Explicação conceitual detalhada...`,
  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Texto da alternativa...',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nExplicação...',
      category: 'incorrect',
      conceptsInvolved: ['conceito1', 'conceito2']
    }
    // ... outras alternativas
  ],
  metadata: {
    specialty: 'Especialidade',
    difficulty: 'medium',
    tags: ['tag1', 'tag2'],
    estimatedTime: 4,
    conceptsRequired: ['conceito1'],
    learningObjectives: ['objetivo1']
  }
};
```

## 📋 Como Adicionar Nova Questão

1. **Copie o template**: `cp templateQuestion.ts questionXX.ts`
2. **Renomeie a variável**: `questionTEMPLATEFlowData` → `questionXXFlowData`
3. **Preencha o conteúdo**: Substitua todos os placeholders `[XXX]`
4. **Adicione ao index**: Importe e registre no `index.ts`
5. **Teste a compilação**: Verifique se não há erros TypeScript

## 🎨 Especialidades Disponíveis

- **Imunizações**: Vacinas, grupos de risco, calendário vacinal
- **Desenvolvimento**: Marcos neuromotor, atrasos, avaliação
- **Cardiologia**: Sopros, arritmias, cardiopatias congênitas
- **Pneumologia**: Asma, bronquiolite, pneumonias
- **Neurologia**: Convulsões, cefaleia, distúrbios neurológicos
- **Gastroenterologia**: Diarreia, constipação, hepatopatias
- **Hematologia**: Anemias, distúrbios hemorrágicos
- **Endocrinologia**: Diabetes, crescimento, puberdade
- **Nefrologia**: ITU, glomerulopatias, distúrbios eletrolíticos
- **Infectologia**: Infecções bacterianas, virais, parasitárias
- **Dermatologia**: Dermatites, infecções cutâneas
- **Ortopedia**: Displasias, deformidades, fraturas
- **Oftalmologia**: Erros refração, estrabismo, infecções
- **Otorrinolaringologia**: Otites, amigdalites, distúrbios auditivos

## 📊 Níveis de Dificuldade

- **Easy**: Conhecimento básico, diagnósticos diretos
- **Medium**: Raciocínio clínico, diagnósticos diferenciais
- **Hard**: Casos complexos, múltiplas comorbidades

## 🔧 Integração com Sistema

O arquivo `index.ts` centraliza:
- Importações de todas as questões
- Array de questões para iteração
- Metadados do conjunto completo
- Estatísticas de distribuição

As questões são automaticamente registradas no sistema através do arquivo principal `uspSp2025EspecialidadesPediatricasRefactored.ts`.

## 📈 Progresso Atual

- **Implementadas**: 6/120 questões (5%)
- **Especialidades cobertas**: 6/14 disponíveis
- **Estrutura base**: ✅ Completa e funcional
- **Sistema de registro**: ✅ Automatizado
- **Template documentado**: ✅ Disponível para uso

## 🎯 Próximos Passos

1. Continuar implementação das questões 23-120
2. Diversificar especialidades cobertas
3. Balancear distribuição de dificuldades
4. Revisar qualidade do conteúdo educacional
5. Adicionar validações automáticas de qualidade