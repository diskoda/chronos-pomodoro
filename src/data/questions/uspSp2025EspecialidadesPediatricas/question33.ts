import type { QuestionFlowData } from '../../../components/questionFlow/types';

export const question33FlowData: QuestionFlowData = {
  contextText: `
Uma criança de 5 anos é trazida ao pronto-socorro com história de febre alta (39,5°C), odinofagia intensa e recusa alimentar há 2 dias. A mãe relata que a criança está babando muito e preferindo ficar sentada com o pescoço estendido.

Ao exame físico, observa-se criança em posição de "tripé" (sentada, inclinada para frente, com pescoço estendido), com sialorreia importante e voz abafada. Há estridor inspiratório audível e tiragem supraesternal. A criança parece tóxica e irritada.

**História clínica:**
- Início súbito há 2 dias
- Febre alta (39,5°C)
- Odinofagia severa com recusa alimentar
- Sialorreia excessiva
- Preferência pela posição sentada
- Sem história de vacinação contra Haemophilus influenzae

**Exame físico:**
- Estado geral: Tóxico, irritado
- Posição de "tripé" (sniffing position)
- Sialorreia importante
- Voz abafada ("hot potato voice")
- Estridor inspiratório
- Tiragem supraesternal
- Temperatura: 39,5°C

**Sinais de alerta:**
- Desconforto respiratório progressivo
- Recusa em deitar-se
- Disfagia completa para sólidos

**Pergunta:** Qual é o diagnóstico mais provável e a conduta inicial mais urgente?
  `,

  explanationText: `
**Diagnóstico: Epiglotite Aguda**

**Análise diagnóstica:**

A epiglotite aguda é uma emergência pediátrica que pode evoluir rapidamente para obstrução respiratória completa. O caso apresenta características patognomônicas:

**Sinais patognomônicos:**
- **Posição de tripé:** Sentado, inclinado para frente, pescoço estendido
- **Sialorreia:** Incapacidade de deglutir secreções
- **Voz abafada:** "Hot potato voice"
- **Estridor inspiratório:** Obstrução supraglótica
- **Estado tóxico:** Febre alta, irritabilidade

**Etiologia:**
- **Haemophilus influenzae tipo b:** Principal causante (pré-vacina)
- **Streptococcus pyogenes:** Mais comum atualmente
- **Staphylococcus aureus:** Especialmente MRSA
- **Streptococcus pneumoniae:** Menos frequente

**Fisiopatologia:**
1. **Inflamação da epiglote** e estruturas supraglóticas
2. **Edema progressivo** com redução do lúmen
3. **Obstrução inspiratória** por colapso da epiglote
4. **Risco de obstrução completa** súbita

**Conduta inicial urgente:**

**NUNCA:**
- Examinar orofaringe com espátula
- Forçar decúbito
- Venopunção desnecessária
- Sedação

**SEMPRE:**
1. **Manter criança calma** - posição preferida
2. **Oxigenoterapia** sob máscara (se tolerar)
3. **Chamada imediata:** Anestesia + ORL/Cirurgia
4. **Preparar intubação** em centro cirúrgico
5. **Via aérea cirúrgica** se necessário (traqueostomia)

**Sequência ideal:**
1. **Estabilização inicial** sem manipulação
2. **Intubação em centro cirúrgico** sob anestesia geral
3. **Antibioticoterapia** após segurança da via aérea
4. **Corticosteroides** para reduzir edema

**Antibioticoterapia:**
- **Ceftriaxona:** 100 mg/kg/dia
- **Alternativa:** Ampicilina-sulbactam
- **Duração:** 7-10 dias

A prioridade absoluta é garantir via aérea segura antes de qualquer outra intervenção.
  `,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Faringoamigdalite estreptocócica - penicilina oral e sintomáticos',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado para gravidade:\n\n• **Sinais obstrutivos:** Estridor e tiragem não são típicos de faringite\n• **Posição:** "Tripé" é patognomônica de obstrução supraglótica\n• **Sialorreia:** Não é característica de faringoamigdalite\n• **Gravidade:** Estado tóxico sugere processo mais grave\n• **Tratamento:** Via oral inadequada para emergência respiratória',
      category: 'incorrect',
      conceptsInvolved: ['faringoamigdalite', 'diagnóstico diferencial', 'gravidade clínica']
    },
    {
      letter: 'B',
      text: 'Epiglotite aguda - manter criança calma, oxigenoterapia e preparo para intubação em centro cirúrgico',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e conduta adequados:\n\n• **Sinais patognomônicos:** Posição tripé + sialorreia + voz abafada + estridor\n• **Emergência respiratória:** Risco de obstrução completa súbita\n• **Conduta ideal:** Não manipular, manter calma, preparar intubação\n• **Local seguro:** Centro cirúrgico com anestesia + ORL\n• **Sequência:** Estabilização → via aérea segura → antibióticos\n• **Evitar:** Exame orofaringe, sedação, manipulação desnecessária',
      category: 'correct',
      conceptsInvolved: ['epiglotite aguda', 'emergência respiratória', 'manejo via aérea', 'intubação segura']
    },
    {
      letter: 'C',
      text: 'Laringotraqueobronquite - corticosteroides e adrenalina nebulizada',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico diferencial inadequado:\n\n• **Idade:** Crupe é mais comum < 3 anos\n• **Início:** Crupe tem pródromo viral, não início súbito\n• **Tosse:** "Tosse de foca" não descrita\n• **Posição:** Crupe não causa posição de tripé\n• **Sialorreia:** Não é característica da laringotraqueobronquite\n• **Estado geral:** Crupe raramente causa estado tóxico',
      category: 'plausible',
      conceptsInvolved: ['crupe', 'laringotraqueobronquite', 'diagnóstico diferencial', 'obstrução respiratória']
    },
    {
      letter: 'D',
      text: 'Abscesso retrofaríngeo - drenagem cirúrgica imediata',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico parcialmente inadequado:\n\n• **Idade:** Abscesso retrofaríngeo é mais comum < 3 anos\n• **Posição:** Pode causar hiperextensão cervical\n• **Disfagia:** Presente, mas sialorreia é menos proeminente\n• **Investigação:** TC seria necessária para confirmação\n• **Conduta:** Drenagem sem confirmação diagnóstica é inadequada',
      category: 'plausible',
      conceptsInvolved: ['abscesso retrofaríngeo', 'infecções profundas pescoço', 'drenagem cirúrgica']
    },
    {
      letter: 'E',
      text: 'Corpo estranho em via aérea - broncoscopia rígida de urgência',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico incompatível:\n\n• **História:** Não há relato de aspiração ou engasgo\n• **Início:** Quadro febril não é típico de corpo estranho\n• **Localização:** Sinais sugerem obstrução supraglótica, não brônquica\n• **Estado geral:** Toxemia não é característica\n• **Investigação:** Broncoscopia sem confirmação diagnóstica é inadequada',
      category: 'incorrect',
      conceptsInvolved: ['corpo estranho', 'aspiração', 'broncoscopia', 'obstrução respiratória']
    }
  ],

  metadata: {
    specialty: 'Infectologia Pediátrica',
    difficulty: 'hard',
    tags: ['epiglotite aguda', 'emergência respiratória', 'obstrução supraglótica', 'intubação', 'Haemophilus influenzae'],
    estimatedTime: 5,
    conceptsRequired: ['emergências respiratórias', 'obstrução supraglótica', 'manejo via aérea', 'infectologia pediátrica'],
    learningObjectives: [
      'Reconhecer sinais patognomônicos da epiglotite aguda',
      'Compreender urgência do manejo da via aérea',
      'Identificar condutas que devem ser evitadas',
      'Conhecer sequência segura para intubação'
    ]
  }
};