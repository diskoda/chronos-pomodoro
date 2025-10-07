import type { FlowStageConfig } from './types';

// ==========================================
// CONFIGURAÇÕES DE CONTEÚDO PARA CADA ESTÁGIO
// ==========================================

export const stageConfigurations: Record<string, FlowStageConfig> = {
  // ===== ESTÁGIO INICIAL =====
  begin: {
    stage: 'begin',
    title: "Vamos começar esta jornada!",
    icon: "",
    buttonText: "Estou pronto, vamos lá!",
    content: `Olá! Sou o Dr. Skoda e será um prazer te acompanhar nesta questão!

Sobre esta questão:
{contextText}

Dica importante:
Leia com atenção cada palavra do enunciado e das alternativas. Na medicina, cada detalhe pode fazer a diferença entre o diagnóstico correto e um equívoco.

Seu objetivo:
Analise o cenário clínico apresentado e identifique a melhor abordagem baseada em evidências científicas.

Lembre-se:
• Não há pressa - qualidade > velocidade
• Pense como um pediatra experiente
• Considere o contexto familiar e social
• Aplique os princípios éticos da medicina

Quando estiver pronto, clique em continuar para ver a questão!`
  },

  // ===== ESTÁGIO DE QUESTÃO (SILENCIOSO) =====
  question: {
    stage: 'question',
    title: "Resolvendo a questão",
    icon: "",
    buttonText: "Continuar",
    content: `Agora é sua vez! Analise cuidadosamente o enunciado e as alternativas.

Lembre-se dos conceitos que discutimos e aplique seu conhecimento clínico.

Quando estiver pronto, selecione sua resposta e confirme!`
  },

  // ===== ESTÁGIO DE EXPLICAÇÃO =====
  explanation: {
    stage: 'explanation',
    title: "Hora de aprofundar o conhecimento!",
    icon: "",
    buttonText: "Sim, vamos analisar as alternativas!",
    content: `Excelente! Você fez sua escolha!

Agora, antes de revelarmos a resposta correta, vou te explicar os conceitos fundamentais que você precisa dominar para resolver esta questão com total segurança.

Base teórica essencial:

{explanationText}

Por que isso é importante?
Entender esses conceitos não apenas te ajuda a responder esta questão, mas também te prepara para situações reais na prática médica.

Próximos passos:
Agora que você tem uma base sólida, vamos analisar cada alternativa em detalhes. Você verá não apenas qual é a resposta correta, mas também por que cada opção está certa ou errada.

Preparado para a análise completa?`
  },

  // ===== CONFIGURAÇÕES PARA ANÁLISE (DINÂMICAS) =====
  analysis_correct: {
    stage: 'analysis',
    title: "Parabéns! Você acertou!",
    icon: "",
    buttonText: "Finalizar com sucesso!",
    content: `Excelente trabalho! Você escolheu a alternativa {selectedAlternative} e acertou em cheio! 

Seu raciocínio clínico está afiado! Vou explicar por que sua resposta está correta e também revisar as demais alternativas para consolidar ainda mais seu aprendizado.

{alternativesAnalysis}

**PONTOS-CHAVE PARA LEMBRAR:**
• Na medicina, cada pergunta tem um propósito específico
• A abordagem do paciente deve ser sempre empática e eficaz
• O contexto clínico orienta nossa tomada de decisão
• A comunicação é uma ferramenta terapêutica poderosa

**Continue assim!** Cada questão te aproxima mais de se tornar um pediatra excepcional! 

Você está no caminho certo! Continue confiante e estudando com dedicação.`
  },

  analysis_incorrect: {
    stage: 'analysis',
    title: "Vamos aprender juntos!",
    icon: "",
    buttonText: "Continuar aprendendo!",
    content: `Você escolheu a alternativa {selectedAlternative}. A resposta correta é a alternativa {correctAlternative}.

Não se preocupe! Errar faz parte do processo de aprendizado. Cada erro é uma oportunidade valiosa de crescimento. Vamos revisar todas as opções para que você entenda perfeitamente o raciocínio.

{alternativesAnalysis}

PONTOS-CHAVE PARA LEMBRAR:
• Na medicina, cada pergunta tem um propósito específico
• A abordagem do paciente deve ser sempre empática e eficaz
• O contexto clínico orienta nossa tomada de decisão
• A comunicação é uma ferramenta terapêutica poderosa

Continue assim! Cada questão te aproxima mais de se tornar um pediatra excepcional! 

Use este aprendizado como combustível para seguir estudando. Você tem potencial!`
  }
};

// ==========================================
// TEMPLATES PARA ANÁLISE DE ALTERNATIVAS
// ==========================================

export const alternativeAnalysisTemplate = `**ANÁLISE DETALHADA DAS ALTERNATIVAS:**

{alternatives}`;

export const alternativeItemTemplate = `**{icon} Alternativa {letter})**
{text}

{status}
{explanation}{selectedMark}`;

// ==========================================
// FUNÇÕES DE PROCESSAMENTO DE CONTEÚDO
// ==========================================

export function processStageContent(
  stageKey: string, 
  data: {
    contextText?: string;
    explanationText?: string;
    selectedAlternative?: string;
    correctAlternative?: string;
    alternativesAnalysis?: string;
  }
): FlowStageConfig {
  const config = stageConfigurations[stageKey];
  if (!config) {
    throw new Error(`Configuração não encontrada para o estágio: ${stageKey}`);
  }

  let processedContent = config.content;
  
  // Substituir placeholders
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      processedContent = processedContent.replace(
        new RegExp(`{${key}}`, 'g'), 
        value
      );
    }
  });

  return {
    ...config,
    content: processedContent
  };
}

export function generateAlternativesAnalysis(
  alternatives: Array<{
    letter: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }>,
  selectedAlternative: string
): string {
  const alternativeItems = alternatives.map(alt => {
    const icon = alt.isCorrect ? '' : '';
    const status = alt.isCorrect ? '**RESPOSTA CORRETA**' : '**INCORRETA**';
    const selectedMark = alt.letter === selectedAlternative ? '\n\n**Esta foi sua escolha**' : '';
    
    return alternativeItemTemplate
      .replace('{icon}', icon)
      .replace('{letter}', alt.letter)
      .replace('{text}', alt.text)
      .replace('{status}', status)
      .replace('{explanation}', alt.explanation)
      .replace('{selectedMark}', selectedMark);
  }).join('\n\n---\n\n');

  return alternativeAnalysisTemplate.replace('{alternatives}', alternativeItems);
}