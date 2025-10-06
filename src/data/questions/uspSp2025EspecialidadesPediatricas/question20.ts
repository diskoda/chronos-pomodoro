import type { QuestionFlowData } from '../../../components/questionFlow/types';

// Questão 20 - Manejo da bronquiolite viral aguda
export const question20FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o manejo da bronquiolite viral aguda, uma das principais causas de hospitalização em lactentes.

A bronquiolite é caracterizada por inflamação dos bronquíolos, causando obstrução e dificuldade respiratória.

**Caso Clínico:** Lactente de 8 meses apresenta quadro de 3 dias de coriza, tosse e dificuldade respiratória progressiva. Ao exame: taquipneia, tiragem subcostal, sibilos difusos e saturação de O2 de 92%.

**Pergunta:** Qual é o manejo inicial mais apropriado?`,

  explanationText: `O manejo da bronquiolite viral aguda baseia-se em medidas de suporte, evitando intervenções desnecessárias:

**Definição e Epidemiologia:**
• Inflamação viral dos bronquíolos
• Principal agente: Vírus Sincicial Respiratório (VSR)
• Pico: Lactentes < 2 anos
• Sazonalidade: Outono/inverno

**Apresentação Clínica:**
• Pródromos: Coriza, tosse seca
• Progressão: Taquipneia, tiragem, sibilos
• Sinais de gravidade: Saturação < 92%, apneia, recusa alimentar

**Manejo Baseado em Evidências:**

**Medidas Eficazes:**
• Oxigenoterapia: Se SatO2 < 92%
• Hidratação adequada: Oral ou EV conforme tolerância
• Posicionamento: Elevação de cabeceira
• Aspiração de VAS: Se secreções excessivas

**Medidas Ineficazes/Controversas:**
• Broncodilatadores: Sem benefício comprovado
• Corticoides: Não recomendados
• Antibióticos: Apenas se coinfecção bacteriana
• Fisioterapia respiratória: Sem evidência

**Critérios de Hospitalização:**
• Saturação < 92% em ar ambiente
• Dificuldade alimentar significativa
• Desidratação
• Apneia
• Fatores de risco: Prematuridade, cardiopatia

**Oxigenoterapia:**
É a intervenção principal quando há hipoxemia (SatO2 < 92%).`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Iniciar broncodilatador inalatório e corticoide sistêmico.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nMedicações sem eficácia comprovada:\n\n• **Broncodilatadores:** Múltiplos estudos mostram ausência de benefício\n• **Corticoides:** Não reduzem duração ou gravidade\n• **Evidência:** Guidelines contraindicam uso rotineiro\n• **Efeitos adversos:** Potenciais sem benefício clínico',
      category: 'incorrect',
      conceptsInvolved: ['broncodilatadores ineficazes', 'corticoides desnecessários', 'medicina baseada em evidências']
    },
    {
      letter: 'B',
      text: 'Administrar oxigenoterapia e manter hidratação adequada.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nManejo adequado baseado em evidências:\n\n• **Oxigenoterapia:** Indicada para SatO2 < 92%\n• **Hidratação:** Fundamental para fluidificação de secreções\n• **Suporte:** Medidas de suporte são o pilar do tratamento\n• **Evidência:** Abordagem recomendada pelas diretrizes\n• **Segurança:** Intervenções com benefício comprovado',
      category: 'correct',
      conceptsInvolved: ['oxigenoterapia', 'hidratação', 'cuidado de suporte', 'medicina baseada em evidências']
    },
    {
      letter: 'C',
      text: 'Prescrever antibiótico profilático e fisioterapia respiratória.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nIntervenções desnecessárias:\n\n• **Antibiótico profilático:** Bronquiolite é viral\n• **Resistência bacteriana:** Uso inapropriado promove resistência\n• **Fisioterapia:** Sem evidência de benefício, pode ser prejudicial\n• **Complicações:** Potencial para iatrogenias',
      category: 'incorrect',
      conceptsInvolved: ['antibióticos desnecessários', 'fisioterapia ineficaz', 'iatrogenia']
    },
    {
      letter: 'D',
      text: 'Realizar nebulização com soro fisiológico hipertônico.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nTerapia controversa:\n\n• **Evidência limitada:** Benefício marginal em alguns estudos\n• **Não consensual:** Não é recomendação universal\n• **Alternativa:** Outras medidas de suporte são prioritárias\n• **Primeira escolha:** Oxigenoterapia e hidratação são fundamentais',
      category: 'incorrect',
      conceptsInvolved: ['soro hipertônico', 'evidência limitada', 'terapias controversas']
    }
  ],

  metadata: {
    specialty: 'Pneumologia',
    difficulty: 'medium',
    tags: ['bronquiolite', 'VSR', 'lactente', 'oxigenoterapia'],
    estimatedTime: 4,
    conceptsRequired: ['bronquiolite viral', 'manejo respiratório', 'medicina baseada em evidências'],
    learningObjectives: [
      'Reconhecer apresentação da bronquiolite',
      'Aplicar manejo baseado em evidências',
      'Identificar medidas de suporte eficazes',
      'Evitar intervenções desnecessárias'
    ]
  }
};