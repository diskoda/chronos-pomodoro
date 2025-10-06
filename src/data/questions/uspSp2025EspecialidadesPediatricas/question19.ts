import type { QuestionFlowData } from '../../../components/questionFlow/types';

// Questão 19 - Diagnóstico diferencial de sopro cardíaco em criança
export const question19FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda avaliação cardiológica pediátrica, especificamente o diagnóstico diferencial de sopros cardíacos em crianças.

A ausculta cardíaca é fundamental na avaliação pediátrica, sendo necessário distinguir sopros inocentes de patológicos.

**Caso Clínico:** Criança de 4 anos apresenta sopro sistólico grau II/VI em foco pulmonar, detectado em exame de rotina. Criança assintomática, com desenvolvimento normal.

**Pergunta:** Qual característica sugere sopro inocente?`,

  explanationText: `Para avaliar sopros cardíacos em pediatria, considere as características distintivas:

**Sopros Inocentes (Funcionais):**

**Características:**
• Intensidade: Grau I-II/VI
• Timing: Sistólico
• Localização: Borda esternal esquerda
• Qualidade: Musical, vibrante
• Variação: Com posição e respiração
• Irradiação: Limitada

**Condições associadas:**
• Criança assintomática
• Exame físico normal
• Ausência de sintomas cardíacos
• Desenvolvimento normal

**Sopros Patológicos:**

**Sinais de alerta:**
• Intensidade ≥ III/VI
• Sopros diastólicos (sempre patológicos)
• Sopros holosistólicos
• Irradiação extensa
• Presença de fremito

**Sintomas associados:**
• Dispneia, fadiga
• Cianose
• Retardo do crescimento
• Sinais de ICC

**Avaliação Complementar:**
• ECG: Geralmente normal em sopros inocentes
• Ecocardiograma: Se dúvida diagnóstica
• História familiar: Cardiopatias congênitas

O sopro descrito (sistólico II/VI, foco pulmonar, criança assintomática) tem características típicas de sopro inocente.`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Presença de fremito palpável.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nIndicador de sopro patológico:\n\n• **Fremito:** Vibração palpável indica fluxo turbulento significativo\n• **Significado:** Sopro intenso (≥ IV/VI)\n• **Patologia:** Sugere obstrução ou shunt importante\n• **Sopro inocente:** Nunca apresenta fremito',
      category: 'incorrect',
      conceptsInvolved: ['fremito', 'sopro patológico', 'turbulência']
    },
    {
      letter: 'B',
      text: 'Sopro sistólico grau II/VI que varia com a posição.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nCaracterística típica de sopro inocente:\n\n• **Intensidade baixa:** Grau II/VI é compatible com sopro funcional\n• **Variação postural:** Sopros inocentes mudam com posição\n• **Mecanismo:** Alteração do retorno venoso modifica intensidade\n• **Ausência de patologia:** Variação indica origem funcional\n• **Tranquilidade:** Característica reassuradora',
      category: 'correct',
      conceptsInvolved: ['sopro inocente', 'variação postural', 'intensidade baixa']
    },
    {
      letter: 'C',
      text: 'Sopro holosistólico com irradiação para axila.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nCaracterísticas de sopro patológico:\n\n• **Holosistólico:** Ocupar toda sístole sugere regurgitação\n• **Irradiação:** Propagação para axila indica intensidade alta\n• **Patologia:** Típico de insuficiência mitral\n• **Investigação:** Necessita ecocardiograma urgente',
      category: 'incorrect',
      conceptsInvolved: ['sopro holosistólico', 'irradiação', 'regurgitação']
    },
    {
      letter: 'D',
      text: 'Componente diastólico audível.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSempre patológico:\n\n• **Sopro diastólico:** Nunca é inocente\n• **Patologia:** Indica regurgitação aórtica ou pulmonar\n• **Investigação obrigatória:** Ecocardiograma urgente\n• **Gravidade:** Pode indicar doença valvar significativa',
      category: 'incorrect',
      conceptsInvolved: ['sopro diastólico', 'sempre patológico', 'regurgitação']
    }
  ],

  metadata: {
    specialty: 'Cardiologia',
    difficulty: 'medium',
    tags: ['sopro cardíaco', 'sopro inocente', 'ausculta', 'cardiologia pediátrica'],
    estimatedTime: 4,
    conceptsRequired: ['ausculta cardíaca', 'sopros cardíacos', 'semiologia cardiovascular'],
    learningObjectives: [
      'Distinguir sopros inocentes de patológicos',
      'Reconhecer características de sopros funcionais',
      'Avaliar necessidade de investigação cardiológica',
      'Aplicar semiologia cardiovascular em pediatria'
    ]
  }
};