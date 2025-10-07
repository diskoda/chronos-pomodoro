import type { StageConfig, FlowStage, AlternativeAnalysis } from './types';

// ==========================================
// STAGE CONTENT CONFIGURATIONS
// ==========================================

export const STAGE_CONFIGS: Record<string, StageConfig> = {
  begin: {
    stage: 'begin',
    title: "Vamos começar esta jornada!",
    buttonText: "Estou pronto, vamos lá!",
    content: `Olá! Sou o Dr. Skoda e será um prazer te acompanhar nesta questão!

Sobre esta questão:
{contextText}

**Dica importante:**
Leia com atenção cada palavra do enunciado e das alternativas. Na medicina, cada detalhe pode fazer a diferença entre o diagnóstico correto e um equívoco.

**Seu objetivo:**
Analise o cenário clínico apresentado e identifique a melhor abordagem baseada em evidências científicas.

**Lembre-se:**
• Não há pressa - qualidade > velocidade
• Pense como um pediatra experiente
• Considere o contexto familiar e social
• Aplique os princípios éticos da medicina

Quando estiver pronto, clique em continuar para ver a questão!`
  },

  explanation: {
    stage: 'explanation',
    title: "Hora de aprofundar o conhecimento!",
    buttonText: "Sim, vamos analisar as alternativas!",
    content: `Excelente! Você fez sua escolha!

Agora, antes de revelarmos a resposta correta, vou te explicar os conceitos fundamentais que você precisa dominar para resolver esta questão com total segurança.

**Base teórica essencial:**
{explanationText}

**Por que isso é importante?**
Entender esses conceitos não apenas te ajuda a responder esta questão, mas também te prepara para situações reais na prática médica.

**Próximos passos:**
Agora que você tem uma base sólida, vamos analisar cada alternativa em detalhes. Você verá não apenas qual é a resposta correta, mas também por que cada opção está certa ou errada.

Preparado para a análise completa?`
  },

  analysis_correct: {
    stage: 'analysis',
    title: "Parabéns! Você acertou!",
    buttonText: "Finalizar com sucesso!",
    content: `Excelente trabalho! Você escolheu a alternativa {selectedAlternative} e acertou em cheio! 

Seu raciocínio clínico está afiado! Vou explicar por que sua resposta está correta e também revisar as demais alternativas para consolidar ainda mais seu aprendizado.

{alternativesAnalysis}

**PONTOS-CHAVE PARA LEMBRAR:**
• Na medicina, cada pergunta tem um propósito específico
• A abordagem do paciente deve ser sempre empática e eficaz
• O contexto clínico orienta nossa tomada de decisão
• A comunicação é uma ferramenta terapêutica poderosa

Continue assim! Cada questão te aproxima mais de se tornar um pediatra excepcional! 

Você está no caminho certo! Continue confiante e estudando com dedicação.`
  },

  analysis_incorrect: {
    stage: 'analysis',
    title: "Vamos aprender juntos!",
    buttonText: "Continuar aprendendo!",
    content: `Você escolheu a alternativa {selectedAlternative}. A resposta correta é a alternativa {correctAlternative}.

Não se preocupe! Errar faz parte do processo de aprendizado. Cada erro é uma oportunidade valiosa de crescimento. Vamos revisar todas as opções para que você entenda perfeitamente o raciocínio.

{alternativesAnalysis}

**PONTOS-CHAVE PARA LEMBRAR:**
• Na medicina, cada pergunta tem um propósito específico
• A abordagem do paciente deve ser sempre empática e eficaz
• O contexto clínico orienta nossa tomada de decisão
• A comunicação é uma ferramenta terapêutica poderosa

Continue assim! Cada questão te aproxima mais de se tornar um pediatra excepcional! 

Use este aprendizado como combustível para seguir estudando. Você tem potencial!`
  }
};

// ==========================================
// CONTENT PROCESSING UTILITIES
// ==========================================

interface ContentData {
  contextText?: string;
  explanationText?: string;
  selectedAlternative?: string;
  correctAlternative?: string;
  alternativesAnalysis?: string;
}

export function processStageContent(stageKey: string, data: ContentData): StageConfig {
  const config = STAGE_CONFIGS[stageKey];
  if (!config) {
    throw new Error(`Stage configuration not found: ${stageKey}`);
  }

  let processedContent = config.content;
  
  // Replace placeholders
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      processedContent = processedContent.replace(
        new RegExp(`{${key}}`, 'g'), 
        String(value)
      );
    }
  });

  return {
    ...config,
    content: processedContent
  };
}

export function generateAlternativesAnalysis(
  alternatives: AlternativeAnalysis[],
  selectedAlternative: string
): string {
  const analysisItems = alternatives.map(alt => {
    const status = alt.isCorrect ? '**RESPOSTA CORRETA**' : '**INCORRETA**';
    const selectedMark = alt.letter === selectedAlternative 
      ? '\n\n**Esta foi sua escolha**' 
      : '';
    
    return `**Alternativa ${alt.letter})**
${alt.text}

${status}
${alt.explanation}${selectedMark}`;
  });

  return `**ANÁLISE DETALHADA DAS ALTERNATIVAS:**

${analysisItems.join('\n\n---\n\n')}`;
}

// ==========================================
// AUDIO CONFIGURATIONS
// ==========================================

export function getAudioConfig(questionId?: number, stage?: FlowStage) {
  if (questionId === 1) {
    switch (stage) {
      case 'begin':
        return {
          src: '/question1.1.mp3',
          requireCompletion: true,
          autoPlay: true
        };
      case 'explanation':
        return {
          sequence: ['/question1.2.mp3', '/question1.3.mp3', '/question1.4.mp3'],
          requireCompletion: true,
          autoPlay: true
        };
      default:
        return undefined;
    }
  }
  
  return undefined;
}