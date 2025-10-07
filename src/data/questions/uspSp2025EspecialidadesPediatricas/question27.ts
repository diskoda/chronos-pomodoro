import type { QuestionFlowData } from '../../../components/questionFlow/core/types';

export const question27FlowData: QuestionFlowData = {
  contextText: `
Um recém-nascido de 2 dias de vida, nascido a termo, apresenta sialorreia abundante e episódios de cianose durante as tentativas de alimentação. O exame físico revela acúmulo de secreções na boca e dificuldade para deglutir. A mãe relata que o bebê "engasga" sempre que tenta oferecer o seio materno.

A radiografia de tórax mostra distensão gasosa discreta no estômago. Foi realizada tentativa de passagem de sonda nasogástrica, que não progrediu além de 10-12 cm da narina.

**Dados vitais:**
- Frequência cardíaca: 140 bpm
- Frequência respiratória: 45 irpm
- Saturação de O2: 92% em ar ambiente
- Temperatura: 36,8°C

**Exame físico:**
- Abundante secreção oral espumosa
- Tiragem intercostal leve
- Ausculta pulmonar com estertores finos em bases
- Abdome levemente distendido
- Sem outras malformações evidentes

**Pergunta:** Qual é o diagnóstico mais provável e a conduta inicial mais adequada?
  `,

  explanationText: `
**Diagnóstico: Atresia de Esôfago com Fístula Traqueoesofágica**

**Análise do caso:**

A apresentação clínica é patognomônica de atresia de esôfago (AE):
- **Sialorreia abundante** (impossibilidade de deglutir saliva)
- **Cianose durante alimentação** (por aspiração)
- **Impossibilidade de progressão da sonda nasogástrica** (confirmação diagnóstica)
- **Distensão gasosa do estômago** (sugere fístula traqueoesofágica distal)

**Fisiopatologia:**
A atresia de esôfago tipo C (85% dos casos) apresenta:
- Bolsa esofágica superior em fundo cego
- Fístula entre esôfago distal e traqueia
- Passagem de ar para o estômago através da fístula

**Conduta inicial:**
1. **Posição proclive** (30-45°) - evita refluxo gastroesofágico
2. **Aspiração contínua** da bolsa esofágica superior
3. **Jejum absoluto** - nada via oral
4. **Preparo cirúrgico** urgente
5. **Suporte respiratório** conforme necessário
6. **Investigação de malformações associadas** (VACTERL)

**Técnica cirúrgica:**
- Ligadura da fístula traqueoesofágica
- Anastomose esofagogástrica primária
- Timing ideal: primeiras 24-48 horas de vida

A intervenção precoce previne complicações como pneumonia aspirativa recorrente e melhora o prognóstico a longo prazo.
  `,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Refluxo gastroesofágico severo - iniciar bloqueador de bomba de prótons e espessante lácteo',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Idade:** RGE severo é raro no período neonatal imediato\n• **Sinalização:** Sialorreia não é característica do RGE\n• **Teste diagnóstico:** Impossibilidade de passagem da sonda exclui RGE\n• **Fisiopatologia:** RGE não impede progressão de sonda nasogástrica',
      category: 'incorrect',
      conceptsInvolved: ['diagnóstico diferencial', 'malformações neonatais', 'sinais patognomônicos']
    },
    {
      letter: 'B',
      text: 'Atresia de esôfago com fístula traqueoesofágica - manter em posição proclive, aspiração contínua e preparo cirúrgico',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e conduta adequados:\n\n• **Sinais patognomônicos:** Sialorreia + impossibilidade de passagem da sonda\n• **Confirmação:** Ar no estômago sugere fístula distal\n• **Conduta imediata:** Posição proclive + aspiração contínua\n• **Urgência cirúrgica:** Intervenção nas primeiras 24-48h\n• **Prevenção:** Evita pneumonia aspirativa',
      category: 'correct',
      conceptsInvolved: ['atresia de esôfago', 'fístula traqueoesofágica', 'emergência cirúrgica', 'manejo pré-operatório']
    },
    {
      letter: 'C',
      text: 'Paralisia das pregas vocais - intubação orotraqueal imediata e ventilação mecânica',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico equivocado:\n\n• **Manifestação:** Paralisia vocal causa stridor, não sialorreia\n• **Teste:** Impossibilidade de passagem da sonda não se explica\n• **Sintomas:** Não justifica cianose durante alimentação\n• **Conduta:** Intubação não resolve o problema primário',
      category: 'incorrect',
      conceptsInvolved: ['diagnóstico diferencial', 'manifestações neurológicas', 'vias aéreas']
    },
    {
      letter: 'D',
      text: 'Estenose hipertrófica do piloro - correção hidroeletrolítica e piloromiotomia',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico incompatível:\n\n• **Idade:** Estenose do piloro manifesta-se após 2-6 semanas\n• **Sintomas:** Vômitos em jato, não sialorreia ou cianose\n• **Anatomia:** Não impede passagem de sonda esofágica\n• **Fisiopatologia:** Obstrução pilórica não afeta deglutição',
      category: 'incorrect',
      conceptsInvolved: ['estenose pilórica', 'manifestações gastroduodenais', 'cronologia sintomas']
    },
    {
      letter: 'E',
      text: 'Pneumonia aspirativa - antibioticoterapia endovenosa e suporte respiratório',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico secundário:\n\n• **Causa primária:** Pneumonia é consequência, não causa\n• **Malformação:** Não identifica a atresia de esôfago subjacente\n• **Tratamento:** Não resolve impossibilidade de alimentação\n• **Prognóstico:** Sem correção cirúrgica, aspiração continuará',
      category: 'plausible',
      conceptsInvolved: ['complicações aspirativas', 'diagnóstico primário vs secundário', 'manejo causal']
    }
  ],

  metadata: {
    specialty: 'Cirurgia Pediátrica',
    difficulty: 'medium',
    tags: ['atresia de esôfago', 'fístula traqueoesofágica', 'emergências neonatais', 'malformações congênitas'],
    estimatedTime: 5,
    conceptsRequired: ['anatomia esofágica', 'malformações congênitas', 'emergências cirúrgicas', 'manejo neonatal'],
    learningObjectives: [
      'Reconhecer sinais clínicos da atresia de esôfago',
      'Compreender a fisiopatologia da fístula traqueoesofágica',
      'Identificar manejo inicial pré-cirúrgico adequado',
      'Conhecer urgência cirúrgica em malformações esofágicas'
    ]
  }
};
