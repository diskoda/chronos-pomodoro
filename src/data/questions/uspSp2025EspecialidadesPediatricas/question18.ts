import type { QuestionFlowData } from '../../../components/questionFlow/types';

// Questão 18 - Desenvolvimento neuromotor
export const question18FlowData: QuestionFlowData = {
  contextText: `Esta questão avalia conhecimentos sobre marcos do desenvolvimento neuropsicomotor em lactentes, especificamente os marcos esperados aos 6 meses de idade.

O acompanhamento do desenvolvimento é fundamental na pediatria para detecção precoce de atrasos.

**Caso Clínico:** Lactente de 6 meses em consulta de puericultura. Os pais questionam sobre os marcos de desenvolvimento esperados para essa idade.

**Pergunta:** Qual marco do desenvolvimento é esperado aos 6 meses de idade?`,

  explanationText: `Para resolver esta questão sobre desenvolvimento neuromotor, analise os marcos por faixa etária:

**Desenvolvimento Normal aos 6 Meses:**

**Motor Grosso:**
• Sentar com apoio (4-6 meses) → Sentar sem apoio (6-8 meses)
• Controle de cabeça completo (4 meses)
• Rolar da posição supina para prona (4-6 meses)
• Sustentar peso nas pernas com apoio (6 meses)

**Motor Fino:**
• Transferir objetos entre as mãos (6 meses)
• Preensão palmar voluntária (4-5 meses)
• Coordenação mão-boca desenvolvida
• Pinça ainda rudimentar

**Social/Cognitivo:**
• Reconhecer pessoas familiares vs estranhos
• Balbucio social (não palavras ainda)
• Interesse ativo por objetos
• Resposta ao nome

**Marcos Posteriores (para referência):**
• Andar: 12-15 meses
• Primeiras palavras: 10-12 meses
• Desenhar: 3-4 anos

**Importância da Avaliação:**
O sentar sem apoio aos 6 meses é um marco motor fundamental que indica desenvolvimento adequado do controle postural e força axial.`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Andar sem apoio.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nMarco tardio:\n\n• **Idade esperada:** 12-15 meses\n• **Aos 6 meses:** Ainda não sustenta peso adequadamente\n• **Desenvolvimento:** Muito prematuro para essa idade\n• **Marco atual:** Sentar com apoio',
      category: 'incorrect',
      conceptsInvolved: ['marcos tardios', 'desenvolvimento motor', 'cronologia inadequada']
    },
    {
      letter: 'B',
      text: 'Sentar sem apoio.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nMarco apropriado para 6 meses:\n\n• **Desenvolvimento motor:** Sentar sem apoio (6-8 meses)\n• **Controle postural:** Já desenvolvido aos 6 meses\n• **Progressão:** Após sentar com apoio (4-6 meses)\n• **Variação normal:** Pode ocorrer entre 6-8 meses\n• **Importância:** Marco fundamental do desenvolvimento',
      category: 'correct',
      conceptsInvolved: ['desenvolvimento motor', 'marcos dos 6 meses', 'controle postural']
    },
    {
      letter: 'C',
      text: 'Falar as primeiras palavras com significado.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nMarco de linguagem tardio:\n\n• **Idade esperada:** 10-12 meses\n• **Aos 6 meses:** Apenas balbucio\n• **Desenvolvimento:** Linguagem ainda em formação\n• **Marco atual:** Balbucio social',
      category: 'incorrect',
      conceptsInvolved: ['desenvolvimento da linguagem', 'marcos tardios', 'balbucio vs palavras']
    },
    {
      letter: 'D',
      text: 'Desenhar círculos.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nMarco muito tardio:\n\n• **Idade esperada:** 3-4 anos\n• **Aos 6 meses:** Motor fino ainda rudimentar\n• **Desenvolvimento:** Apenas preensão palmar\n• **Incompatível:** Muito além da capacidade atual',
      category: 'incorrect',
      conceptsInvolved: ['desenvolvimento motor fino', 'marcos tardios', 'capacidades inadequadas']
    }
  ],

  metadata: {
    specialty: 'Desenvolvimento',
    difficulty: 'easy',
    tags: ['marcos desenvolvimento', '6 meses', 'sentar', 'motor grosso'],
    estimatedTime: 3,
    conceptsRequired: ['desenvolvimento neuromotor', 'marcos por idade', 'avaliação pediátrica'],
    learningObjectives: [
      'Conhecer marcos dos 6 meses',
      'Identificar desenvolvimento motor normal',
      'Distinguir marcos por faixa etária',
      'Aplicar na avaliação pediátrica'
    ]
  }
};