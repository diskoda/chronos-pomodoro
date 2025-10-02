import type { QuestionFlowData } from '../components/questionFlow/types';

// ==========================================
// DADOS DA QUESTÃO 1 - TABAGISMO/ENTREVISTA MOTIVACIONAL
// ==========================================

export const question1FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda um cenário muito comum na pediatria: o manejo da asma infantil em um contexto onde fatores ambientais (como o tabagismo dos pais) podem estar influenciando o quadro clínico.

Você está diante de uma situação que exige não apenas conhecimento médico, mas também habilidades de comunicação e abordagem motivacional. O objetivo é criar um ambiente propício para mudança de comportamento do pai tabagista.`,

  explanationText: `Para resolver esta questão, você precisa compreender os fundamentos da **entrevista motivacional**:

**Conceitos-chave:**

1. **Entrevista Motivacional**: Técnica de comunicação que visa despertar a motivação intrínseca da pessoa para a mudança de comportamento.

2. **Estágios de Mudança (Modelo Transteórico)**:
   - Pré-contemplação: pessoa não considera mudar
   - Contemplação: pessoa pondera sobre a mudança
   - Preparação: pessoa se prepara para agir
   - Ação: pessoa implementa a mudança
   - Manutenção: pessoa sustenta a mudança

3. **Princípios da Abordagem Motivacional**:
   - Expressar empatia
   - Desenvolver discrepância (entre comportamento atual e objetivos)
   - Aceitar a resistência sem confrontação
   - Fortalecer a autoeficácia

4. **Perguntas Abertas vs. Fechadas**: A abordagem motivacional privilegia perguntas que estimulem a reflexão, não o confronto.

No contexto desta questão, é fundamental identificar qual pergunta melhor explora a motivação intrínseca do pai para cessação do tabagismo.`,

  alternativesAnalysis: [
    {
      letter: "A",
      text: "Você já pensou em parar de fumar?",
      isCorrect: true,
      explanation: "Esta é a pergunta ideal na abordagem motivacional. É uma pergunta aberta que convida à reflexão sem criar confronto. Ela explora se o paciente já contemplou a cessação, permitindo avaliar em qual estágio de mudança ele se encontra. Estimula a motivação intrínseca e abre espaço para o diálogo terapêutico.",
      category: 'correct',
      conceptsInvolved: ['entrevista motivacional', 'pergunta aberta', 'reflexão', 'estágios de mudança']
    },
    {
      letter: "B", 
      text: "Você já pensou nos riscos de fumar?",
      isCorrect: false,
      explanation: "Embora seja uma pergunta aberta, ela foca nos aspectos negativos do tabagismo de forma direta. Na abordagem motivacional, evitamos perguntas que possam soar como 'sermão' ou que coloquem o paciente em posição defensiva. Esta abordagem pode gerar resistência.",
      category: 'plausible',
      conceptsInvolved: ['confrontação', 'resistência', 'abordagem defensiva']
    },
    {
      letter: "C",
      text: "Você fuma quantos cigarros por dia?",
      isCorrect: false, 
      explanation: "Esta é uma pergunta fechada que busca informações quantitativas. Embora seja importante para a avaliação clínica, não é adequada para a abordagem motivacional inicial. Não estimula reflexão sobre mudança de comportamento.",
      category: 'incorrect',
      conceptsInvolved: ['pergunta fechada', 'avaliação quantitativa', 'falta de reflexão']
    },
    {
      letter: "D",
      text: "Você sabe que o tabagismo pode piorar a asma?",
      isCorrect: false,
      explanation: "Esta pergunta é confrontativa e didática. Na abordagem motivacional, evitamos 'educar' de forma direta no primeiro momento, pois pode criar resistência. O paciente pode se sentir julgado ou repreendido, o que não favorece a mudança comportamental.",
      category: 'dangerous',
      conceptsInvolved: ['confrontação', 'educação prematura', 'resistência', 'julgamento']
    }
  ],
  metadata: {
    specialty: 'Pediatria',
    difficulty: 'medium',
    tags: ['comunicação', 'entrevista motivacional', 'tabagismo', 'asma infantil', 'comportamento'],
    estimatedTime: 8,
    conceptsRequired: ['entrevista motivacional', 'estágios de mudança', 'comunicação terapêutica'],
    learningObjectives: [
      'Aplicar técnicas de entrevista motivacional',
      'Identificar perguntas abertas vs. fechadas',
      'Evitar confrontação desnecessária',
      'Promover reflexão sobre mudança de comportamento'
    ]
  }
};

// ==========================================
// TEMPLATE PARA NOVAS QUESTÕES
// ==========================================

export const questionTemplateFlowData: QuestionFlowData = {
  contextText: `[CONTEXTO DA QUESTÃO]
  
Descreva brevemente:
- Cenário clínico apresentado
- Principais conceitos envolvidos
- Por que esta questão é relevante na prática`,

  explanationText: `[EXPLICAÇÃO TEÓRICA]

**Conceitos-chave:**

1. **Conceito Principal**: Definição e importância

2. **Conceitos Secundários**:
   - Tópico 1: explicação
   - Tópico 2: explicação

3. **Aplicação Prática**:
   - Como usar na prática
   - Quando aplicar

**Pontos importantes:**
- Lista de considerações especiais
- Cuidados a serem tomados`,

  alternativesAnalysis: [
    {
      letter: "A",
      text: "[Texto da alternativa A]",
      isCorrect: true, // ou false
      explanation: "[Explicação detalhada por que está correta/incorreta]",
      category: 'correct', // 'correct' | 'plausible' | 'incorrect' | 'dangerous'
      conceptsInvolved: ['conceito1', 'conceito2']
    },
    // ... demais alternativas
  ],
  metadata: {
    specialty: '[Especialidade]',
    difficulty: 'medium', // 'easy' | 'medium' | 'hard' | 'expert'
    tags: ['tag1', 'tag2'],
    estimatedTime: 8, // minutos
    conceptsRequired: ['conceito1', 'conceito2'],
    learningObjectives: [
      'Objetivo de aprendizado 1',
      'Objetivo de aprendizado 2'
    ]
  }
};

// ==========================================
// FUNÇÃO HELPER ATUALIZADA
// ==========================================

export function getQuestionFlowData(questionId: number): QuestionFlowData | null {
  switch (questionId) {
    case 1:
      return question1FlowData;
    default:
      return null;
  }
}

// ==========================================
// FUNÇÃO PARA ADICIONAR NOVAS QUESTÕES
// ==========================================

export function registerQuestionFlowData(questionId: number, data: QuestionFlowData): void {
  // Esta função pode ser usada para registrar dinamicamente novos dados
  // Implementação pode variar dependendo se queremos armazenar em localStorage,
  // enviar para API, etc.
  console.log(`Registrando dados de fluxo para questão ${questionId}:`, data);
}

// ==========================================
// VALIDADOR DE DADOS DE QUESTÃO
// ==========================================

export function validateQuestionFlowData(data: Partial<QuestionFlowData>): string[] {
  const errors: string[] = [];
  
  if (!data.contextText?.trim()) {
    errors.push('contextText é obrigatório');
  }
  
  if (!data.explanationText?.trim()) {
    errors.push('explanationText é obrigatório');
  }
  
  if (!data.alternativesAnalysis?.length) {
    errors.push('alternativesAnalysis deve ter pelo menos uma alternativa');
  } else {
    const correctCount = data.alternativesAnalysis.filter(alt => alt.isCorrect).length;
    if (correctCount !== 1) {
      errors.push('Deve haver exatamente uma alternativa correta');
    }
  }
  
  return errors;
}