import type { QuestionFlowData } from '../../../components/questionFlow/types';

export const question34FlowData: QuestionFlowData = {
  contextText: `
Uma criança de 2 anos é encaminhada para avaliação por atraso no desenvolvimento neuropsicomotor. Os pais relatam que ela não anda sozinha, fala apenas algumas palavras e apresenta comportamentos repetitivos. Nasceu de parto normal, a termo, sem intercorrências.

Ao exame físico, observa-se criança com face alongada, orelhas proeminentes e macrorquidismo. Apresenta hiperatividade e movimentos estereotipados das mãos. Evita contato visual e tem dificuldade de interação social.

**História familiar:**
- Mãe: 28 anos, desenvolvimento normal
- Pai: 30 anos, desenvolvimento normal  
- Tio materno: Deficiência intelectual, institucionalizado
- Primo materno (filho do tio): Atraso desenvolvimento
- Avó materna: "problemas de aprendizado" na infância

**Exame físico:**
- Estatura: P75 (normal para idade)
- Perímetro cefálico: P90 (macrocefalia relativa)
- Face alongada com testa proeminente
- Orelhas grandes e em abano
- Macrorquidismo pós-puberal
- Hipotonia generalizada leve

**Desenvolvimento neuropsicomotor:**
- Motor: Não anda sozinha (esperado aos 12-15 meses)
- Linguagem: 5-6 palavras (esperado > 50 palavras)
- Social: Evita contato visual, comportamentos repetitivos
- Cognitivo: Atraso evidente

**Pergunta:** Qual é a hipótese diagnóstica mais provável e o exame confirmatório indicado?
  `,

  explanationText: `
**Hipótese Diagnóstica: Síndrome do X Frágil**

**Análise diagnóstica:**

A síndrome do X frágil é a causa hereditária mais comum de deficiência intelectual e transtorno do espectro autista, causada por mutação no gene FMR1 (Fragile X Mental Retardation 1) no cromossomo X.

**Características clínicas:**

**Dismorfismos faciais:**
- **Face alongada** com testa proeminente
- **Orelhas grandes** e proeminentes
- **Prognatismo** (mais evidente com a idade)
- **Palato alto** e arqueado

**Características físicas:**
- **Macrorquidismo:** Pós-puberal (volume testicular > P95)
- **Macrocefalia:** Relativa ou absoluta
- **Hipotonia:** Generalizada
- **Hiperextensibilidade articular**

**Manifestações neurológicas:**
- **Deficiência intelectual:** Leve a severa
- **Atraso de linguagem:** Especialmente expressiva
- **Transtorno do espectro autista:** 25-50% dos casos
- **Comportamentos estereotipados:** "Flapping" das mãos
- **Hiperatividade e déficit atenção**

**Padrão de herança:**
- **Ligado ao X dominante** com penetrância reduzida
- **Expansão de repetições CGG** no gene FMR1
- **Pré-mutação:** 55-200 repetições (portadoras)
- **Mutação completa:** > 200 repetições (afetados)

**História familiar sugestiva:**
- **Herança materna:** Tio e primo maternos afetados
- **Mulheres portadoras:** Avó com dificuldades de aprendizado
- **Padrão característico:** Múltiplos homens afetados via linha materna

**Exame confirmatório:**

**Análise molecular do gene FMR1:**
- **Southern blot** ou **PCR quantitativo**
- **Quantificação das repetições CGG**
- **Status de metilação** da região promotora
- **Diagnóstico definitivo:** > 200 repetições CGG

**Aconselhamento genético:**
- **Risco de recorrência:** 50% para filhos homens de portadoras
- **Teste pré-natal:** Disponível
- **Rastreamento familiar:** Recomendado
- **Seguimento multidisciplinar:** Necessário

O diagnóstico precoce permite intervenção terapêutica adequada e aconselhamento genético familiar.
  `,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Transtorno do espectro autista idiopático - avaliação neuropsicológica e terapias comportamentais',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico incompleto:\n\n• **Dismorfismos:** TEA idiopático não apresenta características físicas específicas\n• **História familiar:** Padrão sugestivo de herança genética\n• **Macrorquidismo:** Não é característico do TEA isolado\n• **Investigação:** Características físicas justificam teste genético\n• **Etiologia:** Necessário investigar causa genética subjacente',
      category: 'plausible',
      conceptsInvolved: ['TEA', 'autismo idiopático', 'investigação genética']
    },
    {
      letter: 'B',
      text: 'Síndrome do X frágil - análise molecular do gene FMR1',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e investigação adequados:\n\n• **Tríade clássica:** Deficiência intelectual + dismorfismos + macrorquidismo\n• **História familiar:** Herança ligada ao X (tio e primo maternos)\n• **Fenótipo:** Face alongada, orelhas proeminentes, comportamentos estereotipados\n• **Exame confirmatório:** Análise molecular FMR1 para repetições CGG\n• **Importância:** Diagnóstico permite aconselhamento genético familiar\n• **Prevalência:** Causa genética mais comum de DI hereditária',
      category: 'correct',
      conceptsInvolved: ['síndrome X frágil', 'gene FMR1', 'herança ligada ao X', 'análise molecular']
    },
    {
      letter: 'C',
      text: 'Síndrome de Prader-Willi - teste de metilação da região 15q11-q13',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Hipotonia:** Na PWS é mais severa desde o nascimento\n• **Comportamento alimentar:** Hiperfagia não descrita\n• **Dismorfismos:** Face alongada não é típica da PWS\n• **História familiar:** PWS é esporádica, não hereditária\n• **Macrorquidismo:** Hipogonadismo é mais comum na PWS',
      category: 'incorrect',
      conceptsInvolved: ['síndrome Prader-Willi', 'metilação 15q11-q13', 'hipotonia neonatal']
    },
    {
      letter: 'D',
      text: 'Síndrome de Williams - FISH para deleção 7q11.23',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Face:** Williams tem face típica "élfica", não alongada\n• **Personalidade:** Hipersociabilidade, não evitação social\n• **Cardiopatia:** Estenose aórtica supravalvar não descrita\n• **História familiar:** Williams é esporádica\n• **Dismorfismos:** Padrão facial diferente do descrito',
      category: 'incorrect',
      conceptsInvolved: ['síndrome Williams', 'deleção 7q11.23', 'FISH', 'dismorfismos']
    },
    {
      letter: 'E',
      text: 'Síndrome de Down - cariótipo com pesquisa de mosaicismo',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Dismorfismos:** Face alongada não é típica da SD\n• **Orelhas:** Na SD são pequenas, não proeminentes\n• **História familiar:** SD é geralmente esporádica\n• **Fenótipo:** Padrão facial completamente diferente\n• **Macrorquidismo:** Não é característico da SD',
      category: 'incorrect',
      conceptsInvolved: ['síndrome Down', 'trissomia 21', 'cariótipo', 'mosaicismo']
    }
  ],

  metadata: {
    specialty: 'Genética Médica',
    difficulty: 'medium',
    tags: ['síndrome X frágil', 'gene FMR1', 'deficiência intelectual', 'herança ligada ao X', 'macrorquidismo'],
    estimatedTime: 5,
    conceptsRequired: ['síndromes genéticas', 'deficiência intelectual hereditária', 'herança ligada ao X', 'análise molecular'],
    learningObjectives: [
      'Reconhecer características clínicas da síndrome do X frágil',
      'Compreender padrão de herança ligada ao X',
      'Identificar importância da história familiar',
      'Conhecer métodos diagnósticos moleculares'
    ]
  }
};