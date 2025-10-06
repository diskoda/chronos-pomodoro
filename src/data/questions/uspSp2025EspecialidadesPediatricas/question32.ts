import type { QuestionFlowData } from '../../../components/questionFlow/types';

export const question32FlowData: QuestionFlowData = {
  contextText: `
Uma criança de 8 anos é trazida pelos pais com história de massa abdominal palpável, perda de peso e febre intermitente há 3 semanas. A mãe relata que a criança está mais irritada, com diminuição do apetite e episódios de dor abdominal.

Ao exame físico, palpa-se massa de aproximadamente 8 cm no hipocôndrio direito, de consistência endurecida, móvel e indolor. A criança apresenta palidez cutânea e adenomegalia cervical bilateral. Não há hepatomegalia ou esplenomegalia.

**História clínica:**
- Massa abdominal notada há 3 semanas
- Perda de peso: 3 kg no último mês
- Febre intermitente (38-38,5°C)
- Dor abdominal esporádica
- Irritabilidade e anorexia
- Sem história familiar de neoplasias

**Exame físico:**
- Estado geral: Regular, criança pálida
- Massa abdominal: 8 cm, hipocôndrio direito, móvel, endurecida
- Adenomegalia cervical bilateral (linfonodos < 2 cm)
- Sem hepatoesplenomegalia
- Sem outras massas palpáveis

**Laboratório:**
- Hemoglobina: 9,2 g/dL
- Leucócitos: 12.000/mm³
- Plaquetas: 450.000/mm³
- VHS: 65 mm/h
- LDH: 850 U/L (normal: 200-400)
- Ferritina: 420 ng/mL (elevada)

**Pergunta:** Qual é a hipótese diagnóstica mais provável e o próximo passo na investigação?
  `,

  explanationText: `
**Hipótese Diagnóstica: Tumor de Wilms (Nefroblastoma)**

**Análise diagnóstica:**

O tumor de Wilms é o tumor renal maligno mais comum na infância, representando 90% dos tumores renais pediátricos. O caso apresenta características típicas:

**Epidemiologia:**
- **Idade:** Pico entre 3-4 anos, mas pode ocorrer até 10 anos
- **Localização:** Unilateral em 95% dos casos
- **Genética:** Associações com WT1, WT2, p53

**Manifestações clínicas:**
- **Massa abdominal:** Principal sintoma (80-90%)
- **Dor abdominal:** Presente em 30-40%
- **Hematúria:** Macroscópica em 20%, microscópica em 60%
- **Hipertensão:** 25% dos casos (secreção de renina)
- **Febre:** Menos comum, sugere necrose tumoral

**Sinais de alerta:**
- **Massa de crescimento rápido**
- **Sintomas sistêmicos:** Perda de peso, febre
- **Laboratório:** Anemia, LDH elevado
- **Localização:** Região lombar/flanco

**Investigação necessária:**

**Próximo passo - Ultrassom abdominal:**
- **Não invasivo:** Primeira escolha em pediatria
- **Identificação:** Origem renal da massa
- **Características:** Solidez, vascularização
- **Extensão:** Invasão de estruturas adjacentes

**Seguimento investigativo:**
1. **TC de abdome com contraste:** Estadiamento local
2. **TC de tórax:** Pesquisa de metástases pulmonares
3. **Ressonância magnética:** Avaliação de invasão vascular
4. **Biópsia:** Geralmente evitada (risco de ruptura/disseminação)

**Estadiamento:**
- **Estágio I:** Tumor limitado ao rim, completamente ressecado
- **Estágio II:** Extensão além do rim, mas completamente ressecado
- **Estágio III:** Tumor residual após cirurgia
- **Estágio IV:** Metástases hematogênicas
- **Estágio V:** Bilateral

O diagnóstico precoce e estadiamento adequado são fundamentais para o planejamento terapêutico e prognóstico.
  `,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Linfoma de Burkitt - biópsia de linfonodo cervical',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Localização:** Linfoma de Burkitt abdominal acomete região ileocecal\n• **Massa:** Não é caracteristicamente na região renal\n• **Adenomegalia:** Linfonodos cervicais são pequenos (< 2 cm)\n• **Laboratório:** LDH muito elevado seria esperado no Burkitt\n• **Investigação:** Massa abdominal requer estudo por imagem primeiro',
      category: 'plausible',
      conceptsInvolved: ['linfoma de Burkitt', 'massas abdominais', 'adenomegalias']
    },
    {
      letter: 'B',
      text: 'Tumor de Wilms - ultrassom abdominal e TC de tórax',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e investigação adequados:\n\n• **Características típicas:** Massa renal em criança < 10 anos\n• **Apresentação:** Massa abdominal + sintomas sistêmicos\n• **Investigação inicial:** USG abdominal (não invasivo, primeira escolha)\n• **Estadiamento:** TC tórax para pesquisa de metástases pulmonares\n• **Sequência lógica:** Confirmar origem renal → estadiamento\n• **Evitar biópsia:** Risco de ruptura e disseminação tumoral',
      category: 'correct',
      conceptsInvolved: ['tumor de Wilms', 'ultrassom abdominal', 'estadiamento', 'investigação por imagem']
    },
    {
      letter: 'C',
      text: 'Neuroblastoma - dosagem de catecolaminas urinárias e MIBG',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico menos provável:\n\n• **Localização:** Neuroblastoma abdominal é mais paravertebral\n• **Idade:** Mais comum < 5 anos\n• **Características:** Massa menos móvel, mais fixa\n• **Investigação:** USG seria primeiro passo, não marcadores\n• **Mobilidade:** Massa móvel é mais sugestiva de origem renal',
      category: 'plausible',
      conceptsInvolved: ['neuroblastoma', 'catecolaminas', 'MIBG', 'massas abdominais']
    },
    {
      letter: 'D',
      text: 'Hepatoblastoma - alfafetoproteína e TC abdominal',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nLocalização inadequada:\n\n• **Anatomia:** Massa está no hipocôndrio direito, mas não é hepatomegalia\n• **Exame:** Ausência de hepatomegalia descarta origem hepática\n• **Idade:** Hepatoblastoma é mais comum < 3 anos\n• **Investigação:** USG seria primeiro passo antes da TC\n• **Marcador:** AFP seria útil apenas se origem hepática confirmada',
      category: 'incorrect',
      conceptsInvolved: ['hepatoblastoma', 'alfafetoproteína', 'massas hepáticas']
    },
    {
      letter: 'E',
      text: 'Leucemia linfoblástica aguda - mielograma e imunofenotipagem',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Massa sólida:** LLA não forma massas abdominais palpáveis\n• **Hemograma:** Não há blastos circulantes descritos\n• **Organomegalia:** Ausência de hepatoesplenomegalia\n• **Investigação:** Massa abdominal requer estudo anatômico\n• **Prioridade:** Definir origem da massa antes de mielograma',
      category: 'incorrect',
      conceptsInvolved: ['LLA', 'mielograma', 'massas abdominais', 'investigação hematológica']
    }
  ],

  metadata: {
    specialty: 'Oncologia Pediátrica',
    difficulty: 'medium',
    tags: ['tumor de Wilms', 'nefroblastoma', 'massa abdominal', 'ultrassom', 'estadiamento'],
    estimatedTime: 5,
    conceptsRequired: ['tumores renais pediátricos', 'investigação por imagem', 'oncologia pediátrica', 'estadiamento tumoral'],
    learningObjectives: [
      'Reconhecer apresentação clínica do tumor de Wilms',
      'Compreender investigação sequencial de massas abdominais',
      'Identificar importância do ultrassom como primeiro exame',
      'Conhecer princípios do estadiamento em oncologia pediátrica'
    ]
  }
};