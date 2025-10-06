import type { QuestionFlowData } from '../../../components/questionFlow/types';

// Questão 25 - Infecção do trato urinário em lactente
export const question25FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o diagnóstico e manejo da infecção do trato urinário (ITU) em lactentes, uma condição que pode causar sequelas renais se não tratada adequadamente.

A ITU em lactentes apresenta sintomas inespecíficos, tornando o diagnóstico desafiador e exigindo alto índice de suspeição.

**Caso Clínico:** Lactente de 8 meses apresenta febre de 39°C há 2 dias, irritabilidade, vômitos e recusa alimentar. Exame físico normal, exceto pela febre. Urina coletada por saco coletor: leucócitos 50/campo, nitrito positivo, bactérias abundantes.

**Pergunta:** Qual é a conduta mais apropriada para confirmação diagnóstica?`,

  explanationText: `O diagnóstico de ITU em lactentes requer cuidados especiais devido aos sintomas inespecíficos e risco de contaminação:

**Apresentação Clínica por Idade:**

**Lactentes < 2 anos:**
• Febre sem foco aparente
• Irritabilidade, letargia
• Vômitos, diarreia
• Recusa alimentar
• Retardo do crescimento

**Pré-escolares:**
• Disúria, urgência miccional
• Enurese secundária
• Dor abdominal
• Febre pode estar ausente

**Escolares:**
• Sintomas clássicos de cistite
• Disúria, polaciúria
• Dor suprapúbica
• Hematúria macroscópica

**Coleta de Urina:**

**Lactentes:**
• Punção suprapúbica: Padrão-ouro
• Cateterismo vesical: Segunda opção
• Saco coletor: Alto risco contaminação

**Crianças continentes:**
• Jato médio com higiene adequada
• Supervisão da coleta
• Orientação prévia importante

**Interpretação do Exame:**

**Punção suprapúbica:**
• Qualquer crescimento bacteriano
• Método mais confiável

**Cateterismo vesical:**
• ≥ 10⁴ UFC/mL (meninas)
• ≥ 10³ UFC/mL (meninos)

**Jato médio:**
• ≥ 10⁵ UFC/mL
• Considerar sintomas clínicos

**Saco coletor:**
• Alto risco de contaminação
• Resultado positivo deve ser confirmado
• Nunca confiar em resultado isolado

**Investigação Complementar:**
• Hemograma: Leucocitose, VHS elevado
• Função renal: Ureia, creatinina
• Proteína C reativa aumentada
• Hemocultura se ITU febril

**Aplicação no Caso:**
Lactente febril + urina de saco coletor alterada = NECESSITA confirmação por método confiável`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Iniciar antibioticoterapia imediatamente baseado na urina do saco coletor.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nRisco de tratamento desnecessário:\n\n• **Saco coletor:** Alto risco de contaminação (até 85%)\n• **Falso positivo:** Pode não ser ITU verdadeira\n• **Antibiótico desnecessário:** Risco de resistência bacteriana\n• **Confirmação obrigatória:** Método confiável necessário',
      category: 'incorrect',
      conceptsInvolved: ['saco coletor inadequado', 'risco contaminação', 'antibiótico desnecessário']
    },
    {
      letter: 'B',
      text: 'Coletar nova amostra por cateterismo vesical para confirmação.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nMétodo diagnóstico adequado:\n\n• **Confirmação necessária:** Saco coletor não é confiável\n• **Cateterismo vesical:** Método de escolha em lactentes\n• **Baixa contaminação:** Técnica estéril confiável\n• **Decisão terapêutica:** Baseada em resultado confiável\n• **Padrão de cuidado:** Recomendação das diretrizes',
      category: 'correct',
      conceptsInvolved: ['cateterismo vesical', 'confirmação diagnóstica', 'método confiável', 'padrão de cuidado']
    },
    {
      letter: 'C',
      text: 'Repetir coleta com saco coletor após higiene rigorosa.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nPersistência do problema:\n\n• **Saco coletor:** Risco de contaminação permanece alto\n• **Higiene rigorosa:** Não elimina risco de contaminação\n• **Delay diagnóstico:** Perda de tempo em lactente febril\n• **Método inadequado:** Não recomendado para diagnóstico',
      category: 'incorrect',
      conceptsInvolved: ['saco coletor persistente', 'contaminação inevitável', 'delay diagnóstico']
    },
    {
      letter: 'D',
      text: 'Aguardar melhora clínica sem confirmação laboratorial.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nNegligência diagnóstica:\n\n• **ITU possível:** Lactente febril com EAS alterado\n• **Risco de complicações:** Pielonefrite, sepse, cicatrizes renais\n• **Janela terapêutica:** Tempo é crucial em ITU pediátrica\n• **Padrão de cuidado:** Investigação obrigatória',
      category: 'incorrect',
      conceptsInvolved: ['negligência diagnóstica', 'risco complicações', 'perda de oportunidade']
    }
  ],

  metadata: {
    specialty: 'Nefrologia',
    difficulty: 'medium',
    tags: ['ITU', 'infecção urinária', 'cateterismo vesical', 'lactente'],
    estimatedTime: 4,
    conceptsRequired: ['infecções urinárias', 'métodos de coleta', 'diagnóstico em lactentes'],
    learningObjectives: [
      'Reconhecer apresentação de ITU em lactentes',
      'Escolher método adequado de coleta de urina',
      'Interpretar resultados de urocultura',
      'Evitar falsos positivos por contaminação'
    ]
  }
};