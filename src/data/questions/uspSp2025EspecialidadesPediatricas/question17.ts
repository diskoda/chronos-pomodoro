import type { QuestionFlowData } from '../../../components/questionFlow/core/types';

// Questão 17 - Vacina pneumocócica
export const question17FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o esquema vacinal para pneumococo em crianças, especificamente as indicações da vacina pneumocócica 23-valente polissacarídica (VPP23).

A vacinação contra pneumococo é essencial na pediatria, especialmente em grupos de risco elevado para doença pneumocócica invasiva.

**Caso Clínico:** Criança de 3 anos, com esquema básico da vacina pneumocócica 10-valente (VPC10) completo, que apresentou pneumonia pneumocócica grave aos 2 anos de idade.

**Pergunta:** Qual é a indicação para vacinação adicional com VPP23?`,

  explanationText: `Para resolver esta questão sobre vacinação pneumocócica complementar, analise os seguintes aspectos:

**Vacinas Pneumocócicas Disponíveis:**

**VPC10 (Pneumocócica Conjugada):**
• Faixa etária: < 5 anos
• Esquema básico: 2+1 doses
• Imunogenicidade: Excelente em lactentes
• Cobertura: 10 sorotipos mais prevalentes

**VPP23 (Pneumocócica Polissacarídica):**
• Faixa etária: ≥ 2 anos
• Indicações especiais: Grupos de risco
• Cobertura: 23 sorotipos
• Duração: Proteção prolongada

**Grupos de Risco para VPP23:**
• História de doença pneumocócica invasiva
• Imunodeficiências
• Doenças crônicas (cardiopatias, pneumopatias)
• Asplenia funcional ou anatômica
• Diabetes mellitus

**Indicação no Caso:**
A história de pneumonia pneumocócica grave é um fator de risco que indica susceptibilidade aumentada, justificando a proteção adicional com VPP23.`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Não há indicação para vacinação adicional, pois o esquema básico está completo.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nIndicação perdida:\n\n• **História:** Pneumonia pneumocócica grave prévia\n• **Fator de risco:** Indica susceptibilidade aumentada\n• **Proteção adicional:** VPP23 oferece cobertura ampliada\n• **Recomendação:** Criança com história de DPI deve receber VPP23',
      category: 'incorrect',
      conceptsInvolved: ['grupos de risco', 'história de DPI', 'indicações especiais']
    },
    {
      letter: 'B',
      text: 'Administrar uma dose da vacina pneumocócica 23-valente (VPP23) após os 2 anos de idade.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nIndicação adequada para VPP23:\n\n• **Critério:** História de doença pneumocócica invasiva\n• **Idade apropriada:** ≥ 2 anos (VPP23 eficaz)\n• **Benefício:** Proteção contra 23 sorotipos\n• **Esquema:** 1 dose após esquema básico completo\n• **Evidência:** Reduz risco de recidiva',
      category: 'correct',
      conceptsInvolved: ['VPP23', 'grupos de risco', 'prevenção secundária']
    },
    {
      letter: 'C',
      text: 'Repetir o esquema completo da vacina pneumocócica 10-valente.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nEsquema inadequado:\n\n• **Desnecessário:** VPC10 já completa\n• **Imunogenicidade:** Não há benefício em repetir\n• **Indicação correta:** VPP23 para ampliação de cobertura\n• **Sobreposição:** Seria redundante',
      category: 'incorrect',
      conceptsInvolved: ['esquemas vacinais', 'redundância', 'eficácia limitada']
    },
    {
      letter: 'D',
      text: 'Aguardar até os 5 anos para avaliar necessidade de revacinação.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nPerda de oportunidade:\n\n• **Risco atual:** Criança já demonstrou susceptibilidade\n• **Proteção imediata:** VPP23 pode ser dada ≥ 2 anos\n• **Benefício perdido:** Delay desnecessário na proteção\n• **Recomendação:** Vacinar o quanto antes',
      category: 'incorrect',
      conceptsInvolved: ['timing vacinal', 'perda de oportunidade', 'risco-benefício']
    }
  ],

  metadata: {
    specialty: 'Imunizações',
    difficulty: 'medium',
    tags: ['pneumococo', 'VPP23', 'grupos de risco', 'DPI'],
    estimatedTime: 4,
    conceptsRequired: ['vacinas pneumocócicas', 'grupos de risco', 'doença pneumocócica invasiva'],
    learningObjectives: [
      'Identificar indicações para VPP23',
      'Reconhecer grupos de risco para pneumococo',
      'Compreender diferenças entre VPC e VPP',
      'Aplicar prevenção secundária em DPI'
    ]
  }
};
