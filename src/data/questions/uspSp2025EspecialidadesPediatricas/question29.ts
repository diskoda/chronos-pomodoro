import type { QuestionFlowData } from '../../../components/questionFlow/types';

export const question29FlowData: QuestionFlowData = {
  contextText: `
Uma criança de 4 anos é trazida pelos pais com história de lesões cutâneas que iniciaram há 3 dias. As lesões começaram como pequenas vesículas no couro cabeludo e se espalharam para face, tronco e membros.

Ao exame físico, observam-se lesões em diferentes estágios evolutivos: máculas eritematosas, vesículas com conteúdo claro, pústulas e crostas. As lesões são pruriginosas. A criança apresenta febre baixa (37,8°C) e discreto mal-estar.

**História:**
- Início há 3 dias com vesículas no couro cabeludo
- Disseminação centrífuga para todo o corpo
- Prurido intenso
- Febre baixa e mal-estar
- Irmão de 7 anos apresentou quadro similar há 2 semanas

**Exame físico:**
- Lesões polimórficas (máculas, vesículas, pústulas, crostas)
- Distribuição centrífuga (couro cabeludo → face → tronco → membros)
- Prurido intenso
- Febre baixa (37,8°C)
- Estado geral preservado

**Pergunta:** Qual é o diagnóstico mais provável e a conduta terapêutica adequada?
  `,

  explanationText: `
**Diagnóstico: Varicela (Catapora)**

**Análise diagnóstica:**

A varicela é uma infecção viral altamente contagiosa causada pelo vírus varicela-zóster (VVZ). O caso apresenta características patognomônicas:

**Sinais patognomônicos:**
- **Lesões polimórficas:** Coexistência de diferentes estágios evolutivos
- **Distribuição centrífuga:** Início no couro cabeludo/face → tronco → membros
- **Evolução:** Mácula → vesícula → pústula → crosta
- **História epidemiológica:** Contato com irmão infectado

**Evolução das lesões:**
1. **Mácula eritematosa** (12-24h)
2. **Vesícula** com conteúdo claro (24-48h)
3. **Pústula** (48-72h)
4. **Crosta** (5-10 dias)

**Conduta terapêutica:**

**Medidas gerais:**
- **Isolamento:** Até que todas as lesões estejam em crosta
- **Sintomático:** Antitérmicos (paracetamol - evitar AAS)
- **Antipruriginoso:** Anti-histamínicos, calamina tópica
- **Higiene:** Banhos mornos, manter unhas curtas

**Antiviral (aciclovir):**
- **Indicação específica:** Imunodeprimidos, > 12 anos, complicações
- **Criança imunocompetente < 12 anos:** Geralmente não indicado
- **Dose:** 20 mg/kg/dose, 4x/dia por 5 dias (se indicado)

**Complicações a monitorar:**
- Infecção bacteriana secundária
- Pneumonia viral
- Encefalite (rara)
- Síndrome de Reye (uso de AAS)
  `,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Herpes simples - aciclovir oral e cuidados locais',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico equivocado:\n\n• **Distribuição:** Herpes simples é localizado, não disseminado\n• **Lesões:** HSV não apresenta lesões polimórficas típicas\n• **Epidemiologia:** Primo-infecção herpética é menos comum\n• **Evolução:** Padrão centrífugo não é característico do HSV',
      category: 'incorrect',
      conceptsInvolved: ['herpes simples', 'distribuição das lesões', 'diagnóstico diferencial']
    },
    {
      letter: 'B',
      text: 'Impetigo bolhoso - antibioticoterapia sistêmica',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico bacteriano inadequado:\n\n• **Lesões:** Impetigo não apresenta vesículas com conteúdo claro\n• **Distribuição:** Padrão não é característico do impetigo\n• **Evolução:** Não há progressão mácula → vesícula → crosta\n• **Epidemiologia:** História familiar sugere infecção viral',
      category: 'incorrect',
      conceptsInvolved: ['impetigo', 'infecções bacterianas', 'morfologia das lesões']
    },
    {
      letter: 'C',
      text: 'Varicela - tratamento sintomático e isolamento até formação de crostas',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e conduta adequados:\n\n• **Lesões polimórficas:** Patognomônico da varicela\n• **Distribuição centrífuga:** Típica do VVZ\n• **História epidemiológica:** Contato com irmão confirma\n• **Conduta:** Tratamento sintomático em criança imunocompetente\n• **Isolamento:** Até que todas as lesões estejam em crosta\n• **Antiviral:** Não indicado em < 12 anos imunocompetentes',
      category: 'correct',
      conceptsInvolved: ['varicela', 'tratamento sintomático', 'isolamento', 'prevenção transmissão']
    },
    {
      letter: 'D',
      text: 'Eczema herpeticum - aciclovir endovenoso e corticosteroides',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Pré-condição:** Eczema herpeticum ocorre sobre dermatite atópica\n• **História:** Não há relato de dermatite prévia\n• **Gravidade:** Não há sinais de infecção disseminada grave\n• **Corticosteroides:** Contraindicados em infecção viral ativa',
      category: 'incorrect',
      conceptsInvolved: ['eczema herpeticum', 'dermatite atópica', 'complicações virais']
    },
    {
      letter: 'E',
      text: 'Eritema multiforme - corticosteroides sistêmicos e suporte sintomático',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Lesões:** Eritema multiforme apresenta lesões em alvo\n• **Morfologia:** Não há vesículas típicas da varicela\n• **Distribuição:** Padrão acrófilo, não centrífugo\n• **Evolução:** Não há progressão vesícula → crosta',
      category: 'incorrect',
      conceptsInvolved: ['eritema multiforme', 'lesões em alvo', 'morfologia dermatológica']
    }
  ],

  metadata: {
    specialty: 'Dermatologia Pediátrica',
    difficulty: 'medium',
    tags: ['varicela', 'VVZ', 'lesões polimórficas', 'isolamento', 'tratamento sintomático'],
    estimatedTime: 4,
    conceptsRequired: ['viroses exantemáticas', 'varicela-zóster', 'isolamento de contato', 'tratamento sintomático'],
    learningObjectives: [
      'Reconhecer características patognomônicas da varicela',
      'Compreender evolução das lesões varicela',
      'Identificar indicações para tratamento antiviral',
      'Conhecer medidas de isolamento e prevenção'
    ]
  }
};