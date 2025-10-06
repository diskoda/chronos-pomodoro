import type { QuestionFlowData } from '../../../components/questionFlow/types';

// Questão 23 - Asma aguda em escolar
export const question23FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o manejo da crise asmática em pediatria, uma emergência respiratória comum na prática pediátrica.

A asma é a doença crônica mais frequente na infância, e as exacerbações agudas requerem tratamento rápido e eficaz.

**Caso Clínico:** Escolar de 7 anos, com diagnóstico prévio de asma intermitente, chega ao pronto-socorro com dispneia, tosse seca e sibilos há 6 horas. Ao exame: tiragem subcostal, sibilos expiratórios difusos, saturação 94%.

**Pergunta:** Qual é a classificação da crise e tratamento inicial mais apropriado?`,

  explanationText: `O manejo da crise asmática requer avaliação rápida da gravidade e tratamento escalonado:

**Classificação da Crise Asmática:**

**Leve:**
• Fala em frases
• Sem tiragem
• Sibilos ausentes/leves
• SatO2 > 95%
• FC < 100 bpm (escolar)

**Moderada:**
• Fala em palavras
• Tiragem subcostal
• Sibilos moderados
• SatO2 90-95%
• FC 100-120 bpm

**Grave:**
• Dificuldade para falar
• Tiragem importante
• Sibilos intensos ou ausentes
• SatO2 < 90%
• FC > 120 bpm
• Cianose

**Tratamento Escalonado:**

**Primeira Linha:**
• Beta-2 agonista inalatório (Salbutamol)
• Spray/espaçador ou nebulização
• Repetir a cada 20 min (até 3x)

**Segunda Linha:**
• Corticoide sistêmico (Prednisolona)
• Anti-inflamatório potente
• Reduz inflamação das vias aéreas

**Terceira Linha:**
• Ipratrópio (anticolinérgico)
• Associado ao beta-2 agonista
• Broncodilatação adicional

**Oxigenoterapia:**
• Se SatO2 < 92%
• Manter saturação > 94%

**Aplicação no Caso:**
Tiragem subcostal + sibilos + SatO2 94% = Crise MODERADA
Tratamento: Salbutamol + Corticoide sistêmico`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Crise leve; administrar apenas salbutamol inalatório.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSubestimação da gravidade:\n\n• **Sinais moderados:** Tiragem subcostal + SatO2 94%\n• **Tratamento insuficiente:** Apenas beta-2 agonista\n• **Corticoide necessário:** Crise moderada requer anti-inflamatório\n• **Risco:** Progressão para crise grave',
      category: 'incorrect',
      conceptsInvolved: ['subestimação', 'tratamento insuficiente', 'ausência de corticoide']
    },
    {
      letter: 'B',
      text: 'Crise moderada; salbutamol inalatório e corticoide sistêmico.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nAvaliação e tratamento adequados:\n\n• **Classificação:** Tiragem + sibilos + SatO2 94% = moderada\n• **Broncodilatador:** Salbutamol primeira linha\n• **Anti-inflamatório:** Corticoide sistêmico essencial\n• **Evidência:** Protocolo padrão para crise moderada\n• **Eficácia:** Combinação reduz hospitalização',
      category: 'correct',
      conceptsInvolved: ['crise moderada', 'salbutamol', 'corticoide sistêmico', 'tratamento combinado']
    },
    {
      letter: 'C',
      text: 'Crise grave; intubação imediata e ventilação mecânica.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSuperestimação da gravidade:\n\n• **Ausência de:** Dificuldade importante para falar, cianose\n• **SatO2:** 94% não indica crise grave (< 90%)\n• **Intubação prematura:** Deve ser última opção\n• **Tratamento inicial:** Beta-2 + corticoide devem ser tentados',
      category: 'incorrect',
      conceptsInvolved: ['superestimação', 'intubação prematura', 'ventilação desnecessária']
    },
    {
      letter: 'D',
      text: 'Administrar aminofilina endovenosa como primeira escolha.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nMedicação de segunda/terceira linha:\n\n• **Primeira linha:** Beta-2 agonistas inalatórios\n• **Aminofilina:** Reservada para casos refratários\n• **Efeitos adversos:** Maior risco de toxicidade\n• **Eficácia:** Inferior aos beta-2 agonistas',
      category: 'incorrect',
      conceptsInvolved: ['aminofilina inadequada', 'primeira linha incorreta', 'maior toxicidade']
    }
  ],

  metadata: {
    specialty: 'Pneumologia',
    difficulty: 'medium',
    tags: ['asma', 'crise asmática', 'broncodilatador', 'corticoide'],
    estimatedTime: 4,
    conceptsRequired: ['manejo da asma', 'broncodilatadores', 'classificação de gravidade'],
    learningObjectives: [
      'Classificar gravidade de crise asmática',
      'Aplicar tratamento escalonado',
      'Reconhecer indicações para corticoides',
      'Avaliar resposta ao tratamento'
    ]
  }
};