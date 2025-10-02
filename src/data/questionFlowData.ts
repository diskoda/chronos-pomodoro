interface QuestionFlowData {
  contextText: string;
  explanationText: string;
  alternativesAnalysis: Array<{
    letter: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }>;
}

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
      explanation: "Esta é a pergunta ideal na abordagem motivacional. É uma pergunta aberta que convida à reflexão sem criar confronto. Ela explora se o paciente já contemplou a cessação, permitindo avaliar em qual estágio de mudança ele se encontra. Estimula a motivação intrínseca e abre espaço para o diálogo terapêutico."
    },
    {
      letter: "B", 
      text: "Você já pensou nos riscos de fumar?",
      isCorrect: false,
      explanation: "Embora seja uma pergunta aberta, ela foca nos aspectos negativos do tabagismo de forma direta. Na abordagem motivacional, evitamos perguntas que possam soar como 'sermão' ou que coloquem o paciente em posição defensiva. Esta abordagem pode gerar resistência."
    },
    {
      letter: "C",
      text: "Você fuma quantos cigarros por dia?",
      isCorrect: false, 
      explanation: "Esta é uma pergunta fechada que busca informações quantitativas. Embora seja importante para a avaliação clínica, não é adequada para a abordagem motivacional inicial. Não estimula reflexão sobre mudança de comportamento."
    },
    {
      letter: "D",
      text: "Você sabe que o tabagismo pode piorar a asma?",
      isCorrect: false,
      explanation: "Esta pergunta é confrontativa e didática. Na abordagem motivacional, evitamos 'educar' de forma direta no primeiro momento, pois pode criar resistência. O paciente pode se sentir julgado ou repreendido, o que não favorece a mudança comportamental."
    }
  ]
};

// Função helper para buscar dados de fluxo por ID da questão
export function getQuestionFlowData(questionId: number): QuestionFlowData | null {
  switch (questionId) {
    case 1:
      return question1FlowData;
    default:
      return null;
  }
}