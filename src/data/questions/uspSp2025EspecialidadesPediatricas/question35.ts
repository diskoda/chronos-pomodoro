import type { QuestionFlowData } from '../../../components/questionFlow/types';

export const question35FlowData: QuestionFlowData = {
  contextText: `
Um recém-nascido a termo (39 semanas), nascido de parto vaginal, apresenta dificuldade respiratória logo após o nascimento. O líquido amniótico estava meconial espesso. O bebê foi aspirado na sala de parto e recebeu ventilação com pressão positiva por 2 minutos, com boa resposta.

Após 2 horas de vida, desenvolveu taquipneia, tiragem intercostal e cianose central. A radiografia de tórax mostra infiltrados grosseiros bilaterais com padrão reticulogranular e imagens de pneumatoceles.

**História perinatal:**
- IG: 39 semanas (termo)
- Parto vaginal após trabalho de parto prolongado
- Líquido amniótico meconial espesso (grau III)
- Apgar: 6/8 (1º/5º minutos)
- Peso: 3.200g (adequado para IG)

**Exame físico atual (2h vida):**
- FR: 70 irpm
- FC: 160 bpm
- Cianose central
- Tiragem intercostal moderada
- Murmúrio vesicular diminuído bilateralmente
- Estertores grosseiros difusos

**Radiografia de tórax:**
- Infiltrados bilaterais grosseiros
- Padrão reticulogranular
- Imagens sugestivas de pneumatoceles
- Hiperinsuflação pulmonar
- Sem pneumotórax evidente

**Pergunta:** Qual é o diagnóstico mais provável e a complicação que deve ser monitorizada de perto?
  `,

  explanationText: `
**Diagnóstico: Síndrome de Aspiração Meconial (SAM)**

**Análise diagnóstica:**

A síndrome de aspiração meconial é uma emergência neonatal que ocorre quando o feto aspira líquido amniótico contaminado com mecônio, causando obstrução das vias aéreas e pneumonite química.

**Fisiopatologia:**
1. **Sofrimento fetal** → eliminação de mecônio intrauterino
2. **Gasping fetal** → aspiração de líquido amniótico meconial
3. **Mecanismos de lesão:**
   - **Obstrução mecânica:** Mecônio nas vias aéreas
   - **Pneumonite química:** Inflamação por mecônio
   - **Inativação do surfactante:** Disfunção alveolar
   - **Vasoconstrição pulmonar:** Hipertensão pulmonar

**Fatores de risco:**
- **Pós-maturidade:** > 42 semanas
- **Sofrimento fetal:** CTG alterado
- **Oligodrâmnio:** Concentração do mecônio
- **Trabalho de parto prolongado**

**Manifestações clínicas:**
- **Início precoce:** Primeiras horas de vida
- **Desconforto respiratório:** Taquipneia, tiragem, cianose
- **Radiologia:** Infiltrados grosseiros, hiperinsuflação
- **Pneumatoceles:** Imagens císticas características

**Complicação mais temida:**

**PNEUMOTÓRAX:**
- **Incidência:** 10-30% dos casos de SAM
- **Mecanismo:** Hiperinsuflação + obstrução valvular → ruptura alveolar
- **Manifestação:** Deterioração súbita, deslocamento mediastinal
- **Gravidade:** Pode ser bilateral e recorrente
- **Mortalidade:** Alta se não tratado rapidamente

**Outras complicações:**
- **Hipertensão pulmonar persistente:** HTPP
- **Pneumonia secundária:** Infecção bacteriana
- **Síndrome do escape aéreo:** Pneumomediastino, pneumopericárdio

**Manejo:**
1. **Suporte ventilatório:** O2, CPAP, VM conforme gravidade
2. **Monitorização contínua:** Gasometria, radiografia seriada
3. **Surfactante:** Se déficit associado
4. **Antibióticos:** Profilaxia de infecção secundária
5. **Manejo da HTPP:** iNO, sedação

**Monitorização prioritária:**
- **Radiografias seriadas:** Detecção precoce de pneumotórax
- **Gasometrias frequentes:** Acidose, hipoxemia
- **Sinais vitais:** Deterioração súbita
- **Drenagem torácica:** Disponível imediatamente

O reconhecimento precoce e manejo adequado são fundamentais para prevenir complicações fatais.
  `,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Doença das membranas hialinas - monitorizar síndrome do escape aéreo',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Idade gestacional:** DMH é típica de prematuros, não RN termo\n• **História:** Líquido amniótico meconial é patognomônico de SAM\n• **Radiologia:** Padrão reticulogranular da DMH é diferente dos infiltrados grosseiros\n• **Fatores de risco:** RN termo com mecônio não tem risco para DMH\n• **Pneumatoceles:** Não são típicas da DMH',
      category: 'incorrect',
      conceptsInvolved: ['DMH', 'síndrome escape aéreo', 'prematuridade']
    },
    {
      letter: 'B',
      text: 'Síndrome de aspiração meconial - monitorizar pneumotórax',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e complicação adequados:\n\n• **História patognomônica:** Líquido amniótico meconial espesso + desconforto respiratório\n• **Radiologia típica:** Infiltrados grosseiros + pneumatoceles\n• **Fisiopatologia:** Aspiração de mecônio causa obstrução e pneumonite\n• **Complicação mais temida:** Pneumotórax (10-30% dos casos)\n• **Mecanismo:** Hiperinsuflação + obstrução valvular → ruptura alveolar\n• **Monitorização:** Radiografias seriadas e vigilância de deterioração súbita',
      category: 'correct',
      conceptsInvolved: ['SAM', 'pneumotórax', 'hiperinsuflação', 'síndrome escape aéreo']
    },
    {
      letter: 'C',
      text: 'Pneumonia neonatal - monitorizar sepse e choque séptico',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **História específica:** Mecônio no líquido amniótico é diagnóstico de SAM\n• **Cronologia:** Sintomas imediatos pós-parto sugerem aspiração\n• **Radiologia:** Pneumatoceles não são típicas de pneumonia\n• **Fisiopatologia:** Pneumonite química, não infecciosa inicialmente\n• **Complicação:** Pneumotórax é mais importante que sepse neste contexto',
      category: 'plausible',
      conceptsInvolved: ['pneumonia neonatal', 'sepse', 'infecção bacteriana']
    },
    {
      letter: 'D',
      text: 'Hipertensão pulmonar persistente - monitorizar cianose diferencial',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico secundário:\n\n• **HTPP:** É complicação da SAM, não diagnóstico primário\n• **Cianose diferencial:** Sinal de HTPP, mas não a complicação mais imediata\n• **Prioridade:** Pneumotórax é mais agudo e fatal que HTPP\n• **Sequência:** SAM → pneumotórax → HTPP possível\n• **Monitorização:** Pneumotórax deve ser prioridade',
      category: 'plausible',
      conceptsInvolved: ['HTPP', 'cianose diferencial', 'complicações SAM']
    },
    {
      letter: 'E',
      text: 'Taquipneia transitória do RN - observação e suporte',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico incompatível:\n\n• **TTRN:** Quadro benigno, autolimitado\n• **História:** Mecônio no LA exclui TTRN\n• **Gravidade:** Sintomas descritos são muito intensos para TTRN\n• **Radiologia:** Infiltrados grosseiros e pneumatoceles não são da TTRN\n• **Evolução:** TTRN melhora espontaneamente, não requer monitorização intensiva',
      category: 'incorrect',
      conceptsInvolved: ['TTRN', 'desconforto respiratório transitório', 'observação']
    }
  ],

  metadata: {
    specialty: 'Neonatologia',
    difficulty: 'medium',
    tags: ['SAM', 'aspiração meconial', 'pneumotórax', 'líquido amniótico meconial', 'desconforto respiratório'],
    estimatedTime: 4,
    conceptsRequired: ['emergências neonatais', 'aspiração meconial', 'síndrome escape aéreo', 'pneumotórax neonatal'],
    learningObjectives: [
      'Reconhecer síndrome de aspiração meconial',
      'Compreender fisiopatologia da obstrução por mecônio',
      'Identificar complicações da SAM (pneumotórax)',
      'Conhecer importância da monitorização radiológica'
    ]
  }
};