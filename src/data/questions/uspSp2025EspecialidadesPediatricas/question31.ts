import type { QuestionFlowData } from '../../../components/questionFlow/types';

export const question31FlowData: QuestionFlowData = {
  contextText: `
Uma criança de 3 anos é trazida pelos pais com queixa de "olho torto" que os pais notaram há alguns meses. A mãe relata que o desvio é mais evidente quando a criança está cansada ou concentrada em alguma atividade. Não há história de trauma ocular ou infecções.

Durante a consulta, observa-se que a criança apresenta desvio do olho esquerdo para dentro (convergente) de forma intermitente. O teste de oclusão alternada revela movimento de refixação quando o olho direito é ocluído.

**História clínica:**
- "Olho torto" notado pelos pais há 4 meses
- Desvio mais evidente em situações de cansaço
- Sem história de trauma ou infecções oculares
- Desenvolvimento neuropsicomotor normal
- Nega diplopia (pela idade, difícil avaliar)

**Exame oftalmológico:**
- Acuidade visual: Difícil avaliar precisamente pela idade
- Motilidade ocular: Limitação discreta da abdução OE
- Teste de oclusão alternada: Movimento de refixação presente
- Desvio convergente intermitente do olho esquerdo
- Reflexo fotomotor: Normal bilateralmente
- Fundoscopia: Normal

**Pergunta:** Qual é o diagnóstico mais provável e a conduta inicial mais adequada?
  `,

  explanationText: `
**Diagnóstico: Estrabismo Convergente (Esotropia) Acomodativo**

**Análise diagnóstica:**

O estrabismo é uma das principais causas de comprometimento visual na infância, afetando 2-4% das crianças. O caso apresenta características de esotropia acomodativa:

**Características do estrabismo acomodativo:**
- **Idade:** Típico entre 2-4 anos
- **Desvio:** Convergente (esotropia)
- **Variabilidade:** Intermitente, pior com fadiga/concentração
- **Refração:** Frequentemente associado à hipermetropia
- **Acomodação:** Esforço acomodativo excessivo causa convergência

**Fisiopatologia:**
Na hipermetropia não corrigida:
1. **Esforço acomodativo** para focalizar objetos
2. **Convergência excessiva** (sincinesia acomodação-convergência)
3. **Desalinhamento ocular** resultante
4. **Supressão** do olho desviado
5. **Risco de ambliopia** se não tratado

**Avaliação necessária:**
- **Refração sob cicloplegia:** Detectar hipermetropia
- **Avaliação da acuidade visual:** Cada olho separadamente
- **Teste de oclusão:** Quantificar desvio
- **Avaliação da estereopsis:** Função binocular

**Conduta inicial:**

**1. Correção refrativa:**
- **Óculos:** Prescrição total da hipermetropia
- **Objetivo:** Reduzir esforço acomodativo
- **Resposta:** Melhora significativa do desvio

**2. Oclusão:**
- **Indicação:** Se ambliopia detectada
- **Protocolo:** Oclusão do olho dominante
- **Duração:** Conforme gravidade da ambliopia

**3. Seguimento:**
- **Frequência:** A cada 3-4 meses inicialmente
- **Monitorização:** Acuidade visual, alinhamento
- **Cirurgia:** Se não responsivo ao tratamento clínico

O tratamento precoce é fundamental para preservar a visão binocular e prevenir ambliopia irreversível.
  `,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Paralisia do VI nervo craniano - investigação neurológica e ressonância magnética',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico neurológico inadequado:\n\n• **Variabilidade:** Paralisia do VI seria constante, não intermitente\n• **Idade:** Paralisia congênita seria evidente desde nascimento\n• **Motilidade:** Limitação descrita é discreta, não paralisia completa\n• **História:** Sem sinais neurológicos associados\n• **Evolução:** Quadro progressivo sugere causa refrativa',
      category: 'incorrect',
      conceptsInvolved: ['paralisia VI nervo', 'estrabismo paralítico', 'causas neurológicas']
    },
    {
      letter: 'B',
      text: 'Estrabismo convergente acomodativo - correção refrativa com óculos',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e tratamento adequados:\n\n• **Idade típica:** 2-4 anos para esotropia acomodativa\n• **Características:** Desvio intermitente, pior com fadiga/concentração\n• **Fisiopatologia:** Hipermetropia → esforço acomodativo → convergência excessiva\n• **Tratamento:** Correção refrativa total reduz esforço acomodativo\n• **Prognóstico:** Excelente resposta aos óculos na maioria dos casos\n• **Prevenção:** Evita desenvolvimento de ambliopia',
      category: 'correct',
      conceptsInvolved: ['esotropia acomodativa', 'correção refrativa', 'hipermetropia', 'tratamento conservador']
    },
    {
      letter: 'C',
      text: 'Pseudoestrabismo - observação e seguimento',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Teste de oclusão:** Movimento de refixação confirma estrabismo real\n• **Pseudoestrabismo:** Não apresenta movimento no teste de oclusão\n• **Anatomia:** Epicanto ou ponte nasal larga causam pseudoestrabismo\n• **Evolução:** Quadro descrito é estrabismo verdadeiro\n• **Conduta:** Observação seria inadequada',
      category: 'plausible',
      conceptsInvolved: ['pseudoestrabismo', 'teste de oclusão', 'anatomia palpebral']
    },
    {
      letter: 'D',
      text: 'Estrabismo congênito - cirurgia de retrocesso-ressecção precoce',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nTiming inadequado:\n\n• **Idade:** Estrabismo congênito seria evidente desde nascimento\n• **História:** Pais notaram há 4 meses, não desde nascimento\n• **Características:** Intermitência sugere causa acomodativa\n• **Tratamento:** Correção refrativa deve ser tentada primeiro\n• **Cirurgia:** Reservada para casos não responsivos',
      category: 'incorrect',
      conceptsInvolved: ['estrabismo congênito', 'cirurgia estrabismo', 'timing cirúrgico']
    },
    {
      letter: 'E',
      text: 'Síndrome de Duane - toxina botulínica no músculo reto medial',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico sindrômico inadequado:\n\n• **Síndrome de Duane:** Limitação severa da abdução, não discreta\n• **Retração palpebral:** Não descrita no caso\n• **Características:** Duane tipo I tem esotropia com limitação abdução severa\n• **Tratamento:** Toxina botulínica não é primeira linha\n• **Diagnóstico:** Quadro mais compatível com esotropia acomodativa',
      category: 'incorrect',
      conceptsInvolved: ['síndrome de Duane', 'estrabismo restritivo', 'toxina botulínica']
    }
  ],

  metadata: {
    specialty: 'Oftalmologia Pediátrica',
    difficulty: 'medium',
    tags: ['estrabismo', 'esotropia acomodativa', 'hipermetropia', 'correção refrativa', 'ambliopia'],
    estimatedTime: 4,
    conceptsRequired: ['estrabismo pediátrico', 'refração ocular', 'desenvolvimento visual', 'teste de oclusão'],
    learningObjectives: [
      'Reconhecer características da esotropia acomodativa',
      'Compreender relação entre hipermetropia e estrabismo',
      'Identificar importância da correção refrativa precoce',
      'Conhecer prevenção da ambliopia no estrabismo'
    ]
  }
};