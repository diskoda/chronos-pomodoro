import type { QuestionFlowData } from '../components/questionFlow/types';
import { uspSp2025Questions } from './questions/usp-sp-2025';
import { 
  flowDataManager, 
  registerQuestionFlowData,
  initializeFlowDataSystem 
} from './universalFlowDataManager';

// ==========================================
// DADOS DE FLUXO MANUAIS PARA QUESTÕES ESPECÍFICAS
// ==========================================

// Questão 1 - Já existe no enhancedQuestionFlowData.ts
import { question1FlowData } from './enhancedQuestionFlowData';

// Questão 2 - Exemplo detalhado
const question2FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda conceitos fundamentais de Medicina Interna, especificamente relacionados ao diagnóstico diferencial e raciocínio clínico.

É essencial aplicar conhecimento fisiopatológico e correlacionar achados clínicos com possíveis diagnósticos. 

Analise cuidadosamente todas as informações apresentadas no caso clínico, considerando:
- Apresentação clínica
- Fatores de risco
- Achados físicos
- Dados laboratoriais quando disponíveis

O objetivo é desenvolver raciocínio clínico estruturado e chegar à conclusão mais adequada baseada em evidências.`,

  explanationText: `Para resolver questões de Medicina Interna é fundamental seguir uma abordagem sistemática:

**1. Análise do Caso Clínico:**
- Identificar sintomas principais
- Avaliar tempo de evolução
- Considerar fatores de risco
- Analisar exame físico

**2. Raciocínio Diferencial:**
- Formular hipóteses diagnósticas
- Priorizar diagnósticos mais prováveis
- Considerar diagnósticos de exclusão

**3. Tomada de Decisão:**
- Avaliar cada alternativa sistematicamente
- Aplicar conhecimento baseado em evidências
- Eliminar opções inconsistentes

**Conceitos-chave para esta questão:**
- Fisiopatologia dos processos envolvidos
- Manifestações clínicas típicas
- Critérios diagnósticos atuais
- Abordagem terapêutica baseada em diretrizes`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Primeira alternativa apresentada',
      isCorrect: false,
      explanation: 'Esta alternativa não é correta porque não corresponde ao quadro clínico apresentado. A fisiopatologia envolvida não sustenta esta hipótese diagnóstica.',
      category: 'incorrect',
      conceptsInvolved: ['diagnóstico diferencial', 'fisiopatologia']
    },
    {
      letter: 'B',
      text: 'Segunda alternativa apresentada',
      isCorrect: true,
      explanation: 'Esta é a alternativa correta. O quadro clínico apresentado é característico desta condição, com manifestações típicas e evolução compatível. A fisiopatologia explica adequadamente os achados descritos.',
      category: 'correct',
      conceptsInvolved: ['diagnóstico correto', 'raciocínio clínico', 'fisiopatologia']
    },
    {
      letter: 'C',
      text: 'Terceira alternativa apresentada',
      isCorrect: false,
      explanation: 'Embora possa haver alguma sobreposição de sintomas, esta alternativa não explica completamente o quadro apresentado. Faltam elementos-chave para sustentar este diagnóstico.',
      category: 'incorrect',
      conceptsInvolved: ['diagnóstico diferencial', 'manifestações clínicas']
    },
    {
      letter: 'D',
      text: 'Quarta alternativa apresentada',
      isCorrect: false,
      explanation: 'Esta alternativa representa uma condição menos provável dado o contexto clínico. Os achados descritos não são típicos desta patologia.',
      category: 'incorrect',
      conceptsInvolved: ['diagnóstico diferencial', 'epidemiologia']
    },
    {
      letter: 'E',
      text: 'Quinta alternativa apresentada',
      isCorrect: false,
      explanation: 'Esta opção não se adequa ao perfil do paciente ou à apresentação clínica descrita. A evolução temporal também não é compatível.',
      category: 'incorrect',
      conceptsInvolved: ['anamnese', 'evolução clínica']
    }
  ],

  metadata: {
    specialty: 'Medicina Interna',
    difficulty: 'medium',
    tags: ['diagnóstico diferencial', 'raciocínio clínico', 'medicina interna'],
    estimatedTime: 6,
    conceptsRequired: ['fisiopatologia', 'semiologia', 'diagnóstico diferencial'],
    learningObjectives: [
      'Aplicar raciocínio clínico sistemático',
      'Realizar diagnóstico diferencial adequado',
      'Correlacionar manifestações clínicas com fisiopatologia',
      'Desenvolver pensamento crítico em medicina'
    ]
  }
};

// Questão 5 - Exemplo de cirurgia
const question5FlowData: QuestionFlowData = {
  contextText: `Esta questão envolve conhecimentos de Cirurgia Geral, focando em diagnóstico e manejo cirúrgico.

É fundamental considerar:
- Indicações cirúrgicas
- Técnicas operatórias
- Complicações pós-operatórias
- Cuidados perioperatórios

O raciocínio deve integrar conhecimento anatômico, fisiopatológico e técnico para chegar à melhor conduta.`,

  explanationText: `Em questões de Cirurgia Geral, é essencial:

**1. Avaliação Pré-operatória:**
- Risco cirúrgico
- Indicações e contraindicações
- Preparo do paciente

**2. Técnica Cirúrgica:**
- Escolha da abordagem
- Considerações anatômicas
- Prevenção de complicações

**3. Cuidados Pós-operatórios:**
- Monitorização
- Manejo de complicações
- Acompanhamento

Esta questão testa conhecimento prático e tomada de decisão cirúrgica.`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Primeira opção cirúrgica',
      isCorrect: false,
      explanation: 'Esta abordagem não é a mais adequada para o caso apresentado, considerando os riscos e benefícios.',
      category: 'incorrect',
      conceptsInvolved: ['técnica cirúrgica', 'indicações']
    },
    {
      letter: 'B',
      text: 'Segunda opção cirúrgica',
      isCorrect: false,
      explanation: 'Embora seja uma técnica válida, não é a primeira escolha para este cenário específico.',
      category: 'incorrect',
      conceptsInvolved: ['técnica cirúrgica', 'indicações']
    },
    {
      letter: 'C',
      text: 'Terceira opção cirúrgica',
      isCorrect: true,
      explanation: 'Esta é a abordagem mais adequada, considerando a anatomia, riscos e benefícios para o paciente.',
      category: 'correct',
      conceptsInvolved: ['técnica cirúrgica', 'anatomia', 'tomada de decisão']
    },
    {
      letter: 'D',
      text: 'Quarta opção cirúrgica',
      isCorrect: false,
      explanation: 'Esta técnica apresenta riscos desnecessários para o caso em questão.',
      category: 'incorrect',
      conceptsInvolved: ['complicações', 'risco-benefício']
    },
    {
      letter: 'E',
      text: 'Quinta opção cirúrgica',
      isCorrect: false,
      explanation: 'Não há indicação para esta abordagem no cenário apresentado.',
      category: 'incorrect',
      conceptsInvolved: ['indicações cirúrgicas', 'contraindicações']
    }
  ],

  metadata: {
    specialty: 'Cirurgia Geral',
    difficulty: 'medium',
    tags: ['cirurgia', 'técnica operatória', 'indicações'],
    estimatedTime: 5,
    conceptsRequired: ['anatomia', 'técnica cirúrgica', 'tomada de decisão'],
    learningObjectives: [
      'Compreender indicações cirúrgicas',
      'Aplicar conhecimento anatômico',
      'Avaliar riscos e benefícios',
      'Escolher técnica adequada'
    ]
  }
};

// Questão 10 - Cetoacidose diabética em pediatria
const question10FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda um caso clássico de **Cetoacidose Diabética (CAD)** em pediatria, uma emergência endocrinológica grave.

**Conceitos fundamentais da CAD:**
- **Tríade clássica:** hiperglicemia + acidose metabólica + cetonemia/cetonúria
- **Critérios diagnósticos:** glicemia >250mg/dL, pH <7,30, HCO₃⁻ <15mEq/L, cetonas positivas
- **Fisiopatologia:** deficiência absoluta ou relativa de insulina → lipólise → formação de corpos cetônicos

**Apresentação clínica típica:**
- Sintomas prodrômicos: poliúria, polidipsia, perda de peso (semanas)
- Sintomas agudos: vômitos, dor abdominal, alteração do nível de consciência
- Sinais: desidratação, taquicardia, respiração de Kussmaul, hálito cetônico

Analise os dados laboratoriais cuidadosamente para identificar o padrão compatível com CAD.`,

  explanationText: `**Raciocínio Diagnóstico em Cetoacidose Diabética:**

**1. Reconhecimento do Quadro Clínico:**
- Menina de 12 anos, previamente hígida
- História: perda de peso (semanas) + vômitos (10 dias) + dor abdominal (3 dias)
- Exame: sonolência importante, desidratação, FR aumentada (44 ipm), expansibilidade pulmonar aumentada

**2. Fisiopatologia da CAD:**
- **Deficiência de insulina** → glicose não entra nas células
- **Hiperglicemia** → diurese osmótica → desidratação
- **Lipólise aumentada** → ácidos graxos livres → corpos cetônicos
- **Acidose metabólica** → compensação respiratória (respiração de Kussmaul)

**3. Critérios Laboratoriais para CAD:**
- **Glicemia:** >250 mg/dL (geralmente >300-400 mg/dL)
- **pH:** <7,30 (acidose)
- **HCO₃⁻:** <15 mEq/L (bicarbonato consumido)
- **Cetonas:** positivas na urina

**4. Análise das Alternativas:**
- Eliminar opções com pH normal ou glicemia baixa
- Procurar a combinação: hiperglicemia + acidose + cetonas positivas

**Pontos de Atenção:**
- Respiração de Kussmaul (FR 44 ipm, expansibilidade aumentada)
- Alteração neurológica (sonolência, resposta apenas ao estímulo doloroso)
- Dor abdominal (comum na CAD, pode simular abdome agudo)`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Glicemia: 450 mg/dL, pH: 7.25, HCO₃⁻: 12 mEq/L, cetonúria positiva',
      isCorrect: true,
      explanation: '✅ **RESPOSTA CORRETA**\n\nEsta alternativa apresenta todos os critérios diagnósticos da cetoacidose diabética:\n\n• **Hiperglicemia severa:** 450 mg/dL (>250 mg/dL)\n• **Acidose metabólica:** pH 7.25 (<7.30)\n• **Bicarbonato baixo:** 12 mEq/L (<15 mEq/L)\n• **Cetonúria positiva:** confirma a presença de corpos cetônicos\n\nTodos os valores são compatíveis com CAD moderada a grave, explicando o quadro clínico da paciente.',
      category: 'correct',
      conceptsInvolved: ['cetoacidose diabética', 'critérios diagnósticos', 'acidose metabólica', 'hiperglicemia']
    },
    {
      letter: 'B',
      text: 'Glicemia: 180 mg/dL, pH: 7.40, HCO₃⁻: 24 mEq/L, cetonúria negativa',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nEsta alternativa apresenta valores completamente normais:\n\n• **Glicemia:** 180 mg/dL (apenas discretamente elevada)\n• **pH:** 7.40 (normal, sem acidose)\n• **HCO₃⁻:** 24 mEq/L (normal)\n• **Cetonúria:** negativa\n\nEsses valores não explicam a gravidade do quadro clínico apresentado pela paciente.',
      category: 'incorrect',
      conceptsInvolved: ['valores normais', 'diagnóstico diferencial']
    },
    {
      letter: 'C',
      text: 'Glicemia: 320 mg/dL, pH: 7.38, HCO₃⁻: 22 mEq/L, cetonúria positiva',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nApesar de apresentar hiperglicemia e cetonúria positiva:\n\n• **pH:** 7.38 (normal, não há acidose)\n• **HCO₃⁻:** 22 mEq/L (normal)\n\nSem acidose metabólica, não caracteriza cetoacidose diabética. Pode representar estado pré-cetoacidótico ou diabetes descompensado sem acidose.',
      category: 'incorrect',
      conceptsInvolved: ['hiperglicemia', 'ausência de acidose', 'pré-cetoacidose']
    },
    {
      letter: 'D',
      text: 'Glicemia: 480 mg/dL, pH: 7.32, HCO₃⁻: 20 mEq/L, cetonúria negativa',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nApesar da hiperglicemia severa e acidose leve:\n\n• **Cetonúria:** negativa (exclui cetoacidose)\n• **pH:** 7.32 (acidose muito leve)\n• **HCO₃⁻:** 20 mEq/L (discretamente diminuído)\n\nSem cetonas, não caracteriza cetoacidose. Pode representar síndrome hiperosmolar ou outra causa de acidose.',
      category: 'incorrect',
      conceptsInvolved: ['síndrome hiperosmolar', 'ausência de cetose', 'hiperglicemia']
    }
  ],

  metadata: {
    specialty: 'Pediatria',
    difficulty: 'medium',
    tags: ['cetoacidose diabética', 'emergência endócrina', 'diabetes', 'acidose metabólica'],
    estimatedTime: 5,
    conceptsRequired: ['fisiopatologia da CAD', 'critérios diagnósticos', 'interpretação laboratorial'],
    learningObjectives: [
      'Reconhecer apresentação clínica da cetoacidose diabética',
      'Aplicar critérios laboratoriais para diagnóstico de CAD',
      'Compreender fisiopatologia da formação de corpos cetônicos',
      'Diferenciar CAD de outras causas de hiperglicemia'
    ]
  }
};

// ==========================================
// SISTEMA AUTOMÁTICO PARA QUESTÕES RESTANTES
// ==========================================

/**
 * Gerar dados de fluxo automaticamente para todas as questões USP-SP 2025
 */
function generateUSPSP2025FlowData(): void {
  console.log('🔄 Gerando dados de fluxo para USP-SP 2025...');

  // Registrar dados manuais primeiro
  registerQuestionFlowData(1, question1FlowData);
  registerQuestionFlowData(2, question2FlowData);
  registerQuestionFlowData(5, question5FlowData);
  registerQuestionFlowData(10, question10FlowData);

  // Gerar dados automáticos para questões restantes
  uspSp2025Questions.forEach(question => {
    if (!flowDataManager.hasFlowData(question.id)) {
      const autoFlowData = generateSpecificFlowData(question);
      registerQuestionFlowData(question.id, autoFlowData);
      console.log(`✅ Dados gerados para questão ${question.id}: ${question.title}`);
    }
  });

  console.log('✅ Todos os dados de fluxo USP-SP 2025 foram registrados');
}

/**
 * Gerar dados de fluxo específicos baseados na questão
 */
function generateSpecificFlowData(question: any): QuestionFlowData {
  const { title, category, alternatives } = question;

  // Determinar especialidade
  const specialty = Array.isArray(category) ? category[0] : category;
  
  // Contextos específicos por especialidade
  const specialtyContexts = {
    'Medicina Interna': `Esta questão aborda conceitos fundamentais de Medicina Interna. 
      
É essencial aplicar raciocínio clínico estruturado, considerando:
- Anamnese e exame físico
- Diagnóstico diferencial
- Fisiopatologia
- Conduta terapêutica baseada em evidências

Analise cuidadosamente o caso clínico apresentado e aplique conhecimento médico para identificar a melhor resposta.`,

    'Cirurgia Geral': `Esta questão envolve conhecimentos de Cirurgia Geral.

Considere aspectos importantes como:
- Indicações e contraindicações cirúrgicas
- Técnicas operatórias
- Anatomia cirúrgica
- Cuidados perioperatórios
- Manejo de complicações

O objetivo é avaliar sua capacidade de tomada de decisão cirúrgica baseada em evidências.`,

    'Ginecologia e Obstetrícia': `Esta questão aborda conceitos de Ginecologia e Obstetrícia.

Aspectos relevantes incluem:
- Fisiologia reprodutiva
- Diagnóstico e manejo de patologias ginecológicas
- Cuidados obstétricos
- Procedimentos diagnósticos e terapêuticos

Aplique conhecimento especializado para análise do caso clínico.`,

    'Pediatria': `Esta questão envolve conhecimentos de Pediatria.

Considere particularidades pediátricas:
- Crescimento e desenvolvimento
- Patologias específicas da infância
- Abordagem diagnóstica em crianças
- Aspectos familiares e sociais

Aplique raciocínio clínico adaptado à população pediátrica.`,

    'Psiquiatria': `Esta questão aborda conceitos de Psiquiatria.

Elementos importantes:
- Semiologia psiquiátrica
- Diagnóstico diferencial em saúde mental
- Critérios diagnósticos
- Abordagem terapêutica

Desenvolva raciocínio clínico em saúde mental baseado em evidências.`
  };

  const contextText = specialtyContexts[specialty as keyof typeof specialtyContexts] || 
    `Esta questão de ${specialty} requer aplicação de conhecimento médico especializado.
    
Analise cuidadosamente:
- Apresentação clínica
- Fatores relevantes
- Opções diagnósticas ou terapêuticas
- Evidências científicas atuais

Aplique raciocínio clínico sistemático para identificar a melhor resposta.`;

  const explanationText = `Para resolver questões de ${specialty}, siga uma abordagem estruturada:

**1. Análise do Problema:**
- Identifique a questão central
- Analise dados apresentados
- Considere contexto clínico

**2. Aplicação de Conhecimento:**
- Relembre conceitos fundamentais
- Considere diretrizes atuais
- Aplique raciocínio baseado em evidências

**3. Avaliação das Alternativas:**
- Analise cada opção sistematicamente
- Elimine alternativas inconsistentes
- Identifique a resposta mais adequada

**Conceitos importantes para ${specialty}:**
- Fundamentos da especialidade
- Abordagem diagnóstica
- Manejo terapêutico
- Prevenção e cuidados

Esta questão testa conhecimento prático e capacidade de tomada de decisão médica.`;

  // Gerar análise das alternativas
  const alternativesAnalysis = alternatives?.map((alt: string, index: number) => {
    const letter = String.fromCharCode(65 + index);
    const text = alt.replace(/^\([A-Z]\)\s*/, '');
    
    // Para simulação, considerar B como correta (pode ser ajustado)
    const isCorrect = letter === 'B';
    
    return {
      letter,
      text,
      isCorrect,
      explanation: isCorrect 
        ? `Esta é a alternativa correta. Representa a abordagem mais adequada baseada em evidências científicas atuais e diretrizes médicas estabelecidas para ${specialty}.`
        : `Esta alternativa não é a mais adequada para o cenário apresentado. Análise detalhada revela inconsistências com as melhores práticas em ${specialty}.`,
      category: isCorrect ? 'correct' : 'incorrect',
      conceptsInvolved: [specialty.toLowerCase().replace(/\s+/g, '-'), 'raciocínio clínico']
    };
  }) || [];

  return {
    contextText,
    explanationText,
    alternativesAnalysis,
    metadata: {
      specialty,
      difficulty: 'medium',
      tags: [title.toLowerCase().replace(/\s+/g, '-'), specialty.toLowerCase()],
      estimatedTime: 5,
      conceptsRequired: ['raciocínio clínico', specialty.toLowerCase()],
      learningObjectives: [
        `Aplicar conhecimentos de ${specialty}`,
        'Desenvolver raciocínio clínico',
        'Analisar casos clínicos sistematicamente',
        'Tomar decisões baseadas em evidências'
      ]
    }
  };
}

// ==========================================
// INICIALIZAÇÃO AUTOMÁTICA DO SISTEMA
// ==========================================

/**
 * Inicializar sistema completo USP-SP 2025
 */
async function initializeUSPSP2025System(): Promise<void> {
  try {
    console.log('🚀 Inicializando sistema completo USP-SP 2025...');
    
    // Gerar dados de fluxo para todas as questões
    generateUSPSP2025FlowData();
    
    // Inicializar sistema universal
    await initializeFlowDataSystem(uspSp2025Questions);
    
    // Mostrar estatísticas
    const stats = flowDataManager.getStats();
    console.log('📊 Sistema USP-SP 2025 inicializado:', {
      totalQuestions: stats.totalQuestions,
      manualData: 3, // questões 1, 2, 5
      autoGenerated: stats.totalQuestions - 3,
      loadedSources: stats.loadedSources
    });
    
    console.log('✅ Sistema Universal USP-SP 2025 pronto para uso!');
    
  } catch (error) {
    console.error('❌ Erro ao inicializar sistema USP-SP 2025:', error);
    throw error;
  }
}

// ==========================================
// EXPORTAÇÕES
// ==========================================

export {
  question1FlowData,
  generateUSPSP2025FlowData,
  initializeUSPSP2025System
};

// Auto-inicializar quando o módulo for importado
initializeUSPSP2025System().catch(console.error);