import type { QuestionFlowData } from '../../../components/questionFlow/types';

// Questão 22 - Diarreia aguda em lactente
export const question22FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o manejo da diarreia aguda em lactentes, uma causa importante de morbimortalidade em pediatria.

A diarreia aguda pode levar rapidamente à desidratação em lactentes devido ao maior turnover de água corporal.

**Caso Clínico:** Lactente de 8 meses apresenta diarreia há 2 dias (8-10 evacuações/dia), vômitos ocasionais e recusa alimentar. Ao exame: mucosas secas, turgor diminuído, olhos encovados, irritado.

**Pergunta:** Qual é o grau de desidratação e conduta inicial?`,

  explanationText: `A avaliação e manejo da desidratação em lactentes requer sistematização baseada em sinais clínicos:

**Classificação da Desidratação:**

**Ausente/Leve (< 3%):**
• Mucosas úmidas
• Turgor normal
• Diurese normal
• Criança alerta

**Moderada (3-9%):**
• Mucosas secas
• Turgor diminuído
• Olhos encovados
• Irritabilidade
• Fontanela deprimida

**Grave (≥ 10%):**
• Mucosas muito secas
• Turgor muito diminuído
• Olhos muito encovados
• Letargia/coma
• Pulso fraco/ausente
• Extremidades frias

**Manejo por Gravidade:**

**Desidratação Leve:**
• Soro de reidratação oral (SRO)
• Manter alimentação
• Acompanhamento ambulatorial

**Desidratação Moderada:**
• SRO como primeira escolha
• 75 mL/kg em 4-6 horas
• Reavaliação frequente
• Hidratação EV se falha do SRO

**Desidratação Grave:**
• Hidratação EV imediata
• Expansão volêmica se choque
• Monitorização contínua
• Correção eletrolítica

**Soro de Reidratação Oral:**
• Primeira escolha em desidratação leve/moderada
• Eficácia comprovada
• Menor custo e morbidade
• Administração domiciliar possível

**Sinais do Caso:**
Mucosas secas + turgor diminuído + olhos encovados + irritabilidade = Desidratação MODERADA`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Desidratação leve; orientar uso de soro de reidratação oral em casa.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSubestimação da gravidade:\n\n• **Sinais presentes:** Mucosas secas, turgor diminuído, olhos encovados\n• **Classificação:** Indica desidratação moderada\n• **Risco:** Subestimação pode levar à piora clínica\n• **Conduta:** Necessita supervisão médica mais próxima',
      category: 'incorrect',
      conceptsInvolved: ['subestimação', 'sinais de desidratação', 'classificação incorreta']
    },
    {
      letter: 'B',
      text: 'Desidratação moderada; iniciar soro de reidratação oral supervisionado.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nAvaliação e conduta adequadas:\n\n• **Sinais:** Mucosas secas + turgor diminuído + olhos encovados = moderada\n• **SRO:** Primeira escolha para desidratação moderada\n• **Supervisão:** Importante para monitorar resposta\n• **Evidência:** Abordagem recomendada pelas diretrizes\n• **Eficácia:** 75 mL/kg em 4-6h com reavaliação',
      category: 'correct',
      conceptsInvolved: ['desidratação moderada', 'SRO supervisionado', 'classificação correta']
    },
    {
      letter: 'C',
      text: 'Desidratação grave; hidratação venosa imediata em ambiente hospitalar.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSuperestimação da gravidade:\n\n• **Ausência de:** Letargia, pulso fraco, extremidades frias\n• **Presença de:** Irritabilidade (não letargia)\n• **Classificação:** Moderada, não grave\n• **Conduta:** Hidratação EV seria segunda escolha',
      category: 'incorrect',
      conceptsInvolved: ['superestimação', 'hidratação EV prematura', 'classificação excessiva']
    },
    {
      letter: 'D',
      text: 'Sem sinais de desidratação; manter apenas observação clínica.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSubestimação grave:\n\n• **Sinais evidentes:** Mucosas secas, turgor diminuído\n• **Risco:** Progressão para desidratação grave\n• **Negligência:** Ignorar sinais clínicos claros\n• **Conduta:** Necessidade de intervenção ativa',
      category: 'incorrect',
      conceptsInvolved: ['negligência clínica', 'sinais ignorados', 'subestimação perigosa']
    }
  ],

  metadata: {
    specialty: 'Gastroenterologia',
    difficulty: 'medium',
    tags: ['diarreia aguda', 'desidratação', 'SRO', 'lactente'],
    estimatedTime: 4,
    conceptsRequired: ['avaliação de desidratação', 'soro de reidratação oral', 'hidratação pediátrica'],
    learningObjectives: [
      'Classificar graus de desidratação',
      'Indicar soro de reidratação oral adequadamente',
      'Reconhecer sinais clínicos de desidratação',
      'Definir local de tratamento apropriado'
    ]
  }
};