import type { QuestionFlowData } from '../../../components/questionFlow/core/types';

// Questão 21 - Convulsão febril em lactente
export const question21FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o manejo de convulsões febris em pediatria, uma emergência comum na prática pediátrica.

Convulsões febris são eventos neurológicos transitórios associados à febre, mais frequentes entre 6 meses e 5 anos.

**Caso Clínico:** Lactente de 18 meses é trazido ao pronto-socorro após episódio convulsivo tônico-clônico generalizado com duração de 3 minutos, associado à febre de 39,5°C. Primeira convulsão da criança.

**Pergunta:** Qual é a classificação e conduta inicial mais apropriada?`,

  explanationText: `O manejo de convulsões febris requer classificação adequada e abordagem sistematizada:

**Definição:**
• Convulsão associada à febre (≥38°C)
• Idade: 6 meses a 5 anos
• Ausência de infecção do SNC
• Sem história prévia de convulsões afebrís

**Classificação:**

**Convulsão Febril Simples:**
• Duração: < 15 minutos
• Tipo: Tônico-clônica generalizada
• Sem recorrência em 24h
• Prognóstico excelente

**Convulsão Febril Complexa:**
• Duração: ≥ 15 minutos
• Focal ou parcial
• Recorrência em 24h
• Déficit neurológico pós-ictal

**Investigação:**

**Convulsão Simples:**
• Investigação da causa da febre
• Hemograma, hemocultura se indicado
• EEG: Não rotineiro
• Neuroimagem: Não indicada

**Convulsão Complexa:**
• Investigação mais ampla
• Considerar EEG
• TC/RM se déficit focal
• Punção lombar se suspeita de meningite

**Conduta Imediata:**
• Manter vias aéreas pérvias
• Controle da febre
• Benzodiazepínicos se convulsão prolongada
• Investigar foco infeccioso

**Orientação Familiar:**
• Baixo risco de epilepsia
• Recorrência: 30-40%
• Medidas durante convulsão
• Quando procurar atendimento

O caso descrito é uma convulsão febril simples (primeira convulsão, duração < 15 min, generalizada).`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Convulsão febril complexa; realizar EEG e TC de crânio imediatamente.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nClassificação equivocada:\n\n• **Critérios:** Primeira convulsão, duração 3 min, generalizada\n• **Classificação correta:** Convulsão febril simples\n• **Investigação desnecessária:** EEG e TC não indicados\n• **Conduta excessiva:** Superinvestigação sem benefício',
      category: 'incorrect',
      conceptsInvolved: ['classificação incorreta', 'superinvestigação', 'convulsão simples']
    },
    {
      letter: 'B',
      text: 'Convulsão febril simples; investigar foco infeccioso e orientar familiares.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nAbordagem adequada:\n\n• **Classificação:** Simples (primeira, < 15 min, generalizada)\n• **Investigação:** Focar na causa da febre\n• **Orientação:** Fundamental para tranquilizar família\n• **Prognóstico:** Excelente, baixo risco de sequelas\n• **Seguimento:** Acompanhamento pediátrico rotineiro',
      category: 'correct',
      conceptsInvolved: ['convulsão febril simples', 'investigação adequada', 'orientação familiar']
    },
    {
      letter: 'C',
      text: 'Iniciar anticonvulsivante profilático e internação para observação.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nConduta excessiva:\n\n• **Anticonvulsivante:** Não indicado em convulsão febril simples\n• **Profilaxia:** Não recomendada devido ao baixo risco\n• **Internação:** Desnecessária se criança estável\n• **Custo-benefício:** Riscos superam benefícios',
      category: 'incorrect',
      conceptsInvolved: ['anticonvulsivante desnecessário', 'internação excessiva', 'profilaxia inadequada']
    },
    {
      letter: 'D',
      text: 'Realizar punção lombar de urgência para descartar meningite.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nIndicação inadequada:\n\n• **Critérios:** Ausência de sinais meníngeos\n• **Idade:** 18 meses (não neonato)\n• **Convulsão simples:** Sem indicação rotineira para PL\n• **Risco-benefício:** Procedimento invasivo desnecessário',
      category: 'incorrect',
      conceptsInvolved: ['punção lombar desnecessária', 'ausência de indicação', 'procedimento invasivo']
    }
  ],

  metadata: {
    specialty: 'Neurologia',
    difficulty: 'medium',
    tags: ['convulsão febril', 'emergência neurológica', 'lactente', 'febre'],
    estimatedTime: 4,
    conceptsRequired: ['convulsões febris', 'emergências neurológicas', 'classificação neurológica'],
    learningObjectives: [
      'Classificar convulsões febris simples vs complexas',
      'Definir investigação apropriada',
      'Orientar adequadamente familiares',
      'Reconhecer indicações para neuroimagem'
    ]
  }
};
