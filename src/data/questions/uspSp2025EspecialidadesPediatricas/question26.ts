import type { QuestionFlowData } from '../../../components/questionFlow/core/types';

// Questão 26 - Diabetes mellitus tipo 1 em escolar
export const question26FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o diagnóstico e manejo inicial do diabetes mellitus tipo 1 (DM1) em pediatria, uma emergência endocrinológica que requer reconhecimento e tratamento imediatos.

O DM1 é a forma mais comum de diabetes na infância, caracterizado por destruição autoimune das células beta pancreáticas.

**Caso Clínico:** Escolar de 9 anos apresenta há 3 semanas poliúria, polidipsia, polifagia e perda de peso de 4 kg. Hoje acorda com vômitos, dor abdominal e hálito cetônico. Glicemia capilar: 450 mg/dL.

**Pergunta:** Qual é o diagnóstico mais provável e conduta inicial mais apropriada?`,

  explanationText: `O diagnóstico e manejo do DM1 requer reconhecimento dos sintomas clássicos e tratamento imediato da cetoacidose:

**Apresentação Clínica do DM1:**

**Sintomas Clássicos (poliúria, polidipsia, polifagia):**
• Poliúria: > 2L/dia ou enurese secundária
• Polidipsia: Sede excessiva, ingestão > 3L/dia
• Polifagia: Fome excessiva paradoxal
• Perda de peso: Apesar da polifagia

**Sintomas de Descompensação:**
• Vômitos, dor abdominal
• Desidratação progressiva
• Hálito cetônico (odor de maçã)
• Alteração do nível de consciência
• Respiração de Kussmaul

**Critérios Diagnósticos:**
• Glicemia de jejum ≥ 126 mg/dL
• Glicemia casual ≥ 200 mg/dL + sintomas
• Teste oral tolerância ≥ 200 mg/dL (2h)
• HbA1c ≥ 6,5%

**Cetoacidose Diabética (CAD):**

**Critérios:**
• Glicemia > 250 mg/dL
• pH < 7,3 ou bicarbonato < 15 mEq/L
• Cetonemia/cetonúria positiva

**Gravidade:**
• Leve: pH 7,25-7,30
• Moderada: pH 7,10-7,24
• Grave: pH < 7,10

**Manejo Inicial da CAD:**

**Hidratação:**
• Avaliar grau de desidratação
• Expansão inicial: SF 0,9% 10-20 mL/kg
• Manutenção: SF 0,45% + reposição

**Insulina:**
• Insulina regular EV contínua
• Dose: 0,1 UI/kg/h
• Reduzir glicemia 50-100 mg/dL/h

**Monitorização:**
• Glicemia horária
• Gasometria, eletrólitos
• Balanço hídrico rigoroso
• Nível de consciência

**Complicações:**
• Edema cerebral (principal causa morte)
• Hipoglicemia, hipocalemia
• Distúrbios eletrolíticos

**Aplicação no Caso:**
Sintomas clássicos + perda peso + glicemia 450 mg/dL + vômitos + hálito cetônico = DM1 com CAD`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Diabetes tipo 2; iniciar metformina e orientação dietética.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nTipo de diabetes inadequado:\n\n• **Idade:** 9 anos, mais sugestivo de DM1\n• **Apresentação:** Sintomas agudos com cetose\n• **Perda de peso:** Típica de DM1, não DM2\n• **Urgência:** CAD requer insulina imediata, não metformina',
      category: 'incorrect',
      conceptsInvolved: ['tipo diabetes incorreto', 'metformina inadequada', 'urgência não reconhecida']
    },
    {
      letter: 'B',
      text: 'Diabetes tipo 1 com cetoacidose; hidratação e insulina endovenosa.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e tratamento adequados:\n\n• **DM1:** Idade, sintomas agudos, perda peso, cetose\n• **CAD:** Glicemia alta + vômitos + hálito cetônico\n• **Hidratação:** Primeira medida, corrigir desidratação\n• **Insulina EV:** Essencial para reversão da cetose\n• **Urgência reconhecida:** Emergência endocrinológica',
      category: 'correct',
      conceptsInvolved: ['DM1 com CAD', 'hidratação', 'insulina EV', 'emergência endócrina']
    },
    {
      letter: 'C',
      text: 'Hiperglicemia de estresse; observação e hidratação oral.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSubestimação da gravidade:\n\n• **Sintomas crônicos:** 3 semanas de poliúria/polidipsia\n• **Glicemia muito elevada:** 450 mg/dL não é estresse\n• **Cetose evidente:** Hálito cetônico indica DM1\n• **Conduta inadequada:** CAD requer tratamento imediato',
      category: 'incorrect',
      conceptsInvolved: ['hiperglicemia estresse incorreta', 'subestimação', 'tratamento inadequado']
    },
    {
      letter: 'D',
      text: 'Diabetes MODY; solicitar teste genético e insulina subcutânea.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nTipo raro e timing inadequado:\n\n• **MODY:** Raro, geralmente sem cetose\n• **Apresentação atípica:** CAD não é comum em MODY\n• **Urgência:** Teste genético não é prioritário\n• **Insulina SC:** CAD requer insulina endovenosa',
      category: 'incorrect',
      conceptsInvolved: ['MODY inadequado', 'teste genético não urgente', 'insulina SC inadequada']
    }
  ],

  metadata: {
    specialty: 'Endocrinologia',
    difficulty: 'medium',
    tags: ['diabetes tipo 1', 'cetoacidose diabética', 'insulina', 'emergência endócrina'],
    estimatedTime: 5,
    conceptsRequired: ['diabetes mellitus', 'cetoacidose diabética', 'emergências endócrinas'],
    learningObjectives: [
      'Reconhecer apresentação clínica do DM1',
      'Diagnosticar cetoacidose diabética',
      'Iniciar tratamento emergencial adequado',
      'Distinguir DM1 de outras formas de diabetes'
    ]
  }
};
