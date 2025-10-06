import type { QuestionFlowData } from '../../../components/questionFlow/types';

// Template para nova questão USP-SP 2025 Especialidades Pediátricas
// 
// INSTRUÇÕES DE USO:
// 1. Copie este arquivo e renomeie para questionXX.ts (onde XX é o número da questão)
// 2. Substitua NUMERO_QUESTAO pelo número da questão
// 3. Substitua todos os placeholders [XXX] pelo conteúdo apropriado
// 4. Preencha todos os campos conforme o padrão estabelecido
// 5. Adicione a questão ao index.ts
//
// ESTRUTURA OBRIGATÓRIA:
// - contextText: Caso clínico detalhado com contexto educacional
// - explanationText: Explicação abrangente dos conceitos envolvidos
// - alternativesAnalysis: Análise de cada alternativa com explicações detalhadas
// - metadata: Informações sobre especialidade, dificuldade, tags, etc.

export const questionTEMPLATEFlowData: QuestionFlowData = {
  contextText: `Esta questão aborda [TEMA_QUESTAO], [CONTEXTO_RELEVANCIA].

[DESCRIÇÃO_CONCEITO_PRINCIPAL]

**Caso Clínico:** [CASO_CLINICO_DETALHADO]

**Pergunta:** [PERGUNTA_ESPECIFICA]`,

  explanationText: `Para resolver esta questão sobre [TEMA_QUESTAO], analise os seguintes aspectos:

**[TÓPICO_PRINCIPAL_1]:**

**[SUBTÓPICO_1]:**
• [PONTO_CHAVE_1]
• [PONTO_CHAVE_2]
• [PONTO_CHAVE_3]
• [PONTO_CHAVE_4]

**[SUBTÓPICO_2]:**
• [PONTO_CHAVE_1]
• [PONTO_CHAVE_2]
• [PONTO_CHAVE_3]
• [PONTO_CHAVE_4]

**[TÓPICO_PRINCIPAL_2]:**

**[CRITÉRIOS/CLASSIFICAÇÃO/MANEJO]:**
• [CRITÉRIO_1]
• [CRITÉRIO_2]
• [CRITÉRIO_3]
• [CRITÉRIO_4]

**[ORIENTAÇÕES_PRÁTICAS]:**
• [ORIENTAÇÃO_1]
• [ORIENTAÇÃO_2]
• [ORIENTAÇÃO_3]
• [ORIENTAÇÃO_4]

**Aplicação no Caso:**
[ANÁLISE_ESPECÍFICA_DO_CASO_APRESENTADO]`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: '[TEXTO_ALTERNATIVA_A]',
      isCorrect: false, // ou true se for a correta
      explanation: '❌ **INCORRETA**\n\n[TÍTULO_EXPLICAÇÃO]:\n\n• **[ASPECTO_1]:** [EXPLICAÇÃO_1]\n• **[ASPECTO_2]:** [EXPLICAÇÃO_2]\n• **[ASPECTO_3]:** [EXPLICAÇÃO_3]\n• **[CONCLUSÃO]:** [CONCLUSÃO_FINAL]',
      category: 'incorrect', // ou 'correct'
      conceptsInvolved: ['[CONCEITO_1]', '[CONCEITO_2]', '[CONCEITO_3]']
    },
    {
      letter: 'B',
      text: '[TEXTO_ALTERNATIVA_B]',
      isCorrect: false, // ou true se for a correta
      explanation: '❌ **INCORRETA**\n\n[TÍTULO_EXPLICAÇÃO]:\n\n• **[ASPECTO_1]:** [EXPLICAÇÃO_1]\n• **[ASPECTO_2]:** [EXPLICAÇÃO_2]\n• **[ASPECTO_3]:** [EXPLICAÇÃO_3]\n• **[CONCLUSÃO]:** [CONCLUSÃO_FINAL]',
      category: 'incorrect', // ou 'correct'
      conceptsInvolved: ['[CONCEITO_1]', '[CONCEITO_2]', '[CONCEITO_3]']
    },
    {
      letter: 'C',
      text: '[TEXTO_ALTERNATIVA_C]',
      isCorrect: false, // ou true se for a correta
      explanation: '❌ **INCORRETA**\n\n[TÍTULO_EXPLICAÇÃO]:\n\n• **[ASPECTO_1]:** [EXPLICAÇÃO_1]\n• **[ASPECTO_2]:** [EXPLICAÇÃO_2]\n• **[ASPECTO_3]:** [EXPLICAÇÃO_3]\n• **[CONCLUSÃO]:** [CONCLUSÃO_FINAL]',
      category: 'incorrect', // ou 'correct'
      conceptsInvolved: ['[CONCEITO_1]', '[CONCEITO_2]', '[CONCEITO_3]']
    },
    {
      letter: 'D',
      text: '[TEXTO_ALTERNATIVA_D]',
      isCorrect: false, // ou true se for a correta
      explanation: '❌ **INCORRETA**\n\n[TÍTULO_EXPLICAÇÃO]:\n\n• **[ASPECTO_1]:** [EXPLICAÇÃO_1]\n• **[ASPECTO_2]:** [EXPLICAÇÃO_2]\n• **[ASPECTO_3]:** [EXPLICAÇÃO_3]\n• **[CONCLUSÃO]:** [CONCLUSÃO_FINAL]',
      category: 'incorrect', // ou 'correct'
      conceptsInvolved: ['[CONCEITO_1]', '[CONCEITO_2]', '[CONCEITO_3]']
    }
  ],

  metadata: {
    specialty: 'Template', // Substituir por: 'Cardiologia', 'Pneumologia', 'Neurologia', etc.
    difficulty: 'medium', // 'easy', 'medium', 'hard'
    tags: ['template', 'exemplo', 'placeholder'], // Substituir por tags específicas
    estimatedTime: 4, // Tempo estimado em minutos
    conceptsRequired: ['[CONCEITO_REQUERIDO_1]', '[CONCEITO_REQUERIDO_2]', '[CONCEITO_REQUERIDO_3]'],
    learningObjectives: [
      '[OBJETIVO_APRENDIZADO_1]',
      '[OBJETIVO_APRENDIZADO_2]',
      '[OBJETIVO_APRENDIZADO_3]',
      '[OBJETIVO_APRENDIZADO_4]'
    ]
  }
};

// ESPECIALIDADES DISPONÍVEIS:
// - Imunizações
// - Desenvolvimento
// - Cardiologia
// - Pneumologia
// - Neurologia
// - Gastroenterologia
// - Hematologia
// - Endocrinologia
// - Nefrologia
// - Infectologia
// - Dermatologia
// - Ortopedia
// - Oftalmologia
// - Otorrinolaringologia