import type { QuestionFlowData } from '../../../components/questionFlow/types';

// Questão 24 - Anemia ferropriva em pré-escolar
export const question24FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o diagnóstico e manejo da anemia ferropriva, a deficiência nutricional mais comum na infância.

A anemia por deficiência de ferro afeta principalmente lactentes e pré-escolares, podendo causar alterações no desenvolvimento neuropsicomotor.

**Caso Clínico:** Pré-escolar de 3 anos apresenta palidez, irritabilidade e cansaço fácil. Alimentação baseada principalmente em leite e carboidratos, com baixo consumo de carnes. Hemoglobina: 8,5 g/dL, VCM: 65 fL, ferritina: 8 ng/mL.

**Pergunta:** Qual é o diagnóstico e tratamento mais apropriado?`,

  explanationText: `O diagnóstico e manejo da anemia ferropriva requer avaliação laboratorial adequada e suplementação eficaz:

**Critérios Diagnósticos:**

**Valores de Hemoglobina por Idade:**
• 6-24 meses: < 11,0 g/dL
• 2-5 anos: < 11,5 g/dL
• 5-12 anos: < 11,5 g/dL
• > 12 anos: < 12,0 g/dL (♀) / < 13,0 g/dL (♂)

**Parâmetros do Ferro:**
• VCM diminuído (microcitose)
• Ferritina < 15 ng/mL
• Saturação transferrina < 16%
• Ferro sérico diminuído

**Fatores de Risco:**
• Baixo peso ao nascer
• Introdução precoce leite de vaca
• Dieta inadequada (pouco ferro)
• Crescimento rápido
• Perdas aumentadas

**Tratamento:**

**Ferro Elementar:**
• Dose: 3-6 mg/kg/dia
• Via oral preferencial
• Dividir em 2-3 tomadas
• Entre as refeições

**Duração:**
• Correção: 2-3 meses
• Reposição dos estoques: + 3 meses
• Total: 6 meses de tratamento

**Orientações:**
• Vitamina C aumenta absorção
• Evitar leite, chá, café junto
• Constipação intestinal comum
• Escurecimento das fezes normal

**Resposta Terapêutica:**
• Aumento Hb: 1 g/dL/mês
• Reticulocitose em 5-10 dias
• Reavaliação em 30 dias

**Aplicação no Caso:**
Hb 8,5 g/dL + VCM 65 fL + ferritina 8 ng/mL = ANEMIA FERROPRIVA confirmada`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Anemia ferropriva; suplementação com ferro oral por 3 meses.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDuração insuficiente:\n\n• **Diagnóstico correto:** Anemia ferropriva confirmada\n• **Tratamento adequado:** Ferro oral apropriado\n• **Duração insuficiente:** Apenas correção da anemia\n• **Duração adequada:** 6 meses (correção + reposição estoques)',
      category: 'incorrect',
      conceptsInvolved: ['duração insuficiente', 'reposição incompleta', 'estoques de ferro']
    },
    {
      letter: 'B',
      text: 'Anemia ferropriva; ferro oral por 6 meses e orientação nutricional.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e tratamento completos:\n\n• **Diagnóstico:** Hb baixa + VCM baixo + ferritina baixa\n• **Ferro oral:** Primeira escolha, 3-6 mg/kg/dia\n• **Duração adequada:** 6 meses (3 correção + 3 estoques)\n• **Orientação nutricional:** Fundamental para prevenção\n• **Abordagem holística:** Trata e previne recidiva',
      category: 'correct',
      conceptsInvolved: ['anemia ferropriva', 'ferro oral', 'duração adequada', 'orientação nutricional']
    },
    {
      letter: 'C',
      text: 'Anemia de doença crônica; investigar foco infeccioso oculto.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico equivocado:\n\n• **Ferritina baixa:** Indica deficiência de ferro\n• **Anemia doença crônica:** Ferritina normal/alta\n• **História clínica:** Compatible com deficiência nutricional\n• **Investigação desnecessária:** Diagnóstico já estabelecido',
      category: 'incorrect',
      conceptsInvolved: ['diagnóstico incorreto', 'ferritina mal interpretada', 'investigação desnecessária']
    },
    {
      letter: 'D',
      text: 'Talassemia minor; solicitar eletroforese de hemoglobina.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico alternativo inadequado:\n\n• **Ferritina baixa:** Descarta talassemia (ferritina normal)\n• **Resposta nutricional:** História sugere deficiência ferro\n• **Eletroforese:** Indicada se ferritina normal\n• **Tratamento perdido:** Delay na suplementação',
      category: 'incorrect',
      conceptsInvolved: ['talassemia incorreta', 'ferritina ignorada', 'delay terapêutico']
    }
  ],

  metadata: {
    specialty: 'Hematologia',
    difficulty: 'medium',
    tags: ['anemia ferropriva', 'deficiência ferro', 'suplementação', 'nutrição'],
    estimatedTime: 4,
    conceptsRequired: ['anemias carenciais', 'metabolismo do ferro', 'interpretação laboratorial'],
    learningObjectives: [
      'Diagnosticar anemia ferropriva',
      'Prescrever suplementação adequada',
      'Orientar prevenção nutricional',
      'Definir duração do tratamento'
    ]
  }
};